import React, { useState } from 'react';
import { Calendar, CheckCircle2, Filter, Clock, Video } from 'lucide-react';
import PipelineForm from './PipelineForm';

export default function NadiaDashboard() {
  const [pipelineFormTarget, setPipelineFormTarget] = useState<string | null>(null);

  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden bg-[#f5f5f5]">
      <header className="bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center shrink-0">
        <h2 className="text-xl font-semibold tracking-tight">Director Calendar & Pipeline</h2>
      </header>

      <div className="flex-1 overflow-auto p-8">
        <div className="max-w-5xl mx-auto space-y-6 pb-12">
          
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-5 border-b border-gray-200 flex justify-between items-center">
              <h3 className="font-semibold tracking-tight">Today's Appointments</h3>
              <button className="text-gray-500 hover:text-gray-900 flex items-center gap-2 text-sm font-medium">
                <Filter size={16} />
                Filter
              </button>
            </div>
            <div className="divide-y divide-gray-100">
              {[
                { inst: "University of Amsterdam", contact: "Dr. Sarah Jenkins", time: "2:00 PM CET", agent: "Agent Alpha", type: "Initial Pitch", status: "upcoming" },
                { inst: "Technical University Munich", contact: "Prof. Michael Weber", time: "4:30 PM CET", agent: "Agent Delta", type: "Follow-up", status: "upcoming" },
              ].map((appt, i) => (
                <div key={i} className="p-5 flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                      <Video size={18} className="text-blue-500" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm text-gray-900">{appt.inst}</h4>
                      <p className="text-sm text-gray-500 mt-0.5">{appt.contact} • {appt.type}</p>
                    </div>
                  </div>
                  <div className="text-right flex items-center gap-6">
                    <div className="text-right">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {appt.time}
                      </span>
                      <p className="text-xs text-gray-400 mt-1">Booked by {appt.agent}</p>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => setPipelineFormTarget(appt.inst)}
                        className="bg-green-50 text-green-700 hover:bg-green-100 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                      >
                        Mark Held
                      </button>
                      <button className="bg-red-50 text-red-700 hover:bg-red-100 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                        No-Show
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-5 border-b border-gray-200">
              <h3 className="font-semibold tracking-tight">Active Pipeline</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-50 text-gray-500 uppercase tracking-wider text-xs font-semibold">
                  <tr>
                    <th className="px-6 py-4">Institution</th>
                    <th className="px-6 py-4">Stage</th>
                    <th className="px-6 py-4">Students (Est)</th>
                    <th className="px-6 py-4">Budget</th>
                    <th className="px-6 py-4">Next Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { inst: "Sorbonne University", stage: "Pipeline", students: "20-30", budget: "€1500/student", action: "Send Quotation" },
                    { inst: "University of Vienna", stage: "Potential", students: "TBD", budget: "TBD", action: "Follow-up Call" },
                  ].map((item, i) => (
                    <tr key={i} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-gray-900">{item.inst}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          item.stage === 'Pipeline' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {item.stage}
                        </span>
                      </td>
                      <td className="px-6 py-4">{item.students}</td>
                      <td className="px-6 py-4">{item.budget}</td>
                      <td className="px-6 py-4">
                        <button className="text-orange-600 hover:text-orange-800 font-medium text-sm">
                          {item.action}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>

      {pipelineFormTarget && (
        <PipelineForm 
          institution={pipelineFormTarget} 
          onClose={() => setPipelineFormTarget(null)} 
        />
      )}
    </div>
  );
}