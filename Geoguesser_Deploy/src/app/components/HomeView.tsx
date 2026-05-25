import { Clock, ChevronRight } from 'lucide-react';

export function HomeView() {
  const today = new Date().toLocaleDateString('da-DK', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  const todayCapitalized = today.charAt(0).toUpperCase() + today.slice(1);

  const mainStory = {
    title: "Revner i Trumps jerngreb: Republikanere gør modstand i Senatet",
    excerpt: "En gruppe republikanske senatorer bryder nu med Trump og hans hårdtslående politiske linje. Det kan få store konsekvenser for den politiske situation i USA og det kommende valg.",
    category: "Udland",
    byline: "Af Martin Kaae",
    time: "45 min siden",
    image: "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
  };

  const topStories = [
    {
      title: "Hun betaler ham for at lytte til sit liv",
      excerpt: "I en tid hvor ensomhed breder sig, booker danskere professionelle lyttere.",
      category: "Kultur",
      time: "1 t.",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    },
    {
      title: "Ny forskning: Det er noget helt andet end du tror, der får mænd til at tro",
      excerpt: "Maskulinitet og tro i det moderne samfund — et nyt studie udfordrer alt.",
      category: "Videnskab",
      time: "2 t.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    },
    {
      title: "Rekord mange konfirmander – men kirkerne er tomme",
      excerpt: "Kirkeministeren overrasket over det store antal konfirmationer.",
      category: "Samfund",
      time: "3 t.",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    },
    {
      title: "Dansk økonomi i modvind: Eksperter advarer om recession i 2026",
      excerpt: "Nye tal viser bekymrende tendenser i dansk erhvervsliv.",
      category: "Erhverv",
      time: "4 t.",
      image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    },
  ];

  return (
    <div style={{ minHeight: '100vh', background: 'var(--pol-cream)', paddingBottom: '80px' }}>

      {/* Masthead */}
      <header style={{ background: '#fff', borderBottom: '1px solid var(--pol-border)' }}>
        <div style={{ maxWidth: '480px', margin: '0 auto', padding: '0 16px' }}>
          {/* Date bar */}
          <div style={{
            borderBottom: '1px solid var(--pol-border)',
            padding: '8px 0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: '10px', color: 'var(--pol-gray-500)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              {todayCapitalized}
            </span>
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: '10px', color: 'var(--pol-red)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Plus
            </span>
          </div>

          {/* Logo */}
          <div style={{ padding: '14px 0 12px', textAlign: 'center' }}>
            <h1 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '40px',
              fontWeight: 900,
              letterSpacing: '-0.02em',
              color: 'var(--pol-black)',
              lineHeight: 1,
              margin: 0,
            }}>
              Politiken
            </h1>
          </div>

          {/* Section nav */}
          <div style={{
            display: 'flex',
            gap: '20px',
            borderTop: '3px solid var(--pol-black)',
            paddingTop: '10px',
            paddingBottom: '8px',
            overflowX: 'auto',
          }}>
            {['Forside', 'Udland', 'Indland', 'Kultur', 'Erhverv', 'Sport'].map((s, i) => (
              <span key={s} style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '11px',
                fontWeight: i === 0 ? 700 : 400,
                color: i === 0 ? 'var(--pol-red)' : 'var(--pol-gray-700)',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                whiteSpace: 'nowrap',
                cursor: 'pointer',
                borderBottom: i === 0 ? '2px solid var(--pol-red)' : 'none',
                paddingBottom: '4px',
              }}>{s}</span>
            ))}
          </div>
        </div>
      </header>

      <div style={{ maxWidth: '480px', margin: '0 auto', padding: '0 16px' }}>

        {/* Main Story */}
        <article style={{ borderBottom: '1px solid var(--pol-border)', paddingBottom: '24px', marginBottom: '0' }}>
          <div style={{ padding: '18px 0 12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <span style={{
                background: 'var(--pol-red)',
                color: '#fff',
                fontFamily: 'var(--font-sans)',
                fontSize: '9px',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                padding: '3px 8px',
              }}>{mainStory.category}</span>
            </div>

            <h2 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '28px',
              fontWeight: 700,
              lineHeight: 1.2,
              color: 'var(--pol-black)',
              margin: '0 0 8px',
            }}>
              {mainStory.title}
            </h2>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '15px',
              lineHeight: 1.65,
              color: 'var(--pol-gray-700)',
              margin: '0 0 10px',
            }}>
              {mainStory.excerpt}
            </p>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', color: 'var(--pol-gray-500)', fontStyle: 'italic' }}>{mainStory.byline}</span>
              <span style={{ color: 'var(--pol-gray-300)' }}>·</span>
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', color: 'var(--pol-gray-500)', display: 'flex', alignItems: 'center', gap: '3px' }}>
                <Clock size={11} />{mainStory.time}
              </span>
            </div>
          </div>

          <div style={{ margin: '0 -16px' }}>
            <img
              src={mainStory.image}
              alt={mainStory.title}
              style={{ width: '100%', height: '220px', objectFit: 'cover', display: 'block' }}
            />
          </div>
        </article>

        {/* Thin rule with label */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px 0 8px' }}>
          <div style={{ flex: 1, height: '1px', background: 'var(--pol-border)' }} />
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: '9px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--pol-gray-500)' }}>Mest læst</span>
          <div style={{ flex: 1, height: '1px', background: 'var(--pol-border)' }} />
        </div>

        {/* Secondary Stories */}
        <div>
          {topStories.map((story, index) => (
            <article key={index} style={{
              display: 'flex',
              gap: '14px',
              padding: '16px 0',
              borderBottom: '1px solid var(--pol-border)',
              cursor: 'pointer',
            }}>
              <div style={{ flex: 1 }}>
                <span style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '9px',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--pol-red)',
                  display: 'block',
                  marginBottom: '5px',
                }}>
                  {story.category}
                </span>
                <h3 style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '17px',
                  fontWeight: 700,
                  lineHeight: 1.25,
                  color: 'var(--pol-black)',
                  margin: '0 0 5px',
                }}>
                  {story.title}
                </h3>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '13px',
                  lineHeight: 1.5,
                  color: 'var(--pol-gray-700)',
                  margin: '0 0 6px',
                }}>
                  {story.excerpt}
                </p>
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', color: 'var(--pol-gray-500)', display: 'flex', alignItems: 'center', gap: '3px' }}>
                  <Clock size={10} />{story.time}
                </span>
              </div>
              <img
                src={story.image}
                alt={story.title}
                style={{ width: '88px', height: '88px', objectFit: 'cover', flexShrink: 0 }}
              />
            </article>
          ))}
        </div>

        {/* Game Promo */}
        <div style={{
          margin: '24px 0',
          border: '1px solid var(--pol-border)',
          borderLeft: '4px solid var(--pol-red)',
          padding: '20px',
          background: '#fff',
        }}>
          <span style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '9px',
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--pol-red)',
            display: 'block',
            marginBottom: '8px',
          }}>Politiken Spil</span>
          <h3 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '22px',
            fontWeight: 700,
            lineHeight: 1.2,
            color: 'var(--pol-black)',
            margin: '0 0 8px',
          }}>
            Test din viden med GeoGuesser
          </h3>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--pol-gray-700)', lineHeight: 1.55, margin: '0 0 14px' }}>
            Gæt hvilket land dagens internationale nyheder kommer fra. Konkurrér mod andre læsere og vis din geografiske viden.
          </p>
          <button style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '12px',
            fontWeight: 700,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color: 'var(--pol-red)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}>
            Start spil <ChevronRight size={14} />
          </button>
        </div>

        {/* Subscription Banner */}
        <div style={{
          background: 'var(--pol-black)',
          color: '#fff',
          padding: '24px 20px',
          marginBottom: '8px',
        }}>
          <div style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '9px',
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--pol-red)',
            marginBottom: '10px',
          }}>Politiken Plus</div>
          <h3 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '22px',
            fontWeight: 700,
            lineHeight: 1.2,
            margin: '0 0 8px',
          }}>
            Ubegrænset adgang til uafhængig journalistik
          </h3>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'rgba(255,255,255,0.75)', lineHeight: 1.6, margin: '0 0 18px' }}>
            Læs alle artikler og spil alle spil med et Politiken Plus-abonnement. Fra 99 kr./md.
          </p>
          <button style={{
            background: 'var(--pol-red)',
            color: '#fff',
            fontFamily: 'var(--font-sans)',
            fontSize: '12px',
            fontWeight: 700,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            border: 'none',
            padding: '12px 24px',
            cursor: 'pointer',
          }}>
            Bliv abonnent
          </button>
        </div>

      </div>
    </div>
  );
}
