import { Home, Search, List, Library, User, Gamepad2 } from 'lucide-react';

interface AppNavigationProps {
  currentView: string;
  onNavigate: (view: string) => void;
}

export function AppNavigation({ currentView, onNavigate }: AppNavigationProps) {
  const navItems = [
    { id: 'dagens', label: 'Dagens', icon: Home },
    { id: 'opdateret', label: 'Opdateret', icon: Search },
    { id: 'spil', label: 'Spil', icon: Gamepad2 },
    { id: 'bibliotek', label: 'Bibliotek', icon: Library },
    { id: 'profil', label: 'Profil', icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 z-50 safe-area-bottom shadow-2xl">
      <div className="max-w-md mx-auto">
        <div className="grid grid-cols-5 gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`relative flex flex-col items-center justify-center py-3 px-1 transition-all ${
                  isActive
                    ? 'text-[#C8102E]'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {isActive && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-[#C8102E] to-red-600 rounded-b-full"></div>
                )}
                <Icon className={`w-6 h-6 mb-1 ${isActive ? 'stroke-[2.5]' : 'stroke-[2]'}`} />
                <span className={`text-[10px] ${isActive ? 'font-black' : 'font-medium'}`}>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
