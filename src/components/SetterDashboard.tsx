import React, { useState } from 'react';
import { PhoneCall, Calendar, CheckCircle2, AlertCircle, Clock, TrendingUp } from 'lucide-react';
import CallLogForm from './CallLogForm';

export default function SetterDashboard() {
  const [showCallLogForm, setShowCallLogForm] = useState(false);

  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden bg-[#f5f5f5]">
      <header className="bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center shrink-0">
        <h2 className="text-xl font-semibold tracking-tight">My Dashboard</h2>
        <div className="flex gap-3">
          <button className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
            <Clock size={16} />
            Check In
          </button>
          <button 
            onClick={() => setShowCallLogForm(true)}
            className="bg-[#141414] hover:bg-black text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
          >
            <PhoneCall size={16} />
            Log New Call
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-auto p-8">
        <div className="max-w-6xl mx-auto space-y-6 pb-12">
          
          {/* Stats Row */}
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5">
              <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Calls Today</h4>
              <div className="mt-4 flex items-end justify-between">
                <span className="text-3xl font-bold text-gray-900">42</span>
                <span className="text-sm font-medium text-gray-500">Target: 50</span>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-blue-200 bg-blue-50/50 p-5">
              <h4 className="text-sm font-semibold text-blue-600 uppercase tracking-wider">Appointments</h4>
              <div className="mt-4 flex items-end justify-between">
                <span className="text-3xl font-bold text-gray-900">2</span>
                <span className="text-sm font-medium text-blue-600">This Week</span>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-orange-200 bg-orange-50/50 p-5">
              <h4 className="text-sm font-semibold text-orange-600 uppercase tracking-wider">Engagements</h4>
              <div className="mt-4 flex items-end justify-between">
                <span className="text-3xl font-bold text-gray-900">8</span>
                <span className="text-sm font-medium text-orange-600">Active</span>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-green-200 bg-green-50/50 p-5">
              <h4 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Avg QA Score</h4>
              <div className="mt-4 flex items-end justify-between">
                <span className="text-3xl font-bold text-gray-900">9.2</span>
                <span className="text-sm font-medium text-green-600 flex items-center gap-1">
                  <TrendingUp size={14} /> +0.4
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* Recent QA Scores */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-5 border-b border-gray-200">
                <h3 className="font-semibold tracking-tight">Recent QA Scores</h3>
              </div>
              <div className="divide-y divide-gray-100">
                {[
                  { inst: "University of Vienna", score: 9.5, date: "Today, 10:30 AM", status: "APPOINTMENT" },
                  { inst: "Technical University Munich", score: 8.0, date: "Yesterday", status: "ENGAGEMENT" },
                  { inst: "Sorbonne University", score: 9.0, date: "2 days ago", status: "ENGAGEMENT" },
                ].map((qa, i) => (
                  <div key={i} className="p-5 flex items-center justify-between hover:bg-gray-50 transition-colors">
                    <div>
                      <h4 className="font-medium text-sm text-gray-900">{qa.inst}</h4>
                      <p className="text-xs text-gray-500 mt-1">{qa.date}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center justify-end gap-3 mb-1">
                        <span className={`text-xs font-medium px-2 py-0.5 rounded ${
                          qa.status === 'APPOINTMENT' ? 'bg-blue-100 text-blue-800' : 'bg-orange-100 text-orange-800'
                        }`}>
                          {qa.status}
                        </span>
                        <span className={`font-bold ${qa.score >= 8 ? 'text-green-600' : 'text-orange-500'}`}>
                          {qa.score.toFixed(1)}
                        </span>
                      </div>
                      <button className="text-xs text-orange-600 hover:text-orange-800 font-medium">View Feedback</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* My Appointments */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-5 border-b border-gray-200">
                <h3 className="font-semibold tracking-tight">My Upcoming Appointments</h3>
              </div>
              <div className="divide-y divide-gray-100">
                {[
                  { inst: "University of Amsterdam", contact: "Dr. Sarah Jenkins", time: "Today, 2:00 PM CET" },
                  { inst: "Imperial College London", contact: "Emma Thompson", time: "Thu, Apr 16, 1:00 PM CET" },
                ].map((appt, i) => (
                  <div key={i} className="p-5 flex items-center justify-between hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                        <Calendar size={18} className="text-blue-500" />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm text-gray-900">{appt.inst}</h4>
                        <p className="text-sm text-gray-500 mt-0.5">{appt.contact}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {appt.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

      {showCallLogForm && (
        <CallLogForm onClose={() => setShowCallLogForm(false)} />
      )}
    </div>
  );
}