import React from 'react';
import { Link } from 'react-router-dom';
import { FiTwitter, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';

const LogoSVG = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
    <rect width="32" height="32" rx="8" fill="currentColor" fillOpacity="0.15"/>
    <path d="M9 16L16 9L23 16L16 23L9 16Z" fill="currentColor"/>
    <circle cx="16" cy="16" r="3" fill="var(--color-inverse-surface)"/>
    <path d="M16 12L20 16L16 20L12 16L16 12Z" fill="currentColor" fillOpacity="0.5"/>
  </svg>
);

const Footer: React.FC = () => {
  return (
    <footer className="bg-inverse-surface text-on-primary-container pt-20 pb-10 border-t border-outline-variant/10 shadow-[0_-20px_60px_-20px_rgba(0,0,0,0.3)]">
      <div className="max-w-[1280px] mx-auto px-5 lg:px-12 grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8">
        
        <div className="md:col-span-5 lg:col-span-4">
          <Link to="/" className="text-2xl font-bold text-white flex items-center gap-2 mb-6 tracking-tight">
            <LogoSVG />
            StudyPilot
          </Link>
          <p className="text-outline-variant leading-relaxed text-sm">
            AI-powered study planning for modern learners. Achieve your goals with personalized schedules and intelligent recommendations tailored just for you.
          </p>
          <div className="flex gap-4 mt-8">
            <a href="#" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary hover:-translate-y-1 transition-all duration-300 text-white">
              <FiTwitter className="text-lg" />
            </a>
            <a href="#" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary hover:-translate-y-1 transition-all duration-300 text-white">
              <FiGithub className="text-lg" />
            </a>
            <a href="#" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary hover:-translate-y-1 transition-all duration-300 text-white">
              <FiLinkedin className="text-lg" />
            </a>
          </div>
        </div>

        <div className="md:col-span-7 lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-8">
          <div>
            <h4 className="text-base font-semibold mb-6 text-white tracking-wide uppercase text-sm">Platform</h4>
            <ul className="flex flex-col gap-4 text-outline-variant text-sm">
              <li><Link to="/explore" className="hover:text-primary transition-colors">Explore Plans</Link></li>
              <li><Link to="/add-plan" className="hover:text-primary transition-colors">AI Generator</Link></li>
              <li><Link to="/ai-chat" className="hover:text-primary transition-colors">Tutor Chat</Link></li>
              <li><Link to="/pricing" className="hover:text-primary transition-colors">Pricing</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-base font-semibold mb-6 text-white tracking-wide uppercase text-sm">Company</h4>
            <ul className="flex flex-col gap-4 text-outline-variant text-sm">
              <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
              <li><Link to="/careers" className="hover:text-primary transition-colors">Careers</Link></li>
              <li><Link to="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
            </ul>
          </div>
          <div className="col-span-2 md:col-span-1">
            <h4 className="text-base font-semibold mb-6 text-white tracking-wide uppercase text-sm">Contact Us</h4>
            <ul className="flex flex-col gap-4 text-outline-variant text-sm">
              <li className="flex items-center gap-3">
                <FiMail className="text-primary text-lg" />
                <a href="mailto:hello@studypilot.ai" className="hover:text-white transition-colors">hello@studypilot.ai</a>
              </li>
            </ul>
          </div>
        </div>

      </div>
      <div className="max-w-[1280px] mx-auto px-5 lg:px-12 mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-outline-variant text-xs">
        <p>&copy; {new Date().getFullYear()} StudyPilot AI. All rights reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          <Link to="/cookies" className="hover:text-white transition-colors">Cookie Settings</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
