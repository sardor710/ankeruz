"use client";

import React, { useState } from "react";
import {
  Tag,
  Plus,
  Search,
  Copy,
  Check,
  TrendingUp,
  Percent,
  DollarSign,
  Calendar,
  Layers,
  Package,
  ShoppingBag,
  Sliders,
  Trash2,
  Edit2,
  X,
  Sparkles,
  AlertCircle,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";
import type {
  FusionDiscount,
  DiscountType,
  DiscountScope,
  DiscountStatus,
  FusionProduct,
  FusionCategory,
} from "@/lib/cms/fusion-cms";
import { formatCurrency } from "@/lib/discounts/discount-engine";
import { formatSom } from "@/lib/currency";

interface DiscountManagerProps {
  discounts: FusionDiscount[];
  products: FusionProduct[];
  categories: FusionCategory[];
  onSaveDiscounts: (discounts: FusionDiscount[]) => void;
}

export function DiscountManager({
  discounts,
  products,
  categories,
  onSaveDiscounts,
}: DiscountManagerProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [editingDiscount, setEditingDiscount] = useState<FusionDiscount | null>(null);

  // Form State
  const [code, setCode] = useState("");
  const [title, setTitle] = useState("");
  const [type, setType] = useState<DiscountType>("percentage");
  const [value, setValue] = useState<number>(20);
  const [scope, setScope] = useState<DiscountScope>("storewide");
  const [targetIds, setTargetIds] = useState<string[]>([]);
  const [minSpend, setMinSpend] = useState<number>(0);
  const [maxUses, setMaxUses] = useState<number>(500);
  const [startDate, setStartDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [endDate, setEndDate] = useState<string>("");
  const [status, setStatus] = useState<DiscountStatus>("active");

  // Copy code feedback
  const handleCopyCode = (promoCode: string) => {
    navigator.clipboard.writeText(promoCode);
    setCopiedCode(promoCode);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  // Generate random brand code
  const handleGenerateRandomCode = () => {
    const prefixes = ["ANKER", "NORDIC", "SOUNDCORE", "EUFY", "PROMO", "VIP"];
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const num = Math.floor(10 + Math.random() * 90);
    setCode(`${prefix}${num}`);
  };

  // Open Create Modal
  const handleOpenCreateModal = () => {
    setEditingDiscount(null);
    setCode("NORDIC" + Math.floor(10 + Math.random() * 90));
    setTitle("");
    setType("percentage");
    setValue(20);
    setScope("storewide");
    setTargetIds([]);
    setMinSpend(0);
    setMaxUses(500);
    setStartDate(new Date().toISOString().split("T")[0]);
    setEndDate("");
    setStatus("active");
    setShowModal(true);
  };

  // Open Edit Modal
  const handleOpenEditModal = (disc: FusionDiscount) => {
    setEditingDiscount(disc);
    setCode(disc.code);
    setTitle(disc.title);
    setType(disc.type);
    setValue(disc.value);
    setScope(disc.scope);
    setTargetIds(disc.targetIds || []);
    setMinSpend(disc.minSpend || 0);
    setMaxUses(disc.maxUses || 500);
    setStartDate(disc.startDate || new Date().toISOString().split("T")[0]);
    setEndDate(disc.endDate || "");
    setStatus(disc.status);
    setShowModal(true);
  };

  // Toggle Active Status
  const handleToggleStatus = (disc: FusionDiscount) => {
    const newStatus: DiscountStatus = disc.status === "active" ? "inactive" : "active";
    const updated = discounts.map((d) =>
      d.id === disc.id ? { ...d, status: newStatus } : d
    );
    onSaveDiscounts(updated);
  };

  // Delete Discount
  const handleDeleteDiscount = (discId: string) => {
    if (confirm("Are you sure you want to delete this promotion?")) {
      onSaveDiscounts(discounts.filter((d) => d.id !== discId));
    }
  };

  // Save Discount
  const handleSaveDiscount = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim() || !title.trim()) return;

    const finalCode = code.trim().toUpperCase().replace(/\s+/g, "");

    if (editingDiscount) {
      const updated = discounts.map((d) =>
        d.id === editingDiscount.id
          ? {
              ...d,
              code: finalCode,
              title: title.trim(),
              type,
              value: Number(value),
              scope,
              targetIds,
              minSpend: Number(minSpend) || 0,
              maxUses: Number(maxUses) || undefined,
              startDate: startDate || undefined,
              endDate: endDate || undefined,
              status,
              updatedAt: new Date().toISOString().split("T")[0],
            }
          : d
      );
      onSaveDiscounts(updated);
    } else {
      const newDisc: FusionDiscount = {
        id: `disc-${Date.now()}`,
        code: finalCode,
        title: title.trim(),
        type,
        value: Number(value),
        scope,
        targetIds,
        minSpend: Number(minSpend) || 0,
        maxUses: Number(maxUses) || undefined,
        usedCount: 0,
        startDate: startDate || undefined,
        endDate: endDate || undefined,
        status,
        createdAt: new Date().toISOString().split("T")[0],
        updatedAt: new Date().toISOString().split("T")[0],
        revenueGenerated: 0,
        savingsGenerated: 0,
      };
      onSaveDiscounts([newDisc, ...discounts]);
    }
    setShowModal(false);
  };

  // Filtered campaigns
  const filteredDiscounts = discounts.filter((d) => {
    const matchesSearch =
      d.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || d.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Calculate High-level KPIs
  const activeCount = discounts.filter((d) => d.status === "active").length;
  const totalRedemptions = discounts.reduce((sum, d) => sum + (d.usedCount || 0), 0);
  const totalRevenue = discounts.reduce((sum, d) => sum + (d.revenueGenerated || 0), 0);
  const totalSavings = discounts.reduce((sum, d) => sum + (d.savingsGenerated || 0), 0);

  // Sample Basket calculation for simulator in modal
  const sampleBasketPrice = 2690000; // typical Liberty 5 Pro Max order (2 690 000 so'm)
  const simulatedSavings =
    type === "percentage"
      ? Math.round((sampleBasketPrice * value) / 100)
      : Math.min(sampleBasketPrice, value);
  const simulatedFinalPrice = Math.max(0, sampleBasketPrice - simulatedSavings);

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-gray-200/80 shadow-2xs">
        <div>
          <h2 className="text-xl font-extrabold text-gray-900 tracking-tight flex items-center gap-2.5">
            <Tag className="h-6 w-6 text-[#17BBEF]" />
            Promotions & Discount Management
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Create coupon codes, percentage/fixed discounts, quantity limits, and category scopes.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenCreateModal}
          className="flex items-center gap-2 px-4 py-2.5 bg-gray-900 hover:bg-black text-white text-xs font-bold rounded-xl transition shadow-xs hover:shadow"
        >
          <Plus className="h-4 w-4" />
          <span>Create New Promotion</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs">
          <div className="flex items-center justify-between text-xs font-bold text-gray-400 uppercase tracking-wider">
            <span>Active Campaigns</span>
            <span className="size-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Tag className="h-4 w-4" />
            </span>
          </div>
          <div className="mt-3 text-2xl font-extrabold text-gray-900 font-mono">
            {activeCount} Active
          </div>
          <p className="mt-1 text-[11px] text-gray-400 font-medium">
            {discounts.length} total campaigns configured
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs">
          <div className="flex items-center justify-between text-xs font-bold text-gray-400 uppercase tracking-wider">
            <span>Total Redemptions</span>
            <span className="size-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <ShoppingBag className="h-4 w-4" />
            </span>
          </div>
          <div className="mt-3 text-2xl font-extrabold text-gray-900 font-mono">
            {totalRedemptions} Orders
          </div>
          <p className="mt-1 text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
            <TrendingUp className="h-3 w-3" /> +22.4% vs last month
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs">
          <div className="flex items-center justify-between text-xs font-bold text-gray-400 uppercase tracking-wider">
            <span>Influenced Revenue</span>
            <span className="size-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <DollarSign className="h-4 w-4" />
            </span>
          </div>
          <div className="mt-3 text-2xl font-extrabold text-gray-900 font-mono">
            {formatCurrency(totalRevenue)}
          </div>
          <p className="mt-1 text-[11px] text-gray-400 font-medium">
            Generated via coupon checkouts
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs">
          <div className="flex items-center justify-between text-xs font-bold text-gray-400 uppercase tracking-wider">
            <span>Customer Savings</span>
            <span className="size-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Percent className="h-4 w-4" />
            </span>
          </div>
          <div className="mt-3 text-2xl font-extrabold text-gray-900 font-mono">
            {formatCurrency(totalSavings)}
          </div>
          <p className="mt-1 text-[11px] text-gray-400 font-medium">
            Direct discounts granted
          </p>
        </div>
      </div>

      {/* Search & Filter Strip */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search campaigns by code or title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-medium focus:outline-none focus:border-[#17BBEF] shadow-2xs"
          />
        </div>

        <div className="flex items-center gap-1.5 bg-white p-1 border border-gray-200 rounded-xl shadow-2xs">
          {(["all", "active", "scheduled", "expired", "inactive"] as const).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1 text-xs font-bold rounded-lg capitalize transition ${
                statusFilter === s
                  ? "bg-gray-900 text-white shadow-2xs"
                  : "text-gray-500 hover:bg-gray-100"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Campaigns Data Table */}
      <div className="overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-2xs">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-gray-100 bg-gray-50/70 text-gray-400 uppercase tracking-wider font-bold">
            <tr>
              <th className="px-6 py-4">Coupon Code & Title</th>
              <th className="px-6 py-4">Discount Value</th>
              <th className="px-6 py-4">Target Scope</th>
              <th className="px-6 py-4">Redemption Progress</th>
              <th className="px-6 py-4">Validity Window</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredDiscounts.map((disc) => {
              const pctUsed = disc.maxUses ? Math.round((disc.usedCount / disc.maxUses) * 100) : 0;

              return (
                <tr key={disc.id} className="hover:bg-gray-50/50 transition">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono font-bold text-gray-900 bg-gray-100 border border-gray-200 px-2.5 py-1 rounded-lg text-xs flex items-center gap-1.5">
                        {disc.code}
                        <button
                          type="button"
                          onClick={() => handleCopyCode(disc.code)}
                          className="text-gray-400 hover:text-black"
                          title="Copy Code"
                        >
                          {copiedCode === disc.code ? (
                            <Check className="h-3 w-3 text-emerald-600" />
                          ) : (
                            <Copy className="h-3 w-3" />
                          )}
                        </button>
                      </span>
                    </div>
                    <div className="text-[11px] text-gray-500 mt-1 font-medium">{disc.title}</div>
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-black font-mono ${
                        disc.type === "percentage"
                          ? "bg-cyan-50 text-[#0c7ea5] border border-cyan-200"
                          : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      }`}
                    >
                      {disc.type === "percentage" ? `${disc.value}% OFF` : `-${formatSom(disc.value)}`}
                    </span>
                    {disc.minSpend ? (
                      <div className="text-[10px] text-gray-400 mt-0.5">
                        Min. order: {formatSom(disc.minSpend)}
                      </div>
                    ) : null}
                  </td>

                  <td className="px-6 py-4">
                    <span className="capitalize font-semibold text-gray-800">
                      {disc.scope === "storewide"
                        ? "Storewide (All Products)"
                        : disc.scope === "category"
                        ? `Categories (${disc.targetIds?.length || 0})`
                        : `Specific SKUs (${disc.targetIds?.length || 0})`}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                      <span className="text-gray-700 font-bold">{disc.usedCount} used</span>
                      <span className="text-gray-400">
                        {disc.maxUses ? `/ ${disc.maxUses}` : "Unlimited"}
                      </span>
                    </div>
                    {disc.maxUses && (
                      <div className="w-28 bg-gray-100 h-1.5 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${
                            pctUsed >= 90 ? "bg-amber-500" : "bg-emerald-500"
                          }`}
                          style={{ width: `${Math.min(100, pctUsed)}%` }}
                        />
                      </div>
                    )}
                  </td>

                  <td className="px-6 py-4">
                    <div className="text-xs text-gray-700 font-medium">
                      {disc.startDate || "Anytime"} → {disc.endDate || "Ongoing"}
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                        disc.status === "active"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : disc.status === "scheduled"
                          ? "bg-blue-50 text-blue-700 border border-blue-200"
                          : disc.status === "expired"
                          ? "bg-gray-100 text-gray-500 border border-gray-200"
                          : "bg-red-50 text-red-700 border border-red-200"
                      }`}
                    >
                      {disc.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleToggleStatus(disc)}
                        className={`p-1.5 rounded-lg transition ${
                          disc.status === "active"
                            ? "text-emerald-600 hover:bg-emerald-50"
                            : "text-gray-400 hover:bg-gray-100"
                        }`}
                        title={disc.status === "active" ? "Pause Campaign" : "Activate Campaign"}
                      >
                        {disc.status === "active" ? (
                          <ToggleRight className="h-5 w-5" />
                        ) : (
                          <ToggleLeft className="h-5 w-5" />
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => handleOpenEditModal(disc)}
                        className="p-1.5 text-gray-400 hover:text-black rounded-lg hover:bg-gray-100 transition"
                        title="Edit campaign"
                      >
                        <Edit2 className="h-3.5 w-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDeleteDiscount(disc.id)}
                        className="p-1.5 text-gray-400 hover:text-red-600 rounded-lg hover:bg-gray-100 transition"
                        title="Delete campaign"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Modal: Create / Edit Promotion with Cart Simulator */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-3xl w-full p-6 shadow-2xl border border-gray-100 max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-5">
              <div>
                <h3 className="font-extrabold text-lg text-gray-900">
                  {editingDiscount ? "Edit Promotion Campaign" : "Create New Promotion Campaign"}
                </h3>
                <p className="text-xs text-gray-400">
                  Configure discount code, rules, quantity restrictions, and schedule.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleSaveDiscount} className="space-y-5">
              {/* Row 1: Code & Title */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-bold text-gray-700">Coupon Code *</label>
                    <button
                      type="button"
                      onClick={handleGenerateRandomCode}
                      className="text-[11px] font-bold text-[#17BBEF] hover:underline flex items-center gap-1"
                    >
                      <Sparkles className="h-3 w-3" />
                      Generate Code
                    </button>
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="e.g. NORDIC20"
                    value={code}
                    onChange={(e) => setCode(e.target.value.toUpperCase())}
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-xs font-mono font-extrabold tracking-wider uppercase focus:border-[#17BBEF] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Campaign Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Nordic Autumn Storewide Sale"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-xs font-semibold focus:border-[#17BBEF] focus:outline-none"
                  />
                </div>
              </div>

              {/* Row 2: Discount Type & Value */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-gray-50 border border-gray-200">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    Discount Type
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setType("percentage")}
                      className={`py-2 text-xs font-bold rounded-xl border transition flex items-center justify-center gap-1.5 ${
                        type === "percentage"
                          ? "bg-gray-900 text-white border-gray-900 shadow-xs"
                          : "bg-white text-gray-600 border-gray-200 hover:bg-gray-100"
                      }`}
                    >
                      <Percent className="h-3.5 w-3.5" />
                      <span>Percentage (%)</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setType("fixed")}
                      className={`py-2 text-xs font-bold rounded-xl border transition flex items-center justify-center gap-1.5 ${
                        type === "fixed"
                          ? "bg-gray-900 text-white border-gray-900 shadow-xs"
                          : "bg-white text-gray-600 border-gray-200 hover:bg-gray-100"
                      }`}
                    >
                      <DollarSign className="h-3.5 w-3.5" />
                      <span>Fixed Amount (so&apos;m)</span>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    Discount Value {type === "percentage" ? "(%)" : "(so'm)"}
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={type === "percentage" ? 100 : 50000000}
                    required
                    value={value}
                    onChange={(e) => setValue(Number(e.target.value))}
                    className="w-full px-3.5 py-2 border border-gray-200 rounded-xl text-xs font-mono font-extrabold focus:border-[#17BBEF] focus:outline-none"
                  />
                </div>
              </div>

              {/* Row 3: Target Scope */}
              <div className="space-y-3">
                <label className="block text-xs font-bold text-gray-700">
                  Target Product Scope
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "storewide", label: "Storewide (All)" },
                    { id: "category", label: "By Category" },
                    { id: "product", label: "By Product SKU" },
                  ].map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setScope(s.id as any)}
                      className={`py-2 text-xs font-bold rounded-xl border transition ${
                        scope === s.id
                          ? "bg-gray-900 text-white border-gray-900 shadow-xs"
                          : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>

                {scope === "category" && (
                  <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 space-y-1.5">
                    <span className="text-[11px] font-bold text-gray-600">Select Categories:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {categories.map((c) => {
                        const isSelected = targetIds.includes(c.id) || targetIds.includes(c.name);
                        return (
                          <button
                            key={c.id}
                            type="button"
                            onClick={() => {
                              if (isSelected) {
                                setTargetIds(targetIds.filter((t) => t !== c.id && t !== c.name));
                              } else {
                                setTargetIds([...targetIds, c.id]);
                              }
                            }}
                            className={`px-3 py-1 rounded-lg text-xs font-semibold border transition ${
                              isSelected
                                ? "bg-gray-900 text-white border-gray-900"
                                : "bg-white text-gray-700 border-gray-200 hover:bg-gray-100"
                            }`}
                          >
                            {c.name}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {scope === "product" && (
                  <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 space-y-1.5">
                    <span className="text-[11px] font-bold text-gray-600">Select Products:</span>
                    <div className="max-h-40 overflow-y-auto space-y-1">
                      {products.map((p) => {
                        const isSelected = targetIds.includes(p.id) || targetIds.includes(p.slug);
                        return (
                          <label
                            key={p.id}
                            className="flex items-center gap-2 p-1.5 hover:bg-white rounded-lg cursor-pointer text-xs"
                          >
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={(e) => {
                                if (e.target.checked) setTargetIds([...targetIds, p.id]);
                                else setTargetIds(targetIds.filter((t) => t !== p.id && t !== p.slug));
                              }}
                              className="rounded text-[#17BBEF]"
                            />
                            <span className="font-semibold text-gray-800 line-clamp-1">
                              {p.title} ({p.sku})
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Row 4: Minimum Order & Maximum Uses */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Minimum Order Amount (so&apos;m)
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={minSpend}
                    onChange={(e) => setMinSpend(Number(e.target.value))}
                    placeholder="e.g. 500 000 so'm (0 = No minimum)"
                    className="w-full px-3.5 py-2 border border-gray-200 rounded-xl text-xs font-mono focus:border-[#17BBEF] focus:outline-none"
                  />
                  <span className="text-[10px] text-gray-400 mt-0.5 block">
                    {minSpend ? `Active threshold: ${formatSom(minSpend)}` : "0 means no minimum required"}
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Max Redemptions (Quantity Limit)
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={maxUses}
                    onChange={(e) => setMaxUses(Number(e.target.value))}
                    placeholder="500"
                    className="w-full px-3.5 py-2 border border-gray-200 rounded-xl text-xs font-mono focus:border-[#17BBEF] focus:outline-none"
                  />
                </div>
              </div>

              {/* Row 5: Schedule Dates */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Start Date</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-3.5 py-2 border border-gray-200 rounded-xl text-xs font-mono focus:border-[#17BBEF] focus:outline-none bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    End Date (Optional)
                  </label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-3.5 py-2 border border-gray-200 rounded-xl text-xs font-mono focus:border-[#17BBEF] focus:outline-none bg-white"
                  />
                </div>
              </div>

              {/* Live Cart Simulator Card */}
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-2">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                  Live Customer Checkout Simulator
                </span>
                <div className="flex items-center justify-between text-xs text-gray-600">
                  <span>Sample Order: Liberty 5 Pro Max</span>
                  <span className="font-mono">{formatCurrency(sampleBasketPrice)}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-emerald-700 font-bold">
                  <span>Discount Applied ({code || "PROMO"})</span>
                  <span className="font-mono">-{formatCurrency(simulatedSavings)}</span>
                </div>
                <div className="flex items-center justify-between text-xs font-black text-gray-900 border-t border-gray-200 pt-2">
                  <span>Customer Pays</span>
                  <span className="font-mono text-sm">{formatCurrency(simulatedFinalPrice)}</span>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-gray-200 text-gray-600 text-xs font-bold rounded-xl hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-gray-900 hover:bg-black text-white text-xs font-bold rounded-xl transition"
                >
                  Save Promotion
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
