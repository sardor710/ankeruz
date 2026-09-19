"use client";

import React, { useState } from "react";
import Image from "next/image";
import { VolumeX, Radio, Waves, Cpu } from "lucide-react";

export function PdpPureSilenceSection() {
  const [activeTab, setActiveTab] = useState<"subway" | "flight" | "office">("subway");

  const scenarios = {
    subway: {
      label: "Subway & Train",
      decibel: "105 dB",
      reduction: "-98.5%",
      desc: "Eliminates low-frequency track rumble and screeching wheel friction instantly with 8-sensor active feedback.",
    },
    flight: {
      label: "Airplane Cabin",
      decibel: "95 dB",
      reduction: "-99.0%",
      desc: "Real-time barometric pressure sensor adjusts acoustic calibration at cruising altitude for comfort without ear fatigue.",
    },
    office: {
      label: "Open Office & Cafe",
      decibel: "75 dB",
      reduction: "-95.0%",
      desc: "Isolates keyboard chatter, coffee machine hums, and nearby speech so you stay completely in the flow state.",
    },
  };

  return (
    <section id="pure-silence" className="relative overflow-hidden bg-[#0A0D14] py-20 text-white sm:py-32">
      <div className="mx-auto max-w-[1440px] px-4 min-[768px]:px-8 min-[1024px]:px-16 min-[1920px]:px-[calc(50%-832px)]">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3.5 py-1 text-xs font-semibold text-[#17BBEF]">
            <VolumeX className="size-3.5" />
            <span>Adaptive Active Noise Cancelling 3.0</span>
          </div>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-5xl">
            Instant Pure Silence
          </h2>
          <p className="mt-4 text-sm text-gray-400 sm:text-base">
            100% more effective noise cancellation than our previous flagship model. Powered by 8 acoustic sensors and the Thus™ AI Chip processing 384,000 noise signals per second.
          </p>
        </div>

        {/* Feature showcase split */}
        <div className="mt-16 grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          {/* Left: Product Stage Image */}
          <div className="relative aspect-square w-full overflow-hidden rounded-3xl border border-gray-800 bg-gradient-to-b from-gray-900 to-black p-8 lg:col-span-7">
            <Image
              src="/images/d1204_instant_pure_silence_black.png"
              alt="Instant Pure Silence Acoustic Architecture"
              fill
              sizes="(max-width: 1024px) 100vw, 720px"
              className="object-contain"
            />
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between rounded-xl bg-black/60 p-4 backdrop-blur-md border border-white/10">
              <div>
                <p className="text-xs font-bold text-gray-300">Processing Bandwidth</p>
                <p className="text-lg font-extrabold text-[#17BBEF]">384K Signals / sec</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold text-gray-300">Adaptive Range</p>
                <p className="text-lg font-extrabold text-emerald-400">Up to 42 dB</p>
              </div>
            </div>
          </div>

          {/* Right: Technical Highlights & Interactive Scenarios */}
          <div className="space-y-6 lg:col-span-5">
            <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6 backdrop-blur-xs">
              <div className="flex items-center gap-3 text-[#17BBEF]">
                <Cpu className="size-5" />
                <h3 className="text-base font-bold text-white">Dual Thus™ AI Chip Architecture</h3>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-gray-400">
                Independent AI noise-cancellation DSP runs dual neural networks in real time to neutralize unpredictable sudden transients like sirens, dropped cutlery, and train doors.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6 backdrop-blur-xs">
              <div className="flex items-center gap-3 text-cyan-400">
                <Radio className="size-5" />
                <h3 className="text-base font-bold text-white">Real-Time Acoustic Seal Test</h3>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-gray-400">
                In-ear microphones analyze internal ear canal acoustics every 0.3 seconds to compensate for jaw movement, glasses frames, and loose fit.
              </p>
            </div>

            {/* Scenario Tabs */}
            <div className="rounded-2xl border border-cyan-500/20 bg-cyan-950/20 p-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold tracking-wider text-[#17BBEF] uppercase">
                  Adaptive Modes
                </span>
                <span className="text-xs font-bold text-emerald-400">
                  {scenarios[activeTab].reduction}
                </span>
              </div>

              <div className="mt-4 flex gap-2 rounded-lg bg-black/40 p-1">
                {(Object.keys(scenarios) as Array<keyof typeof scenarios>).map((key) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setActiveTab(key)}
                    className={`flex-1 rounded-md py-1.5 text-xs font-bold transition ${
                      activeTab === key
                        ? "bg-[#17BBEF] text-white shadow-xs"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    {scenarios[key].label}
                  </button>
                ))}
              </div>

              <div className="mt-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400">Ambient Noise Level:</span>
                  <span className="font-bold text-white">{scenarios[activeTab].decibel}</span>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-gray-300">
                  {scenarios[activeTab].desc}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
