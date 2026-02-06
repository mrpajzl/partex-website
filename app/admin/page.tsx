"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState } from "react";
import { 
  Trash2, Edit, Plus, Save, X, Eye, EyeOff, GripVertical, 
  LayoutDashboard, FileText, Menu, Navigation, Image, Settings,
  ChevronRight
} from "lucide-react";
import type { Id } from "@/convex/_generated/dataModel";

type Section = "pages" | "services" | "pricing" | "contact" | "newsletter" | "about";

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState<Section>("pages");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const sections = [
    { id: "pages", label: "Pages", icon: FileText, badge: null },
    { id: "services", label: "Services", icon: LayoutDashboard, badge: null },
    { id: "pricing", label: "Pricing", icon: Menu, badge: null },
    { id: "contact", label: "Contact", icon: Navigation, badge: null },
    { id: "newsletter", label: "Newsletter", icon: Image, badge: null },
    { id: "about", label: "About", icon: Settings, badge: null },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside 
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-white border-r border-gray-200 transition-all duration-300 flex flex-col`}
      >
        {/* Logo/Header */}
        <div className="h-16 border-b border-gray-200 flex items-center justify-between px-4">
          {sidebarOpen && (
            <h1 className="text-xl font-bold bg-gradient-to-r from-[#5865F2] to-[#7983F5] bg-clip-text text-transparent">
              Partex CMS
            </h1>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <Menu className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {sections.map((section) => {
            const Icon = section.icon;
            const isActive = activeSection === section.id;
            
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id as Section)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? "bg-[#5865F2] text-white shadow-md"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {sidebarOpen && (
                  <>
                    <span className="font-medium flex-1 text-left">{section.label}</span>
                    {section.badge && (
                      <span className="px-2 py-0.5 text-xs rounded-full bg-white/20">
                        {section.badge}
                      </span>
                    )}
                  </>
                )}
              </button>
            );
          })}
        </nav>

        {/* User/Settings */}
        {sidebarOpen && (
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center gap-3 px-4 py-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#5865F2] to-[#7983F5] flex items-center justify-center text-white font-bold">
                A
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">Admin</p>
                <p className="text-xs text-gray-500 truncate">admin@partex.cz</p>
              </div>
            </div>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto p-8">
          {activeSection === "pages" && <PagesManager />}
          {activeSection === "services" && <ServicesManager />}
          {activeSection === "pricing" && <PricingManager />}
          {activeSection === "contact" && <ContactManager />}
          {activeSection === "newsletter" && <NewsletterManager />}
          {activeSection === "about" && <AboutManager />}
        </div>
      </main>
    </div>
  );
}

// Pages Manager (NEW!)
function PagesManager() {
  const pages = useQuery(api.pages.list);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Pages</h2>
          <p className="text-gray-600 mt-1">Manage your website pages and sections</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Plus className="w-5 h-5" />
          New Page
        </button>
      </div>

      {/* Pages Grid */}
      <div className="grid gap-4">
        {pages?.map((page) => (
          <div
            key={page._id}
            className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all group"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-semibold text-gray-900">{page.title}</h3>
                  {page.isHomepage && (
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-[#5865F2] text-white">
                      Homepage
                    </span>
                  )}
                  {!page.isActive && (
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-gray-200 text-gray-600">
                      Draft
                    </span>
                  )}
                </div>
                <p className="text-gray-600 mb-3">{page.description}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <FileText className="w-4 h-4" />
                    /{page.slug}
                  </span>
                  <span>
                    Updated {new Date(page.updatedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="btn-secondary-sm">
                  <Eye className="w-4 h-4" />
                </button>
                <button className="btn-secondary-sm">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="btn-danger-sm">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {pages?.length === 0 && (
        <div className="text-center py-16 bg-white rounded-xl border-2 border-dashed border-gray-300">
          <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No pages yet</h3>
          <p className="text-gray-600 mb-6">Get started by creating your first page</p>
          <button className="btn-primary">
            <Plus className="w-5 h-5 mr-2" />
            Create Page
          </button>
        </div>
      )}
    </div>
  );
}

// Services Manager (Redesigned)
function ServicesManager() {
  const services = useQuery(api.content.getAllServices);
  const createService = useMutation(api.content.createService);
  const updateService = useMutation(api.content.updateService);
  const deleteService = useMutation(api.content.deleteService);

  const [editingId, setEditingId] = useState<Id<"services"> | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    icon: "users",
    ctaText: "",
    ctaLink: "",
    order: 0,
  });

  const handleSave = async () => {
    if (editingId) {
      await updateService({ id: editingId, ...formData });
      setEditingId(null);
    } else {
      await createService(formData);
      setIsAdding(false);
    }
    setFormData({ title: "", description: "", icon: "users", ctaText: "", ctaLink: "", order: 0 });
  };

  const handleEdit = (service: any) => {
    setEditingId(service._id);
    setFormData({
      title: service.title,
      description: service.description,
      icon: service.icon || "users",
      ctaText: service.ctaText || "",
      ctaLink: service.ctaLink || "",
      order: service.order,
    });
    setIsAdding(true);
  };

  const handleDelete = async (id: Id<"services">) => {
    if (confirm("Are you sure you want to delete this service?")) {
      await deleteService({ id });
    }
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingId(null);
    setFormData({ title: "", description: "", icon: "users", ctaText: "", ctaLink: "", order: 0 });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Services</h2>
          <p className="text-gray-600 mt-1">Manage your service offerings</p>
        </div>
        {!isAdding && (
          <button 
            onClick={() => setIsAdding(true)}
            className="btn-primary flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Service
          </button>
        )}
      </div>

      {/* Add/Edit Form */}
      {isAdding && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {editingId ? "Edit Service" : "New Service"}
          </h3>
          <div className="grid gap-4">
            <div>
              <label className="label">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="input"
                placeholder="Service title"
              />
            </div>
            <div>
              <label className="label">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="input min-h-[100px]"
                placeholder="Service description"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label">Icon</label>
                <input
                  type="text"
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  className="input"
                  placeholder="users"
                />
              </div>
              <div>
                <label className="label">Order</label>
                <input
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                  className="input"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label">CTA Text (Optional)</label>
                <input
                  type="text"
                  value={formData.ctaText}
                  onChange={(e) => setFormData({ ...formData, ctaText: e.target.value })}
                  className="input"
                  placeholder="Learn More"
                />
              </div>
              <div>
                <label className="label">CTA Link (Optional)</label>
                <input
                  type="text"
                  value={formData.ctaLink}
                  onChange={(e) => setFormData({ ...formData, ctaLink: e.target.value })}
                  className="input"
                  placeholder="/services"
                />
              </div>
            </div>
            <div className="flex gap-3 pt-4 border-t border-gray-200">
              <button onClick={handleSave} className="btn-primary flex-1">
                <Save className="w-4 h-4 mr-2" />
                {editingId ? "Update" : "Create"}
              </button>
              <button onClick={handleCancel} className="btn-secondary flex-1">
                <X className="w-4 h-4 mr-2" />
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Services Grid */}
      <div className="grid gap-4">
        {services?.map((service) => (
          <div
            key={service._id}
            className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all group"
          >
            <div className="flex items-start gap-4">
              <button className="mt-1 text-gray-400 hover:text-gray-600 cursor-move">
                <GripVertical className="w-5 h-5" />
              </button>
              
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-semibold text-gray-900">{service.title}</h3>
                  {!service.isActive && (
                    <span className="px-2 py-1 text-xs rounded-full bg-gray-200 text-gray-600">
                      Hidden
                    </span>
                  )}
                </div>
                <p className="text-gray-600 mb-3">{service.description}</p>
                {service.ctaText && (
                  <div className="inline-flex items-center gap-2 text-sm text-[#5865F2]">
                    <span>{service.ctaText}</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                )}
              </div>
              
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => handleEdit(service)}
                  className="btn-secondary-sm"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => handleDelete(service._id)}
                  className="btn-danger-sm"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Placeholder components for other sections
function PricingManager() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
      <Menu className="w-16 h-16 text-gray-400 mx-auto mb-4" />
      <h3 className="text-xl font-semibold text-gray-900 mb-2">Pricing Manager</h3>
      <p className="text-gray-600">Coming soon...</p>
    </div>
  );
}

function ContactManager() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
      <Navigation className="w-16 h-16 text-gray-400 mx-auto mb-4" />
      <h3 className="text-xl font-semibold text-gray-900 mb-2">Contact Manager</h3>
      <p className="text-gray-600">Coming soon...</p>
    </div>
  );
}

function NewsletterManager() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
      <Image className="w-16 h-16 text-gray-400 mx-auto mb-4" />
      <h3 className="text-xl font-semibold text-gray-900 mb-2">Newsletter Manager</h3>
      <p className="text-gray-600">Coming soon...</p>
    </div>
  );
}

function AboutManager() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
      <Settings className="w-16 h-16 text-gray-400 mx-auto mb-4" />
      <h3 className="text-xl font-semibold text-gray-900 mb-2">About Manager</h3>
      <p className="text-gray-600">Coming soon...</p>
    </div>
  );
}
