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
    <div className="relative h-full w-full overflow-hidden" style={{ borderTop: '2px solid #111111' }}>
      <div ref={mapRef} className="h-full w-full" />


      {/* Wrong Guess Overlay */}
      {showWrongGuess && (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1002, pointerEvents: 'none' }}>
          <div style={{ background: '#fff', border: '3px solid #C8102E', padding: '24px', boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }}>
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#C8102E" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        </div>
      )}

      {/* Tips */}
      {currentTips.length > 0 && !roundComplete && (
        <div style={{ position: 'absolute', bottom: '70px', left: 0, right: 0, padding: '0 10px', zIndex: 1001 }}>
          <div style={{ background: '#fff', borderLeft: '4px solid #C8102E', padding: '12px 14px', boxShadow: '0 4px 16px rgba(0,0,0,0.15)' }}>
            <div style={{ fontFamily: 'var(--font-sans)', fontSize: '9px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#C8102E', marginBottom: '8px' }}>
              Vink
            </div>
            {currentTips.map((tip, i) => (
              <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', marginBottom: i < currentTips.length - 1 ? '6px' : 0 }}>
                <span style={{ fontFamily: 'var(--font-serif)', fontSize: '13px', fontWeight: 700, color: '#C8102E', flexShrink: 0, lineHeight: 1.4 }}>{i + 1}.</span>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', lineHeight: 1.5, color: '#1a1a1a', margin: 0 }}>{tip}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Confirm Guess */}
      {pendingGuess && (
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 1001, background: '#fff', borderTop: '2px solid #111111', padding: '12px 14px' }}>
          <button
            onClick={onConfirmGuess}
            style={{
              width: '100%',
              background: '#C8102E',
              color: '#fff',
              fontFamily: 'var(--font-sans)',
              fontSize: '13px',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              border: 'none',
              padding: '14px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            Bekræft gæt
          </button>
        </div>
      )}

      {/* Next Round */}
      {roundComplete && (
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 1001, background: '#fff', borderTop: '2px solid #111111', padding: '12px 14px' }}>
          <button
            onClick={onNextRound}
            style={{
              width: '100%',
              background: '#111111',
              color: '#fff',
              fontFamily: 'var(--font-sans)',
              fontSize: '13px',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              border: 'none',
              padding: '14px',
              cursor: 'pointer',
            }}
          >
            {currentRound < totalRounds - 1 ? 'Næste runde →' : 'Se resultat →'}
          </button>
        </div>
      )}

      <style>{`
        .leaflet-container { font-family: 'Barlow', sans-serif; background: #f0ede8; }
        .leaflet-control-attribution { font-size: 9px; background: rgba(255,255,255,0.85); padding: 2px 5px; }
        .leaflet-control-zoom { border: 1px solid #dddbd6 !important; border-radius: 0 !important; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.12) !important; }
        .leaflet-control-zoom a { background: #fff !important; color: #111 !important; font-weight: 700 !important; border: none !important; border-bottom: 1px solid #dddbd6 !important; width: 32px !important; height: 32px !important; line-height: 32px !important; font-size: 18px !important; }
        .leaflet-control-zoom a:last-child { border-bottom: none !important; }
        .leaflet-control-zoom a:hover { background: #f4f3f0 !important; color: #C8102E !important; }
        .custom-marker { background: transparent; border: none; }
      `}</style>
    </div>
  );
}
