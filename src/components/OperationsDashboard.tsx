import React from 'react';
import { 
  Activity, 
  Users, 
  BookOpen, 
  PhoneCall, 
  MessageSquare,
  TrendingUp,
  Clock
} from 'lucide-react';

export default function OperationsDashboard() {
  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden bg-[#f5f5f5]">
      <header className="bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center shrink-0">
        <h2 className="text-xl font-semibold tracking-tight">Operations Dashboard</h2>
        <div className="flex gap-3">
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
            <Clock size={16} />
            Check In
          </button>
          <button className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
            <Activity size={16} />
            Generate Report
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-auto p-8">
        <div className="max-w-6xl mx-auto space-y-8 pb-12">
          
          {/* 5 Daily Activities Overview */}
          <div>
            <h3 className="text-lg font-semibold tracking-tight mb-4">5 Daily Activities</h3>
            <div className="grid grid-cols-5 gap-4">
              {[
                { title: "Training", icon: BookOpen, stat: "2 Sessions", sub: "14/15 Attended", color: "text-blue-600", bg: "bg-blue-50" },
                { title: "Recruitment", icon: Users, stat: "5 Interviews", sub: "2 Selected", color: "text-purple-600", bg: "bg-purple-50" },
                { title: "Prep Meeting", icon: Clock, stat: "Completed", sub: "9:00 AM CET", color: "text-green-600", bg: "bg-green-50" },
                { title: "Actual Calls", icon: PhoneCall, stat: "511 Calls", sub: "13 Appointments", color: "text-orange-600", bg: "bg-orange-50" },
                { title: "OTJ Meeting", icon: MessageSquare, stat: "Scheduled", sub: "4:00 PM CET", color: "text-gray-600", bg: "bg-gray-100" },
              ].map((activity, i) => (
                <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5">
                  <div className={`w-10 h-10 rounded-lg ${activity.bg} ${activity.color} flex items-center justify-center mb-4`}>
                    <activity.icon size={20} />
                  </div>
                  <h4 className="font-semibold text-sm text-gray-900">{activity.title}</h4>
                  <p className="text-lg font-bold mt-1">{activity.stat}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.sub}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* Zaderma Live Feed */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
              <div className="p-5 border-b border-gray-200 flex justify-between items-center">
                <h3 className="font-semibold tracking-tight flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  Zaderma Live Feed
                </h3>
                <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-md">API Connected</span>
              </div>
              <div className="p-0 flex-1 overflow-auto">
                <div className="divide-y divide-gray-100">
                  {[
                    { agent: "Agent Alpha", duration: "04:12", outcome: "Appointment", time: "Just now" },
                    { agent: "Agent Delta", duration: "01:45", outcome: "Engagement", time: "2 min ago" },
                    { agent: "Agent Beta", duration: "00:30", outcome: "No Answer", time: "5 min ago" },
                    { agent: "Agent Gamma", duration: "06:20", outcome: "Engagement", time: "12 min ago" },
                    { agent: "Agent Alpha", duration: "02:15", outcome: "Not Interested", time: "15 min ago" },
                  ].map((call, i) => (
                    <div key={i} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{call.agent}</p>
                        <p className="text-xs text-gray-500 mt-0.5">Duration: {call.duration}</p>
                      </div>
                      <div className="text-right">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                          call.outcome === 'Appointment' ? 'bg-blue-100 text-blue-800' :
                          call.outcome === 'Engagement' ? 'bg-orange-100 text-orange-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {call.outcome}
                        </span>
                        <p className="text-xs text-gray-400 mt-1">{call.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Attendance & Participation */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-5 border-b border-gray-200">
                <h3 className="font-semibold tracking-tight">Attendance & Participation</h3>
              </div>
              <div className="p-5">
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-medium text-gray-700">Overall Attendance</span>
                      <span className="font-bold text-gray-900">93%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '93%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-medium text-gray-700">Prep Meeting Participation</span>
                      <span className="font-bold text-gray-900">75%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Based on individual agent participation flags.</p>
                  </div>

                  <div className="pt-4 border-t border-gray-100">
                    <h4 className="text-sm font-medium text-gray-900 mb-3">Absences Today</h4>
                    <div className="flex items-center gap-3 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center font-medium text-xs">AE</div>
                      Agent Epsilon (Sick Leave)
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
