import { Globe, Brain, Zap, Trophy, Play, Gamepad2 } from 'lucide-react';

interface GamesMenuProps {
  onSelectGame: (gameId: string) => void;
}

export function GamesMenu({ onSelectGame }: GamesMenuProps) {
  const games = [
    {
      id: 'geoguesser',
      title: 'GeoGuesser',
      description: 'Læs internationale nyheder og gæt præcist hvilket land de kommer fra',
      icon: Globe,
      color: 'from-blue-500 to-cyan-500',
      image: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=800&q=80',
    },
    {
      id: 'quiz',
      title: 'Dagens Nyhedsquiz',
      description: 'Test din viden om dagens vigtigste begivenheder',
      icon: Brain,
      color: 'from-purple-500 to-pink-500',
      image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80',
    },
    {
      id: 'hurtig',
      title: 'Hurtig Quiz',
      description: 'Svar hurtigt på spørgsmål om nyere historie',
      icon: Zap,
      color: 'from-yellow-500 to-orange-500',
      image: 'https://images.unsplash.com/photo-1495020689067-958852a7765e?w=800&q=80',
    },
    {
      id: 'turnering',
      title: 'Ugentlig Turnering',
      description: 'Konkurrér mod andre læsere om ugens nyheder',
      icon: Trophy,
      color: 'from-green-500 to-emerald-500',
      image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80',
    },
  ];

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Spil & Quiz</h1>
        <p className="text-sm text-gray-600">Test din viden med Politikens spil</p>
      </div>

      {/* Games Grid */}
      <div className="px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {games.map((game) => {
            const Icon = game.icon;

            return (
              <button
                key={game.id}
                onClick={() => onSelectGame(game.id)}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <img
                    src={game.image}
                    alt={game.title}
                    className="w-full h-full object-cover"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${game.color} opacity-80 group-hover:opacity-90 transition-opacity`} />
                </div>

                {/* Content */}
                <div className="relative p-8 h-64 flex flex-col justify-between text-white">
                  <div>
                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4">
                      <Icon className="w-8 h-8" strokeWidth={2} />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{game.title}</h3>
                    <p className="text-white/90 text-sm">
                      {game.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <Play className="w-4 h-4" />
                    <span>Spil nu</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Stats Section */}
      <div className="px-6 py-8">
        <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Din aktivitet</h3>

          <div className="grid grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-[#C8102E] mb-2">42</div>
              <div className="text-sm text-gray-600">Spil gennemført</div>
            </div>
            <div className="text-center border-l border-r border-gray-200">
              <div className="text-4xl font-bold text-[#C8102E] mb-2">18</div>
              <div className="text-sm text-gray-600">Topresultater</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#C8102E] mb-2">67%</div>
              <div className="text-sm text-gray-600">Gennemsnitsscore</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
