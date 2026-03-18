import { Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, MessageCircle, User as UserIcon, Settings, BrainCircuit } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const Navbar = () => {
  const location = useLocation();
  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: BookOpen, label: 'Courses', path: '/courses' },
    { icon: MessageCircle, label: 'Chat', path: '/chat' },
    { icon: UserIcon, label: 'Profile', path: '/profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-3 flex justify-between items-center z-50 md:top-0 md:bottom-auto md:flex-col md:w-20 md:h-full md:border-t-0 md:border-r">
      <div className="hidden md:flex mb-8 mt-4">
        <div className="w-10 h-10 bg-[#BCDEEC] rounded-xl flex items-center justify-center">
          <BrainCircuit className="text-white w-6 h-6" />
        </div>
      </div>
      <div className="flex justify-between w-full md:flex-col md:gap-8">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center gap-1 transition-colors",
                isActive ? "text-[#BCDEEC]" : "text-gray-400 hover:text-[#FFCBE1]"
              )}
            >
              <item.icon className={cn("w-6 h-6", isActive && "fill-current")} />
              <span className="text-[10px] font-medium md:hidden">{item.label}</span>
            </Link>
          );
        })}
      </div>
      <div className="hidden md:flex mt-auto mb-4">
        <Link to="/settings" className="text-gray-400 hover:text-[#FFCBE1]">
          <Settings className="w-6 h-6" />
        </Link>
      </div>
    </nav>
  );
};
