'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  CheckCircle,
  Trophy,
  TrendingUp,
  LogOut,
  Search,
  Filter,
  Save,
  Check
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function TeacherDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [activeMode, setActiveMode] = useState<'attendance' | 'marks' | 'performance'>('attendance');
  const [selectedClass, setSelectedClass] = useState('Class 10');

  const [students, setStudents] = useState([
    { id: 1, name: "Abdul Raheem", rollNo: "24", status: "present", marks: "94", performance: "Excellent" },
    { id: 2, name: "Fatima Khan", rollNo: "12", status: "present", marks: "88", performance: "Good" },
    { id: 3, name: "Ahmed Ali", rollNo: "05", status: "absent", marks: "76", performance: "Average" },
    { id: 4, name: "Zainab Bibi", rollNo: "31", status: "present", marks: "92", performance: "Good" },
  ]);

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem('teacherAuth');
    if (!auth) router.push('/portal/teacher/login');
    else setUser(JSON.parse(auth));
  }, [router]);

  const handleSave = () => {
    setSaving(true);
    
    // Persist data to localStorage
    const today = new Date().toISOString().split('T')[0];
    
    if (activeMode === 'attendance') {
      const savedAttendance = JSON.parse(localStorage.getItem('ags_attendance') || '{}');
      if (!savedAttendance[today]) savedAttendance[today] = {};
      students.forEach(s => {
        savedAttendance[today][s.id] = s.status;
      });
      localStorage.setItem('ags_attendance', JSON.stringify(savedAttendance));
    } else if (activeMode === 'marks') {
      const savedMarks = JSON.parse(localStorage.getItem('ags_marks') || '{}');
      students.forEach(s => {
        if (!savedMarks[s.id]) savedMarks[s.id] = [];
        savedMarks[s.id].push({ date: today, marks: s.marks, class: selectedClass });
      });
      localStorage.setItem('ags_marks', JSON.stringify(savedMarks));
    } else if (activeMode === 'performance') {
      const savedPerformance = JSON.parse(localStorage.getItem('ags_performance') || '{}');
      students.forEach(s => {
        if (!savedPerformance[s.id]) savedPerformance[s.id] = [];
        savedPerformance[s.id].push({ date: today, level: s.performance });
        if (savedPerformance[s.id].length > 4) savedPerformance[s.id].shift();
      });
      localStorage.setItem('ags_performance', JSON.stringify(savedPerformance));
    }

    setTimeout(() => {
      setSaving(false);
      setSaved(true);
      
      // Reset fields to empty after upload
      setStudents(students.map(s => ({
        ...s,
        status: 'none',
        marks: '',
        performance: 'Average' // Or another default
      })));

      setTimeout(() => setSaved(false), 3000);
    }, 1500);
  };

  if (!user) return null;

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-primary text-white flex flex-col p-6 fixed inset-y-0">
        <div className="mb-10 flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center p-1.5 text-primary font-bold">AGS</div>
          <h2 className="font-bold tracking-tight text-xl uppercase">Teacher</h2>
        </div>
        <nav className="flex-1 space-y-2">
          <button onClick={() => setActiveMode('attendance')} className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl font-semibold text-sm transition-all ${activeMode === 'attendance' ? 'bg-secondary text-primary' : 'text-white/60 hover:bg-white/5'}`}>
            <CheckCircle size={20} /> Attendance
          </button>
          <button onClick={() => setActiveMode('marks')} className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl font-semibold text-sm transition-all ${activeMode === 'marks' ? 'bg-secondary text-primary' : 'text-white/60 hover:bg-white/5'}`}>
            <Trophy size={20} /> Upload Marks
          </button>
          <button onClick={() => setActiveMode('performance')} className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl font-semibold text-sm transition-all ${activeMode === 'performance' ? 'bg-secondary text-primary' : 'text-white/60 hover:bg-white/5'}`}>
            <TrendingUp size={20} /> Weekly Performance
          </button>
        </nav>
        <button onClick={() => { localStorage.removeItem('teacherAuth'); router.push('/portal'); }} className="mt-auto flex items-center gap-4 px-4 py-3 text-red-400 font-semibold text-sm hover:bg-red-500/10 rounded-xl transition-all">
          <LogOut size={20} /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="ml-64 flex-1 p-10">
        <header className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-bold text-primary tracking-tight">Welcome, {user.name}</h1>
            <p className="text-gray-400 font-semibold uppercase tracking-widest text-xs mt-1">{user.role} | {selectedClass}</p>
          </div>
          <div className="flex items-center gap-4">
             <select 
               value={selectedClass} 
               onChange={(e) => setSelectedClass(e.target.value)}
               className="bg-white border border-gray-100 px-4 py-2 rounded-xl font-semibold text-primary shadow-sm outline-none focus:ring-2 focus:ring-primary/5"
             >
               {user.assignedClasses.map((c: string) => <option key={c} value={c}>{c}</option>)}
             </select>
             <button 
               onClick={handleSave}
               disabled={saving}
               className={`flex items-center gap-2 px-6 py-2 rounded-xl font-bold text-xs uppercase tracking-widest transition-all ${saved ? 'bg-green-500 text-white' : 'bg-primary text-white hover:bg-secondary hover:text-primary shadow-lg shadow-primary/10'}`}
             >
               {saving ? 'Saving...' : saved ? <><Check size={16} /> Saved</> : <><Save size={16} /> Save Changes</>}
             </button>
          </div>
        </header>

        {/* Data Entry Area */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex items-center justify-between">
            <h3 className="text-xl font-bold text-primary uppercase tracking-tight">
              {activeMode === 'attendance' ? 'Daily Attendance' : activeMode === 'marks' ? 'Examination Marks' : 'Weekly Performance'} - {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
            </h3>
            <div className="flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-xl border border-gray-100 w-64">
              <Search size={16} className="text-gray-400" />
              <input type="text" placeholder="Search student..." className="bg-transparent border-none outline-none text-xs font-medium text-gray-600 w-full" />
            </div>
          </div>
          
          <table className="w-full text-left">
            <thead className="bg-gray-50/50 border-b border-gray-100">
              <tr>
                <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Roll No</th>
                <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Student Name</th>
                <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  {activeMode === 'attendance' ? 'Status' : activeMode === 'marks' ? 'Marks (100)' : 'Performance Level'}
                </th>
                <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {students.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-8 py-5 font-bold text-secondary">{student.rollNo}</td>
                  <td className="px-8 py-5 font-semibold text-primary">{student.name}</td>
                  <td className="px-8 py-5">
                    {activeMode === 'attendance' ? (
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => setStudents(students.map(s => s.id === student.id ? {...s, status: 'present'} : s))}
                          className={`px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${student.status === 'present' ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'}`}
                        >
                          Present
                        </button>
                        <button 
                          onClick={() => setStudents(students.map(s => s.id === student.id ? {...s, status: 'absent'} : s))}
                          className={`px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${student.status === 'absent' ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'}`}
                        >
                          Absent
                        </button>
                      </div>
                    ) : activeMode === 'marks' ? (
                      <input 
                        type="number" 
                        value={student.marks} 
                        onChange={(e) => setStudents(students.map(s => s.id === student.id ? {...s, marks: e.target.value} : s))}
                        className="w-20 px-3 py-2 rounded-xl bg-gray-50 border border-gray-100 font-bold text-primary focus:bg-white focus:border-secondary outline-none transition-all"
                      />
                    ) : (
                      <select 
                        value={student.performance} 
                        onChange={(e) => setStudents(students.map(s => s.id === student.id ? {...s, performance: e.target.value} : s))}
                        className="bg-gray-50 border border-gray-100 px-3 py-2 rounded-xl font-bold text-primary outline-none focus:ring-2 focus:ring-secondary/20"
                      >
                        <option value="Excellent">Excellent</option>
                        <option value="Good">Good</option>
                        <option value="Average">Average</option>
                        <option value="Poor">Poor</option>
                      </select>
                    )}
                  </td>
                  <td className="px-8 py-5 text-right">
                    <button className="text-[10px] font-bold text-gray-400 uppercase tracking-widest hover:text-primary transition-colors">History</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
