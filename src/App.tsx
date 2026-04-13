import React, { useState } from 'react';
import { BarChart3, Users, PhoneCall, Calendar, UserPlus, LogOut } from 'lucide-react';
import AIQAEngine from './components/AIQAEngine';
import SalesCRM from './components/SalesCRM';
import OperationsDashboard from './components/OperationsDashboard';
import SetterDashboard from './components/SetterDashboard';
import NadiaDashboard from './components/NadiaDashboard';
import RecruiterDashboard from './components/RecruiterDashboard';

type Role = 'manager' | 'setter' | 'nadia' | 'recruiter';

export default function App() {
  const [currentRole, setCurrentRole] = useState<Role>('manager');
  const [currentView, setCurrentView] = useState('crm');

  // Helper to get user info based on role
  const getUserInfo = () => {
    switch (currentRole) {
      case 'manager': return { name: 'Salman H. Khan', title: 'Manager', initials: 'SH', color: 'bg-orange-500' };
      case 'setter': return { name: 'Eva Wajiru', title: 'Appointment Setter', initials: 'EW', color: 'bg-blue-500' };
      case 'nadia': return { name: 'Dr. Nadia Theuma', title: 'Director', initials: 'NT', color: 'bg-purple-500' };
      case 'recruiter': return { name: 'Mahnoor Saleem', title: 'Recruiter', initials: 'MS', color: 'bg-green-500' };
    }
  };

  const userInfo = getUserInfo();

  // Role Switcher for demo purposes
  const RoleSwitcher = () => (
    <div className="px-4 pb-4">
      <div className="text-[10px] text-gray-500 uppercase tracking-wider font-bold mb-2 px-2">Demo Role</div>
      <div className="grid grid-cols-2 gap-2">
        {(['manager', 'setter', 'nadia', 'recruiter'] as Role[]).map(role => (
          <button
            key={role}
            onClick={() => {
              setCurrentRole(role);
              // Reset view to default for the role
              if (role === 'manager') setCurrentView('crm');
              if (role === 'setter') setCurrentView('dashboard');
              if (role === 'nadia') setCurrentView('calendar');
              if (role === 'recruiter') setCurrentView('pipeline');
            }}
            className={`px-2 py-1.5 text-xs font-medium rounded-md transition-colors ${
              currentRole === role ? 'bg-orange-500 text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
            }`}
          >
            {role.charAt(0).toUpperCase() + role.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex font-sans text-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-[#141414] text-white flex flex-col shrink-0">
        <div className="p-6">
          <h1 className="text-2xl font-bold tracking-tight">PGI<span className="text-orange-500">.AI</span></h1>
          <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider">QA & CRM Platform</p>
        </div>
        <nav className="flex-1 px-4 space-y-2 mt-4 overflow-y-auto">
          
          {/* Manager Navigation */}
          {currentRole === 'manager' && (
            <>
              <button 
                onClick={() => setCurrentView('crm')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${currentView === 'crm' ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
              >
                <Users size={18} />
                <span className="font-medium text-sm">Sales CRM</span>
              </button>
              <button 
                onClick={() => setCurrentView('qa')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${currentView === 'qa' ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
              >
                <BarChart3 size={18} />
                <span className="font-medium text-sm">AI QA Engine</span>
              </button>
              <button 
                onClick={() => setCurrentView('ops')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${currentView === 'ops' ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
              >
                <PhoneCall size={18} />
                <span className="font-medium text-sm">Operations</span>
              </button>
            </>
          )}

          {/* Setter Navigation */}
          {currentRole === 'setter' && (
            <>
              <button 
                onClick={() => setCurrentView('dashboard')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${currentView === 'dashboard' ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
              >
                <BarChart3 size={18} />
                <span className="font-medium text-sm">My Dashboard</span>
              </button>
              <button 
                onClick={() => setCurrentView('qa')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${currentView === 'qa' ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
              >
                <PhoneCall size={18} />
                <span className="font-medium text-sm">QA Analysis</span>
              </button>
            </>
          )}

          {/* Nadia Navigation */}
          {currentRole === 'nadia' && (
            <>
              <button 
                onClick={() => setCurrentView('calendar')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${currentView === 'calendar' ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
              >
                <Calendar size={18} />
                <span className="font-medium text-sm">Calendar & Pipeline</span>
              </button>
            </>
          )}

          {/* Recruiter Navigation */}
          {currentRole === 'recruiter' && (
            <>
              <button 
                onClick={() => setCurrentView('pipeline')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${currentView === 'pipeline' ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
              >
                <UserPlus size={18} />
                <span className="font-medium text-sm">Candidate Pipeline</span>
              </button>
            </>
          )}

        </nav>
        
        <RoleSwitcher />

        <div className="p-4 border-t border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-full ${userInfo.color} flex items-center justify-center font-bold text-sm`}>
                {userInfo.initials}
              </div>
              <div className="text-left">
                <div className="text-sm font-medium">{userInfo.name}</div>
                <div className="text-xs text-gray-400">{userInfo.title}</div>
              </div>
            </div>
            <button className="text-gray-400 hover:text-white transition-colors">
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      {currentRole === 'manager' && (
        <>
          {currentView === 'qa' && <AIQAEngine />}
          {currentView === 'crm' && <SalesCRM />}
          {currentView === 'ops' && <OperationsDashboard />}
        </>
      )}

      {currentRole === 'setter' && (
        <>
          {currentView === 'dashboard' && <SetterDashboard />}
          {currentView === 'qa' && <AIQAEngine />}
        </>
      )}

      {currentRole === 'nadia' && (
        <>
          {currentView === 'calendar' && <NadiaDashboard />}
        </>
      )}

      {currentRole === 'recruiter' && (
        <>
          {currentView === 'pipeline' && <RecruiterDashboard />}
        </>
      )}

    </div>
  );
}
