'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  Newspaper, 
  Calendar, 
  Image as ImageIcon, 
  Bell, 
  Trophy, 
  LogOut, 
  Plus, 
  Trash2, 
  Edit, 
  Upload, 
  X, 
  Menu, 
  Users, 
  GraduationCap,
  Filter,
  Search,
  Medal,
  Award,
  AlertCircle
} from 'lucide-react';

type Tab = 'dashboard' | 'news' | 'events' | 'gallery' | 'notices' | 'results' | 'staff' | 'students' | 'classes';

interface NewsItem { id: number; title: string; date: string; content: string; }
interface EventItem { id: number; title: string; date: string; location: string; }
interface GalleryItem { id: number; title: string; category: string; url: string; }
interface NoticeItem { id: number; title: string; date: string; content: string; }
interface ResultItem { id: number; name: string; cls: string; marks: string; grade: string; }
interface StaffItem { 
  id: number; 
  staffId: string;
  name: string; 
  email: string; 
  role: string; 
  password?: string;
  access: boolean; 
}
interface StudentItem { 
  id: string; 
  name: string; 
  fatherName: string;
  cls: string; 
  section: string; 
  rollNo: string; 
  contact: string;
  parentId: string; 
  password?: string; 
  parentPassword?: string; 
}

export default function AdminPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  
  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [classFilter, setClassFilter] = useState('All');
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [eventItems, setEventItems] = useState<EventItem[]>([]);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [noticeItems, setNoticeItems] = useState<NoticeItem[]>([]);
  const [resultItems, setResultItems] = useState<ResultItem[]>([]);
  const [staffItems, setStaffItems] = useState<StaffItem[]>([]);
  const [studentItems, setStudentItems] = useState<StudentItem[]>([]);
  const [classItems, setClassItems] = useState<any[]>([]);

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<Tab>('news');
  const [formData, setFormData] = useState<any>({});
  const [editingItem, setEditingItem] = useState<any>(null);
  const [status, setStatus] = useState<{message: string, type: 'success' | 'error'} | null>(null);
  const [dataLoaded, setDataLoaded] = useState(false);

  // Data Persistence Logic
  useEffect(() => {
    const auth = localStorage.getItem('ags_admin_auth');
    if (!auth) {
      router.push('/admin/login');
    } else {
      setIsAuth(true);
      // Load all from localStorage
      const load = (key: string, set: any, defaultValue: any) => {
        const saved = localStorage.getItem(key);
        if (saved) {
          set(JSON.parse(saved));
        } else {
          set(defaultValue);
        }
      };
      
      load('ags_news', setNewsItems, [
        { id: 1, title: "Board Exam Results: 98% Pass Rate!", date: "Apr 20, 2026", content: "Our students achieved outstanding results." },
      ]);
      load('ags_events', setEventItems, [
        { id: 1, title: "Annual Science Fair", date: "2026-05-15", location: "Main Auditorium" },
      ]);
      load('ags_gallery', setGalleryItems, [
        { id: 1, title: "Campus View", category: "Campus", url: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=400" },
      ]);
      load('ags_notices', setNoticeItems, [
        { id: 1, title: "Fee Submission Deadline", date: "May 10, 2026", content: "Last date for fee submission is May 10." },
      ]);
      load('ags_results', setResultItems, [
        { id: 1, name: "Hania Farooq", cls: "Class 10", marks: "1085/1100", grade: "A+" },
      ]);
      load('ags_staff', setStaffItems, [
        { id: 1, staffId: 'T-1001', name: "Ahmad Ali", email: "ahmad@ags.edu.pk", role: "Teacher", access: true, password: "password123" },
      ]);
      load('ags_classes', setClassItems, [
        { id: 1, name: 'Class 9', capacity: '40', subjects: 'Mathematics, Physics, Chemistry, English, Urdu' },
        { id: 2, name: 'Class 10', capacity: '40', subjects: 'Mathematics, Physics, Chemistry, English, Urdu' }
      ]);
      load('ags_students', setStudentItems, []);
      
      setDataLoaded(true);
    }
  }, [router]);

  // Save changes to localStorage
  useEffect(() => {
    if (!dataLoaded) return;
    try {
      const save = (key: string, data: any) => localStorage.setItem(key, JSON.stringify(data));
      save('ags_news', newsItems);
      save('ags_events', eventItems);
      save('ags_gallery', galleryItems);
      save('ags_notices', noticeItems);
      save('ags_results', resultItems);
      save('ags_staff', staffItems);
      save('ags_classes', classItems);
      save('ags_students', studentItems);
    } catch (err) {
      console.error(err);
      setStatus({ message: 'Storage Full! Delete old items or use smaller images.', type: 'error' });
      setTimeout(() => setStatus(null), 5000);
    }
  }, [newsItems, eventItems, galleryItems, noticeItems, resultItems, staffItems, studentItems, classItems, dataLoaded]);

  const handleLogout = () => {
    localStorage.removeItem('ags_admin_auth');
    router.push('/admin/login');
  };


  if (!isAuth) return null;

  const generateCredentials = () => {
    if (modalType === 'students') {
        const newId = "AGS-" + Math.floor(1000 + Math.random() * 9000);
        const newPass = Math.random().toString(36).slice(-8);
        const newParentId = "P-" + Math.floor(1000 + Math.random() * 9000);
        const newParentPass = Math.random().toString(36).slice(-8);
        
        setFormData({
          ...formData,
          studentId: newId,
          password: newPass,
          parentId: newParentId,
          parentPassword: newParentPass
        });
    } else if (modalType === 'staff') {
        const newId = "AGS-T-" + Math.floor(100 + Math.random() * 900);
        const newPass = Math.random().toString(36).slice(-8);
        setFormData({
            ...formData,
            staffId: newId,
            password: newPass
        });
    }
  };

  const openAddModal = (type: Tab, item?: any) => {
    setModalType(type);
    if (item) {
      setEditingItem(item);
      setFormData({...item, studentId: item.id});
    } else {
      setEditingItem(null);
      setFormData({});
    }
    setShowModal(true);
  };


  const handleAdd = () => {
    const id = Date.now();
    
    try {
      if (editingItem) {
        // Universal Edit Logic
        const update = (items: any[], setItems: any) => {
          setItems(items.map(item => item.id === editingItem.id ? { ...item, ...formData } : item));
        };

        switch (modalType) {
          case 'news': update(newsItems, setNewsItems); break;
          case 'events': update(eventItems, setEventItems); break;
          case 'gallery': update(galleryItems, setGalleryItems); break;
          case 'notices': update(noticeItems, setNoticeItems); break;
          case 'results': update(resultItems, setResultItems); break;
          case 'staff': update(staffItems, setStaffItems); break;
          case 'classes': update(classItems, setClassItems); break;
          case 'students':
            setStudentItems(studentItems.map(s => s.id === editingItem.id ? {
                ...s,
                id: formData.studentId || s.id,
                ...formData
            } : s));
            break;
        }
        setStatus({ message: 'Changes Saved Successfully!', type: 'success' });
      } else {
        // Universal Add Logic
        switch (modalType) {
          case 'news':
            setNewsItems([{ id, date: new Date().toLocaleDateString(), ...formData }, ...newsItems]);
            break;
          case 'events':
            setEventItems([{ id, ...formData }, ...eventItems]);
            break;
          case 'gallery':
            setGalleryItems([{ id, ...formData }, ...galleryItems]);
            break;
          case 'notices':
            setNoticeItems([{ id, date: new Date().toLocaleDateString(), ...formData }, ...noticeItems]);
            break;
          case 'results':
            setResultItems([{ id, ...formData }, ...resultItems]);
            break;
          case 'staff':
            setStaffItems([{ 
                id, 
                staffId: formData.staffId || `STAFF-${Math.floor(1000 + Math.random() * 9000)}`,
                ...formData,
                access: true 
            }, ...staffItems]);
            break;
          case 'classes':
            setClassItems([{ id, ...formData }, ...classItems]);
            break;
          case 'students':
            setStudentItems([{ 
                id: formData.studentId || id.toString(), 
                ...formData,
                password: formData.password || 'password123',
                parentPassword: formData.parentPassword || 'parent123'
            }, ...studentItems]);
            break;
        }
        setStatus({ message: 'Added Successfully!', type: 'success' });
      }

      setShowModal(false);
      setFormData({});
      setTimeout(() => setStatus(null), 3000);
    } catch (err) {
      console.error(err);
      setStatus({ message: 'Error! Storage might be full. Try smaller images.', type: 'error' });
    }
  };

  const filteredStudents = studentItems.filter(s => {
    const studentName = s.name || '';
    const studentId = s.id?.toString() || '';
    const matchesSearch = studentName.toLowerCase().includes(searchTerm.toLowerCase()) || studentId.includes(searchTerm);
    const matchesClass = classFilter === 'All' || s.cls === classFilter;
    return matchesSearch && matchesClass;
  });

  const tabs: { key: Tab; label: string; icon: any }[] = [
    { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { key: 'classes', label: 'Classes', icon: LayoutDashboard },
    { key: 'students', label: 'Students', icon: GraduationCap },
    { key: 'staff', label: 'Staff / Teachers', icon: Users },
    { key: 'news', label: 'News', icon: Newspaper },
    { key: 'events', label: 'Events', icon: Calendar },
    { key: 'gallery', label: 'Gallery', icon: ImageIcon },
    { key: 'notices', label: 'Notices', icon: Bell },
    { key: 'results', label: 'Results', icon: Trophy },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Toast Notification */}
      {status && (
        <div className={`fixed top-10 left-1/2 -translate-x-1/2 z-[100] px-6 py-3 rounded-2xl shadow-2xl font-black uppercase tracking-widest text-xs animate-bounce ${status.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
           {status.message}
        </div>
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-primary text-white transform transition-transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="p-6 border-b border-white/10">
          <h2 className="text-xl font-extrabold tracking-wider">AGS Admin</h2>
          <p className="text-xs text-gray-400 mt-1">Content Management</p>
        </div>
        <nav className="p-4 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => { setActiveTab(tab.key); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === tab.key ? 'bg-secondary text-primary' : 'text-gray-300 hover:bg-white/10'}`}
            >
              <tab.icon size={20} />
              {tab.label}
            </button>
          ))}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-2 text-gray-400 hover:text-white text-sm px-4 py-2 transition-colors"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 lg:ml-0">
        {/* Top bar */}
        <div className="bg-white shadow-sm px-6 py-4 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden">
              <Menu size={24} />
            </button>
            <h2 className="text-xl font-bold text-primary capitalize">{activeTab}</h2>
          </div>
          {activeTab !== 'dashboard' && (
            <button onClick={() => openAddModal(activeTab)} className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-secondary hover:text-primary transition-all">
              <Plus size={18} /> Add New {activeTab === 'classes' ? 'Class' : activeTab === 'gallery' ? 'Photo' : activeTab === 'staff' ? 'Teacher' : activeTab.slice(0, -1)}
            </button>
          )}
        </div>

        <div className="flex-1 overflow-y-auto overflow-x-hidden h-[calc(100vh-64px)] p-6 custom-scrollbar">
          {/* Dashboard */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8">
              {/* Welcome Hero */}
              <div className="bg-primary rounded-[2rem] p-10 text-white relative overflow-hidden shadow-2xl shadow-primary/20">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl"></div>
                <div className="relative z-10">
                  <h3 className="text-4xl font-black mb-2 tracking-tight">Welcome Sir!</h3>
                  <div className="flex gap-4 mt-8">
                    <div className="bg-white/10 px-6 py-3 rounded-2xl border border-white/10 backdrop-blur-sm">
                      <p className="text-[10px] font-black uppercase tracking-widest text-secondary">Total Students</p>
                      <p className="text-2xl font-black">{studentItems.length}</p>
                    </div>
                    <div className="bg-white/10 px-6 py-3 rounded-2xl border border-white/10 backdrop-blur-sm">
                      <p className="text-[10px] font-black uppercase tracking-widest text-secondary">Active Teachers</p>
                      <p className="text-2xl font-black">{staffItems.length}</p>
                    </div>
                    <div className="bg-white/10 px-6 py-3 rounded-2xl border border-white/10 backdrop-blur-sm hidden md:block">
                      <p className="text-[10px] font-black uppercase tracking-widest text-secondary">Recent News</p>
                      <p className="text-2xl font-black">{newsItems.length}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div>
                <h4 className="text-lg font-black text-primary mb-6 uppercase tracking-tight flex items-center gap-2">
                  <Plus size={20} className="text-secondary" /> Quick Actions
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: "Add Student", icon: GraduationCap, color: "bg-blue-500", tab: 'students' },
                    { label: "Post News", icon: Newspaper, color: "bg-orange-500", tab: 'news' },
                    { label: "Upload Result", icon: Trophy, color: "bg-green-500", tab: 'results' },
                    { label: "Staff Access", icon: Users, color: "bg-purple-500", tab: 'staff' },
                  ].map((action, i) => (
                    <button 
                      key={i} 
                      onClick={() => {
                        if (action.tab === 'students' || action.tab === 'news' || action.tab === 'results' || action.tab === 'staff') {
                            setActiveTab(action.tab as Tab);
                            setTimeout(() => openAddModal(action.tab as Tab), 100);
                        }
                      }}
                      className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl hover:scale-105 transition-all group text-left"
                    >
                      <div className={`w-12 h-12 ${action.color} rounded-2xl flex items-center justify-center text-white mb-4 group-hover:rotate-12 transition-transform shadow-lg shadow-gray-200`}>
                        <action.icon size={24} />
                      </div>
                      <p className="font-black text-primary uppercase tracking-tight text-sm">{action.label}</p>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">One Click Action</p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8 pb-10">
                {/* Recent Activity */}
                <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                  <h4 className="text-lg font-black text-primary mb-6 uppercase tracking-tight">System Activity</h4>
                  <div className="space-y-6">
                    {/* Activity from News */}
                    {newsItems.length > 0 && (
                      <div className="flex gap-4 items-start">
                        <div className="mt-1 p-2 bg-orange-50 text-orange-500 rounded-lg">
                          <Newspaper size={16} />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-primary leading-tight">Latest News: {newsItems[newsItems.length - 1].title}</p>
                          <p className="text-[10px] text-gray-400 font-black uppercase mt-1">Updated Just Now</p>
                        </div>
                      </div>
                    )}
                    {/* Activity from Students */}
                    {studentItems.length > 0 && (
                      <div className="flex gap-4 items-start">
                        <div className="mt-1 p-2 bg-blue-50 text-blue-500 rounded-lg">
                          <Plus size={16} />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-primary leading-tight">Total {studentItems.length} students are currently active in portal</p>
                          <p className="text-[10px] text-gray-400 font-black uppercase mt-1">Real-time Data</p>
                        </div>
                      </div>
                    )}
                    {/* Activity from Staff */}
                    <div className="flex gap-4 items-start">
                      <div className="mt-1 p-2 bg-green-50 text-green-500 rounded-lg">
                        <Users size={16} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-primary leading-tight">{staffItems.length} Staff members have portal access</p>
                        <p className="text-[10px] text-gray-400 font-black uppercase mt-1">Verified</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* System Status */}
                <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                  <h4 className="text-lg font-black text-primary mb-6 uppercase tracking-tight">System Status</h4>
                  <div className="space-y-6">
                    <div className="flex justify-between items-center bg-gray-50 p-4 rounded-2xl">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <p className="text-sm font-black text-primary uppercase tracking-tight">Portal Server</p>
                      </div>
                      <span className="text-[10px] font-black text-green-600 bg-green-100 px-3 py-1 rounded-full uppercase tracking-widest">Active</span>
                    </div>
                    <div className="flex justify-between items-center bg-gray-50 p-4 rounded-2xl">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                        <p className="text-sm font-black text-primary uppercase tracking-tight">Database</p>
                      </div>
                      <span className="text-[10px] font-black text-blue-600 bg-blue-100 px-3 py-1 rounded-full uppercase tracking-widest">Synchronized</span>
                    </div>
                    <button className="w-full py-4 bg-gray-50 text-gray-400 font-black text-xs uppercase tracking-[0.2em] rounded-2xl hover:bg-primary hover:text-white transition-all border border-dashed border-gray-200">
                      View Full System Logs
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* News */}
          {activeTab === 'news' && (
            <div className="space-y-4">
              {newsItems.map((item) => (
                <div key={item.id} className="bg-white rounded-xl p-5 shadow-md flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-primary">{item.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{item.date}</p>
                    <p className="text-gray-600 text-sm mt-2">{item.content}</p>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg"><Edit size={18} /></button>
                    <button onClick={() => setNewsItems(newsItems.filter(n => n.id !== item.id))} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={18} /></button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Events */}
          {activeTab === 'events' && (
            <div className="space-y-4">
              {eventItems.map((item) => (
                <div key={item.id} className="bg-white rounded-xl p-5 shadow-md flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-primary">{item.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{item.date} • {item.location}</p>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg"><Edit size={18} /></button>
                    <button onClick={() => setEventItems(eventItems.filter(e => e.id !== item.id))} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={18} /></button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Gallery */}
          {activeTab === 'gallery' && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {galleryItems.map((item) => (
                <div key={item.id} className="bg-white rounded-xl overflow-hidden shadow-md group relative">
                  <div className="h-40 bg-gray-200 relative">
                    <img src={item.url} alt={item.title} className="w-full h-full object-cover" />
                    <button onClick={() => setGalleryItems(galleryItems.filter(g => g.id !== item.id))} className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <div className="p-3">
                    <h4 className="font-bold text-primary text-sm">{item.title}</h4>
                    <p className="text-xs text-gray-500">{item.category}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Notices */}
          {activeTab === 'notices' && (
            <div className="space-y-4">
              {noticeItems.map((item) => (
                <div key={item.id} className="bg-white rounded-xl p-5 shadow-md flex justify-between items-start border-l-4 border-yellow-400">
                  <div>
                    <h3 className="font-bold text-primary">{item.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{item.date}</p>
                    <p className="text-gray-600 text-sm mt-2">{item.content}</p>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg"><Edit size={18} /></button>
                    <button onClick={() => setNoticeItems(noticeItems.filter(n => n.id !== item.id))} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={18} /></button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Results */}
          {activeTab === 'results' && (
            <div className="bg-white rounded-[2.5rem] shadow-xl shadow-primary/5 border border-gray-100 overflow-hidden">
              <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
                <div>
                  <h3 className="text-2xl font-black text-primary tracking-tight uppercase">Examination Results Board</h3>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Manage student marks and automatic rankings</p>
                </div>
                <div className="flex gap-4">
                  <select 
                    value={classFilter} 
                    onChange={e => setClassFilter(e.target.value)}
                    className="px-4 py-2 bg-white border border-gray-200 rounded-xl outline-none font-bold text-xs"
                  >
                    <option value="All">All Classes</option>
                    {classItems.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                  </select>
                  <Link href="/admin/results-control" className="bg-[#25D366] text-white px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-green-600 transition-all flex items-center gap-2">
                    Result Control
                  </Link>
                  <button onClick={() => openAddModal('results')} className="bg-primary text-white px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-secondary hover:text-primary transition-all flex items-center gap-2">
                    <Plus size={16} /> Add Manual Result
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <div className="p-8 bg-red-50/30 border-b border-red-100">
                  <h4 className="text-lg font-black text-red-600 uppercase tracking-tight flex items-center gap-2 mb-4">
                    <AlertCircle size={20} /> Critical Attention Required (Lowest Scores)
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {resultItems
                      .filter(r => classFilter === 'All' || r.cls === classFilter)
                      .sort((a, b) => (parseFloat(a.marks.split('/')[0]) || 0) - (parseFloat(b.marks.split('/')[0]) || 0))
                      .slice(0, 3)
                      .map((item) => (
                        <div key={'low-'+item.id} className="bg-white p-4 rounded-xl border border-red-100 shadow-sm flex items-center justify-between hover:shadow-md transition-all">
                          <div>
                            <p className="font-black text-[#1B1464]">{item.name}</p>
                            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{item.cls}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-black text-red-500">{item.marks}</p>
                            <p className="text-[10px] font-black text-red-400 bg-red-50 px-2 py-1 rounded-md inline-block uppercase tracking-widest">{item.grade}</p>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                <div className="overflow-x-auto custom-scrollbar">
                  <table className="w-full min-w-[800px]">
                  <thead>
                    <tr className="bg-primary text-white">
                      <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-widest">Rank</th>
                      <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-widest">Student Name</th>
                      <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-widest">Class</th>
                      <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-widest">Marks (Obtained/Total)</th>
                      <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-widest">Grade</th>
                      <th className="px-8 py-5 text-right text-[10px] font-black uppercase tracking-widest">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {resultItems
                      .filter(r => classFilter === 'All' || r.cls === classFilter)
                      .sort((a, b) => {
                        const getScore = (s: string) => parseFloat(s.split('/')[0]) || 0;
                        return getScore(b.marks) - getScore(a.marks);
                      })
                      .map((item, i) => (
                        <tr key={item.id} className={`hover:bg-gray-50 transition-colors ${i < 3 ? 'bg-yellow-50/20' : ''}`}>
                          <td className="px-8 py-4">
                             <div className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center shadow-sm">
                               {i === 0 ? <Trophy className="text-yellow-500" size={20} /> : 
                                i === 1 ? <Medal className="text-gray-400" size={20} /> :
                                i === 2 ? <Award className="text-orange-500" size={20} /> :
                                <span className="text-[10px] font-black text-gray-300">#{i+1}</span>}
                             </div>
                          </td>
                          <td className="px-8 py-4 font-black text-primary uppercase tracking-tight text-sm">{item.name}</td>
                          <td className="px-8 py-4 font-bold text-gray-500">{item.cls}</td>
                          <td className="px-8 py-4 font-black text-primary">{item.marks}</td>
                          <td className="px-8 py-4">
                             <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${i < 3 ? 'bg-primary text-white border-primary' : 'bg-green-50 text-green-700 border-green-100'}`}>
                               {item.grade}
                             </span>
                          </td>
                          <td className="px-8 py-4">
                            <div className="flex gap-2 justify-end">
                              <button onClick={() => openAddModal('results', item)} className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-lg"><Edit size={16} /></button>
                              <button onClick={() => setResultItems(resultItems.filter(r => r.id !== item.id))} className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={16} /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          )}

          {/* Staff */}
          {activeTab === 'staff' && (
            <div className="bg-white rounded-xl shadow-md overflow-x-auto custom-scrollbar">
              <table className="w-full min-w-[800px]">
                <thead className="bg-primary text-white">
                  <tr>
                    <th className="px-5 py-3 text-left text-sm">Staff ID</th>
                    <th className="px-5 py-3 text-left text-sm">Teacher Name</th>
                    <th className="px-5 py-3 text-left text-sm">Subject / Role</th>
                    <th className="px-5 py-3 text-left text-sm">Portal Access</th>
                    <th className="px-5 py-3 text-right text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {staffItems.map((item) => (
                    <tr key={item.id} className="border-b hover:bg-gray-50 group">
                      <td className="px-5 py-3 font-black text-secondary">{item.staffId}</td>
                      <td className="px-5 py-3">
                        <p className="font-bold text-primary">{item.name}</p>
                        <p className="text-[10px] text-gray-400 font-medium">{item.email}</p>
                      </td>
                      <td className="px-5 py-3 font-bold text-gray-600">{item.role}</td>
                      <td className="px-5 py-3">
                        <button 
                          onClick={() => setStaffItems(staffItems.map(s => s.id === item.id ? {...s, access: !s.access} : s))}
                          className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${item.access ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}
                        >
                          {item.access ? 'Granted' : 'Revoked'}
                        </button>
                      </td>
                      <td className="px-5 py-3">
                        <div className="flex gap-2 justify-end">
                          <button onClick={() => openAddModal('staff', item)} className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-lg flex items-center gap-1 text-[10px] font-black uppercase tracking-widest"><Edit size={14} /> Edit</button>
                          <button onClick={() => setStaffItems(staffItems.filter(s => s.id !== item.id))} className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={16} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Classes */}
          {activeTab === 'classes' && (
            <div className="bg-white rounded-[2.5rem] shadow-xl shadow-primary/5 border border-gray-100 overflow-hidden p-8">
              <div className="flex justify-between items-center mb-8 border-b border-gray-50 pb-6">
                <div>
                  <h3 className="text-2xl font-black text-primary tracking-tight uppercase">Class Management</h3>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Add or manage academic classes</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {classItems.map((cls) => {
                  const enrolled = studentItems.filter(s => s.cls === cls.name).length;
                  return (
                    <div key={cls.id} className="bg-gray-50 p-6 rounded-2xl border border-gray-100 flex flex-col justify-between group hover:shadow-xl hover:shadow-blue-900/5 hover:-translate-y-1 transition-all">
                      <div>
                        <h4 className="text-xl font-black text-primary uppercase tracking-tight">{cls.name}</h4>
                        <p className="text-[10px] font-bold text-secondary uppercase tracking-widest mt-2 bg-blue-50 px-3 py-1.5 rounded-lg inline-block">{cls.subjects ? cls.subjects.split(',').length + ' Subjects' : 'No Subjects'}</p>
                      </div>
                      <div className="mt-8 flex items-center justify-between">
                        <div className="bg-white px-4 py-2 rounded-xl shadow-sm">
                          <span className="text-xl font-black text-[#00AEEF]">{enrolled}</span>
                          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Students</span>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => { setClassFilter(cls.name); setActiveTab('students'); }} className="p-2.5 bg-primary text-white rounded-xl hover:bg-[#00AEEF] transition-colors" title="View Students">
                            <Users size={16} />
                          </button>
                          <button onClick={() => openAddModal('classes', cls)} className="p-2.5 bg-gray-200 text-gray-600 rounded-xl hover:bg-gray-300 transition-colors">
                            <Edit size={16} />
                          </button>
                          <button onClick={() => setClassItems(classItems.filter(c => c.id !== cls.id))} className="p-2.5 bg-red-100 text-red-500 rounded-xl hover:bg-red-200 transition-colors">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Students */}
          {activeTab === 'students' && (
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 items-center">
                <div className="flex-1 flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-lg border border-gray-100 w-full">
                  <Search size={18} className="text-gray-400" />
                  <input 
                    type="text" 
                    placeholder="Search by Name or ID..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-transparent border-none outline-none text-sm w-full" 
                  />
                </div>
                <div className="flex items-center gap-3 w-full md:w-auto">
                   <Filter size={18} className="text-gray-400 flex-shrink-0" />
                   <select 
                    value={classFilter}
                    onChange={(e) => setClassFilter(e.target.value)}
                    className="bg-gray-50 border border-gray-100 px-4 py-2 rounded-lg text-sm font-bold outline-none cursor-pointer w-full md:w-auto"
                   >
                     <option value="All">All Classes</option>
                     {classItems.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                   </select>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md overflow-x-auto custom-scrollbar">
                <table className="w-full min-w-[800px]">
                  <thead className="bg-primary text-white">
                    <tr>
                      <th className="px-5 py-3 text-left text-sm">Student ID</th>
                      <th className="px-5 py-3 text-left text-sm">Student Name</th>
                      <th className="px-5 py-3 text-left text-sm">Class / Sec</th>
                      <th className="px-5 py-3 text-left text-sm">Roll No</th>
                      <th className="px-5 py-3 text-left text-sm text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.map((item) => (
                      <tr key={item.id} className="border-b hover:bg-gray-50 group">
                        <td className="px-5 py-3 font-black text-secondary">{item.id}</td>
                        <td className="px-5 py-3 font-bold text-primary">{item.name}</td>
                        <td className="px-5 py-3 text-gray-600">{item.cls} ({item.section})</td>
                        <td className="px-5 py-3 font-bold">{item.rollNo}</td>
                        <td className="px-5 py-3">
                          <div className="flex gap-2 justify-end">
                            <button onClick={() => openAddModal('students', item)} className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-lg flex items-center gap-1 text-[10px] font-black uppercase tracking-widest"><Edit size={14} /> View/Edit</button>
                            <button onClick={() => setStudentItems(studentItems.filter(s => s.id !== item.id))} className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={16} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-3xl md:rounded-[2.5rem] p-6 md:p-10 w-full max-w-lg shadow-2xl overflow-y-auto max-h-[90vh]" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-black text-primary tracking-tight uppercase">
                {editingItem ? `Edit ${modalType === 'notices' ? 'Notice' : modalType === 'staff' ? 'Teacher' : modalType === 'students' ? 'Student' : modalType === 'classes' ? 'Class' : modalType === 'gallery' ? 'Photo' : modalType.slice(0, -1)} Details` : `Add New ${modalType === 'notices' ? 'Notice' : modalType === 'staff' ? 'Teacher' : modalType === 'students' ? 'Student' : modalType === 'classes' ? 'Class' : modalType === 'gallery' ? 'Photo' : modalType.slice(0, -1)}`}
              </h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600 p-2"><X size={28} /></button>
            </div>
            
            <div className="space-y-4">
              {modalType === 'classes' ? (
                <>
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Class Name</label>
                      <div className="flex">
                        <span className="inline-flex items-center px-4 py-3 bg-gray-50 border border-r-0 border-gray-200 rounded-l-xl text-sm font-black text-gray-500 uppercase">Class</span>
                        <input placeholder="e.g. 5th, Nursery, Prep" value={formData.name ? formData.name.replace(/^Class\s*/i, '') : ''} onChange={e => setFormData({...formData, name: 'Class ' + e.target.value.replace(/^Class\s*/i, '')})} className="w-full px-4 py-3 border border-gray-200 rounded-r-xl outline-none focus:border-secondary font-bold text-primary" />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Subjects (Comma Separated)</label>
                      <input placeholder="e.g. English, Math, Science" value={formData.subjects || ''} onChange={e => setFormData({...formData, subjects: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-secondary font-bold text-primary capitalize" />
                    </div>
                  </div>
                </>
              ) : modalType === 'students' ? (
                <>
                  <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 space-y-4">
                    <div className="flex items-center justify-between mb-2">
                       <h4 className="text-[10px] font-black text-secondary uppercase tracking-[0.2em]">Portal Credentials</h4>
                       {!editingItem && (
                         <button 
                           onClick={generateCredentials}
                           className="text-[10px] font-black text-primary hover:text-secondary uppercase tracking-widest flex items-center gap-1 transition-colors"
                         >
                           <Upload size={12} /> Auto Generate
                         </button>
                       )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Student ID</label>
                        <input placeholder="AGS-XXXX" value={formData.studentId || ''} onChange={e => setFormData({...formData, studentId: e.target.value})} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl outline-none focus:border-secondary font-bold text-primary" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Portal Password</label>
                        <input placeholder="••••••••" value={formData.password || ''} onChange={e => setFormData({...formData, password: e.target.value})} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl outline-none focus:border-secondary font-bold text-primary" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Student Name</label>
                        <input placeholder="Full Name" value={formData.name || ''} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-secondary font-bold text-primary" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Father Name</label>
                        <input placeholder="Father's Name" value={formData.fatherName || ''} onChange={e => setFormData({...formData, fatherName: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-secondary font-bold text-primary" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Class</label>
                        <select value={formData.cls || ''} onChange={e => setFormData({...formData, cls: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-secondary font-bold">
                          <option value="" disabled>Select Class</option>
                          {classItems.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Section</label>
                        <input placeholder="A" value={formData.section || ''} onChange={e => setFormData({...formData, section: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-secondary font-bold" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Roll No</label>
                        <input placeholder="24" value={formData.rollNo || ''} onChange={e => setFormData({...formData, rollNo: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-secondary font-bold text-primary" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Emergency / Father No</label>
                        <input placeholder="03XX-XXXXXXX" value={formData.contact || ''} onChange={e => setFormData({...formData, contact: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-secondary font-bold text-primary" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Parent Portal ID</label>
                        <input placeholder="P-XXXX" value={formData.parentId || ''} onChange={e => setFormData({...formData, parentId: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-secondary font-bold text-primary" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Parent Password</label>
                        <input placeholder="••••••••" value={formData.parentPassword || ''} onChange={e => setFormData({...formData, parentPassword: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-secondary font-bold text-primary" />
                      </div>
                    </div>
                  </div>
                </>
              ) : modalType === 'staff' ? (
                <>
                  <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 space-y-4">
                    <div className="flex items-center justify-between mb-2">
                       <h4 className="text-[10px] font-black text-secondary uppercase tracking-[0.2em]">Teacher Credentials</h4>
                       {!editingItem && (
                         <button 
                           onClick={generateCredentials}
                           className="text-[10px] font-black text-primary hover:text-secondary uppercase tracking-widest flex items-center gap-1 transition-colors"
                         >
                           <Upload size={12} /> Auto Generate
                         </button>
                       )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Staff ID</label>
                        <input placeholder="AGS-T00" value={formData.staffId || ''} onChange={e => setFormData({...formData, staffId: e.target.value})} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl outline-none focus:border-secondary font-bold text-primary" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Login Password</label>
                        <input placeholder="••••••••" value={formData.password || ''} onChange={e => setFormData({...formData, password: e.target.value})} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl outline-none focus:border-secondary font-bold text-primary" />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                      <input placeholder="Teacher Name" value={formData.name || ''} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-secondary font-bold text-primary" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Official Email</label>
                        <input placeholder="email@abexsun.edu" value={formData.email || ''} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-secondary font-bold" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Subject / Role</label>
                        <input placeholder="Math Teacher" value={formData.role || ''} onChange={e => setFormData({...formData, role: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-secondary font-bold" />
                      </div>
                    </div>
                  </div>
                </>
              ) : modalType === 'results' ? (
                <>
                  <input placeholder="Student Name" value={formData.name || ''} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-secondary" />
                  <input placeholder="Class" value={formData.cls || ''} onChange={e => setFormData({...formData, cls: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-secondary" />
                  <input placeholder="Marks (e.g. 1085/1100)" value={formData.marks || ''} onChange={e => setFormData({...formData, marks: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-secondary" />
                  <input placeholder="Grade" value={formData.grade || ''} onChange={e => setFormData({...formData, grade: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-secondary" />
                </>
              ) : modalType === 'gallery' ? (
                <>
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Image Title</label>
                      <input placeholder="Event or Activity Title" value={formData.title || ''} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-secondary font-bold text-primary" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Category</label>
                      <input placeholder="Campus / Sports / Events" value={formData.category || ''} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-secondary font-bold text-primary" />
                    </div>
                    <div 
                      onDragOver={(e) => {
                        e.preventDefault();
                        e.currentTarget.classList.add('border-secondary', 'bg-secondary/5');
                      }}
                      onDragLeave={(e) => {
                        e.preventDefault();
                        e.currentTarget.classList.remove('border-secondary', 'bg-secondary/5');
                      }}
                      onDrop={(e) => {
                        e.preventDefault();
                        e.currentTarget.classList.remove('border-secondary', 'bg-secondary/5');
                        const file = e.dataTransfer.files?.[0];
                        if (file && file.type.startsWith('image/')) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setFormData({ ...formData, url: reader.result as string });
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                      onClick={() => document.getElementById('file-upload')?.click()}
                      className="border-2 border-dashed border-gray-200 rounded-[2rem] p-10 text-center hover:border-secondary hover:bg-secondary/5 transition-all cursor-pointer group relative"
                    >
                      <input 
                        id="file-upload"
                        type="file" 
                        accept="image/*"
                        className="hidden" 
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setFormData({ ...formData, url: reader.result as string });
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                      {formData.url ? (
                        <div className="relative h-40 rounded-2xl overflow-hidden">
                           <img src={formData.url} className="w-full h-full object-cover" alt="Preview" />
                           <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <p className="text-white text-xs font-black uppercase tracking-widest">Change Image</p>
                           </div>
                        </div>
                      ) : (
                        <>
                          <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                            <Upload className="text-gray-400 group-hover:text-secondary" size={32} />
                          </div>
                          <p className="text-sm font-bold text-primary mb-1">Click or Drag & Drop Image</p>
                          <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Works best on Laptop</p>
                        </>
                      )}
                    </div>
                    <div className="relative py-2">
                       <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
                       <div className="relative flex justify-center text-[10px]"><span className="px-2 bg-white text-gray-400 font-black uppercase tracking-widest">OR PASTE URL</span></div>
                    </div>
                    <input placeholder="https://example.com/image.jpg" value={formData.url || ''} onChange={e => setFormData({...formData, url: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-secondary text-xs font-medium" />
                  </div>
                </>
              ) : modalType === 'events' ? (
                <>
                  <input placeholder="Event Title" value={formData.title || ''} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-secondary" />
                  <input type="date" value={formData.date || ''} onChange={e => setFormData({...formData, date: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-secondary" />
                  <input placeholder="Location" value={formData.location || ''} onChange={e => setFormData({...formData, location: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-secondary" />
                </>
              ) : modalType === 'news' ? (
                <>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">News Title</label>
                        <input placeholder="Announcement Title" value={formData.title || ''} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-secondary font-bold text-primary" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Category</label>
                        <input placeholder="Results / Event / Holiday" value={formData.category || ''} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-secondary font-bold text-primary" />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Detailed Content</label>
                      <textarea placeholder="Write full news update here..." rows={4} value={formData.content || ''} onChange={e => setFormData({...formData, content: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-secondary resize-none font-medium"></textarea>
                    </div>
                    {/* News Image Upload */}
                    <div className="space-y-1">
                      <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Cover Image (Optional)</label>
                      <div 
                        onClick={() => document.getElementById('news-file-upload')?.click()}
                        className="border-2 border-dashed border-gray-200 rounded-2xl p-6 text-center hover:border-secondary hover:bg-secondary/5 transition-all cursor-pointer group"
                      >
                        <input 
                          id="news-file-upload"
                          type="file" 
                          accept="image/*"
                          className="hidden" 
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onloadend = () => setFormData({ ...formData, url: reader.result as string });
                              reader.readAsDataURL(file);
                            }
                          }}
                        />
                        {formData.url ? (
                          <img src={formData.url} className="h-20 mx-auto rounded-lg shadow-sm" alt="Preview" />
                        ) : (
                          <div className="flex flex-col items-center">
                            <Upload className="text-gray-400 mb-1" size={20} />
                            <p className="text-[10px] font-bold text-gray-500">Upload Photo</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <input placeholder="Title" value={formData.title || ''} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-secondary" />
                  <textarea placeholder="Content" rows={4} value={formData.content || ''} onChange={e => setFormData({...formData, content: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-secondary resize-none"></textarea>
                </>
              )}
              <button onClick={handleAdd} className="w-full py-3 bg-primary text-white font-bold rounded-xl hover:bg-secondary hover:text-primary transition-all">
                {editingItem ? 'Save Changes' : `Add ${modalType === 'notices' ? 'Notice' : modalType === 'staff' ? 'Teacher' : modalType === 'students' ? 'Student' : modalType === 'classes' ? 'Class' : modalType === 'gallery' ? 'Photo' : modalType.slice(0, -1)}`}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile sidebar overlay */}
      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />}
    </div>
  );
}
