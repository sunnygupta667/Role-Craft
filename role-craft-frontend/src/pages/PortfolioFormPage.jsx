import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Save, Plus, Trash2, X, FileText, 
  UploadCloud, CheckCircle2, AlertCircle, ChevronDown, 
  ChevronUp, Layout, Briefcase, GraduationCap, Award, 
  User, Settings, Share2, Code2, Calendar, MapPin, Star
} from 'lucide-react';
import { portfolioAPI, uploadAPI } from '../services/api';
import Loading from '../components/Loading';

/* --- 1. TOAST NOTIFICATION COMPONENT --- */
const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.9 }}
      className={`fixed top-6 right-6 z-[100] flex items-center gap-3 px-5 py-3 rounded-xl shadow-2xl backdrop-blur-md border ${
        type === 'success' 
          ? 'bg-emerald-50/90 dark:bg-emerald-900/90 border-emerald-200 dark:border-emerald-700 text-emerald-800 dark:text-emerald-100' 
          : 'bg-red-50/90 dark:bg-red-900/90 border-red-200 dark:border-red-700 text-red-800 dark:text-red-100'
      }`}
    >
      {type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
      <span className="font-medium text-sm">{message}</span>
    </motion.div>
  );
};

/* --- 2. UI COMPONENTS --- */
const FormSection = ({ title, icon: Icon, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
    >
      <button 
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 bg-zinc-50/50 dark:bg-zinc-800/30 border-b border-zinc-100 dark:border-zinc-800/50 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg">
            <Icon size={20} />
          </div>
          <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">{title}</h2>
        </div>
        {isOpen ? <ChevronUp size={20} className="text-zinc-400" /> : <ChevronDown size={20} className="text-zinc-400" />}
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="p-6 space-y-6">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const InputGroup = ({ label, children, className = "" }) => (
  <div className={`space-y-2 ${className}`}>
    <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider ml-1">
      {label}
    </label>
    {children}
  </div>
);

const StyledInput = (props) => (
  <input 
    {...props}
    className={`w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none transition-all text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 disabled:opacity-50 disabled:cursor-not-allowed ${props.className || ''}`}
  />
);

const StyledTextArea = (props) => (
  <textarea 
    {...props}
    className={`w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none transition-all text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 resize-y min-h-[100px] ${props.className || ''}`}
  />
);

const ToggleSwitch = ({ label, checked, onChange }) => (
  <label className="relative inline-flex items-center cursor-pointer group">
    <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="sr-only peer" />
    <div className="w-11 h-6 bg-zinc-200 peer-focus:outline-none rounded-full peer dark:bg-zinc-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
    <span className="ml-3 text-sm font-medium text-zinc-700 dark:text-zinc-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{label}</span>
  </label>
);

/* --- 3. MAIN FORM PAGE --- */
const PortfolioFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;
  
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [toast, setToast] = useState(null);
  
  // Initial State based on Mongoose Schema
  const [formData, setFormData] = useState({
    slug: '',
    jobRole: '',
    theme: 'dark',
    isEnabled: true,
    hero: { name: '', title: '', subtitle: '', description: '', profileImage: '', ctaText: 'Get In Touch', ctaLink: '#contact' },
    skills: [], 
    projects: [],
    experience: [],
    education: [],
    certificates: [], 
    contact: {
      email: '', phone: '',
      address: { street: '', city: '', state: '', country: '', zipCode: '' },
      social: { linkedin: '', github: '', twitter: '', website: '' }
    },
    resume: { url: '', filename: '' }
  });

  useEffect(() => {
    if (isEdit) fetchPortfolio();
  }, [id]);

  const fetchPortfolio = async () => {
    try {
      setLoading(true);
      const response = await portfolioAPI.getById(id);
      const data = response.data.data;

      // Ensure dates are formatted for input[type="date"] (YYYY-MM-DD)
      const formatDate = (dateString) => dateString ? new Date(dateString).toISOString().split('T')[0] : '';

      // Merge and Format Data
      setFormData(prev => ({
        ...prev,
        ...data,
        hero: { ...prev.hero, ...data.hero },
        contact: { 
          ...prev.contact, 
          ...data.contact,
          address: { ...prev.contact.address, ...(data.contact?.address || {}) }
        },
        experience: data.experience?.map(exp => ({
          ...exp,
          startDate: formatDate(exp.startDate),
          endDate: formatDate(exp.endDate)
        })) || [],
        education: data.education?.map(edu => ({
          ...edu,
          startDate: formatDate(edu.startDate),
          endDate: formatDate(edu.endDate)
        })) || [],
        certificates: data.certificates || [],
        resume: data.resume || { url: '', filename: '' }
      }));
    } catch (error) {
      setToast({ message: 'Failed to load portfolio', type: 'error' });
      navigate('/admin/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (section, field, value, index = null, subField = null) => {
    setFormData(prev => {
      const newData = { ...prev };
      if (section === 'root') newData[field] = value;
      else if (index !== null) {
        if (subField) newData[section][index][field][subField] = value;
        else newData[section][index][field] = value;
      } else if (subField) newData[section][field][subField] = value;
      else newData[section][field] = value;
      return newData;
    });
  };

  // --- HANDLERS FOR DYNAMIC ARRAYS ---
  const addSkillCategory = () => setFormData(prev => ({ ...prev, skills: [...prev.skills, { category: '', items: [] }] }));
  const removeSkillCategory = (index) => setFormData(prev => ({ ...prev, skills: prev.skills.filter((_, i) => i !== index) }));
  const updateSkillCategory = (index, value) => {
    const newSkills = [...formData.skills];
    newSkills[index].category = value;
    setFormData(prev => ({ ...prev, skills: newSkills }));
  };
  const addSkillItem = (categoryIndex) => {
    const newSkills = [...formData.skills];
    newSkills[categoryIndex].items.push({ name: '', level: 80 }); 
    setFormData(prev => ({ ...prev, skills: newSkills }));
  };
  const removeSkillItem = (categoryIndex, itemIndex) => {
    const newSkills = [...formData.skills];
    newSkills[categoryIndex].items = newSkills[categoryIndex].items.filter((_, i) => i !== itemIndex);
    setFormData(prev => ({ ...prev, skills: newSkills }));
  };
  const updateSkillItem = (categoryIndex, itemIndex, field, value) => {
    const newSkills = [...formData.skills];
    newSkills[categoryIndex].items[itemIndex][field] = value;
    setFormData(prev => ({ ...prev, skills: newSkills }));
  };

  const addArrayItem = (section, template) => setFormData(prev => ({ ...prev, [section]: [...(prev[section] || []), template] }));
  const removeArrayItem = (section, index) => setFormData(prev => ({ ...prev, [section]: prev[section].filter((_, i) => i !== index) }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const submissionData = { ...formData };
      
      // Clean Data
      submissionData.projects = submissionData.projects.map(p => ({
        ...p,
        technologies: Array.isArray(p.technologies) ? p.technologies : p.technologies.split(',').map(t => t.trim())
      }));
      submissionData.experience = submissionData.experience.map(exp => ({
        ...exp,
        responsibilities: Array.isArray(exp.responsibilities) ? exp.responsibilities : exp.responsibilities.split('\n').filter(line => line.trim() !== '')
      }));

      if (isEdit) {
        await portfolioAPI.update(id, submissionData);
        setToast({ message: 'Portfolio updated successfully!', type: 'success' });
      } else {
        await portfolioAPI.create(submissionData);
        setToast({ message: 'Portfolio created successfully!', type: 'success' });
      }
      setTimeout(() => navigate('/admin/dashboard'), 1500);
    } catch (error) {
      setToast({ message: error.response?.data?.message || 'Save failed', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e, type) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!isEdit) {
      setToast({ message: 'Please save portfolio first', type: 'error' });
      return;
    }

    try {
      setUploading(true);
      if (type === 'resume') {
        await uploadAPI.uploadResume(id, file);
        await fetchPortfolio();
        setToast({ message: 'Resume uploaded!', type: 'success' });
      } else if (type === 'image') {
        const response = await uploadAPI.uploadImage(id, file);
        if (response.data.data.url) {
          setFormData(prev => ({ ...prev, hero: { ...prev.hero, profileImage: response.data.data.url } }));
        }
        setToast({ message: 'Image uploaded!', type: 'success' });
      }
    } catch (error) {
      setToast({ message: 'Upload failed', type: 'error' });
    } finally {
      setUploading(false);
      e.target.value = null; 
    }
  };

  if (loading && isEdit && !uploading) return <Loading text="Loading Editor..." />;

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 pb-32 font-sans transition-colors duration-300">
      <AnimatePresence>
        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      </AnimatePresence>

      {/* --- STICKY HEADER --- */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-lg border-b border-zinc-200 dark:border-zinc-800">
        <div className="container-custom py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/admin/dashboard')} className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors text-zinc-500">
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-xl font-bold text-zinc-900 dark:text-white">
                {isEdit ? 'Edit Portfolio' : 'New Portfolio'}
              </h1>
              <p className="text-xs text-zinc-500 hidden sm:block">
                {isEdit ? `Editing: ${formData.slug}` : 'Create a new digital presence'}
              </p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSubmit}
            disabled={loading || uploading}
            className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium shadow-lg shadow-indigo-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save size={18} />}
            <span className="hidden sm:inline">Save Changes</span>
          </motion.button>
        </div>
      </header>

      {/* --- MAIN FORM --- */}
      <main className="container-custom max-w-5xl py-8 space-y-8">
        
        {/* SECTION 1: GLOBAL SETTINGS */}
        <FormSection title="Configuration" icon={Settings} defaultOpen={true}>
          <div className="grid md:grid-cols-2 gap-6">
            <InputGroup label="Job Role">
              <StyledInput value={formData.jobRole} onChange={(e) => handleChange('root', 'jobRole', e.target.value)} placeholder="Full Stack Developer" />
            </InputGroup>
            <InputGroup label="URL Slug">
              <StyledInput value={formData.slug} onChange={(e) => handleChange('root', 'slug', e.target.value.toLowerCase().replace(/\s+/g, '-'))} placeholder="john-doe-portfolio" />
            </InputGroup>
            <InputGroup label="Theme">
              <select value={formData.theme} onChange={(e) => handleChange('root', 'theme', e.target.value)} className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:ring-2 focus:ring-indigo-500/50 outline-none text-zinc-900 dark:text-zinc-100">
                <option value="dark">🌑 Dark Mode</option>
                <option value="light">☀️ Light Mode</option>
              </select>
            </InputGroup>
            <div className="pt-6">
              <ToggleSwitch label="Portfolio Active" checked={formData.isEnabled} onChange={(val) => handleChange('root', 'isEnabled', val)} />
            </div>
          </div>
        </FormSection>

        {/* SECTION 2: HERO */}
        <FormSection title="Hero Section" icon={User}>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <InputGroup label="Full Name"><StyledInput value={formData.hero.name} onChange={(e) => handleChange('hero', 'name', e.target.value)} /></InputGroup>
                <InputGroup label="Job Title"><StyledInput value={formData.hero.title} onChange={(e) => handleChange('hero', 'title', e.target.value)} /></InputGroup>
              </div>
              <InputGroup label="Subtitle"><StyledInput value={formData.hero.subtitle} onChange={(e) => handleChange('hero', 'subtitle', e.target.value)} /></InputGroup>
              <InputGroup label="Description"><StyledTextArea value={formData.hero.description} onChange={(e) => handleChange('hero', 'description', e.target.value)} /></InputGroup>
              <div className="grid md:grid-cols-2 gap-6">
                <InputGroup label="CTA Text"><StyledInput value={formData.hero.ctaText} onChange={(e) => handleChange('hero', 'ctaText', e.target.value)} /></InputGroup>
                <InputGroup label="CTA Link"><StyledInput value={formData.hero.ctaLink} onChange={(e) => handleChange('hero', 'ctaLink', e.target.value)} /></InputGroup>
              </div>
            </div>
            
            {/* Image Upload */}
            {isEdit && (
              <div className="w-full md:w-1/3 flex flex-col items-center">
                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2 self-start">Profile Image</label>
                <div className="relative group w-full aspect-square bg-zinc-100 dark:bg-zinc-800 rounded-3xl border-2 border-dashed border-zinc-300 dark:border-zinc-700 flex flex-col items-center justify-center overflow-hidden hover:border-indigo-500 transition-colors">
                  {formData.hero.profileImage ? (
                    <img src={formData.hero.profileImage} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <User size={48} className="text-zinc-300 dark:text-zinc-600" />
                  )}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white cursor-pointer">
                    <UploadCloud className="mb-2" /> <span className="text-xs font-bold">Update Image</span>
                  </div>
                  <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, 'image')} className="absolute inset-0 opacity-0 cursor-pointer" />
                </div>
              </div>
            )}
          </div>
        </FormSection>

        {/* SECTION 3: SKILLS */}
        <FormSection title="Skills" icon={Code2}>
          <div className="space-y-6">
            {formData.skills.map((cat, idx) => (
              <div key={idx} className="bg-zinc-50 dark:bg-zinc-800/50 p-5 rounded-xl border border-zinc-200 dark:border-zinc-700">
                <div className="flex justify-between items-center mb-4">
                  <input type="text" value={cat.category} onChange={(e) => updateSkillCategory(idx, e.target.value)} placeholder="Category Name" className="bg-transparent text-lg font-bold text-indigo-600 dark:text-indigo-400 outline-none w-full" />
                  <button onClick={() => removeSkillCategory(idx)} className="text-zinc-400 hover:text-red-500"><Trash2 size={18} /></button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {cat.items.map((item, itemIdx) => (
                    <div key={itemIdx} className="bg-white dark:bg-zinc-900 p-3 rounded-lg border border-zinc-200 dark:border-zinc-700 relative group">
                      <input className="w-full bg-transparent text-sm font-medium outline-none mb-1 text-zinc-900 dark:text-zinc-200" value={item.name} onChange={(e) => updateSkillItem(idx, itemIdx, 'name', e.target.value)} placeholder="Skill" />
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 flex-1 bg-zinc-100 dark:bg-zinc-700 rounded-full overflow-hidden"><div className="h-full bg-indigo-500" style={{ width: `${item.level}%` }}></div></div>
                        <input type="number" value={item.level} onChange={(e) => updateSkillItem(idx, itemIdx, 'level', e.target.value)} className="w-8 text-xs bg-transparent text-right outline-none text-zinc-500" />
                      </div>
                      <button onClick={() => removeSkillItem(idx, itemIdx)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"><X size={12} /></button>
                    </div>
                  ))}
                  <button onClick={() => addSkillItem(idx)} className="flex flex-col items-center justify-center p-3 rounded-lg border border-dashed border-zinc-300 dark:border-zinc-600 hover:border-indigo-500 text-zinc-400 hover:text-indigo-500 transition-all text-sm font-medium"><Plus size={16} /> Add</button>
                </div>
              </div>
            ))}
            <button onClick={addSkillCategory} className="w-full py-3 border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-xl text-zinc-500 hover:text-indigo-500 font-bold transition-all flex items-center justify-center gap-2"><Plus size={20} /> Add Category</button>
          </div>
        </FormSection>

        {/* SECTION 4: PROJECTS (Updated with new fields) */}
        <FormSection title="Projects" icon={Layout}>
          <div className="space-y-6">
            <AnimatePresence>
              {formData.projects.map((project, index) => (
                <motion.div key={index} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="bg-white dark:bg-zinc-900 p-6 rounded-xl border border-zinc-200 dark:border-zinc-700 shadow-sm relative group">
                  <button onClick={() => removeArrayItem('projects', index)} className="absolute top-4 right-4 text-zinc-400 hover:text-red-500"><Trash2 size={18} /></button>
                  <div className="grid md:grid-cols-12 gap-6">
                    <div className="md:col-span-8 space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <InputGroup label="Title"><StyledInput value={project.title} onChange={(e) => handleChange('projects', 'title', e.target.value, index)} /></InputGroup>
                        <InputGroup label="Tech Stack"><StyledInput value={project.technologies} onChange={(e) => handleChange('projects', 'technologies', e.target.value, index)} placeholder="React, Node..." /></InputGroup>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <InputGroup label="Live URL"><StyledInput value={project.liveUrl} onChange={(e) => handleChange('projects', 'liveUrl', e.target.value, index)} /></InputGroup>
                        <InputGroup label="GitHub URL"><StyledInput value={project.githubUrl} onChange={(e) => handleChange('projects', 'githubUrl', e.target.value, index)} /></InputGroup>
                      </div>
                      <InputGroup label="Description"><StyledTextArea value={project.description} onChange={(e) => handleChange('projects', 'description', e.target.value, index)} rows="2" /></InputGroup>
                      <div className="flex gap-6 pt-2">
                        <ToggleSwitch label="Featured Project" checked={project.featured} onChange={(val) => handleChange('projects', 'featured', val, index)} />
                        <div className="flex items-center gap-2">
                          <label className="text-xs font-bold text-zinc-500 uppercase">Sort Order:</label>
                          <input type="number" value={project.order} onChange={(e) => handleChange('projects', 'order', e.target.value, index)} className="w-16 px-2 py-1 bg-zinc-50 dark:bg-zinc-800 border rounded-md" />
                        </div>
                      </div>
                    </div>
                    <div className="md:col-span-4">
                      <InputGroup label="Image URL">
                        <StyledInput value={project.image} onChange={(e) => handleChange('projects', 'image', e.target.value, index)} placeholder="https://..." />
                        <div className="w-full aspect-video mt-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-700 flex items-center justify-center">
                          {project.image ? <img src={project.image} className="w-full h-full object-cover" alt="Preview" /> : <span className="text-xs text-zinc-400">No Preview</span>}
                        </div>
                      </InputGroup>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            <button onClick={() => addArrayItem('projects', { title: '', description: '', liveUrl: '', githubUrl: '', technologies: '', image: '', featured: false, order: 0 })} className="w-full py-3 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-xl font-bold text-zinc-600 dark:text-zinc-300 transition-colors flex items-center justify-center gap-2"><Plus size={18} /> Add Project</button>
          </div>
        </FormSection>

        {/* SECTION 5: EXPERIENCE (Updated with new fields) */}
        <FormSection title="Experience" icon={Briefcase}>
          <div className="space-y-4">
            {formData.experience.map((exp, index) => (
              <div key={index} className="bg-white dark:bg-zinc-900 p-6 rounded-xl border border-zinc-200 dark:border-zinc-700 relative">
                <button onClick={() => removeArrayItem('experience', index)} className="absolute top-4 right-4 text-zinc-400 hover:text-red-500"><Trash2 size={18} /></button>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <InputGroup label="Company"><StyledInput value={exp.company} onChange={(e) => handleChange('experience', 'company', e.target.value, index)} /></InputGroup>
                  <InputGroup label="Position"><StyledInput value={exp.position} onChange={(e) => handleChange('experience', 'position', e.target.value, index)} /></InputGroup>
                  
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <InputGroup label="Start Date">
                        <StyledInput type="date" value={exp.startDate || ''} onChange={(e) => handleChange('experience', 'startDate', e.target.value, index)} />
                      </InputGroup>
                    </div>
                    <div className="flex-1">
                      <InputGroup label="End Date">
                        <StyledInput type="date" value={exp.endDate || ''} onChange={(e) => handleChange('experience', 'endDate', e.target.value, index)} disabled={exp.current} />
                      </InputGroup>
                    </div>
                  </div>
                  
                  <div className="flex flex-col justify-end">
                     <ToggleSwitch label="Current Position" checked={exp.current} onChange={(val) => handleChange('experience', 'current', val, index)} />
                  </div>

                  <InputGroup label="Display Duration (Text)"><StyledInput value={exp.duration} onChange={(e) => handleChange('experience', 'duration', e.target.value, index)} placeholder="e.g. Jan 2023 - Present" /></InputGroup>
                  <InputGroup label="Location"><StyledInput value={exp.location} onChange={(e) => handleChange('experience', 'location', e.target.value, index)} /></InputGroup>
                </div>
                <InputGroup label="Short Description">
                   <StyledTextArea value={exp.description || ''} onChange={(e) => handleChange('experience', 'description', e.target.value, index)} rows="2" placeholder="Brief summary of the role..." />
                </InputGroup>
                <div className="mt-4">
                  <InputGroup label="Responsibilities (Line separated)">
                    <StyledTextArea value={Array.isArray(exp.responsibilities) ? exp.responsibilities.join('\n') : exp.responsibilities} onChange={(e) => handleChange('experience', 'responsibilities', e.target.value, index)} rows="3" />
                  </InputGroup>
                </div>
              </div>
            ))}
            <button onClick={() => addArrayItem('experience', { company: '', position: '', duration: '', location: '', responsibilities: '', startDate: '', endDate: '', current: false, description: '' })} className="btn-secondary w-full py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 font-bold transition-colors">+ Add Position</button>
          </div>
        </FormSection>

        {/* SECTION 6: EDUCATION (Updated with new fields) */}
        <FormSection title="Education" icon={GraduationCap}>
          <div className="grid md:grid-cols-1 gap-6">
            {formData.education.map((edu, index) => (
              <div key={index} className="bg-white dark:bg-zinc-900 p-6 rounded-xl border border-zinc-200 dark:border-zinc-700 relative">
                <button onClick={() => removeArrayItem('education', index)} className="absolute top-4 right-4 text-zinc-400 hover:text-red-500"><X size={16} /></button>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <InputGroup label="Institution"><StyledInput value={edu.institution} onChange={(e) => handleChange('education', 'institution', e.target.value, index)} /></InputGroup>
                  <InputGroup label="Degree"><StyledInput value={edu.degree} onChange={(e) => handleChange('education', 'degree', e.target.value, index)} /></InputGroup>
                  <InputGroup label="Field of Study"><StyledInput value={edu.field} onChange={(e) => handleChange('education', 'field', e.target.value, index)} /></InputGroup>
                  <InputGroup label="Location"><StyledInput value={edu.location} onChange={(e) => handleChange('education', 'location', e.target.value, index)} /></InputGroup>
                  <InputGroup label="Start Date"><StyledInput type="date" value={edu.startDate || ''} onChange={(e) => handleChange('education', 'startDate', e.target.value, index)} /></InputGroup>
                  <InputGroup label="End Date"><StyledInput type="date" value={edu.endDate || ''} onChange={(e) => handleChange('education', 'endDate', e.target.value, index)} /></InputGroup>
                  <InputGroup label="Display Duration"><StyledInput value={edu.duration} onChange={(e) => handleChange('education', 'duration', e.target.value, index)} placeholder="2020 - 2024" /></InputGroup>
                  <InputGroup label="Grade"><StyledInput value={edu.grade} onChange={(e) => handleChange('education', 'grade', e.target.value, index)} /></InputGroup>
                </div>
              </div>
            ))}
            <button onClick={() => addArrayItem('education', { institution: '', degree: '', field: '', duration: '', grade: '', location: '', startDate: '', endDate: '' })} className="text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:underline">+ Add Education</button>
          </div>
        </FormSection>

        {/* SECTION 7: CERTIFICATES */}
        <FormSection title="Certificates" icon={Award}>
          <div className="space-y-4">
            {formData.certificates.map((cert, index) => (
              <div key={index} className="bg-white dark:bg-zinc-900 p-4 rounded-xl border border-zinc-200 dark:border-zinc-700 relative">
                <button onClick={() => removeArrayItem('certificates', index)} className="absolute top-2 right-2 text-zinc-400 hover:text-red-500"><X size={16} /></button>
                <div className="grid md:grid-cols-2 gap-4">
                  <InputGroup label="Title"><StyledInput value={cert.title} onChange={(e) => handleChange('certificates', 'title', e.target.value, index)} /></InputGroup>
                  <InputGroup label="Issuer"><StyledInput value={cert.issuer} onChange={(e) => handleChange('certificates', 'issuer', e.target.value, index)} /></InputGroup>
                  <InputGroup label="Date"><StyledInput value={cert.date} onChange={(e) => handleChange('certificates', 'date', e.target.value, index)} /></InputGroup>
                  <InputGroup label="URL"><StyledInput value={cert.url} onChange={(e) => handleChange('certificates', 'url', e.target.value, index)} /></InputGroup>
                  <div className="md:col-span-2">
                    <InputGroup label="Image URL (Optional)"><StyledInput value={cert.image} onChange={(e) => handleChange('certificates', 'image', e.target.value, index)} /></InputGroup>
                  </div>
                </div>
              </div>
            ))}
            <button onClick={() => addArrayItem('certificates', { title: '', issuer: '', date: '', url: '', image: '' })} className="text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:underline">+ Add Certificate</button>
          </div>
        </FormSection>

        {/* SECTION 8: CONTACT & RESUME */}
        <FormSection title="Contact & Documents" icon={Share2}>
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <InputGroup label="Email"><StyledInput type="email" value={formData.contact.email} onChange={(e) => handleChange('contact', 'email', e.target.value)} /></InputGroup>
            <InputGroup label="Phone"><StyledInput type="tel" value={formData.contact.phone} onChange={(e) => handleChange('contact', 'phone', e.target.value)} /></InputGroup>
          </div>
          
          <div className="border-t border-zinc-100 dark:border-zinc-800 pt-4 mb-6">
            <h4 className="text-sm font-bold mb-3 text-zinc-900 dark:text-white">Social Links</h4>
            <div className="grid md:grid-cols-2 gap-4">
              {['linkedin', 'github', 'twitter', 'website'].map(platform => (
                <InputGroup key={platform} label={platform}>
                  <StyledInput value={formData.contact.social[platform]} onChange={(e) => handleChange('contact', 'social', e.target.value, null, platform)} placeholder="https://..." />
                </InputGroup>
              ))}
            </div>
          </div>

          <div className="border-t border-zinc-100 dark:border-zinc-800 pt-4 mb-6">
            <h4 className="text-sm font-bold mb-3 text-zinc-900 dark:text-white">Address</h4>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="md:col-span-3"><InputGroup label="Street"><StyledInput value={formData.contact.address.street} onChange={(e) => handleChange('contact', 'address', e.target.value, null, 'street')} /></InputGroup></div>
              <InputGroup label="City"><StyledInput value={formData.contact.address.city} onChange={(e) => handleChange('contact', 'address', e.target.value, null, 'city')} /></InputGroup>
              <InputGroup label="Country"><StyledInput value={formData.contact.address.country} onChange={(e) => handleChange('contact', 'address', e.target.value, null, 'country')} /></InputGroup>
              <InputGroup label="Zip"><StyledInput value={formData.contact.address.zipCode} onChange={(e) => handleChange('contact', 'address', e.target.value, null, 'zipCode')} /></InputGroup>
            </div>
          </div>

          {isEdit && (
            <div className="border-t border-zinc-100 dark:border-zinc-800 pt-4">
              <div className="flex items-center justify-between p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl border border-indigo-100 dark:border-indigo-800/50">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white dark:bg-zinc-900 rounded-full shadow-sm text-indigo-600"><FileText size={24} /></div>
                  <div>
                    <h4 className="font-bold text-zinc-900 dark:text-white">Resume.pdf</h4>
                    {formData.resume.url ? <a href={formData.resume.url} target="_blank" rel="noreferrer" className="text-xs text-indigo-500 hover:underline">View current file</a> : <span className="text-xs text-zinc-400">No file uploaded</span>}
                  </div>
                </div>
                <label className="cursor-pointer px-4 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm font-medium hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
                  Upload New
                  <input type="file" accept=".pdf" onChange={(e) => handleFileUpload(e, 'resume')} className="hidden" />
                </label>
              </div>
            </div>
          )}
        </FormSection>

      </main>
    </div>
  );
};

export default PortfolioFormPage;