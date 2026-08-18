import React, { useState, useMemo } from 'react';
import { 
  CheckCircle2, 
  Circle, 
  ChevronDown, 
  ChevronRight, 
  Search, 
  Plus, 
  ArrowLeft, 
  Settings, 
  Archive, 
  X,
  LayoutDashboard,
  CheckSquare,
  AlertCircle
} from 'lucide-react';

// --- CHECKLIST TEMPLATE ---
const DEFAULT_CHECKLIST = [
  {
    title: "1. Website & Content",
    tasks: [
      "Check all pages are created and published.",
      "Check page titles, headings, content, images, and buttons.",
      "Remove all sample/demo content and blog posts.",
      "Check all images are correct, properly sized, and loading properly.",
      "If videos are used, check the correct video is added and playing properly.",
      "Check favicon is added and correct.",
      "Check copyright text is correct and dynamic.",
      "Check \"Powered by INKLIK\" footer link is working, if applicable.",
      "Check email address, phone number, physical address, and other contact details are correct.",
      "Check all social media links are correct and working.",
      "Check menus, dropdowns, buttons, CTAs, and internal links.",
      "Check footer links and legal pages."
    ]
  },
  {
    title: "2. Forms & Enquiries",
    tasks: [
      "Test every website form.",
      "Confirm form submissions are going to the correct email address.",
      "Confirm the \"From\" email is correctly configured.",
      "Confirm the form success message is: \"Your Enquiry has been received. We will get back to you soon.\"",
      "Check required fields and validation.",
      "Check spam protection is enabled using Simple Cloudflare Turnstile or reCAPTCHA v3.",
      "If reCAPTCHA v3 is used, add: .grecaptcha-badge { visibility: hidden; }",
      "Confirm enquiry emails are actually being received.",
      "Check reply-to and sender details in enquiry emails."
    ]
  },
  {
    title: "3. SEO & Search Engine Settings",
    tasks: [
      "Add Google Tag Manager.",
      "Add Google Analytics through Google Tag Manager.",
      "Install and configure Rank Math SEO.",
      "Remove \"Discourage search engines from indexing this site\".",
      "Check robots.txt.",
      "Check XML sitemap.",
      "Check meta titles and descriptions for important pages.",
      "Check canonical URLs.",
      "Check Open Graph/social sharing information.",
      "Check website is indexable after going live."
    ]
  },
  {
    title: "4. URLs, SSL & Redirections",
    tasks: [
      "Confirm SSL certificate is active.",
      "Check HTTP → HTTPS redirection.",
      "Check non-www → www or www → non-www redirection as required.",
      "Check the preferred domain is configured consistently.",
      "Check for broken links.",
      "Check all important URLs return the correct status code.",
      "If revamping an existing website, prepare and test 301 redirects from old URLs to new URLs.",
      "Check important old URLs are not unnecessarily returning 404 errors.",
      "Check internal links after URL changes.",
      "Check there are no redirect chains or loops."
    ]
  },
  {
    title: "5. WordPress & Admin Security",
    tasks: [
      "Make sure the main login username is not \"admin\", \"inklik_admin\", or \"inklik_test\".",
      "Use a strong administrator password.",
      "Remove unnecessary administrator accounts.",
      "Remove unused themes and plugins.",
      "Update WordPress, themes, and plugins.",
      "Install and configure WP Activity Log.",
      "Install and configure MainWP Child.",
      "Disable pingbacks.",
      "Go to Settings → Discussion and enable only: 1. Attempt to notify... 2. Comment must be manually approved",
      "Check user roles and permissions.",
      "Check that no test/debug settings are left enabled."
    ]
  },
  {
    title: "6. Backup & Recovery",
    tasks: [
      "Configure UpdraftPlus backup.",
      "Configure scheduled backups.",
      "Confirm backup files are being stored correctly.",
      "Configure All-in-One WP Migration backup/export to Backblaze B2.",
      "Confirm the backup is actually reaching B2.",
      "Test at least one backup restore/recovery process.",
      "Make sure backup credentials are secure."
    ]
  },
  {
    title: "7. Security & Monitoring",
    tasks: [
      "Add the website to Netumo monitoring.",
      "Confirm uptime monitoring is active.",
      "Install and configure VirusDie.",
      "Confirm malware/security scanning is active.",
      "Check SSL monitoring.",
      "Check website security after migration/go-live.",
      "Confirm there are no exposed test files, debug files, or development URLs."
    ]
  },
  {
    title: "8. WooCommerce & Payments",
    tasks: [
      "Check WooCommerce settings.",
      "Check store/business details.",
      "Check \"From\" email settings in WooCommerce.",
      "Check payment gateway configuration.",
      "Test the payment gateway using an actual payment.",
      "Confirm successful payment is recorded correctly.",
      "Confirm the customer receives the correct order/payment email.",
      "Confirm the website/admin receives the correct notification.",
      "Check failed and cancelled payment behaviour.",
      "Refund the test payment if required.",
      "Check cart, checkout, order confirmation, and account pages."
    ]
  },
  {
    title: "9. Email Configuration",
    tasks: [
      "Check website SMTP/email configuration.",
      "Confirm emails are sent from the correct domain/email address.",
      "Test contact form emails.",
      "Test WooCommerce emails, if applicable.",
      "Check that emails are not going to spam.",
      "Check SPF, DKIM, and DMARC records where applicable."
    ]
  },
  {
    title: "10. 404 & Error Handling",
    tasks: [
      "Add and test a custom 404 page.",
      "Check the 404 page works on desktop and mobile.",
      "Add a clear link back to the homepage.",
      "Check broken/old URLs are handled properly.",
      "Confirm important old URLs have 301 redirects when required."
    ]
  },
  {
    title: "11. Mobile & Browser Testing",
    tasks: [
      "Test the complete website on desktop.",
      "Test the complete website on mobile.",
      "Test on different screen sizes.",
      "Check header and navigation.",
      "Check menus and dropdowns.",
      "Check forms.",
      "Check buttons and links.",
      "Check images and videos.",
      "Check pop-ups, sliders, and carousels.",
      "Check text spacing, alignment, and overflow.",
      "Check website on major browsers."
    ]
  },
  {
    title: "12. Performance",
    tasks: [
      "Check website loading speed.",
      "Compress/optimize large images.",
      "Check for unnecessary plugins/scripts.",
      "Check caching and performance settings.",
      "Check Core Web Vitals where applicable.",
      "Make sure the website does not have obvious console errors."
    ]
  },
  {
    title: "13. Final Website Information Check",
    tasks: [
      "Check school/company name everywhere.",
      "Check logo and favicon.",
      "Check email address.",
      "Check phone number.",
      "Check address/location.",
      "Check working hours, if applicable.",
      "Check social media links.",
      "Check WhatsApp link, if applicable.",
      "Check Google Maps/location link, if applicable.",
      "Check all CTA links.",
      "Check all external links open correctly.",
      "Check branding, colours, fonts, and images are consistent."
    ]
  },
  {
    title: "14. Go-Live Settings",
    tasks: [
      "Remove maintenance/coming-soon mode.",
      "Remove temporary/test content.",
      "Remove staging/development references.",
      "Confirm the live domain is being used everywhere.",
      "Check website date/time and timezone settings before making the website live.",
      "Confirm WordPress timezone is correct.",
      "Confirm server/PHP timezone is correct where required.",
      "Clear website/cache/CDN cache.",
      "Confirm DNS is pointing to the correct server.",
      "Check SSL after DNS changes.",
      "Check the website from a fresh/incognito browser."
    ]
  },
  {
    title: "15. Final QA Before Handover",
    tasks: [
      "Browse the entire website page by page.",
      "Click every important button and CTA.",
      "Test every form.",
      "Test every important link.",
      "Test navigation and footer.",
      "Check mobile layout again.",
      "Check redirects again.",
      "Check analytics and Google Tag Manager.",
      "Check backups.",
      "Check monitoring.",
      "Check security/malware scanning.",
      "Check payment gateway, if applicable.",
      "Check no sample/test content remains.",
      "Check no obvious spelling or content errors remain.",
      "Take a final backup before handover.",
      "Record admin/login details securely.",
      "Confirm the website is fully live and working."
    ]
  }
];

// --- HELPER FUNCTIONS ---
const generateId = () => Math.random().toString(36).substr(2, 9);

const calculateProjectMetrics = (checklist) => {
  let total = 0;
  let completed = 0;
  checklist.forEach(section => {
    total += section.tasks.length;
    completed += section.tasks.filter(t => t.isCompleted).length;
  });
  
  let status = 'Not Started';
  if (completed > 0 && completed < total) status = 'In Progress';
  if (completed > 0 && completed === total) status = 'Ready to Go Live';

  return { total, completed, progress: total === 0 ? 0 : Math.round((completed / total) * 100), status };
};

const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
};

// --- MAIN COMPONENT ---
export default function App() {
  const [projects, setProjects] = useState([]);
  const [currentView, setCurrentView] = useState('dashboard'); // 'dashboard' | 'project'
  const [activeProjectId, setActiveProjectId] = useState(null);
  
  // Modals
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [confirmTaskModal, setConfirmTaskModal] = useState(null); // { task, sectionId }
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Derived State
  const activeProject = useMemo(() => 
    projects.find(p => p.id === activeProjectId), [projects, activeProjectId]
  );

  const filteredProjects = useMemo(() => {
    return projects.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            p.url.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            p.clientName?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'All' || p.status === statusFilter;
      return matchesSearch && matchesStatus && p.status !== 'Archived';
    });
  }, [projects, searchQuery, statusFilter]);

  const dashboardStats = useMemo(() => {
    const unarchived = projects.filter(p => p.status !== 'Archived');
    return {
      total: unarchived.length,
      inProgress: unarchived.filter(p => p.status === 'In Progress').length,
      ready: unarchived.filter(p => p.status === 'Ready to Go Live').length,
      completed: unarchived.filter(p => p.status === 'Completed').length,
    };
  }, [projects]);

  // Actions
  const handleCreateProject = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newChecklist = DEFAULT_CHECKLIST.map((sec, sIdx) => ({
      id: `sec-${sIdx}`,
      title: sec.title,
      tasks: sec.tasks.map((task, tIdx) => ({
        id: `task-${sIdx}-${tIdx}`,
        text: task,
        isCompleted: false
      }))
    }));

    const newProject = {
      id: generateId(),
      name: formData.get('name'),
      url: formData.get('url'),
      clientName: formData.get('clientName'),
      type: formData.get('type'),
      createdAt: new Date().toISOString(),
      status: 'Not Started',
      checklist: newChecklist
    };

    setProjects([newProject, ...projects]);
    setShowCreateModal(false);
    setActiveProjectId(newProject.id);
    setCurrentView('project');
  };

  const handleTaskAction = (sectionId, task) => {
    if (task.isCompleted) {
      // Require confirmation to uncheck
      setConfirmTaskModal({ 
        task, 
        sectionId, 
        title: "Uncheck Task?", 
        question: "Are you sure you want to mark this task as incomplete?",
        actionText: "Yes, Mark Incomplete",
        isUnchecking: true
      });
    } else {
      setConfirmTaskModal({ 
        task, 
        sectionId, 
        title: "Complete Task?", 
        question: "Have you completed this task?",
        actionText: "Yes, Mark as Done",
        isUnchecking: false
      });
    }
  };

  const confirmTaskToggle = () => {
    if (!confirmTaskModal || !activeProject) return;

    const { task, sectionId, isUnchecking } = confirmTaskModal;
    
    setProjects(prevProjects => prevProjects.map(proj => {
      if (proj.id !== activeProject.id) return proj;

      const newChecklist = proj.checklist.map(sec => {
        if (sec.id !== sectionId) return sec;
        return {
          ...sec,
          tasks: sec.tasks.map(t => t.id === task.id ? { ...t, isCompleted: !isUnchecking } : t)
        };
      });

      const metrics = calculateProjectMetrics(newChecklist);

      return {
        ...proj,
        checklist: newChecklist,
        status: proj.status === 'Completed' && !isUnchecking ? 'Completed' : metrics.status,
        updatedAt: new Date().toISOString()
      };
    }));

    setConfirmTaskModal(null);
  };

  const markProjectComplete = () => {
    setProjects(prev => prev.map(p => 
      p.id === activeProject.id ? { ...p, status: 'Completed', completedDate: new Date().toISOString() } : p
    ));
    setCurrentView('dashboard');
  };

  const archiveProject = () => {
    if (window.confirm("Are you sure you want to archive this project?")) {
      setProjects(prev => prev.map(p => 
        p.id === activeProject.id ? { ...p, status: 'Archived' } : p
      ));
      setSettingsModalOpen(false);
      setCurrentView('dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-green-100 selection:text-green-900">
      
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => setCurrentView('dashboard')}
          >
            <img 
              src="https://inklik.com/wp-content/uploads/2021/03/inklik_logo-1.png" 
              alt="INKLIK Logo" 
              className="h-8 object-contain transition-transform group-hover:scale-105"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
            <div className="h-6 w-px bg-gray-300 hidden sm:block"></div>
            <h1 className="text-lg font-bold text-gray-800 tracking-tight hidden sm:block">
              Go-Live Checklist
            </h1>
          </div>
          
          {currentView === 'dashboard' && (
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setShowCreateModal(true)}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2 transition-colors shadow-sm"
              >
                <Plus size={18} />
                <span className="hidden sm:inline">Create Project</span>
              </button>
            </div>
          )}
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* DASHBOARD VIEW */}
        {currentView === 'dashboard' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatCard title="Total Projects" value={dashboardStats.total} icon={<LayoutDashboard size={20} className="text-blue-500" />} />
              <StatCard title="In Progress" value={dashboardStats.inProgress} icon={<Circle size={20} className="text-amber-500" />} />
              <StatCard title="Ready to Go Live" value={dashboardStats.ready} icon={<CheckSquare size={20} className="text-green-500" />} />
              <StatCard title="Completed" value={dashboardStats.completed} icon={<CheckCircle2 size={20} className="text-purple-500" />} />
            </div>

            {/* Controls */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
              <div className="relative w-full sm:w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Search projects, domains, clients..." 
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <select 
                className="w-full sm:w-auto px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-green-500 transition-all text-gray-700 font-medium"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All Statuses</option>
                <option value="Not Started">Not Started</option>
                <option value="In Progress">In Progress</option>
                <option value="Ready to Go Live">Ready to Go Live</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            {/* Project List */}
            {filteredProjects.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-xl border border-gray-200 border-dashed">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <LayoutDashboard className="text-gray-400" size={28} />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">No projects found</h3>
                <p className="text-gray-500 mt-1 max-w-sm mx-auto">
                  {searchQuery ? "Try adjusting your search or filters." : "Create your first website project to get started with the go-live checklist."}
                </p>
                {!searchQuery && (
                   <button 
                   onClick={() => setShowCreateModal(true)}
                   className="mt-6 text-green-600 font-medium hover:text-green-700"
                 >
                   + Create a New Project
                 </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map(project => {
                  const metrics = calculateProjectMetrics(project.checklist);
                  return (
                    <div key={project.id} className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-bold text-gray-900 text-lg truncate pr-2">{project.name}</h3>
                          <a href={project.url.startsWith('http') ? project.url : `https://${project.url}`} target="_blank" rel="noreferrer" className="text-sm text-green-600 hover:underline truncate block">
                            {project.url}
                          </a>
                        </div>
                        <StatusBadge status={project.status} />
                      </div>
                      
                      <div className="mt-auto pt-6">
                        <div className="flex justify-between text-sm text-gray-600 mb-2 font-medium">
                          <span>Progress: {metrics.progress}%</span>
                          <span>{metrics.completed} / {metrics.total} Tasks</span>
                        </div>
                        <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden mb-6">
                          <div 
                            className={`h-full rounded-full transition-all duration-500 ${metrics.progress === 100 ? 'bg-green-500' : 'bg-gray-800'}`} 
                            style={{ width: `${metrics.progress}%` }}
                          ></div>
                        </div>
                        
                        <button 
                          onClick={() => {
                            setActiveProjectId(project.id);
                            setCurrentView('project');
                          }}
                          className="w-full py-2.5 bg-gray-50 hover:bg-gray-100 text-gray-800 border border-gray-200 rounded-lg font-medium text-sm transition-colors"
                        >
                          Open Checklist
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* PROJECT VIEW */}
        {currentView === 'project' && activeProject && (
          <div className="max-w-4xl mx-auto space-y-6 animate-in slide-in-from-right-4 duration-300">
            
            {/* Top Controls */}
            <div className="flex items-center justify-between">
              <button 
                onClick={() => setCurrentView('dashboard')}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium transition-colors"
              >
                <ArrowLeft size={18} />
                Back to Projects
              </button>
              
              <button 
                onClick={() => setSettingsModalOpen(true)}
                className="flex items-center gap-2 text-gray-500 hover:text-gray-800 p-2 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <Settings size={18} />
                <span className="hidden sm:inline text-sm font-medium">Settings</span>
              </button>
            </div>

            {/* Project Header Card */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8 shadow-sm relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">{activeProject.name}</h1>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <a href={activeProject.url.startsWith('http') ? activeProject.url : `https://${activeProject.url}`} target="_blank" rel="noreferrer" className="hover:text-green-600 transition-colors">
                        {activeProject.url}
                      </a>
                      {activeProject.clientName && (
                        <>
                          <span>•</span>
                          <span>{activeProject.clientName}</span>
                        </>
                      )}
                    </div>
                  </div>
                  <StatusBadge status={activeProject.status} />
                </div>

                {(() => {
                  const metrics = calculateProjectMetrics(activeProject.checklist);
                  return (
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                      <div className="flex justify-between items-end mb-2">
                        <div>
                          <p className="text-sm text-gray-500 font-medium mb-1">Overall Progress</p>
                          <p className="text-2xl font-bold text-gray-800">{metrics.progress}%</p>
                        </div>
                        <p className="text-sm font-medium text-gray-600 mb-1">
                          {metrics.completed} of {metrics.total} tasks completed
                        </p>
                      </div>
                      <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-700 ease-out ${metrics.progress === 100 ? 'bg-green-500' : 'bg-gray-800'}`} 
                          style={{ width: `${metrics.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })()}
              </div>
              
              {/* Background Decoration */}
              <div className="absolute top-0 right-0 -mt-16 -mr-16 text-gray-50 opacity-50 pointer-events-none">
                <LayoutDashboard size={250} />
              </div>
            </div>

            {/* Success Banner */}
            {activeProject.status === 'Ready to Go Live' && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-6 animate-in zoom-in-95 duration-500 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center shrink-0">
                    <CheckCircle2 size={28} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-green-900">WEBSITE IS GOOD TO GO</h3>
                    <p className="text-green-800 text-sm mt-1">All go-live checklist items have been completed.</p>
                  </div>
                </div>
                <button 
                  onClick={markProjectComplete}
                  className="w-full sm:w-auto px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg shadow-sm transition-all whitespace-nowrap"
                >
                  Mark Project Complete
                </button>
              </div>
            )}

            {/* Checklist Sections */}
            <div className="space-y-4 pb-20">
              {activeProject.checklist.map((section, sIdx) => {
                const sectionCompleted = section.tasks.filter(t => t.isCompleted).length;
                const sectionTotal = section.tasks.length;
                const isAllDone = sectionCompleted === sectionTotal;

                return (
                  <ChecklistSection 
                    key={section.id} 
                    section={section} 
                    completedCount={sectionCompleted}
                    totalCount={sectionTotal}
                    isAllDone={isAllDone}
                    defaultOpen={sIdx === 0 || (!isAllDone && sIdx < 3)} // Auto open first few incomplete
                    onTaskClick={(task) => handleTaskAction(section.id, task)}
                  />
                );
              })}
            </div>
          </div>
        )}
      </main>

      {/* CREATE PROJECT MODAL */}
      {showCreateModal && (
        <Modal onClose={() => setShowCreateModal(false)} title="Create New Project">
          <form onSubmit={handleCreateProject} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Website Name *</label>
              <input required name="name" type="text" placeholder="e.g., INKLIK Corporate Site" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Website URL *</label>
              <input required name="url" type="text" placeholder="e.g., inklik.com" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Client Name (Optional)</label>
              <input name="clientName" type="text" placeholder="e.g., Acme Corp" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Project Type</label>
              <select name="type" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none bg-white">
                <option value="New Website">New Website</option>
                <option value="Website Revamp">Website Revamp</option>
                <option value="Website Migration">Website Migration</option>
                <option value="Existing Website Update">Existing Website Update</option>
              </select>
            </div>
            <div className="pt-4 flex gap-3 justify-end">
              <button type="button" onClick={() => setShowCreateModal(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium transition-colors">
                Cancel
              </button>
              <button type="submit" className="px-6 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-lg font-medium transition-colors">
                Create Project
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* CONFIRM TASK MODAL */}
      {confirmTaskModal && (
        <Modal onClose={() => setConfirmTaskModal(null)} title={confirmTaskModal.title}>
          <div className="py-4">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6 relative pl-12">
              <div className="absolute left-4 top-4 text-gray-400">
                <CheckSquare size={20} />
              </div>
              <p className="text-gray-800 font-medium text-lg leading-snug">
                "{confirmTaskModal.task.text}"
              </p>
            </div>
            <p className="text-gray-600 text-center text-lg mb-6">{confirmTaskModal.question}</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button 
                onClick={() => setConfirmTaskModal(null)} 
                className="flex-1 px-4 py-3 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg font-medium transition-colors"
              >
                No, Go Back
              </button>
              <button 
                onClick={confirmTaskToggle} 
                className={`flex-1 px-4 py-3 text-white rounded-lg font-medium transition-colors ${confirmTaskModal.isUnchecking ? 'bg-amber-600 hover:bg-amber-700' : 'bg-green-600 hover:bg-green-700'}`}
              >
                {confirmTaskModal.actionText}
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* PROJECT SETTINGS MODAL */}
      {settingsModalOpen && activeProject && (
        <Modal onClose={() => setSettingsModalOpen(false)} title="Project Settings">
          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <p className="text-sm text-gray-500 mb-1">Created Date</p>
              <p className="font-medium text-gray-900">{formatDate(activeProject.createdAt)}</p>
            </div>
            
            <div className="pt-4 border-t border-gray-200">
              <h4 className="text-sm font-bold text-red-600 flex items-center gap-2 mb-2 uppercase tracking-wider">
                <AlertCircle size={16} /> Danger Zone
              </h4>
              <p className="text-sm text-gray-600 mb-4">
                Archiving a project hides it from the main dashboard. You cannot easily restore it from the UI in this version.
              </p>
              <button 
                onClick={archiveProject}
                className="w-full flex justify-center items-center gap-2 px-4 py-3 bg-white border border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 rounded-lg font-medium transition-colors"
              >
                <Archive size={18} />
                Archive Project
              </button>
            </div>
            
            <div className="pt-4 flex justify-end">
              <button onClick={() => setSettingsModalOpen(false)} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg font-medium transition-colors">
                Close Settings
              </button>
            </div>
          </div>
        </Modal>
      )}

    </div>
  );
}

// --- SUB-COMPONENTS ---

function StatCard({ title, value, icon }) {
  return (
    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between">
      <div className="flex justify-between items-start mb-2">
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <div className="p-1.5 bg-gray-50 rounded-md">
          {icon}
        </div>
      </div>
      <p className="text-3xl font-bold text-gray-900">{value}</p>
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    'Not Started': 'bg-gray-100 text-gray-700 border-gray-200',
    'In Progress': 'bg-blue-100 text-blue-800 border-blue-200',
    'Ready to Go Live': 'bg-green-100 text-green-800 border-green-200',
    'Completed': 'bg-purple-100 text-purple-800 border-purple-200',
    'Archived': 'bg-red-100 text-red-800 border-red-200',
  };
  
  return (
    <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${styles[status] || styles['Not Started']}`}>
      {status}
    </span>
  );
}

function ChecklistSection({ section, completedCount, totalCount, isAllDone, defaultOpen, onTaskClick }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm transition-all duration-300">
      <div 
        className={`px-6 py-4 flex items-center justify-between cursor-pointer select-none transition-colors ${isAllDone ? 'bg-gray-50/50' : 'hover:bg-gray-50'}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-3">
          <div className="text-gray-400">
            {isOpen ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
          </div>
          <h2 className={`text-lg font-bold ${isAllDone ? 'text-gray-600' : 'text-gray-900'}`}>
            {section.title}
          </h2>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2">
            <span className={`text-sm font-medium ${isAllDone ? 'text-green-600' : 'text-gray-500'}`}>
              {isAllDone ? 'COMPLETED' : `${completedCount} / ${totalCount} completed`}
            </span>
            {isAllDone && <CheckCircle2 size={16} className="text-green-500" />}
          </div>
          {/* Mobile progress indicator */}
          <div className="sm:hidden text-sm font-medium text-gray-500">
             {completedCount}/{totalCount}
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="border-t border-gray-100 px-2 py-2 sm:px-6 sm:py-4 bg-white animate-in slide-in-from-top-2 duration-200">
          <div className="space-y-1">
            {section.tasks.map(task => (
              <div 
                key={task.id}
                onClick={() => onTaskClick(task)}
                className={`group flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-all border border-transparent ${
                  task.isCompleted 
                    ? 'hover:bg-gray-50 hover:border-gray-200' 
                    : 'hover:bg-gray-50 hover:border-gray-200 hover:shadow-sm'
                }`}
              >
                <div className={`mt-0.5 shrink-0 transition-colors ${task.isCompleted ? 'text-green-500' : 'text-gray-300 group-hover:text-gray-400'}`}>
                  {task.isCompleted ? <CheckSquare size={22} className="fill-green-50" /> : <Circle size={22} />}
                </div>
                
                <div className="flex-1 pr-4">
                  <p className={`text-[15px] leading-snug transition-all duration-300 ${
                    task.isCompleted ? 'text-gray-400 line-through' : 'text-gray-800'
                  }`}>
                    {task.text}
                  </p>
                </div>

                {task.isCompleted && (
                  <div className="shrink-0 animate-in fade-in zoom-in duration-300 hidden sm:block">
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded flex items-center gap-1 border border-green-200">
                      DONE
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function Modal({ children, onClose, title }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-gray-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-5 border-b border-gray-100">
          <h3 className="text-xl font-bold text-gray-900">{title}</h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-1.5 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-5 sm:p-6">
          {children}
        </div>
      </div>
    </div>
  );
}