import { MapPin, Trophy } from "lucide-react";

interface ScoreDisplayProps {
  distance: number | null;
  score: number;
  round: number;
  totalRounds: number;
  totalScore: number;
  showResult: boolean;
}

export function ScoreDisplay({ distance, score, round, totalRounds, totalScore, showResult }: ScoreDisplayProps) {
  return (
    <div style={{ background: '#fff', border: '1px solid var(--pol-border)', padding: '20px' }}>
      {/* Progress */}
      <div style={{ marginBottom: '18px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--pol-gray-500)' }}>Fremgang</span>
          <span style={{ fontFamily: 'var(--font-serif)', fontSize: '16px', fontWeight: 700, color: 'var(--pol-black)' }}>
            {round} <span style={{ color: 'var(--pol-gray-500)', fontWeight: 400, fontSize: '13px' }}>/ {totalRounds}</span>
          </span>
        </div>
        <div style={{ height: '3px', background: 'var(--pol-gray-100)' }}>
          <div style={{ height: '100%', background: 'var(--pol-red)', width: `${(round / totalRounds) * 100}%`, transition: 'width 0.5s ease' }} />
        </div>
      </div>

      {/* Score */}
      <div>
        <div style={{ fontFamily: 'var(--font-sans)', fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--pol-gray-500)', marginBottom: '6px' }}>Point i alt</div>
        <div style={{ fontFamily: 'var(--font-serif)', fontSize: '42px', fontWeight: 900, color: 'var(--pol-black)', lineHeight: 1 }}>
          {totalScore.toLocaleString('da')}
        </div>
      </div>

      {showResult && distance !== null && (
        <div style={{ marginTop: '18px', paddingTop: '16px', borderTop: '1px solid var(--pol-border)' }}>
          <div style={{ fontFamily: 'var(--font-sans)', fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--pol-gray-500)', marginBottom: '10px' }}>Resultat</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: 'var(--pol-gray-100)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <MapPin size={13} color="var(--pol-gray-500)" />
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', color: 'var(--pol-gray-700)' }}>Afstand</span>
              </div>
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: '16px', fontWeight: 700, color: 'var(--pol-black)' }}>{distance.toFixed(0)} km</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: 'var(--pol-gray-100)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Trophy size={13} color="var(--pol-red)" />
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', color: 'var(--pol-gray-700)' }}>Point optjent</span>
              </div>
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: '16px', fontWeight: 700, color: 'var(--pol-red)' }}>+{score.toLocaleString('da')}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
