import React, { useState } from 'react';
import { X, Upload, Play, CheckCircle2, AlertCircle } from 'lucide-react';

interface CallLogFormProps {
  onClose: () => void;
}

export default function CallLogForm({ onClose }: CallLogFormProps) {
  const [step, setStep] = useState(1);
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    institution: '',
    country: '',
    contactName: '',
    timeline: '',
    volume: '',
    department: '',
    challenges: '',
    decisionMaker: '',
    interest: '',
    relevance: '',
    alignment: '',
    transcript: '',
    meetingDate: '',
    meetingTime: '',
    emailSentDate: '',
    followupDate: ''
  });

  const handleAnalyze = async () => {
    if (formData.transcript.length < 200) return;
    setAnalyzing(true);
    setError(null);
    
    try {
      const response = await fetch('/api/qa/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          transcript: formData.transcript,
          agent_id: 'agent-123',
          institution: formData.institution,
          country: formData.country,
          call_date: new Date().toISOString().split('T')[0]
        })
      });
      
      const data = await response.json();
      if (data.success) {
        setResults(data.data);
        setStep(4);
      } else {
        setError(data.message || 'Failed to analyze transcript');
      }
    } catch (err) {
      setError('Network error occurred while analyzing transcript');
      console.error(err);
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl my-8 flex flex-col max-h-[90vh]">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center shrink-0">
          <h2 className="text-xl font-semibold tracking-tight">Log New Call</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in">
              <h3 className="font-medium text-gray-900">Step 1: Institution Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Institution Name</label>
                  <input 
                    type="text" 
                    value={formData.institution}
                    onChange={e => setFormData({...formData, institution: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="e.g. University of Vienna"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                  <select 
                    value={formData.country}
                    onChange={e => setFormData({...formData, country: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="">Select Country...</option>
                    <option value="Austria">Austria</option>
                    <option value="Germany">Germany</option>
                    <option value="France">France</option>
                    <option value="Italy">Italy</option>
                    <option value="Spain">Spain</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contact Name</label>
                  <input 
                    type="text" 
                    value={formData.contactName}
                    onChange={e => setFormData({...formData, contactName: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="e.g. Dr. Sarah Jenkins"
                  />
                </div>
              </div>
              <div className="flex justify-end mt-8">
                <button 
                  onClick={() => setStep(2)}
                  disabled={!formData.institution || !formData.country}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
                >
                  Next Step
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-in fade-in">
              <h3 className="font-medium text-gray-900">Step 2: Qualification Fields</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Student Sending Timeline</label>
                  <select value={formData.timeline} onChange={e => setFormData({...formData, timeline: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-orange-500">
                    <option value="">Select...</option>
                    <option value="Q1">Q1 (Jan-Mar)</option>
                    <option value="Q2">Q2 (Apr-Jun)</option>
                    <option value="Q3">Q3 (Jul-Sep)</option>
                    <option value="Q4">Q4 (Oct-Dec)</option>
                    <option value="Specific month">Specific month</option>
                    <option value="Year-round">Year-round</option>
                    <option value="whenever">Whenever / Not sure</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Student Volume</label>
                  <select value={formData.volume} onChange={e => setFormData({...formData, volume: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-orange-500">
                    <option value="">Select...</option>
                    <option value="1-5">1-5</option>
                    <option value="6-15">6-15</option>
                    <option value="16-30">16-30</option>
                    <option value="31-50">31-50</option>
                    <option value="50+">50+</option>
                    <option value="some">Some / A few</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Department / Faculty</label>
                  <select value={formData.department} onChange={e => setFormData({...formData, department: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-orange-500">
                    <option value="">Select...</option>
                    <option value="Business">Business</option>
                    <option value="IT">IT</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Health">Health Sciences</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Current Challenges</label>
                  <select value={formData.challenges} onChange={e => setFormData({...formData, challenges: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-orange-500">
                    <option value="">Select...</option>
                    <option value="Employer quality">Employer quality</option>
                    <option value="Language barrier">Language barrier</option>
                    <option value="Budget">Budget constraints</option>
                    <option value="None specified">None specified</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Decision Maker</label>
                  <select value={formData.decisionMaker} onChange={e => setFormData({...formData, decisionMaker: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-orange-500">
                    <option value="">Select...</option>
                    <option value="Erasmus Coordinator">Erasmus Coordinator</option>
                    <option value="Int Relations">International Relations</option>
                    <option value="Head of Dept">Head of Department</option>
                    <option value="might be">Might be / Not sure</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Interest Level</label>
                  <select value={formData.interest} onChange={e => setFormData({...formData, interest: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-orange-500">
                    <option value="">Select...</option>
                    <option value="High">High - wants meeting</option>
                    <option value="Medium">Medium - wants info first</option>
                    <option value="Low">Low - exploring only</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Program Relevance</label>
                  <select value={formData.relevance} onChange={e => setFormData({...formData, relevance: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-orange-500">
                    <option value="">Select...</option>
                    <option value="Full match">Full match</option>
                    <option value="Partial match">Partial match</option>
                    <option value="Unknown">Unknown</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Basic Alignment</label>
                  <select value={formData.alignment} onChange={e => setFormData({...formData, alignment: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-orange-500">
                    <option value="">Select...</option>
                    <option value="Aligned">Aligned</option>
                    <option value="Potential mismatch">Potential mismatch</option>
                    <option value="Clear mismatch">Clear mismatch</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-between mt-8">
                <button onClick={() => setStep(1)} className="text-gray-600 hover:text-gray-900 font-medium px-4 py-2">Back</button>
                <button 
                  onClick={() => setStep(3)}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  Next Step
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-in fade-in">
              <h3 className="font-medium text-gray-900">Step 3: Call Transcript</h3>
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-start gap-3">
                  <AlertCircle size={20} className="shrink-0 mt-0.5" />
                  <p className="text-sm">{error}</p>
                </div>
              )}
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                <textarea 
                  className="w-full h-48 bg-transparent border-none resize-none outline-none text-sm font-mono"
                  placeholder="Paste call transcript here... (Optional, but required for QA scoring)"
                  value={formData.transcript}
                  onChange={e => setFormData({...formData, transcript: e.target.value})}
                ></textarea>
              </div>
              <div className="flex justify-between items-center mt-8">
                <button onClick={() => setStep(2)} className="text-gray-600 hover:text-gray-900 font-medium px-4 py-2">Back</button>
                <div className="flex gap-3">
                  <button 
                    onClick={() => setStep(4)}
                    className="text-gray-600 hover:text-gray-900 font-medium px-4 py-2"
                  >
                    Skip Transcript
                  </button>
                  <button 
                    onClick={handleAnalyze}
                    disabled={analyzing || formData.transcript.length < 200}
                    className="bg-[#141414] hover:bg-black text-white px-6 py-2 rounded-lg font-medium flex items-center gap-2 transition-all disabled:opacity-50"
                  >
                    {analyzing ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Play size={16} fill="currentColor" />
                        Analyze & Submit
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6 animate-in fade-in">
              <div className="text-center">
                <div className={`w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-4 ${
                  results?.classification === 'APPOINTMENT' ? 'bg-blue-100 text-blue-600' : 'bg-orange-100 text-orange-600'
                }`}>
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {results?.classification || 'ENGAGEMENT'}
                </h3>
                <p className="text-gray-500 mt-1">
                  {results?.classification_reason || 'Manual submission without transcript.'}
                </p>
              </div>

              {results?.classification === 'APPOINTMENT' ? (
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 space-y-4">
                  <h4 className="font-medium text-blue-900">Schedule Meeting with Dr. Nadia</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-blue-800 mb-1">Date</label>
                      <input 
                        type="date" 
                        value={formData.meetingDate}
                        onChange={e => setFormData({...formData, meetingDate: e.target.value})}
                        className="w-full border border-blue-200 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-blue-800 mb-1">Time (CET)</label>
                      <input 
                        type="time" 
                        value={formData.meetingTime}
                        onChange={e => setFormData({...formData, meetingTime: e.target.value})}
                        className="w-full border border-blue-200 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-orange-50 border border-orange-100 rounded-xl p-6 space-y-4">
                  <h4 className="font-medium text-orange-900">Log Follow-up Actions</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-orange-800 mb-1">Email Sent Date</label>
                      <input 
                        type="date" 
                        value={formData.emailSentDate}
                        onChange={e => setFormData({...formData, emailSentDate: e.target.value})}
                        className="w-full border border-orange-200 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-orange-500 bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-orange-800 mb-1">Follow-up Date</label>
                      <input 
                        type="date" 
                        value={formData.followupDate}
                        onChange={e => setFormData({...formData, followupDate: e.target.value})}
                        className="w-full border border-orange-200 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-orange-500 bg-white"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-end mt-8">
                <button 
                  onClick={onClose}
                  className="bg-[#141414] hover:bg-black text-white px-8 py-2.5 rounded-lg font-medium transition-colors"
                >
                  Save Call Log
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
