import { Newspaper } from "lucide-react";
import { useState, useEffect } from "react";

interface NewsArticleProps {
  title: string;
  excerpt: string;
  category: string;
}

export function NewsArticle({ title, excerpt, category }: NewsArticleProps) {
  const [showTask, setShowTask] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTask(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-white p-4 border-b border-gray-200">
      {/* Header */}
      <div className="mb-3">
        <div className="inline-block bg-[#C8102E] text-white px-2 py-1 text-xs font-bold uppercase tracking-wide mb-2">
          Politiken
        </div>
        <div className="inline-block bg-gray-100 text-gray-700 px-2 py-1 text-xs font-semibold ml-2">
          {category}
        </div>
      </div>

      {/* Article */}
      <article>
        <h1 className="text-lg font-bold text-gray-900 mb-2 leading-tight">
          {title}
        </h1>

        <p className="text-gray-600 leading-relaxed text-sm">
          {excerpt}
        </p>
      </article>

      {/* Task - Auto hide after 3 seconds */}
      {showTask && (
        <div className="mt-3 p-3 bg-gray-50 border-l-4 border-[#C8102E] transition-opacity">
          <p className="text-xs text-gray-700 font-medium">
            Klik på kortet for at gætte hvilket land nyheden kommer fra
          </p>
        </div>
      )}
    </div>
  );
}
