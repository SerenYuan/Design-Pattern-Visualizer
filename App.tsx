
import React, { useState } from 'react';
import { PATTERNS } from './constants';
import MermaidDiagram from './components/MermaidDiagram';
import RoleTable from './components/RoleTable';
import { DesignPatternScenario } from './types';

// Icons
const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
  </svg>
);

const PatternIcon = ({ category }: { category: string }) => {
    switch(category) {
        case 'Creational': 
            return <span className="w-2 h-2 rounded-full bg-emerald-400 mr-2 shrink-0"></span>;
        case 'Structural': 
            return <span className="w-2 h-2 rounded-full bg-blue-400 mr-2 shrink-0"></span>;
        case 'Behavioral': 
            return <span className="w-2 h-2 rounded-full bg-orange-400 mr-2 shrink-0"></span>;
        default:
            return <span className="w-2 h-2 rounded-full bg-gray-400 mr-2 shrink-0"></span>;
    }
}

const App: React.FC = () => {
  const [selectedPatternId, setSelectedPatternId] = useState<string>(PATTERNS[0].id);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const selectedPattern = PATTERNS.find(p => p.id === selectedPatternId) || PATTERNS[0];

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden">
      {/* Mobile Menu Backdrop */}
      {isMobileMenuOpen && (
        <div 
            className="fixed inset-0 bg-slate-900/50 z-20 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`
            fixed md:static inset-y-0 left-0 z-30 w-72 bg-slate-900 text-slate-300 transform transition-transform duration-200 ease-in-out
            ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        <div className="h-full flex flex-col">
          <div className="p-6 border-b border-slate-800">
            <h1 className="text-xl font-bold text-white tracking-tight">Pattern<span className="text-indigo-500">Viz</span></h1>
            <p className="text-xs text-slate-500 mt-1">GoF 23 Design Patterns</p>
          </div>
          
          <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
            {PATTERNS.map((pattern) => (
              <button
                key={pattern.id}
                onClick={() => {
                  setSelectedPatternId(pattern.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`
                  w-full text-left px-3 py-3 rounded-lg text-sm font-medium transition-colors flex items-center
                  ${selectedPatternId === pattern.id 
                    ? 'bg-indigo-600 text-white shadow-lg' 
                    : 'hover:bg-slate-800 hover:text-white'
                  }
                `}
              >
                <PatternIcon category={pattern.category} />
                <span className="truncate">{pattern.title}</span>
              </button>
            ))}
          </nav>

          <div className="p-4 border-t border-slate-800 text-xs text-slate-600 text-center">
            Designed with React, TS & Mermaid
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header (Mobile Only) */}
        <header className="md:hidden bg-white border-b border-slate-200 p-4 flex items-center">
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="text-slate-600 hover:text-slate-900 focus:outline-none"
          >
            <MenuIcon />
          </button>
          <span className="ml-4 font-semibold text-slate-800 truncate">{selectedPattern.title}</span>
        </header>

        {/* Scrollable Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
          <div className="max-w-5xl mx-auto space-y-8 pb-12">
            
            {/* Title Section */}
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <span className={`
                    px-2.5 py-0.5 rounded-full text-xs font-medium border
                    ${selectedPattern.category === 'Creational' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : ''}
                    ${selectedPattern.category === 'Structural' ? 'bg-blue-50 text-blue-700 border-blue-200' : ''}
                    ${selectedPattern.category === 'Behavioral' ? 'bg-orange-50 text-orange-700 border-orange-200' : ''}
                `}>
                    {selectedPattern.category} Pattern
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                {selectedPattern.title}
              </h2>
              <p className="mt-4 text-lg text-slate-600 leading-relaxed max-w-3xl">
                {selectedPattern.description}
              </p>
            </div>

            {/* Diagram Section */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-slate-900 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  Class Diagram (类图)
                </h3>
              </div>
              <MermaidDiagram code={selectedPattern.mermaidCode} />
              <p className="mt-2 text-sm text-slate-500 italic text-right">
                *Diagram rendered dynamically using Mermaid.js
              </p>
            </section>

            {/* Role Breakdown Section */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-slate-900 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Pattern Roles (角色定义)
                </h3>
              </div>
              <RoleTable roles={selectedPattern.roles} />
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
