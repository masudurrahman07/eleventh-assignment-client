import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';
import { useTheme } from '../contexts/ThemeContext';
import Swal from 'sweetalert2';
import { 
  User, 
  Mail, 
  Image as ImageIcon, 
  MapPin, 
  Lock, 
  Eye, 
  EyeOff, 
  ChefHat, 
  UserPlus 
} from 'lucide-react';

const Register = () => {
  const { registerUser } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const { 
    register, 
    handleSubmit, 
    watch, 
    formState: { errors } 
  } = useForm();

  const password = watch('password');


  const showSuccessAlert = () => {
    Swal.fire({
      title: 'Account Created!',
      text: 'Welcome to the Bazaar family!',
      icon: 'success',
      iconColor: '#fff',
      background: 'linear-gradient(to right, #34d399, #14b8a6)', 
      color: '#fff',
      showConfirmButton: false,
      timer: 2000,
      customClass: {
        popup: 'rounded-[2.5rem] border-none shadow-2xl'
      }
    });
  };

  const onSubmit = async (data) => {
    try {
      await registerUser(
        data.name,
        data.email,
        data.password,
        data.profileImage,
        data.address
      );
      showSuccessAlert();
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: err.message || 'Something went wrong.',
        background: "#111827",
        color: "#fff",
        confirmButtonColor: "#FF7A18"
      });
    }
  };

  return (
    <div 
      className="min-h-screen w-full flex items-center justify-center font-sans p-6 relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #FFB347 0%, #FF8C42 100%)'
      }}>

      <div className="absolute top-[-5%] left-[-5%] w-[50%] h-[50%] bg-white/5 opacity-30 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-white/5 opacity-25 blur-[120px] rounded-full"></div>
      <div className="absolute top-[30%] left-[25%] w-[35%] h-[35%] bg-white/5 opacity-20 blur-[100px] rounded-full"></div>


      <div 
        className="absolute inset-0 z-0 opacity-5" 
        style={{ 
          backgroundImage: 'radial-gradient(white 0.5px, transparent 0.5px)', 
          backgroundSize: '30px 30px' 
        }}
      >
      </div>

    
      <div 
        className="w-full max-w-[550px] backdrop-blur-3xl rounded-[3rem] p-8 md:p-12 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] z-10 border my-10"
        style={{
          backgroundColor: 'rgba(248, 250, 252, 0.85)',
          borderColor: 'rgba(255, 255, 255, 0.4)'}}>
        
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-linear-to-tr from-[#FF7A18] to-[#FF3D00] rounded-2xl mb-4 shadow-[0_10px_20px_rgba(255,122,24,0.3)] -rotate-3 hover:rotate-0 transition-transform duration-500">
            <ChefHat className="text-white" size={28} />
          </div>
          
          <h1 
            className="text-3xl font-black tracking-tighter mb-1 italic"
            style={{ color: '#334155' }}>
            Chef <span className="text-[#e67e22]">Registration</span>
          </h1>
          <p 
            className="text-sm font-medium"
            style={{ color: '#64748b' }}>
            Join the most colorful kitchen marketplace
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
         
          <div className="md:col-span-2 space-y-1">
            <div className="relative group">
              <User 
                className="absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-[#e67e22] transition-colors" 
                size={18}
                style={{ color: '#94a3b8' }}/>
              <input
                type="text"
                {...register('name', { required: 'Name is required' })}
                placeholder="Full Name"
                className="w-full border rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-[#e67e22] focus:ring-4 focus:ring-[#e67e22]/10 transition-all"
                style={{
                  backgroundColor: 'rgba(248, 250, 252, 0.8)',
                  borderColor: 'rgba(148, 163, 184, 0.3)',
                  color: '#475569'
                }}/>
            </div>
          </div>

        
          <div className="md:col-span-2 space-y-1">
            <div className="relative group">
              <Mail 
                className="absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-[#e67e22] transition-colors" 
                size={18}
                style={{ color: '#94a3b8' }} />
              <input
                type="email"
                {...register('email', { required: 'Email is required' })}
                placeholder="Email Address"
                className="w-full border rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-[#e67e22] focus:ring-4 focus:ring-[#e67e22]/10 transition-all"
                style={{
                  backgroundColor: 'rgba(248, 250, 252, 0.8)',
                  borderColor: 'rgba(148, 163, 184, 0.3)',
                  color: '#475569' }}/>
            </div>
          </div>

       
          <div className="space-y-1">
            <div className="relative group">
              <ImageIcon 
                className="absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-[#e67e22] transition-colors" 
                size={18}
                style={{ color: '#94a3b8' }}/>
              <input
                type="text"
                {...register('profileImage', { required: 'Required' })}
                placeholder="Photo URL"
                className="w-full border rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-[#e67e22] focus:ring-4 focus:ring-[#e67e22]/10 transition-all"
                style={{
                  backgroundColor: 'rgba(248, 250, 252, 0.8)',
                  borderColor: 'rgba(148, 163, 184, 0.3)',
                  color: '#475569'
                }}/>
            </div>
          </div>

    
          <div className="space-y-1">
            <div className="relative group">
              <MapPin 
                className="absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-[#e67e22] transition-colors" 
                size={18}
                style={{ color: '#94a3b8' }} />
              <input
                type="text"
                {...register('address', { required: 'Required' })}
                placeholder="Address"
                className="w-full border rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-[#e67e22] focus:ring-4 focus:ring-[#e67e22]/10 transition-all"
                style={{
                  backgroundColor: 'rgba(248, 250, 252, 0.8)',
                  borderColor: 'rgba(148, 163, 184, 0.3)',
                  color: '#475569'
                }}/>
            </div>
          </div>


          <div className="space-y-1">
            <div className="relative group">
              <Lock 
                className="absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-[#e67e22] transition-colors" 
                size={18}
                style={{ color: '#94a3b8' }} />
              <input
                type={showPassword ? 'text' : 'password'}
                {...register('password', {
                  required: 'Required',
                  minLength: { value: 6, message: 'Min 6 chars' },
                })}
                placeholder="Password"
                className="w-full border rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-[#e67e22] focus:ring-4 focus:ring-[#e67e22]/10 transition-all"
                style={{
                  backgroundColor: 'rgba(248, 250, 252, 0.8)',
                  borderColor: 'rgba(148, 163, 184, 0.3)',
                  color: '#475569'
                }}/>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 hover:text-[#e67e22] transition-colors"
                style={{ color: '#94a3b8' }}>
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div className="space-y-1">
            <div className="relative group">
              <Lock 
                className="absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-[#e67e22] transition-colors" 
                size={18}
                style={{ color: '#94a3b8' }} />
              <input
                type="password"
                {...register('confirmPassword', {
                  required: 'Confirm it',
                  validate: value => value === password || 'No match',
                })}
                placeholder="Confirm"
                className="w-full border rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-[#e67e22] focus:ring-4 focus:ring-[#e67e22]/10 transition-all"
                style={{
                  backgroundColor: 'rgba(248, 250, 252, 0.8)',
                  borderColor: 'rgba(148, 163, 184, 0.3)',
                  color: '#475569'
                }}/>
            </div>
          </div>

          <button
            type="submit"
            className="md:col-span-2 mt-6 hover:shadow-[0_0_20px_rgba(230,126,34,0.3)] active:scale-[0.98] text-white font-black py-4 rounded-2xl flex items-center justify-center gap-2 transition-all"
            style={{ background: 'linear-gradient(135deg, #f39c12 0%, #e67e22 100%)' }}>
            CREATE YOUR PROFILE
            <UserPlus size={20} />
          </button>
        </form>

        <div className="mt-10 pt-6 border-t text-center" style={{ borderColor: 'rgba(148, 163, 184, 0.3)' }}>
          <p className="text-sm font-medium" style={{ color: '#64748b' }}>
            Already part of the Bazaar?{' '}
            <Link to="/login" className="font-black hover:text-[#d35400] transition-colors underline underline-offset-8 decoration-2" style={{ color: '#e67e22' }}>
              Sign In Here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;