"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState } from "react";
import { Trash2, Edit, Plus, Save, X } from "lucide-react";
import type { Id } from "@/convex/_generated/dataModel";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"services" | "pricing" | "contact" | "newsletter" | "about">("services");

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-gray-900">Content Management</h1>

      {/* Tab Navigation */}
      <div className="bg-white rounded-lg shadow-md p-2 flex space-x-2 overflow-x-auto">
        {[
          { id: "services", label: "Services" },
          { id: "pricing", label: "Pricing" },
          { id: "contact", label: "Contact" },
          { id: "newsletter", label: "Newsletter" },
          { id: "about", label: "About" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-6 py-3 rounded-lg font-semibold transition whitespace-nowrap ${
              activeTab === tab.id
                ? "bg-primary-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-lg shadow-md p-6">
        {activeTab === "services" && <ServicesManager />}
        {activeTab === "pricing" && <PricingManager />}
        {activeTab === "contact" && <ContactManager />}
        {activeTab === "newsletter" && <NewsletterManager />}
        {activeTab === "about" && <AboutManager />}
      </div>
    </div>
  );
}

// Services Manager
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
  };

  const handleDelete = async (id: Id<"services">) => {
    if (confirm("Are you sure you want to delete this service?")) {
      await deleteService({ id });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Services</h2>
        <button
          onClick={() => setIsAdding(true)}
          className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Add Service</span>
        </button>
      </div>

      {(isAdding || editingId) && (
        <div className="bg-gray-50 p-6 rounded-lg border-2 border-primary-200">
          <h3 className="text-xl font-bold mb-4">{editingId ? "Edit Service" : "New Service"}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="px-4 py-2 border rounded-lg"
            />
            <input
              type="text"
              placeholder="Icon (users, calculator, clipboard)"
              value={formData.icon}
              onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
              className="px-4 py-2 border rounded-lg"
            />
            <textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="px-4 py-2 border rounded-lg md:col-span-2"
              rows={3}
            />
            <input
              type="text"
              placeholder="CTA Text"
              value={formData.ctaText}
              onChange={(e) => setFormData({ ...formData, ctaText: e.target.value })}
              className="px-4 py-2 border rounded-lg"
            />
            <input
              type="text"
              placeholder="CTA Link"
              value={formData.ctaLink}
              onChange={(e) => setFormData({ ...formData, ctaLink: e.target.value })}
              className="px-4 py-2 border rounded-lg"
            />
            <input
              type="number"
              placeholder="Order"
              value={formData.order}
              onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
              className="px-4 py-2 border rounded-lg"
            />
          </div>
          <div className="flex space-x-4 mt-4">
            <button
              onClick={handleSave}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition flex items-center space-x-2"
            >
              <Save className="w-5 h-5" />
              <span>Save</span>
            </button>
            <button
              onClick={() => {
                setIsAdding(false);
                setEditingId(null);
                setFormData({ title: "", description: "", icon: "users", ctaText: "", ctaLink: "", order: 0 });
              }}
              className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition flex items-center space-x-2"
            >
              <X className="w-5 h-5" />
              <span>Cancel</span>
            </button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {services?.map((service) => (
          <div key={service._id} className="bg-gray-50 p-4 rounded-lg flex justify-between items-start">
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-2">{service.title}</h3>
              <p className="text-gray-700 mb-2">{service.description}</p>
              <div className="flex space-x-4 text-sm text-gray-600">
                <span>Icon: {service.icon}</span>
                <span>Order: {service.order}</span>
                <span className={service.isActive ? "text-green-600" : "text-red-600"}>
                  {service.isActive ? "Active" : "Inactive"}
                </span>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handleEdit(service)}
                className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                <Edit className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleDelete(service._id)}
                className="p-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Pricing Manager
function PricingManager() {
  const pricing = useQuery(api.content.getAllPricing);
  const createPricing = useMutation(api.content.createPricingPackage);
  const updatePricing = useMutation(api.content.updatePricingPackage);
  const deletePricing = useMutation(api.content.deletePricingPackage);

  const [editingId, setEditingId] = useState<Id<"pricingPackages"> | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    currency: "Kč",
    unit: "měsíc",
    features: [""],
    order: 0,
  });

  const handleSave = async () => {
    const cleanedFeatures = formData.features.filter(f => f.trim() !== "");
    if (editingId) {
      await updatePricing({ id: editingId, ...formData, features: cleanedFeatures });
      setEditingId(null);
    } else {
      await createPricing({ ...formData, features: cleanedFeatures });
      setIsAdding(false);
    }
    setFormData({ name: "", price: 0, currency: "Kč", unit: "měsíc", features: [""], order: 0 });
  };

  const handleEdit = (pkg: any) => {
    setEditingId(pkg._id);
    setFormData({
      name: pkg.name,
      price: pkg.price,
      currency: pkg.currency,
      unit: pkg.unit || "měsíc",
      features: pkg.features,
      order: pkg.order,
    });
  };

  const handleDelete = async (id: Id<"pricingPackages">) => {
    if (confirm("Are you sure you want to delete this pricing package?")) {
      await deletePricing({ id });
    }
  };

  const addFeature = () => {
    setFormData({ ...formData, features: [...formData.features, ""] });
  };

  const updateFeature = (index: number, value: string) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData({ ...formData, features: newFeatures });
  };

  const removeFeature = (index: number) => {
    const newFeatures = formData.features.filter((_, i) => i !== index);
    setFormData({ ...formData, features: newFeatures });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Pricing Packages</h2>
        <button
          onClick={() => setIsAdding(true)}
          className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Add Package</span>
        </button>
      </div>

      {(isAdding || editingId) && (
        <div className="bg-gray-50 p-6 rounded-lg border-2 border-primary-200">
          <h3 className="text-xl font-bold mb-4">{editingId ? "Edit Package" : "New Package"}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="Package Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="px-4 py-2 border rounded-lg"
            />
            <input
              type="number"
              placeholder="Price"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
              className="px-4 py-2 border rounded-lg"
            />
            <input
              type="text"
              placeholder="Currency (Kč, €, $)"
              value={formData.currency}
              onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
              className="px-4 py-2 border rounded-lg"
            />
            <input
              type="text"
              placeholder="Unit (měsíc, rok, etc.)"
              value={formData.unit}
              onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
              className="px-4 py-2 border rounded-lg"
            />
            <input
              type="number"
              placeholder="Order"
              value={formData.order}
              onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
              className="px-4 py-2 border rounded-lg"
            />
          </div>

          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <label className="font-semibold">Features:</label>
              <button
                onClick={addFeature}
                className="text-primary-600 hover:text-primary-700 flex items-center space-x-1"
              >
                <Plus className="w-4 h-4" />
                <span>Add Feature</span>
              </button>
            </div>
            <div className="space-y-2">
              {formData.features.map((feature, index) => (
                <div key={index} className="flex space-x-2">
                  <input
                    type="text"
                    placeholder={`Feature ${index + 1}`}
                    value={feature}
                    onChange={(e) => updateFeature(index, e.target.value)}
                    className="flex-1 px-4 py-2 border rounded-lg"
                  />
                  <button
                    onClick={() => removeFeature(index)}
                    className="p-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={handleSave}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition flex items-center space-x-2"
            >
              <Save className="w-5 h-5" />
              <span>Save</span>
            </button>
            <button
              onClick={() => {
                setIsAdding(false);
                setEditingId(null);
                setFormData({ name: "", price: 0, currency: "Kč", unit: "měsíc", features: [""], order: 0 });
              }}
              className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition flex items-center space-x-2"
            >
              <X className="w-5 h-5" />
              <span>Cancel</span>
            </button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {pricing?.map((pkg) => (
          <div key={pkg._id} className="bg-gray-50 p-4 rounded-lg flex justify-between items-start">
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-2">{pkg.name}</h3>
              <p className="text-2xl font-bold text-primary-600 mb-2">
                {pkg.price} {pkg.currency} {pkg.unit && `/ ${pkg.unit}`}
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                {pkg.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
              <div className="mt-2 text-sm text-gray-600">
                <span>Order: {pkg.order}</span>
                <span className={`ml-4 ${pkg.isActive ? "text-green-600" : "text-red-600"}`}>
                  {pkg.isActive ? "Active" : "Inactive"}
                </span>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handleEdit(pkg)}
                className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                <Edit className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleDelete(pkg._id)}
                className="p-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Contact Manager
function ContactManager() {
  const contact = useQuery(api.content.getAllContact);
  const createContact = useMutation(api.content.createContact);
  const updateContact = useMutation(api.content.updateContact);
  const deleteContact = useMutation(api.content.deleteContact);

  const [editingId, setEditingId] = useState<Id<"contact"> | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    type: "email",
    label: "",
    value: "",
    icon: "mail",
    order: 0,
  });

  const handleSave = async () => {
    if (editingId) {
      await updateContact({ id: editingId, ...formData });
      setEditingId(null);
    } else {
      await createContact(formData);
      setIsAdding(false);
    }
    setFormData({ type: "email", label: "", value: "", icon: "mail", order: 0 });
  };

  const handleEdit = (item: any) => {
    setEditingId(item._id);
    setFormData({
      type: item.type,
      label: item.label,
      value: item.value,
      icon: item.icon || "mail",
      order: item.order,
    });
  };

  const handleDelete = async (id: Id<"contact">) => {
    if (confirm("Are you sure you want to delete this contact item?")) {
      await deleteContact({ id });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Contact Information</h2>
        <button
          onClick={() => setIsAdding(true)}
          className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Add Contact</span>
        </button>
      </div>

      {(isAdding || editingId) && (
        <div className="bg-gray-50 p-6 rounded-lg border-2 border-primary-200">
          <h3 className="text-xl font-bold mb-4">{editingId ? "Edit Contact" : "New Contact"}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Type (email, phone, address, hours)"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="px-4 py-2 border rounded-lg"
            />
            <input
              type="text"
              placeholder="Label"
              value={formData.label}
              onChange={(e) => setFormData({ ...formData, label: e.target.value })}
              className="px-4 py-2 border rounded-lg"
            />
            <textarea
              placeholder="Value"
              value={formData.value}
              onChange={(e) => setFormData({ ...formData, value: e.target.value })}
              className="px-4 py-2 border rounded-lg md:col-span-2"
              rows={3}
            />
            <input
              type="text"
              placeholder="Icon (mail, phone, map-pin, clock)"
              value={formData.icon}
              onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
              className="px-4 py-2 border rounded-lg"
            />
            <input
              type="number"
              placeholder="Order"
              value={formData.order}
              onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
              className="px-4 py-2 border rounded-lg"
            />
          </div>
          <div className="flex space-x-4 mt-4">
            <button
              onClick={handleSave}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition flex items-center space-x-2"
            >
              <Save className="w-5 h-5" />
              <span>Save</span>
            </button>
            <button
              onClick={() => {
                setIsAdding(false);
                setEditingId(null);
                setFormData({ type: "email", label: "", value: "", icon: "mail", order: 0 });
              }}
              className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition flex items-center space-x-2"
            >
              <X className="w-5 h-5" />
              <span>Cancel</span>
            </button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {contact?.map((item) => (
          <div key={item._id} className="bg-gray-50 p-4 rounded-lg flex justify-between items-start">
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-2">{item.label}</h3>
              <p className="text-gray-700 mb-2 whitespace-pre-line">{item.value}</p>
              <div className="flex space-x-4 text-sm text-gray-600">
                <span>Type: {item.type}</span>
                <span>Icon: {item.icon}</span>
                <span>Order: {item.order}</span>
                <span className={item.isActive ? "text-green-600" : "text-red-600"}>
                  {item.isActive ? "Active" : "Inactive"}
                </span>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handleEdit(item)}
                className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                <Edit className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleDelete(item._id)}
                className="p-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Newsletter Manager
function NewsletterManager() {
  const newsletter = useQuery(api.content.getNewsletter);
  const subscribers = useQuery(api.content.getNewsletter); // You would need to create this query

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Newsletter Settings</h2>
      {newsletter && (
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-4">{newsletter.title}</h3>
          <p className="text-gray-700 mb-4">{newsletter.description}</p>
          <p className="text-sm text-gray-600">CTA: {newsletter.ctaText}</p>
        </div>
      )}
      <p className="text-gray-600 italic">Subscriber management coming soon...</p>
    </div>
  );
}

// About Manager
function AboutManager() {
  const about = useQuery(api.content.getAbout);
  const updateAbout = useMutation(api.content.updateAbout);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: about?.title || "",
    content: about?.content || "",
  });

  const handleSave = async () => {
    if (about?._id) {
      await updateAbout({ id: about._id, ...formData });
      setIsEditing(false);
    }
  };

  if (!about) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">About Section</h2>
        <button
          onClick={() => {
            setIsEditing(!isEditing);
            if (!isEditing) {
              setFormData({ title: about.title, content: about.content });
            }
          }}
          className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition flex items-center space-x-2"
        >
          <Edit className="w-5 h-5" />
          <span>{isEditing ? "Cancel" : "Edit"}</span>
        </button>
      </div>

      {isEditing ? (
        <div className="bg-gray-50 p-6 rounded-lg border-2 border-primary-200">
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg"
            />
            <textarea
              placeholder="Content"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg"
              rows={15}
            />
            <button
              onClick={handleSave}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition flex items-center space-x-2"
            >
              <Save className="w-5 h-5" />
              <span>Save Changes</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-2xl font-bold mb-4">{about.title}</h3>
          <p className="text-gray-700 whitespace-pre-line">{about.content}</p>
        </div>
      )}
    </div>
  );
}
