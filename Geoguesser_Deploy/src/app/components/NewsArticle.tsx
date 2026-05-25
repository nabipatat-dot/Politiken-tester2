import { useState, useEffect } from "react";
import { MapPin } from "lucide-react";

interface NewsArticleProps {
  title: string;
  excerpt: string;
  category: string;
}

export function NewsArticle({ title, excerpt, category }: NewsArticleProps) {
  const [taskVisible, setTaskVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setTaskVisible(false), 4000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{ background: '#fff', borderBottom: '3px solid var(--pol-black)', padding: '16px 16px 14px' }}>
      {/* Label row */}
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
        }}>Politiken</span>
        <span style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '9px',
          fontWeight: 700,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'var(--pol-gray-500)',
          borderLeft: '1px solid var(--pol-border)',
          paddingLeft: '8px',
        }}>{category}</span>
      </div>

      {/* Headline */}
      <h1 style={{
        fontFamily: 'var(--font-serif)',
        fontSize: '20px',
        fontWeight: 700,
        lineHeight: 1.25,
        color: 'var(--pol-black)',
        margin: '0 0 8px',
      }}>
        {title}
      </h1>

      {/* Excerpt */}
      <p style={{
        fontFamily: 'var(--font-body)',
        fontSize: '13px',
        lineHeight: 1.65,
        color: 'var(--pol-gray-700)',
        margin: 0,
      }}>
        {excerpt}
      </p>

      {/* Instruction */}
      {taskVisible && (
        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: '8px',
          marginTop: '12px',
          padding: '10px 12px',
          background: 'var(--pol-gray-100)',
          borderLeft: '3px solid var(--pol-red)',
        }}>
          <MapPin size={13} color="var(--pol-red)" style={{ flexShrink: 0, marginTop: '1px' }} />
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '12px',
            color: 'var(--pol-gray-700)',
            margin: 0,
            lineHeight: 1.45,
          }}>
            Klik på kortet for at gætte hvilket land nyheden kommer fra
          </p>
        </div>
      )}
    </div>
  );
}
