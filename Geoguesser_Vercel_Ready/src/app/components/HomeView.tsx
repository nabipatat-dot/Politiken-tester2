import { Clock } from 'lucide-react';

export function HomeView() {
  const mainStory = {
    title: "Revner i Trumps jerngreb: Republikanere gør modstand i Senatet",
    excerpt: "En gruppe republikanske senatorer bryder nu med Trump og hans hårdtslående politiske linje. Det kan få store konsekvenser for den politiske situation i USA. Oppositionen vokser internt, og eksperter spår en ændring af magtbalancen.",
    category: "Udland",
    time: "45 min siden",
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
  };

  const topStories = [
    {
      title: "Hun betaler ham for at lytte til sit liv",
      excerpt: "I en tid hvor ensomhed breder sig, booker danskere professionelle lyttere. Vi mødte en kvinde der har fundet trøst i at betale for at blive hørt...",
      category: "Kultur",
      time: "1 time siden",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    },
    {
      title: "Fredsforløbet: Det er noget helt andet, end du tror, der får mænd til at tro",
      excerpt: "Ny forskning udfordrer alt, hvad vi troede vi vidste om maskulinitet og konfliktløsning i det moderne samfund...",
      category: "Videnskab",
      time: "2 timer siden",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    },
    {
      title: "St. bededagslog: Konfirmanter er langt flere end forventet",
      excerpt: "Kirkeministeren overrasket over det store antal konfirmationer, men bekymret over den lave deltagelse ved gudstjenesterne...",
      category: "Samfund",
      time: "3 timer siden",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    },
    {
      title: "Dansk økonomi i modvind: Eksperter advarer om recession",
      excerpt: "Nye tal viser bekymrende tendenser i dansk erhvervsliv. Stigende inflation og faldende forbrug skaber uro...",
      category: "Erhverv",
      time: "4 timer siden",
      image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    },
  ];

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Header with Logo */}
      <div className="bg-white border-b-2 border-gray-200">
        <div className="px-4 py-6">
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-4xl font-black text-gray-900 tracking-tight">POLITIKEN</h1>
            <span className="bg-[#C8102E] text-white text-xs font-bold px-3 py-1 uppercase">Søndag</span>
          </div>
          <p className="text-xs text-gray-500">24. maj 2026</p>
        </div>
      </div>

      {/* Main Story with Large Image */}
      <div className="border-b-2 border-gray-200">
        <article className="px-4 py-6">
          <div className="mb-3">
            <span className="inline-block bg-[#C8102E] text-white text-xs font-black uppercase tracking-wide px-3 py-1.5">
              {mainStory.category}
            </span>
          </div>
          <h2 className="text-3xl font-black text-gray-900 mb-4 leading-tight">
            {mainStory.title}
          </h2>

          {/* Large Hero Image */}
          <div className="mb-4 -mx-4">
            <img
              src={mainStory.image}
              alt={mainStory.title}
              className="w-full h-64 object-cover"
            />
          </div>

          <p className="text-gray-700 mb-3 leading-relaxed text-base">
            {mainStory.excerpt}
          </p>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Clock className="w-4 h-4" />
            <span>{mainStory.time}</span>
          </div>
        </article>
      </div>

      {/* Secondary Stories with Images */}
      <div className="px-4 py-6 space-y-6">
        {topStories.map((story, index) => (
          <article key={index} className="border-b border-gray-200 pb-6 last:border-0">
            <div className="mb-2">
              <span className="text-xs font-black uppercase tracking-wide text-gray-500">
                {story.category}
              </span>
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <h3 className="text-xl font-black text-gray-900 mb-2 leading-tight">
                  {story.title}
                </h3>
                <p className="text-sm text-gray-600 mb-2 leading-relaxed">
                  {story.excerpt}
                </p>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Clock className="w-3 h-3" />
                  <span>{story.time}</span>
                </div>
              </div>
              <div className="flex-shrink-0">
                <img
                  src={story.image}
                  alt={story.title}
                  className="w-24 h-24 object-cover rounded"
                />
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Game Promotion */}
      <div className="px-4 pb-6">
        <div className="bg-gray-50 border-2 border-gray-200 rounded">
          <div className="p-6">
            <div className="mb-3">
              <span className="text-[#C8102E] text-xs font-black uppercase tracking-wider border-l-4 border-[#C8102E] pl-2">
                Politiken Spil
              </span>
            </div>
            <h3 className="text-2xl font-black text-gray-900 mb-2">
              Test din viden med GeoGuesser
            </h3>
            <p className="text-sm text-gray-600 mb-4 leading-relaxed">
              Gæt hvilket land dagens internationale nyheder kommer fra.
              Konkurrér mod andre læsere og vis din geografiske viden.
            </p>
            <button className="text-sm font-bold text-[#C8102E] hover:underline">
              Start spil →
            </button>
          </div>
        </div>
      </div>

      {/* Subscription Prompt */}
      <div className="px-4 pb-6">
        <div className="bg-[#C8102E] text-white rounded p-6">
          <h3 className="text-xl font-black mb-2">Få ubegrænset adgang</h3>
          <p className="text-sm mb-4 text-white/90">
            Læs alle artikler og spil alle spil med et Politiken Plus abonnement
          </p>
          <button className="bg-white text-[#C8102E] font-bold text-sm px-6 py-2 rounded hover:bg-gray-100 transition-colors">
            Læs mere
          </button>
        </div>
      </div>
    </div>
  );
}
