import React, { useEffect, useRef, useState } from 'react';

interface MermaidDiagramProps {
  code: string;
}

// Global interface for the window object to access mermaid
declare global {
  interface Window {
    mermaid: any;
  }
}

const MermaidDiagram: React.FC<MermaidDiagramProps> = ({ code }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svgContent, setSvgContent] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const renderDiagram = async () => {
      if (!window.mermaid) {
        // Retry a few times if script hasn't loaded yet
        setTimeout(renderDiagram, 500);
        return;
      }

      window.mermaid.initialize({
        startOnLoad: false,
        theme: 'base',
        themeVariables: {
          fontFamily: 'ui-sans-serif, system-ui, sans-serif',
          primaryColor: '#e0e7ff',
          primaryBorderColor: '#4338ca',
          primaryTextColor: '#1e1b4b',
          lineColor: '#64748b',
          secondaryColor: '#f1f5f9',
          tertiaryColor: '#ffffff',
        },
        securityLevel: 'loose',
      });

      try {
        const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
        const { svg } = await window.mermaid.render(id, code);
        
        if (isMounted) {
          setSvgContent(svg);
          setError(null);
        }
      } catch (err) {
        console.error("Mermaid render error:", err);
        if (isMounted) {
            setError("Failed to render diagram syntax.");
        }
      }
    };

    renderDiagram();

    return () => {
      isMounted = false;
    };
  }, [code]);

  if (error) {
    return (
        <div className="flex items-center justify-center p-8 bg-red-50 text-red-600 rounded-lg border border-red-200">
            <p>{error}</p>
        </div>
    )
  }

  return (
    <div 
        ref={containerRef}
        className="w-full overflow-x-auto bg-white p-4 rounded-lg shadow-sm border border-slate-200 flex justify-center min-h-[300px]"
        dangerouslySetInnerHTML={{ __html: svgContent }} 
    />
  );
};

export default MermaidDiagram;