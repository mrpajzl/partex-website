"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
  ArrowLeft, Plus, Eye, Settings, GripVertical, Edit, Trash2, 
  Copy, ChevronDown, ChevronUp, LayoutGrid, Save, X
} from "lucide-react";
import type { Id } from "@/convex/_generated/dataModel";

export default function PageEditor() {
  const params = useParams();
  const router = useRouter();
  const pageId = params.id as Id<"pages">;
  
  const page = useQuery(api.pages.getById, { id: pageId });
  const templates = useQuery(api.templates.list);
  const sections = page?.sections || [];
  
  const updateSection = useMutation(api.sections.update);
  const deleteSection = useMutation(api.sections.remove);
  const duplicateSection = useMutation(api.sections.duplicate);
  const reorderSections = useMutation(api.sections.reorder);
  
  const [showTemplatePicker, setShowTemplatePicker] = useState(false);
  const [editingSectionId, setEditingSectionId] = useState<Id<"sections"> | null>(null);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  const handleToggleActive = async (sectionId: Id<"sections">, currentState: boolean) => {
    await updateSection({ id: sectionId, isActive: !currentState });
  };

  const handleDelete = async (sectionId: Id<"sections">) => {
    if (confirm("Delete this section?")) {
      await deleteSection({ id: sectionId });
    }
  };

  const handleDuplicate = async (sectionId: Id<"sections">) => {
    await duplicateSection({ id: sectionId });
  };

  if (!page) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5865F2] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading page...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push("/admin")}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{page.title}</h1>
                <p className="text-sm text-gray-600">/{page.slug}</p>
              </div>
              {page.isHomepage && (
                <span className="px-3 py-1 text-xs font-medium rounded-full bg-[#5865F2] text-white">
                  Homepage
                </span>
              )}
            </div>
            <div className="flex items-center gap-3">
              <button className="btn-secondary flex items-center gap-2">
                <Eye className="w-4 h-4" />
                Preview
              </button>
              <button className="btn-secondary flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Settings
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Sections List */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                Sections ({sections.length})
              </h2>
              <button
                onClick={() => setShowTemplatePicker(true)}
                className="btn-primary flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Add Section
              </button>
            </div>

            {/* Sections */}
            <div className="space-y-3">
              {sections.map((section, index) => (
                <SectionCard
                  key={section._id}
                  section={section}
                  index={index}
                  isExpanded={expandedSections.has(section._id)}
                  onToggle={() => toggleSection(section._id)}
                  onToggleActive={() => handleToggleActive(section._id, section.isActive)}
                  onEdit={() => setEditingSectionId(section._id)}
                  onDelete={() => handleDelete(section._id)}
                  onDuplicate={() => handleDuplicate(section._id)}
                />
              ))}
            </div>

            {/* Empty State */}
            {sections.length === 0 && (
              <div className="text-center py-16 bg-white rounded-xl border-2 border-dashed border-gray-300">
                <LayoutGrid className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No sections yet</h3>
                <p className="text-gray-600 mb-6">Add your first section to build your page</p>
                <button
                  onClick={() => setShowTemplatePicker(true)}
                  className="btn-primary"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Add Section
                </button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Page Info */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Page Info</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-gray-600">Status:</span>
                  <span className={`ml-2 font-medium ${page.isActive ? 'text-green-600' : 'text-gray-600'}`}>
                    {page.isActive ? 'Published' : 'Draft'}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Updated:</span>
                  <span className="ml-2 text-gray-900">
                    {new Date(page.updatedAt).toLocaleDateString()}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Sections:</span>
                  <span className="ml-2 font-medium text-gray-900">{sections.length}</span>
                </div>
              </div>
            </div>

            {/* Quick Tips */}
            <div className="bg-blue-50 rounded-xl border border-blue-200 p-6">
              <h3 className="font-semibold text-blue-900 mb-3">💡 Quick Tips</h3>
              <ul className="space-y-2 text-sm text-blue-800">
                <li>• Drag sections to reorder</li>
                <li>• Click to expand and edit</li>
                <li>• Toggle visibility with eye icon</li>
                <li>• Duplicate sections to save time</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Template Picker Modal */}
      {showTemplatePicker && (
        <TemplatePicker
          templates={templates || []}
          pageId={pageId}
          onClose={() => setShowTemplatePicker(false)}
        />
      )}

      {/* Section Editor Modal */}
      {editingSectionId && (
        <SectionEditor
          sectionId={editingSectionId}
          onClose={() => setEditingSectionId(null)}
        />
      )}
    </div>
  );
}

// Section Card Component
interface SectionCardProps {
  section: any;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
  onToggleActive: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onDuplicate: () => void;
}

function SectionCard({
  section,
  index,
  isExpanded,
  onToggle,
  onToggleActive,
  onEdit,
  onDelete,
  onDuplicate,
}: SectionCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden group hover:shadow-md transition-all">
      {/* Header */}
      <div className="p-4 flex items-center gap-3">
        <button className="text-gray-400 hover:text-gray-600 cursor-move">
          <GripVertical className="w-5 h-5" />
        </button>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-medium text-gray-500">#{index + 1}</span>
            <h3 className="font-semibold text-gray-900 truncate">{section.name}</h3>
            {!section.isActive && (
              <span className="px-2 py-0.5 text-xs rounded-full bg-gray-200 text-gray-600">
                Hidden
              </span>
            )}
          </div>
          <p className="text-sm text-gray-600">{section.type}</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onToggleActive}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
            title={section.isActive ? "Hide" : "Show"}
          >
            <Eye className={`w-4 h-4 ${section.isActive ? 'text-gray-600' : 'text-gray-400'}`} />
          </button>
          <button
            onClick={onEdit}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <Edit className="w-4 h-4 text-gray-600" />
          </button>
          <button
            onClick={onDuplicate}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <Copy className="w-4 h-4 text-gray-600" />
          </button>
          <button
            onClick={onDelete}
            className="p-2 hover:bg-red-50 rounded-lg transition"
          >
            <Trash2 className="w-4 h-4 text-red-600" />
          </button>
          <button
            onClick={onToggle}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            {isExpanded ? (
              <ChevronUp className="w-4 h-4 text-gray-600" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-600" />
            )}
          </button>
        </div>
      </div>

      {/* Expanded Content Preview */}
      {isExpanded && (
        <div className="border-t border-gray-200 p-4 bg-gray-50">
          <div className="text-sm space-y-2">
            <div>
              <span className="font-medium text-gray-700">Heading:</span>
              <span className="ml-2 text-gray-900">
                {section.content.heading || "—"}
              </span>
            </div>
            {section.content.subheading && (
              <div>
                <span className="font-medium text-gray-700">Subheading:</span>
                <span className="ml-2 text-gray-900">{section.content.subheading}</span>
              </div>
            )}
            {section.content.ctaText && (
              <div>
                <span className="font-medium text-gray-700">CTA:</span>
                <span className="ml-2 text-gray-900">{section.content.ctaText}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// Template Picker Modal
interface TemplatePickerProps {
  templates: any[];
  pageId: Id<"pages">;
  onClose: () => void;
}

function TemplatePicker({ templates, pageId, onClose }: TemplatePickerProps) {
  const createSection = useMutation(api.sections.create);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = ["all", ...new Set(templates.map(t => t.category))];
  const filteredTemplates = selectedCategory === "all" 
    ? templates 
    : templates.filter(t => t.category === selectedCategory);

  const handleSelectTemplate = async (template: any) => {
    await createSection({
      pageId,
      type: template.type,
      name: template.name,
      content: template.defaultContent,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Add Section</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Category Filter */}
          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  selectedCategory === cat
                    ? "bg-[#5865F2] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Templates Grid */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTemplates.map((template) => (
              <button
                key={template._id}
                onClick={() => handleSelectTemplate(template)}
                className="text-left bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-[#5865F2] hover:shadow-lg transition-all group"
              >
                <div className="w-12 h-12 bg-[#5865F2]/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#5865F2]/20 transition">
                  <LayoutGrid className="w-6 h-6 text-[#5865F2]" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{template.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                <span className="text-xs font-medium text-[#5865F2]">{template.category}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Section Editor Modal (Simplified)
interface SectionEditorProps {
  sectionId: Id<"sections">;
  onClose: () => void;
}

function SectionEditor({ sectionId, onClose }: SectionEditorProps) {
  const section = useQuery(api.sections.getById, { id: sectionId });
  const updateSection = useMutation(api.sections.update);
  const [formData, setFormData] = useState<any>(null);

  if (!section) return null;
  if (!formData) {
    setFormData({ name: section.name, content: section.content });
    return null;
  }

  const handleSave = async () => {
    await updateSection({ id: sectionId, ...formData });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Edit Section</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <div>
            <label className="label">Section Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="input"
            />
          </div>

          <div>
            <label className="label">Heading</label>
            <input
              type="text"
              value={formData.content.heading || ""}
              onChange={(e) => setFormData({
                ...formData,
                content: { ...formData.content, heading: e.target.value }
              })}
              className="input"
            />
          </div>

          <div>
            <label className="label">Subheading</label>
            <input
              type="text"
              value={formData.content.subheading || ""}
              onChange={(e) => setFormData({
                ...formData,
                content: { ...formData.content, subheading: e.target.value }
              })}
              className="input"
            />
          </div>

          {formData.content.body !== undefined && (
            <div>
              <label className="label">Body</label>
              <textarea
                value={formData.content.body || ""}
                onChange={(e) => setFormData({
                  ...formData,
                  content: { ...formData.content, body: e.target.value }
                })}
                className="input min-h-[200px]"
              />
            </div>
          )}

          {formData.content.ctaText !== undefined && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label">CTA Text</label>
                <input
                  type="text"
                  value={formData.content.ctaText || ""}
                  onChange={(e) => setFormData({
                    ...formData,
                    content: { ...formData.content, ctaText: e.target.value }
                  })}
                  className="input"
                />
              </div>
              <div>
                <label className="label">CTA Link</label>
                <input
                  type="text"
                  value={formData.content.ctaLink || ""}
                  onChange={(e) => setFormData({
                    ...formData,
                    content: { ...formData.content, ctaLink: e.target.value }
                  })}
                  className="input"
                />
              </div>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-gray-200 flex gap-3">
          <button onClick={handleSave} className="btn-primary flex-1">
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </button>
          <button onClick={onClose} className="btn-secondary flex-1">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
