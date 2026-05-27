import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Camera, ClipboardList, Brain, User } from 'lucide-react';

const BottomNav = () => {
  const tabs = [
    { name: 'Home', path: '/', icon: <Home size={20} /> },
    { name: 'Scanner', path: '/outfit-scanner', icon: <Camera size={20} /> },
    { name: 'Prep', path: '/event-prep', icon: <ClipboardList size={20} /> },
    { name: 'Trainer', path: '/trainer', icon: <Brain size={20} /> },
    { name: 'Profile', path: '/dashboard', icon: <User size={20} /> }
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 h-[64px] bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-t border-slate-200 dark:border-slate-800 z-50 flex items-center justify-around pb-safe">
      {tabs.map((tab) => (
        <NavLink
          key={tab.name}
          to={tab.path}
          end={tab.path === '/'}
          className={({ isActive }) =>
            `flex flex-col items-center justify-center w-full h-full space-y-1 relative transition-colors ${
              isActive ? 'text-violet-600 dark:text-violet-400' : 'text-slate-500 dark:text-slate-400'
            }`
          }
        >
          {({ isActive }) => (
            <>
              {isActive && (
                <span className="absolute top-1 w-1 h-1 rounded-full bg-violet-600 dark:bg-violet-400" />
              )}
              <div className="mt-2">{tab.icon}</div>
              <span className="text-[10px] font-bold">{tab.name}</span>
            </>
          )}
        </NavLink>
      ))}
    </div>
  );
};

export default BottomNav;
