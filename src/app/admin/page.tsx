"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  LayoutDashboard,
  Package,
  FolderTree,
  Users,
  FileText,
  Shield,
  Plus,
  Search,
  ExternalLink,
  Edit,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Database,
  ArrowUpRight,
  TrendingUp,
  DollarSign,
  ShoppingBag,
  Sliders,
  Lock,
  Star,
  Eye,
  X,
  Tag,
  DownloadCloud,
  Sparkles,
} from "lucide-react";
import {
  INITIAL_FUSION_PRODUCTS,
  INITIAL_FUSION_CATEGORIES,
  INITIAL_FUSION_USERS,
  INITIAL_FUSION_BLOGS,
  INITIAL_FUSION_ROLES,
  INITIAL_FUSION_DISCOUNTS,
  type FusionProduct,
  type FusionCategory,
  type FusionUser,
  type FusionBlogPost,
  type FusionRole,
  type FusionDiscount,
} from "@/lib/cms/fusion-cms";
import { CategoryManager } from "@/components/admin/categories/CategoryManager";
import { ProductDrawer } from "@/components/admin/products/ProductDrawer";
import { CKEditorField } from "@/components/admin/editor/CKEditorField";
import { DiscountManager } from "@/components/admin/discounts/DiscountManager";
import { ProductImporterModal } from "@/components/admin/importer/ProductImporterModal";
import { SeoOptimizationTool } from "@/components/admin/seo/SeoOptimizationTool";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<
    "dashboard" | "products" | "categories" | "discounts" | "blogs" | "clients" | "roles"
  >("dashboard");

  // State with LocalStorage Persistence
  const [products, setProducts] = useState<FusionProduct[]>(INITIAL_FUSION_PRODUCTS);
  const [categories, setCategories] = useState<FusionCategory[]>(INITIAL_FUSION_CATEGORIES);
  const [discounts, setDiscounts] = useState<FusionDiscount[]>(INITIAL_FUSION_DISCOUNTS);
  const [users, setUsers] = useState<FusionUser[]>(INITIAL_FUSION_USERS);
  const [blogs, setBlogs] = useState<FusionBlogPost[]>(INITIAL_FUSION_BLOGS);
  const [roles, setRoles] = useState<FusionRole[]>(INITIAL_FUSION_ROLES);

  // Search queries
  const [productSearch, setProductSearch] = useState("");
  const [userSearch, setUserSearch] = useState("");
  const [blogSearch, setBlogSearch] = useState("");

  // Product Drawer & Importer State
  const [isProductDrawerOpen, setIsProductDrawerOpen] = useState(false);
  const [selectedProductForEdit, setSelectedProductForEdit] = useState<FusionProduct | null>(null);
  const [isImporterOpen, setIsImporterOpen] = useState(false);

  // Other Modal forms
  const [showUserModal, setShowUserModal] = useState(false);
  const [showBlogModal, setShowBlogModal] = useState(false);
  const [editingBlog, setEditingBlog] = useState<FusionBlogPost | null>(null);
  const [blogActiveSection, setBlogActiveSection] = useState<"editor" | "seo">("editor");

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "customer" as "admin" | "editor" | "customer",
    phone: "",
    address: "",
  });

  const [newBlog, setNewBlog] = useState({
    title: "",
    slug: "",
    excerpt: "",
    body: "",
    author: "Alex Lindqvist",
    category: "Guides & Tech",
    readTime: "4 min read",
    image: "/images/1204_black.png",
    metaTitle: "",
    metaDescription: "",
    focusKeyword: "",
  });

  // Load from local storage
  useEffect(() => {
    try {
      const p = localStorage.getItem("fusion_products");
      if (p) setProducts(JSON.parse(p));
      const c = localStorage.getItem("fusion_categories");
      if (c) setCategories(JSON.parse(c));
      const d = localStorage.getItem("fusion_discounts");
      if (d) setDiscounts(JSON.parse(d));
      const u = localStorage.getItem("fusion_users");
      if (u) setUsers(JSON.parse(u));
      const b = localStorage.getItem("fusion_blogs");
      if (b) setBlogs(JSON.parse(b));
    } catch {
      // Ignore
    }
  }, []);

  const saveProducts = (updated: FusionProduct[]) => {
    setProducts(updated);
    try {
      localStorage.setItem("fusion_products", JSON.stringify(updated));
    } catch {}
  };

  const saveCategories = (updated: FusionCategory[]) => {
    setCategories(updated);
    try {
      localStorage.setItem("fusion_categories", JSON.stringify(updated));
    } catch {}
  };

  const saveDiscounts = (updated: FusionDiscount[]) => {
    setDiscounts(updated);
    try {
      localStorage.setItem("fusion_discounts", JSON.stringify(updated));
    } catch {}
  };

  const saveUsers = (updated: FusionUser[]) => {
    setUsers(updated);
    try {
      localStorage.setItem("fusion_users", JSON.stringify(updated));
    } catch {}
  };

  const saveBlogs = (updated: FusionBlogPost[]) => {
    setBlogs(updated);
    try {
      localStorage.setItem("fusion_blogs", JSON.stringify(updated));
    } catch {}
  };

  // Open Create Product
  const handleOpenCreateProduct = () => {
    setSelectedProductForEdit(null);
    setIsProductDrawerOpen(true);
  };

  // Open Edit Product
  const handleOpenEditProduct = (prod: FusionProduct) => {
    setSelectedProductForEdit(prod);
    setIsProductDrawerOpen(true);
  };

  // Save Product from ProductDrawer
  const handleSaveProductFromDrawer = (saved: FusionProduct) => {
    const exists = products.some((p) => p.id === saved.id);
    if (exists) {
      saveProducts(products.map((p) => (p.id === saved.id ? saved : p)));
    } else {
      saveProducts([saved, ...products]);
    }
  };

  // Add User
  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUser.name || !newUser.email) return;
    const item: FusionUser = {
      id: `usr-${Date.now()}`,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      status: "active",
      createdAt: new Date().toISOString().split("T")[0],
      ordersCount: 0,
      totalSpent: "0 so'm",
      phone: newUser.phone,
      address: newUser.address,
    };
    saveUsers([item, ...users]);
    setShowUserModal(false);
    setNewUser({
      name: "",
      email: "",
      role: "customer",
      phone: "",
      address: "",
    });
  };

  // Open Create Blog
  const handleOpenCreateBlog = () => {
    setEditingBlog(null);
    setBlogActiveSection("editor");
    setNewBlog({
      title: "",
      slug: "",
      excerpt: "",
      body: `
        <h2>Article Introduction</h2>
        <p>Write your detailed product announcement or technical guide with CKEditor 5.</p>
        <ul>
          <li>Key feature highlights</li>
          <li>Nordic engineering test results</li>
        </ul>
      `,
      author: "Alex Lindqvist",
      category: "Guides & Tech",
      readTime: "4 min read",
      image: "/images/1204_black.png",
      metaTitle: "",
      metaDescription: "",
      focusKeyword: "",
    });
    setShowBlogModal(true);
  };

  // Open Edit Blog
  const handleOpenEditBlog = (blog: FusionBlogPost) => {
    setEditingBlog(blog);
    setBlogActiveSection("editor");
    setNewBlog({
      title: blog.title,
      slug: blog.slug,
      excerpt: blog.excerpt,
      body: blog.bodyHtml || blog.body || "",
      author: blog.author,
      category: blog.category,
      readTime: blog.readTime,
      image: blog.image,
      metaTitle: blog.seo?.metaTitle || blog.title,
      metaDescription: blog.seo?.metaDescription || blog.excerpt,
      focusKeyword: blog.seo?.focusKeyword || "",
    });
    setShowBlogModal(true);
  };

  // Save Blog
  const handleSaveBlog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBlog.title) return;

    const words = newBlog.body.replace(/<[^>]+>/g, " ").trim().split(/\s+/).length;
    const calculatedReadTime = `${Math.max(1, Math.ceil(words / 180))} min read`;

    const seoData = {
      metaTitle: newBlog.metaTitle || newBlog.title,
      metaDescription: newBlog.metaDescription || newBlog.excerpt,
      focusKeyword: newBlog.focusKeyword || "",
      ogImage: newBlog.image,
    };

    if (editingBlog) {
      const updated = blogs.map((b) =>
        b.id === editingBlog.id
          ? {
              ...b,
              title: newBlog.title,
              slug: newBlog.slug || newBlog.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
              excerpt: newBlog.excerpt,
              body: newBlog.body.replace(/<[^>]+>/g, " ").slice(0, 200) + "...",
              bodyHtml: newBlog.body,
              author: newBlog.author,
              category: newBlog.category,
              readTime: calculatedReadTime,
              image: newBlog.image,
              seo: seoData,
            }
          : b
      );
      saveBlogs(updated);
    } else {
      const item: FusionBlogPost = {
        id: `blog-${Date.now()}`,
        slug: newBlog.slug || newBlog.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        title: newBlog.title,
        excerpt: newBlog.excerpt,
        body: newBlog.body.replace(/<[^>]+>/g, " ").slice(0, 200) + "...",
        bodyHtml: newBlog.body,
        author: newBlog.author,
        category: newBlog.category,
        status: "published",
        publishedAt: new Date().toISOString().split("T")[0],
        readTime: calculatedReadTime,
        image: newBlog.image,
        seo: seoData,
      };
      saveBlogs([item, ...blogs]);
    }
    setShowBlogModal(false);
  };

  // Filtered queries
  const filteredProducts = products.filter(
    (p) =>
      p.title.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.category.toLowerCase().includes(productSearch.toLowerCase()) ||
      (p.subcategory && p.subcategory.toLowerCase().includes(productSearch.toLowerCase())) ||
      p.sku.toLowerCase().includes(productSearch.toLowerCase()) ||
      (p.brand && p.brand.toLowerCase().includes(productSearch.toLowerCase()))
  );

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.email.toLowerCase().includes(userSearch.toLowerCase())
  );

  const filteredBlogs = blogs.filter(
    (b) =>
      b.title.toLowerCase().includes(blogSearch.toLowerCase()) ||
      b.author.toLowerCase().includes(blogSearch.toLowerCase())
  );

  return (
    <div className="flex h-screen w-full bg-[#F7F8FA] text-gray-900 antialiased font-sans">
      {/* Product Drawer (6-tab modal for Create & Edit) */}
      <ProductDrawer
        isOpen={isProductDrawerOpen}
        onClose={() => setIsProductDrawerOpen(false)}
        product={selectedProductForEdit}
        categories={categories}
        onSaveProduct={handleSaveProductFromDrawer}
      />

      {/* Product Importer Modal (Scrape from URL & Extract Media/Specs) */}
      <ProductImporterModal
        isOpen={isImporterOpen}
        onClose={() => setIsImporterOpen(false)}
        onImportProduct={(imported) => {
          setIsImporterOpen(false);
          setSelectedProductForEdit(imported);
          setIsProductDrawerOpen(true);
        }}
      />

      {/* Sidebar Navigation */}
      <aside className="w-64 shrink-0 border-r border-gray-200 bg-white flex flex-col justify-between">
        <div>
          {/* FusionCMS Branding */}
          <div className="flex h-16 items-center gap-3 px-6 border-b border-gray-100">
            <div className="flex size-9 items-center justify-center rounded-xl bg-gray-900 text-white font-black text-sm tracking-widest shadow-xs">
              F
            </div>
            <div>
              <span className="font-extrabold text-sm tracking-tight text-gray-900 flex items-center gap-1">
                FusionCMS <span className="text-[10px] font-mono text-[#17BBEF]">v6.4</span>
              </span>
              <p className="text-[10px] text-gray-400">Anker Nordics Store Manager</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5">
            <button
              type="button"
              onClick={() => setActiveTab("dashboard")}
              className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-xs font-bold transition ${
                activeTab === "dashboard"
                  ? "bg-gray-900 text-white shadow-xs"
                  : "text-gray-600 hover:bg-gray-50 hover:text-black"
              }`}
            >
              <LayoutDashboard className="size-4" />
              <span>Dashboard Overview</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("products")}
              className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-xs font-bold transition ${
                activeTab === "products"
                  ? "bg-gray-900 text-white shadow-xs"
                  : "text-gray-600 hover:bg-gray-50 hover:text-black"
              }`}
            >
              <div className="flex items-center gap-3">
                <Package className="size-4" />
                <span>Product Studio</span>
              </div>
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] font-mono ${
                  activeTab === "products"
                    ? "bg-white/20 text-white"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {products.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("categories")}
              className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-xs font-bold transition ${
                activeTab === "categories"
                  ? "bg-gray-900 text-white shadow-xs"
                  : "text-gray-600 hover:bg-gray-50 hover:text-black"
              }`}
            >
              <div className="flex items-center gap-3">
                <FolderTree className="size-4" />
                <span>Category Hierarchy</span>
              </div>
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] font-mono ${
                  activeTab === "categories"
                    ? "bg-white/20 text-white"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {categories.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("discounts")}
              className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-xs font-bold transition ${
                activeTab === "discounts"
                  ? "bg-gray-900 text-white shadow-xs"
                  : "text-gray-600 hover:bg-gray-50 hover:text-black"
              }`}
            >
              <div className="flex items-center gap-3">
                <Tag className="size-4" />
                <span>Discounts & Promos</span>
              </div>
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] font-mono ${
                  activeTab === "discounts"
                    ? "bg-white/20 text-white"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {discounts.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("blogs")}
              className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-xs font-bold transition ${
                activeTab === "blogs"
                  ? "bg-gray-900 text-white shadow-xs"
                  : "text-gray-600 hover:bg-gray-50 hover:text-black"
              }`}
            >
              <div className="flex items-center gap-3">
                <FileText className="size-4" />
                <span>Blog & Articles</span>
              </div>
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] font-mono ${
                  activeTab === "blogs"
                    ? "bg-white/20 text-white"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {blogs.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("clients")}
              className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-xs font-bold transition ${
                activeTab === "clients"
                  ? "bg-gray-900 text-white shadow-xs"
                  : "text-gray-600 hover:bg-gray-50 hover:text-black"
              }`}
            >
              <div className="flex items-center gap-3">
                <Users className="size-4" />
                <span>Client Management</span>
              </div>
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] font-mono ${
                  activeTab === "clients"
                    ? "bg-white/20 text-white"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {users.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("roles")}
              className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-xs font-bold transition ${
                activeTab === "roles"
                  ? "bg-gray-900 text-white shadow-xs"
                  : "text-gray-600 hover:bg-gray-50 hover:text-black"
              }`}
            >
              <div className="flex items-center gap-3">
                <Shield className="size-4" />
                <span>Admin Rights & RBAC</span>
              </div>
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] font-mono ${
                  activeTab === "roles"
                    ? "bg-white/20 text-white"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                3
              </span>
            </button>
          </nav>
        </div>

        {/* Bottom Status & Storefront Link */}
        <div className="p-4 border-t border-gray-100 space-y-3">
          <div className="rounded-xl bg-gray-50 p-3 text-[11px] text-gray-600">
            <div className="flex items-center gap-2 font-bold text-gray-900">
              <Database className="size-3.5 text-emerald-500" />
              <span>FusionCMS Integration</span>
            </div>
            <p className="mt-1 text-gray-400">CKEditor 5 & SQLite Active</p>
          </div>

          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between rounded-xl border border-gray-200 px-4 py-2.5 text-xs font-bold text-gray-700 hover:border-black transition"
          >
            <span>Live Storefront</span>
            <ExternalLink className="size-3.5" />
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        {/* Top Header Bar */}
        <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-8 sticky top-0 z-10">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span className="font-bold text-gray-900 capitalize">{activeTab}</span>
            <span>/</span>
            <span>FusionCMS Control Panel</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-600">
              <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
              Store Active
            </span>
            <div className="h-4 w-[1px] bg-gray-200" />
            <div className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-full bg-gray-900 text-xs font-bold text-white">
                AL
              </div>
              <span className="text-xs font-bold text-gray-800">Alex Lindqvist</span>
            </div>
          </div>
        </header>

        <div className="p-8">
          {/* TAB 1: DASHBOARD */}
          {activeTab === "dashboard" && (
            <div className="space-y-8">
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                  Welcome to FusionCMS Dashboard
                </h1>
                <p className="text-xs text-gray-500 mt-1">
                  Manage your Nordic e-commerce clients, product inventory, categories, blog articles, and system permissions.
                </p>
              </div>

              {/* KPI Cards */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                      Total Sales
                    </span>
                    <div className="flex size-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                      <DollarSign className="size-5" />
                    </div>
                  </div>
                  <p className="mt-4 text-2xl font-extrabold text-gray-900">248 500 000 so&apos;m</p>
                  <p className="mt-1 text-xs font-semibold text-emerald-600 flex items-center gap-1">
                    <TrendingUp className="size-3.5" /> +18.4% this month
                  </p>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                      Flagship Products
                    </span>
                    <div className="flex size-9 items-center justify-center rounded-xl bg-cyan-50 text-[#17BBEF]">
                      <Package className="size-5" />
                    </div>
                  </div>
                  <p className="mt-4 text-2xl font-extrabold text-gray-900">{products.length}</p>
                  <p className="mt-1 text-xs text-gray-400">All categories populated</p>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                      Categories Active
                    </span>
                    <div className="flex size-9 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                      <FolderTree className="size-5" />
                    </div>
                  </div>
                  <p className="mt-4 text-2xl font-extrabold text-gray-900">{categories.length}</p>
                  <p className="mt-1 text-xs text-gray-400">Synced to header MegaMenu</p>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                      Blog Articles
                    </span>
                    <div className="flex size-9 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                      <FileText className="size-5" />
                    </div>
                  </div>
                  <p className="mt-4 text-2xl font-extrabold text-gray-900">{blogs.length}</p>
                  <p className="mt-1 text-xs text-gray-400">CKEditor 5 rich articles</p>
                </div>
              </div>

              {/* Quick Jump Grid */}
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-gray-900">Featured Store Products</h3>
                    <button
                      type="button"
                      onClick={() => setActiveTab("products")}
                      className="text-xs font-bold text-[#17BBEF] hover:underline"
                    >
                      View All →
                    </button>
                  </div>
                  <div className="mt-4 divide-y divide-gray-100">
                    {products.slice(0, 4).map((p) => (
                      <div key={p.id} className="flex items-center justify-between py-3 text-xs">
                        <div className="flex items-center gap-3">
                          <div className="relative size-11 shrink-0 rounded-lg bg-gray-50 border p-1">
                            <img src={p.image} alt={p.title} className="h-full w-full object-contain" />
                          </div>
                          <div>
                            <p className="font-bold text-gray-900 line-clamp-1">{p.title}</p>
                            <p className="text-gray-400 text-[11px]">
                              {p.category} · {p.sku} · Stock: {p.stock}
                            </p>
                          </div>
                        </div>
                        <span className="font-extrabold text-black font-mono">{p.price}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-gray-900">Category Overview</h3>
                    <button
                      type="button"
                      onClick={() => setActiveTab("categories")}
                      className="text-xs font-bold text-[#17BBEF] hover:underline"
                    >
                      Manage Hierarchy →
                    </button>
                  </div>
                  <div className="mt-4 divide-y divide-gray-100">
                    {categories.slice(0, 4).map((c) => (
                      <div key={c.id} className="flex items-center justify-between py-3 text-xs">
                        <div>
                          <p className="font-bold text-gray-900">{c.name}</p>
                          <p className="text-gray-400 text-[11px]">
                            {c.subcategories.length} subcategories · Brand: {c.brand}
                          </p>
                        </div>
                        <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-[10px] font-bold text-gray-700 capitalize">
                          {c.productCount} products
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PRODUCT MANAGEMENT */}
          {activeTab === "products" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                    Product Management Studio
                  </h1>
                  <p className="text-xs text-gray-500 mt-1">
                    Manage catalogue pricing, stock levels, CKEditor 5 overviews, and technical specifications.
                  </p>
                </div>
                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => setIsImporterOpen(true)}
                    className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-xs font-bold text-gray-800 shadow-2xs transition hover:border-[#17BBEF] hover:text-[#17BBEF]"
                  >
                    <DownloadCloud className="size-4 text-[#17BBEF]" />
                    <span>Import from Link</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleOpenCreateProduct}
                    className="flex items-center gap-2 rounded-xl bg-gray-900 px-4 py-2.5 text-xs font-bold text-white shadow-xs transition hover:bg-black"
                  >
                    <Plus className="size-4" />
                    <span>Add New Product</span>
                  </button>
                </div>
              </div>

              {/* Search Bar */}
              <div className="relative max-w-md">
                <Search className="absolute left-3.5 top-3 size-4 text-gray-400" />
                <input
                  type="text"
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  placeholder="Search products by title, category, subcategory, SKU, or brand..."
                  className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-xs font-medium focus:border-[#17BBEF] focus:outline-none shadow-2xs"
                />
              </div>

              {/* Products Table */}
              <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xs">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-gray-100 bg-gray-50/70 text-gray-400 uppercase tracking-wider font-bold">
                    <tr>
                      <th className="px-6 py-4">Product & Badges</th>
                      <th className="px-6 py-4">SKU / Brand</th>
                      <th className="px-6 py-4">Category & Subcategory</th>
                      <th className="px-6 py-4">Price (so&apos;m)</th>
                      <th className="px-6 py-4">Stock</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredProducts.map((p) => (
                      <tr key={p.id} className="hover:bg-gray-50/50 transition">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="relative size-12 shrink-0 rounded-lg bg-gray-50 p-1 border border-gray-200 flex items-center justify-center">
                              <img src={p.image} alt={p.title} className="h-full w-full object-contain" />
                            </div>
                            <div className="max-w-xs sm:max-w-sm">
                              {p.badges && p.badges.length > 0 && (
                                <div className="flex gap-1 mb-1">
                                  {p.badges.map((b) => (
                                    <span
                                      key={b}
                                      className="px-1.5 py-0.2 bg-gray-100 text-gray-700 text-[9px] font-bold rounded uppercase"
                                    >
                                      {b}
                                    </span>
                                  ))}
                                </div>
                              )}
                              <span className="font-bold text-gray-900 line-clamp-1">{p.title}</span>
                              {p.subtitle && (
                                <span className="text-[11px] text-gray-400 line-clamp-1 block">
                                  {p.subtitle}
                                </span>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-mono text-gray-900 font-bold">{p.sku}</div>
                          <div className="text-[11px] text-gray-400 capitalize">{p.brand}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-gray-900 font-semibold">{p.category}</div>
                          {p.subcategory && (
                            <div className="text-[11px] text-gray-400">{p.subcategory}</div>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-extrabold text-gray-900 font-mono">{p.price}</div>
                          {p.wasPrice && (
                            <div className="text-[10px] text-gray-400 line-through font-mono">
                              {p.wasPrice}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              p.stock === 0
                                ? "bg-red-50 text-red-700"
                                : p.stock <= 5
                                ? "bg-amber-50 text-amber-700"
                                : "bg-emerald-50 text-emerald-700"
                            }`}
                          >
                            {p.stock} units
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-600 capitalize">
                            {p.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Link
                              href={`/products/${p.slug}`}
                              target="_blank"
                              className="p-1.5 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-gray-100 transition"
                              title="View in Storefront"
                            >
                              <Eye className="size-4" />
                            </Link>
                            <button
                              type="button"
                              onClick={() => handleOpenEditProduct(p)}
                              className="p-1.5 text-gray-400 hover:text-black rounded-lg hover:bg-gray-100 transition"
                              title="Edit all product details"
                            >
                              <Edit className="size-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                if (confirm(`Delete product "${p.title}"?`)) {
                                  saveProducts(products.filter((item) => item.id !== p.id));
                                }
                              }}
                              className="p-1.5 text-gray-400 hover:text-red-600 rounded-lg hover:bg-gray-100 transition"
                              title="Delete product"
                            >
                              <Trash2 className="size-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: CATEGORY MANAGEMENT */}
          {activeTab === "categories" && (
            <CategoryManager
              categories={categories}
              products={products}
              onSaveCategories={saveCategories}
              onFilterCategory={(catName) => {
                setProductSearch(catName);
                setActiveTab("products");
              }}
            />
          )}

          {/* TAB: DISCOUNTS & PROMOTIONS MANAGEMENT */}
          {activeTab === "discounts" && (
            <DiscountManager
              discounts={discounts}
              products={products}
              categories={categories}
              onSaveDiscounts={saveDiscounts}
            />
          )}

          {/* TAB 4: BLOG ARTICLES (WITH CKEDITOR 5) */}
          {activeTab === "blogs" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                    Blog & Editorial Articles
                  </h1>
                  <p className="text-xs text-gray-500 mt-1">
                    Manage content marketing, launch stories, and guides with CKEditor 5 WYSIWYG.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleOpenCreateBlog}
                  className="flex items-center gap-2 rounded-xl bg-gray-900 px-4 py-2.5 text-xs font-bold text-white shadow-xs transition hover:bg-black"
                >
                  <Plus className="size-4" />
                  <span>Write Article (CKEditor)</span>
                </button>
              </div>

              {/* Search Bar */}
              <div className="relative max-w-md">
                <Search className="absolute left-3.5 top-3 size-4 text-gray-400" />
                <input
                  type="text"
                  value={blogSearch}
                  onChange={(e) => setBlogSearch(e.target.value)}
                  placeholder="Search articles by title or author..."
                  className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-xs font-medium focus:border-[#17BBEF] focus:outline-none"
                />
              </div>

              {/* Blogs Table */}
              <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xs">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-gray-100 bg-gray-50/70 text-gray-400 uppercase tracking-wider font-bold">
                    <tr>
                      <th className="px-6 py-4">Article Title</th>
                      <th className="px-6 py-4">Category</th>
                      <th className="px-6 py-4">Author</th>
                      <th className="px-6 py-4">Published Date</th>
                      <th className="px-6 py-4">Read Time</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredBlogs.map((b) => (
                      <tr key={b.id} className="hover:bg-gray-50/50">
                        <td className="px-6 py-4">
                          <div className="font-bold text-gray-900">{b.title}</div>
                          <div className="text-[11px] text-gray-400 line-clamp-1">{b.excerpt}</div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="rounded-full bg-cyan-50 px-2.5 py-0.5 text-[10px] font-bold text-[#17BBEF]">
                            {b.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-600 font-medium">{b.author}</td>
                        <td className="px-6 py-4 text-gray-500">{b.publishedAt}</td>
                        <td className="px-6 py-4 text-gray-500 font-mono">{b.readTime}</td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              type="button"
                              onClick={() => handleOpenEditBlog(b)}
                              className="p-1.5 text-gray-400 hover:text-black rounded-lg hover:bg-gray-100 transition"
                              title="Edit article"
                            >
                              <Edit className="size-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                if (confirm(`Delete article "${b.title}"?`)) {
                                  saveBlogs(blogs.filter((item) => item.id !== b.id));
                                }
                              }}
                              className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg hover:bg-gray-100 transition"
                              title="Delete article"
                            >
                              <Trash2 className="size-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 5: CLIENT MANAGEMENT */}
          {activeTab === "clients" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                    Client & Customer Management
                  </h1>
                  <p className="text-xs text-gray-500 mt-1">
                    Manage customer profiles, order history, and account roles.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowUserModal(true)}
                  className="flex items-center gap-2 rounded-xl bg-gray-900 px-4 py-2.5 text-xs font-bold text-white shadow-xs transition hover:bg-black"
                >
                  <Plus className="size-4" />
                  <span>Add New Client</span>
                </button>
              </div>

              {/* Search Bar */}
              <div className="relative max-w-md">
                <Search className="absolute left-3.5 top-3 size-4 text-gray-400" />
                <input
                  type="text"
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                  placeholder="Search clients by name or email..."
                  className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-xs font-medium focus:border-[#17BBEF] focus:outline-none"
                />
              </div>

              {/* Clients Table */}
              <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xs">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-gray-100 bg-gray-50/70 text-gray-400 uppercase tracking-wider font-bold">
                    <tr>
                      <th className="px-6 py-4">Client Name</th>
                      <th className="px-6 py-4">Email Address</th>
                      <th className="px-6 py-4">Assigned Role</th>
                      <th className="px-6 py-4">Orders</th>
                      <th className="px-6 py-4">Total Spent</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredUsers.map((u) => (
                      <tr key={u.id} className="hover:bg-gray-50/50">
                        <td className="px-6 py-4 font-bold text-gray-900">{u.name}</td>
                        <td className="px-6 py-4 text-gray-600">{u.email}</td>
                        <td className="px-6 py-4">
                          <span
                            className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase ${
                              u.role === "admin"
                                ? "bg-red-50 text-red-700"
                                : u.role === "editor"
                                ? "bg-purple-50 text-purple-700"
                                : "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {u.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-900">{u.ordersCount}</td>
                        <td className="px-6 py-4 font-bold text-gray-900 font-mono">{u.totalSpent}</td>
                        <td className="px-6 py-4">
                          <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-600">
                            Active
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button
                            type="button"
                            onClick={() => {
                              saveUsers(users.filter((item) => item.id !== u.id));
                            }}
                            className="text-gray-400 hover:text-red-500"
                            title="Delete user"
                          >
                            <Trash2 className="size-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 6: ADMIN RIGHTS & ROLES */}
          {activeTab === "roles" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                  Admin Rights & Permissions
                </h1>
                <p className="text-xs text-gray-500 mt-1">
                  Configure role-based access control (RBAC) across system layers.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {roles.map((r) => (
                  <div key={r.id} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-2xs">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-gray-900">{r.name}</span>
                      <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-[10px] font-bold text-gray-600">
                        {r.userCount} Assigned
                      </span>
                    </div>
                    <p className="mt-2 text-xs text-gray-500 min-h-[36px]">{r.description}</p>

                    <div className="mt-6 space-y-2.5 border-t border-gray-100 pt-4 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Product Studio & Pricing</span>
                        {r.permissions.canManageProducts ? (
                          <CheckCircle2 className="size-4 text-emerald-500" />
                        ) : (
                          <Lock className="size-4 text-gray-300" />
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Client Accounts & Orders</span>
                        {r.permissions.canManageUsers ? (
                          <CheckCircle2 className="size-4 text-emerald-500" />
                        ) : (
                          <Lock className="size-4 text-gray-300" />
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Blog Publishing (CKEditor)</span>
                        {r.permissions.canManageBlogs ? (
                          <CheckCircle2 className="size-4 text-emerald-500" />
                        ) : (
                          <Lock className="size-4 text-gray-300" />
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Order Processing</span>
                        {r.permissions.canManageOrders ? (
                          <CheckCircle2 className="size-4 text-emerald-500" />
                        ) : (
                          <Lock className="size-4 text-gray-300" />
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Server & CMS Settings</span>
                        {r.permissions.canAccessSettings ? (
                          <CheckCircle2 className="size-4 text-emerald-500" />
                        ) : (
                          <Lock className="size-4 text-gray-300" />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Modal: Add Client */}
      {showUserModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-gray-100">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-4">
              <h3 className="text-base font-bold text-gray-900">Add New Client Account</h3>
              <button
                type="button"
                onClick={() => setShowUserModal(false)}
                className="p-1 text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <form onSubmit={handleAddUser} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-gray-700">Full Name</label>
                <input
                  type="text"
                  required
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  placeholder="e.g. Gustav Ekström"
                  className="mt-1 w-full rounded-xl border border-gray-200 p-2.5 focus:border-[#17BBEF] focus:outline-none"
                />
              </div>
              <div>
                <label className="font-semibold text-gray-700">Email Address</label>
                <input
                  type="email"
                  required
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  placeholder="gustav@example.se"
                  className="mt-1 w-full rounded-xl border border-gray-200 p-2.5 focus:border-[#17BBEF] focus:outline-none"
                />
              </div>
              <div>
                <label className="font-semibold text-gray-700">Assigned Role</label>
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser({ ...newUser, role: e.target.value as any })}
                  className="mt-1 w-full rounded-xl border border-gray-200 p-2.5 bg-white focus:border-[#17BBEF] focus:outline-none"
                >
                  <option value="customer">Customer / Client</option>
                  <option value="editor">Content Editor</option>
                  <option value="admin">Administrator</option>
                </select>
              </div>
              <div className="flex gap-2 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setShowUserModal(false)}
                  className="flex-1 rounded-xl border border-gray-200 py-2.5 font-bold text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-xl bg-gray-900 py-2.5 font-bold text-white hover:bg-black"
                >
                  Create Client
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Create or Edit Blog with CKEditor 5 */}
      {showBlogModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-3xl rounded-2xl bg-white p-6 shadow-2xl border border-gray-100 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-4">
              <div>
                <h3 className="text-base font-extrabold text-gray-900">
                  {editingBlog ? `Edit Article: ${editingBlog.title}` : "Write Blog Article (CKEditor 5)"}
                </h3>
                <p className="text-xs text-gray-400">
                  Rich text editorial studio with formatting, headings, lists, and quote blocks.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowBlogModal(false)}
                className="p-1 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Tab Switcher inside Blog Modal */}
            <div className="flex border-b border-gray-100 mb-4 gap-2">
              <button
                type="button"
                onClick={() => setBlogActiveSection("editor")}
                className={`pb-2.5 px-3 text-xs font-bold transition border-b-2 flex items-center gap-2 ${
                  blogActiveSection === "editor"
                    ? "border-[#17BBEF] text-gray-900"
                    : "border-transparent text-gray-400 hover:text-gray-700"
                }`}
              >
                <FileText className="size-3.5" />
                <span>Article Editor</span>
              </button>
              <button
                type="button"
                onClick={() => setBlogActiveSection("seo")}
                className={`pb-2.5 px-3 text-xs font-bold transition border-b-2 flex items-center gap-2 ${
                  blogActiveSection === "seo"
                    ? "border-[#17BBEF] text-[#17BBEF]"
                    : "border-transparent text-gray-400 hover:text-gray-700"
                }`}
              >
                <Sparkles className="size-3.5 text-[#17BBEF]" />
                <span>SEO Optimization & Audits</span>
              </button>
            </div>

            <form onSubmit={handleSaveBlog} className="space-y-4 text-xs">
              {blogActiveSection === "editor" ? (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-gray-700">Article Title *</label>
                      <input
                        type="text"
                        required
                        value={newBlog.title}
                        onChange={(e) => {
                          setNewBlog({
                            ...newBlog,
                            title: e.target.value,
                            slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
                          });
                        }}
                        placeholder="e.g. Nordic Winter Battery Benchmarks"
                        className="mt-1 w-full rounded-xl border border-gray-200 p-2.5 font-semibold focus:border-[#17BBEF] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-gray-700">Category Tag</label>
                      <select
                        value={newBlog.category}
                        onChange={(e) => setNewBlog({ ...newBlog, category: e.target.value })}
                        className="mt-1 w-full rounded-xl border border-gray-200 p-2.5 bg-white font-medium focus:border-[#17BBEF] focus:outline-none"
                      >
                        <option value="Product Launch">Product Launch</option>
                        <option value="Guides & Tech">Guides & Tech</option>
                        <option value="Smart Home">Smart Home</option>
                        <option value="Audio & Acoustics">Audio & Acoustics</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-gray-700">Short Excerpt / Teaser</label>
                    <textarea
                      rows={2}
                      value={newBlog.excerpt}
                      onChange={(e) => setNewBlog({ ...newBlog, excerpt: e.target.value })}
                      placeholder="Short marketing hook for blog cards..."
                      className="mt-1 w-full rounded-xl border border-gray-200 p-2.5 font-medium focus:border-[#17BBEF] focus:outline-none resize-none"
                    />
                  </div>

                  {/* CKEditor 5 WYSIWYG for Blog Body */}
                  <CKEditorField
                    label="Article Body (CKEditor 5 WYSIWYG)"
                    value={newBlog.body}
                    onChange={(html) => setNewBlog({ ...newBlog, body: html })}
                    placeholder="Draft article content with rich headings, blockquotes, lists, and tables..."
                    minHeight="280px"
                  />
                </>
              ) : (
                <div className="space-y-4">
                  <SeoOptimizationTool
                    title={newBlog.title || "Untitled Article"}
                    slug={newBlog.slug || "untitled-article"}
                    metaTitle={newBlog.metaTitle}
                    metaDescription={newBlog.metaDescription}
                    focusKeyword={newBlog.focusKeyword}
                    contentHtml={newBlog.body}
                    images={[{ url: newBlog.image, altText: newBlog.title }]}
                    onChangeMetaTitle={(val) => setNewBlog({ ...newBlog, metaTitle: val })}
                    onChangeMetaDescription={(val) => setNewBlog({ ...newBlog, metaDescription: val })}
                    onChangeFocusKeyword={(val) => setNewBlog({ ...newBlog, focusKeyword: val })}
                  />
                </div>
              )}

              <div className="flex gap-2 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setShowBlogModal(false)}
                  className="flex-1 rounded-xl border border-gray-200 py-2.5 font-bold text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-xl bg-gray-900 py-2.5 font-bold text-white hover:bg-black transition"
                >
                  {editingBlog ? "Update Article" : "Publish Article"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
