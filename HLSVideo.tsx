import { motion, AnimatePresence } from 'motion/react';
import { X, User, Mail, Phone, Video, FileText, Upload, Send } from 'lucide-react';
import { useState } from 'react';
import type { FormEvent } from 'react';
import { cn } from '@/src/lib/utils';
import { db } from '@/src/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

interface BookingDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormState {
  fullName: string;
  email: string;
  phone: string;
  videoTitle: string;
  videoDescription: string;
  videoLink: string;
  notes: string;
  budget: string;
}

const initialFormState: FormState = {
  fullName: '',
  email: '',
  phone: '',
  videoTitle: '',
  videoDescription: '',
  videoLink: '',
  notes: '',
  budget: '',
};

export function BookingDialog({ isOpen, onClose }: BookingDialogProps) {
  const [form, setForm] = useState<FormState>(initialFormState);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    const newErrors: Partial<FormState> = {};
    if (!form.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!form.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!form.videoTitle.trim()) newErrors.videoTitle = 'Video title is required';
    if (!form.videoDescription.trim()) newErrors.videoDescription = 'Description is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    
    try {
      // 1. Save to Firestore
      await addDoc(collection(db, 'submissions'), {
        ...form,
        status: 'new',
        createdAt: serverTimestamp(),
      });

      // 2. Prepare WhatsApp message
      const message = `*New Video Project Request*%0A%0A` +
        `*Name:* ${form.fullName}%0A` +
        `*Email:* ${form.email}%0A` +
        `*Phone:* ${form.phone}%0A` +
        `*Video Title:* ${form.videoTitle}%0A` +
        `*Budget:* ${form.budget || 'Not specified'}%0A` +
        `*Description:* ${form.videoDescription}%0A` +
        `*Link:* ${form.videoLink || 'N/A'}%0A` +
        `*Notes:* ${form.notes || 'N/A'}`;
      
      const whatsappUrl = `https://wa.me/919310491221?text=${message}`;
      
      // 3. Success state
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // 4. Open WhatsApp
      window.open(whatsappUrl, '_blank');
      
      setTimeout(() => {
        onClose();
        setIsSuccess(false);
        setForm(initialFormState);
      }, 3000);
    } catch (error) {
      console.error("Submission failed:", error);
      setIsSubmitting(false);
      alert("Submission failed. Please try again.");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-md"
          />

          {/* Dialog */}
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-2xl liquid-glass rounded-3xl overflow-hidden pointer-events-auto shadow-2xl border border-white/10"
            >
              <div className="relative p-8 md:p-12 overflow-y-auto max-h-[90vh]">
                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 transition-colors text-white/50 hover:text-white"
                >
                  <X className="w-6 h-6" />
                </button>

                {isSuccess ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-6"
                    >
                      <Send className="w-10 h-10 text-white" />
                    </motion.div>
                    <h3 className="text-3xl font-heading italic text-white mb-4">Request Received</h3>
                    <p className="text-white/60 font-body">
                      We've received your project details. <br/>
                      Our team will reach out to you within 24 hours.
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col">
                    <div className="mb-10">
                      <h2 className="text-4xl font-heading italic text-white mb-2">Book Your Strategy Call</h2>
                      <p className="text-white/50 font-body">Fill out the details below to start your cinematic journey.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Budget Section */}
                      <div className="space-y-3 mb-8">
                        <label className="text-xs uppercase tracking-widest text-white/40 font-bold ml-1">Estimated Budget</label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {['Under ₹10k', '₹10k - ₹50k', '₹50k - ₹1L', '₹1L+'].map((range) => (
                            <button
                              key={range}
                              type="button"
                              onClick={() => setForm({ ...form, budget: range })}
                              className={cn(
                                "py-3 px-2 rounded-xl text-[10px] font-bold uppercase tracking-tight transition-all border",
                                form.budget === range 
                                  ? "bg-white text-black border-white" 
                                  : "bg-white/5 text-white/40 border-white/5 hover:border-white/20 hover:text-white"
                              )}
                            >
                              {range}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Name */}
                        <div className="space-y-2">
                          <label className="text-xs uppercase tracking-widest text-white/40 font-bold ml-1">Full Name</label>
                          <div className={cn(
                            "flex items-center gap-3 px-4 py-3 bg-white/5 rounded-2xl border transition-all",
                            errors.fullName ? "border-red-500/50" : "border-white/10 focus-within:border-white/30"
                          )}>
                            <User className="w-5 h-5 text-white/30" />
                            <input
                              type="text"
                              placeholder="John Smith"
                              className="bg-transparent border-none outline-none text-white w-full font-body placeholder:text-white/20"
                              value={form.fullName}
                              onChange={e => setForm({...form, fullName: e.target.value})}
                            />
                          </div>
                          {errors.fullName && <p className="text-red-500 text-[10px] uppercase font-bold ml-1">{errors.fullName}</p>}
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                          <label className="text-xs uppercase tracking-widest text-white/40 font-bold ml-1">Email Address</label>
                          <div className={cn(
                            "flex items-center gap-3 px-4 py-3 bg-white/5 rounded-2xl border transition-all",
                            errors.email ? "border-red-500/50" : "border-white/10 focus-within:border-white/30"
                          )}>
                            <Mail className="w-5 h-5 text-white/30" />
                            <input
                              type="email"
                              placeholder="john@example.com"
                              className="bg-transparent border-none outline-none text-white w-full font-body placeholder:text-white/20"
                              value={form.email}
                              onChange={e => setForm({...form, email: e.target.value})}
                            />
                          </div>
                          {errors.email && <p className="text-red-500 text-[10px] uppercase font-bold ml-1">{errors.email}</p>}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Phone */}
                        <div className="space-y-2">
                          <label className="text-xs uppercase tracking-widest text-white/40 font-bold ml-1">Contact Number</label>
                          <div className={cn(
                            "flex items-center gap-3 px-4 py-3 bg-white/5 rounded-2xl border transition-all",
                            errors.phone ? "border-red-500/50" : "border-white/10 focus-within:border-white/30"
                          )}>
                            <Phone className="w-5 h-5 text-white/30" />
                            <input
                              type="tel"
                              placeholder="+1 (555) 000-0000"
                              className="bg-transparent border-none outline-none text-white w-full font-body placeholder:text-white/20"
                              value={form.phone}
                              onChange={e => setForm({...form, phone: e.target.value})}
                            />
                          </div>
                          {errors.phone && <p className="text-red-500 text-[10px] uppercase font-bold ml-1">{errors.phone}</p>}
                        </div>

                        {/* Video Title */}
                        <div className="space-y-2">
                          <label className="text-xs uppercase tracking-widest text-white/40 font-bold ml-1">Video Title</label>
                          <div className={cn(
                            "flex items-center gap-3 px-4 py-3 bg-white/5 rounded-2xl border transition-all",
                            errors.videoTitle ? "border-red-500/50" : "border-white/10 focus-within:border-white/30"
                          )}>
                            <Video className="w-5 h-5 text-white/30" />
                            <input
                              type="text"
                              placeholder="E.g. Summer Brand Launch"
                              className="bg-transparent border-none outline-none text-white w-full font-body placeholder:text-white/20"
                              value={form.videoTitle}
                              onChange={e => setForm({...form, videoTitle: e.target.value})}
                            />
                          </div>
                          {errors.videoTitle && <p className="text-red-500 text-[10px] uppercase font-bold ml-1">{errors.videoTitle}</p>}
                        </div>
                      </div>

                      {/* Video Description */}
                      <div className="space-y-2">
                        <label className="text-xs uppercase tracking-widest text-white/40 font-bold ml-1">Video Description</label>
                        <div className={cn(
                          "flex items-start gap-3 px-4 py-3 bg-white/5 rounded-2xl border transition-all",
                          errors.videoDescription ? "border-red-500/50" : "border-white/10 focus-within:border-white/30"
                        )}>
                          <FileText className="w-5 h-5 text-white/30 mt-1" />
                          <textarea
                            placeholder="Tell us about your project, style, and goals..."
                            rows={3}
                            className="bg-transparent border-none outline-none text-white w-full font-body placeholder:text-white/20 resize-none"
                            value={form.videoDescription}
                            onChange={e => setForm({...form, videoDescription: e.target.value})}
                          />
                        </div>
                        {errors.videoDescription && <p className="text-red-500 text-[10px] uppercase font-bold ml-1">{errors.videoDescription}</p>}
                      </div>

                      {/* Video Link */}
                      <div className="space-y-2">
                        <label className="text-xs uppercase tracking-widest text-white/40 font-bold ml-1">Upload Video File / Link</label>
                        <div className="flex items-center gap-3 px-4 py-3 bg-white/5 rounded-2xl border border-white/10 focus-within:border-white/30 transition-all">
                          <Upload className="w-5 h-5 text-white/30" />
                          <input
                            type="text"
                            placeholder="Paste your Dropbox/Drive link here"
                            className="bg-transparent border-none outline-none text-white w-full font-body placeholder:text-white/20"
                            value={form.videoLink}
                            onChange={e => setForm({...form, videoLink: e.target.value})}
                          />
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="pt-6 flex flex-col-reverse sm:flex-row items-center gap-4">
                        <button
                          type="button"
                          onClick={onClose}
                          className="w-full sm:w-auto px-8 py-4 text-white/50 hover:text-white transition-colors font-bold uppercase tracking-widest text-xs"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full sm:flex-1 liquid-glass-strong rounded-full px-8 py-4 font-bold flex items-center justify-center gap-2 disabled:opacity-50 transition-all hover:scale-[1.02] active:scale-[0.98]"
                        >
                          {isSubmitting ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          ) : (
                            <>
                              <span>Submit Project</span>
                              <Send className="w-4 h-4" />
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
