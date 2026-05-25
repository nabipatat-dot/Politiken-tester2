import { Trophy, Flame, Play, Users, TrendingUp, Award, Clock } from 'lucide-react';
import { useState } from 'react';

interface Friend {
  id: string;
  name: string;
  initials: string;
  totalPoints: number;
  currentStreak: number;
  gamesPlayed: number;
  lastPlayed: string;
  isOnline: boolean;
}

const mockFriends: Friend[] = [
  {
    id: '1',
    name: 'Emma Nielsen',
    initials: 'EN',
    totalPoints: 28450,
    currentStreak: 12,
    gamesPlayed: 45,
    lastPlayed: '2 timer siden',
    isOnline: true,
  },
  {
    id: '2',
    name: 'Magnus Jensen',
    initials: 'MJ',
    totalPoints: 31200,
    currentStreak: 8,
    gamesPlayed: 52,
    lastPlayed: '1 time siden',
    isOnline: true,
  },
  {
    id: '3',
    name: 'Sofia Andersen',
    initials: 'SA',
    totalPoints: 19800,
    currentStreak: 5,
    gamesPlayed: 28,
    lastPlayed: '5 timer siden',
    isOnline: false,
  },
  {
    id: '4',
    name: 'Lucas Thomsen',
    initials: 'LT',
    totalPoints: 42100,
    currentStreak: 15,
    gamesPlayed: 67,
    lastPlayed: '30 min siden',
    isOnline: true,
  },
  {
    id: '5',
    name: 'Isabella Hansen',
    initials: 'IH',
    totalPoints: 25600,
    currentStreak: 3,
    gamesPlayed: 34,
    lastPlayed: '1 dag siden',
    isOnline: false,
  },
];

interface Activity {
  id: string;
  user: string;
  initials: string;
  action: string;
  points: number;
  time: string;
  gameType: string;
}

const recentActivity: Activity[] = [
  {
    id: '1',
    user: 'Magnus Jensen',
    initials: 'MJ',
    action: 'fik perfekt score i GeoGuesser',
    points: 5000,
    time: '1 time siden',
    gameType: 'GeoGuesser',
  },
  {
    id: '2',
    user: 'Emma Nielsen',
    initials: 'EN',
    action: 'opnåede 12 dages streak',
    points: 0,
    time: '2 timer siden',
    gameType: 'Streak',
  },
  {
    id: '3',
    user: 'Lucas Thomsen',
    initials: 'LT',
    action: 'blev #1 på ugens leaderboard',
    points: 42100,
    time: '3 timer siden',
    gameType: 'Leaderboard',
  },
  {
    id: '4',
    user: 'Sofia Andersen',
    initials: 'SA',
    action: 'gennemførte dagens quiz',
    points: 3500,
    time: '5 timer siden',
    gameType: 'Quiz',
  },
];

export function BibliotekView() {
  const [activeTab, setActiveTab] = useState<'venner' | 'aktivitet'>('venner');
  const [challengedFriends, setChallengedFriends] = useState<Set<string>>(new Set());

  const handleChallenge = (friendId: string) => {
    setChallengedFriends(prev => {
      const newSet = new Set(prev);
      newSet.add(friendId);
      return newSet;
    });
  };

  const sortedFriends = [...mockFriends].sort((a, b) => b.totalPoints - a.totalPoints);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Fælleskab</h1>
        <p className="text-gray-600 text-sm">
          Konkurrér med andre læsere
        </p>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b-2 border-gray-200 sticky top-0 z-10">
        <div className="flex">
          <button
            onClick={() => setActiveTab('venner')}
            className={`flex-1 py-4 font-bold transition-all ${
              activeTab === 'venner'
                ? 'text-[#C8102E] border-b-4 border-[#C8102E]'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Users className="w-5 h-5 inline-block mr-2" />
            Venner
          </button>
          <button
            onClick={() => setActiveTab('aktivitet')}
            className={`flex-1 py-4 font-bold transition-all ${
              activeTab === 'aktivitet'
                ? 'text-[#C8102E] border-b-4 border-[#C8102E]'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <TrendingUp className="w-5 h-5 inline-block mr-2" />
            Aktivitet
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6">
        {activeTab === 'venner' ? (
          <div className="space-y-4">
            {/* Leaderboard Header */}
            <div className="bg-white border-l-4 border-[#C8102E] p-4 mb-6 shadow-sm">
              <div className="flex items-center gap-2 mb-1">
                <Trophy className="w-5 h-5 text-[#C8102E]" />
                <h2 className="font-bold text-gray-900">Ugens Leaderboard</h2>
              </div>
              <p className="text-sm text-gray-600">
                Konkurrér med dine venner om højeste point
              </p>
            </div>

            {/* Friends List */}
            {sortedFriends.map((friend, index) => (
              <div
                key={friend.id}
                className="bg-white border border-gray-200 p-4 hover:border-[#C8102E] transition-all"
              >
                <div className="flex items-center gap-4">
                  {/* Rank */}
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 flex items-center justify-center">
                      <span className="text-lg font-bold text-gray-900">#{index + 1}</span>
                    </div>
                  </div>

                  {/* Avatar & Name */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <div className="relative flex-shrink-0">
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                          <span className="text-sm font-semibold text-gray-700">{friend.initials}</span>
                        </div>
                        {friend.isOnline && (
                          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-500 border-2 border-white"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 truncate">{friend.name}</h3>
                        <p className="text-xs text-gray-500">{friend.lastPlayed}</p>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center gap-1">
                        <Trophy className="w-4 h-4 text-yellow-600" />
                        <span className="text-sm font-bold text-gray-900">
                          {friend.totalPoints.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Flame className="w-4 h-4 text-orange-500" />
                        <span className="text-sm font-bold text-orange-600">
                          {friend.currentStreak} dage
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Play className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-bold text-blue-600">
                          {friend.gamesPlayed} spil
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Challenge Button */}
                  <button
                    onClick={() => handleChallenge(friend.id)}
                    disabled={challengedFriends.has(friend.id)}
                    className={`px-4 py-2 font-semibold transition-all text-xs ${
                      challengedFriends.has(friend.id)
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-[#C8102E] hover:bg-[#a00d26] text-white'
                    }`}
                  >
                    {challengedFriends.has(friend.id) ? 'Udfordret' : 'Udfordr'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {/* Activity Header */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-300 rounded-xl p-4 mb-6">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                <h2 className="font-black text-gray-900">Seneste Aktivitet</h2>
              </div>
              <p className="text-sm text-gray-700">
                Se hvad dine venner har opnået
              </p>
            </div>

            {/* Activity Feed */}
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="bg-white border border-gray-200 p-4 hover:border-[#C8102E] transition-all"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-semibold text-gray-700">{activity.initials}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900 mb-1">
                      <span className="font-bold">{activity.user}</span>{' '}
                      <span className="text-gray-700">{activity.action}</span>
                    </p>
                    {activity.points > 0 && (
                      <div className="inline-flex items-center gap-1 bg-gradient-to-r from-yellow-100 to-orange-100 px-3 py-1 rounded-full mb-2">
                        <Trophy className="w-3 h-3 text-yellow-600" />
                        <span className="text-xs font-bold text-yellow-700">
                          +{activity.points.toLocaleString()} point
                        </span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      <span>{activity.time}</span>
                      <span className="text-gray-400">•</span>
                      <span className="font-semibold text-[#C8102E]">{activity.gameType}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
