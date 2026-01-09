import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import useAuth from "../auth/useAuth";
import Swal from "sweetalert2";
import { Mail, Lock, Check, UserPlus, KeyRound, Eye, EyeOff, ChefHat, Shield } from "lucide-react"; 
import { FcGoogle } from "react-icons/fc"; 

const Login = () => {
  const { loginUser, loginWithGoogle } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/"; 

  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);


  const fillAdminCredentials = () => {
    setValue('email', 'adminbhai@gmail.com');
    setValue('password', 'admin');
  };

  const showSuccessAlert = () => {
    Swal.fire({
      title: "Welcome Back!",
      text: "Logged in successfully",
      icon: "success",
      iconColor: "#fff",
      background: "linear-gradient(to right, #34d399, #14b8a6)", 
      color: "#fff",
      showConfirmButton: false,
      timer: 2000,
      customClass: {
        popup: 'rounded-[2rem] border-none shadow-2xl'
      }
    });
  };

  const onSubmit = async (data) => {
    try {
      await loginUser(data.email, data.password);
      showSuccessAlert();
      navigate(from, { replace: true });
    } catch (err) {
      Swal.fire({
        title: "Login Failed",
        text: err.message,
        icon: "error",
        background: "#111827",
        color: "#fff",
        confirmButtonColor: "#FF7A18"
      });
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      showSuccessAlert();
      navigate(from, { replace: true });
    } catch (err) {
      Swal.fire("Error", "Google login failed.", "error");
    }
  };

  return (
    <div 
      className="flex-1 w-full flex items-center justify-center font-sans p-4 relative overflow-hidden transition-colors duration-300"
      style={{
        background: 'linear-gradient(135deg, #FFB347 0%, #FF8C42 100%)',
        minHeight: 'calc(100vh - 64px)' 
      }}>
      

      <div 
        className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] opacity-20 blur-[120px] rounded-full"
        style={{
          backgroundColor: '#FFFFFF'}}></div>
      <div 
        className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] opacity-15 blur-[120px] rounded-full"
        style={{
          backgroundColor: '#FF6B35'}}></div>
      <div 
        className="absolute top-[20%] right-[10%] w-[30%] h-[30%] opacity-10 blur-[100px] rounded-full"
        style={{
          backgroundColor: '#FFD23F'}}></div>

      
      <div 
        className="absolute inset-0 z-0 opacity-5" 
        style={{ 
          backgroundImage: 'radial-gradient(#ffffff 0.5px, transparent 0.5px)', 
          backgroundSize: '30px 30px' 
        }} >
      </div>

    
      <div 
        className="w-full max-w-[440px] backdrop-blur-3xl rounded-[3rem] p-10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] z-10 border transition-colors duration-300"
        style={{
          backgroundColor: 'rgba(248, 250, 252, 0.85)',
          borderColor: 'rgba(255, 255, 255, 0.4)'}}>
        
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 shadow-[0_10px_20px_rgba(255,140,66,0.3)] rotate-3 hover:rotate-0 transition-transform duration-500" style={{ background: 'linear-gradient(135deg, #FFB347 0%, #FF8C42 100%)' }}>
            <ChefHat className="text-white" size={32} />
          </div>
          
          <h1 
            className="text-3xl font-black tracking-tighter mb-2 italic"
            style={{ color: '#334155' }}>
            LocalChef<span className="text-[#e67e22]">Bazaar</span>
          </h1>
          <p 
            className="text-sm font-medium tracking-wide"
            style={{ color: '#64748b' }}>
            Enter the flavor marketplace
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          
          <div className="space-y-1">
            <div className="relative group">
              <Mail 
                className="absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-[#e67e22] transition-colors" 
                size={18}
                style={{ color: '#94a3b8' }}/>
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                placeholder="Email Address"
                className="w-full border rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-[#e67e22] focus:ring-4 focus:ring-[#e67e22]/10 transition-all"
                style={{
                  backgroundColor: 'rgba(248, 250, 252, 0.8)',
                  borderColor: 'rgba(148, 163, 184, 0.3)',
                  color: '#475569'}}/>
            </div>
          </div>

          <div className="space-y-1">
            <div className="relative group">
              <Lock 
                className="absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-[#e67e22] transition-colors" 
                size={18}
                style={{ color: '#94a3b8' }}/>
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", { required: "Password is required" })}
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
                style={{ color: '#94a3b8' }} >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="mt-2 hover:shadow-[0_0_20px_rgba(230,126,34,0.3)] active:scale-[0.98] text-white font-black py-4 rounded-2xl flex items-center justify-center gap-2 transition-all"
            style={{ background: 'linear-gradient(135deg, #f39c12 0%, #e67e22 100%)' }}>
            SIGN IN
            <Check size={20} />
          </button>
        </form>

        <div className="mt-8 flex flex-col gap-6">
          <div className="flex items-center gap-4 px-4">
            <div 
              className="h-px flex-1"
              style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }}></div>
            <span 
              className="text-[10px] uppercase tracking-[0.2em] font-black"
              style={{ color: '#9ca3af' }}>
              Fast Login
            </span>
            <div 
              className="h-px flex-1"
              style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }}></div>
          </div>

          <button 
            type="button"
            onClick={handleGoogleLogin}
            className="flex items-center justify-center gap-3 w-full py-4 px-4 border rounded-2xl hover:bg-opacity-80 transition-all duration-300 text-sm font-bold shadow-sm"
            style={{
              backgroundColor: 'rgba(248, 250, 252, 0.8)',
              borderColor: 'rgba(148, 163, 184, 0.3)',
              color: '#64748b'
            }}>
            <FcGoogle size={22} />
            Sign in with Google
          </button>

          <button 
            type="button"
            onClick={fillAdminCredentials}
            className="flex items-center justify-center gap-3 w-full py-4 px-4 border rounded-2xl hover:bg-opacity-80 transition-all duration-300 text-sm font-bold shadow-sm"
            style={{
              backgroundColor: 'rgba(230, 126, 34, 0.08)',
              borderColor: '#e67e22',
              color: '#e67e22' }}>
            <Shield size={22} />
            Admin Login (Demo)
          </button>

          <div className="flex justify-between items-center mt-2 px-2">
            <Link 
              to="/register" 
              className="text-xs hover:text-[#e67e22] transition-colors font-bold flex items-center gap-1"
              style={{ color: '#64748b' }}>
              <UserPlus size={14} />
              New Chef?
            </Link>

            <Link 
              to="/forgot-password" 
              className="text-xs hover:text-[#e67e22] transition-colors font-bold flex items-center gap-1"
              style={{ color: '#64748b' }}>
              <KeyRound size={14} />
              Reset Pass
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;