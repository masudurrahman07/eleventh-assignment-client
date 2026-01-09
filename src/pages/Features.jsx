import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import {
  ChefHat,
  ShieldCheck,
  Zap,
  Users,
  Utensils,
  Globe,
  Search,
  Heart,
  Settings,
  Store,
  ShoppingBag,
} from "lucide-react";

const Features = () => {
  const { theme } = useTheme();
  const coreFeatures = [
    {
      icon: <Utensils size={20} />,
      text: "Create Meals",
      color: "text-orange-500",
    },
    {
      icon: <Search size={20} />,
      text: "Browse & Order",
      color: "text-emerald-500",
    },
    {
      icon: <ShoppingBag size={20} />,
      text: "Manage Orders",
      color: "text-orange-500",
    },
    {
      icon: <Heart size={20} />,
      text: "Favorite Meals",
      color: "text-red-500",
    },
    {
      icon: <Users size={20} />,
      text: "Chef Profiles",
      color: "text-emerald-600",
    },
    { 
      icon: <Store size={20} />, 
      text: "Bazaar Access", 
      color: "text-sky-500" 
    },
  ];

  const infrastructure = [
    {
      icon: <ShieldCheck size={18} />,
      text: "Secure Auth",
      color: "text-emerald-500",
    },
    {
      icon: <Settings size={18} />,
      text: "Role Management",
      color: "text-orange-500",
    },
    {
      icon: <Zap size={18} />,
      text: "Realtime Tracking",
      color: "text-yellow-500",
    },
    {
      icon: <Globe size={18} />,
      text: "Local Delivery",
      color: "text-indigo-500",
    },
  ];

  return (
    <div 
      className="min-h-screen transition-colors duration-300 py-16 px-4"
      style={{
        backgroundColor: theme === 'dark' ? '#111827' : '#ffffff'
      }} >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto overflow-hidden rounded-[2.5rem] shadow-2xl border transition-colors duration-300"
        style={{
          backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
          borderColor: theme === 'dark' ? '#374151' : '#e5e7eb'
        }}>
        {/* Header Section */}
        <div className="bg-linear-to-br from-emerald-500 via-teal-600 to-emerald-700 p-10 text-center relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>

          <div className="relative z-10">
            <div className="flex justify-center items-center gap-2 mb-4">
              <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm">
                <ChefHat className="text-white" size={28} />
              </div>
              <h1 className="text-4xl font-extrabold text-white tracking-tight italic">
                LocalChef<span className="opacity-80">Bazaar</span>{" "}
                <span className="text-2xl not-italic opacity-60">v1.0</span>
              </h1>
            </div>

            <h2 className="text-5xl font-black text-white mb-4 drop-shadow-md">
              Taste the Local Magic.
            </h2>
            <p className="text-white/90 text-xl font-medium">
              Connecting home-grown talent with hungry hearts.
            </p>
          </div>
        </div>

     
        <div 
          className="p-8 md:p-12 space-y-10 transition-colors duration-300"
          style={{
            backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff'}}>
          
         
          <section>
            <div className="flex justify-between items-center mb-6">
              <h3 
                className="text-xl font-bold flex items-center gap-2"
                style={{ color: theme === 'dark' ? '#f9fafb' : '#1f2937' }}>
                Marketplace Features
              </h3>
              <span className="bg-orange-500 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter">
                Live Now
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {coreFeatures.map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-3 p-3 rounded-2xl border hover:bg-emerald-50/50 transition-colors"
                  style={{
                    borderColor: theme === 'dark' ? '#374151' : '#f9fafb',
                    backgroundColor: theme === 'dark' ? 'transparent' : 'transparent'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = theme === 'dark' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(236, 253, 245, 0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                  }}>
                  <span className={`${item.color}`}>{item.icon}</span>
                  <span 
                    className="font-semibold"
                    style={{ color: theme === 'dark' ? '#d1d5db' : '#374151' }} >
                    {item.text}
                  </span>
                </motion.div>
              ))}
            </div>
          </section>

          <hr 
            className="border-gray-100"
            style={{ borderColor: theme === 'dark' ? '#374151' : '#f3f4f6' }}
          />

      
          <section>
            <div className="flex justify-between items-center mb-6">
              <h3 
                className="text-xl font-bold"
                style={{ color: theme === 'dark' ? '#f9fafb' : '#1f2937' }} >
                Platform Security
              </h3>
              <span className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter">
                Verified
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {infrastructure.map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <span
                    className={`${item.color} p-2 rounded-xl`}
                    style={{
                      backgroundColor: theme === 'dark' ? '#374151' : '#f9fafb'
                    }} >
                    {item.icon}
                  </span>
                  <span 
                    className="font-medium"
                    style={{ color: theme === 'dark' ? '#9ca3af' : '#4b5563' }}>
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </section>

    
          <div className="pt-6">
            <Link to="/register">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-linear-to-r from-emerald-500 to-teal-600 text-white font-black py-4 rounded-2xl shadow-xl shadow-emerald-500/20 uppercase tracking-widest text-sm" >
                Join the Bazaar Today
              </motion.button>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Features;