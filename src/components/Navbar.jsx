
import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Sun, Moon, Menu, X } from "lucide-react";
import useAuth from "../auth/useAuth";
import { useTheme } from "../contexts/ThemeContext";
import logo from "../assets/logo.jpg";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const mobileMenuRef = useRef(null);


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  

  const handleLogout = () => {
    logout();
    navigate("/login");
    setMobileMenuOpen(false);
  };

  const dashboardPath = React.useMemo(() => {
    if (!user) return "/login";
    switch (user.role) {
      case "admin":
        return "/dashboard/admin";
      case "chef":
        return "/dashboard/chef";
      default:
        return "/dashboard/user";}
  }, [user]);


  const desktopNavLinks = [
    { name: "Home", path: "/" },
    { name: "Meals", path: "/meals" },
    ...(!user ? [{ name: "Features", path: "/features" }] : []),
    ...(user ? [
      { name: "Pricing", path: "/pricing" },
      { name: "Support", path: "/support" },
      { name: "Dashboard", path: dashboardPath }
    ] : []),
  ];

  const mobileNavLinks = [
    { name: "Home", path: "/" },
    { name: "Meals", path: "/meals" },
    ...(!user ? [{ name: "Features", path: "/features" }] : []),
    ...(user ? [
      { name: "Pricing", path: "/pricing" },
      { name: "Support", path: "/support" },
      { name: "Dashboard", path: dashboardPath }
    ] : []),

    ...(!user ? [
      { name: "Login", path: "/login", isButton: true, style: "primary" },
      { name: "Register", path: "/register", isButton: true, style: "secondary" }
    ] : []),
  ];

  return (
    <nav className="bg-gradient-to-br from-emerald-200 via-emerald-300 to-emerald-400 shadow-md sticky top-0 z-50 transition-colors duration-300 border-b border-emerald-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
        
          <Link to="/" className="flex items-center space-x-2">
            <img
              src={logo}
              alt="LocalChefBazaar Logo"
              className="h-14 w-14 rounded-lg"/>

            <span className="font-bold text-xl text-slate-800 drop-shadow-sm"> LocalChefBazaar </span>
          </Link>

        
          <div className="hidden md:flex items-center space-x-6">
            {/* Navigation Links */}
            <div className="flex space-x-6">
              {desktopNavLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    isActive
                      ? "text-slate-800 font-bold border-b-2 border-slate-800 pb-1"
                      : "text-slate-700 hover:text-slate-900 font-semibold transition-colors"}>
                  {link.name}
                </NavLink>
              ))}
            </div>

          
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-white/30 hover:bg-white/50 transition-colors border border-white/40 backdrop-blur-sm"
              aria-label="Toggle theme">
              {theme === 'light' ? (
                <Moon className="w-5 h-5 text-slate-700" />
              ) : (
                <Sun className="w-5 h-5 text-slate-600" />
              )}
            </button>

        
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="relative group">
                  <button className="flex items-center space-x-2 p-1 rounded-lg hover:bg-white/20 transition-colors">
                    <img
                      src={user.profileImage || "https://i.ibb.co/3rQZVgv/default-user.png"}
                      alt="User Avatar"
                      className="h-10 w-10 rounded-lg border-2 border-slate-700"/>
                  </button>
                  
             
                  <div 
                    className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg py-1 z-50 border border-slate-200 transition-all duration-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible">
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 transition-colors">
                      Sign out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex space-x-3">
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-lg text-white bg-slate-700 hover:bg-slate-800 shadow-md transition-colors font-semibold">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 rounded-lg font-semibold border-2 border-slate-700 text-slate-700 hover:bg-slate-700 hover:text-white backdrop-blur-sm shadow-sm transition-all duration-300">
                  Register
                </Link>
              </div>
            )}
          </div>

         
          <div className="md:hidden flex items-center space-x-2">
         
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-white/30 hover:bg-white/50 transition-colors border border-white/40 backdrop-blur-sm"
              aria-label="Toggle theme">
              {theme === 'light' ? (
                <Moon className="w-4 h-4 text-slate-700" />
              ) : (
                <Sun className="w-4 h-4 text-slate-600" />
              )}
            </button>

     
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-white/30 hover:bg-white/50 transition-colors border border-white/40 backdrop-blur-sm"
              aria-label="Toggle mobile menu">
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-slate-700" />
              ) : (
                <Menu className="w-5 h-5 text-slate-700" />
              )}
            </button>
          </div>
        </div>


        {mobileMenuOpen && (
          <div 
            className="md:hidden fixed inset-0 bg-black bg-opacity-50"
            style={{ zIndex: 9998 }}
            onClick={() => setMobileMenuOpen(false)}/>
        )}

 
        <div 
          ref={mobileMenuRef}
          className={`md:hidden fixed top-0 right-0 h-full w-80 transform transition-transform duration-300 ease-in-out shadow-2xl ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          style={{
            backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
            borderLeft: theme === 'dark' ? '1px solid #374151' : '1px solid #e5e7eb',
            zIndex: 9999,
            maxWidth: '90vw', 
            minHeight: '100vh' 
          }}>
    
          <div 
            className="flex items-center justify-between p-4 border-b"
            style={{ borderColor: theme === 'dark' ? '#374151' : '#e5e7eb' }}>
            <div className="flex items-center space-x-2">
              <img
                src={logo}
                alt="LocalChefBazaar Logo"
                className="h-10 w-10 rounded-lg"/>
              <span className="font-bold text-lg text-slate-800">
                LocalChefBazaar
              </span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors">
              <X className="w-5 h-5 text-slate-700" />
            </button>
          </div>

         
          <div className="h-full flex flex-col">
        
            <div className="py-4">
              {mobileNavLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) => {
                    if (link.isButton) {
               
                      return `block mx-6 my-2 px-4 py-3 text-center font-medium rounded-lg transition-colors ${
                        link.style === 'primary' 
                          ? 'text-white bg-slate-700 hover:bg-slate-800' 
                          : 'border-2 border-slate-700 text-slate-700 hover:bg-slate-700 hover:text-white'
                      }`;
                    }
              
                    return `block px-6 py-4 text-lg font-medium transition-colors border-l-4 ${
                      isActive 
                        ? 'border-slate-800 bg-slate-100 text-slate-900' 
                        : 'border-transparent hover:border-slate-400 text-slate-700 hover:text-slate-900'
                    }`;
                  }}
                  style={({ isActive }) => {
                    if (link.isButton) {
                  
                      return {};
                    }
            
                    return {};
                  }}>
                  {link.name}
                </NavLink>
              ))}
              
 
              {user && (
                <button
                  onClick={handleLogout}
                  className="block mx-6 my-2 w-auto px-4 py-3 text-center font-medium rounded-lg transition-colors text-white bg-red-600 hover:bg-red-700">
                  Sign Out
                </button>
              )}
            </div>

            {user && (
              <div 
                className="border-t p-4 mt-auto border-slate-300">
                <div className="flex items-center space-x-3 p-3 rounded-lg bg-white/20">
                  <img
                    src={user.profileImage || "https://i.ibb.co/3rQZVgv/default-user.png"}
                    alt="User Avatar"
                    className="h-10 w-10 rounded-full border-2 border-slate-700"/>
                  <div>
                    <p className="font-semibold text-sm text-slate-800">
                      {user.name || 'User'}
                    </p>
                    <p className="text-xs text-slate-600">
                      {user.email}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
