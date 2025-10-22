import React, { useState } from 'react';
import { Check, User } from 'lucide-react';

const VotingCard = ({ 
  candidate = {
    id: 1,
    name: "John Doe",
    party: "Democratic Party",
    image: null
  },
  isSelected = false,
  onVote
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative group transition-all duration-300 ${
        isSelected ? 'scale-105' : 'hover:scale-105'
      }`}
    >
      {/* Card Container */}
      <div
        className={`relative overflow-hidden rounded-2xl border-2 transition-all duration-300 ${
          isSelected
            ? 'border-green-400 bg-gradient-to-br from-green-500/20 to-emerald-500/20 shadow-2xl shadow-green-500/30'
            : 'border-white/10 bg-white/5 backdrop-blur-lg hover:border-purple-400/50 hover:shadow-xl hover:shadow-purple-500/20'
        }`}
      >
        {/* Selected Badge */}
        {isSelected && (
          <div className="absolute top-4 right-4 z-10 bg-green-500 rounded-full p-2 shadow-lg animate-pulse">
            <Check className="w-5 h-5 text-white" />
          </div>
        )}

        {/* Candidate Image */}
        <div className="relative h-64 bg-gradient-to-br from-purple-500/20 to-blue-500/20 overflow-hidden">
          {candidate.image ? (
            <img
              src={candidate.image}
              alt={candidate.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="bg-white/10 rounded-full p-8">
                <User className="w-24 h-24 text-white/50" />
              </div>
            </div>
          )}
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>

        {/* Candidate Info */}
        <div className="p-6">
          <h3 className="text-2xl font-bold text-white mb-2">{candidate.name}</h3>
          <p className="text-sm text-gray-400 mb-4">{candidate.party}</p>

          {/* Vote Button */}
          <button
            onClick={() => onVote?.(candidate)}
            className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
              isSelected
                ? 'bg-green-500 text-white shadow-lg shadow-green-500/50'
                : 'bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:shadow-lg hover:shadow-purple-500/50'
            }`}
          >
            {isSelected ? (
              <span className="flex items-center justify-center gap-2">
                <Check className="w-5 h-5" />
                Selected
              </span>
            ) : (
              'Vote for Candidate'
            )}
          </button>
        </div>

        {/* Hover Glow Effect */}
        {isHovered && !isSelected && (
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 pointer-events-none" />
        )}
      </div>
    </div>
  );
};

// Demo
export default function App() {
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const candidates = [
    { id: 1, name: "Alice Johnson", party: "Progressive Party", image: null },
    { id: 2, name: "Bob Smith", party: "Democratic Alliance", image: null },
    { id: 3, name: "Carol Williams", party: "Unity Party", image: null },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">Select Your Candidate</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {candidates.map((candidate) => (
            <VotingCard
              key={candidate.id}
              candidate={candidate}
              isSelected={selectedCandidate?.id === candidate.id}
              onVote={setSelectedCandidate}
            />
          ))}
        </div>

        {selectedCandidate && (
          <div className="mt-8 p-6 bg-green-500/20 border border-green-400/50 rounded-xl text-center">
            <p className="text-white text-lg">
              You selected: <span className="font-bold">{selectedCandidate.name}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}