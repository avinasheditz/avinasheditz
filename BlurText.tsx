import { useState, useEffect, type FormEvent } from 'react';
import { useAuth } from '../lib/auth';
import { motion } from 'motion/react';
import { Shield, Lock, User, Key, Eye, EyeOff, Loader2 } from 'lucide-react';
import { cn } from '@/src/lib/utils';

import { AdminPanel } from './AdminPanel';

export function AdminGate() {
  const { user, loading, login, error } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const [showStatus, setShowStatus] = useState(false);
  const [tookTooLong, setTookTooLong] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (loading) setShowStatus(true);
    }, 150);
    
    const timeoutTimer = setTimeout(() => {
      if (loading) setTookTooLong(true);
    }, 4000); // 4 seconds before suggesting a delay

    return () => {
      clearTimeout(timer);
      clearTimeout(timeoutTimer);
    };
  }, [loading]);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    if (!username || !password) return;

    setIsLoggingIn(true);
    try {
      await login(username, password);
    } catch (err) {
      console.error('Login failed:', err);
    } finally {
      setIsLoggingIn(false);
    }
  };

  if (loading) {
    return (
      <div className="h-screen bg-[#0a0a0b] flex flex-col items-center justify-center gap-6 transition-opacity duration-500" style={{ opacity: showStatus ? 1 : 0 }}>
        <div className="relative">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
            className="w-16 h-16 rounded-full border-2 border-white/5 border-t-white/40"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <Shield className="w-6 h-6 text-white/10" />
          </div>
        </div>
        <div className="text-center space-y-2">
          <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.3em] animate-pulse">
            Verifying Identity
          </p>
          {tookTooLong && (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-white/10 text-[9px] uppercase font-bold tracking-widest max-w-[200px] leading-relaxed"
            >
              The secure gateway is initializing. <br/>This may take a moment.
            </motion.p>
          )}
        </div>
      </div>
    );
  }

  if (user) {
    return <AdminPanel />;
  }

  return (
    <div className="h-screen bg-[#0a0a0b] flex items-center justify-center p-6 font-body">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full liquid-glass rounded-3xl p-10 border border-white/10"
      >
        <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-8 border border-white/10">
           <Shield className="w-8 h-8 text-white" />
        </div>
        
        <div className="text-center mb-10">
          <h2 className="text-3xl font-heading italic text-white mb-2 underline decoration-white/10 underline-offset-8">Editor Access</h2>
          <p className="text-white/40 text-sm leading-relaxed">
            Authorized personnel only. Please enter your credentials to manage the studio.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {error && (
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl flex items-center gap-3"
            >
              <Lock className="w-5 h-5 text-rose-500 flex-shrink-0" />
              <p className="text-rose-500 text-xs font-bold uppercase tracking-wider">{error}</p>
            </motion.div>
          )}

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold ml-1">Username</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-white/40 transition-colors" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white outline-none focus:border-white/30 transition-all placeholder:text-white/10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold ml-1">Password</label>
              <div className="relative group">
                <Key className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-white/40 transition-colors" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-12 text-white outline-none focus:border-white/30 transition-all placeholder:text-white/10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-white/40 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoggingIn}
            className="w-full bg-white text-black rounded-2xl py-4 font-bold uppercase tracking-[0.2em] text-xs hover:bg-white/90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isLoggingIn ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              'Enter Panel'
            )}
          </button>
        </form>

        <div className="mt-12 pt-8 border-t border-white/5 text-center">
           <p className="text-white/20 text-[10px] uppercase font-bold tracking-widest">
             Studio Management System v2.0
           </p>
        </div>
      </motion.div>
    </div>
  );
}
