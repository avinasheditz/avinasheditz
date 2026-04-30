import { HLSVideo } from './HLSVideo';

export function Stats() {
  const stats = [
    { value: "500+", label: "Videos delivered" },
    { value: "99%", label: "Client satisfaction" },
    { value: "4.5x", label: "Better engagement" },
    { value: "3 days", label: "Average turnaround" }
  ];

  return (
    <section className="relative py-32 px-6">
       <div className="absolute inset-0 z-0 opacity-30">
          <HLSVideo 
            src="https://stream.mux.com/NcU3HlHeF7CUL86azTTzpy3Tlb00d6iF3BmCdFslMJYM.m3u8" 
            desaturated 
          />
          <div className="absolute top-0 left-0 w-full h-[200px] bg-gradient-to-b from-black to-transparent pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-full h-[200px] bg-gradient-to-t from-black to-transparent pointer-events-none" />
       </div>

       <div className="relative z-10 max-w-7xl mx-auto">
          <div className="liquid-glass rounded-[40px] p-12 md:p-24 backdrop-blur-3xl">
             <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16">
                {stats.map((stat, i) => (
                  <div key={i} className="flex flex-col items-center lg:items-start">
                     <span className="text-5xl md:text-7xl font-heading italic text-white mb-4">
                        {stat.value}
                     </span>
                     <span className="text-white/40 uppercase tracking-widest text-[10px] md:text-xs font-bold">
                        {stat.label}
                     </span>
                  </div>
                ))}
             </div>
          </div>
       </div>
    </section>
  );
}
