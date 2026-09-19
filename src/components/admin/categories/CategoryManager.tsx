"use client";

import React, { useState } from "react";
import {
  FolderTree,
  Plus,
  Search,
  ChevronDown,
  ChevronRight,
  Edit2,
  Trash2,
  Layers,
  Star,
  CheckCircle2,
  AlertTriangle,
  Zap,
  Shield,
  Headphones,
  Radio,
  HeartHandshake,
  ExternalLink,
  X,
} from "lucide-react";
import type {
  FusionCategory,
  FusionSubcategory,
  FusionProduct,
} from "@/lib/cms/fusion-cms";

interface CategoryManagerProps {
  categories: FusionCategory[];
  products: FusionProduct[];
  onSaveCategories: (categories: FusionCategory[]) => void;
  onFilterCategory?: (categoryName: string) => void;
}

export function CategoryManager({
  categories,
  products,
  onSaveCategories,
  onFilterCategory,
}: CategoryManagerProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [brandFilter, setBrandFilter] = useState<string>("all");
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    "cat-headphones": true,
    "cat-charging": true,
    "cat-security": true,
  });

  // Modals state
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<FusionCategory | null>(null);

  const [showSubcategoryModal, setShowSubcategoryModal] = useState(false);
  const [parentCategoryForSub, setParentCategoryForSub] = useState<FusionCategory | null>(null);
  const [editingSubcategory, setEditingSubcategory] = useState<FusionSubcategory | null>(null);

  // Category Form State
  const [catName, setCatName] = useState("");
  const [catSlug, setCatSlug] = useState("");
  const [catBrand, setCatBrand] = useState<"soundcore" | "anker" | "eufy" | "general">("anker");
  const [catDescription, setCatDescription] = useState("");
  const [catIcon, setCatIcon] = useState("Zap");
  const [catFeatured, setCatFeatured] = useState(true);

  // Subcategory Form State
  const [subName, setSubName] = useState("");
  const [subSlug, setSubSlug] = useState("");
  const [subDesc, setSubDesc] = useState("");
  const [subParentId, setSubParentId] = useState("");

  // Safeguard modal
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const toggleExpand = (catId: string) => {
    setExpandedCategories((prev) => ({ ...prev, [catId]: !prev[catId] }));
  };

  const getProductCountForCategory = (catNameOrId: string, slug?: string) => {
    return products.filter(
      (p) =>
        p.categoryId === catNameOrId ||
        p.category.toLowerCase() === catNameOrId.toLowerCase() ||
        (slug && p.category.toLowerCase().includes(slug.toLowerCase()))
    ).length;
  };

  const getProductCountForSubcategory = (subNameOrId: string, subSlug?: string) => {
    return products.filter(
      (p) =>
        p.subcategoryId === subNameOrId ||
        (p.subcategory && p.subcategory.toLowerCase() === subNameOrId.toLowerCase()) ||
        (subSlug && p.subcategory && p.subcategory.toLowerCase().includes(subSlug.toLowerCase()))
    ).length;
  };

  // Open Create Category
  const handleOpenCreateCategory = () => {
    setEditingCategory(null);
    setCatName("");
    setCatSlug("");
    setCatBrand("anker");
    setCatDescription("");
    setCatIcon("Zap");
    setCatFeatured(true);
    setShowCategoryModal(true);
  };

  // Open Edit Category
  const handleOpenEditCategory = (cat: FusionCategory) => {
    setEditingCategory(cat);
    setCatName(cat.name);
    setCatSlug(cat.slug);
    setCatBrand(cat.brand);
    setCatDescription(cat.description || "");
    setCatIcon(cat.icon || "Zap");
    setCatFeatured(cat.isFeaturedHome);
    setShowCategoryModal(true);
  };

  // Open Create Subcategory
  const handleOpenCreateSubcategory = (parentCat: FusionCategory) => {
    setParentCategoryForSub(parentCat);
    setEditingSubcategory(null);
    setSubName("");
    setSubSlug("");
    setSubDesc("");
    setSubParentId(parentCat.id);
    setShowSubcategoryModal(true);
  };

  // Open Edit Subcategory
  const handleOpenEditSubcategory = (parentCat: FusionCategory, sub: FusionSubcategory) => {
    setParentCategoryForSub(parentCat);
    setEditingSubcategory(sub);
    setSubName(sub.name);
    setSubSlug(sub.slug);
    setSubDesc(sub.description || "");
    setSubParentId(parentCat.id);
    setShowSubcategoryModal(true);
  };

  // Save Category
  const handleSaveCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!catName.trim()) return;

    const slug = catSlug.trim() || catName.toLowerCase().replace(/[^a-z0-9]+/g, "-");

    if (editingCategory) {
      const updated = categories.map((c) =>
        c.id === editingCategory.id
          ? {
              ...c,
              name: catName.trim(),
              slug,
              brand: catBrand,
              description: catDescription.trim(),
              icon: catIcon,
              isFeaturedHome: catFeatured,
            }
          : c
      );
      onSaveCategories(updated);
    } else {
      const newCat: FusionCategory = {
        id: `cat-${Date.now()}`,
        name: catName.trim(),
        slug,
        brand: catBrand,
        description: catDescription.trim(),
        icon: catIcon,
        sortOrder: categories.length + 1,
        isFeaturedHome: catFeatured,
        isActive: true,
        productCount: 0,
        subcategories: [],
      };
      onSaveCategories([...categories, newCat]);
    }
    setShowCategoryModal(false);
  };

  // Save Subcategory
  const handleSaveSubcategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subName.trim() || !subParentId) return;

    const slug = subSlug.trim() || subName.toLowerCase().replace(/[^a-z0-9]+/g, "-");

    const updated = categories.map((c) => {
      if (c.id !== subParentId) return c;

      if (editingSubcategory) {
        return {
          ...c,
          subcategories: c.subcategories.map((s) =>
            s.id === editingSubcategory.id
              ? {
                  ...s,
                  name: subName.trim(),
                  slug,
                  description: subDesc.trim(),
                }
              : s
          ),
        };
      } else {
        const newSub: FusionSubcategory = {
          id: `sub-${Date.now()}`,
          categoryId: c.id,
          name: subName.trim(),
          slug,
          description: subDesc.trim(),
          productCount: 0,
          isActive: true,
          sortOrder: c.subcategories.length + 1,
        };
        return {
          ...c,
          subcategories: [...c.subcategories, newSub],
        };
      }
    });

    onSaveCategories(updated);
    setShowSubcategoryModal(false);
  };

  // Delete Category with safeguard
  const handleDeleteCategory = (cat: FusionCategory) => {
    const assignedProducts = getProductCountForCategory(cat.id, cat.slug);
    if (assignedProducts > 0) {
      setAlertMessage(
        `Cannot delete "${cat.name}" because it currently has ${assignedProducts} active product(s) assigned to it. Please reassign those products first.`
      );
      return;
    }

    if (confirm(`Are you sure you want to delete category "${cat.name}"?`)) {
      onSaveCategories(categories.filter((c) => c.id !== cat.id));
    }
  };

  // Delete Subcategory
  const handleDeleteSubcategory = (cat: FusionCategory, sub: FusionSubcategory) => {
    const assignedProducts = getProductCountForSubcategory(sub.id, sub.slug);
    if (assignedProducts > 0) {
      setAlertMessage(
        `Cannot delete subcategory "${sub.name}" because it currently has ${assignedProducts} active product(s) assigned to it.`
      );
      return;
    }

    if (confirm(`Delete subcategory "${sub.name}"?`)) {
      const updated = categories.map((c) =>
        c.id === cat.id
          ? {
              ...c,
              subcategories: c.subcategories.filter((s) => s.id !== sub.id),
            }
          : c
      );
      onSaveCategories(updated);
    }
  };

  // Filter categories
  const filteredCategories = categories.filter((cat) => {
    const matchesSearch =
      cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cat.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cat.subcategories.some((s) => s.name.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesBrand = brandFilter === "all" || cat.brand === brandFilter;

    return matchesSearch && matchesBrand;
  });

  const getBrandBadge = (brand: string) => {
    switch (brand) {
      case "soundcore":
        return (
          <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-cyan-50 text-cyan-700 border border-cyan-200">
            soundcore
          </span>
        );
      case "anker":
        return (
          <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-blue-50 text-blue-700 border border-blue-200">
            anker
          </span>
        );
      case "eufy":
        return (
          <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
            eufy
          </span>
        );
      default:
        return (
          <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-gray-50 text-gray-700 border border-gray-200">
            {brand}
          </span>
        );
    }
  };

  const renderIcon = (iconName?: string) => {
    switch (iconName) {
      case "Headphones":
        return <Headphones className="h-4 w-4 text-cyan-600" />;
      case "Zap":
        return <Zap className="h-4 w-4 text-amber-500" />;
      case "Shield":
        return <Shield className="h-4 w-4 text-emerald-600" />;
      case "Radio":
        return <Radio className="h-4 w-4 text-purple-600" />;
      case "HeartHandshake":
        return <HeartHandshake className="h-4 w-4 text-rose-500" />;
      default:
        return <Layers className="h-4 w-4 text-blue-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Alert modal */}
      {alertMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-red-100 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center gap-3 text-red-600 mb-3">
              <AlertTriangle className="h-6 w-6 shrink-0" />
              <h3 className="font-bold text-lg text-gray-900">Protected Category</h3>
            </div>
            <p className="text-sm text-gray-600 mb-6 leading-relaxed">{alertMessage}</p>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setAlertMessage(null)}
                className="px-5 py-2 bg-gray-900 hover:bg-black text-white text-sm font-semibold rounded-xl transition"
              >
                Understood
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-gray-200/80 shadow-2xs">
        <div>
          <h2 className="text-xl font-extrabold text-gray-900 tracking-tight flex items-center gap-2.5">
            <FolderTree className="h-6 w-6 text-[#17BBEF]" />
            Category & Subcategory Taxonomy
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Manage storefront category tree, subcategories, brand ownership, and mega-menu links.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleOpenCreateCategory}
            className="flex items-center gap-2 px-4 py-2.5 bg-gray-900 hover:bg-black text-white text-xs font-bold rounded-xl transition shadow-xs hover:shadow"
          >
            <Plus className="h-4 w-4" />
            Add New Category
          </button>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search categories or subcategories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-medium focus:outline-none focus:border-[#17BBEF] shadow-2xs"
          />
        </div>

        <div className="flex items-center gap-2 bg-white px-3 py-1.5 border border-gray-200 rounded-xl shadow-2xs">
          <span className="text-xs font-bold text-gray-500">Brand:</span>
          {(["all", "soundcore", "anker", "eufy"] as const).map((b) => (
            <button
              key={b}
              type="button"
              onClick={() => setBrandFilter(b)}
              className={`px-3 py-1 text-xs font-semibold rounded-lg capitalize transition ${
                brandFilter === b
                  ? "bg-gray-900 text-white shadow-xs"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {b}
            </button>
          ))}
        </div>
      </div>

      {/* Hierarchy Tree Card */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-2xs overflow-hidden">
        <div className="p-4 bg-gray-50/80 border-b border-gray-200 flex items-center justify-between text-xs font-bold text-gray-500 uppercase tracking-wider">
          <div className="w-1/2">Category / Subcategory</div>
          <div className="w-1/6 text-center">Brand Focus</div>
          <div className="w-1/6 text-center">Products</div>
          <div className="w-1/6 text-right pr-2">Actions</div>
        </div>

        <div className="divide-y divide-gray-100">
          {filteredCategories.map((cat) => {
            const isExpanded = expandedCategories[cat.id] ?? false;
            const liveCatProdCount = getProductCountForCategory(cat.id, cat.slug);

            return (
              <div key={cat.id} className="transition-colors hover:bg-gray-50/40">
                {/* Parent Category Row */}
                <div className="p-4 flex items-center justify-between">
                  <div className="w-1/2 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => toggleExpand(cat.id)}
                      className="p-1 rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition"
                    >
                      {isExpanded ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </button>

                    <div className="p-2 rounded-xl bg-gray-100/80 border border-gray-200/60 shrink-0">
                      {renderIcon(cat.icon)}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-gray-900">{cat.name}</span>
                        {cat.isFeaturedHome && (
                          <span
                            title="Featured in Storefront MegaMenu"
                            className="text-amber-500 inline-flex items-center"
                          >
                            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-500" />
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] font-mono text-gray-400">/{cat.slug}</div>
                    </div>
                  </div>

                  <div className="w-1/6 text-center">{getBrandBadge(cat.brand)}</div>

                  <div className="w-1/6 text-center">
                    <button
                      type="button"
                      onClick={() => onFilterCategory?.(cat.name)}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gray-100 hover:bg-gray-200 rounded-lg text-xs font-semibold text-gray-700 transition"
                      title="Filter products by this category"
                    >
                      <span>{liveCatProdCount} items</span>
                      <ExternalLink className="h-3 w-3 text-gray-400" />
                    </button>
                  </div>

                  <div className="w-1/6 flex items-center justify-end gap-1.5 pr-2">
                    <button
                      type="button"
                      onClick={() => handleOpenCreateSubcategory(cat)}
                      className="p-1.5 text-gray-500 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition"
                      title="Add subcategory"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleOpenEditCategory(cat)}
                      className="p-1.5 text-gray-500 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition"
                      title="Edit category"
                    >
                      <Edit2 className="h-3.5 w-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteCategory(cat)}
                      className="p-1.5 text-gray-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition"
                      title="Delete category"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                {/* Subcategories Children Rows */}
                {isExpanded && cat.subcategories.length > 0 && (
                  <div className="bg-gray-50/50 pl-14 pr-4 py-1 border-t border-gray-100 space-y-1">
                    {cat.subcategories.map((sub) => {
                      const liveSubProdCount = getProductCountForSubcategory(sub.id, sub.slug);

                      return (
                        <div
                          key={sub.id}
                          className="flex items-center justify-between py-2.5 px-3 rounded-xl hover:bg-white hover:shadow-2xs transition"
                        >
                          <div className="w-1/2 flex items-center gap-2">
                            <span className="text-gray-300 font-mono text-xs">└─</span>
                            <div>
                              <div className="text-xs font-semibold text-gray-800">
                                {sub.name}
                              </div>
                              <div className="text-[10px] font-mono text-gray-400">/{sub.slug}</div>
                            </div>
                          </div>

                          <div className="w-1/6 text-center">
                            <span className="text-[11px] text-gray-400 italic">Subcategory</span>
                          </div>

                          <div className="w-1/6 text-center">
                            <span className="text-[11px] font-medium text-gray-600">
                              {liveSubProdCount} prods
                            </span>
                          </div>

                          <div className="w-1/6 flex items-center justify-end gap-1.5 pr-2">
                            <button
                              type="button"
                              onClick={() => handleOpenEditSubcategory(cat, sub)}
                              className="p-1 text-gray-400 hover:text-blue-600 rounded-md transition"
                              title="Edit subcategory"
                            >
                              <Edit2 className="h-3 w-3" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteSubcategory(cat, sub)}
                              className="p-1 text-gray-400 hover:text-red-600 rounded-md transition"
                              title="Delete subcategory"
                            >
                              <Trash2 className="h-3 w-3" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal: Create/Edit Category */}
      {showCategoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-gray-100 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-5">
              <h3 className="font-extrabold text-lg text-gray-900">
                {editingCategory ? `Edit Category: ${editingCategory.name}` : "Create New Category"}
              </h3>
              <button
                type="button"
                onClick={() => setShowCategoryModal(false)}
                className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleSaveCategory} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Category Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Headphones & Audio"
                  value={catName}
                  onChange={(e) => {
                    setCatName(e.target.value);
                    if (!editingCategory) {
                      setCatSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-"));
                    }
                  }}
                  className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-xs font-medium focus:border-[#17BBEF] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">URL Slug</label>
                  <input
                    type="text"
                    required
                    placeholder="headphones"
                    value={catSlug}
                    onChange={(e) => setCatSlug(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-xs font-mono focus:border-[#17BBEF] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Brand Focus</label>
                  <select
                    value={catBrand}
                    onChange={(e) =>
                      setCatBrand(e.target.value as "soundcore" | "anker" | "eufy" | "general")
                    }
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-xs font-medium bg-white focus:border-[#17BBEF] focus:outline-none"
                  >
                    <option value="soundcore">soundcore</option>
                    <option value="anker">Anker</option>
                    <option value="eufy">eufy</option>
                    <option value="general">General / Multi-Brand</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Description</label>
                <textarea
                  rows={2}
                  placeholder="Short merchandising description..."
                  value={catDescription}
                  onChange={(e) => setCatDescription(e.target.value)}
                  className="w-full px-3.5 py-2 border border-gray-200 rounded-xl text-xs font-medium focus:border-[#17BBEF] focus:outline-none resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 items-center">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Icon Symbol</label>
                  <select
                    value={catIcon}
                    onChange={(e) => setCatIcon(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-xs font-medium bg-white focus:border-[#17BBEF] focus:outline-none"
                  >
                    <option value="Headphones">Headphones</option>
                    <option value="Zap">Zap (Power / Charging)</option>
                    <option value="Shield">Shield (Security)</option>
                    <option value="Layers">Layers (Cleaning / Mowers)</option>
                    <option value="Radio">Radio (Party Speakers)</option>
                    <option value="HeartHandshake">Heart (Baby & Care)</option>
                  </select>
                </div>

                <div className="pt-4">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-gray-700">
                    <input
                      type="checkbox"
                      checked={catFeatured}
                      onChange={(e) => setCatFeatured(e.target.checked)}
                      className="rounded text-[#17BBEF] focus:ring-[#17BBEF]"
                    />
                    <span>Featured in MegaMenu</span>
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setShowCategoryModal(false)}
                  className="px-4 py-2 border border-gray-200 text-gray-600 text-xs font-bold rounded-xl hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-gray-900 hover:bg-black text-white text-xs font-bold rounded-xl transition"
                >
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Create/Edit Subcategory */}
      {showSubcategoryModal && parentCategoryForSub && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-100 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-5">
              <div>
                <h3 className="font-extrabold text-lg text-gray-900">
                  {editingSubcategory ? "Edit Subcategory" : "Add Subcategory"}
                </h3>
                <p className="text-xs text-gray-400">Under: {parentCategoryForSub.name}</p>
              </div>
              <button
                type="button"
                onClick={() => setShowSubcategoryModal(false)}
                className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleSaveSubcategory} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Subcategory Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Open-Ear Sport"
                  value={subName}
                  onChange={(e) => {
                    setSubName(e.target.value);
                    if (!editingSubcategory) {
                      setSubSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-"));
                    }
                  }}
                  className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-xs font-medium focus:border-[#17BBEF] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">URL Slug</label>
                <input
                  type="text"
                  required
                  placeholder="open-ear-sport"
                  value={subSlug}
                  onChange={(e) => setSubSlug(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-xs font-mono focus:border-[#17BBEF] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Description</label>
                <textarea
                  rows={2}
                  placeholder="Optional brief description..."
                  value={subDesc}
                  onChange={(e) => setSubDesc(e.target.value)}
                  className="w-full px-3.5 py-2 border border-gray-200 rounded-xl text-xs font-medium focus:border-[#17BBEF] focus:outline-none resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setShowSubcategoryModal(false)}
                  className="px-4 py-2 border border-gray-200 text-gray-600 text-xs font-bold rounded-xl hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-gray-900 hover:bg-black text-white text-xs font-bold rounded-xl transition"
                >
                  Save Subcategory
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
