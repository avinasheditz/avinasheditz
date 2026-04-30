import { motion } from 'motion/react';
import { DollarSign, Globe, RefreshCcw, Save, ShieldCheck, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { doc, getDocs, collection, updateDoc, setDoc } from 'firebase/firestore';
import { db } from '@/src/lib/firebase';
import { cn } from '@/src/lib/utils';

const CURRENCIES = [
  { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
];

export function PricingManager() {
  const [tiers, setTiers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchPricing = async () => {
      const snapshot = await getDocs(collection(db, 'pricing'));
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTiers(data.length ? data : [
        { id: 'basic', tier: 'Basic', amounts: { INR: 4999, USD: 69, EUR: 65 } },
        { id: 'pro', tier: 'Pro', amounts: { INR: 9999, USD: 129, EUR: 120 } },
        { id: 'prime', tier: 'Prime', amounts: { INR: 19999, USD: 249, EUR: 230 } },
      ]);
      setLoading(false);
    };
    fetchPricing();
  }, []);

  const handleUpdatePrice = (tierId: string, currency: string, value: string) => {
    setTiers(prev => prev.map(t => 
      t.id === tierId ? { ...t, amounts: { ...t.amounts, [currency]: Number(value) } } : t
    ));
  };

  const handleSave = async () => {
    setSaving(true);
    for (const tier of tiers) {
      await setDoc(doc(db, 'pricing', tier.id), tier);
    }
    setSaving(false);
    alert('Pricing updated successfully!');
  };

  if (loading) return null;

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-heading italic text-white mb-2">Pricing Management</h2>
          <p className="text-white/40">Set global service rates across multiple currencies.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={saving}
          className="bg-emerald-500 text-white px-8 py-3 rounded-xl font-bold uppercase tracking-widest text-xs flex items-center gap-2 hover:bg-emerald-600 transition-all disabled:opacity-50"
        >
          {saving ? <RefreshCcw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tiers.map((tier) => (
          <div key={tier.id} className="liquid-glass rounded-3xl p-8 border border-white/5 space-y-8">
            <div className="flex items-center justify-between">
               <span className="px-3 py-1 bg-white/5 rounded-lg text-[10px] font-black uppercase tracking-[0.2em] text-white/40">
                 Tier Plan
               </span>
               <ChevronRight className="w-4 h-4 text-white/10" />
            </div>
            <h3 className="text-3xl font-heading italic">{tier.tier}</h3>
            
            <div className="space-y-6">
              {CURRENCIES.map((curr) => (
                <div key={curr.code} className="space-y-2">
                  <div className="flex justify-between items-center text-[10px] font-bold uppercase text-white/20 tracking-widest">
                    <span>{curr.name}</span>
                    <span>{curr.code}</span>
                  </div>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 font-bold">{curr.symbol}</span>
                    <input 
                      type="number"
                      value={tier.amounts[curr.code]}
                      onChange={(e) => handleUpdatePrice(tier.id, curr.code, e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-lg font-mono outline-none focus:border-blue-500 transition-all"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-blue-500/10 border border-blue-500/20 rounded-3xl p-8 flex items-start gap-6 max-w-2xl">
         <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/40">
           <Globe className="w-6 h-6 text-white" />
         </div>
         <div className="space-y-2">
            <h4 className="text-lg font-bold text-white">Smart Currency Toggling</h4>
            <p className="text-sm text-white/60 leading-relaxed">
              Updating these values will instantly reflect on the main website pricing section. 
              Ensure you double-check conversion rates before saving to maintain consistency.
            </p>
         </div>
      </div>
    </div>
  );
}
