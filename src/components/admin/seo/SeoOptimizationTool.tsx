"use client";

import React, { useState, useMemo } from "react";
import {
  Globe,
  Search,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ExternalLink,
  Sparkles,
  Smartphone,
  Monitor,
  Share2,
  Info,
} from "lucide-react";
import {
  analyzeSeo,
  type SeoAuditInput,
  type SeoAuditResult,
  type SeoCheckItem,
} from "@/lib/cms/seo-analyzer";

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

interface SeoOptimizationToolProps {
  title: string;
  slug: string;
  metaTitle: string;
  metaDescription: string;
  focusKeyword: string;
  contentHtml?: string;
  images?: Array<{ url: string; altText: string }>;
  onChangeMetaTitle: (val: string) => void;
  onChangeMetaDescription: (val: string) => void;
  onChangeFocusKeyword: (val: string) => void;
  onAutoGenerate?: () => void;
}

export function SeoOptimizationTool({
  title,
  slug,
  metaTitle,
  metaDescription,
  focusKeyword,
  contentHtml,
  images = [],
  onChangeMetaTitle,
  onChangeMetaDescription,
  onChangeFocusKeyword,
  onAutoGenerate,
}: SeoOptimizationToolProps) {
  const [previewMode, setPreviewMode] = useState<"google" | "facebook" | "twitter">("google");
  const [deviceMode, setDeviceMode] = useState<"desktop" | "mobile">("desktop");
  const [checklistFilter, setChecklistFilter] = useState<"all" | "fail" | "warn" | "pass">("all");

  const auditInput: SeoAuditInput = useMemo(
    () => ({
      title,
      slug,
      metaTitle,
      metaDescription,
      focusKeyword,
      contentHtml,
      images,
      ogImage: images[0]?.url || "/images/1204_black.png",
    }),
    [title, slug, metaTitle, metaDescription, focusKeyword, contentHtml, images]
  );

  const result: SeoAuditResult = useMemo(() => analyzeSeo(auditInput), [auditInput]);

  // Filtered check items
  const filteredChecks = useMemo(() => {
    if (checklistFilter === "all") return result.checks;
    return result.checks.filter((c) => c.status === checklistFilter);
  }, [result.checks, checklistFilter]);

  // Score styling
  const scoreColor =
    result.score >= 80
      ? "text-emerald-600"
      : result.score >= 50
      ? "text-amber-600"
      : "text-red-600";

  const scoreBg =
    result.score >= 80
      ? "bg-emerald-500"
      : result.score >= 50
      ? "bg-amber-500"
      : "bg-red-500";

  return (
    <div className="space-y-6">
      {/* Top Banner: Score Gauge & Metrics */}
      <div className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-2xs">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left: Score Gauge */}
          <div className="flex items-center gap-5">
            <div className="relative size-24 flex items-center justify-center">
              {/* Circular SVG Gauge */}
              <svg className="size-full -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-gray-100"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className={scoreColor}
                  strokeDasharray={`${result.score}, 100`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className={`text-2xl font-black font-mono tracking-tighter ${scoreColor}`}>
                  {result.score}
                </span>
                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">
                  Grade {result.grade}
                </span>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base text-gray-900">SEO Optimization Score</h3>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                    result.score >= 80
                      ? "bg-emerald-50 text-emerald-700"
                      : result.score >= 50
                      ? "bg-amber-50 text-amber-700"
                      : "bg-red-50 text-red-700"
                  }`}
                >
                  {result.score >= 80 ? "Search Ready" : result.score >= 50 ? "Needs Work" : "Critical"}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1 max-w-md">
                Real-time search engine optimization analysis based on Nordic e-commerce ranking factors.
              </p>
              <div className="flex items-center gap-4 mt-2 text-[11px] font-mono text-gray-400">
                <span>{result.stats.wordCount} words</span>
                <span>•</span>
                <span>~{result.stats.readingTimeMinutes} min read</span>
                <span>•</span>
                <span>{images.length} images scanned</span>
              </div>
            </div>
          </div>

          {/* Right: Quick Focus Keyword Input */}
          <div className="w-full md:w-80 bg-gray-50/80 p-3.5 rounded-xl border border-gray-200/80">
            <label className="block text-xs font-bold text-gray-700 mb-1 flex items-center justify-between">
              <span>Target Focus Keyword</span>
              {focusKeyword && (
                <span className="text-[10px] font-mono text-[#17BBEF]">
                  Density: {result.keywordMetrics.density}%
                </span>
              )}
            </label>
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
              <input
                type="text"
                placeholder="e.g. liberty 5 pro max"
                value={focusKeyword}
                onChange={(e) => onChangeFocusKeyword(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-gray-200 rounded-lg focus:border-[#17BBEF] focus:outline-none font-medium"
              />
            </div>
            {/* Keyword presence badges */}
            {focusKeyword && (
              <div className="flex flex-wrap gap-1 mt-2 pt-2 border-t border-gray-200/60">
                <span
                  className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                    result.keywordMetrics.inTitle
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {result.keywordMetrics.inTitle ? "✓ In Title" : "✗ In Title"}
                </span>
                <span
                  className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                    result.keywordMetrics.inSlug
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {result.keywordMetrics.inSlug ? "✓ In Slug" : "✗ In Slug"}
                </span>
                <span
                  className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                    result.keywordMetrics.inHeadings
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {result.keywordMetrics.inHeadings ? "✓ In Headings" : "✗ In Headings"}
                </span>
                <span
                  className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                    result.keywordMetrics.inMetaDescription
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {result.keywordMetrics.inMetaDescription ? "✓ In Meta" : "✗ In Meta"}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main 2-Column Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (Inputs & Checklists) - 7 cols */}
        <div className="lg:col-span-7 space-y-5">
          {/* Metadata Inputs */}
          <div className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h4 className="font-extrabold text-sm text-gray-900">Search Metadata Fields</h4>
              <button
                type="button"
                onClick={() => {
                  if (!metaTitle) onChangeMetaTitle(`${title} | Anker Nordics Official`);
                  if (!metaDescription) {
                    onChangeMetaDescription(
                      `Discover ${title}. Engineered with premium Nordic acoustic fidelity, long battery endurance, and official 24-month replacement warranty.`
                    );
                  }
                }}
                className="text-[11px] font-bold text-[#17BBEF] hover:underline flex items-center gap-1"
              >
                <Sparkles className="h-3 w-3" />
                Auto-Optimize
              </button>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-gray-700">Meta Title</label>
                <span
                  className={`text-[11px] font-mono ${
                    metaTitle.length >= 40 && metaTitle.length <= 60
                      ? "text-emerald-600 font-bold"
                      : "text-gray-400"
                  }`}
                >
                  {metaTitle.length} / 60 characters
                </span>
              </div>
              <input
                type="text"
                placeholder="e.g. soundcore Liberty 5 Pro Max | Anker Nordics Official"
                value={metaTitle}
                onChange={(e) => onChangeMetaTitle(e.target.value)}
                className="w-full px-3.5 py-2 text-xs font-medium border border-gray-200 rounded-xl focus:border-[#17BBEF] focus:outline-none"
              />
              <div className="w-full bg-gray-100 h-1 rounded-full mt-1.5 overflow-hidden">
                <div
                  className={`h-full transition-all ${
                    metaTitle.length > 60
                      ? "bg-red-500"
                      : metaTitle.length >= 40
                      ? "bg-emerald-500"
                      : "bg-amber-400"
                  }`}
                  style={{ width: `${Math.min(100, (metaTitle.length / 60) * 100)}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-gray-700">Meta Description</label>
                <span
                  className={`text-[11px] font-mono ${
                    metaDescription.length >= 120 && metaDescription.length <= 160
                      ? "text-emerald-600 font-bold"
                      : "text-gray-400"
                  }`}
                >
                  {metaDescription.length} / 160 characters
                </span>
              </div>
              <textarea
                rows={3}
                placeholder="Engaging meta description shown on search engine results..."
                value={metaDescription}
                onChange={(e) => onChangeMetaDescription(e.target.value)}
                className="w-full px-3.5 py-2 text-xs font-medium border border-gray-200 rounded-xl focus:border-[#17BBEF] focus:outline-none resize-none"
              />
              <div className="w-full bg-gray-100 h-1 rounded-full mt-1.5 overflow-hidden">
                <div
                  className={`h-full transition-all ${
                    metaDescription.length > 160
                      ? "bg-red-500"
                      : metaDescription.length >= 120
                      ? "bg-emerald-500"
                      : "bg-amber-400"
                  }`}
                  style={{ width: `${Math.min(100, (metaDescription.length / 160) * 100)}%` }}
                />
              </div>
            </div>
          </div>

          {/* Actionable SEO Checklist */}
          <div className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-2xs space-y-3">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h4 className="font-extrabold text-sm text-gray-900">
                Actionable SEO Checklist ({result.checks.length})
              </h4>

              <div className="flex items-center gap-1">
                {(["all", "fail", "warn", "pass"] as const).map((filter) => (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setChecklistFilter(filter)}
                    className={`px-2 py-0.5 text-[10px] font-bold rounded-lg capitalize transition ${
                      checklistFilter === filter
                        ? "bg-gray-900 text-white"
                        : "text-gray-500 hover:bg-gray-100"
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            <div className="divide-y divide-gray-100 max-h-72 overflow-y-auto space-y-1">
              {filteredChecks.map((item) => (
                <div key={item.id} className="py-2.5 flex items-start gap-3">
                  <div className="mt-0.5 shrink-0">
                    {item.status === "pass" ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    ) : item.status === "warn" ? (
                      <AlertTriangle className="h-4 w-4 text-amber-500" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-500" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-gray-900">{item.title}</span>
                      <span
                        className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded ${
                          item.status === "pass"
                            ? "bg-emerald-50 text-emerald-700"
                            : item.status === "warn"
                            ? "bg-amber-50 text-amber-700"
                            : "bg-red-50 text-red-700"
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-600 mt-0.5">{item.message}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5 italic">
                      Tip: {item.recommendation}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (Live Previews) - 5 cols */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-2xs space-y-4">
            {/* Channel Tabs */}
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setPreviewMode("google")}
                  className={`flex items-center gap-1 px-3 py-1 text-xs font-bold rounded-lg transition ${
                    previewMode === "google"
                      ? "bg-gray-900 text-white shadow-2xs"
                      : "text-gray-500 hover:bg-gray-100"
                  }`}
                >
                  <Globe className="h-3 w-3" />
                  <span>Google SERP</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewMode("facebook")}
                  className={`flex items-center gap-1 px-3 py-1 text-xs font-bold rounded-lg transition ${
                    previewMode === "facebook"
                      ? "bg-gray-900 text-white shadow-2xs"
                      : "text-gray-500 hover:bg-gray-100"
                  }`}
                >
                  <FacebookIcon className="h-3 w-3 text-blue-600" />
                  <span>Facebook</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewMode("twitter")}
                  className={`flex items-center gap-1 px-3 py-1 text-xs font-bold rounded-lg transition ${
                    previewMode === "twitter"
                      ? "bg-gray-900 text-white shadow-2xs"
                      : "text-gray-500 hover:bg-gray-100"
                  }`}
                >
                  <TwitterIcon className="h-3 w-3 text-sky-500" />
                  <span>X / Twitter</span>
                </button>
              </div>

              {previewMode === "google" && (
                <div className="flex items-center gap-1 bg-gray-100 p-0.5 rounded-md">
                  <button
                    type="button"
                    onClick={() => setDeviceMode("desktop")}
                    className={`p-1 rounded ${
                      deviceMode === "desktop" ? "bg-white text-gray-900 shadow-2xs" : "text-gray-400"
                    }`}
                    title="Desktop preview"
                  >
                    <Monitor className="h-3 w-3" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeviceMode("mobile")}
                    className={`p-1 rounded ${
                      deviceMode === "mobile" ? "bg-white text-gray-900 shadow-2xs" : "text-gray-400"
                    }`}
                    title="Mobile preview"
                  >
                    <Smartphone className="h-3 w-3" />
                  </button>
                </div>
              )}
            </div>

            {/* PREVIEW 1: GOOGLE SERP */}
            {previewMode === "google" && (
              <div
                className={`p-4 bg-white rounded-xl border border-gray-200/90 shadow-xs space-y-1 ${
                  deviceMode === "mobile" ? "max-w-xs mx-auto border-dashed" : ""
                }`}
              >
                <div className="flex items-center gap-2 text-[11px] text-gray-700">
                  <div className="size-4 rounded-full bg-gray-900 text-[9px] text-white font-bold flex items-center justify-center">
                    A
                  </div>
                  <span className="font-semibold text-gray-900">Anker Nordics</span>
                  <span className="text-gray-400">·</span>
                  <span className="text-gray-500 font-mono truncate">
                    {result.serpPreview.desktop.url}
                  </span>
                </div>
                <div className="text-[17px] font-medium text-[#1a0dab] hover:underline cursor-pointer line-clamp-2 leading-snug pt-0.5">
                  {result.serpPreview.desktop.title}
                </div>
                <div className="text-[12px] text-gray-600 line-clamp-2 leading-relaxed pt-0.5">
                  {result.serpPreview.desktop.snippet}
                </div>
              </div>
            )}

            {/* PREVIEW 2: FACEBOOK / LINKEDIN OPEN GRAPH */}
            {previewMode === "facebook" && (
              <div className="rounded-xl border border-gray-200 overflow-hidden bg-white shadow-xs">
                <div className="h-44 w-full bg-gray-100 relative flex items-center justify-center">
                  <img
                    src={result.socialPreview.openGraph.image}
                    alt="Social Share Banner"
                    className="max-h-full max-w-full object-contain p-2"
                  />
                </div>
                <div className="p-3 space-y-1 bg-gray-50/70 border-t border-gray-200">
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                    ANKERNORDICS.COM
                  </div>
                  <div className="text-xs font-bold text-gray-900 line-clamp-1">
                    {result.socialPreview.openGraph.title}
                  </div>
                  <p className="text-[11px] text-gray-500 line-clamp-2">
                    {result.socialPreview.openGraph.description}
                  </p>
                </div>
              </div>
            )}

            {/* PREVIEW 3: X / TWITTER LARGE SUMMARY CARD */}
            {previewMode === "twitter" && (
              <div className="rounded-xl border border-gray-200 overflow-hidden bg-white shadow-xs">
                <div className="h-44 w-full bg-gray-100 relative flex items-center justify-center">
                  <img
                    src={result.socialPreview.twitter.image}
                    alt="Twitter Card"
                    className="max-h-full max-w-full object-contain p-2"
                  />
                  <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/70 text-white rounded text-[9px] font-mono">
                    ankernordics.com
                  </div>
                </div>
                <div className="p-3 space-y-1">
                  <div className="text-xs font-bold text-gray-900 line-clamp-1">
                    {result.socialPreview.twitter.title}
                  </div>
                  <p className="text-[11px] text-gray-500 line-clamp-2">
                    {result.socialPreview.twitter.description}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
