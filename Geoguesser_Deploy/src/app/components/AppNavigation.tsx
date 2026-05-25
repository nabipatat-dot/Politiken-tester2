import { Home, Clock, Gamepad2, Library, User } from 'lucide-react';

interface AppNavigationProps {
  currentView: string;
  onNavigate: (view: string) => void;
}

export function AppNavigation({ currentView, onNavigate }: AppNavigationProps) {
  const navItems = [
    { id: 'dagens', label: 'Forside', icon: Home },
    { id: 'opdateret', label: 'Seneste', icon: Clock },
    { id: 'spil', label: 'Spil', icon: Gamepad2 },
    { id: 'bibliotek', label: 'Arkiv', icon: Library },
    { id: 'profil', label: 'Profil', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50" style={{ background: '#fff', borderTop: '2px solid #111111' }}>
      <div className="max-w-lg mx-auto">
        <div className="grid grid-cols-5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className="relative flex flex-col items-center justify-center py-3 gap-1 transition-colors"
                style={{ color: isActive ? 'var(--pol-red)' : 'var(--pol-gray-500)' }}
              >
                {isActive && (
                  <div
                    className="absolute top-0 left-0 right-0 h-0.5"
                    style={{ background: 'var(--pol-red)' }}
                  />
                )}
                <Icon size={20} strokeWidth={isActive ? 2.5 : 1.8} />
                <span
                  className="text-[10px] tracking-wide uppercase"
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontWeight: isActive ? 700 : 400,
                    letterSpacing: '0.06em',
                  }}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
