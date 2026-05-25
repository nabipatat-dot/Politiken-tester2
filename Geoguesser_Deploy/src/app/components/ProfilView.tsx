import { Trophy, Flame, Play, Award, TrendingUp, Calendar, Target } from 'lucide-react';

interface GameHistory {
  id: string;
  name: string;
  date: string;
  score: number;
  maxScore: number;
  accuracy: number;
}

const recentGames: GameHistory[] = [
  {
    id: '1',
    name: 'GeoGuesser',
    date: 'I dag kl. 14:30',
    score: 28000,
    maxScore: 40000,
    accuracy: 70,
  },
  {
    id: '2',
    name: 'GeoGuesser',
    date: 'I går kl. 19:15',
    score: 35000,
    maxScore: 40000,
    accuracy: 88,
  },
  {
    id: '3',
    name: 'Dagens Quiz',
    date: '23 maj kl. 16:45',
    score: 4200,
    maxScore: 5000,
    accuracy: 84,
  },
  {
    id: '4',
    name: 'GeoGuesser',
    date: '22 maj kl. 20:10',
    score: 31500,
    maxScore: 40000,
    accuracy: 79,
  },
  {
    id: '5',
    name: 'Hurtig Quiz',
    date: '21 maj kl. 18:00',
    score: 3800,
    maxScore: 5000,
    accuracy: 76,
  },
];

interface Achievement {
  id: string;
  title: string;
  description: string;
  unlocked: boolean;
  progress?: number;
  maxProgress?: number;
}

const achievements: Achievement[] = [
  {
    id: '1',
    title: 'Geografi Guru',
    description: 'Få 100% præcision i GeoGuesser',
    unlocked: false,
    progress: 88,
    maxProgress: 100,
  },
  {
    id: '2',
    title: 'Ildsjæl',
    description: 'Opnå 7 dages streak',
    unlocked: true,
  },
  {
    id: '3',
    title: 'Videnshungrende',
    description: 'Spil 50 spil',
    unlocked: false,
    progress: 42,
    maxProgress: 50,
  },
  {
    id: '4',
    title: 'Mester',
    description: 'Nå 50.000 point',
    unlocked: false,
    progress: 38450,
    maxProgress: 50000,
  },
];

export function ProfilView() {
  const totalPoints = 38450;
  const currentStreak = 7;
  const gamesPlayed = 42;
  const averageScore = Math.round(totalPoints / gamesPlayed);
  const userName = 'Morten Andersen';
  const userInitials = 'MA';

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Header with Avatar */}
      <div className="bg-white border-b border-gray-200 px-6 py-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-xl font-semibold text-gray-700">{userInitials}</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">{userName}</h1>
            <p className="text-gray-600 text-sm">Politiken Læser</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="px-4 py-6">
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white border border-gray-200 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Trophy className="w-4 h-4 text-[#C8102E]" />
              <span className="text-xs text-gray-600 font-semibold">Total Point</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{totalPoints.toLocaleString()}</p>
          </div>

          <div className="bg-white border border-gray-200 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Flame className="w-4 h-4 text-[#C8102E]" />
              <span className="text-xs text-gray-600 font-semibold">Streak</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{currentStreak} dage</p>
          </div>

          <div className="bg-white border border-gray-200 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Play className="w-4 h-4 text-[#C8102E]" />
              <span className="text-xs text-gray-600 font-semibold">Spil Spillet</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{gamesPlayed}</p>
          </div>

          <div className="bg-white border border-gray-200 p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-[#C8102E]" />
              <span className="text-xs text-gray-600 font-semibold">Gns. Score</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{averageScore}</p>
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="px-4 mb-6">
        <div className="bg-white border-l-4 border-[#C8102E] p-4 mb-4 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <Award className="w-5 h-5 text-[#C8102E]" />
            <h2 className="font-bold text-gray-900">Præstationer</h2>
          </div>
          <div className="space-y-3">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`bg-white p-3 border ${
                  achievement.unlocked
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-sm text-gray-900">{achievement.title}</h3>
                      {achievement.unlocked && (
                        <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-gray-600 mb-2">{achievement.description}</p>
                    {!achievement.unlocked && achievement.progress !== undefined && achievement.maxProgress && (
                      <div>
                        <div className="bg-gray-200 h-2 overflow-hidden">
                          <div
                            className="bg-[#C8102E] h-full transition-all"
                            style={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                          />
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          {achievement.progress} / {achievement.maxProgress}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Games */}
      <div className="px-4">
        <div className="bg-white border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-5 h-5 text-[#C8102E]" />
            <h2 className="font-bold text-gray-900">Seneste Spil</h2>
          </div>
          <div className="space-y-3">
            {recentGames.map((game) => (
              <div
                key={game.id}
                className="border border-gray-200 p-3 hover:border-[#C8102E] transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-sm text-gray-900">{game.name}</h3>
                  <span className="text-xs text-gray-500">{game.date}</span>
                </div>
                <div className="flex items-center gap-4 mb-2">
                  <div className="flex items-center gap-1">
                    <Trophy className="w-4 h-4 text-[#C8102E]" />
                    <span className="text-sm font-semibold text-gray-900">
                      {game.score.toLocaleString()} / {game.maxScore.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Target className="w-4 h-4 text-[#C8102E]" />
                    <span className="text-sm font-semibold text-gray-900">{game.accuracy}%</span>
                  </div>
                </div>
                <div className="bg-gray-200 h-2 overflow-hidden">
                  <div
                    className="bg-[#C8102E] h-full transition-all"
                    style={{ width: `${game.accuracy}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
