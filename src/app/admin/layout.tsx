'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { Home, MessageSquare, Settings, LogOut, Building2, Menu, X, UserCog, Save } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [saveMessage, setSaveMessage] = useState('');
  const pathname = usePathname();
  const router = useRouter();

  // Check login status
  useEffect(() => {
    const loggedIn = localStorage.getItem('admin_logged_in');
    if (loggedIn !== 'true' && pathname !== '/admin/login') {
      router.push('/admin/login');
    } else {
      setIsLoggedIn(true);
      // Load current username for settings
      const credentials = JSON.parse(localStorage.getItem('admin_credentials') || JSON.stringify({
        username: 'Admin',
        password: 'Admin'
      }));
      setNewUsername(credentials.username);
    }

    // Hide main site header from DOM when entering admin panel
    const siteHeader = document.querySelector('header');
    const siteFooter = document.querySelector('footer');
    
    if (siteHeader) siteHeader.style.display = 'none';
    if (siteFooter) siteFooter.style.display = 'none';

    // Restore when leaving the admin panel
    return () => {
      if (siteHeader) siteHeader.style.display = '';
      if (siteFooter) siteFooter.style.display = '';
    };
  }, [pathname, router]);

  // Logout from system
  const handleLogout = () => {
    localStorage.removeItem('admin_logged_in');
    router.push('/admin/login');
  };

  // Save new settings (change username and password)
  const handleSaveSettings = () => {
    if (newPassword !== confirmPassword) {
      setSaveMessage('Password and confirmation do not match');
      return;
    }
    if (newUsername.length < 3) {
      setSaveMessage('Username must be at least 3 characters long');
      return;
    }
    if (newPassword.length < 4) {
      setSaveMessage('Password must be at least 4 characters long');
      return;
    }

    localStorage.setItem('admin_credentials', JSON.stringify({
      username: newUsername,
      password: newPassword
    }));
    setSaveMessage('✅ Settings saved successfully');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  const menuItems = [
    {
      href: '/admin',
      label: 'Properties Management',
      icon: Building2,
    },
    {
      href: '/admin/messages',
      label: 'Messages Management',
      icon: MessageSquare,
    },
    {
      href: '/admin/property-types',
      label: 'Property Types',
      icon: Building2,
    },
    {
      href: '/',
      label: 'Back to Site',
      icon: Home,
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Only show content if user is logged in */}
      {!isLoggedIn && pathname !== '/admin/login' ? (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center">
          <div className="text-white text-xl">Redirecting to login page...</div>
        </div>
      ) : (
        <>
          {/* Admin Header */}
          <header className="fixed top-0 left-0 right-0 h-16 bg-gray-800 border-b border-gray-700 z-50">
            <div className="flex items-center justify-between h-full px-4 md:px-6">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="md:hidden p-2 text-gray-400 hover:text-white"
                >
                  {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
                <Link href="/admin" className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                    <Settings className="text-white" size={20} />
                  </div>
                  <span className="font-serif text-xl text-white hidden sm:block">NOVA Realty Admin Panel</span>
                </Link>
              </div>
              
              <div className="flex items-center gap-3">
                <Link 
                  href="/"
                  className="hidden md:flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                >
                  <Home size={18} />
                  <span>View Site</span>
                </Link>
                
                {/* Settings button */}
                <button
                  onClick={() => setShowSettings(true)}
                  className="flex items-center gap-2 px-3 py-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
                  title="Change username and password"
                >
                  <UserCog size={18} />
                  <span className="hidden sm:inline">Settings</span>
                </button>
                
                {/* Logout button */}
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-3 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                  title="Logout from admin panel"
                >
                  <LogOut size={18} />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            </div>
          </header>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed top-16 left-0 bottom-0 w-64 bg-gray-800 border-r border-gray-700 z-40 transform transition-transform duration-300 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}>
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700">
          <div className="bg-gray-700/50 rounded-lg p-4">
            <p className="text-sm text-gray-400 mb-1">Logged in as</p>
            <p className="font-medium text-white">Site Admin</p>
          </div>
        </div>
      </aside>

          {/* Main Content */}
          <main className="md:ml-64 pt-16 min-h-screen">
            <div className="p-4 md:p-6 lg:p-8">
              {children}
            </div>
          </main>

          {/* Settings Modal (change username and password) */}
          {showSettings && (
            <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100] p-4">
              <div className="bg-gray-800 rounded-2xl w-full max-w-md p-6 relative">
                <button
                  onClick={() => setShowSettings(false)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-white"
                >
                  <X size={24} />
                </button>
                
                <h3 className="text-xl font-bold text-white mb-6">⚙️ Change Login Information</h3>
                
                {saveMessage && (
                  <div className={`p-3 rounded-lg mb-4 ${
                    saveMessage.includes('✅') ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                  }`}>
                    {saveMessage}
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">New Username</label>
                    <input
                      type="text"
                      value={newUsername}
                      onChange={(e) => setNewUsername(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                      placeholder="New username"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">New Password</label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                      placeholder="New password (minimum 4 characters)"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Confirm New Password</label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                      placeholder="Confirm your password"
                    />
                  </div>

                  <button
                    onClick={handleSaveSettings}
                    className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <Save size={18} />
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}