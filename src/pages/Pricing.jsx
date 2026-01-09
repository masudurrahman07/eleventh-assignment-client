import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../contexts/ThemeContext";
import { Check, HelpCircle, Utensils, ShieldCheck, ChefHat, Sparkles } from "lucide-react";

const Pricing = () => {
  const { theme } = useTheme();
  const plans = [
    {
      name: "Home Cook",
      price: "$0",
      description: "Perfect for local chefs starting their culinary journey.",
      features: [
        "List up to 5 signature meals",
        "Basic kitchen dashboard",
        "Standard order management",
        "Community forum access",
        "Mobile app notification alerts",
      ],
      buttonText: "Start Cooking",
      isPremium: false,
    },
    {
      name: "Master Chef",
      price: "$29",
      description: "Advanced tools for high-volume kitchen operations.",
      features: [
        "Unlimited meal listings",
        "Featured 'Chef of the Week' status",
        "Advanced sales & revenue analytics",
        "Priority support & kitchen coaching",
        "Custom branding for your bazaar shop",
      ],
      buttonText: "Join Pro Kitchen",
      isPremium: true,
    },
  ];

  return (
    <div 
      className="min-h-screen transition-colors duration-300 py-20 px-4"
      style={{
        backgroundColor: theme === 'dark' ? '#111827' : '#f8fafc'
      }}>
      <div className="max-w-6xl mx-auto">

   
        <div className="text-center mb-16 space-y-6">
          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.15] tracking-tight"
            style={{ color: theme === 'dark' ? '#f9fafb' : '#0f172a' }}>
            Flexible Plans for 
            <span className="bg-linear-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent inline-block ml-3 italic">
               Every Chef.
            </span>
          </motion.h2>
          <p 
            className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-medium"
            style={{ color: theme === 'dark' ? '#9ca3af' : '#64748b' }}>
            Scale your local food business with professional management tools and 
            reach more hungry customers in your neighborhood.
          </p>
        </div>

      
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-20">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative rounded-[2.5rem] p-8 md:p-10 flex flex-col h-full border transition-all duration-300 ${
                plan.isPremium
                  ? "text-white shadow-2xl shadow-emerald-500/10"
                  : "shadow-xl"
              }`}
              style={{
                backgroundColor: plan.isPremium 
                  ? (theme === 'dark' ? '#0f172a' : '#1e293b')
                  : (theme === 'dark' ? '#1f2937' : '#ffffff'),
                borderColor: plan.isPremium
                  ? (theme === 'dark' ? '#065f46' : '#047857')
                  : (theme === 'dark' ? '#374151' : '#e2e8f0'),
                color: plan.isPremium 
                  ? '#ffffff'
                  : (theme === 'dark' ? '#f9fafb' : '#0f172a')}}>
              {plan.isPremium && (
                <div className="absolute top-0 right-10 -translate-y-1/2">
                  <span className="bg-linear-to-r from-[#FF7A18] to-[#FF3D00] text-white text-[10px] font-black uppercase tracking-widest px-5 py-2.5 rounded-full shadow-lg flex items-center gap-1">
                    <Sparkles size={12} /> Recommended
                  </span>
                </div>
              )}

              <div className="text-center mb-10">
                <div 
                  className="inline-flex p-3 rounded-2xl mb-4"
                  style={{
                    backgroundColor: plan.isPremium 
                      ? 'rgba(16, 185, 129, 0.2)' 
                      : (theme === 'dark' ? '#065f46' : '#ecfdf5')
                  }}>
                   {plan.isPremium ? <ChefHat className="text-emerald-400" size={28}/> : <Utensils className="text-emerald-600" size={28}/>}
                </div>
                <h3 className="text-3xl font-black mb-2 italic tracking-tighter">{plan.name}</h3>
                <div className="flex items-baseline justify-center gap-1 mb-4">
                  <span className="text-5xl font-black">{plan.price}</span>
                  <span 
                    className="text-sm font-bold"
                    style={{ 
                      color: plan.isPremium 
                        ? '#94a3b8' 
                        : (theme === 'dark' ? '#9ca3af' : '#64748b')}}>
                    {plan.price === "$0" ? "forever" : "/ month"}
                  </span>
                </div>
                <p 
                  className="text-sm font-medium leading-relaxed"
                  style={{ 
                    color: plan.isPremium 
                      ? '#94a3b8' 
                      : (theme === 'dark' ? '#9ca3af' : '#64748b')
                  }}>
                  {plan.description}
                </p>
              </div>

              <div className="space-y-5 grow mb-10">
                <p 
                  className="text-[10px] font-black uppercase tracking-widest"
                  style={{ 
                    color: plan.isPremium 
                      ? '#10b981' 
                      : (theme === 'dark' ? '#9ca3af' : '#94a3b8')}}>
                  Bazaar Membership Includes:
                </p>
                {plan.features.map((feature, fIndex) => (
                  <div key={fIndex} className="flex items-start justify-between group cursor-help">
                    <div className="flex items-center gap-3">
                      <div 
                        className="p-1 rounded-full"
                        style={{
                          backgroundColor: plan.isPremium 
                            ? 'rgba(16, 185, 129, 0.3)' 
                            : (theme === 'dark' ? 'rgba(16, 185, 129, 0.2)' : '#ecfdf5')}}>
                        <Check className="text-emerald-500" size={14} strokeWidth={3} />
                      </div>
                      <span 
                        className="text-sm font-semibold"
                        style={{ 
                          color: plan.isPremium 
                            ? '#cbd5e1' 
                            : (theme === 'dark' ? '#d1d5db' : '#374151')}} >
                        {feature}
                      </span>
                    </div>
                    <HelpCircle 
                      size={16} 
                      className="group-hover:text-emerald-500 transition-colors"
                      style={{ 
                        color: plan.isPremium 
                          ? '#475569' 
                          : (theme === 'dark' ? '#6b7280' : '#cbd5e1')}} />
                  </div>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-5 rounded-3xl font-black text-xs uppercase tracking-[0.2em] transition-all shadow-xl ${
                  plan.isPremium
                    ? "bg-linear-to-r from-emerald-500 to-teal-500 text-white hover:shadow-emerald-500/20"
                    : "bg-[#FF7A18] text-white hover:bg-[#FF3D00] shadow-orange-500/20"
                }`}>
                {plan.buttonText}
              </motion.button>
            </motion.div>
          ))}
        </div>

     
        <div className="text-center space-y-8">
          <div className="flex justify-center items-center gap-6 opacity-60">
            <div 
              className="p-4 rounded-2xl border shadow-sm"
              style={{
                backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
                borderColor: theme === 'dark' ? '#374151' : '#e2e8f0'
              }}>
              <ShieldCheck className="text-emerald-600" />
            </div>
            <div 
              className="p-4 rounded-2xl border shadow-sm"
              style={{
                backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
                borderColor: theme === 'dark' ? '#374151' : '#e2e8f0'
              }}>
              <ChefHat className="text-orange-500" />
            </div>
          </div>
          <p 
            className="text-[10px] uppercase font-black tracking-[0.3em] leading-loose"
            style={{ color: theme === 'dark' ? '#6b7280' : '#9ca3af' }}>
            Secure Payment processing with Stripe. <br className="hidden md:block" />
            LocalChefBazaar is a certified neighborhood marketplace.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Pricing;