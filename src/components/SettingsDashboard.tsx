import React, { useState } from 'react';
import { User, Bell, Shield, Key, Users, Briefcase, Phone, Save, Globe, Mail, Lock, Sliders } from 'lucide-react';

interface SettingsProps {
  role: string;
  userInfo: {
    name: string;
    title: string;
    initials: string;
    color: string;
  };
}

export default function SettingsDashboard({ role, userInfo }: SettingsProps) {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden bg-[#f5f5f5]">
      <header className="bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center shrink-0">
        <h2 className="text-xl font-semibold tracking-tight">Settings & Profile</h2>
        <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
          <Save size={16} />
          Save Changes
        </button>
      </header>

      <div className="flex-1 overflow-auto p-8">
        <div className="max-w-5xl mx-auto flex gap-8">
          
          {/* Settings Sidebar */}
          <div className="w-64 shrink-0 space-y-1">
            <button 
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'profile' ? 'bg-white text-orange-600 shadow-sm border border-gray-200' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <User size={18} />
              Personal Profile
            </button>
            <button 
              onClick={() => setActiveTab('notifications')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'notifications' ? 'bg-white text-orange-600 shadow-sm border border-gray-200' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <Bell size={18} />
              Notifications
            </button>
            <button 
              onClick={() => setActiveTab('security')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'security' ? 'bg-white text-orange-600 shadow-sm border border-gray-200' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <Lock size={18} />
              Security
            </button>

            <div className="pt-4 mt-4 border-t border-gray-200">
              <p className="px-4 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Role Settings</p>
              
              {role === 'manager' && (
                <button 
                  onClick={() => setActiveTab('admin')}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'admin' ? 'bg-white text-orange-600 shadow-sm border border-gray-200' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  <Shield size={18} />
                  System Admin
                </button>
              )}
              
              {role === 'nadia' && (
                <button 
                  onClick={() => setActiveTab('director')}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'director' ? 'bg-white text-orange-600 shadow-sm border border-gray-200' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  <Briefcase size={18} />
                  Pipeline Config
                </button>
              )}

              {role === 'recruiter' && (
                <button 
                  onClick={() => setActiveTab('recruitment')}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'recruitment' ? 'bg-white text-orange-600 shadow-sm border border-gray-200' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  <Users size={18} />
                  Hiring Preferences
                </button>
              )}

              {role === 'setter' && (
                <button 
                  onClick={() => setActiveTab('dialer')}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'dialer' ? 'bg-white text-orange-600 shadow-sm border border-gray-200' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  <Phone size={18} />
                  Dialer Settings
                </button>
              )}
            </div>
          </div>

          {/* Settings Content Area */}
          <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="space-y-8 animate-in fade-in duration-300">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Personal Profile</h3>
                  <p className="text-sm text-gray-500 mt-1">Update your personal information and how others see you on the platform.</p>
                </div>
                
                <div className="flex items-center gap-6">
                  <div className={`w-24 h-24 rounded-full ${userInfo.color} flex items-center justify-center font-bold text-3xl text-white shadow-inner`}>
                    {userInfo.initials}
                  </div>
                  <div>
                    <button className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                      Change Avatar
                    </button>
                    <p className="text-xs text-gray-500 mt-2">JPG, GIF or PNG. Max size of 800K</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input type="text" defaultValue={userInfo.name} className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-orange-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                    <input type="text" defaultValue={userInfo.title} disabled className="w-full border border-gray-200 bg-gray-50 rounded-lg px-4 py-2 outline-none text-gray-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input type="email" defaultValue={`${userInfo.name.split(' ')[0].toLowerCase()}@pgi.ai`} className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-orange-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input type="tel" placeholder="+1 (555) 000-0000" className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-orange-500" />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Timezone</label>
                    <select className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-orange-500">
                      <option>Central European Time (CET)</option>
                      <option>Eastern Standard Time (EST)</option>
                      <option>Pacific Standard Time (PST)</option>
                      <option>Greenwich Mean Time (GMT)</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div className="space-y-8 animate-in fade-in duration-300">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Notification Preferences</h3>
                  <p className="text-sm text-gray-500 mt-1">Choose what updates you want to receive and how.</p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center justify-between py-4 border-b border-gray-100">
                    <div>
                      <h4 className="font-medium text-gray-900">Daily Digest</h4>
                      <p className="text-sm text-gray-500">Receive a daily email with your stats and upcoming tasks.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between py-4 border-b border-gray-100">
                    <div>
                      <h4 className="font-medium text-gray-900">QA Alerts</h4>
                      <p className="text-sm text-gray-500">Get notified immediately when a call scores below the threshold.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between py-4 border-b border-gray-100">
                    <div>
                      <h4 className="font-medium text-gray-900">New Appointments</h4>
                      <p className="text-sm text-gray-500">Push notifications for newly booked appointments.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div className="space-y-8 animate-in fade-in duration-300">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Security Settings</h3>
                  <p className="text-sm text-gray-500 mt-1">Manage your password and account security.</p>
                </div>

                <div className="space-y-4 max-w-md">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                    <input type="password" placeholder="••••••••" className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-orange-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                    <input type="password" placeholder="••••••••" className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-orange-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                    <input type="password" placeholder="••••••••" className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-orange-500" />
                  </div>
                  <button className="mt-2 bg-gray-900 hover:bg-black text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                    Update Password
                  </button>
                </div>
              </div>
            )}

            {/* Manager Admin Tab */}
            {activeTab === 'admin' && role === 'manager' && (
              <div className="space-y-8 animate-in fade-in duration-300">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">System Administration</h3>
                  <p className="text-sm text-gray-500 mt-1">Global settings, API configurations, and user management.</p>
                </div>

                <div className="space-y-6">
                  <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                    <h4 className="font-medium text-gray-900 flex items-center gap-2 mb-4">
                      <Key size={16} className="text-gray-500" />
                      API Integrations
                    </h4>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Gemini AI API Key</label>
                      <div className="flex gap-2">
                        <input type="password" defaultValue="AIzaSyB-XXXXXXXXXXXXXXXXXXXXXXX" className="flex-1 border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-orange-500 font-mono text-sm" />
                        <button className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                          Verify
                        </button>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">Used for the AI QA Engine transcript analysis.</p>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                    <h4 className="font-medium text-gray-900 flex items-center gap-2 mb-4">
                      <Sliders size={16} className="text-gray-500" />
                      Global QA Thresholds
                    </h4>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <label className="text-sm font-medium text-gray-700">Minimum Passing Score</label>
                          <span className="text-sm font-bold text-orange-600">7.5 / 10</span>
                        </div>
                        <input type="range" min="0" max="10" step="0.1" defaultValue="7.5" className="w-full accent-orange-500" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Auto-Flag Keywords (Comma separated)</label>
                        <input type="text" defaultValue="guarantee, refund, free, cheap" className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-orange-500" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Director Pipeline Tab */}
            {activeTab === 'director' && role === 'nadia' && (
              <div className="space-y-8 animate-in fade-in duration-300">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Pipeline Configuration</h3>
                  <p className="text-sm text-gray-500 mt-1">Manage default values and stages for the sales pipeline.</p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Default Target Regions</label>
                    <input type="text" defaultValue="Europe, UK, Middle East" className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-orange-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Budget Threshold (€)</label>
                    <input type="number" defaultValue="1000" className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-orange-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Pipeline Stages</label>
                    <textarea 
                      defaultValue="1. Initial Contact&#10;2. Qualification&#10;3. Proposal Sent&#10;4. Negotiation&#10;5. Closed Won&#10;6. Closed Lost" 
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-orange-500 h-32 resize-none"
                    ></textarea>
                  </div>
                </div>
              </div>
            )}

            {/* Recruiter Tab */}
            {activeTab === 'recruitment' && role === 'recruiter' && (
              <div className="space-y-8 animate-in fade-in duration-300">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Hiring Preferences</h3>
                  <p className="text-sm text-gray-500 mt-1">Manage interview links and automated communication templates.</p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Default Interview Link (Zoom/Meet)</label>
                    <input type="url" defaultValue="https://zoom.us/j/1234567890" className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-orange-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Auto-Reject Email Template</label>
                    <textarea 
                      defaultValue="Hi [Name],&#10;&#10;Thank you for applying to PGI. Unfortunately, we have decided to move forward with other candidates at this time.&#10;&#10;Best,&#10;PGI Recruitment Team" 
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-orange-500 h-32 resize-none"
                    ></textarea>
                  </div>
                </div>
              </div>
            )}

            {/* Setter Tab */}
            {activeTab === 'dialer' && role === 'setter' && (
              <div className="space-y-8 animate-in fade-in duration-300">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Dialer Settings</h3>
                  <p className="text-sm text-gray-500 mt-1">Customize your calling interface and defaults.</p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Default Country Code</label>
                    <select className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-orange-500">
                      <option>+44 (United Kingdom)</option>
                      <option>+49 (Germany)</option>
                      <option>+33 (France)</option>
                      <option>+31 (Netherlands)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Auto-Dialer Delay (Seconds)</label>
                    <input type="number" defaultValue="5" min="0" max="30" className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-orange-500" />
                    <p className="text-xs text-gray-500 mt-1">Time between ending a call and dialing the next number.</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Script</label>
                    <select className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-orange-500">
                      <option>Standard University Pitch v2</option>
                      <option>Direct Employer Pitch</option>
                      <option>Follow-up Script</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
