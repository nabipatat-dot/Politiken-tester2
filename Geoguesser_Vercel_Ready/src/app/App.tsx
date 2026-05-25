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
      <div className="size-full bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="flex items-center justify-center min-h-screen p-4">
          <div className="text-center w-full max-w-md">

            <div className="mb-6">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">{title}</h1>
              <p className="text-lg text-gray-700 font-semibold">{message}</p>
            </div>

            <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 mb-6 border-2 border-purple-200 shadow-2xl">
              <div className="mb-6">
                <p className="text-xs text-gray-600 mb-2 uppercase tracking-wide font-bold">🏆 Din score</p>
                <p className="text-6xl font-bold bg-gradient-to-r from-yellow-500 to-orange-600 bg-clip-text text-transparent mb-2">{totalScore}</p>
                <p className="text-sm text-gray-600">ud af {5000 * totalRounds} mulige point</p>
                <div className="mt-4 bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
                  <div
                    className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 h-full transition-all duration-1000 rounded-full"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <p className="text-sm text-gray-700 mt-2 font-semibold">{percentage}% korrekt</p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-4 border-t-2 border-gray-200">
                <div className="text-center bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-3 border border-blue-200">
                  <p className="text-3xl font-bold text-blue-600">{totalRounds}</p>
                  <p className="text-[10px] text-gray-600 mt-1 font-semibold">Runder gennemført</p>
                </div>
                <div className="text-center bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-3 border border-green-200">
                  <p className="text-3xl font-bold text-green-600">{Math.round(totalScore / totalRounds)}</p>
                  <p className="text-[10px] text-gray-600 mt-1 font-semibold">Gns. point pr. runde</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <Button
                onClick={startGame}
                size="lg"
                className="w-full py-4 bg-gradient-to-r from-[#C8102E] to-red-600 hover:from-[#a00d26] hover:to-red-700 text-white rounded-xl font-bold shadow-lg"
              >
                <RefreshCw className="w-5 h-5 mr-2" />
                Spil igen
              </Button>
              <Button
                onClick={handleBackToMenu}
                size="lg"
                className="w-full py-4 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-900 border-2 border-gray-300 rounded-xl font-bold shadow-lg"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Tilbage til menu
              </Button>
            </div>

            <p className="text-xs text-gray-600 mt-4 font-semibold">
              🎮 Del din score med andre Politiken-læsere
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="size-full bg-gray-50">
      {/* Back button */}
      <div className="fixed top-4 left-4 z-50">
        <Button
          onClick={handleBackToMenu}
          size="sm"
          className="bg-white hover:bg-gray-50 text-gray-900 shadow-md font-semibold border border-gray-200"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Tilbage
        </Button>
      </div>

      {/* Mobile Layout: Article top, Map bottom */}
      <div className="flex flex-col h-full pt-16">
        {/* Article Section */}
        <div className="flex-shrink-0">
          <NewsArticle
            title={currentStory.title}
            excerpt={currentStory.excerpt}
            category={currentStory.category}
          />
        </div>

        {/* Map Section */}
        <div className="flex-1 relative">
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
    </div>
  );
}
