import React, { useState } from 'react';
import { 
  Upload, 
  Play, 
  CheckCircle2, 
  FileText,
  ThumbsUp,
  TrendingUp
} from 'lucide-react';

const MOCK_TRANSCRIPT = `Agent: Hello, good morning. Am I speaking with the Erasmus Coordinator?
Prospect: Yes, speaking. How can I help you?
Agent: Great. My name is Alex, calling from Paragon Global Internships in Malta. We've been operating for 21 years and have placed over 4,500 students. I'm calling today to discuss your student internship placements for the upcoming academic year.
Prospect: Ah, okay. We do send students abroad, yes.
Agent: Excellent. Could you tell me a bit about the challenges you're currently facing with placements? Are you finding it difficult to secure high-quality employers?
Prospect: Yes, actually. Finding reliable companies that offer meaningful work, especially in English, is always a challenge.
Agent: I understand completely. That's exactly where we come in. Malta is an English-speaking country, and we provide end-to-end support, ensuring students are placed with vetted, high-quality employers. We handle everything from the placement to accommodation.
Prospect: That sounds interesting. We usually send about 20 students in the IT and Business faculties around Q3.
Agent: Perfect. We have strong partnerships in both IT and Business. I'd love to set up a brief 15-minute video call with our Director, Dr. Nadia, to show you exactly how our process works and see if there's a good fit. Would next Tuesday at 10 AM CET work for you?
Prospect: Yes, Tuesday at 10 AM works for me.
Agent: Fantastic. I'll send over the calendar invitation shortly. Thank you for your time, and we look forward to speaking with you next week.`;

export default function AIQAEngine() {
  const [analyzing, setAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [transcript, setTranscript] = useState(MOCK_TRANSCRIPT);
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (transcript.length < 200) return;
    setAnalyzing(true);
    setShowResults(false);
    setError(null);
    
    try {
      const response = await fetch('/api/qa/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          transcript,
          agent_id: 'agent-123',
          call_date: new Date().toISOString().split('T')[0]
        })
      });
      
      const data = await response.json();
      if (data.success) {
        setResults(data.data);
        setShowResults(true);
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
    <div className="flex-1 flex flex-col h-screen overflow-hidden">
      <header className="bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center shrink-0">
        <h2 className="text-xl font-semibold tracking-tight">Call Quality Analysis</h2>
        <div className="flex gap-3">
          <select className="bg-gray-50 border border-gray-200 text-sm rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-orange-500 transition-shadow">
            <option>Select Agent...</option>
            <option>Agent Alpha</option>
            <option>Agent Beta</option>
          </select>
          <input type="date" defaultValue="2026-04-10" className="bg-gray-50 border border-gray-200 text-sm rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-orange-500 transition-shadow" />
        </div>
      </header>

      <div className="flex-1 overflow-auto p-8">
        <div className="max-w-5xl mx-auto space-y-6 pb-12">
          
          {/* Input Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
              <h3 className="font-medium flex items-center gap-2 text-sm uppercase tracking-wider text-gray-600">
                <FileText size={16} />
                Call Transcript
              </h3>
              <button className="text-sm text-gray-500 hover:text-gray-900 flex items-center gap-1.5 font-medium transition-colors">
                <Upload size={14} />
                Upload .txt
              </button>
            </div>
            <div className="p-5">
              <textarea 
                className="w-full h-56 p-4 bg-gray-50 border border-gray-200 rounded-xl text-sm font-mono resize-none outline-none focus:ring-2 focus:ring-orange-500 transition-shadow leading-relaxed"
                placeholder="Paste call transcript here... (Minimum 200 characters)"
                value={transcript}
                onChange={(e) => setTranscript(e.target.value)}
              ></textarea>
              <div className="mt-4 flex justify-between items-center">
                <span className={`text-xs font-mono ${transcript.length < 200 ? 'text-red-500' : 'text-gray-500'}`}>
                  {transcript.length} chars {transcript.length < 200 && '(Min 200 required)'}
                </span>
                <button 
                  onClick={handleAnalyze}
                  disabled={analyzing || transcript.length < 200}
                  className="bg-[#141414] hover:bg-black text-white px-6 py-2.5 rounded-xl font-medium flex items-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                >
                  {analyzing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Analyzing with Haiku...
                    </>
                  ) : (
                    <>
                      <Play size={16} fill="currentColor" />
                      Run AI Analysis
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Results Section */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
              {error}
            </div>
          )}
          {showResults && results && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              
              {/* Top Stats Row */}
              <div className="grid grid-cols-3 gap-6">
                {/* Score Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex items-center gap-6">
                  <div className={`w-20 h-20 rounded-full border-4 flex items-center justify-center shrink-0 ${
                    results.total >= 8 ? 'border-green-500' : results.total >= 6 ? 'border-orange-500' : 'border-red-500'
                  }`}>
                    <span className={`text-3xl font-bold tracking-tighter ${
                      results.total >= 8 ? 'text-green-600' : results.total >= 6 ? 'text-orange-600' : 'text-red-600'
                    }`}>{results.total.toFixed(1)}</span>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Total Score</h4>
                    <p className="text-xl font-semibold mt-1">
                      {results.total >= 8 ? 'Excellent' : results.total >= 6 ? 'Developing' : 'Needs Intervention'}
                    </p>
                    <p className="text-sm text-gray-500 mt-0.5">Passed {results.scores.filter((s: number) => s === 1).length}/10 criteria</p>
                  </div>
                </div>

                {/* Classification Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex items-center gap-6">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center shrink-0 ${
                    results.classification === 'APPOINTMENT' ? 'bg-blue-50 text-blue-600' : 'bg-orange-50 text-orange-600'
                  }`}>
                    <CheckCircle2 size={32} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Classification</h4>
                    <p className={`text-xl font-bold mt-1 tracking-tight ${
                      results.classification === 'APPOINTMENT' ? 'text-blue-600' : 'text-orange-600'
                    }`}>{results.classification}</p>
                    <p className="text-sm text-gray-500 mt-0.5">{results.fields_confirmed}/8 fields confirmed</p>
                  </div>
                </div>

                {/* Semantic Note */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex flex-col justify-center">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Conversation Control</h4>
                  <p className="text-sm leading-relaxed text-gray-700">
                    {results.semantic_note}
                  </p>
                </div>
              </div>

              {/* Summary & Feedback */}
              <div className="grid grid-cols-3 gap-6">
                <div className="col-span-2 space-y-6">
                  {/* Summary */}
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                    <h4 className="text-base font-semibold mb-3 tracking-tight">Call Summary</h4>
                    <p className="text-gray-700 leading-relaxed text-sm">
                      {results.summary}
                    </p>
                  </div>

                  {/* 10 QA Criteria */}
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-5 border-b border-gray-200 bg-gray-50">
                      <h4 className="font-semibold tracking-tight">QA Criteria Scoring</h4>
                    </div>
                    <div className="divide-y divide-gray-100">
                      {[
                        "Introduce themselves & company properly",
                        "Speak to the right person / decision maker",
                        "Mention legacy numbers (21yr, 4500, 45000, 900, 95%)",
                        "Establish reason for the call",
                        "Ask about client service requirements",
                        "Build on intro using brand card (3+4 phrases)",
                        "Discover needs, wants, pain points",
                        "Utilise USPs and create value",
                        "Establish tangible outcome for client",
                        "Get clear buy-in / appointment booked"
                      ].map((name, i) => (
                        <div key={i} className="p-5 flex gap-5 hover:bg-gray-50 transition-colors">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-mono font-bold text-base shrink-0 ${
                            results.scores[i] === 1 ? 'bg-green-100 text-green-700' : 
                            results.scores[i] === 0.5 ? 'bg-orange-100 text-orange-700' : 
                            'bg-red-100 text-red-700'
                          }`}>
                            {results.scores[i]}
                          </div>
                          <div>
                            <h5 className="font-medium text-sm text-gray-900">{i + 1}. {name}</h5>
                            <p className="text-sm text-gray-500 mt-1.5 leading-relaxed">{results.feedback[i]}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Strengths & Improvements */}
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                    <h4 className="font-semibold mb-4 flex items-center gap-2 tracking-tight">
                      <ThumbsUp size={18} className="text-green-500" />
                      Top Strengths
                    </h4>
                    <ul className="space-y-3 text-sm text-gray-700">
                      {results.strengths.map((strength: string, i: number) => (
                        <li key={i} className="flex gap-3">
                          <span className="text-green-500 mt-0.5">•</span>
                          <span className="leading-relaxed">{strength}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="h-px bg-gray-100 my-6"></div>

                    <h4 className="font-semibold mb-4 flex items-center gap-2 tracking-tight">
                      <TrendingUp size={18} className="text-orange-500" />
                      Areas to Improve
                    </h4>
                    <ul className="space-y-3 text-sm text-gray-700">
                      {results.improvements.map((improvement: string, i: number) => (
                        <li key={i} className="flex gap-3">
                          <span className="text-orange-500 mt-0.5">•</span>
                          <span className="leading-relaxed">{improvement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* 8 Qualification Fields */}
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-5 border-b border-gray-200 bg-gray-50">
                      <h4 className="font-semibold text-sm tracking-tight">Qualification Fields ({results.fields_confirmed}/8)</h4>
                    </div>
                    <div className="p-5 space-y-3.5">
                      {[
                        "Student Sending Timeline",
                        "Student Volume (per year)",
                        "Department / Faculty",
                        "Current Challenges",
                        "Decision Maker Confirmed",
                        "Interest Level",
                        "Program Relevance",
                        "Basic Alignment"
                      ].map((field, i) => (
                        <div key={i} className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">{field}</span>
                          <CheckCircle2 size={16} className={`shrink-0 ${results.qualification_fields[i] ? 'text-green-500' : 'text-gray-300'}`} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  );
}
