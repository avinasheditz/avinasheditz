import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  Video as VideoIcon, 
  Clock, 
  CheckCircle, 
  DollarSign, 
  TrendingUp, 
  Folder, 
  Settings, 
  Bell, 
  LogOut,
  Search,
  Plus,
  MoreVertical,
  Layers,
  MessageSquare,
  Calendar,
  Shield,
  Palette,
  BarChart3,
  User,
  Phone,
  Layout,
  ExternalLink,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  PieChart,
  Pie,
  AreaChart,
  Area
} from 'recharts';
import { useState, useEffect, useMemo, useRef } from 'react';
import { db } from '@/src/lib/firebase';
import { useAuth } from '@/src/lib/auth';
import { collection, query, onSnapshot, orderBy, where, limit } from 'firebase/firestore';
import { cn } from '@/src/lib/utils';
import gsap from 'gsap';

// Sub-components
import { VideoManager } from './admin/VideoManager';
import { PricingManager } from './admin/PricingManager';
import { OrderManager } from './admin/OrderManager';
import { EditorManager } from './admin/EditorManager';
import { SettingsPanel } from './admin/SettingsPanel';
import { AnalyticsView } from './admin/AnalyticsView';
import { CategoryManager } from './admin/CategoryManager';

const data = [
  { name: 'Mon', revenue: 4000, projects: 4 },
  { name: 'Tue', revenue: 3000, projects: 3 },
  { name: 'Wed', revenue: 7000, projects: 7 },
  { name: 'Thu', revenue: 5000, projects: 5 },
  { name: 'Fri', revenue: 8000, projects: 8 },
  { name: 'Sat', revenue: 6000, projects: 6 },
  { name: 'Sun', revenue: 4000, projects: 4 },
];

const statusData = [
  { name: 'On Deck', value: 12, color: '#f59e0b' },
  { name: 'Editing', value: 19, color: '#3b82f6' },
  { name: 'Review', value: 8, color: '#a855f7' },
  { name: 'Delivered', value: 45, color: '#10b981' },
];

export function AdminPanel() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [submissions, setSubmissions] = useState<any[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const q = query(collection(db, 'submissions'), orderBy('createdAt', 'desc'), limit(10));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setSubmissions(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  // GSAP Transition on tab change
  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(contentRef.current, 
        { opacity: 0, y: 10, scale: 0.99 }, 
        { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: 'power2.out' }
      );
    }
  }, [activeTab]);

  const stats = useMemo(() => [
    { label: 'Active Orders', value: submissions.length.toString(), icon: Folder, color: 'text-blue-500', trend: '+12%' },
    { label: 'Avg Delivery', value: '4.2 Days', icon: Clock, color: 'text-amber-500', trend: '-8%' },
    { label: 'Completed', value: '842', icon: CheckCircle, color: 'text-emerald-500', trend: '+24%' },
    { label: 'Editors', value: '18', icon: Users, color: 'text-purple-500', trend: 'Online' },
    { label: 'Revenue', value: '₹4.2L', icon: DollarSign, color: 'text-rose-500', trend: '+18%' },
  ], [submissions]);

  const menuItems = [
    { id: 'dashboard', label: 'Overview', icon: Layout },
    { id: 'orders', label: 'Orders', icon: ShoppingBag, badge: submissions.filter(s => s.status === 'New').length },
    { id: 'videos', label: 'Videos', icon: VideoIcon },
    { id: 'editors', label: 'Editors', icon: Users },
    { id: 'taxonomies', label: 'Meta Data', icon: Tag },
    { id: 'pricing', label: 'Pricing', icon: DollarSign },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'appearance', label: 'Settings', icon: Palette },
  ];

  return (
    <div className="flex h-screen bg-[#060607] text-white selection:bg-blue-500/30">
      {/* Dynamic Sidebar */}
      <aside className="w-72 border-r border-white/5 flex flex-col p-8 bg-[#09090b]/50 backdrop-blur-xl">
        <div className="flex items-center gap-4 mb-16 group cursor-pointer">
          <div className="h-12 w-12 bg-white rounded-2xl flex items-center justify-center rotate-3 group-hover:rotate-0 transition-transform shadow-xl shadow-white/10">
             <span className="text-black font-heading italic text-2xl font-bold">A</span>
          </div>
          <div>
            <span className="font-heading italic text-2xl tracking-tighter block mb-[-4px]">Studio</span>
            <span className="text-[10px] uppercase font-black tracking-[0.2em] text-white/20">Control Center</span>
          </div>
        </div>

        <nav className="flex-1 space-y-4">
          <p className="text-[10px] uppercase font-black tracking-[0.2em] text-white/10 mb-4 ml-2">Main Menu</p>
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center justify-between px-5 py-4 rounded-[20px] transition-all group",
                activeTab === item.id 
                  ? "bg-white text-black shadow-2xl shadow-white/10 font-bold" 
                  : "text-white/30 hover:text-white/60 hover:bg-white/5"
              )}
            >
              <div className="flex items-center gap-4">
                <item.icon className={cn("w-5 h-5 transition-transform", activeTab === item.id ? "scale-110" : "group-hover:scale-110")} />
                <span className="text-sm font-heading italic tracking-wide">{item.label}</span>
              </div>
              {item.badge && item.badge > 0 && (
                <span className={cn(
                  "text-[10px] font-bold px-2 py-0.5 rounded-lg",
                  activeTab === item.id ? "bg-black text-white" : "bg-blue-500 text-white"
                )}>
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="pt-6 border-t border-white/5 space-y-3">
          <div className="bg-white/5 rounded-2xl p-4 mb-4 flex items-center gap-3">
             <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center font-bold text-xs uppercase">
               {user?.username?.slice(0, 2) || 'AD'}
             </div>
             <div className="overflow-hidden">
               <p className="text-sm font-bold truncate">{user?.username}</p>
               <p className="text-[10px] text-white/30 uppercase tracking-widest font-black">{user?.role}</p>
             </div>
          </div>
          <button 
            onClick={() => logout()}
            className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-rose-500/60 hover:text-rose-500 hover:bg-rose-500/5 transition-all text-sm font-bold uppercase tracking-widest"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Interface */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden bg-gradient-to-b from-[#0a0a0b] to-[#060607]">
        <header className="h-24 border-b border-white/5 flex items-center justify-between px-12 glass shadow-2xl z-10">
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-heading italic tracking-tight">{activeTab === 'dashboard' ? 'Overview' : activeTab}</h1>
            {activeTab === 'dashboard' && (
              <div className="bg-emerald-500/10 text-emerald-500 px-3 py-1 rounded-full flex items-center gap-2">
                 <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                 <span className="text-[10px] font-black uppercase tracking-widest">Live System</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-8">
            <div className="relative hidden xl:block">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
              <input 
                type="text" 
                placeholder="Global command palette..." 
                className="bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 py-3 text-sm outline-none focus:border-white/30 transition-all w-80 font-body placeholder:text-white/10"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-white/10 border border-white/10 rounded px-1.5 py-0.5">⌘K</span>
            </div>
            
            <div className="flex items-center gap-3">
              <button className="relative p-3 bg-white/5 rounded-xl border border-white/5 text-white/40 hover:text-white transition-all hover:scale-105 active:scale-95">
                <Bell className="w-5 h-5" />
                <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-blue-500 rounded-full border-4 border-[#0a0a0b]" />
              </button>
              <button className="p-3 bg-white/5 rounded-xl border border-white/5 text-white/40 hover:text-white transition-all hover:scale-105 active:scale-95">
                <Sparkles className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-12" ref={contentRef}>
          {activeTab === 'dashboard' && (
            <div className="space-y-12 max-w-[1600px] mx-auto">
              {/* Modern Bento Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                {stats.map((stat, i) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    key={i} 
                    className="liquid-glass rounded-3xl p-8 border border-white/5 group hover:border-white/20 transition-all relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                       <stat.icon className="w-20 h-20 rotate-[-15deg]" />
                    </div>
                    <div className="flex items-center justify-between mb-8">
                      <div className={cn("p-4 rounded-2xl bg-white/5 shadow-inner", stat.color)}>
                        <stat.icon className="w-6 h-6" />
                      </div>
                      <span className={cn(
                        "text-[10px] font-black px-2 py-1 rounded-lg",
                        stat.trend.startsWith('+') ? "bg-emerald-500/10 text-emerald-500" : 
                        stat.trend.startsWith('-') ? "bg-rose-500/10 text-rose-500" : "bg-blue-500/10 text-blue-500"
                      )}>
                        {stat.trend}
                      </span>
                    </div>
                    <div className="text-4xl font-heading italic font-bold mb-2 tracking-tighter">{stat.value}</div>
                    <div className="text-[10px] text-white/20 uppercase tracking-[0.2em] font-black">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* Main Graphs Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2 liquid-glass rounded-[40px] p-10 border border-white/5 relative overflow-hidden">
                  <div className="flex items-center justify-between mb-12">
                    <div>
                       <h3 className="text-2xl font-heading italic text-white mb-1">Growth Intelligence</h3>
                       <p className="text-xs text-white/20 uppercase tracking-widest font-black">Revenue vs Project Velocity</p>
                    </div>
                    <div className="flex gap-2">
                       <button className="px-4 py-2 rounded-xl bg-white/5 border border-white/5 text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white transition-all">This Week</button>
                       <button className="px-4 py-2 rounded-xl bg-white text-black text-[10px] font-black uppercase tracking-widest">Monthly</button>
                    </div>
                  </div>
                  <div className="h-[400px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={data}>
                        <defs>
                          <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                        <XAxis dataKey="name" stroke="#ffffff10" fontSize={10} axisLine={false} tickLine={false} dy={10} />
                        <YAxis stroke="#ffffff10" fontSize={10} axisLine={false} tickLine={false} />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#0a0a0b', border: '1px solid #ffffff10', borderRadius: '24px', padding: '16px' }}
                          cursor={{ stroke: '#ffffff10', strokeWidth: 2 }}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="revenue" 
                          stroke="#3b82f6" 
                          strokeWidth={4} 
                          fillOpacity={1} 
                          fill="url(#colorRev)" 
                        />
                        <Area 
                          type="monotone" 
                          dataKey="projects" 
                          stroke="#a855f7" 
                          strokeWidth={4} 
                          fillOpacity={0} 
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="liquid-glass rounded-[40px] p-10 border border-white/5 flex flex-col items-center">
                  <div className="w-full text-left mb-12">
                     <h3 className="text-2xl font-heading italic text-white mb-1">Status Mix</h3>
                     <p className="text-xs text-white/20 uppercase tracking-widest font-black">Active Pipeline Distribution</p>
                  </div>
                  <div className="flex-1 w-full flex items-center justify-center relative">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={statusData}
                          innerRadius={110}
                          outerRadius={140}
                          paddingAngle={8}
                          dataKey="value"
                          stroke="none"
                        >
                          {statusData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#0a0a0b', border: '1px solid #ffffff10', borderRadius: '24px' }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute flex flex-col items-center justify-center">
                       <span className="text-5xl font-heading italic font-bold">84</span>
                       <span className="text-[10px] text-white/20 uppercase font-black tracking-widest">Active Units</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-x-8 gap-y-4 w-full mt-10">
                    {statusData.map(s => (
                      <div key={s.name} className="flex items-center justify-between group cursor-default">
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 rounded-full shadow-lg" style={{ backgroundColor: s.color, boxShadow: `0 0 10px ${s.color}40` }} />
                          <span className="text-xs text-white/40 group-hover:text-white transition-colors">{s.name}</span>
                        </div>
                        <span className="text-xs font-bold text-white/60">{s.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Feed */}
              <div className="liquid-glass rounded-[40px] p-10 border border-white/5">
                <div className="flex items-center justify-between mb-12">
                  <div>
                    <h3 className="text-2xl font-heading italic text-white">Project Pulse</h3>
                    <p className="text-xs text-white/20 uppercase tracking-widest font-black mb-1">Real-time incoming activity</p>
                  </div>
                  <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-blue-500 hover:text-blue-400 transition-colors">
                    Intelligence Report
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  {submissions.slice(0, 4).map((sub, i) => (
                    <motion.div 
                      layout
                      key={sub.id} 
                      className="group flex items-center justify-between p-6 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-white/10 hover:bg-white/[0.04] transition-all"
                    >
                      <div className="flex items-center gap-6">
                        <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 relative">
                           <span className="text-lg font-heading italic font-bold text-white/60">{sub.fullName?.charAt(0)}</span>
                           <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full border-4 border-[#0a0a0b] scale-0 group-hover:scale-100 transition-transform" />
                        </div>
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <h4 className="font-heading italic text-lg font-bold">{sub.videoTitle}</h4>
                            <span className="bg-amber-500/10 text-amber-500 border border-amber-500/20 px-2 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-widest">URGENT</span>
                          </div>
                          <p className="text-[10px] text-white/20 uppercase tracking-widest font-black flex items-center gap-2">
                             Ordered by <span className="text-white/60">{sub.fullName}</span> 
                             <span className="w-1 h-1 rounded-full bg-white/10" />
                             {sub.createdAt?.toDate ? sub.createdAt.toDate().toLocaleDateString() : 'Pending'}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                         <div className="text-right hidden md:block">
                            <p className="text-sm font-bold text-white mb-0.5">₹{sub.budget || 'Custom'}</p>
                            <p className="text-[9px] text-white/20 uppercase font-black tracking-widest">Base Value</p>
                         </div>
                         <button className="p-3 rounded-xl bg-white/5 border border-white/5 text-white/20 hover:text-white hover:bg-white/10 transition-all opacity-0 group-hover:opacity-100">
                           <MoreVertical className="w-5 h-5" />
                         </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'videos' && <VideoManager />}
          {activeTab === 'pricing' && <PricingManager />}
          {activeTab === 'orders' && <OrderManager />}
          {activeTab === 'editors' && <EditorManager />}
          {activeTab === 'taxonomies' && <CategoryManager />}
          {activeTab === 'analytics' && <AnalyticsView />}
          {activeTab === 'appearance' && <SettingsPanel />}

          {/* Fallback for other tabs */}
          {['media', 'clients', 'calendar'].includes(activeTab) && (
            <div className="flex flex-col items-center justify-center h-[60vh] text-center">
              <div className="w-24 h-24 bg-white/[0.03] border border-white/5 rounded-[40px] flex items-center justify-center mb-10 group hover:scale-110 transition-transform duration-500">
                <Settings className="w-12 h-12 text-white/10 group-hover:text-blue-500 transition-colors animate-spin-slow" />
              </div>
              <h2 className="text-5xl font-heading italic mb-4 tracking-tight">Intelligence Module</h2>
              <p className="text-white/20 font-heading italic text-xl">Quantifying deep metrics for your expansion.</p>
              <div className="mt-12 flex gap-4">
                 <button className="px-8 py-4 bg-white text-black rounded-2xl font-black uppercase tracking-widest text-[10px]">Priority Access</button>
                 <button className="px-8 py-4 bg-white/5 border border-white/10 text-white/40 rounded-2xl font-black uppercase tracking-widest text-[10px]">Documentation</button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

