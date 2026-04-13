import React, { useState } from 'react';
import { Users, UserPlus, Filter } from 'lucide-react';

export default function RecruiterDashboard() {
  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden bg-[#f5f5f5]">
      <header className="bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center shrink-0">
        <h2 className="text-xl font-semibold tracking-tight">Recruitment Pipeline</h2>
        <button className="bg-[#141414] hover:bg-black text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
          <UserPlus size={16} />
          Add Candidate
        </button>
      </header>

      <div className="flex-1 overflow-auto p-8">
        <div className="max-w-6xl mx-auto space-y-6 pb-12">
          
          <div className="grid grid-cols-4 gap-4">
            {[
              { title: "Total Candidates", count: 45, color: "border-gray-200" },
              { title: "Interviewed", count: 12, color: "border-blue-200 bg-blue-50/50" },
              { title: "In Training", count: 4, color: "border-purple-200 bg-purple-50/50" },
              { title: "Hired (This Month)", count: 2, color: "border-green-200 bg-green-50/50" },
            ].map((stat, i) => (
              <div key={i} className={`bg-white rounded-2xl shadow-sm border ${stat.color} p-5`}>
                <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">{stat.title}</h4>
                <div className="mt-4 flex items-end justify-between">
                  <span className="text-3xl font-bold text-gray-900">{stat.count}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-5 border-b border-gray-200 flex justify-between items-center">
              <h3 className="font-semibold tracking-tight">My Candidates</h3>
              <button className="text-gray-500 hover:text-gray-900 flex items-center gap-2 text-sm font-medium">
                <Filter size={16} />
                Filter
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-50 text-gray-500 uppercase tracking-wider text-xs font-semibold">
                  <tr>
                    <th className="px-6 py-4">Candidate Name</th>
                    <th className="px-6 py-4">Role Applied</th>
                    <th className="px-6 py-4">High-Vol Sales Exp</th>
                    <th className="px-6 py-4">Current Stage</th>
                    <th className="px-6 py-4">Last Updated</th>
                    <th className="px-6 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { name: "Ahmed Raza", role: "Appointment Setter", exp: true, stage: "Interviewed", date: "Today" },
                    { name: "Sara Ali", role: "Sales Trainer", exp: true, stage: "Training", date: "Yesterday" },
                    { name: "Usman Tariq", role: "Appointment Setter", exp: false, stage: "Rejected", date: "3 days ago" },
                    { name: "Fatima Noor", role: "Client Handler", exp: true, stage: "Applied", date: "Today" },
                  ].map((candidate, i) => (
                    <tr key={i} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-gray-900">{candidate.name}</td>
                      <td className="px-6 py-4">{candidate.role}</td>
                      <td className="px-6 py-4">
                        {candidate.exp ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Yes</span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">No</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          candidate.stage === 'Training' ? 'bg-blue-100 text-blue-800' :
                          candidate.stage === 'Rejected' ? 'bg-gray-100 text-gray-800' :
                          candidate.stage === 'Applied' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-orange-100 text-orange-800'
                        }`}>
                          {candidate.stage}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-500">{candidate.date}</td>
                      <td className="px-6 py-4">
                        <button className="text-orange-600 hover:text-orange-800 font-medium text-xs">
                          Advance Stage
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
    </div>
  );
}