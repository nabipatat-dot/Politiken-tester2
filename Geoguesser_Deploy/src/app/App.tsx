import { useState, useEffect } from 'react';
import { NewsArticle } from './components/NewsArticle';
import { GameMap } from './components/GameMap';
import { ScoreDisplay } from './components/ScoreDisplay';
import { Button } from './components/ui/button';
import { RefreshCw, Play, X, Check, Zap, TrendingUp, ArrowLeft } from 'lucide-react';
import confetti from 'canvas-confetti';
import { AppNavigation } from './components/AppNavigation';
import { GamesMenu } from './components/GamesMenu';
import { HomeView } from './components/HomeView';
import { SearchView } from './components/SearchView';
import { BibliotekView } from './components/BibliotekView';
import { ProfilView } from './components/ProfilView';

interface NewsStory {
  title: string;
  excerpt: string;
  category: string;
  location: {
    lat: number;
    lng: number;
    city: string;
  };
}

interface Tip {
  level: number;
  text: string;
}

const newsStories: NewsStory[] = [
  {
    title: "Regering annoncerer omfattende økonomiske reformer",
    excerpt: "Den nationale regering præsenterede i dag en ambitiøs reformpakke rettet mod at bekæmpe inflation og stabilisere landets valuta. Finansministeren fremhævede reformernes betydning for fremtidig økonomisk vækst og velstand. Opposition og erhvervslivet har blandede reaktioner på planerne, mens internationale investorer ser positivt på initiativerne.",
    category: "Økonomi",
    location: { lat: 35.6762, lng: 139.6503, city: "Japan" }
  },
  {
    title: "Historisk tempel ødelagt i natlig brand",
    excerpt: "Et af nationens mest ikoniske og hellige monumenter blev ramt af omfattende brand natten til i går. Brandmandskab fra flere regioner kæmpede i timevis for at redde det tusindårige tempelkompleks. Myndighederne undersøger årsagen, mens kulturministeren lover fuld genopbygning. Borgere sørger over tabet af det religiøse vartegn.",
    category: "Kultur",
    location: { lat: 13.4125, lng: 103.8667, city: "Cambodja" }
  },
  {
    title: "Strenge vandrestriktioner vedtaget i parlament",
    excerpt: "Efter årelang tørke har lovgiverne vedtaget omfattende regler for vandforbruget i landets landbrugssektor. Landmænd skal nu overholde strenge kvoter for kunstvanding, hvilket vækker bekymring i agrarsektoren. Miljøgrupper jubler over loven, som de kalder et vendepunkt for bæredygtig udvikling og fremtidens vandforsyning.",
    category: "Miljø",
    location: { lat: -25.2744, lng: 133.7751, city: "Australien" }
  },
  {
    title: "Tech-gigant etablerer forskningscenter for AI",
    excerpt: "En af verdens førende teknologivirksomheder har officielt åbnet sit nye forsknings- og udviklingscentrum i hovedstaden. Faciliteterne vil fokusere på kunstig intelligens, maskinlæring og kvante-computing. Regeringen hilser investeringen velkommen som bekræftelse på landets status som global teknologihub. Centeret forventes at skabe tusindvis af højtkvalificerede job.",
    category: "Teknologi",
    location: { lat: 37.5665, lng: 126.9780, city: "Sydkorea" }
  },
  {
    title: "Rekord valgdeltagelse ved præsidentvalg",
    excerpt: "Landets præsidentvalg sætter ny rekord med hidtil usete køer ved valgstederne. Valgkommissionen rapporterer den højeste valgdeltagelse nogensinde, hvor borgere venter i timevis for at stemme. Nationale og internationale observatører overvåger nøje valgprocessens integritet. Resultater forventes offentliggjort i de kommende dage.",
    category: "Politik",
    location: { lat: -1.2921, lng: 36.8219, city: "Kenya" }
  },
  {
    title: "Traditionel festival tiltrækker millioner",
    excerpt: "Landets største årlige kulturfestival er i fuld gang med millioner af besøgende fra ind- og udland. Festivalen byder på traditionel musik, dans, gastronomisk mad og religiøse ceremonier. Sikkerhedsforanstaltninger er forstærket efter sidste års hændelser. Turismeindustrien og lokale forretninger jubler over den økonomiske indtægt.",
    category: "Kultur",
    location: { lat: 19.4326, lng: -99.1332, city: "Mexico" }
  },
  {
    title: "Ny højhastighedsbane revolutionerer transport",
    excerpt: "Præsidenten indviede i dag landets første højhastighedstogsforbindelse, der forbinder to storbyområder. Med tophastigheder på 350 km/t halveres rejsetiden dramatisk. Det ambitiøse infrastrukturprojekt har taget et årti at gennemføre og koster flere milliarder. Transportministeren kalder det et historisk øjeblik for landets modernisering.",
    category: "Transport",
    location: { lat: 41.9028, lng: 12.4964, city: "Italien" }
  },
  {
    title: "Olieeksport falder til laveste niveau i 20 år",
    excerpt: "Statistikken viser katastrofale tal for landets olieudførsel, der nu er på det laveste niveau i to årtier. Faldende globale priser kombineret med tekniske problemer ved produktionsfaciliteter skaber økonomisk uro. Regeringen nedsætter kriseberedskab, mens oppositionen kræver energiministerens afgang. Økonomiske eksperter advarer om recession.",
    category: "Økonomi",
    location: { lat: 9.0820, lng: 8.6753, city: "Nigeria" }
  }
];

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function isCorrectCountry(guessLat: number, guessLng: number, countryName: string): boolean {
  // This is a simplified check - in production, you'd use proper country boundary data
  const countryBounds: Record<string, { minLat: number; maxLat: number; minLng: number; maxLng: number }> = {
    "Japan": { minLat: 24, maxLat: 46, minLng: 123, maxLng: 146 },
    "Cambodja": { minLat: 10, maxLat: 15, minLng: 102, maxLng: 108 },
    "Australien": { minLat: -44, maxLat: -10, minLng: 113, maxLng: 154 },
    "Sydkorea": { minLat: 33, maxLat: 39, minLng: 124, maxLng: 132 },
    "Kenya": { minLat: -5, maxLat: 5, minLng: 34, maxLng: 42 },
    "Mexico": { minLat: 14, maxLat: 33, minLng: -118, maxLng: -86 },
    "Italien": { minLat: 36, maxLat: 47, minLng: 6, maxLng: 19 },
    "Nigeria": { minLat: 4, maxLat: 14, minLng: 3, maxLng: 15 },
  };

  const bounds = countryBounds[countryName];
  if (!bounds) return false;

  return guessLat >= bounds.minLat && guessLat <= bounds.maxLat &&
         guessLng >= bounds.minLng && guessLng <= bounds.maxLng;
}

function calculateScore(attempts: number): number {
  const scoreTable = [5000, 4000, 3000, 2000, 1000];
  return scoreTable[Math.min(attempts - 1, scoreTable.length - 1)];
}

function generateTip(story: NewsStory, attempts: number): string {
  const countryTips: Record<string, string[]> = {
    "Japan": [
      "🌏 Dette land ligger på den østlige kant af Asien",
      "🏔️ Et ikonisk bjerg præger dette lands kulturelle identitet",
      "🌸 Landet er berømt for sine forårsblomster og krigerkultur",
      "🗾 Landet består af tusindvis af øer øst for Kina",
      "🇯🇵 Hovedstaden er Tokyo - landet er Japan!",
    ],
    "Cambodja": [
      "🛕 Dette land rummer et gammelt tempelkompleks af enorm størrelse",
      "🌴 Landet ligger i Sydøstasien ved Mekong-floden",
      "🏞️ Khmer-kulturen har præget dette lands historie",
      "👑 Landet har Phnom Penh som hovedstad",
      "🇰🇭 Angkor Wat-landet - det er Cambodja!",
    ],
    "Australien": [
      "🦘 Dette land har unikke pungdyr som nationale symboler",
      "🏝️ Landet ligger på den sydlige halvkugle og er meget stort",
      "🪸 Verdens største koralrev ligger ud for dette lands kyst",
      "🏜️ Store dele af landet er ørken i Oceanien",
      "🇦🇺 Sydney er en af hovedbyerne - landet er Australien!",
    ],
    "Sydkorea": [
      "🎵 Dette lands popkultur og teknologi er verdensberømt",
      "🍚 Fermenterede grøntsager er en national ret i dette land",
      "🏛️ Landet er delt af en demilitariseret zone",
      "🏙️ En af verdens største byer ligger i dette land på en halvø",
      "🇰🇷 Seoul er hovedstaden - landet er Sydkorea!",
    ],
    "Kenya": [
      "🦁 Dette land er kendt for sine store dyreliv-reservater",
      "🏃 Langdistanceløbere fra dette land dominerer internationalt",
      "🗻 Et stort bjerg og en geologisk formation præger landet",
      "🌍 Landet ligger i Østafrika ved en stor sø",
      "🇰🇪 Nairobi er hovedstaden - landet er Kenya!",
    ],
    "Mexico": [
      "🌮 Dette lands mad og drikke er verdenskendt",
      "🏛️ Gamle civilisationers ruiner findes overalt i dette land",
      "🌶️ Landet grænser op til USA i nord",
      "🏖️ Kysten tiltrækker millioner af turister årligt",
      "🇲🇽 Mexico City er hovedstaden - landet er Mexico!",
    ],
    "Italien": [
      "🍕 Nogle af verdens mest populære retter stammer herfra",
      "👢 Landets form på et kort ligner noget, man går med",
      "🏛️ Antikke ruiner og Renæssance-kunst definerer dette land",
      "🌊 Landet strækker sig ud i Middelhavet som en halvø",
      "🇮🇹 Rom er hovedstaden - landet er Italien!",
    ],
    "Nigeria": [
      "🎬 Dette lands filmindustri er blandt de største i verden",
      "👥 Landet har Afrikas største befolkning",
      "🛢️ Oliereserver er en vigtig del af dette lands økonomi",
      "🏙️ Landet ligger i Vestafrika med store byer",
      "🇳🇬 Abuja er hovedstaden - landet er Nigeria!",
    ],
  };

  const tips = countryTips[story.location.city] || [
    "Dette land ligger et sted i verden",
    "Landet har sin egen unikke kultur",
    "Du kan finde landet på verdenskortet",
    "Prøv at tænke på hvilken verdensdel",
    "Se på nyheden igen - der er hints!",
  ];

  return tips[Math.min(attempts - 1, tips.length - 1)];
}

export default function App() {
  const [currentView, setCurrentView] = useState<string>('dagens');
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [currentRound, setCurrentRound] = useState(0);
  const [guessLocation, setGuessLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [distance, setDistance] = useState<number | null>(null);
  const [roundScore, setRoundScore] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [shuffledStories, setShuffledStories] = useState<NewsStory[]>([]);
  const [attemptsUsed, setAttemptsUsed] = useState(0);
  const [roundComplete, setRoundComplete] = useState(false);
  const [currentTips, setCurrentTips] = useState<string[]>([]);
  const [pendingGuess, setPendingGuess] = useState<{ lat: number; lng: number } | null>(null);
  const [confirmedGuess, setConfirmedGuess] = useState(false);
  const [showWrongGuess, setShowWrongGuess] = useState(false);
  const [streak, setStreak] = useState(0);
  const [previousGuesses, setPreviousGuesses] = useState<{ lat: number; lng: number }[]>([]);

  const totalRounds = 8;
  const maxAttemptsPerRound = 5;

  useEffect(() => {
    const shuffled = [...newsStories].sort(() => Math.random() - 0.5);
    setShuffledStories(shuffled);
  }, []);

  const handleSelectGame = (gameId: string) => {
    setSelectedGame(gameId);
    if (gameId === 'geoguesser') {
      startGame();
    }
  };

  const handleBackToMenu = () => {
    setGameStarted(false);
    setSelectedGame(null);
    setCurrentView('spil');
  };

  const startGame = () => {
    const shuffled = [...newsStories].sort(() => Math.random() - 0.5);
    setShuffledStories(shuffled);
    setGameStarted(true);
    setCurrentRound(0);
    setTotalScore(0);
    setGuessLocation(null);
    setShowResult(false);
    setDistance(null);
    setRoundScore(0);
    setAttemptsUsed(0);
    setRoundComplete(false);
    setCurrentTips([]);
    setPendingGuess(null);
    setConfirmedGuess(false);
    setShowWrongGuess(false);
    setStreak(0);
    setPreviousGuesses([]);
  };

  const handleMapClick = (lat: number, lng: number) => {
    if (roundComplete || confirmedGuess) return;
    setPendingGuess({ lat, lng });
  };

  const handleConfirmGuess = () => {
    if (!pendingGuess || roundComplete || !shuffledStories[currentRound]) return;

    const currentStory = shuffledStories[currentRound];
    const newAttempts = attemptsUsed + 1;
    setAttemptsUsed(newAttempts);

    // Add current guess location to previous guesses before confirming
    if (guessLocation) {
      setPreviousGuesses(prev => [...prev, guessLocation]);
    }

    setGuessLocation(pendingGuess);
    setConfirmedGuess(true);

    const dist = calculateDistance(
      pendingGuess.lat,
      pendingGuess.lng,
      currentStory.location.lat,
      currentStory.location.lng
    );
    setDistance(dist);

    // Check if guess is in correct country
    const isCorrect = isCorrectCountry(pendingGuess.lat, pendingGuess.lng, currentStory.location.city);

    if (isCorrect) {
      const score = calculateScore(newAttempts);
      setRoundScore(score);
      setTotalScore(prev => prev + score);
      setShowResult(true);
      setRoundComplete(true);
      setStreak(prev => prev + 1);

      // Trigger confetti celebration!
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });

      // Extra confetti for first attempt
      if (newAttempts === 1) {
        setTimeout(() => {
          confetti({
            particleCount: 150,
            spread: 100,
            origin: { y: 0.6 }
          });
        }, 200);
      }
    } else if (newAttempts >= maxAttemptsPerRound) {
      // Used all attempts without success
      setRoundScore(0);
      setShowResult(true);
      setRoundComplete(true);
      setStreak(0);
    } else {
      // Wrong guess - show big X on map
      setShowWrongGuess(true);
      const tip = generateTip(currentStory, newAttempts);

      // Hide X after 1.5 seconds
      setTimeout(() => {
        setShowWrongGuess(false);
      }, 1500);

      // Show tip after X disappears (after 1.5 seconds)
      setTimeout(() => {
        setCurrentTips(prev => [...prev, tip]);
      }, 1500);

      // Auto-hide tip after 4 seconds (4 seconds after it appears)
      setTimeout(() => {
        setCurrentTips(prev => prev.slice(0, -1));
      }, 5500); // 1.5s delay + 4s display

      // Reset for next attempt
      setTimeout(() => {
        setPendingGuess(null);
        setGuessLocation(null);
        setConfirmedGuess(false);
        setShowResult(false);
      }, 2500);
    }
  };

  const nextRound = () => {
    if (currentRound < totalRounds - 1) {
      setCurrentRound(prev => prev + 1);
      setGuessLocation(null);
      setShowResult(false);
      setDistance(null);
      setRoundScore(0);
      setAttemptsUsed(0);
      setRoundComplete(false);
      setCurrentTips([]);
      setPendingGuess(null);
      setConfirmedGuess(false);
      setShowWrongGuess(false);
      setPreviousGuesses([]);
    } else {
      // Game complete - show final confetti
      confetti({
        particleCount: 200,
        spread: 120,
        origin: { y: 0.5 }
      });
      setTimeout(() => {
        confetti({
          particleCount: 200,
          spread: 120,
          origin: { y: 0.5 }
        });
      }, 300);
      setGameStarted(false);
    }
  };

  // Show different views based on navigation
  if (!gameStarted || shuffledStories.length === 0) {
    if (currentView === 'dagens') {
      return (
        <>
          <HomeView />
          <AppNavigation currentView={currentView} onNavigate={setCurrentView} />
        </>
      );
    }

    if (currentView === 'spil') {
      return (
        <>
          <GamesMenu onSelectGame={handleSelectGame} />
          <AppNavigation currentView={currentView} onNavigate={setCurrentView} />
        </>
      );
    }

    if (currentView === 'opdateret') {
      return (
        <>
          <SearchView onSelectGame={handleSelectGame} />
          <AppNavigation currentView={currentView} onNavigate={setCurrentView} />
        </>
      );
    }

    if (currentView === 'bibliotek') {
      return (
        <>
          <BibliotekView />
          <AppNavigation currentView={currentView} onNavigate={setCurrentView} />
        </>
      );
    }

    if (currentView === 'profil') {
      return (
        <>
          <ProfilView />
          <AppNavigation currentView={currentView} onNavigate={setCurrentView} />
        </>
      );
    }

    // Fallback
    return (
      <>
        <div className="min-h-screen bg-white pb-20 flex items-center justify-center">
          <div className="text-center px-8">
            <div className="text-6xl mb-4">🚧</div>
            <h2 className="text-gray-900 text-2xl font-serif mb-2">Kommer snart</h2>
            <p className="text-gray-600">Denne funktion er under udvikling</p>
          </div>
        </div>
        <AppNavigation currentView={currentView} onNavigate={setCurrentView} />
      </>
    );
  }

  const currentStory = shuffledStories[currentRound];
  const correctLocation = {
    lat: currentStory.location.lat,
    lng: currentStory.location.lng
  };

  if (currentRound >= totalRounds) {
    const percentage = Math.round((totalScore / (5000 * totalRounds)) * 100);

    let title = "Godt forsøg!";
    let message = "Øv dig mere og prøv igen";
    if (totalScore >= 32000) {
      title = "Fremragende!";
      message = "Du er en sand geografi-mester";
    } else if (totalScore >= 24000) {
      title = "Fantastisk!";
      message = "Imponerende geografisk viden";
    } else if (totalScore >= 16000) {
      title = "Rigtig godt!";
      message = "Du kender din verden godt";
    } else if (totalScore >= 8000) {
      title = "Godt spillet!";
      message = "Der er potentiale her";
    }

    return (
      <div style={{ minHeight: '100vh', background: 'var(--pol-cream)', display: 'flex', flexDirection: 'column' }}>
        <header style={{ background: '#fff', borderBottom: '3px solid #111111', padding: '20px 16px' }}>
          <div style={{ fontFamily: 'var(--font-sans)', fontSize: '9px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--pol-red)', marginBottom: '4px' }}>
            Politiken Spil
          </div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '30px', fontWeight: 900, color: '#111111', margin: 0 }}>GeoGuesser</h1>
        </header>

        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '32px 16px' }}>
          <div style={{ width: '100%', maxWidth: '400px' }}>

            <div style={{ borderLeft: '4px solid var(--pol-red)', paddingLeft: '16px', marginBottom: '28px' }}>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '32px', fontWeight: 700, color: '#111111', margin: '0 0 4px', lineHeight: 1.15 }}>{title}</h2>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: 'var(--pol-gray-700)', margin: 0, fontStyle: 'italic' }}>{message}</p>
            </div>

            <div style={{ background: '#fff', border: '1px solid var(--pol-border)', padding: '24px', marginBottom: '16px' }}>
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: '9px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--pol-gray-500)', marginBottom: '8px' }}>
                Din samlede score
              </div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '56px', fontWeight: 900, color: '#111111', lineHeight: 1, marginBottom: '10px' }}>
                {totalScore.toLocaleString('da')}
              </div>
              <div style={{ height: '3px', background: 'var(--pol-gray-100)', marginBottom: '6px' }}>
                <div style={{ height: '100%', background: 'var(--pol-red)', width: `${percentage}%`, transition: 'width 1s ease' }} />
              </div>
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', color: 'var(--pol-gray-500)' }}>
                {percentage}% — ud af {(5000 * totalRounds).toLocaleString('da')} mulige point
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '24px' }}>
              <div style={{ background: '#fff', border: '1px solid var(--pol-border)', padding: '16px', textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '30px', fontWeight: 700, color: '#111111' }}>{totalRounds}</div>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--pol-gray-500)', marginTop: '3px' }}>Runder</div>
              </div>
              <div style={{ background: '#fff', border: '1px solid var(--pol-border)', padding: '16px', textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '30px', fontWeight: 700, color: '#111111' }}>{Math.round(totalScore / totalRounds).toLocaleString('da')}</div>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--pol-gray-500)', marginTop: '3px' }}>Gns./runde</div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button
                onClick={startGame}
                style={{
                  width: '100%',
                  background: 'var(--pol-red)',
                  color: '#fff',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '13px',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  border: 'none',
                  padding: '16px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                }}
              >
                Spil igen
              </button>
              <button
                onClick={handleBackToMenu}
                style={{
                  width: '100%',
                  background: '#fff',
                  color: '#111111',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '13px',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  border: '1px solid var(--pol-border)',
                  padding: '16px',
                  cursor: 'pointer',
                }}
              >
                ← Tilbage til menu
              </button>
            </div>

            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', color: 'var(--pol-gray-500)', textAlign: 'center', marginTop: '16px' }}>
              Del din score med andre Politiken-læsere
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="size-full" style={{ background: 'var(--pol-cream)', display: 'flex', flexDirection: 'column' }}>
      {/* Top bar */}
      <div style={{ background: '#fff', borderBottom: '1px solid var(--pol-border)', padding: '8px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
        <button
          onClick={handleBackToMenu}
          style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--pol-gray-700)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', gap: '4px' }}
        >
          <ArrowLeft size={13} /> Tilbage
        </button>
        <div style={{ fontFamily: 'var(--font-serif)', fontSize: '16px', fontWeight: 700, color: '#111111' }}>
          GeoGuesser
        </div>
        <div style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', fontWeight: 700, color: 'var(--pol-gray-500)', letterSpacing: '0.06em' }}>
          {currentRound + 1}/{totalRounds}
        </div>
      </div>

      {/* Attempt dots */}
      <div style={{ background: '#fff', borderBottom: '2px solid #111111', padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
        <span style={{ fontFamily: 'var(--font-sans)', fontSize: '9px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--pol-gray-500)', marginRight: '4px' }}>Forsøg</span>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} style={{
            width: '8px', height: '8px',
            background: i < attemptsUsed ? (roundComplete && attemptsUsed <= 5 ? (i === attemptsUsed - 1 && showResult ? '#C8102E' : '#C8102E') : '#aaa') : 'var(--pol-gray-100)',
            border: '1px solid ' + (i < attemptsUsed ? 'transparent' : 'var(--pol-border)'),
            transition: 'background 0.2s',
          }} />
        ))}
        <span style={{ marginLeft: 'auto', fontFamily: 'var(--font-serif)', fontSize: '15px', fontWeight: 700, color: 'var(--pol-red)' }}>
          {totalScore.toLocaleString('da')} pt
        </span>
      </div>

      {/* Article */}
      <div style={{ flexShrink: 0 }}>
        <NewsArticle
          title={currentStory.title}
          excerpt={currentStory.excerpt}
          category={currentStory.category}
        />
      </div>

      {/* Map */}
      <div style={{ flex: 1, position: 'relative', minHeight: 0 }}>
        <GameMap
          onGuess={handleMapClick}
          guessLocation={pendingGuess || guessLocation}
          previousGuesses={previousGuesses}
          correctLocation={roundComplete ? correctLocation : null}
          showResult={showResult && roundComplete}
          disabled={roundComplete}
          currentTips={currentTips}
          pendingGuess={pendingGuess && !confirmedGuess && !roundComplete}
          onConfirmGuess={handleConfirmGuess}
          roundComplete={roundComplete}
          onNextRound={nextRound}
          currentRound={currentRound}
          totalRounds={totalRounds}
          showWrongGuess={showWrongGuess}
        />
      </div>
    </div>
  );
}
