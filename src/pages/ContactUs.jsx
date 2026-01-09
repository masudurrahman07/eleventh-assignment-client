import React from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { 
  Send, 
  MessageSquare, 
  LifeBuoy, 
  CheckCircle2, 
  ChefHat, 
  UtensilsCrossed, 
  TrendingUp 
} from 'lucide-react';
import Swal from 'sweetalert2';

const ContactUs = () => {
  const { theme } = useTheme();
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    Swal.fire({
      title: "Message Sent!",
      text: "Our team will get back to your kitchen shortly.",
      icon: "success",
      background: "linear-gradient(to right, #34d399, #14b8a6)",
      color: "#fff",
      confirmButtonColor: "#FF7A18",
      timer: 3000
    });
    reset();
  };

  return (
    <div 
      className="min-h-screen w-full font-sans overflow-hidden relative transition-colors duration-300"
      style={{
        backgroundColor: theme === 'dark' ? '#111827' : '#f8fafc'
      }}>
      
    
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0"
          style={{
            backgroundColor: theme === 'dark' ? '#111827' : '#ffffff'}}></div>
        <div 
          className="absolute inset-0 bg-linear-to-br from-emerald-500 to-teal-600"
          style={{ clipPath: 'polygon(0 60%, 100% 20%, 100% 100%, 0% 100%)' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-24">
        
       
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black mb-4 tracking-tight"
            style={{ color: theme === 'dark' ? '#f9fafb' : '#1e293b' }}>
            Contact our <span className="text-emerald-600">Bazaar</span> team
          </motion.h1>
          <p 
            className="text-lg max-w-2xl mx-auto font-medium"
            style={{ color: theme === 'dark' ? '#9ca3af' : '#64748b' }}>
            Have questions about listing your meals or placing orders? 
            Fill out the form and we'll be in touch as soon as possible.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          
        
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="rounded-[2.5rem] p-8 md:p-10 shadow-[0_20px_50px_rgba(16,185,129,0.15)] border transition-colors duration-300"
            style={{
              backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
              borderColor: theme === 'dark' ? '#374151' : 'rgba(16, 185, 129, 0.1)'
            }} >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div className="space-y-1">
                  <label 
                    className="text-xs font-black uppercase ml-1"
                    style={{ color: theme === 'dark' ? '#9ca3af' : '#94a3b8' }}  >
                    First name
                  </label>
                  <input 
                    {...register("firstName", { required: true })}
                    className="w-full border-none rounded-2xl py-4 px-5 focus:ring-2 focus:ring-emerald-500 transition-all"
                    style={{
                      backgroundColor: theme === 'dark' ? '#374151' : '#f1f5f9',
                      color: theme === 'dark' ? '#f9fafb' : '#334155'
                    }}
                    placeholder="Gordon"/>
                </div>
                <div className="space-y-1">
                  <label 
                    className="text-xs font-black uppercase ml-1"
                    style={{ color: theme === 'dark' ? '#9ca3af' : '#94a3b8' }} >
                    Last name
                  </label>
                  <input 
                    {...register("lastName", { required: true })}
                    className="w-full border-none rounded-2xl py-4 px-5 focus:ring-2 focus:ring-emerald-500 transition-all"
                    style={{
                      backgroundColor: theme === 'dark' ? '#374151' : '#f1f5f9',
                      color: theme === 'dark' ? '#f9fafb' : '#334155'
                    }}
                    placeholder="Ramsay" />
                </div>
              </div>

              <div className="space-y-1">
                <label 
                  className="text-xs font-black uppercase ml-1"
                  style={{ color: theme === 'dark' ? '#9ca3af' : '#94a3b8' }}>
                  Work email
                </label>
                <input 
                  {...register("email", { required: true })}
                  type="email"
                  className="w-full border-none rounded-2xl py-4 px-5 focus:ring-2 focus:ring-emerald-500 transition-all"
                  style={{
                    backgroundColor: theme === 'dark' ? '#374151' : '#f1f5f9',
                    color: theme === 'dark' ? '#f9fafb' : '#334155'
                  }}
                  placeholder="chef@localbazaar.com"/>
              </div>

              <div className="space-y-1">
                <label 
                  className="text-xs font-black uppercase ml-1"
                  style={{ color: theme === 'dark' ? '#9ca3af' : '#94a3b8' }}>
                  Role in the Bazaar
                </label>
                <select 
                  {...register("role")}
                  className="w-full border-none rounded-2xl py-4 px-5 focus:ring-2 focus:ring-emerald-500 transition-all appearance-none"
                  style={{
                    backgroundColor: theme === 'dark' ? '#374151' : '#f1f5f9',
                    color: theme === 'dark' ? '#f9fafb' : '#334155'
                  }} >
                  <option value="chef">Home Chef / Cook</option>
                  <option value="customer">Hungry Customer</option>
                  <option value="partner">Business Partner</option>
                </select>
              </div>

              <div className="space-y-1">
                <label 
                  className="text-xs font-black uppercase ml-1"
                  style={{ color: theme === 'dark' ? '#9ca3af' : '#94a3b8' }}>
                  How can we help?
                </label>
                <textarea 
                  {...register("message", { required: true })}
                  rows="4"
                  className="w-full border-none rounded-2xl py-4 px-5 focus:ring-2 focus:ring-emerald-500 transition-all resize-none"
                  style={{
                    backgroundColor: theme === 'dark' ? '#374151' : '#f1f5f9',
                    color: theme === 'dark' ? '#f9fafb' : '#334155'
                  }}
                  placeholder="Tell us about your project, needs, and timeline."></textarea>
              </div>

              <button 
                type="submit"
                className="w-full md:w-auto px-10 py-4 bg-[#FF7A18] hover:bg-[#FF3D00] text-white font-black rounded-2xl shadow-lg shadow-orange-500/30 transition-all flex items-center justify-center gap-2 uppercase tracking-wider text-sm">
                Send Message
                <Send size={18} />
              </button>
            </form>
          </motion.div>


          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:pt-12">
            <h3 className="text-2xl font-black mb-8 text-white drop-shadow-lg">With LocalChefBazaar you can:</h3>
            
            <ul className="space-y-8">
              <li className="flex gap-4">
                <CheckCircle2 className="text-orange-300 shrink-0" size={24} />
                <p className="font-medium text-lg leading-snug text-white drop-shadow-md">Focus your culinary passion on creating incredible meals for your neighborhood.</p>
              </li>
              <li className="flex gap-4">
                <CheckCircle2 className="text-orange-300 shrink-0" size={24} />
                <p className="font-medium text-lg leading-snug text-white drop-shadow-md">Launch your home-kitchen business faster with our streamlined listing tools.</p>
              </li>
              <li className="flex gap-4">
                <CheckCircle2 className="text-orange-300 shrink-0" size={24} />
                <p className="font-medium text-lg leading-snug text-white drop-shadow-md">Grow your income by reaching thousands of local customers looking for fresh food.</p>
              </li>
            </ul>

                    <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-10 border-t border-white/20 pt-10">
              <div className="flex gap-4">
                <MessageSquare className="text-orange-300 shrink-0" size={28} />
                <div>
                  <h4 className="font-black text-lg text-white drop-shadow-md">General Support</h4>
                  <p className="text-emerald-50 opacity-80 text-sm">For queries regarding our menu, please email <strong>info@localchefbazaar.com</strong></p>
                </div>
              </div>
              <div className="flex gap-4">
                <LifeBuoy className="text-orange-300 shrink-0" size={28} />
                <div>
                  <h4 className="font-black text-lg text-white drop-shadow-md">Technical Support</h4>
                  <p className="text-emerald-50 opacity-80 text-sm">Having issues with your chef dashboard? <span className="underline cursor-pointer font-bold">contact support →</span></p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default ContactUs;