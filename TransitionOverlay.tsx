export function Testimonials() {
  const reviews = [
    {
      quote: "A feature film edit in ten days. The result outperformed everything we'd spent months crafting in-house.",
      name: "Sarah Chen",
      role: "Director of Content, Luminary"
    },
    {
      quote: "Engagement up 400%. That's not a typo. The pacing just hits differently when it's data-driven.",
      name: "Marcus Webb",
      role: "Lead Editor, Arcline Studios"
    },
    {
      quote: "They didn't just edit our video. They defined our visual identity for the next decade. Pure class.",
      name: "Elena Voss",
      role: "Creative Director, Helix"
    }
  ];

  return (
    <section className="py-32 px-6 max-w-7xl mx-auto">
       <div className="flex flex-col items-center text-center mb-20">
          <div className="liquid-glass rounded-full px-4 py-1 text-xs font-medium text-white mb-6 uppercase tracking-widest">
             What They Say
          </div>
          <h2 className="text-4xl md:text-5xl font-heading italic text-white tracking-tight leading-[1]">
             Don't take our word for it.
          </h2>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev, i) => (
            <div key={i} className="liquid-glass rounded-3xl p-10 flex flex-col justify-between hover:bg-white/5 transition-all">
               <p className="text-white/80 font-body font-light text-lg italic leading-relaxed mb-12">
                 "{rev.quote}"
               </p>
               <div>
                  <div className="text-white font-body font-medium text-base mb-1">
                     {rev.name}
                  </div>
                  <div className="text-white/40 font-body font-light text-xs uppercase tracking-widest font-bold">
                     {rev.role}
                  </div>
               </div>
            </div>
          ))}
       </div>
    </section>
  );
}
