"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  CalendarCheck,
  Trophy,
  Users,
  LogOut,
  Search,
  Save,
  CheckCircle,
  AlertCircle,
  Menu,
  X,
  PieChart,
  BarChart,
  ArrowLeft
} from "lucide-react";

export default function TeacherPortal() {
  const router = useRouter();
  const [teacher, setTeacher] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Data
  const [students, setStudents] = useState<any[]>([]);
  const [attendance, setAttendance] = useState<any>({});
  const [teacherMarks, setTeacherMarks] = useState<any[]>([]);
  const [teacherRatings, setTeacherRatings] = useState<any[]>([]);
  const [classData, setClassData] = useState<any[]>([]);

  // Filters
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [searchQuery, setSearchQuery] = useState("");

  const [status, setStatus] = useState<{ msg: string; type: "success" | "error" } | null>(null);

  useEffect(() => {
    const auth = localStorage.getItem("portalAuth");
    if (!auth) {
      router.push("/portal/teacher/login");
      return;
    }
    const parsedAuth = JSON.parse(auth);
    if (parsedAuth.type !== "teacher") {
      router.push("/portal");
      return;
    }
    
    const allStudents = JSON.parse(localStorage.getItem("ags_students") || "[]");
    const allClasses = JSON.parse(localStorage.getItem("ags_classes") || "[]");
    const uniqueClasses = allClasses.map((c: any) => c.name);

    // Load Teacher Details from ags_staff
    const staff = JSON.parse(localStorage.getItem("ags_staff") || "[]");
    const t = staff.find((s: any) => s.staffId === parsedAuth.id) || parsedAuth;
    
    // Mock assigned classes and subjects if not present
    t.assignedClasses = t.assignedClasses?.length ? t.assignedClasses : (uniqueClasses.length > 0 ? uniqueClasses : ["Class 9", "Class 10"]);
    t.assignedSubjects = t.assignedSubjects?.length ? t.assignedSubjects : ["Mathematics", "Physics", "Chemistry", "Biology", "English", "Urdu"];
    
    setTeacher(t);
    setSelectedClass(t.assignedClasses[0] || "");
    setSelectedSubject(t.assignedSubjects[0] || "");

    // Load Data
    setStudents(allStudents);
    setClassData(allClasses);
    setAttendance(JSON.parse(localStorage.getItem("ags_attendance") || "{}"));
    setTeacherMarks(JSON.parse(localStorage.getItem("ags_teacher_marks") || "[]"));
    setTeacherRatings(JSON.parse(localStorage.getItem("ags_teacher_ratings") || "[]"));

    const handleStorage = () => {
      setStudents(JSON.parse(localStorage.getItem("ags_students") || "[]"));
      setClassData(JSON.parse(localStorage.getItem("ags_classes") || "[]"));
      setAttendance(JSON.parse(localStorage.getItem("ags_attendance") || "{}"));
      setTeacherMarks(JSON.parse(localStorage.getItem("ags_teacher_marks") || "[]"));
      setTeacherRatings(JSON.parse(localStorage.getItem("ags_teacher_ratings") || "[]"));
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("portalAuth");
    router.push("/portal/teacher/login");
  };

  const showStatus = (msg: string, type: "success" | "error" = "success") => {
    setStatus({ msg, type });
    setTimeout(() => setStatus(null), 3000);
  };

  if (!teacher) return <div className="min-h-screen flex items-center justify-center bg-[#F0F7FF] text-[#1B1464] font-black tracking-widest uppercase">Loading Portal...</div>;

  const currentClassObj = classData.find(c => c.name === selectedClass);
  let currentSubjects = teacher.assignedSubjects;
  if (currentClassObj?.subjects) {
    currentSubjects = currentClassObj.subjects.split(',').map((s: string) => s.trim()).filter(Boolean);
  }
  if (!currentSubjects || currentSubjects.length === 0) {
    currentSubjects = ["General"];
  }

  const filteredStudents = students.filter(s => {
    if (s.cls !== selectedClass) return false;
    const nameMatch = (s.name || "").toLowerCase().includes(searchQuery.toLowerCase());
    const rollMatch = (s.rollNo || "").toString().includes(searchQuery);
    return nameMatch || rollMatch;
  });

  // === ATTENDANCE LOGIC ===
  const handleMarkAttendance = (studentId: string, status: "present" | "absent" | "late") => {
    const newAtt = { ...attendance };
    if (!newAtt[selectedDate]) newAtt[selectedDate] = {};
    newAtt[selectedDate][studentId] = status;
    setAttendance(newAtt);
  };

  const saveAttendance = () => {
    localStorage.setItem("ags_attendance", JSON.stringify(attendance));
    showStatus("Attendance Saved to Student & Parent Portals!");
    // Clear the current view's marks for today if desired, 
    // but usually attendance is kept visible. 
    // However, user asked for fields to be empty.
    setAttendance({}); 
  };

  // === MARKS LOGIC ===
  const getMark = (studentId: string) => {
    return teacherMarks.find(m => m.studentId === studentId && m.cls === selectedClass && m.subject === selectedSubject)?.marks || "";
  };

  const handleMarkChange = (studentId: string, marks: string) => {
    let newMarks = [...teacherMarks];
    const index = newMarks.findIndex(m => m.studentId === studentId && m.cls === selectedClass && m.subject === selectedSubject);
    if (index >= 0) {
      newMarks[index].marks = marks;
    } else {
      const student = students.find(s => s.id === studentId);
      newMarks.push({
        id: Date.now() + Math.random(),
        studentId,
        name: student?.name,
        cls: selectedClass,
        subject: selectedSubject,
        marks,
        status: "draft"
      });
    }
    setTeacherMarks(newMarks);
  };

  const saveMarks = () => {
    localStorage.setItem("ags_teacher_marks", JSON.stringify(teacherMarks));
    // Also save to a unified marks key if needed, but the admin release logic is handled separately usually.
    // For now, let's just clear the fields.
    setTeacherMarks([]);
    showStatus("Marks Saved as Draft! Admin must release them.");
  };

  // === RATINGS LOGIC ===
  const getRating = (studentId: string) => {
    return teacherRatings.find(r => r.studentId === studentId && r.cls === selectedClass)?.rating || 0;
  };

  const handleRatingChange = (studentId: string, rating: number) => {
    let newRatings = [...teacherRatings];
    const index = newRatings.findIndex(r => r.studentId === studentId && r.cls === selectedClass);
    if (index >= 0) {
      newRatings[index].rating = rating;
    } else {
      const student = students.find(s => s.id === studentId);
      newRatings.push({
        id: Date.now() + Math.random(),
        studentId,
        name: student?.name,
        cls: selectedClass,
        rating
      });
    }
    setTeacherRatings(newRatings);
  };

  const saveRatings = () => {
    // Synchronize with ags_performance key used by student dashboard
    const savedPerformance = JSON.parse(localStorage.getItem('ags_performance') || '{}');
    const starToLevel: any = { 5: 'Excellent', 4: 'Good', 3: 'Average', 2: 'Poor', 1: 'Poor' };
    
    teacherRatings.forEach(r => {
      if (!savedPerformance[r.studentId]) savedPerformance[r.studentId] = [];
      savedPerformance[r.studentId].push({
        date: new Date().toISOString().split('T')[0],
        level: starToLevel[r.rating] || 'Average'
      });
      if (savedPerformance[r.studentId].length > 4) savedPerformance[r.studentId].shift();
    });

    localStorage.setItem("ags_performance", JSON.stringify(savedPerformance));
    localStorage.setItem("ags_teacher_ratings", JSON.stringify(teacherRatings));
    
    // Clear fields after upload
    setTeacherRatings([]);
    showStatus("Performance Ratings Saved & Synced!");
  };

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "attendance", label: "Attendance", icon: CalendarCheck },
    { id: "marks", label: "Upload Marks", icon: Trophy },
    { id: "performance", label: "Performance", icon: BarChart },
    { id: "students", label: "Students List", icon: Users },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans text-gray-800">
      {status && (
        <div className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-xl shadow-2xl font-black uppercase tracking-widest text-[10px] flex items-center gap-2 ${status.type === "success" ? "bg-[#25D366] text-white" : "bg-red-500 text-white"}`}>
          <CheckCircle size={16} /> {status.msg}
        </div>
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-[#1B1464] text-white transition-transform duration-300 ease-in-out ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static flex flex-col`}>
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-black tracking-tighter">ABEXSUN</h1>
            <p className="text-[10px] text-[#00AEEF] font-bold tracking-widest uppercase mt-0.5">Teacher Portal</p>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-white/50 hover:text-white"><X size={20} /></button>
        </div>
        
        <div className="p-6 pb-2 border-b border-white/10">
          <p className="text-sm font-bold truncate">{teacher.name}</p>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest truncate">{teacher.staffId || "Staff"}</p>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => { setActiveTab(item.id); setIsSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === item.id ? "bg-[#00AEEF] text-white shadow-lg shadow-blue-500/20" : "text-white/60 hover:bg-white/5 hover:text-white"}`}
            >
              <item.icon size={18} /> {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-red-400 hover:bg-red-500/10 transition-all">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-4 md:px-8 shrink-0">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(true)} className="md:hidden text-gray-500 hover:text-primary"><Menu size={24} /></button>
            <h2 className="text-lg font-black text-[#1B1464] capitalize tracking-tight">{activeTab.replace("-", " ")}</h2>
          </div>
          <button onClick={() => router.push("/portal")} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-[#1B1464] transition-colors">
            <ArrowLeft size={14} /> Back to Hub
          </button>
        </header>

        {/* Scrollable Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
          <div className="max-w-6xl mx-auto space-y-6">
            
            {/* Dashboard Tab */}
            {activeTab === "dashboard" && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm border-l-4 border-l-[#00AEEF]">
                    <div className="flex justify-between items-start mb-2">
                      <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Total Students</p>
                      <Users size={16} className="text-[#00AEEF]" />
                    </div>
                    <p className="text-3xl font-black text-[#1B1464]">{students.filter(s => teacher.assignedClasses.includes(s.cls)).length}</p>
                  </div>
                  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm border-l-4 border-l-[#25D366]">
                    <div className="flex justify-between items-start mb-2">
                      <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Today's Att.</p>
                      <CalendarCheck size={16} className="text-[#25D366]" />
                    </div>
                    <p className="text-3xl font-black text-[#1B1464]">{Object.keys(attendance[selectedDate] || {}).length}</p>
                    <p className="text-[10px] font-bold text-gray-400 mt-1">Marked today</p>
                  </div>
                  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm border-l-4 border-l-purple-500">
                    <div className="flex justify-between items-start mb-2">
                      <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Marks Drafts</p>
                      <Trophy size={16} className="text-purple-500" />
                    </div>
                    <p className="text-3xl font-black text-[#1B1464]">{teacherMarks.filter(m => m.status === "draft").length}</p>
                    <p className="text-[10px] font-bold text-gray-400 mt-1">Pending Admin Release</p>
                  </div>
                  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm border-l-4 border-l-orange-500">
                    <div className="flex justify-between items-start mb-2">
                      <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Classes</p>
                      <LayoutDashboard size={16} className="text-orange-500" />
                    </div>
                    <p className="text-3xl font-black text-[#1B1464]">{teacher.assignedClasses.length}</p>
                  </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-6 mt-6">
                  <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                    <h3 className="font-black text-[#1B1464] uppercase tracking-tight mb-4">Assigned Classes</h3>
                    <div className="space-y-3">
                      {teacher.assignedClasses.map((cls: string) => (
                        <div key={cls} className="flex justify-between items-center p-4 bg-gray-50 rounded-xl border border-gray-100">
                          <span className="font-bold text-[#1B1464]">{cls}</span>
                          <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-white rounded-full text-gray-500 border border-gray-200">
                            {students.filter(s => s.cls === cls).length} Students
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                    <h3 className="font-black text-[#1B1464] uppercase tracking-tight mb-4">Assigned Subjects</h3>
                    <div className="flex flex-wrap gap-2">
                      {currentSubjects.map((sub: string) => (
                        <span key={sub} className="px-4 py-2 bg-[#F0F7FF] text-[#00AEEF] border border-blue-100 rounded-xl font-bold text-sm">
                          {sub}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Attendance Tab */}
            {activeTab === "attendance" && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row gap-4 justify-between items-center bg-gray-50/50">
                  <div className="flex items-center gap-4 w-full md:w-auto">
                    <input 
                      type="date" 
                      value={selectedDate}
                      onChange={e => setSelectedDate(e.target.value)}
                      className="px-4 py-2.5 rounded-xl border border-gray-200 font-bold text-sm text-[#1B1464] outline-none focus:border-[#00AEEF]"
                    />
                    <select
                      value={selectedClass}
                      onChange={e => setSelectedClass(e.target.value)}
                      className="px-4 py-2.5 rounded-xl border border-gray-200 font-bold text-sm text-[#1B1464] outline-none focus:border-[#00AEEF] flex-1 md:flex-none"
                    >
                      {teacher.assignedClasses.map((c: string) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <button onClick={saveAttendance} className="w-full md:w-auto px-6 py-2.5 bg-[#1B1464] text-white font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-[#00AEEF] transition-colors flex items-center justify-center gap-2">
                    <Save size={16} /> Save Attendance
                  </button>
                </div>
                
                <div className="overflow-x-auto custom-scrollbar">
                  <table className="w-full min-w-[700px] text-left">
                    <thead className="bg-gray-50 border-b border-gray-100">
                      <tr>
                        <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Roll No</th>
                        <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Student Name</th>
                        <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400 text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {filteredStudents.length === 0 ? (
                        <tr><td colSpan={3} className="px-6 py-8 text-center text-gray-400 font-bold">No students found for this class.</td></tr>
                      ) : (
                        filteredStudents.map(student => {
                          const status = attendance[selectedDate]?.[student.id];
                          return (
                            <tr key={student.id} className="hover:bg-gray-50/50">
                              <td className="px-6 py-4 font-bold text-gray-500">{student.rollNo}</td>
                              <td className="px-6 py-4 font-black text-[#1B1464]">{student.name}</td>
                              <td className="px-6 py-4">
                                <div className="flex items-center justify-center gap-2">
                                  <button onClick={() => handleMarkAttendance(student.id, "present")} className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${status === "present" ? "bg-[#25D366] text-white shadow-md shadow-green-500/20" : "bg-gray-100 text-gray-400 hover:bg-gray-200"}`}>Present</button>
                                  <button onClick={() => handleMarkAttendance(student.id, "absent")} className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${status === "absent" ? "bg-red-500 text-white shadow-md shadow-red-500/20" : "bg-gray-100 text-gray-400 hover:bg-gray-200"}`}>Absent</button>
                                  <button onClick={() => handleMarkAttendance(student.id, "late")} className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${status === "late" ? "bg-orange-500 text-white shadow-md shadow-orange-500/20" : "bg-gray-100 text-gray-400 hover:bg-gray-200"}`}>Late</button>
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Marks Tab */}
            {activeTab === "marks" && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 bg-gray-50/50 space-y-4">
                  <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                    <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
                      <select value={selectedClass} onChange={e => setSelectedClass(e.target.value)} className="px-4 py-2.5 rounded-xl border border-gray-200 font-bold text-sm text-[#1B1464] outline-none focus:border-[#00AEEF]">
                        {teacher.assignedClasses.map((c: string) => <option key={c} value={c}>{c}</option>)}
                      </select>
                      <select value={selectedSubject} onChange={e => setSelectedSubject(e.target.value)} className="px-4 py-2.5 rounded-xl border border-gray-200 font-bold text-sm text-[#1B1464] outline-none focus:border-[#00AEEF]">
                        {currentSubjects.map((s: string) => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                    <button onClick={saveMarks} className="w-full md:w-auto px-6 py-2.5 bg-[#1B1464] text-white font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-[#00AEEF] transition-colors flex items-center justify-center gap-2">
                      <Save size={16} /> Save Marks (Draft)
                    </button>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-bold text-orange-500 bg-orange-50 p-3 rounded-lg border border-orange-100">
                    <AlertCircle size={14} /> Marks uploaded here remain hidden from students until Admin releases them.
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-100">
                      <tr>
                        <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Roll No</th>
                        <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Student Name</th>
                        <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400 w-48">Marks (e.g. 85/100)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {filteredStudents.length === 0 ? (
                        <tr><td colSpan={3} className="px-6 py-8 text-center text-gray-400 font-bold">No students found.</td></tr>
                      ) : (
                        filteredStudents.map(student => (
                          <tr key={student.id} className="hover:bg-gray-50/50">
                            <td className="px-6 py-4 font-bold text-gray-500">{student.rollNo}</td>
                            <td className="px-6 py-4 font-black text-[#1B1464]">{student.name}</td>
                            <td className="px-6 py-4">
                              <input 
                                type="text"
                                placeholder="0/100"
                                value={getMark(student.id)}
                                onChange={(e) => handleMarkChange(student.id, e.target.value)}
                                className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-[#00AEEF] outline-none font-black text-[#1B1464] text-sm text-center"
                              />
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Performance Tab */}
            {activeTab === "performance" && (
              <div className="bg-white rounded-[2rem] border border-gray-100 shadow-xl shadow-blue-900/5 p-6 md:p-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-b border-gray-50 pb-8 mb-8">
                  <div>
                    <h3 className="text-2xl font-black text-[#1B1464] uppercase tracking-tight">Performance Ratings</h3>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Rate student performance directly</p>
                  </div>
                  <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                    <select value={selectedClass} onChange={e => setSelectedClass(e.target.value)} className="w-full md:w-auto px-4 py-2.5 rounded-xl border border-gray-200 font-bold text-sm text-[#1B1464] outline-none focus:border-[#00AEEF]">
                      {teacher.assignedClasses.map((c: string) => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <button onClick={saveRatings} className="w-full md:w-auto px-6 py-2.5 bg-[#00AEEF] text-white font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-blue-500 transition-colors flex items-center justify-center gap-2">
                      <Save size={16} /> Save Ratings
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-100">
                      <tr>
                        <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Roll No</th>
                        <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Student Name</th>
                        <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Star Rating (1-5)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {filteredStudents.length === 0 ? (
                        <tr><td colSpan={3} className="px-6 py-8 text-center text-gray-400 font-bold">No students found.</td></tr>
                      ) : (
                        filteredStudents.map(student => (
                          <tr key={student.id} className="hover:bg-gray-50/50">
                            <td className="px-6 py-4 font-bold text-gray-500">{student.rollNo}</td>
                            <td className="px-6 py-4 font-black text-[#1B1464]">{student.name}</td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-1">
                                {[1, 2, 3, 4, 5].map(star => (
                                  <button
                                    key={star}
                                    onClick={() => handleRatingChange(student.id, star)}
                                    className={`p-1 transition-all ${star <= getRating(student.id) ? 'text-yellow-400 hover:scale-110' : 'text-gray-200 hover:text-yellow-200'}`}
                                  >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                                  </button>
                                ))}
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Students Tab */}
            {activeTab === "students" && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex flex-col sm:flex-row gap-4 justify-between">
                  <select value={selectedClass} onChange={e => setSelectedClass(e.target.value)} className="px-4 py-2.5 rounded-xl border border-gray-200 font-bold text-sm text-[#1B1464] outline-none focus:border-[#00AEEF]">
                    {teacher.assignedClasses.map((c: string) => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                      type="text" 
                      placeholder="Search students..." 
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 font-medium text-sm outline-none focus:border-[#00AEEF]"
                    />
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-100">
                      <tr>
                        <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Roll No</th>
                        <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Student Name</th>
                        <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Contact</th>
                        <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">ID</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {filteredStudents.length === 0 ? (
                        <tr><td colSpan={4} className="px-6 py-8 text-center text-gray-400 font-bold">No students found.</td></tr>
                      ) : (
                        filteredStudents.map(student => (
                          <tr key={student.id} className="hover:bg-gray-50/50">
                            <td className="px-6 py-4 font-bold text-gray-500">{student.rollNo}</td>
                            <td className="px-6 py-4 font-black text-[#1B1464]">{student.name}</td>
                            <td className="px-6 py-4 font-medium text-gray-600">{student.contact}</td>
                            <td className="px-6 py-4 font-mono text-xs text-gray-400">{student.id}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            
          </div>
        </div>
      </main>
    </div>
  );
}
