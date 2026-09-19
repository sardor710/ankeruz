"use client";

import React from "react";
import Image from "next/image";
import { PhoneCall, Disc, Zap, ShieldCheck } from "lucide-react";

export function PdpCallsAndChipSection() {
  return (
    <section id="clear-calls" className="bg-[#F7F8FA] py-20 sm:py-28">
      <div className="mx-auto max-w-[1440px] px-4 min-[768px]:px-8 min-[1024px]:px-16 min-[1920px]:px-[calc(50%-832px)]">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-cyan-100/60 px-3.5 py-1 text-xs font-semibold text-[#0c7ea5]">
            <PhoneCall className="size-3.5 text-[#17BBEF]" />
            <span>Next-Gen Voice Isolation</span>
          </div>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            Whisper-Clear Calls
          </h2>
          <p className="mt-4 text-base text-gray-600">
            Equipped with 10 sensors and the Thus™ AI Chip, enjoy crystal-clear calls in 100 dB+ noisy environments or even whisper in quiet conference rooms. Your voice is always heard.
          </p>
        </div>

        {/* 2-Column Split: Image + Sensor breakdown */}
        <div className="mt-16 grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          {/* Left Column: Lifestyle Image */}
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-gray-200 shadow-xl lg:col-span-6">
            <Image
              src="/images/d1204g11_moments2_1.png"
              alt="Whisper-Clear Calls in Busy Environment"
              fill
              sizes="(max-width: 1024px) 100vw, 640px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <span className="rounded bg-black/60 px-2 py-1 text-[11px] font-bold uppercase tracking-wider backdrop-blur-xs">
                Tested in 100 dB Noise
              </span>
              <p className="mt-2 text-sm font-semibold">
                &ldquo;People on the other end of Zoom had no idea I was walking through Stockholm Central Station.&rdquo;
              </p>
            </div>
          </div>

          {/* Right Column: Sensor Architecture */}
          <div className="space-y-6 lg:col-span-6">
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-xs">
              <div className="flex items-center gap-3 text-[#17BBEF]">
                <Zap className="size-5" />
                <h3 className="text-base font-bold text-gray-900">
                  10-Sensor Integrated Array
                </h3>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-gray-600">
                6 beamforming microphones track spatial directionality, while 4 bone-conduction voice pick-up (VPU) sensors detect skull vibrations to separate human voice from intense surrounding crowd noise.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-xs">
              <div className="flex items-center gap-3 text-cyan-600">
                <Disc className="size-5" />
                <h3 className="text-base font-bold text-gray-900">
                  HearID 5.0 Personalized Sound
                </h3>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-gray-600">
                Measures your unique ear canal sensitivity across 8 frequency bands. Built with dual coaxial drivers (10.5mm woofer + 4.6mm balanced armature) and certified for LDAC 24-bit/96kHz Hi-Res Lossless audio.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-xs">
              <div className="flex items-center gap-3 text-emerald-600">
                <ShieldCheck className="size-5" />
                <h3 className="text-base font-bold text-gray-900">
                  Zero-Latency Offline Voice Commands
                </h3>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-gray-600">
                20 built-in voice commands allow hands-free music skip, volume control, and call handling with offline processing on the Thus™ AI Chip — zero lag and zero cloud dependency.
              </p>
            </div>
          </div>
        </div>

        {/* Chip Banner Feature */}
        <div className="mt-16 rounded-3xl border border-gray-100 bg-white p-8 shadow-sm sm:p-12">
          <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-12">
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl md:col-span-5">
              <Image
                src="/images/d1203z21_rich-image_elkjop_nod_soundcore_03_en_v1.png"
                alt="ANKER Thus™ 150x Computing Power AI Chip"
                fill
                sizes="480px"
                className="object-contain"
              />
            </div>
            <div className="md:col-span-7">
              <span className="text-xs font-bold tracking-wider text-[#17BBEF] uppercase">
                Hardware Architecture
              </span>
              <h3 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">
                ANKER Thus™ 150× Computing Power*
              </h3>
              <p className="mt-3 text-xs leading-relaxed text-gray-600 sm:text-sm">
                Custom-engineered neural silicon delivers 150 times the floating-point computational capacity of standard Bluetooth audio processors. Enables simultaneous real-time acoustic echo cancellation, multi-language speech transcription, and ultra-low power consumption.
              </p>
              <div className="mt-6 flex items-center gap-6 text-xs font-bold text-gray-700">
                <div>
                  <span className="block text-xl font-extrabold text-black">150×</span>
                  <span className="text-gray-500">Neural Compute</span>
                </div>
                <div className="h-8 w-[1px] bg-gray-200" />
                <div>
                  <span className="block text-xl font-extrabold text-black">40 Hrs</span>
                  <span className="text-gray-500">Total Battery</span>
                </div>
                <div className="h-8 w-[1px] bg-gray-200" />
                <div>
                  <span className="block text-xl font-extrabold text-black">10 Min</span>
                  <span className="text-gray-500">= 4h Playback</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
