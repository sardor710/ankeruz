"use client";

import React from "react";
import Image from "next/image";
import { Mic, Shield, Sparkles } from "lucide-react";

export function PdpOverviewHero() {
  return (
    <section id="overview" className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-[1440px] px-4 min-[768px]:px-8 min-[1024px]:px-16 min-[1920px]:px-[calc(50%-832px)]">
        {/* Title Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-bold tracking-widest text-[#17BBEF] uppercase">
            World&apos;s First Innovation
          </span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            Smart Screen Earbuds with AI Voice Recorder
          </h2>
          <p className="mt-4 text-base text-gray-600 sm:text-lg">
            Effortlessly capture offline meetings, generate AI-powered summaries with action items, and manage workflows directly from the 1.78&quot; AMOLED touchscreen case.
          </p>
        </div>

        {/* Cinematic Main Banner Image */}
        <div className="relative mt-12 aspect-[16/9] w-full overflow-hidden rounded-3xl bg-black shadow-2xl min-[1024px]:aspect-[21/9]">
          <Image
            src="/images/d1204z11_dtc_listing_banner_mrc_td02_us_v1.jpg"
            alt="soundcore Liberty 5 Pro Max Smart Screen with AI Voice Recorder"
            fill
            sizes="1440px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          <div className="absolute bottom-8 left-8 right-8 max-w-xl text-white sm:bottom-12 sm:left-12">
            <span className="rounded-full bg-[#17BBEF] px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
              Ask Anka™ AI Assistant
            </span>
            <h3 className="mt-3 text-2xl font-bold sm:text-3xl">
              Turn Hours of Conversation Into Instant Action Items
            </h3>
            <p className="mt-2 text-xs text-gray-300 sm:text-sm">
              Includes complimentary Starter Plan with 120 minutes of high-precision AI transcription per month for 24 months.
            </p>
          </div>
        </div>

        {/* 3 Core Highlight Columns */}
        <div id="smart-screen" className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Card 1: AI Note-Taker */}
          <div className="rounded-2xl border border-gray-100 bg-[#F9FAFB] p-8 transition-all hover:border-gray-200 hover:shadow-lg">
            <div className="flex size-12 items-center justify-center rounded-xl bg-cyan-50 text-[#17BBEF]">
              <Mic className="size-6" />
            </div>
            <h3 className="mt-6 text-lg font-bold text-gray-900">
              AI Note-Taker & Subscription
            </h3>
            <p className="mt-2.5 text-xs leading-relaxed text-gray-600">
              Record OFFLINE meetings and easily transcribe them on demand. Manage workflows on the go via the soundcore app (iOS/Android), or use the Web portal with the &ldquo;Ask Anka&rdquo; AI assistant for efficient desktop management.
            </p>
            <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-[#17BBEF]">
              <span>120 min/mo free for 24 months</span>
            </div>
          </div>

          {/* Card 2: Enterprise Privacy */}
          <div className="rounded-2xl border border-gray-100 bg-[#F9FAFB] p-8 transition-all hover:border-gray-200 hover:shadow-lg">
            <div className="flex size-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <Shield className="size-6" />
            </div>
            <h3 className="mt-6 text-lg font-bold text-gray-900">
              Strict Business-Grade Privacy
            </h3>
            <p className="mt-2.5 text-xs leading-relaxed text-gray-600">
              Secured with local AES-256 encryption. Without cloud sync enabled, temporary cloud files are immediately deleted upon transcription receipt. Built to ISO 27001/27701, SOC 2 Type 1, HIPAA, EN 18031, and NIST IR 8425 compliance.
            </p>
            <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600">
              <span>Zero data retained without consent</span>
            </div>
          </div>

          {/* Card 3: AMOLED Touchscreen */}
          <div className="rounded-2xl border border-gray-100 bg-[#F9FAFB] p-8 transition-all hover:border-gray-200 hover:shadow-lg">
            <div className="flex size-12 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
              <Sparkles className="size-6" />
            </div>
            <h3 className="mt-6 text-lg font-bold text-gray-900">
              1.78&quot; AMOLED Screen Control
            </h3>
            <p className="mt-2.5 text-xs leading-relaxed text-gray-600">
              Access the AI Voice Recorder, switch adaptive ANC levels, and manage earbud audio presets directly from the full-color touchscreen case. Add personalized custom wallpapers to make your charging case truly yours.
            </p>
            <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-amber-600">
              <span>Real-time battery & equalizer widget</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
