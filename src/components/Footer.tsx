import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-inverse-surface text-on-primary-container pt-16 pb-8">
      <div className="max-w-[1280px] mx-auto px-5 lg:px-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <Link to="/" className="text-2xl font-bold text-secondary-container flex items-center gap-2 mb-4">
            <span className="material-symbols-outlined">menu_book</span>
            StudyPilot
          </Link>
          <p className="text-outline-variant leading-relaxed">
            AI-powered study planning for modern learners. Achieve your goals with personalized schedules and intelligent recommendations.
          </p>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4 text-white">Platform</h4>
          <ul className="flex flex-col gap-3 text-outline-variant">
            <li><Link to="/explore" className="hover:text-white transition-colors">Explore Plans</Link></li>
            <li><Link to="/about" className="hover:text-white transition-colors">How it Works</Link></li>
            <li><Link to="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4 text-white">Company</h4>
          <ul className="flex flex-col gap-3 text-outline-variant">
            <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            <li><Link to="/careers" className="hover:text-white transition-colors">Careers</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4 text-white">Connect</h4>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-on-surface flex items-center justify-center hover:bg-primary transition-colors text-white">
              <span className="material-symbols-outlined">link</span>
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-on-surface flex items-center justify-center hover:bg-primary transition-colors text-white">
              <span className="material-symbols-outlined">mail</span>
            </a>
          </div>
        </div>
      </div>
      <div className="max-w-[1280px] mx-auto px-5 lg:px-12 mt-12 pt-8 border-t border-on-surface flex flex-col md:flex-row justify-between items-center text-outline-variant text-sm">
        <p>&copy; {new Date().getFullYear()} StudyPilot AI. All rights reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
