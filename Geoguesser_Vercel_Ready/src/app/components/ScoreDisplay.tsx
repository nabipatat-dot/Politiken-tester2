import { Trophy, MapPin, Target } from "lucide-react";

interface ScoreDisplayProps {
  distance: number | null;
  score: number;
  round: number;
  totalRounds: number;
  totalScore: number;
  showResult: boolean;
}

export function ScoreDisplay({
  distance,
  score,
  round,
  totalRounds,
  totalScore,
  showResult
}: ScoreDisplayProps) {
  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg p-6 border border-gray-200">
      {/* Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs text-gray-600 uppercase tracking-wider font-bold">Fremskridt</span>
          <span className="text-sm font-bold text-gray-900">
            Runde {round} / {totalRounds}
          </span>
        </div>
        <div className="h-3 bg-gray-200 rounded-full overflow-hidden shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-[#C8102E] to-red-600 transition-all duration-500 rounded-full"
            style={{ width: `${(round / totalRounds) * 100}%` }}
          />
        </div>
      </div>

      {/* Score */}
      <div className="mb-6">
        <div className="text-xs text-gray-600 uppercase tracking-wider font-bold mb-3">Total Score</div>
        <div className="text-center py-6 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl border-2 border-yellow-300 shadow-md">
          <div className="text-5xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent mb-1">
            {totalScore}
          </div>
          <div className="text-xs text-gray-600 uppercase tracking-wider font-semibold">Point</div>
        </div>
      </div>

      {showResult && distance !== null && (
        <div className="pt-6 border-t-2 border-gray-200">
          <div className="text-xs text-gray-600 uppercase tracking-wider font-bold mb-4">📊 Resultat</div>

          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-semibold text-gray-900">Afstand</span>
              </div>
              <span className="font-bold text-lg text-blue-600">{distance.toFixed(0)} km</span>
            </div>

            <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-green-600" />
                <span className="text-sm font-semibold text-gray-900">Point optjent</span>
              </div>
              <span className="font-bold text-lg text-green-600">+{score}</span>
            </div>
          </div>

          <div className="mt-4 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
            {distance < 500 && (
              <p className="text-sm font-semibold text-purple-700 text-center">🎯 Fremragende præcision!</p>
            )}
            {distance >= 500 && distance < 2000 && (
              <p className="text-sm font-semibold text-purple-700 text-center">👍 Godt gættet!</p>
            )}
            {distance >= 2000 && distance < 5000 && (
              <p className="text-sm font-semibold text-purple-700 text-center">✅ Korrekt land!</p>
            )}
            {distance >= 5000 && (
              <p className="text-sm font-semibold text-purple-700 text-center">✅ Korrekt land!</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
