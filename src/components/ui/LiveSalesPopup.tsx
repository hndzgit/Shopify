'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, X } from 'lucide-react';

// Random fake data to generate social proof
const FIRST_NAMES = ["Oliver", "Charlotte", "Amelia", "Noah", "Olivia", "James", "Sophia", "Lucas", "Isabella", "William", "Mia", "Benjamin", "Evelyn", "Elijah", "Harper", "Alexander"];
const LOCATIONS = ["New York, NY", "London, UK", "Los Angeles, CA", "Toronto, ON", "Sydney, NSW", "Melbourne, VIC", "Chicago, IL", "Houston, TX", "Miami, FL", "Seattle, WA"];
const TIMES = ["2 minutes ago", "5 minutes ago", "12 minutes ago", "Just now", "25 minutes ago", "1 hour ago", "14 minutes ago", "42 minutes ago"];

export default function LiveSalesPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [notification, setNotification] = useState({ name: '', location: '', time: '' });

  useEffect(() => {
    // Initial delay before first popup
    const startTimer = setTimeout(() => {
      triggerNewPopup();
    }, 5000); // 5 seconds

    return () => clearTimeout(startTimer);
  }, []);

  const triggerNewPopup = () => {
    // Pick random data
    const name = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)];
    const location = LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)];
    const time = TIMES[Math.floor(Math.random() * TIMES.length)];
    
    setNotification({ name, location, time });
    setIsVisible(true);

    // Hide after 6 seconds
    setTimeout(() => {
      setIsVisible(false);
      // Schedule next popup between 8 to 15 seconds later
      const nextDelay = Math.floor(Math.random() * 7000) + 8000;
      setTimeout(triggerNewPopup, nextDelay);
    }, 6000);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, x: -20 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="fixed bottom-24 md:bottom-8 left-4 md:left-8 z-50 bg-white/95 backdrop-blur-md shadow-[0_10px_40px_rgba(0,0,0,0.12)] border border-neutral-200 rounded-2xl p-4 w-[300px] flex gap-4 items-center cursor-pointer hover:shadow-[0_15px_50px_rgba(0,0,0,0.15)] transition-shadow"
          onClick={() => setIsVisible(false)}
        >
          <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0 border border-green-200">
            <ShoppingBag size={18} className="animate-pulse" />
          </div>
          
          <div className="flex-1 flex flex-col justify-center">
            <div className="flex justify-between items-start">
              <span className="text-xs font-medium text-neutral-500 mb-0.5 whitespace-nowrap">
                Someone in <span className="text-neutral-800 font-bold">{notification.location}</span>
              </span>
              <button onClick={(e) => { e.stopPropagation(); setIsVisible(false); }} className="text-neutral-400 hover:text-neutral-800 p-0.5">
                <X size={12} />
              </button>
            </div>
            <p className="text-sm text-neutral-900 font-bold leading-tight">
              Purchased a Device
            </p>
            <span className="text-[10px] text-green-600 font-bold mt-1 uppercase tracking-wider">
              {notification.time} • Verified
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
