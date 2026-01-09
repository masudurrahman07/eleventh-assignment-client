import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../contexts/ThemeContext";
import { 
  Zap, 
  Search, 
  UserCircle, 
  CreditCard, 
  Mail, 
  ShieldCheck, 
  ChefHat, 
  Utensils, 
  ShoppingBag, 
  Store, 
  LifeBuoy, 
  AlertCircle, 
  Settings, 
  BookOpen,
  Truck,
  Heart
} from "lucide-react";

const Support = () => {
  const { theme } = useTheme();
  const categories = [
    {
      title: "Account & Kitchen",
      links: [
        { icon: <UserCircle size={16} />, label: "Chef Profile Setup" },
        { icon: <CreditCard size={16} />, label: "Earnings & Payouts" },
        { icon: <Mail size={16} />, label: "Email & Notifications" },
        { icon: <ShieldCheck size={16} />, label: "Kitchen Verification" },
      ],
    },
    {
      title: "Selling on Bazaar",
      links: [
        { icon: <ChefHat size={16} />, label: "Listing Your First Meal" },
        { icon: <Store size={16} />, label: "Managing Your Shop" },
        { icon: <Utensils size={16} />, label: "Food Safety Standards" },
        { icon: <BookOpen size={16} />, label: "Chef Handbooks" },
      ],
    },
    {
      title: "Ordering Experience",
      links: [
        { icon: <Search size={16} />, label: "Finding Local Chefs" },
        { icon: <ShoppingBag size={16} />, label: "Order Tracking" },
        { icon: <Truck size={16} />, label: "Delivery & Pickup" },
        { icon: <Heart size={16} />, label: "Favorites & Reviews" },
      ],
    },
    {
      title: "Trust & Safety",
      links: [
        { icon: <AlertCircle size={16} />, label: "Refund Policies" },
        { icon: <ShieldCheck size={16} />, label: "Secure Payments" },
        { icon: <Settings size={16} />, label: "Platform Guidelines" },
        { icon: <LifeBuoy size={16} />, label: "Report an Issue" },
      ],
    },
  ];

  return (
    <div 
      className="min-h-screen transition-colors duration-300 py-16 px-4 font-sans"
      style={{
        backgroundColor: theme === 'dark' ? '#111827' : '#ffffff'
      }}>
      <div className="max-w-5xl mx-auto">
        
        <header className="mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8">
            <h1 
              className="text-4xl font-black tracking-tight mb-2 italic"
              style={{ color: theme === 'dark' ? '#f9fafb' : '#111827' }}>
              Bazaar<span className="text-emerald-500">Support</span>
            </h1>
            <p 
              className="font-medium"
              style={{ color: theme === 'dark' ? '#9ca3af' : '#6b7280' }}>
              Everything you need to know about cooking, selling, and eating local.
            </p>
          </motion.div>

 
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative group max-w-3xl">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search className="text-gray-400 group-focus-within:text-emerald-500 transition-colors" size={20} />
            </div>
            <input
              type="text"
              placeholder="Search for 'How to list a meal' or 'Payouts'..."
              className="w-full border rounded-2xl py-4 pl-12 pr-4 focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all shadow-sm"
              style={{
                backgroundColor: theme === 'dark' ? '#1f2937' : '#f9fafb',
                borderColor: theme === 'dark' ? '#374151' : '#e2e8f0',
                color: theme === 'dark' ? '#f9fafb' : '#111827'
              }}/>
          </motion.div>
        </header>

     
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
          {categories.map((category, idx) => (
            <motion.section 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}>
              <h3 
                className="text-sm font-black uppercase tracking-[0.2em] mb-6 pb-2 border-b-2"
                style={{ 
                  color: theme === 'dark' ? '#10b981' : '#059669',
                  borderColor: theme === 'dark' ? '#374151' : '#ecfdf5'
                }}>
                {category.title}
              </h3>
              
              <ul className="space-y-4">
                {category.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <button 
                      className="flex items-center gap-3 transition-colors group"
                      style={{ 
                        color: theme === 'dark' ? '#9ca3af' : '#4b5563'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.color = theme === 'dark' ? '#10b981' : '#f97316';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.color = theme === 'dark' ? '#9ca3af' : '#4b5563';
                      }} >
                      <span 
                        className="p-2 rounded-xl border shadow-sm group-hover:border-emerald-200 transition-all"
                        style={{
                          backgroundColor: theme === 'dark' ? '#374151' : '#f9fafb',
                          borderColor: theme === 'dark' ? '#4b5563' : '#e2e8f0'
                        }}>
                        {link.icon}
                      </span>
                      <span className="font-bold text-sm tracking-tight">{link.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </motion.section>
          ))}
        </div>

 
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-24 p-1 rounded-[2.5rem] bg-linear-to-r from-emerald-600 via-teal-500 to-emerald-400">
          <div 
            className="rounded-[2.2rem] p-8 md:p-12 text-center"
            style={{
              backgroundColor: theme === 'dark' ? '#111827' : '#ffffff'
            }}>
            <h2 
              className="text-3xl font-black mb-4"
              style={{ color: theme === 'dark' ? '#f9fafb' : '#111827' }}>
              Still got questions?
            </h2>
            <p 
              className="mb-8 max-w-md mx-auto font-medium"
              style={{ color: theme === 'dark' ? '#9ca3af' : '#6b7280' }}>
              Our community support team is ready to help your kitchen succeed 24/7.
            </p>
            <button className="px-12 py-4 bg-[#FF7A18] text-white font-black rounded-2xl hover:bg-[#FF3D00] hover:shadow-2xl hover:shadow-orange-500/20 transition-all active:scale-95 uppercase tracking-widest text-xs">
              Talk to a Chef Advocate
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Support;