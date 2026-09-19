"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Save,
  Package,
  Image as ImageIcon,
  DollarSign,
  FileText,
  Sliders,
  Search,
  Sparkles,
  Plus,
  Trash2,
  Check,
  Globe,
  ExternalLink,
  ChevronRight,
  RefreshCw,
  Star,
  Layers,
  Zap,
  Headphones,
  Shield,
} from "lucide-react";
import { CKEditorField } from "../editor/CKEditorField";
import { SeoOptimizationTool } from "../seo/SeoOptimizationTool";
import { formatSom, parseSom } from "@/lib/currency";
import type {
  FusionProduct,
  FusionCategory,
  FusionProductMedia,
  FusionTechSpecGroup,
} from "@/lib/cms/fusion-cms";

interface ProductDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  product: FusionProduct | null;
  categories: FusionCategory[];
  onSaveProduct: (savedProduct: FusionProduct) => void;
}

type TabKey = "general" | "media" | "pricing" | "overview" | "specs" | "seo";

export function ProductDrawer({
  isOpen,
  onClose,
  product,
  categories,
  onSaveProduct,
}: ProductDrawerProps) {
  const [activeTab, setActiveTab] = useState<TabKey>("general");

  // Form State
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [slug, setSlug] = useState("");
  const [slugLocked, setSlugLocked] = useState(true);
  const [sku, setSku] = useState("");
  const [brand, setBrand] = useState<string>("soundcore");
  const [categoryId, setCategoryId] = useState("");
  const [subcategoryId, setSubcategoryId] = useState("");
  const [status, setStatus] = useState<"published" | "draft" | "archived">("published");

  // Pricing & Stock
  const [price, setPrice] = useState("");
  const [numericPrice, setNumericPrice] = useState(0);
  const [wasPrice, setWasPrice] = useState("");
  const [discountPill, setDiscountPill] = useState("");
  const [currency, setCurrency] = useState("so'm");
  const [stock, setStock] = useState(15);
  const [inventoryStatus, setInventoryStatus] = useState<
    "in_stock" | "low_stock" | "out_of_stock" | "pre_order"
  >("in_stock");
  const [lowStockThreshold, setLowStockThreshold] = useState(5);

  // Badges
  const [badges, setBadges] = useState<string[]>([]);

  // Media
  const [mainImage, setMainImage] = useState("/images/1204_black.png");
  const [gallery, setGallery] = useState<FusionProductMedia[]>([]);
  const [newImageUrl, setNewImageUrl] = useState("");
  const [newImageAlt, setNewImageAlt] = useState("");
  const [newImageColor, setNewImageColor] = useState("");

  // Overview CKEditor
  const [overviewHtml, setOverviewHtml] = useState("");

  // Specs
  const [specGroups, setSpecGroups] = useState<FusionTechSpecGroup[]>([]);

  // SEO
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [focusKeyword, setFocusKeyword] = useState("");

  // Quick preset image selector
  const PRESET_IMAGES = [
    { label: "Liberty 5 Pro Max Black", url: "/images/1204_black.png" },
    { label: "soundcore P42i", url: "/images/d1205_pc_1664x640_2.png" },
    { label: "Anker Prime 26K 300W", url: "/images/frame_2121237348.png" },
    { label: "Anker Prime 160W Charger", url: "/images/chargers_-_a2687.png" },
    { label: "Anker 3-in-1 Wireless MagGo", url: "/images/frame_2147238602.png" },
    { label: "eufyCam C37 Solar 4K", url: "/images/t814x_banner_listing_image_01_no_copy_1060x1060px_3.png" },
    { label: "eufy Indoor Cam C31", url: "/images/frame_2147226853-1.png" },
    { label: "eufy Robot Mower E15", url: "/images/lawn_mowers_-_eufy_robot_mower_e15_-_t2880_1.png" },
    { label: "eufy Baby Bottle Washer", url: "/images/frame_2147238600.png" },
    { label: "soundcore Rave 3S Party", url: "/images/speakers_-_rave_3s_-_a31a3_1.png" },
  ];

  // Populate when drawer opens or product changes
  useEffect(() => {
    if (product) {
      setTitle(product.title || "");
      setSubtitle(product.subtitle || "");
      setSlug(product.slug || "");
      setSlugLocked(true);
      setSku(product.sku || "");
      setBrand(product.brand || "soundcore");
      setCategoryId(product.categoryId || (categories[0]?.id ?? ""));
      setSubcategoryId(product.subcategoryId || "");
      setStatus(product.status || "published");

      setPrice(product.price ? formatSom(product.price) : "");
      setNumericPrice(product.numericPrice || parseSom(product.price));
      setWasPrice(product.wasPrice ? formatSom(product.wasPrice) : "");
      setDiscountPill(product.discountPill || "");
      setCurrency(product.currency || "so'm");
      setStock(product.stock ?? 15);
      setInventoryStatus(product.inventoryStatus || "in_stock");
      setLowStockThreshold(product.lowStockThreshold ?? 5);

      setBadges(product.badges || []);
      setMainImage(product.image || "/images/1204_black.png");
      setGallery(
        product.gallery && product.gallery.length > 0
          ? product.gallery
          : [
              {
                id: "g-main",
                url: product.image || "/images/1204_black.png",
                altText: product.title,
                isPrimary: true,
                sortOrder: 1,
              },
            ]
      );
      setOverviewHtml(
        product.overviewHtml ||
          `<h2>${product.title} Overview</h2><p>${product.subtitle || ""}</p>`
      );
      setSpecGroups(product.specGroups || []);
      setMetaTitle(product.seo?.metaTitle || product.title);
      setMetaDescription(
        product.seo?.metaDescription || product.subtitle || ""
      );
      setFocusKeyword(product.seo?.focusKeyword || "");
    } else {
      // Create new empty product defaults
      const defaultCat = categories[0];
      const initialCatId = defaultCat?.id || "cat-headphones";
      setTitle("");
      setSubtitle("");
      setSlug("");
      setSlugLocked(false);
      setSku(`A${Math.floor(1000 + Math.random() * 9000)}H11`);
      setBrand("soundcore");
      setCategoryId(initialCatId);
      setSubcategoryId(defaultCat?.subcategories[0]?.id || "");
      setStatus("published");

      setPrice("665 000 so'm");
      setNumericPrice(665000);
      setWasPrice("");
      setDiscountPill("");
      setCurrency("so'm");
      setStock(25);
      setInventoryStatus("in_stock");
      setLowStockThreshold(5);

      setBadges(["New"]);
      setMainImage("/images/1204_black.png");
      setGallery([
        {
          id: "g-1",
          url: "/images/1204_black.png",
          altText: "Product Photo",
          isPrimary: true,
          sortOrder: 1,
        },
      ]);
      setOverviewHtml(`
        <h2>Product Overview</h2>
        <p>Introducing the latest innovation in audio and electronics, designed specifically for the Nordic lifestyle.</p>
        <ul>
          <li><strong>High-Performance Hardware:</strong> Built with premium materials.</li>
          <li><strong>Fast Charging & Long Battery:</strong> Engineered for non-stop performance.</li>
        </ul>
      `);
      setSpecGroups([
        {
          id: "sg-1",
          groupName: "General Specifications",
          items: [
            { key: "Dimensions", value: "Standard compact format" },
            { key: "Warranty", value: "24-Month Official Nordic Warranty" },
          ],
        },
      ]);
      setMetaTitle("");
      setMetaDescription("");
      setFocusKeyword("");
    }
  }, [product, categories, isOpen]);

  if (!isOpen) return null;

  // Selected Category Object
  const selectedCat = categories.find((c) => c.id === categoryId);

  // Auto Generate SKU
  const handleGenerateSku = () => {
    const brandPrefix =
      brand === "soundcore" ? "A" : brand === "eufy" ? "T" : "B";
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    setSku(`${brandPrefix}${randomNum}G11`);
  };

  // Auto calculate discount with so'm
  const handlePriceChange = (newPriceStr: string) => {
    setPrice(newPriceStr);
    const num = parseSom(newPriceStr);
    if (num > 0) {
      setNumericPrice(num);
      if (wasPrice) {
        const wasNum = parseSom(wasPrice);
        if (wasNum > num) {
          const discountPct = Math.round(((wasNum - num) / wasNum) * 100);
          setDiscountPill(`-${discountPct}%`);
        }
      }
    }
  };

  const handleWasPriceChange = (newWasStr: string) => {
    setWasPrice(newWasStr);
    const wasNum = parseSom(newWasStr);
    if (wasNum > 0 && numericPrice > 0 && wasNum > numericPrice) {
      const discountPct = Math.round(((wasNum - numericPrice) / wasNum) * 100);
      setDiscountPill(`-${discountPct}%`);
    } else {
      setDiscountPill("");
    }
  };

  // Toggle Badges
  const toggleBadge = (badge: string) => {
    setBadges((prev) =>
      prev.includes(badge) ? prev.filter((b) => b !== badge) : [...prev, badge]
    );
  };

  // Add Photo to Gallery
  const handleAddGalleryImage = () => {
    if (!newImageUrl.trim()) return;
    const newMedia: FusionProductMedia = {
      id: `img-${Date.now()}`,
      url: newImageUrl.trim(),
      altText: newImageAlt.trim() || title || "Product image",
      colorway: newImageColor.trim() || undefined,
      isPrimary: gallery.length === 0,
      sortOrder: gallery.length + 1,
    };
    setGallery([...gallery, newMedia]);
    if (gallery.length === 0) {
      setMainImage(newMedia.url);
    }
    setNewImageUrl("");
    setNewImageAlt("");
    setNewImageColor("");
  };

  const handleSetPrimaryImage = (img: FusionProductMedia) => {
    setMainImage(img.url);
    setGallery((prev) =>
      prev.map((item) => ({
        ...item,
        isPrimary: item.id === img.id,
      }))
    );
  };

  const handleRemoveImage = (imgId: string) => {
    const updated = gallery.filter((item) => item.id !== imgId);
    setGallery(updated);
    if (updated.length > 0 && !updated.some((i) => i.isPrimary)) {
      updated[0].isPrimary = true;
      setMainImage(updated[0].url);
    }
  };

  // Tech Specs Preset Loaders
  const loadSpecPreset = (presetType: "audio" | "charging" | "security" | "vacuum") => {
    if (presetType === "audio") {
      setSpecGroups([
        {
          id: `sg-${Date.now()}-1`,
          groupName: "Acoustics & Drivers",
          items: [
            { key: "Driver Unit", value: "11mm Dual Coaxial Dynamic Drivers" },
            { key: "Frequency Response", value: "20 Hz - 40 kHz (Hi-Res LDAC)" },
            { key: "Active Noise Cancellation", value: "Adaptive ANC 3.0 (-50dB depth)" },
            { key: "Codecs", value: "LDAC, AAC, SBC, LC3" },
          ],
        },
        {
          id: `sg-${Date.now()}-2`,
          groupName: "Battery & Charging",
          items: [
            { key: "Playtime", value: "10 hours (Buds) / 50 hours total with Case" },
            { key: "Fast Charging", value: "10 minutes charge = 4 hours playback" },
            { key: "Charging Method", value: "USB-C & Qi Wireless Charging" },
          ],
        },
      ]);
    } else if (presetType === "charging") {
      setSpecGroups([
        {
          id: `sg-${Date.now()}-1`,
          groupName: "Power Specifications",
          items: [
            { key: "Total Wattage", value: "140W - 250W Max Multi-Port" },
            { key: "Ports", value: "3 × USB-C, 1 × USB-A" },
            { key: "GaN Technology", value: "Anker GaNPrime™ with ActiveShield 2.0" },
          ],
        },
      ]);
    } else if (presetType === "security") {
      setSpecGroups([
        {
          id: `sg-${Date.now()}-1`,
          groupName: "Optics & Camera",
          items: [
            { key: "Resolution", value: "4K UHD (3840×2160) Dual Camera" },
            { key: "Night Vision", value: "Full-Color Starlight Sensor with Spotlight" },
            { key: "Power Source", value: "Integrated Solar Panel + 13,400mAh Battery" },
            { key: "AI Recognition", value: "BionicMind™ Local AI Human, Vehicle & Pet" },
          ],
        },
      ]);
    } else {
      setSpecGroups([
        {
          id: `sg-${Date.now()}-1`,
          groupName: "Cleaning & Navigation",
          items: [
            { key: "Navigation", value: "RTK-GNSS + Stereo Vision AI Obstacle Avoidance" },
            { key: "Suction / Cutting Area", value: "Up to 1,500 m² or 8,000 Pa Suction" },
            { key: "Battery", value: "Li-ion Long Endurance with Auto-Docking" },
          ],
        },
      ]);
    }
  };

  // Add Spec Row
  const handleAddSpecRow = (groupId: string) => {
    setSpecGroups((prev) =>
      prev.map((g) =>
        g.id === groupId
          ? {
              ...g,
              items: [...g.items, { key: "New Parameter", value: "Specification value" }],
            }
          : g
      )
    );
  };

  // Update Spec Row
  const handleUpdateSpecRow = (
    groupId: string,
    rowIndex: number,
    field: "key" | "value",
    val: string
  ) => {
    setSpecGroups((prev) =>
      prev.map((g) =>
        g.id === groupId
          ? {
              ...g,
              items: g.items.map((item, idx) =>
                idx === rowIndex ? { ...item, [field]: val } : item
              ),
            }
          : g
      )
    );
  };

  // Remove Spec Row
  const handleRemoveSpecRow = (groupId: string, rowIndex: number) => {
    setSpecGroups((prev) =>
      prev.map((g) =>
        g.id === groupId
          ? {
              ...g,
              items: g.items.filter((_, idx) => idx !== rowIndex),
            }
          : g
      )
    );
  };

  // Add Spec Group
  const handleAddSpecGroup = () => {
    setSpecGroups((prev) => [
      ...prev,
      {
        id: `sg-${Date.now()}`,
        groupName: "New Specifications Group",
        items: [{ key: "Feature", value: "Detail description" }],
      },
    ]);
  };

  // Remove Spec Group
  const handleRemoveSpecGroup = (groupId: string) => {
    setSpecGroups((prev) => prev.filter((g) => g.id !== groupId));
  };

  // Save Final Product
  const handleSave = () => {
    if (!title.trim()) {
      alert("Please provide a product title.");
      setActiveTab("general");
      return;
    }

    const finalSlug =
      slug.trim() || title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const chosenCategory =
      categories.find((c) => c.id === categoryId)?.name || "Charging";
    const chosenSubcategory =
      selectedCat?.subcategories.find((s) => s.id === subcategoryId)?.name ||
      "";

    const saved: FusionProduct = {
      id: product?.id || `prod-${Date.now()}`,
      slug: finalSlug,
      title: title.trim(),
      subtitle: subtitle.trim() || undefined,
      sku: sku.trim() || "A0000G11",
      brand,
      brandDisplay:
        brand === "soundcore"
          ? "soundcore by Anker"
          : brand === "eufy"
          ? "eufy Security"
          : "Anker Prime",
      categoryId: categoryId || "cat-headphones",
      category: chosenCategory,
      subcategoryId: subcategoryId || undefined,
      subcategory: chosenSubcategory || undefined,
      price: formatSom(numericPrice || price),
      numericPrice: numericPrice || parseSom(price),
      wasPrice: wasPrice ? formatSom(wasPrice) : undefined,
      discountPill: discountPill || undefined,
      currency: "so'm",
      stock,
      inventoryStatus,
      lowStockThreshold,
      status,
      badges,
      image: mainImage || "/images/1204_black.png",
      gallery,
      overviewHtml,
      specGroups,
      seo: {
        metaTitle: metaTitle || `${title} | Anker Nordics`,
        metaDescription:
          metaDescription ||
          subtitle ||
          `Buy ${title} with official Nordic warranty and express delivery.`,
        focusKeyword,
        ogImage: mainImage || "/images/1204_black.png",
      },
      updatedAt: new Date().toISOString().split("T")[0],
    };

    onSaveProduct(saved);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div className="w-full max-w-4xl bg-white h-full shadow-2xl flex flex-col border-l border-gray-200 animate-in slide-in-from-right duration-300">
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-gray-200 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-100 rounded-xl">
              <Package className="h-5 w-5 text-gray-700" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-extrabold text-base sm:text-lg text-gray-900 line-clamp-1">
                  {product ? `Edit: ${product.title}` : "Create New Product"}
                </h2>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-gray-100 text-gray-600">
                  {sku}
                </span>
              </div>
              <p className="text-xs text-gray-400">
                {product ? "Update specifications, pricing, gallery, and CKEditor overview" : "Add complete flagship product with all technical details"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-2 border border-gray-200 text-gray-600 hover:bg-gray-100 rounded-xl text-xs font-bold transition"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="flex items-center gap-1.5 px-5 py-2 bg-gray-900 hover:bg-black text-white rounded-xl text-xs font-bold transition shadow-sm hover:shadow"
            >
              <Save className="h-4 w-4" />
              <span>Save & Publish</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation Strip */}
        <div className="flex items-center gap-1 px-5 border-b border-gray-200 bg-gray-50/80 overflow-x-auto shrink-0 py-2">
          {[
            { key: "general", label: "General Info", icon: Sliders },
            { key: "media", label: "Media & Gallery", icon: ImageIcon },
            { key: "pricing", label: "Pricing & Stock", icon: DollarSign },
            { key: "overview", label: "CKEditor Overview", icon: FileText },
            { key: "specs", label: "Tech Specs Builder", icon: Layers },
            { key: "seo", label: "Badges & SEO", icon: Globe },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key as TabKey)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition ${
                  isActive
                    ? "bg-white text-gray-900 shadow-2xs border border-gray-200/80"
                    : "text-gray-500 hover:text-gray-900 hover:bg-gray-200/50"
                }`}
              >
                <Icon className={`h-3.5 w-3.5 ${isActive ? "text-[#17BBEF]" : "text-gray-400"}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Body (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6 bg-[#FAFBFD]">
          {/* TAB 1: GENERAL INFO */}
          {activeTab === "general" && (
            <div className="space-y-5 bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs">
              <h3 className="text-sm font-extrabold text-gray-900 border-b border-gray-100 pb-3">
                1. General Product Identification & Taxonomy
              </h3>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Product Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Liberty 5 Pro Max｜AI Recording Earbuds with Smart Case"
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                      if (!product && !slugLocked) {
                        setSlug(
                          e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-")
                        );
                      }
                    }}
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-xs font-semibold text-gray-900 focus:border-[#17BBEF] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Marketing Subtitle / Tagline
                  </label>
                  <input
                    type="text"
                    placeholder='e.g. Real-time AI Note-Taker with 1.78" AMOLED Display'
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-xs font-medium text-gray-700 focus:border-[#17BBEF] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Brand Ecosystem
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: "soundcore", label: "soundcore" },
                      { id: "anker", label: "Anker" },
                      { id: "eufy", label: "eufy" },
                    ].map((b) => (
                      <button
                        key={b.id}
                        type="button"
                        onClick={() => setBrand(b.id)}
                        className={`py-2 text-xs font-bold rounded-xl border transition ${
                          brand === b.id
                            ? "bg-gray-900 text-white border-gray-900 shadow-xs"
                            : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                        }`}
                      >
                        {b.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-bold text-gray-700">SKU Code</label>
                    <button
                      type="button"
                      onClick={handleGenerateSku}
                      className="text-[11px] text-[#17BBEF] hover:underline flex items-center gap-1 font-semibold"
                    >
                      <RefreshCw className="h-3 w-3" />
                      Auto-generate
                    </button>
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="A3954H11"
                    value={sku}
                    onChange={(e) => setSku(e.target.value)}
                    className="w-full px-3.5 py-2 border border-gray-200 rounded-xl text-xs font-mono font-bold focus:border-[#17BBEF] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Category Selection
                  </label>
                  <select
                    value={categoryId}
                    onChange={(e) => {
                      setCategoryId(e.target.value);
                      const targetCat = categories.find((c) => c.id === e.target.value);
                      setSubcategoryId(targetCat?.subcategories[0]?.id || "");
                    }}
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-xs font-medium bg-white focus:border-[#17BBEF] focus:outline-none"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name} ({c.brand})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Subcategory Selection
                  </label>
                  <select
                    value={subcategoryId}
                    onChange={(e) => setSubcategoryId(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-xs font-medium bg-white focus:border-[#17BBEF] focus:outline-none"
                  >
                    {selectedCat?.subcategories.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    )) || <option value="">No subcategories</option>}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-gray-100">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-bold text-gray-700">URL Slug</label>
                    <button
                      type="button"
                      onClick={() => setSlugLocked(!slugLocked)}
                      className="text-[11px] text-gray-400 hover:text-gray-700"
                    >
                      {slugLocked ? "Unlock Slug" : "Lock Slug"}
                    </button>
                  </div>
                  <div className="flex items-center">
                    <span className="px-3 py-2 bg-gray-100 border border-r-0 border-gray-200 rounded-l-xl text-[11px] font-mono text-gray-400">
                      /products/
                    </span>
                    <input
                      type="text"
                      disabled={slugLocked}
                      placeholder="d1204"
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-r-xl text-xs font-mono font-medium focus:border-[#17BBEF] focus:outline-none disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Publication Status
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: "published", label: "Published", color: "text-emerald-700 bg-emerald-50 border-emerald-200" },
                      { id: "draft", label: "Draft", color: "text-amber-700 bg-amber-50 border-amber-200" },
                      { id: "archived", label: "Archived", color: "text-gray-700 bg-gray-100 border-gray-200" },
                    ].map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => setStatus(s.id as any)}
                        className={`py-2 text-xs font-bold rounded-xl border transition ${
                          status === s.id
                            ? `${s.color} ring-2 ring-gray-900/10 font-extrabold`
                            : "bg-white text-gray-500 border-gray-200 hover:bg-gray-50"
                        }`}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: MEDIA & GALLERY */}
          {activeTab === "media" && (
            <div className="space-y-5 bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs">
              <h3 className="text-sm font-extrabold text-gray-900 border-b border-gray-100 pb-3">
                2. Product Photos & Multi-Angle Media Gallery
              </h3>

              {/* Primary Image Preview */}
              <div className="flex flex-col sm:flex-row items-center gap-5 p-4 rounded-xl bg-gray-50 border border-gray-200">
                <div className="h-32 w-32 relative rounded-xl bg-white border border-gray-200 flex items-center justify-center p-2 shadow-2xs shrink-0">
                  <img
                    src={mainImage}
                    alt="Main product"
                    className="max-h-full max-w-full object-contain"
                  />
                  <span className="absolute bottom-1 right-1 px-1.5 py-0.5 bg-black text-white text-[9px] font-bold rounded">
                    Primary
                  </span>
                </div>
                <div className="flex-1 space-y-2 text-center sm:text-left">
                  <h4 className="text-xs font-bold text-gray-900">Primary Showcase Image</h4>
                  <p className="text-xs text-gray-500">
                    This thumbnail represents the product on category listing grids, mega-menus, and storefront checkout carts.
                  </p>
                  <input
                    type="text"
                    value={mainImage}
                    onChange={(e) => setMainImage(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs font-mono border border-gray-200 rounded-lg bg-white focus:border-[#17BBEF] focus:outline-none"
                  />
                </div>
              </div>

              {/* Quick Anker Asset Presets */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2">
                  Quick Select Official Asset
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {PRESET_IMAGES.map((img) => (
                    <button
                      key={img.url}
                      type="button"
                      onClick={() => {
                        setMainImage(img.url);
                        if (!gallery.some((g) => g.url === img.url)) {
                          setGallery([
                            ...gallery,
                            {
                              id: `g-${Date.now()}`,
                              url: img.url,
                              altText: img.label,
                              isPrimary: false,
                              sortOrder: gallery.length + 1,
                            },
                          ]);
                        }
                      }}
                      className="px-2.5 py-1 text-[11px] font-medium rounded-lg border border-gray-200 bg-white hover:bg-gray-100 text-gray-700 transition"
                    >
                      {img.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Add New Gallery Item */}
              <div className="p-4 rounded-xl border border-dashed border-gray-300 bg-gray-50/50 space-y-3">
                <h4 className="text-xs font-bold text-gray-700">Add Photo to Product Gallery</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input
                    type="text"
                    placeholder="Image URL (e.g. /images/1204_black.png)"
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                    className="px-3 py-2 border border-gray-200 rounded-xl text-xs bg-white focus:border-[#17BBEF] focus:outline-none sm:col-span-2"
                  />
                  <input
                    type="text"
                    placeholder="Colorway tag (e.g. Black, Gold)"
                    value={newImageColor}
                    onChange={(e) => setNewImageColor(e.target.value)}
                    className="px-3 py-2 border border-gray-200 rounded-xl text-xs bg-white focus:border-[#17BBEF] focus:outline-none"
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleAddGalleryImage}
                    className="flex items-center gap-1 px-4 py-1.5 bg-gray-900 hover:bg-black text-white rounded-xl text-xs font-bold transition"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Add to Gallery</span>
                  </button>
                </div>
              </div>

              {/* Gallery Grid */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2">
                  Gallery Showcase ({gallery.length} photos)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {gallery.map((item) => (
                    <div
                      key={item.id}
                      className={`relative group rounded-xl border p-2 bg-white flex flex-col items-center justify-center text-center transition ${
                        item.url === mainImage
                          ? "border-[#17BBEF] ring-2 ring-[#17BBEF]/20 shadow-xs"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="h-24 w-full flex items-center justify-center p-1">
                        <img
                          src={item.url}
                          alt={item.altText}
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                      <div className="mt-2 text-[10px] font-medium text-gray-500 truncate max-w-full">
                        {item.colorway ? `Color: ${item.colorway}` : "Standard"}
                      </div>
                      <div className="mt-2 flex items-center gap-1.5">
                        {item.url !== mainImage && (
                          <button
                            type="button"
                            onClick={() => handleSetPrimaryImage(item)}
                            className="px-2 py-0.5 text-[10px] font-bold rounded bg-gray-100 hover:bg-black hover:text-white transition"
                          >
                            Set Primary
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(item.id)}
                          className="p-1 text-gray-400 hover:text-red-600 rounded transition"
                          title="Remove photo"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: PRICING & INVENTORY */}
          {activeTab === "pricing" && (
            <div className="space-y-5 bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs">
              <h3 className="text-sm font-extrabold text-gray-900 border-b border-gray-100 pb-3">
                3. Commercial Pricing & Inventory Thresholds
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Display Price (so&apos;m) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="665 000 so'm"
                    value={price}
                    onChange={(e) => handlePriceChange(e.target.value)}
                    onBlur={() => {
                      if (price) {
                        const formatted = formatSom(price);
                        setPrice(formatted);
                      }
                    }}
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-xs font-mono font-extrabold text-gray-900 focus:border-[#17BBEF] focus:outline-none"
                  />
                  <span className="text-[11px] text-gray-400 mt-1 block">
                    Numeric value: {numericPrice.toLocaleString()} so&apos;m
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Original &quot;Was&quot; Price (so&apos;m)
                  </label>
                  <input
                    type="text"
                    placeholder="799 000 so'm"
                    value={wasPrice}
                    onChange={(e) => handleWasPriceChange(e.target.value)}
                    onBlur={() => {
                      if (wasPrice) {
                        const formatted = formatSom(wasPrice);
                        setWasPrice(formatted);
                      }
                    }}
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-xs font-mono font-medium text-gray-600 focus:border-[#17BBEF] focus:outline-none"
                  />
                  {discountPill && (
                    <span className="inline-block px-2 py-0.5 mt-1 bg-red-100 text-red-700 text-[10px] font-bold rounded">
                      Savings Pill: {discountPill}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Currency Code
                  </label>
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-xs font-bold bg-white focus:border-[#17BBEF] focus:outline-none"
                  >
                    <option value="so'm">so&apos;m (Uzbekistan Som)</option>
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="SEK">SEK (Nordic kr)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-gray-100">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Inventory Stock Count
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={stock}
                    onChange={(e) => {
                      const val = parseInt(e.target.value, 10) || 0;
                      setStock(val);
                      if (val === 0) setInventoryStatus("out_of_stock");
                      else if (val <= lowStockThreshold) setInventoryStatus("low_stock");
                      else setInventoryStatus("in_stock");
                    }}
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-xs font-mono font-bold focus:border-[#17BBEF] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Low Stock Threshold
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={lowStockThreshold}
                    onChange={(e) => setLowStockThreshold(parseInt(e.target.value, 10) || 5)}
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-xs font-mono focus:border-[#17BBEF] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Availability Status
                  </label>
                  <select
                    value={inventoryStatus}
                    onChange={(e) => setInventoryStatus(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-xs font-bold bg-white focus:border-[#17BBEF] focus:outline-none"
                  >
                    <option value="in_stock">In Stock (Available)</option>
                    <option value="low_stock">Low Stock Warning</option>
                    <option value="out_of_stock">Out of Stock</option>
                    <option value="pre_order">Pre-Order / Backorder</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: CKEDITOR 5 WYSIWYG OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-4 bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-3">
                <div>
                  <h3 className="text-sm font-extrabold text-gray-900">
                    4. Rich Product Overview & Narrative (CKEditor 5)
                  </h3>
                  <p className="text-xs text-gray-400">
                    Compose formatted headings, feature lists, callouts, and comparisons.
                  </p>
                </div>

                {/* Template Insert Buttons */}
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] font-bold text-gray-400">Templates:</span>
                  <button
                    type="button"
                    onClick={() =>
                      setOverviewHtml((prev) => `${prev}
                        <h2>Engineered for Nordic Audio Excellence</h2>
                        <p>Immerse yourself in authentic studio sound powered by dual coaxial drivers and advanced ANC 3.0.</p>
                        <ul>
                          <li><strong>Real-time AI Audio:</strong> Adaptive noise calibration.</li>
                          <li><strong>All-Day Battery:</strong> Up to 50 hours playtime.</li>
                        </ul>
                      `)
                    }
                    className="px-2.5 py-1 text-[11px] font-semibold bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 transition"
                  >
                    + Audio Block
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setOverviewHtml((prev) => `${prev}
                        <h2>Extreme Fast-Charging Power</h2>
                        <p>High-efficiency GaN architecture with ActiveShield™ 2.0 temperature monitoring.</p>
                        <ul>
                          <li><strong>Multi-Device Fast Charging:</strong> High wattage redistribution.</li>
                          <li><strong>Universal Compatibility:</strong> Works across Apple, Windows, and Android.</li>
                        </ul>
                      `)
                    }
                    className="px-2.5 py-1 text-[11px] font-semibold bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 transition"
                  >
                    + Power Block
                  </button>
                </div>
              </div>

              {/* CKEditor 5 Component */}
              <CKEditorField
                label="Product Detail Page (PDP) Overview HTML"
                value={overviewHtml}
                onChange={setOverviewHtml}
                placeholder="Draft compelling marketing copy, feature bullet points, and technical overviews..."
                minHeight="320px"
              />
            </div>
          )}

          {/* TAB 5: TECH SPECS BUILDER */}
          {activeTab === "specs" && (
            <div className="space-y-5 bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-3">
                <div>
                  <h3 className="text-sm font-extrabold text-gray-900">
                    5. Dynamic Technical Specifications Builder
                  </h3>
                  <p className="text-xs text-gray-400">
                    Organize acoustic, charging, wireless, or camera specs into clean accordion sections.
                  </p>
                </div>

                {/* Preset Loaders */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[11px] font-bold text-gray-400">Presets:</span>
                  <button
                    type="button"
                    onClick={() => loadSpecPreset("audio")}
                    className="px-2.5 py-1 text-[11px] font-semibold bg-cyan-50 text-cyan-700 border border-cyan-200 rounded-lg hover:bg-cyan-100 transition"
                  >
                    Audio Preset
                  </button>
                  <button
                    type="button"
                    onClick={() => loadSpecPreset("charging")}
                    className="px-2.5 py-1 text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200 rounded-lg hover:bg-blue-100 transition"
                  >
                    Charging Preset
                  </button>
                  <button
                    type="button"
                    onClick={() => loadSpecPreset("security")}
                    className="px-2.5 py-1 text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg hover:bg-emerald-100 transition"
                  >
                    Security Preset
                  </button>
                  <button
                    type="button"
                    onClick={() => loadSpecPreset("vacuum")}
                    className="px-2.5 py-1 text-[11px] font-semibold bg-purple-50 text-purple-700 border border-purple-200 rounded-lg hover:bg-purple-100 transition"
                  >
                    Mower/Vacuum Preset
                  </button>
                </div>
              </div>

              {/* Spec Groups List */}
              <div className="space-y-4">
                {specGroups.map((group) => (
                  <div
                    key={group.id}
                    className="border border-gray-200 rounded-xl overflow-hidden bg-gray-50/50"
                  >
                    <div className="p-3 bg-gray-100/80 border-b border-gray-200 flex items-center justify-between">
                      <input
                        type="text"
                        value={group.groupName}
                        onChange={(e) => {
                          const newName = e.target.value;
                          setSpecGroups((prev) =>
                            prev.map((g) =>
                              g.id === group.id ? { ...g, groupName: newName } : g
                            )
                          );
                        }}
                        className="bg-transparent font-bold text-xs text-gray-900 focus:outline-none focus:bg-white px-2 py-1 rounded"
                      />

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleAddSpecRow(group.id)}
                          className="flex items-center gap-1 px-2 py-1 bg-white hover:bg-gray-100 text-gray-700 text-[11px] font-bold rounded-lg border border-gray-200 transition"
                        >
                          <Plus className="h-3 w-3" />
                          Add Row
                        </button>
                        <button
                          type="button"
                          onClick={() => handleRemoveSpecGroup(group.id)}
                          className="p-1 text-gray-400 hover:text-red-600 rounded transition"
                          title="Delete group"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="p-3 space-y-2 bg-white">
                      {group.items.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <input
                            type="text"
                            placeholder="Specification Key (e.g. Battery Life)"
                            value={item.key}
                            onChange={(e) =>
                              handleUpdateSpecRow(group.id, idx, "key", e.target.value)
                            }
                            className="w-1/3 px-3 py-1.5 text-xs font-semibold border border-gray-200 rounded-lg focus:border-[#17BBEF] focus:outline-none"
                          />
                          <input
                            type="text"
                            placeholder="Specification Value (e.g. 50 Hours total)"
                            value={item.value}
                            onChange={(e) =>
                              handleUpdateSpecRow(group.id, idx, "value", e.target.value)
                            }
                            className="flex-1 px-3 py-1.5 text-xs text-gray-700 border border-gray-200 rounded-lg focus:border-[#17BBEF] focus:outline-none"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveSpecRow(group.id, idx)}
                            className="p-1 text-gray-400 hover:text-red-500 rounded"
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={handleAddSpecGroup}
                  className="w-full py-2.5 border border-dashed border-gray-300 hover:border-gray-400 rounded-xl text-xs font-bold text-gray-600 hover:text-gray-900 bg-white transition flex items-center justify-center gap-1.5"
                >
                  <Plus className="h-4 w-4" />
                  Add Specification Category Group
                </button>
              </div>
            </div>
          )}

          {/* TAB 6: BADGES & SEO */}
          {activeTab === "seo" && (
            <div className="space-y-5 bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs">
              <h3 className="text-sm font-extrabold text-gray-900 border-b border-gray-100 pb-3">
                6. Merchandising Badges & Search Engine Optimization
              </h3>

              {/* Status Badges Selector */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2">
                  Storefront Merchandising Badges
                </label>
                <div className="flex flex-wrap gap-2">
                  {["New", "Best Seller", "Hot", "Sale", "Exclusive", "AI Powered"].map((b) => {
                    const isSelected = badges.includes(b);
                    return (
                      <button
                        key={b}
                        type="button"
                        onClick={() => toggleBadge(b)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 border ${
                          isSelected
                            ? "bg-gray-900 text-white border-gray-900 shadow-2xs"
                            : "bg-white text-gray-600 border-gray-200 hover:bg-gray-100"
                        }`}
                      >
                        {isSelected && <Check className="h-3 w-3" />}
                        <span>{b}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Advanced SEO Optimization Tool with Score Gauge & Multi-Channel Previews */}
              <div className="pt-2">
                <SeoOptimizationTool
                  title={title}
                  slug={slug}
                  metaTitle={metaTitle}
                  metaDescription={metaDescription}
                  focusKeyword={focusKeyword}
                  contentHtml={overviewHtml}
                  images={gallery.map((g) => ({ url: g.url, altText: g.altText }))}
                  onChangeMetaTitle={setMetaTitle}
                  onChangeMetaDescription={setMetaDescription}
                  onChangeFocusKeyword={setFocusKeyword}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
