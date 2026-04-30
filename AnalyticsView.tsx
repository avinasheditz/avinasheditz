import { motion } from 'motion/react';
import { Video, Plus, Search, Filter, MoreVertical, Play, Trash2, Edit2, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { collection, query, onSnapshot, orderBy, addDoc, deleteDoc, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/src/lib/firebase';
import { cn } from '@/src/lib/utils';

export function VideoManager() {
  const [videos, setVideos] = useState<any[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newVideo, setNewVideo] = useState({ title: '', description: '', url: '', category: 'Editing', status: 'draft' });

  useEffect(() => {
    const q = query(collection(db, 'videos'), orderBy('createdAt', 'desc'));
    return onSnapshot(q, (snapshot) => {
      setVideos(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
  }, []);

  const handleAddVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    await addDoc(collection(db, 'videos'), {
      ...newVideo,
      createdAt: serverTimestamp(),
      views: 0
    });
    setNewVideo({ title: '', description: '', url: '', category: 'Editing', status: 'draft' });
    setIsAdding(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this video?')) {
      await deleteDoc(doc(db, 'videos', id));
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-heading italic text-white mb-2">Video Library</h2>
          <p className="text-white/40">Manage your showcase and service videos.</p>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="bg-white text-black px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-xs flex items-center gap-2 hover:bg-white/90 transition-all"
        >
          <Plus className="w-4 h-4" />
          Add New Video
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <motion.div 
            layout
            key={video.id} 
            className="liquid-glass rounded-3xl overflow-hidden border border-white/5 flex flex-col group"
          >
            <div className="aspect-video bg-white/5 relative group-hover:cursor-pointer">
              {video.thumbnail ? (
                <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Play className="w-12 h-12 text-white/10 group-hover:text-white/40 transition-colors" />
                </div>
              )}
              <div className="absolute top-4 left-4">
                <span className={cn(
                  "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest",
                  video.status === 'published' ? "bg-emerald-500/20 text-emerald-500" : "bg-amber-500/20 text-amber-500"
                )}>
                  {video.status}
                </span>
              </div>
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-heading italic text-xl">{video.title}</h3>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-2 hover:bg-white/5 rounded-lg transition-colors"><Edit2 className="w-4 h-4 text-white/40" /></button>
                  <button onClick={() => handleDelete(video.id)} className="p-2 hover:bg-rose-500/10 rounded-lg transition-colors"><Trash2 className="w-4 h-4 text-rose-500" /></button>
                </div>
              </div>
              <p className="text-sm text-white/40 line-clamp-2 mb-6">{video.description}</p>
              <div className="mt-auto flex items-center justify-between border-t border-white/5 pt-4">
                <span className="text-[10px] text-white/20 uppercase font-black">{video.category}</span>
                <span className="text-[10px] text-white/20 uppercase font-black">{video.views || 0} Views</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {isAdding && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="liquid-glass-strong w-full max-w-2xl rounded-3xl p-10 border border-white/10 shadow-2xl"
          >
            <h2 className="text-3xl font-heading italic mb-8">Add New Video</h2>
            <form onSubmit={handleAddVideo} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold text-white/40 tracking-[0.2em] ml-1">Video Title</label>
                  <input 
                    required
                    value={newVideo.title}
                    onChange={(e) => setNewVideo({...newVideo, title: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-white/30 outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold text-white/40 tracking-[0.2em] ml-1">Category</label>
                  <select 
                    value={newVideo.category}
                    onChange={(e) => setNewVideo({...newVideo, category: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-white/30 outline-none transition-all"
                  >
                    <option value="Editing">Editing</option>
                    <option value="VFX">VFX</option>
                    <option value="Ads">Ads</option>
                    <option value="YouTube">YouTube</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold text-white/40 tracking-[0.2em] ml-1">Video URL (mp4/hls)</label>
                <input 
                  required
                  value={newVideo.url}
                  onChange={(e) => setNewVideo({...newVideo, url: e.target.value})}
                  placeholder="https://..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-white/30 outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold text-white/40 tracking-[0.2em] ml-1">Description</label>
                <textarea 
                  value={newVideo.description}
                  onChange={(e) => setNewVideo({...newVideo, description: e.target.value})}
                  rows={4}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-white/30 outline-none transition-all resize-none"
                />
              </div>
              <div className="flex gap-4 pt-4">
                <button 
                  type="submit"
                  className="flex-1 bg-white text-black font-bold uppercase tracking-widest text-xs py-4 rounded-xl hover:bg-opacity-90 transition-all"
                >
                  Create Project
                </button>
                <button 
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="flex-1 bg-white/5 text-white font-bold uppercase tracking-widest text-xs py-4 rounded-xl border border-white/10 hover:bg-white/10 transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
