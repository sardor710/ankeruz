"use client";

import React, { useState } from "react";
import {
  DownloadCloud,
  Search,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Sparkles,
  Layers,
  Image as ImageIcon,
  DollarSign,
  Package,
  X,
  ArrowRight,
  RefreshCw,
  Sliders,
  Check,
  Star,
} from "lucide-react";
import type { FusionProduct, FusionProductMedia } from "@/lib/cms/fusion-cms";

interface ProductImporterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImportProduct: (product: FusionProduct) => void;
}

export function ProductImporterModal({
  isOpen,
  onClose,
  onImportProduct,
}: ProductImporterModalProps) {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [extractionStage, setExtractionStage] = useState<number>(0); // 0 = idle, 1 = connect, 2 = dom, 3 = media, 4 = done
  const [error, setError] = useState<string | null>(null);
  const [extractedProduct, setExtractedProduct] = useState<FusionProduct | null>(null);

  // Demo presets
  const DEMO_PRESETS = [
    {
      label: "soundcore Liberty 4 NC",
      url: "https://www.soundcore.com/products/a3947g11",
    },
    {
      label: "Anker Prime 26K 300W",
      url: "https://www.anker.com/products/a110ah11",
    },
    {
      label: "eufyCam C37 Dual-Cam 4K",
      url: "https://www.eufy.com/products/t814x321",
    },
  ];

  if (!isOpen) return null;

  const handleStartImport = async (targetUrl?: string) => {
    const finalUrl = targetUrl || url;
    if (!finalUrl.trim()) return;

    setIsLoading(true);
    setError(null);
    setExtractionStage(1);

    try {
      setTimeout(() => setExtractionStage(2), 600);
      setTimeout(() => setExtractionStage(3), 1200);

      const res = await fetch("/api/cms/import-product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: finalUrl }),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || "Failed to parse product page.");
      }

      setExtractionStage(4);
      setExtractedProduct(json.data);
    } catch (err: any) {
      setError(err?.message || "Extraction failed. Please check the URL.");
      setExtractionStage(0);
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmImport = () => {
    if (extractedProduct) {
      onImportProduct(extractedProduct);
      onClose();
    }
  };

  const handleTogglePrimary = (mediaItem: FusionProductMedia) => {
    if (!extractedProduct) return;
    const updatedGallery = extractedProduct.gallery.map((m) => ({
      ...m,
      isPrimary: m.id === mediaItem.id,
    }));
    setExtractedProduct({
      ...extractedProduct,
      image: mediaItem.url,
      gallery: updatedGallery,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-5xl w-full p-6 shadow-2xl border border-gray-100 max-h-[92vh] overflow-y-auto flex flex-col justify-between">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-5">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-xl bg-cyan-50 text-[#17BBEF] flex items-center justify-center border border-cyan-100">
                <DownloadCloud className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-lg text-gray-900 tracking-tight">
                  Import Model & Media from URL
                </h3>
                <p className="text-xs text-gray-400">
                  Scrapes photos, overview layout, specifications, and SKU from any product link.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* URL Input Bar */}
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="url"
                  placeholder="Paste reference product link (e.g. https://www.soundcore.com/products/...)"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-mono font-medium focus:outline-none focus:border-[#17BBEF] shadow-2xs"
                />
              </div>

              <button
                type="button"
                disabled={isLoading || !url.trim()}
                onClick={() => handleStartImport()}
                className="flex items-center justify-center gap-2 px-5 py-2.5 bg-gray-900 hover:bg-black disabled:bg-gray-300 text-white text-xs font-bold rounded-xl transition shadow-xs"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                    <span>Extracting...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="h-3.5 w-3.5 text-[#17BBEF]" />
                    <span>Scrape & Import</span>
                  </>
                )}
              </button>
            </div>

            {/* Quick Demo Preset Buttons */}
            <div className="flex items-center gap-2 flex-wrap text-xs">
              <span className="font-bold text-gray-400 text-[11px]">Demo Presets:</span>
              {DEMO_PRESETS.map((preset) => (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => {
                    setUrl(preset.url);
                    handleStartImport(preset.url);
                  }}
                  className="px-2.5 py-1 rounded-lg border border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-700 text-[11px] font-semibold transition"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Extraction Stepper */}
          {isLoading && (
            <div className="mt-6 p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-3">
              <div className="text-xs font-bold text-gray-700">Extraction Pipeline Progress</div>
              <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-mono">
                <div
                  className={`p-2 rounded-lg border transition ${
                    extractionStage >= 1
                      ? "bg-white border-emerald-300 text-emerald-700 font-bold shadow-2xs"
                      : "text-gray-400"
                  }`}
                >
                  1. DNS & Connect
                </div>
                <div
                  className={`p-2 rounded-lg border transition ${
                    extractionStage >= 2
                      ? "bg-white border-emerald-300 text-emerald-700 font-bold shadow-2xs"
                      : "text-gray-400"
                  }`}
                >
                  2. HTML & Schema
                </div>
                <div
                  className={`p-2 rounded-lg border transition ${
                    extractionStage >= 3
                      ? "bg-white border-emerald-300 text-emerald-700 font-bold shadow-2xs"
                      : "text-gray-400"
                  }`}
                >
                  3. Media Gallery
                </div>
                <div
                  className={`p-2 rounded-lg border transition ${
                    extractionStage >= 4
                      ? "bg-white border-emerald-300 text-emerald-700 font-bold shadow-2xs"
                      : "text-gray-400"
                  }`}
                >
                  4. Specs Synthesized
                </div>
              </div>
            </div>
          )}

          {/* Extracted Product Workbench */}
          {extractedProduct && !isLoading && (
            <div className="mt-6 space-y-5">
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span>Model Successfully Scraped & Synthesized!</span>
                </div>
                <span className="text-[11px] font-mono text-emerald-700">
                  {extractedProduct.gallery.length} photos · {extractedProduct.specGroups.length} spec groups
                </span>
              </div>

              {/* 2-Pane Side-by-Side Review */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                {/* Left Pane: Gallery Photos (5 cols) */}
                <div className="md:col-span-5 space-y-3 bg-gray-50/70 p-4 rounded-xl border border-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
                      <ImageIcon className="h-4 w-4 text-[#17BBEF]" />
                      Extracted Media Gallery ({extractedProduct.gallery.length})
                    </span>
                    <span className="text-[10px] text-gray-400">Click star to set Hero</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5 max-h-72 overflow-y-auto">
                    {extractedProduct.gallery.map((img) => (
                      <div
                        key={img.id}
                        className={`relative rounded-xl border p-2 bg-white flex flex-col items-center justify-center transition ${
                          img.isPrimary
                            ? "border-[#17BBEF] ring-2 ring-[#17BBEF]/20 shadow-xs"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="h-20 w-full flex items-center justify-center p-1">
                          <img
                            src={img.url}
                            alt={img.altText}
                            className="max-h-full max-w-full object-contain"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => handleTogglePrimary(img)}
                          className={`mt-1.5 px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1 transition ${
                            img.isPrimary
                              ? "bg-gray-900 text-white"
                              : "bg-gray-100 text-gray-600 hover:bg-black hover:text-white"
                          }`}
                        >
                          <Star
                            className={`h-2.5 w-2.5 ${img.isPrimary ? "fill-amber-400 text-amber-400" : ""}`}
                          />
                          <span>{img.isPrimary ? "Primary Hero" : "Set Hero"}</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Pane: Structured Product & Specs (7 cols) */}
                <div className="md:col-span-7 space-y-3 bg-white p-4 rounded-xl border border-gray-200">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-gray-400 tracking-wider">
                      Product Name & Brand
                    </span>
                    <h4 className="font-extrabold text-sm text-gray-900 line-clamp-1">
                      {extractedProduct.title}
                    </h4>
                    <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">
                      {extractedProduct.subtitle}
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-gray-100 text-xs">
                    <div>
                      <span className="text-[10px] text-gray-400 block font-semibold">SKU</span>
                      <span className="font-mono font-bold text-gray-800">
                        {extractedProduct.sku}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-400 block font-semibold">Brand</span>
                      <span className="capitalize font-bold text-[#0c7ea5]">
                        {extractedProduct.brand}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-400 block font-semibold">Price</span>
                      <span className="font-mono font-extrabold text-gray-900">
                        {extractedProduct.price}
                      </span>
                    </div>
                  </div>

                  {/* Specs Table Preview */}
                  <div className="pt-2 border-t border-gray-100">
                    <span className="text-[10px] font-bold uppercase text-gray-400 tracking-wider mb-1.5 block">
                      Parsed Technical Specifications ({extractedProduct.specGroups.length} groups)
                    </span>
                    <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                      {extractedProduct.specGroups.map((group) => (
                        <div
                          key={group.id}
                          className="bg-gray-50 p-2.5 rounded-lg border border-gray-200 text-xs"
                        >
                          <div className="font-bold text-gray-800 mb-1">{group.groupName}</div>
                          <div className="space-y-1">
                            {group.items.map((item, i) => (
                              <div
                                key={i}
                                className="flex items-center justify-between text-[11px] border-b border-gray-200/50 pb-0.5"
                              >
                                <span className="text-gray-500 font-medium">{item.key}</span>
                                <span className="font-semibold text-gray-800 text-right">
                                  {item.value}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Actions */}
        <div className="flex items-center justify-between pt-5 border-t border-gray-100 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-200 text-gray-600 text-xs font-bold rounded-xl hover:bg-gray-50 transition"
          >
            Cancel
          </button>

          {extractedProduct && (
            <button
              type="button"
              onClick={handleConfirmImport}
              className="flex items-center gap-2 px-6 py-2.5 bg-gray-900 hover:bg-black text-white text-xs font-bold rounded-xl transition shadow-md hover:shadow-lg"
            >
              <span>Import to Product Studio</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
