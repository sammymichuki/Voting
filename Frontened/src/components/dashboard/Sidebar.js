import React, { useState } from 'react';
import { Crown, Building2, Users, UserCircle, Briefcase, MapPin, ChevronRight, CheckCircle } from 'lucide-react';

const Sidebar = ({ activePosition = "president", onPositionChange, votedPositions = [] }) => {
  const positions = [
    { id: 'president', label: 'President', icon: Crown },
    { id: 'governor', label: 'Governor', icon: Building2 },
    { id: 'senator', label: 'Senator', icon: Users },
    { id: 'women-rep', label: 'Women Rep', icon: UserCircle },
    { id: 'mp', label: 'MP', icon: Briefcase },
    { id: 'mca', label: 'MCA', icon: MapPin },
  ];

  return (
    <aside className="w-72 bg-white/5 backdrop-blur-lg border-r border-white/10 min-h-screen">
      <div className="p-6">
        <h2 className="text-lg font-bold text-white mb-2">Positions</h2>
        <p className="text-sm text-gray-400 mb-6">Select a position to vote</p>

        <nav className="space-y-2">
          {positions.map((position) => {
            const Icon = position.icon;
            const isActive = activePosition === position.id;
            const hasVoted = votedPositions.includes(position.id);

            return (
              <button
                key={position.id}
                onClick={() => onPositionChange?.(position.id)}
                className={`w-full flex items-center justify-between p-4 rounded-xl transition-all duration-300 group ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-500 to-blue-500 shadow-lg shadow-purple-500/50'
                    : 'bg-white/5 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-white/20'
                        : 'bg-white/10 group-hover:bg-white/15'
                    }`}
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-white font-medium">{position.label}</span>
                </div>

                <div className="flex items-center gap-2">
                  {hasVoted && (
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  )}
                  {isActive && (
                    <ChevronRight className="w-5 h-5 text-white" />
                  )}
                </div>
              </button>
            );
          })}
        </nav>

        {/* Progress Summary */}
        <div className="mt-8 p-4 bg-white/5 rounded-xl border border-white/10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">Progress</span>
            <span className="text-sm font-bold text-white">
              {votedPositions.length}/{positions.length}
            </span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(votedPositions.length / positions.length) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </aside>
  );
};

// Demo
export default function App() {
  const [activePosition, setActivePosition] = useState('president');
  const [votedPositions, setVotedPositions] = useState(['president', 'governor']);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex">
      <Sidebar
        activePosition={activePosition}
        onPositionChange={setActivePosition}
        votedPositions={votedPositions}
      />
      
      <div className="flex-1 p-8">
        <div className="text-white">
          <h2 className="text-3xl font-bold mb-4">Voting for: {activePosition}</h2>
          <p className="text-gray-300">Sidebar with all 6 positions ✨</p>
        </div>
      </div>
    </div>
  );
}