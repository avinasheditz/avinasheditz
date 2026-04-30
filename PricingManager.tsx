import { motion } from 'motion/react';
import { ArrowLeft, Layout, Settings, Users, Database, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

export function ServicesApp() {
  const tools = [
    { name: 'Project Manager', icon: Layout, desc: 'Track your active productions in real-time.' },
    { name: 'Asset Library', icon: Database, desc: 'Access your high-quality raw footage and graphics.' },
    { name: 'Team Collaboration', icon: Users, desc: 'Real-time feedback and version control.' },
    { name: 'Security Vault', icon: Shield, desc: 'End-to-end encrypted file sharing.' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-[#050505] text-white p-6 md:p-12 font-body"
    >
      <div className="max-w-7xl mx-auto">
        <header className="flex items-center justify-between mb-16">
          <Link to="/" className="flex items-center gap-2 text-white/40 hover:text-white transition-colors group">
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
              <Settings className="w-5 h-5 text-white/60" />
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500" />
          </div>
        </header>

        <section className="mb-20">
          <h1 className="text-5xl md:text-7xl font-heading italic font-bold mb-6">Service <span className="text-white/20">Control</span></h1>
          <p className="text-xl text-white/40 max-w-2xl leading-relaxed">
            Welcome to the powerhouse. Manage your productions, review cuts, and collaborate with your dedicated creative team all in one place.
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tools.map((tool, i) => (
            <div key={i} className="liquid-glass border border-white/5 p-8 rounded-[32px] hover-glow transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <tool.icon className="w-6 h-6 text-white/60 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-heading italic font-bold mb-3">{tool.name}</h3>
              <p className="text-sm text-white/40 leading-relaxed font-body">{tool.desc}</p>
            </div>
          ))}
        </div>

        {/* Empty State / Dashboard Visual */}
        <div className="mt-12 h-[400px] w-full liquid-glass border border-white/5 rounded-[40px] flex items-center justify-center border-dashed">
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-6">
                <Layout className="w-8 h-8 text-white/10" />
              </div>
              <p className="text-white/20 font-bold uppercase tracking-widest text-xs">No active projects yet</p>
              <button className="mt-4 text-purple-400 hover:text-purple-300 transition-colors text-sm font-bold">Start a new project +</button>
            </div>
        </div>
      </div>
    </motion.div>
  );
}
