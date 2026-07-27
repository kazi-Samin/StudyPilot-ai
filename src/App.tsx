import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { GoogleOAuthProvider } from '@react-oauth/google';

import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Explore from './pages/Explore';
import StudyPlanDetails from './pages/StudyPlanDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import AddStudyPlan from './pages/AddStudyPlan';
import ManageStudyPlans from './pages/ManageStudyPlans';
import Dashboard from './pages/Dashboard';
import AIChat from './pages/AIChat';
import About from './pages/About';
import Contact from './pages/Contact';
import ProfileSettings from './pages/ProfileSettings';

const queryClient = new QueryClient();

const AppLayout = () => {
  const location = useLocation();
  const hideFooter = location.pathname === '/ai-chat';

  return (
    <div className="flex flex-col min-h-screen bg-background text-on-surface transition-colors duration-300">
      <Navbar />
      <main className="flex-grow pt-[72px]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/study-plans/:id" element={<StudyPlanDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/ai-chat" element={<AIChat />} />
          
          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/study-plans/add" element={<AddStudyPlan />} />
            <Route path="/study-plans/manage" element={<ManageStudyPlans />} />
            <Route path="/settings" element={<ProfileSettings />} />
          </Route>
        </Routes>
      </main>
      {!hideFooter && <Footer />}
    </div>
  );
};

function App() {
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || '5819473927-1qek5cqr5irkou22bs8n7u9lebgejq45.apps.googleusercontent.com';
  
  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <BrowserRouter>
            <ScrollToTop />
            <AppLayout />
            <Toaster position="top-right" />
          </BrowserRouter>
        </AuthProvider>
      </QueryClientProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
