import { Globe, Brain, Zap, Trophy, ChevronRight } from 'lucide-react';

interface GamesMenuProps {
  onSelectGame: (gameId: string) => void;
}

export function GamesMenu({ onSelectGame }: GamesMenuProps) {
  const featuredGame = {
    id: 'geoguesser',
    label: 'Dagens udfordring',
    title: 'GeoGuesser',
    description: 'Læs en international nyhed og gæt præcist hvilket land den kommer fra. Jo færre forsøg, jo flere point.',
    icon: Globe,
  };

  const moreGames = [
    {
      id: 'quiz',
      title: 'Nyhedsquiz',
      description: 'Test din viden om dagens vigtigste begivenheder',
      icon: Brain,
      badge: 'Ny',
    },
    {
      id: 'hurtig',
      title: 'Hurtig Quiz',
      description: 'Svar hurtigt på spørgsmål om nyere historie',
      icon: Zap,
      badge: null,
    },
    {
      id: 'turnering',
      title: 'Ugentlig Turnering',
      description: 'Konkurrér mod andre læsere om ugens nyheder',
      icon: Trophy,
      badge: 'Uge 21',
    },
  ];

  const stats = [
    { value: '42', label: 'Spil gennemført' },
    { value: '18', label: 'Topresultater' },
    { value: '67%', label: 'Gns. score' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: 'var(--pol-cream)', paddingBottom: '80px' }}>

      {/* Header */}
      <header style={{ background: '#fff', borderBottom: '3px solid var(--pol-black)' }}>
        <div style={{ maxWidth: '480px', margin: '0 auto', padding: '20px 16px 16px' }}>
          <div style={{ fontFamily: 'var(--font-sans)', fontSize: '9px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--pol-red)', marginBottom: '6px' }}>
            Politiken
          </div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '34px', fontWeight: 900, color: 'var(--pol-black)', margin: 0, lineHeight: 1.05 }}>
            Spil & Quiz
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--pol-gray-700)', margin: '6px 0 0', fontStyle: 'italic' }}>
            Test din viden om verden og nyhederne
          </p>
        </div>
      </header>

      <div style={{ maxWidth: '480px', margin: '0 auto', padding: '0 16px' }}>

        {/* Stats bar */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          borderBottom: '1px solid var(--pol-border)',
          margin: '0 0 0',
        }}>
          {stats.map((s, i) => (
            <div key={i} style={{
              padding: '16px 0',
              textAlign: 'center',
              borderRight: i < 2 ? '1px solid var(--pol-border)' : 'none',
            }}>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '26px', fontWeight: 700, color: 'var(--pol-red)', lineHeight: 1 }}>
                {s.value}
              </div>
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: '10px', color: 'var(--pol-gray-500)', marginTop: '3px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Featured Game */}
        <div style={{ padding: '24px 0 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
            <div style={{ height: '2px', width: '24px', background: 'var(--pol-red)' }} />
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--pol-gray-700)' }}>
              {featuredGame.label}
            </span>
          </div>

          <button
            onClick={() => onSelectGame(featuredGame.id)}
            style={{
              width: '100%',
              background: 'var(--pol-black)',
              color: '#fff',
              border: 'none',
              padding: '28px 24px',
              textAlign: 'left',
              cursor: 'pointer',
              display: 'block',
              position: 'relative',
            }}
          >
            <div style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '9px',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--pol-red)',
              marginBottom: '10px',
            }}>
              Spil nu
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
              <div style={{
                width: '48px',
                height: '48px',
                border: '1px solid rgba(255,255,255,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                <Globe size={24} color="var(--pol-red)" />
              </div>
              <div style={{ flex: 1 }}>
                <h2 style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '28px',
                  fontWeight: 700,
                  lineHeight: 1.1,
                  margin: '0 0 10px',
                  color: '#fff',
                }}>
                  {featuredGame.title}
                </h2>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '14px',
                  lineHeight: 1.6,
                  color: 'rgba(255,255,255,0.7)',
                  margin: 0,
                }}>
                  {featuredGame.description}
                </p>
              </div>
            </div>
            <div style={{
              marginTop: '20px',
              paddingTop: '16px',
              borderTop: '1px solid rgba(255,255,255,0.1)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.05em' }}>
                8 runder · Op til 40.000 point
              </span>
              <ChevronRight size={16} color="var(--pol-red)" />
            </div>
          </button>
        </div>

        {/* More Games */}
        <div style={{ paddingTop: '28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
            <div style={{ height: '2px', width: '24px', background: 'var(--pol-border)' }} />
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--pol-gray-500)' }}>
              Øvrige spil
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {moreGames.map((game, i) => {
              const Icon = game.icon;
              return (
                <button
                  key={game.id}
                  onClick={() => onSelectGame(game.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    padding: '18px 0',
                    background: 'none',
                    border: 'none',
                    borderBottom: '1px solid var(--pol-border)',
                    cursor: 'pointer',
                    textAlign: 'left',
                    width: '100%',
                  }}
                >
                  <div style={{
                    width: '42px',
                    height: '42px',
                    background: 'var(--pol-gray-100)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <Icon size={20} color="var(--pol-gray-700)" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px' }}>
                      <span style={{ fontFamily: 'var(--font-serif)', fontSize: '17px', fontWeight: 700, color: 'var(--pol-black)' }}>
                        {game.title}
                      </span>
                      {game.badge && (
                        <span style={{
                          fontFamily: 'var(--font-sans)',
                          fontSize: '9px',
                          fontWeight: 700,
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                          color: '#fff',
                          background: 'var(--pol-red)',
                          padding: '2px 6px',
                        }}>
                          {game.badge}
                        </span>
                      )}
                    </div>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--pol-gray-700)', margin: 0 }}>
                      {game.description}
                    </p>
                  </div>
                  <ChevronRight size={16} color="var(--pol-gray-300)" />
                </button>
              );
            })}
          </div>
        </div>

        {/* Leaderboard teaser */}
        <div style={{ margin: '28px 0', padding: '20px', background: '#fff', border: '1px solid var(--pol-border)' }}>
          <div style={{ fontFamily: 'var(--font-sans)', fontSize: '9px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--pol-gray-500)', marginBottom: '10px' }}>
            Denne uges topspillere
          </div>
          {['MKA', 'JLB', 'SAT'].map((initials, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '8px 0', borderBottom: i < 2 ? '1px solid var(--pol-gray-100)' : 'none' }}>
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', fontWeight: 700, color: 'var(--pol-gray-500)', width: '18px' }}>{i + 1}.</span>
              <div style={{ width: '30px', height: '30px', background: 'var(--pol-gray-100)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', fontWeight: 700, color: 'var(--pol-gray-700)' }}>{initials}</span>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', fontWeight: 600, color: 'var(--pol-black)' }}>Spiller {i + 1}</div>
              </div>
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: '16px', fontWeight: 700, color: [0].includes(i) ? 'var(--pol-red)' : 'var(--pol-black)' }}>
                {[38500, 36200, 34800][i].toLocaleString('da')}
              </span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
