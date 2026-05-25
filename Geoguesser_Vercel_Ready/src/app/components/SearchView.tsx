import { useState } from 'react';
import { Search, Clock, Gamepad2 } from 'lucide-react';

interface SearchViewProps {
  onSelectGame: (gameId: string) => void;
}

export function SearchView({ onSelectGame }: SearchViewProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const articles = [
    {
      title: "Revner i Trumps jerngreb: Republikanere gør modstand i Senatet",
      category: "Udland",
      time: "45 min siden",
      type: "article" as const,
    },
    {
      title: "Hun betaler ham for at lytte til sit liv",
      category: "Kultur",
      time: "1 time siden",
      type: "article" as const,
    },
    {
      title: "Fredsforløbet: Det er noget helt andet, end du tror",
      category: "Videnskab",
      time: "2 timer siden",
      type: "article" as const,
    },
    {
      title: "St. bededagslog: Konfirmanter er langt flere end forventet",
      category: "Samfund",
      time: "3 timer siden",
      type: "article" as const,
    },
    {
      title: "Dansk økonomi i modvind: Eksperter advarer om recession",
      category: "Erhverv",
      time: "4 timer siden",
      type: "article" as const,
    },
  ];

  const games = [
    {
      title: "GeoGuesser",
      description: "Gæt hvilket land nyheder kommer fra",
      category: "Geografi",
      id: "geoguesser",
      type: "game" as const,
    },
    {
      title: "Dagens Nyhedsquiz",
      description: "Test din viden om dagens nyheder",
      category: "Quiz",
      id: "quiz",
      type: "game" as const,
    },
    {
      title: "Hurtig Quiz",
      description: "Svar hurtigt på historie-spørgsmål",
      category: "Historie",
      id: "hurtig",
      type: "game" as const,
    },
    {
      title: "Ugentlig Turnering",
      description: "Konkurrér med andre læsere",
      category: "Konkurrence",
      id: "turnering",
      type: "game" as const,
    },
  ];

  const allItems = [...articles, ...games];

  const filteredItems = searchQuery.trim()
    ? allItems.filter(
        (item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          ('description' in item && item.description.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : allItems;

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Header */}
      <div className="bg-white border-b-2 border-gray-200 sticky top-0 z-10">
        <div className="px-4 py-4">
          <h1 className="text-2xl font-black text-gray-900 mb-4">Søg</h1>

          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Søg efter artikler, spil og emner..."
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-[#C8102E] text-base"
            />
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="px-4 py-6">
        {searchQuery.trim() && (
          <p className="text-sm text-gray-600 mb-4">
            Viser {filteredItems.length} resultat{filteredItems.length !== 1 ? 'er' : ''} for "<strong>{searchQuery}</strong>"
          </p>
        )}

        {filteredItems.length === 0 && searchQuery.trim() && (
          <div className="text-center py-12">
            <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Ingen resultater</h3>
            <p className="text-gray-600">Prøv at søge efter noget andet</p>
          </div>
        )}

        {!searchQuery.trim() && (
          <div className="mb-6">
            <h2 className="text-lg font-black text-gray-900 mb-3">Populære søgninger</h2>
            <div className="flex flex-wrap gap-2">
              {['Politik', 'Klima', 'Økonomi', 'Kultur', 'Sport', 'GeoGuesser'].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSearchQuery(tag)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-full text-sm font-semibold transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-4">
          {filteredItems.map((item, index) => (
            <div key={index}>
              {item.type === 'article' ? (
                <article className="border-b border-gray-200 pb-4">
                  <div className="mb-2">
                    <span className="text-xs font-black uppercase tracking-wide text-gray-500">
                      {item.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-black text-gray-900 mb-2 leading-tight">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Clock className="w-3 h-3" />
                    <span>{item.time}</span>
                  </div>
                </article>
              ) : (
                <button
                  onClick={() => onSelectGame(item.id)}
                  className="w-full text-left border-b border-gray-200 pb-4 hover:bg-gray-50 -mx-4 px-4 transition-colors"
                >
                  <div className="mb-2 flex items-center gap-2">
                    <Gamepad2 className="w-4 h-4 text-[#C8102E]" />
                    <span className="text-xs font-black uppercase tracking-wide text-[#C8102E]">
                      {item.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-black text-gray-900 mb-1 leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
