import React, { useState } from 'react';
import { X } from 'lucide-react';

interface PipelineFormProps {
  onClose: () => void;
  institution: string;
}

export default function PipelineForm({ onClose, institution }: PipelineFormProps) {
  const [formData, setFormData] = useState({
    studentsThisYear: '',
    studentsNextYear: '',
    budgetAvailable: '',
    durationWeeks: '',
    maltaStudentCount: '',
    budgetPerStudent: '',
    specialRequirements: '',
    quotationDate: ''
  });

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl my-8 flex flex-col max-h-[90vh]">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center shrink-0">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">Pipeline Qualification</h2>
            <p className="text-sm text-gray-500 mt-1">{institution}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Students Sending This Year</label>
                <input 
                  type="number" 
                  value={formData.studentsThisYear}
                  onChange={e => setFormData({...formData, studentsThisYear: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Students Sending Next Year</label>
                <input 
                  type="number" 
                  value={formData.studentsNextYear}
                  onChange={e => setFormData({...formData, studentsNextYear: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Budget Readily Available?</label>
                <select 
                  value={formData.budgetAvailable}
                  onChange={e => setFormData({...formData, budgetAvailable: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="">Select...</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                  <option value="Next year">Next year</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Duration of Internship (Weeks)</label>
                <input 
                  type="number" 
                  value={formData.durationWeeks}
                  onChange={e => setFormData({...formData, durationWeeks: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Students Specifically to Malta</label>
                <input 
                  type="number" 
                  value={formData.maltaStudentCount}
                  onChange={e => setFormData({...formData, maltaStudentCount: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Budget Per Student (€)</label>
                <input 
                  type="number" 
                  value={formData.budgetPerStudent}
                  onChange={e => setFormData({...formData, budgetPerStudent: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Special Requirements</label>
                <textarea 
                  value={formData.specialRequirements}
                  onChange={e => setFormData({...formData, specialRequirements: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-orange-500 h-24 resize-none"
                  placeholder="Any specific needs or requests..."
                ></textarea>
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Agreed Quotation Date</label>
                <input 
                  type="date" 
                  value={formData.quotationDate}
                  onChange={e => setFormData({...formData, quotationDate: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            <div className="flex justify-end mt-8">
              <button 
                onClick={onClose}
                className="bg-[#141414] hover:bg-black text-white px-8 py-2.5 rounded-lg font-medium transition-colors"
              >
                Save & Move to Pipeline
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}