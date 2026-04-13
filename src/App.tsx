import React, { useState } from 'react';
import { BarChart3, Users, PhoneCall } from 'lucide-react';
import AIQAEngine from './components/AIQAEngine';
import SalesCRM from './components/SalesCRM';
import OperationsDashboard from './components/OperationsDashboard';

export default function App() {
  const [currentView, setCurrentView] = useState('qa');

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex font-sans text-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-[#141414] text-white flex flex-col shrink-0">
        <div className="p-6">
          <h1 className="text-2xl font-bold tracking-tight">PGI<span className="text-orange-500">.AI</span></h1>
          <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider">QA & CRM Platform</p>
        </div>
        <nav className="flex-1 px-4 space-y-2 mt-4">
          <button 
            onClick={() => setCurrentView('qa')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${currentView === 'qa' ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
          >
            <BarChart3 size={18} />
            <span className="font-medium text-sm">AI QA Engine</span>
          </button>
          <button 
            onClick={() => setCurrentView('crm')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${currentView === 'crm' ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
          >
            <Users size={18} />
            <span className="font-medium text-sm">Sales CRM</span>
          </button>
          <button 
            onClick={() => setCurrentView('ops')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${currentView === 'ops' ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
          >
            <PhoneCall size={18} />
            <span className="font-medium text-sm">Operations</span>
          </button>
        </nav>
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-orange-500 flex items-center justify-center font-bold text-sm">
              SH
            </div>
            <div className="text-left">
              <div className="text-sm font-medium">Salman H. Khan</div>
              <div className="text-xs text-gray-400">Manager</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      {currentView === 'qa' && <AIQAEngine />}
      {currentView === 'crm' && <SalesCRM />}
      {currentView === 'ops' && <OperationsDashboard />}
    </div>
  );
}
