import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiMenu, FiX, FiUser, FiMoon, FiSun } from 'react-icons/fi';

const LogoSVG = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
    <rect width="32" height="32" rx="8" fill="currentColor" fillOpacity="0.1"/>
    <path d="M9 16L16 9L23 16L16 23L9 16Z" fill="currentColor"/>
    <circle cx="16" cy="16" r="3" fill="var(--color-background)"/>
    <path d="M16 12L20 16L16 20L12 16L16 12Z" fill="currentColor" fillOpacity="0.5"/>
  </svg>
);

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check initial theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
    setIsDark(!isDark);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="fixed w-full bg-surface/90 backdrop-blur-md z-50 border-b border-outline-variant h-[72px] flex items-center">
      <div className="max-w-[1280px] mx-auto w-full px-5 lg:px-12 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-primary flex items-center gap-2 tracking-tight">
          <LogoSVG />
          StudyPilot
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 font-medium">
          <Link to="/explore" className="hover:text-primary transition-colors">Explore</Link>
          <Link to="/about" className="hover:text-primary transition-colors">About</Link>
          <Link to="/ai-chat" className="hover:text-primary transition-colors">AI Chat</Link>
          
          <button onClick={toggleTheme} className="text-xl p-2 rounded-full hover:bg-surface-container transition-colors text-on-surface-variant">
            {isDark ? <FiSun /> : <FiMoon />}
          </button>
          
          {user ? (
            <>
              <Link to="/dashboard" className="hover:text-primary transition-colors">Dashboard</Link>
              <Link to="/study-plans/manage" className="hover:text-primary transition-colors">My Plans</Link>
              <div className="group relative cursor-pointer">
                <div className="flex items-center gap-2 text-primary font-semibold">
                  <FiUser className="text-xl" />
                  {user.name}
                </div>
                <div className="absolute right-0 top-full mt-2 w-48 bg-surface rounded-xl shadow-lg border border-outline-variant opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all flex flex-col overflow-hidden">
                  <Link to="/study-plans/add" className="px-4 py-3 hover:bg-surface-container transition-colors">Create Plan</Link>
                  <button onClick={handleLogout} className="px-4 py-3 text-left hover:bg-surface-container text-error transition-colors">Logout</button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/login" className="font-semibold hover:text-primary transition-colors">Log In</Link>
              <Link to="/register" className="btn-primary">Sign Up</Link>
            </div>
          )}
        </div>

        {/* Mobile Toggle & Theme */}
        <div className="md:hidden flex items-center gap-4">
          <button onClick={toggleTheme} className="text-xl p-2 rounded-full hover:bg-surface-container transition-colors text-on-surface-variant">
            {isDark ? <FiSun /> : <FiMoon />}
          </button>
          <button className="text-2xl text-on-surface" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-[72px] left-0 w-full bg-surface border-b border-outline-variant md:hidden p-5 flex flex-col gap-4 shadow-lg">
          <Link to="/explore" onClick={() => setIsOpen(false)} className="py-2">Explore</Link>
          <Link to="/about" onClick={() => setIsOpen(false)} className="py-2">About</Link>
          <Link to="/ai-chat" onClick={() => setIsOpen(false)} className="py-2">AI Chat</Link>
          {user ? (
            <>
              <Link to="/dashboard" onClick={() => setIsOpen(false)} className="py-2">Dashboard</Link>
              <Link to="/study-plans/manage" onClick={() => setIsOpen(false)} className="py-2">My Plans</Link>
              <Link to="/study-plans/add" onClick={() => setIsOpen(false)} className="py-2">Create Plan</Link>
              <button onClick={() => { handleLogout(); setIsOpen(false); }} className="py-2 text-left text-error">Logout</button>
            </>
          ) : (
            <div className="flex flex-col gap-3 mt-2">
              <Link to="/login" onClick={() => setIsOpen(false)} className="btn-secondary text-center">Log In</Link>
              <Link to="/register" onClick={() => setIsOpen(false)} className="btn-primary text-center">Sign Up</Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
