import React from "react";
import { ArrowRight, ShieldCheck, Lock, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
export const Hero = () => {
  return (
    <div className="bg-gradient-to-b from-blue-50 to-white w-full pt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full mb-4">
              <ShieldCheck className="text-blue-600 w-5 h-5" />
              <span className="text-blue-600 font-medium text-sm">
                Secure & Transparent Voting
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Democracy Goes Digital with Secure E-Voting
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Transform your voting process with our secure, transparent, and
              easy-to-use electronic voting system. Built for the modern age.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/register"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold inline-flex items-center gap-2 hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40"
              >
                Get Started <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/login"
                className="bg-white text-gray-700 px-8 py-3 rounded-lg font-semibold inline-flex items-center gap-2 hover:bg-gray-50 transition-colors border border-gray-200"
              >
                Sign In
              </Link>
            </div>
            <div className="mt-8 flex items-center gap-8">
              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-blue-600" />
                <span className="text-gray-600">End-to-end encryption</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-blue-600" />
                <span className="text-gray-600">ISO 27001 certified</span>
              </div>
            </div>
          </div>
          <div className="lg:ml-auto">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-600 rounded-lg transform rotate-3 scale-105 opacity-10"></div>
              <img
                src="https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&q=80&w=2940"
                alt="Voting illustration"
                className="rounded-lg shadow-2xl relative z-10"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
