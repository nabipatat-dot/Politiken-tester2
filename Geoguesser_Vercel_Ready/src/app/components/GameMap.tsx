import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin } from 'lucide-react';

interface GameMapProps {
  onGuess: (lat: number, lng: number) => void;
  guessLocation: { lat: number; lng: number } | null;
  previousGuesses: { lat: number; lng: number }[];
  correctLocation: { lat: number; lng: number } | null;
  showResult: boolean;
  disabled: boolean;
  currentTips: string[];
  pendingGuess: boolean;
  onConfirmGuess: () => void;
  roundComplete: boolean;
  onNextRound: () => void;
  currentRound: number;
  totalRounds: number;
  showWrongGuess: boolean;
}

// Fix for default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Custom icons
const createCustomIcon = (color: string, label: string, opacity = 1) => {
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="position: relative; width: 40px; height: 50px; opacity: ${opacity};">
        <svg width="40" height="50" viewBox="0 0 40 50" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 0C12.5 0 6.5 6 6.5 13.5C6.5 23.75 20 50 20 50S33.5 23.75 33.5 13.5C33.5 6 27.5 0 20 0Z"
                fill="${color}" stroke="white" stroke-width="3" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.5))"/>
          <circle cx="20" cy="13.5" r="5" fill="white"/>
        </svg>
        <div style="position: absolute; bottom: -25px; left: 50%; transform: translateX(-50%);
                    background: ${color}; color: white; padding: 4px 12px; border-radius: 20px;
                    font-size: 11px; font-weight: bold; white-space: nowrap; box-shadow: 0 2px 8px rgba(0,0,0,0.3);
                    border: 2px solid white;">
          ${label}
        </div>
      </div>
    `,
    iconSize: [40, 50],
    iconAnchor: [20, 50],
    popupAnchor: [0, -50],
  });
};

export function GameMap({
  onGuess,
  guessLocation,
  previousGuesses,
  correctLocation,
  showResult,
  disabled,
  currentTips,
  pendingGuess,
  onConfirmGuess,
  roundComplete,
  onNextRound,
  currentRound,
  totalRounds,
  showWrongGuess
}: GameMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const guessMarkerRef = useRef<L.Marker | null>(null);
  const previousMarkersRef = useRef<L.Marker[]>([]);
  const correctMarkerRef = useRef<L.Marker | null>(null);
  const lineRef = useRef<L.Polyline | null>(null);

  // Initialize map
  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Create map centered on world
    const map = L.map(mapRef.current, {
      center: [20, 0],
      zoom: 2,
      zoomControl: true,
      scrollWheelZoom: true,
      attributionControl: true,
      minZoom: 2,
      maxZoom: 18,
    });

    // Add CartoDB Positron tile layer with labels - cleaner political map style
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 20
    }).addTo(map);

    mapInstanceRef.current = map;

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Handle map clicks
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    const handleClick = (e: L.LeafletMouseEvent) => {
      if (!disabled) {
        onGuess(e.latlng.lat, e.latlng.lng);
      }
    };

    map.on('click', handleClick);

    return () => {
      map.off('click', handleClick);
    };
  }, [disabled, onGuess]);

  // Update previous guesses markers
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Remove old previous markers
    previousMarkersRef.current.forEach(marker => {
      map.removeLayer(marker);
    });
    previousMarkersRef.current = [];

    // Add previous guesses with semi-transparent markers
    previousGuesses.forEach((guess, index) => {
      const icon = createCustomIcon('#888888', `Forsøg ${index + 1}`, 0.5);
      const marker = L.marker([guess.lat, guess.lng], { icon }).addTo(map);
      previousMarkersRef.current.push(marker);
    });
  }, [previousGuesses]);

  // Update guess marker
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (guessMarkerRef.current) {
      map.removeLayer(guessMarkerRef.current);
      guessMarkerRef.current = null;
    }

    if (guessLocation) {
      const icon = createCustomIcon('#C8102E', 'DIT GÆT');
      guessMarkerRef.current = L.marker([guessLocation.lat, guessLocation.lng], { icon })
        .addTo(map);
    }
  }, [guessLocation]);

  // Update correct marker
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (correctMarkerRef.current) {
      map.removeLayer(correctMarkerRef.current);
      correctMarkerRef.current = null;
    }

    if (showResult && correctLocation) {
      const icon = createCustomIcon('#10b981', 'KORREKT');
      correctMarkerRef.current = L.marker([correctLocation.lat, correctLocation.lng], { icon })
        .addTo(map);
    }
  }, [showResult, correctLocation]);

  // Update line between markers
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (lineRef.current) {
      map.removeLayer(lineRef.current);
      lineRef.current = null;
    }

    if (showResult && guessLocation && correctLocation) {
      lineRef.current = L.polyline(
        [[guessLocation.lat, guessLocation.lng], [correctLocation.lat, correctLocation.lng]],
        {
          color: '#C8102E',
          weight: 3,
          opacity: 0.8,
          dashArray: '10, 10',
        }
      ).addTo(map);
    }
  }, [showResult, guessLocation, correctLocation]);

  return (
    <div className="relative h-full w-full rounded-xl overflow-hidden shadow-2xl border-4 border-gray-300">
      <div ref={mapRef} className="h-full w-full" />


      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-3 rounded-xl shadow-xl text-xs pointer-events-none border-2 border-gray-200 z-[1000]">
        <div className="font-bold text-gray-900 mb-2">📍 Forklaring</div>
        <div className="space-y-1.5">
          {previousGuesses.length > 0 && (
            <div className="flex items-center gap-2">
              <MapPin className="w-3 h-3 text-gray-400" fill="currentColor" />
              <span className="text-gray-700 font-medium">Tidligere gæt</span>
            </div>
          )}
          {guessLocation && (
            <div className="flex items-center gap-2">
              <MapPin className="w-3 h-3 text-[#C8102E]" fill="currentColor" />
              <span className="text-gray-700 font-medium">Dit gæt</span>
            </div>
          )}
          {showResult && (
            <div className="flex items-center gap-2">
              <MapPin className="w-3 h-3 text-green-600" fill="currentColor" />
              <span className="text-gray-700 font-medium">Korrekt</span>
            </div>
          )}
        </div>
      </div>

      {/* Compass */}
      <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-3 rounded-xl shadow-xl pointer-events-none border-2 border-gray-200 z-[1000]">
        <div className="text-2xl font-bold text-gray-900">N</div>
        <div className="text-xs text-gray-600 font-medium">Nord</div>
      </div>

      {/* Wrong Guess X - Center of map */}
      {showWrongGuess && (
        <div className="absolute inset-0 flex items-center justify-center z-[1002] pointer-events-none">
          <div className="bg-white/95 backdrop-blur-sm rounded-full p-8 shadow-2xl border-4 border-red-500 animate-bounce">
            <svg className="w-32 h-32 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        </div>
      )}

      {/* Tips Display - Bottom of map */}
      {currentTips.length > 0 && !roundComplete && (
        <div className="absolute bottom-20 left-0 right-0 px-3 z-[1001]">
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-300 rounded-xl p-3 animate-slide-in shadow-xl">
            <div className="mb-2">
              <div className="text-xs text-blue-700 uppercase tracking-wider font-bold flex items-center gap-2">
                💡 Tips
              </div>
            </div>
            <div className="space-y-2">
              {currentTips.map((tip, index) => (
                <div key={index} className="flex gap-2 bg-white/60 rounded-lg p-2">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-xs font-bold text-white shadow-md">
                    {index + 1}
                  </div>
                  <p className="text-xs text-gray-800 leading-relaxed font-medium">
                    {tip}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Confirm Button - Bottom of map */}
      {pendingGuess && (
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-white/95 backdrop-blur-sm border-t-2 border-gray-200 z-[1001]">
          <button
            onClick={onConfirmGuess}
            className="w-full bg-gradient-to-r from-[#C8102E] to-red-600 hover:from-[#a00d26] hover:to-red-700 text-white py-4 font-bold transition-all shadow-lg hover:shadow-xl rounded-xl flex items-center justify-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            Bekræft gæt
          </button>
        </div>
      )}

      {/* Next Round Button - Bottom of map */}
      {roundComplete && (
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-white/95 backdrop-blur-sm border-t-2 border-gray-200 z-[1001]">
          <button
            onClick={onNextRound}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-4 font-bold transition-all shadow-lg hover:shadow-xl rounded-xl"
          >
            {currentRound < totalRounds - 1 ? 'Næste runde →' : 'Se resultat →'}
          </button>
        </div>
      )}

      <style>{`
        .leaflet-container {
          font-family: inherit;
          background: #f5f1e8;
        }
        .leaflet-control-attribution {
          font-size: 9px;
          background: rgba(255, 255, 255, 0.8);
          padding: 2px 5px;
          border-radius: 4px;
        }
        .leaflet-control-zoom {
          border: 2px solid #e5e7eb !important;
          border-radius: 12px !important;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1) !important;
        }
        .leaflet-control-zoom a {
          background: white !important;
          color: #C8102E !important;
          font-weight: bold !important;
          border: none !important;
          width: 36px !important;
          height: 36px !important;
          line-height: 36px !important;
          font-size: 20px !important;
        }
        .leaflet-control-zoom a:hover {
          background: #f3f4f6 !important;
        }
        .custom-marker {
          background: transparent;
          border: none;
        }
      `}</style>
    </div>
  );
}
