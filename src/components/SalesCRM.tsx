import React, { useState } from 'react';
import { 
  Users, 
  Calendar, 
  PhoneCall, 
  Mail, 
  AlertCircle,
  Clock,
  CheckCircle2,
  ChevronRight,
  Filter,
  TrendingUp
} from 'lucide-react';
import CallLogForm from './CallLogForm';

export default function SalesCRM() {
  const [activeTab, setActiveTab] = useState('team');
  const [showCallLogForm, setShowCallLogForm] = useState(false);

  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden bg-[#f5f5f5]">
      <header className="bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center shrink-0">
        <h2 className="text-xl font-semibold tracking-tight">Sales CRM</h2>
        <div className="flex gap-3">
          <button 
            onClick={() => setShowCallLogForm(true)}
            className="bg-[#141414] hover:bg-black text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            + Log New Call
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-auto p-8">
        <div className="max-w-6xl mx-auto space-y-6 pb-12">
          
          {/* Tabs */}
          <div className="flex gap-6 border-b border-gray-200">
            <button 
              onClick={() => setActiveTab('team')}
              className={`pb-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'team' ? 'border-orange-500 text-orange-600' : 'border-transparent text-gray-500 hover:text-gray-900'}`}
            >
              Team Dashboard
            </button>
            <button 
              onClick={() => setActiveTab('pipeline')}
              className={`pb-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'pipeline' ? 'border-orange-500 text-orange-600' : 'border-transparent text-gray-500 hover:text-gray-900'}`}
            >
              Pipeline Overview
            </button>
            <button 
              onClick={() => setActiveTab('appointments')}
              className={`pb-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'appointments' ? 'border-orange-500 text-orange-600' : 'border-transparent text-gray-500 hover:text-gray-900'}`}
            >
              Appointments
            </button>
          </div>

          {activeTab === 'team' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* Alerts Row */}
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-red-50 border border-red-100 rounded-2xl p-5 flex items-start gap-4">
                  <AlertCircle className="text-red-500 shrink-0 mt-0.5" size={20} />
                  <div>
                    <h4 className="font-semibold text-red-800 text-sm">Stagnation Alert</h4>
                    <p className="text-sm text-red-600 mt-1">Agent Beta's QA score has not improved for 2 consecutive weeks (Avg: 5.2).</p>
                    <button className="mt-3 text-xs font-medium text-red-700 bg-red-100 px-3 py-1.5 rounded-md hover:bg-red-200 transition-colors">
                      Schedule Coaching
                    </button>
                  </div>
                </div>
                <div className="bg-orange-50 border border-orange-100 rounded-2xl p-5 flex items-start gap-4">
                  <Clock className="text-orange-500 shrink-0 mt-0.5" size={20} />
                  <div>
                    <h4 className="font-semibold text-orange-800 text-sm">Idle Alert</h4>
                    <p className="text-sm text-orange-600 mt-1">Agent Gamma has not made a call in 15 minutes during active calling block.</p>
                    <button className="mt-3 text-xs font-medium text-orange-700 bg-orange-100 px-3 py-1.5 rounded-md hover:bg-orange-200 transition-colors">
                      Ping Agent
                    </button>
                  </div>
                </div>
              </div>

              {/* Team Performance Table */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-5 border-b border-gray-200 flex justify-between items-center">
                  <h3 className="font-semibold tracking-tight">Team Performance (April 2026)</h3>
                  <button className="text-gray-500 hover:text-gray-900 flex items-center gap-2 text-sm font-medium">
                    <Filter size={16} />
                    Filter
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-gray-500 uppercase tracking-wider text-xs font-semibold">
                      <tr>
                        <th className="px-6 py-4">Agent</th>
                        <th className="px-6 py-4">Calls Made</th>
                        <th className="px-6 py-4">Engagements</th>
                        <th className="px-6 py-4">Appointments</th>
                        <th className="px-6 py-4">Avg QA Score</th>
                        <th className="px-6 py-4">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {[
                        { name: "Agent Alpha", calls: 142, eng: 12, appt: 4, qa: 8.2, status: "Active" },
                        { name: "Agent Beta", calls: 98, eng: 5, appt: 1, qa: 5.2, status: "Active" },
                        { name: "Agent Gamma", calls: 115, eng: 8, appt: 2, qa: 7.1, status: "Idle (15m)" },
                        { name: "Agent Delta", calls: 156, eng: 15, appt: 6, qa: 9.0, status: "Active" },
                      ].map((agent, i) => (
                        <tr key={i} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 font-medium text-gray-900">{agent.name}</td>
                          <td className="px-6 py-4">{agent.calls}</td>
                          <td className="px-6 py-4">{agent.eng}</td>
                          <td className="px-6 py-4 font-semibold text-blue-600">{agent.appt}</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <span className={`font-medium ${agent.qa >= 8 ? 'text-green-600' : agent.qa >= 6 ? 'text-orange-500' : 'text-red-500'}`}>
                                {agent.qa.toFixed(1)}
                              </span>
                              {agent.qa < 6 && <TrendingUp size={14} className="text-red-500 rotate-180" />}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              agent.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                            }`}>
                              {agent.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'pipeline' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="grid grid-cols-4 gap-4">
                {/* Pipeline Stages */}
                {[
                  { title: "Engagement", count: 24, value: "Follow-up required", color: "border-gray-200" },
                  { title: "Appointment", count: 12, value: "Meetings booked", color: "border-blue-200 bg-blue-50/50" },
                  { title: "Potential", count: 8, value: "Interest confirmed", color: "border-purple-200 bg-purple-50/50" },
                  { title: "Pipeline", count: 5, value: "Quotation sent", color: "border-orange-200 bg-orange-50/50" },
                ].map((stage, i) => (
                  <div key={i} className={`bg-white rounded-2xl shadow-sm border ${stage.color} p-5`}>
                    <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">{stage.title}</h4>
                    <div className="mt-4 flex items-end justify-between">
                      <span className="text-3xl font-bold text-gray-900">{stage.count}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">{stage.value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-5 border-b border-gray-200">
                  <h3 className="font-semibold tracking-tight">Recent Pipeline Activity</h3>
                </div>
                <div className="divide-y divide-gray-100">
                  {[
                    { inst: "University of Vienna", stage: "Pipeline", action: "Quotation sent for 20 IT students", time: "2 hours ago" },
                    { inst: "Technical University Munich", stage: "Potential", action: "Meeting held, strong interest in Engineering placements", time: "5 hours ago" },
                    { inst: "Sorbonne University", stage: "Appointment", action: "Meeting booked for next Tuesday", time: "1 day ago" },
                  ].map((item, i) => (
                    <div key={i} className="p-5 flex items-center justify-between hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                          <CheckCircle2 size={18} className="text-gray-500" />
                        </div>
                        <div>
                          <h4 className="font-medium text-sm text-gray-900">{item.inst}</h4>
                          <p className="text-sm text-gray-500 mt-0.5">{item.action}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {item.stage}
                        </span>
                        <p className="text-xs text-gray-400 mt-1">{item.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'appointments' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-5 border-b border-gray-200 flex justify-between items-center">
                  <h3 className="font-semibold tracking-tight">Upcoming Appointments</h3>
                  <button className="text-gray-500 hover:text-gray-900 flex items-center gap-2 text-sm font-medium">
                    <Filter size={16} />
                    Filter
                  </button>
                </div>
                <div className="divide-y divide-gray-100">
                  {[
                    { inst: "University of Amsterdam", contact: "Dr. Sarah Jenkins", time: "Today, 2:00 PM", agent: "Agent Alpha", type: "Initial Pitch" },
                    { inst: "ETH Zurich", contact: "Prof. Michael Weber", time: "Tomorrow, 10:30 AM", agent: "Agent Delta", type: "Follow-up" },
                    { inst: "Imperial College London", contact: "Emma Thompson", time: "Thu, Apr 16, 1:00 PM", agent: "Agent Alpha", type: "Proposal Review" },
                  ].map((appt, i) => (
                    <div key={i} className="p-5 flex items-center justify-between hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                          <Calendar size={18} className="text-blue-500" />
                        </div>
                        <div>
                          <h4 className="font-medium text-sm text-gray-900">{appt.inst}</h4>
                          <p className="text-sm text-gray-500 mt-0.5">{appt.contact} • {appt.type}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {appt.time}
                        </span>
                        <p className="text-xs text-gray-400 mt-1">{appt.agent}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

      {showCallLogForm && (
        <CallLogForm onClose={() => setShowCallLogForm(false)} />
      )}
    </div>
  );
}
