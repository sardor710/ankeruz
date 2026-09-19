"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, X } from "lucide-react";

export function PdpComparisonTable() {
  const models = [
    {
      name: "Liberty 5 Pro Max",
      subtitle: "Flagship AI Recording Earbuds",
      price: "2 690 000 so'm",
      image: "/images/1204_black.png",
      isCurrent: true,
      href: "/products/d1204",
      specs: {
        formFactor: "In-Ear with Smart Touch Case",
        aiNoteTaker: true,
        smartCaseDisplay: "1.78\" AMOLED Touchscreen",
        noiseCancelling: "Adaptive ANC 3.0 (384k signals/sec)",
        drivers: "Dual Coaxial (10.5mm + 4.6mm BA)",
        codecs: "LDAC, AAC, SBC (Hi-Res Wireless)",
        microphones: "6 Mics + 4 Bone-Conduction VPUs",
        batteryLife: "10h / 40h with Smart Case",
        fastCharge: "10 min = 4 hours",
        waterproofing: "IPX5 water-resistant",
      },
    },
    {
      name: "soundcore P42i",
      subtitle: "Compact Everyday ANC",
      price: "665 000 so'm",
      image: "/images/d1205_pc_1664x640_2.png",
      isCurrent: false,
      href: "/products/d1205",
      specs: {
        formFactor: "In-Ear Compact",
        aiNoteTaker: false,
        smartCaseDisplay: "LED Battery Indicator",
        noiseCancelling: "Hybrid ANC (up to 42dB)",
        drivers: "11mm Oversized Composite",
        codecs: "AAC, SBC",
        microphones: "4 Beamforming Mics",
        batteryLife: "12h / 60h with case",
        fastCharge: "10 min = 2 hours",
        waterproofing: "IPX5 water-resistant",
      },
    },
    {
      name: "soundcore Space One Pro",
      subtitle: "Over-Ear Travel Flagship",
      price: "2 199 000 so'm",
      image: "/images/1204_gold.png",
      isCurrent: false,
      href: "/products/d1204",
      specs: {
        formFactor: "Over-Ear Foldable Headphone",
        aiNoteTaker: false,
        smartCaseDisplay: "Hard Shell Travel Pouch",
        noiseCancelling: "4-Stage Active Adaptive ANC",
        drivers: "40mm Tri-Layer PET Drivers",
        codecs: "LDAC, AAC, SBC (Hi-Res)",
        microphones: "4 Microphones with AI Clear Voice",
        batteryLife: "40h (ANC on) / 60h (ANC off)",
        fastCharge: "5 min = 8 hours",
        waterproofing: "Splash-resistant",
      },
    },
  ];

  return (
    <section id="compare" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-[1440px] px-4 min-[768px]:px-8 min-[1024px]:px-16 min-[1920px]:px-[calc(50%-832px)]">
        {/* Section Title */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-bold tracking-widest text-[#17BBEF] uppercase">
            Model Comparison
          </span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Compare soundcore Flagships
          </h2>
          <p className="mt-3 text-sm text-gray-500">
            Find the perfect sound companion for your daily productivity, commute, and music listening.
          </p>
        </div>

        {/* Matrix Table */}
        <div className="mt-14 overflow-x-auto">
          <table className="w-full min-w-[700px] border-collapse text-left text-xs">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="w-1/4 pb-6 font-bold text-gray-400 uppercase">Features</th>
                {models.map((m, idx) => (
                  <th key={idx} className="w-1/4 pb-6">
                    <div className={`flex flex-col items-center p-4 rounded-2xl ${m.isCurrent ? "bg-cyan-50/50 border border-[#17BBEF]" : ""}`}>
                      <div className="relative size-24">
                        <Image
                          src={m.image}
                          alt={m.name}
                          fill
                          sizes="96px"
                          className="object-contain"
                        />
                      </div>
                      <span className="mt-3 text-sm font-bold text-gray-900 text-center">{m.name}</span>
                      <span className="text-[11px] text-gray-500 text-center">{m.subtitle}</span>
                      <span className="mt-2 text-base font-extrabold text-black">{m.price}</span>
                      {m.isCurrent ? (
                        <span className="mt-2 rounded-full bg-[#17BBEF] px-3 py-1 text-[10px] font-bold text-white uppercase">
                          Current Model
                        </span>
                      ) : (
                        <Link
                          href={m.href}
                          className="mt-2 rounded-full border border-gray-300 px-3 py-1 text-[10px] font-bold text-gray-700 hover:border-black"
                        >
                          View Details
                        </Link>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {/* Form Factor */}
              <tr>
                <td className="py-4 font-bold text-gray-700">Form Factor</td>
                {models.map((m, i) => (
                  <td key={i} className="py-4 text-center font-medium text-gray-600">
                    {m.specs.formFactor}
                  </td>
                ))}
              </tr>

              {/* AI Note-Taker */}
              <tr>
                <td className="py-4 font-bold text-gray-700">AI Note-Taker & Transcription</td>
                {models.map((m, i) => (
                  <td key={i} className="py-4 text-center">
                    {m.specs.aiNoteTaker ? (
                      <span className="inline-flex items-center gap-1 font-bold text-emerald-600">
                        <Check className="size-4" /> Yes (Ask Anka AI)
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 font-medium text-gray-400">
                        <X className="size-4" /> No
                      </span>
                    )}
                  </td>
                ))}
              </tr>

              {/* Smart Case Display */}
              <tr>
                <td className="py-4 font-bold text-gray-700">Case Display & Control</td>
                {models.map((m, i) => (
                  <td key={i} className="py-4 text-center font-medium text-gray-600">
                    {m.specs.smartCaseDisplay}
                  </td>
                ))}
              </tr>

              {/* Noise Cancelling */}
              <tr>
                <td className="py-4 font-bold text-gray-700">Active Noise Cancellation</td>
                {models.map((m, i) => (
                  <td key={i} className="py-4 text-center font-medium text-gray-600">
                    {m.specs.noiseCancelling}
                  </td>
                ))}
              </tr>

              {/* Drivers */}
              <tr>
                <td className="py-4 font-bold text-gray-700">Acoustic Drivers</td>
                {models.map((m, i) => (
                  <td key={i} className="py-4 text-center font-medium text-gray-600">
                    {m.specs.drivers}
                  </td>
                ))}
              </tr>

              {/* Codecs */}
              <tr>
                <td className="py-4 font-bold text-gray-700">Hi-Res Audio Codecs</td>
                {models.map((m, i) => (
                  <td key={i} className="py-4 text-center font-medium text-gray-600">
                    {m.specs.codecs}
                  </td>
                ))}
              </tr>

              {/* Microphones */}
              <tr>
                <td className="py-4 font-bold text-gray-700">Microphones & VPUs</td>
                {models.map((m, i) => (
                  <td key={i} className="py-4 text-center font-medium text-gray-600">
                    {m.specs.microphones}
                  </td>
                ))}
              </tr>

              {/* Battery Life */}
              <tr>
                <td className="py-4 font-bold text-gray-700">Total Battery Playtime</td>
                {models.map((m, i) => (
                  <td key={i} className="py-4 text-center font-medium text-gray-600">
                    {m.specs.batteryLife}
                  </td>
                ))}
              </tr>

              {/* Water Resistance */}
              <tr>
                <td className="py-4 font-bold text-gray-700">Water Resistance Rating</td>
                {models.map((m, i) => (
                  <td key={i} className="py-4 text-center font-medium text-gray-600">
                    {m.specs.waterproofing}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
