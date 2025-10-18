import React, { useState } from 'react';

const DashboardLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
      
      {/* Main content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

// Demo to show the layout
export default function App() {
  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-white">
          <h1 className="text-4xl font-bold mb-4">Voting Dashboard Layout</h1>
          <p className="text-gray-300">Modern foundation with animated background ✨</p>
          <div className="mt-8 p-8 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20">
            <p className="text-lg">Content will go here</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}