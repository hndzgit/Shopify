"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LogIn, Loader2 } from 'lucide-react';
import { signIn } from 'next-auth/react';

export default function AdminLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;

    try {
      const result = await signIn('credentials', {
        username,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError('Invalid credentials. Please try again.');
      } else {
        window.location.href = '/admin/dashboard';
      }
    } catch (err) {
      setError('An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-luxury-black flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-3xl p-12 shadow-2xl space-y-10"
      >
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-display font-bold tracking-tighter">LUMINA <span className="text-xs font-light text-neutral-500">ADMIN</span></h1>
          <p className="text-neutral-400 text-sm">Secure access for authorized personnel only.</p>
        </div>

        {error && (
          <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">Username</label>
            <input 
              name="username"
              type="text" 
              required
              className="w-full px-6 py-4 rounded-2xl bg-neutral-50 border border-neutral-100 focus:border-black outline-none transition-all"
              placeholder="admin"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">Password</label>
            <input 
              name="password"
              type="password" 
              required
              className="w-full px-6 py-4 rounded-2xl bg-neutral-50 border border-neutral-100 focus:border-black outline-none transition-all"
              placeholder="••••••••"
            />
          </div>
          <button 
            disabled={isLoading}
            className="w-full bg-black text-white py-5 rounded-2xl font-semibold flex items-center justify-center gap-3 hover:bg-neutral-800 transition-all disabled:bg-neutral-400"
          >
            {isLoading ? <Loader2 className="animate-spin" size={20} /> : <LogIn size={20} />}
            {isLoading ? 'Authenticating...' : 'Sign In to Dashboard'}
          </button>
        </form>

        <p className="text-center text-xs text-neutral-400">
          Forgot your credentials? Contact system administrator.
        </p>
      </motion.div>
    </div>
  );
}
