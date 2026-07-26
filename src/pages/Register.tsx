import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { useAuth } from '../context/AuthContext';
import { GoogleLogin } from '@react-oauth/google';
import toast from 'react-hot-toast';

const Register: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      const data = await authService.register({ 
        name: formData.name, 
        email: formData.email, 
        password: formData.password 
      });
      login(data.token, data.user);
      toast.success('Registration successful');
      navigate('/dashboard');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      const data = await authService.googleLogin(credentialResponse.credential);
      login(data.token, data.user);
      toast.success('Google login successful');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Google login failed');
    }
  };

  return (
    <div className="min-h-screen bg-surface-container-low flex items-center justify-center p-5 py-20">
      <div className="card w-full max-w-md p-8 shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Create Account</h1>
          <p className="text-on-surface-variant mt-2">Join StudyPilot to turbocharge your learning</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input 
              type="text" required 
              value={formData.name} 
              onChange={e => setFormData({...formData, name: e.target.value})}
              className="w-full px-4 py-3 rounded-xl border border-outline-variant focus:border-primary outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email Address</label>
            <input 
              type="email" required 
              value={formData.email} 
              onChange={e => setFormData({...formData, email: e.target.value})}
              className="w-full px-4 py-3 rounded-xl border border-outline-variant focus:border-primary outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input 
              type="password" required 
              value={formData.password} 
              onChange={e => setFormData({...formData, password: e.target.value})}
              className="w-full px-4 py-3 rounded-xl border border-outline-variant focus:border-primary outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Confirm Password</label>
            <input 
              type="password" required 
              value={formData.confirmPassword} 
              onChange={e => setFormData({...formData, confirmPassword: e.target.value})}
              className="w-full px-4 py-3 rounded-xl border border-outline-variant focus:border-primary outline-none"
            />
          </div>
          
          <button type="submit" disabled={loading} className="w-full btn-primary py-3 text-lg mt-4">
            {loading ? 'Creating...' : 'Sign Up'}
          </button>
        </form>

        <div className="mt-6 flex flex-col gap-4">
          <div className="relative flex items-center py-2">
            <div className="flex-grow border-t border-outline-variant"></div>
            <span className="flex-shrink-0 mx-4 text-outline text-sm">Or sign up with</span>
            <div className="flex-grow border-t border-outline-variant"></div>
          </div>
          <div className="flex justify-center">
            <GoogleLogin onSuccess={handleGoogleSuccess} onError={() => toast.error('Google login failed')} />
          </div>
        </div>

        <p className="text-center mt-6 text-on-surface-variant">
          Already have an account? <Link to="/login" className="text-primary font-bold hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
