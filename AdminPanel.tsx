import { ReactNode, useEffect, useState } from 'react';
import { useAuth } from '../lib/auth';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { motion } from 'motion/react';

interface AdminRequiredProps {
  children: ReactNode;
}

export function AdminRequired({ children }: AdminRequiredProps) {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (loading) setShowLoader(true);
    }, 200); // Only show after 200ms
    return () => clearTimeout(timer);
  }, [loading]);

  useEffect(() => {
    if (!loading && (!user || user.role !== 'admin')) {
      navigate('/admin', { replace: true });
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="h-screen bg-[#0a0a0b] flex items-center justify-center transition-opacity duration-300" style={{ opacity: showLoader ? 1 : 0 }}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        >
          <Loader2 className="w-10 h-10 text-white/20" />
        </motion.div>
      </div>
    );
  }

  if (!user || user.role !== 'admin') {
    return null; // Will redirect via useEffect
  }

  return <>{children}</>;
}
