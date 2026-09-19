"use client";

import React, { useState } from "react";
import { Star, CheckCircle, ThumbsUp, HelpCircle, ChevronDown } from "lucide-react";

export function PdpReviewsSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const ratingBars = [
    { stars: 5, percentage: 92, count: 63 },
    { stars: 4, percentage: 6, count: 4 },
    { stars: 3, percentage: 2, count: 2 },
    { stars: 2, percentage: 0, count: 0 },
    { stars: 1, percentage: 0, count: 0 },
  ];

  const reviews = [
    {
      author: "Henrik Bergström",
      location: "Stockholm, Sweden",
      date: "August 18, 2026",
      rating: 5,
      title: "The AI transcription in meetings is a genuine superpower.",
      content:
        "I was skeptical about recording offline meetings with earbuds, but the transcription precision is remarkable. It picks up soft-spoken colleagues across the table and the Ask Anka web portal generated clean executive bullet points in seconds. Best business purchase this year.",
      verified: true,
      helpful: 42,
    },
    {
      author: "Astrid Lindholm",
      location: "Oslo, Norway",
      date: "August 04, 2026",
      rating: 5,
      title: "Insane noise cancellation on the Oslo T-bane train.",
      content:
        "The Adaptive ANC completely neutralizes the high pitch screeching on the metro. The touchscreen case is super handy when I don't want to dig my phone out of my winter coat just to toggle transparency mode.",
      verified: true,
      helpful: 28,
    },
    {
      author: "Mikael Virtanen",
      location: "Helsinki, Finland",
      date: "July 29, 2026",
      rating: 5,
      title: "Call quality in heavy Nordic winds blew me away.",
      content:
        "People literally couldn't tell I was biking along the harbor in 15 m/s gusty winds. The bone-conduction mics isolate my voice from wind whistle completely. LDAC sound quality is on par with $400 audiophile wired sets.",
      verified: true,
      helpful: 19,
    },
  ];

  const faqs = [
    {
      question: "How does the AI Note-Taker work without internet?",
      answer:
        "The soundcore Liberty 5 Pro Max utilizes the on-board ANKER Thus™ AI processor to record high-fidelity multi-mic audio locally onto the smart case storage. Once connected via Bluetooth or Wi-Fi, the soundcore app syncs the encrypted audio and delivers fast, structured action items and summaries.",
    },
    {
      question: "Is the 120 minutes/month free subscription included in the Nordic region?",
      answer:
        "Yes! Every Liberty 5 Pro Max includes an automated 24-month complimentary Starter Plan providing 120 minutes of AI transcription per month. Additional time can be topped up through the soundcore app if needed.",
    },
    {
      question: "Can I connect the earbuds to three devices at the same time?",
      answer:
        "Yes, Liberty 5 Pro Max supports Triple-Device Multipoint Bluetooth 5.4 connection, allowing seamless automatic audio handover between your laptop, tablet, and smartphone without manual unpairing.",
    },
    {
      question: "What is covered under the Nordic 18-Month Warranty?",
      answer:
        "All purchases made through Anker Nordics are protected by our comprehensive 18-month warranty covering manufacturing defects, battery performance degradation, and acoustic issues, plus 30-day money-back guarantee.",
    },
  ];

  return (
    <section id="reviews" className="bg-[#F9FAFB] py-20 sm:py-28">
      <div className="mx-auto max-w-[1440px] px-4 min-[768px]:px-8 min-[1024px]:px-16 min-[1920px]:px-[calc(50%-832px)]">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-bold tracking-widest text-[#17BBEF] uppercase">
            Customer Feedback
          </span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Customer Reviews & Ratings
          </h2>
        </div>

        {/* Rating Breakdown Grid */}
        <div className="mt-12 grid grid-cols-1 gap-8 rounded-3xl border border-gray-100 bg-white p-8 shadow-xs md:grid-cols-12 md:p-12">
          {/* Overall score (4 cols) */}
          <div className="flex flex-col items-center justify-center border-b border-gray-100 pb-8 md:col-span-4 md:border-b-0 md:border-r md:pb-0">
            <span className="text-6xl font-black text-black">4.9</span>
            <div className="mt-3 flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="size-5 fill-amber-400" />
              ))}
            </div>
            <p className="mt-2 text-xs font-bold text-gray-700">Based on 69 verified reviews</p>
            <p className="text-[11px] text-gray-400">98% of customers recommend this product</p>
          </div>

          {/* Bar distributions (8 cols) */}
          <div className="space-y-2.5 md:col-span-8 md:pl-6">
            {ratingBars.map((bar) => (
              <div key={bar.stars} className="flex items-center gap-4 text-xs font-medium text-gray-600">
                <span className="w-12 text-right font-bold text-gray-900">{bar.stars} Stars</span>
                <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-gray-100">
                  <div
                    className="h-full rounded-full bg-amber-400"
                    style={{ width: `${bar.percentage}%` }}
                  />
                </div>
                <span className="w-8 text-left text-gray-400">{bar.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews Cards List */}
        <div className="mt-12 space-y-6">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-gray-100 bg-white p-6 shadow-xs sm:p-8"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-amber-400">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="size-4 fill-amber-400" />
                  ))}
                </div>
                <span className="text-xs text-gray-400">{rev.date}</span>
              </div>

              <h4 className="mt-3 text-sm font-bold text-gray-900 sm:text-base">{rev.title}</h4>
              <p className="mt-2 text-xs leading-relaxed text-gray-600 sm:text-sm">{rev.content}</p>

              <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4 text-xs text-gray-500">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-gray-800">{rev.author}</span>
                  <span className="text-gray-300">·</span>
                  <span className="text-gray-400">{rev.location}</span>
                  {rev.verified && (
                    <span className="hidden items-center gap-1 font-semibold text-emerald-600 sm:inline-flex">
                      <CheckCircle className="size-3.5" /> Verified Buyer
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1.5 text-gray-400">
                  <ThumbsUp className="size-3.5" />
                  <span>Helpful ({rev.helpful})</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div id="specs" className="mt-20">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-cyan-100/60 px-3.5 py-1 text-xs font-semibold text-[#0c7ea5]">
              <HelpCircle className="size-3.5 text-[#17BBEF]" />
              <span>Have Questions?</span>
            </div>
            <h3 className="mt-3 text-2xl font-bold text-gray-900 sm:text-3xl">
              Frequently Asked Questions
            </h3>
          </div>

          <div className="mx-auto mt-8 max-w-3xl space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="rounded-xl border border-gray-200 bg-white overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpenFaq((prev) => (prev === i ? null : i))}
                  className="flex w-full items-center justify-between p-5 text-left text-xs font-bold text-gray-900 hover:bg-gray-50 sm:text-sm"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`size-4 text-gray-400 transition-transform ${
                      openFaq === i ? "rotate-180 text-[#17BBEF]" : ""
                    }`}
                  />
                </button>
                {openFaq === i && (
                  <div className="border-t border-gray-100 bg-[#FAFAFA] p-5 text-xs leading-relaxed text-gray-600 animate-in fade-in">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
