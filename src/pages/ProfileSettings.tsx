import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { userService } from '../services/userService';
import toast from 'react-hot-toast';

const ProfileSettings: React.FC = () => {
  const { user, updateUser } = useAuth();
  
  // Profile Form State
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [isProfileLoading, setIsProfileLoading] = useState(false);

  // Password Form State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordLoading, setIsPasswordLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setAvatar(user.avatar || '');
    }
  }, [user]);

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return toast.error('Name cannot be empty');
    
    setIsProfileLoading(true);
    try {
      const updatedUser = await userService.updateProfile({ name, avatar });
      updateUser(updatedUser);
      toast.success('Profile updated successfully!');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setIsProfileLoading(false);
    }
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      return toast.error('New passwords do not match');
    }
    if (newPassword.length < 6) {
      return toast.error('Password must be at least 6 characters long');
    }
    
    setIsPasswordLoading(true);
    try {
      await userService.updatePassword({ currentPassword, newPassword });
      toast.success('Password updated successfully!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to update password');
    } finally {
      setIsPasswordLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-5 py-10 max-w-4xl">
      <h1 className="text-3xl font-bold text-on-surface mb-8">Account Settings</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        
        {/* Profile Details Section */}
        <div className="card p-8">
          <h2 className="text-xl font-bold mb-6 text-primary flex items-center gap-2">
            <span className="material-symbols-outlined">person</span>
            Profile Details
          </h2>
          
          <div className="flex justify-center mb-6">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary-container bg-surface-container-high flex items-center justify-center">
              {avatar || user?.avatar ? (
                <img src={avatar || user?.avatar} alt="Profile" className="w-full h-full object-cover" onError={(e) => { (e.target as any).src = ''; setAvatar(''); }} />
              ) : (
                <span className="material-symbols-outlined text-6xl text-outline">person</span>
              )}
            </div>
          </div>

          <form onSubmit={handleProfileUpdate} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-on-surface-variant mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-surface-container-low border border-outline-variant focus:border-primary outline-none text-on-surface transition-colors"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-on-surface-variant mb-1">Avatar Image URL (Optional)</label>
              <input
                type="url"
                value={avatar}
                onChange={(e) => setAvatar(e.target.value)}
                placeholder="https://example.com/my-avatar.jpg"
                className="w-full px-4 py-3 rounded-xl bg-surface-container-low border border-outline-variant focus:border-primary outline-none text-on-surface transition-colors"
              />
              <p className="text-xs text-outline mt-1">Paste a direct link to an image.</p>
            </div>
            <button type="submit" disabled={isProfileLoading} className="w-full btn-primary py-3 mt-4">
              {isProfileLoading ? 'Saving...' : 'Save Profile Changes'}
            </button>
          </form>
        </div>

        {/* Security Section */}
        <div className="card p-8">
          <h2 className="text-xl font-bold mb-6 text-error flex items-center gap-2">
            <span className="material-symbols-outlined">lock</span>
            Security
          </h2>
          
          <form onSubmit={handlePasswordUpdate} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-on-surface-variant mb-1">Current Password</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-surface-container-low border border-outline-variant focus:border-error outline-none text-on-surface transition-colors"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-on-surface-variant mb-1">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-surface-container-low border border-outline-variant focus:border-error outline-none text-on-surface transition-colors"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-on-surface-variant mb-1">Confirm New Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-surface-container-low border border-outline-variant focus:border-error outline-none text-on-surface transition-colors"
                required
              />
            </div>
            <button type="submit" disabled={isPasswordLoading} className="w-full bg-error hover:bg-error/90 text-white font-bold py-3 rounded-xl mt-4 transition-colors">
              {isPasswordLoading ? 'Updating...' : 'Update Password'}
            </button>
            <p className="text-xs text-center text-outline-variant mt-4">
              Note: If you signed up with Google, you cannot change your password here.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
