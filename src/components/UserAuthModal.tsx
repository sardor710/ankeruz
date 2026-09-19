"use client";

import React, { useState } from "react";
import { X, CheckCircle, User, ShieldCheck } from "lucide-react";
import { useAuth } from "@/lib/auth-context";

export function UserAuthModal() {
  const { user, isAuthenticated, isAuthModalOpen, closeAuthModal, loginDemo, logout } = useAuth();
  const [tab, setTab] = useState<"signin" | "register">("signin");
  const [email, setEmail] = useState("alex.nordic@example.com");
  const [name, setName] = useState("Alex Lindqvist");
  const [password, setPassword] = useState("••••••••");

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    loginDemo(email, tab === "register" ? name : undefined);
  };

  return (
    <div className="fixed inset-0 z-[250] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={closeAuthModal}
      />

      {/* Modal Dialog */}
      <div className="relative z-10 w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl transition-all sm:p-8">
        <button
          type="button"
          onClick={closeAuthModal}
          className="absolute top-5 right-5 flex size-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700"
          aria-label="Close dialog"
        >
          <X className="size-5" />
        </button>

        {isAuthenticated && user ? (
          /* Profile view when authenticated */
          <div className="text-center">
            <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
              <CheckCircle className="size-8" />
            </div>
            <h3 className="mt-4 text-xl font-bold text-gray-900">Welcome, {user.name}!</h3>
            <p className="mt-1 text-sm text-gray-500">{user.email}</p>

            <div className="mt-6 space-y-2 border-t border-b border-gray-100 py-4 text-left text-sm">
              <div className="flex items-center justify-between py-1 text-gray-700">
                <span className="font-medium">Account Status:</span>
                <span className="inline-flex items-center gap-1 font-semibold text-emerald-600">
                  <ShieldCheck className="size-4" /> Verified (Nordic VIP)
                </span>
              </div>
              <div className="flex items-center justify-between py-1 text-gray-700">
                <span className="font-medium">Rewards Points:</span>
                <span className="font-bold text-gray-900">350 pts</span>
              </div>
              <div className="flex items-center justify-between py-1 text-gray-700">
                <span className="font-medium">Preferred Market:</span>
                <span className="text-gray-600">Sweden / Nordic (kr)</span>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3">
              <button
                type="button"
                onClick={closeAuthModal}
                className="w-full rounded-full bg-black py-3 text-sm font-bold text-white transition hover:bg-gray-800"
              >
                Continue Shopping
              </button>
              <button
                type="button"
                onClick={logout}
                className="w-full rounded-full border border-gray-200 py-2.5 text-sm font-semibold text-gray-600 transition hover:bg-gray-50 hover:text-red-600"
              >
                Sign Out
              </button>
            </div>
          </div>
        ) : (
          /* Sign In / Register tabs */
          <div>
            <div className="flex items-center justify-center gap-2 text-center">
              <User className="size-5 text-[#17BBEF]" />
              <h3 className="text-lg font-bold text-gray-900">Anker Nordics Account</h3>
            </div>

            {/* Tab toggles */}
            <div className="mt-6 flex rounded-lg bg-gray-100 p-1 text-xs font-bold">
              <button
                type="button"
                onClick={() => setTab("signin")}
                className={`flex-1 rounded-md py-2 transition ${
                  tab === "signin" ? "bg-white text-black shadow-xs" : "text-gray-500 hover:text-black"
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setTab("register")}
                className={`flex-1 rounded-md py-2 transition ${
                  tab === "register" ? "bg-white text-black shadow-xs" : "text-gray-500 hover:text-black"
                }`}
              >
                Create Account
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              {tab === "register" && (
                <div>
                  <label className="block text-xs font-semibold text-gray-700">Full Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Alex Lindqvist"
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm text-gray-900 focus:border-[#17BBEF] focus:ring-1 focus:ring-[#17BBEF] focus:outline-none"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-gray-700">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm text-gray-900 focus:border-[#17BBEF] focus:ring-1 focus:ring-[#17BBEF] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700">Password</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm text-gray-900 focus:border-[#17BBEF] focus:ring-1 focus:ring-[#17BBEF] focus:outline-none"
                />
              </div>

              <div className="rounded-lg bg-cyan-50/70 p-3 text-[11px] leading-relaxed text-[#0c7ea5]">
                <strong>Demo Mode Active:</strong> Click below to simulate instant {tab === "signin" ? "sign in" : "registration"}. No real credentials are submitted.
              </div>

              <button
                type="submit"
                className="w-full rounded-full bg-[#17BBEF] py-3 text-sm font-bold text-white shadow-md transition hover:bg-[#13a8d8]"
              >
                {tab === "signin" ? "Sign In" : "Create Account"}
              </button>
            </form>

            <div className="mt-4 text-center text-xs text-gray-500">
              By continuing, you agree to Anker Nordic&apos;s Terms of Service & Privacy Policy.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
