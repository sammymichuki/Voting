import React, { useState } from 'react';
import { Check, User, Crown } from 'lucide-react';

// VotingCard Component
const VotingCard = ({ 
  candidate,
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
      <div
        className={`relative overflow-hidden rounded-2xl border-2 transition-all duration-300 ${
          isSelected
            ? 'border-green-400 bg-gradient-to-br from-green-500/20 to-emerald-500/20 shadow-2xl shadow-green-500/30'
            : 'border-white/10 bg-white/5 backdrop-blur-lg hover:border-purple-400/50 hover:shadow-xl hover:shadow-purple-500/20'
        }`}
      >
        {isSelected && (
          <div className="absolute top-4 right-4 z-10 bg-green-500 rounded-full p-2 shadow-lg animate-pulse">
            <Check className="w-5 h-5 text-white" />
          </div>
        )}

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
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>

        <div className="p-6">
          <h3 className="text-2xl font-bold text-white mb-2">{candidate.name}</h3>
          <p className="text-sm text-gray-400 mb-4">{candidate.party}</p>

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

        {isHovered && !isSelected && (
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 pointer-events-none" />
        )}
      </div>
    </div>
  );
};

// PositionSection Component
const PositionSection = ({ 
  position,
  candidates = [],
  selectedCandidate,
  onVote,
  hasVoted = false
}) => {
  const positionIcons = {
    president: Crown,
    governor: User,
    senator: User,
    'women-rep': User,
    mp: User,
    mca: User
  };

  const Icon = positionIcons[position.id] || User;

  return (
    <div className="mb-12">
      {/* Position Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
        <div className="flex items-center gap-4">
          <div className="bg-gradient-to-br from-purple-500 to-blue-500 p-3 rounded-xl">
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white">{position.label}</h2>
            <p className="text-sm text-gray-400">Select one candidate</p>
          </div>
        </div>

        {hasVoted && (
          <div className="flex items-center gap-2 bg-green-500/20 border border-green-400/50 px-4 py-2 rounded-xl">
            <Check className="w-5 h-5 text-green-400" />
            <span className="text-green-400 font-semibold">Vote Recorded</span>
          </div>
        )}
      </div>

      {/* Candidates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {candidates.map((candidate) => (
          <VotingCard
            key={candidate.id}
            candidate={candidate}
            isSelected={selectedCandidate?.id === candidate.id}
            onVote={onVote}
          />
        ))}
      </div>

      {/* Submit Vote Button */}
      {selectedCandidate && !hasVoted && (
        <div className="mt-8 flex justify-center">
          <button className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-12 py-4 rounded-xl font-bold text-lg shadow-lg shadow-green-500/30 hover:scale-105 transition-all flex items-center gap-3">
            <Check className="w-6 h-6" />
            Confirm Vote for {position.label}
          </button>
        </div>
      )}
    </div>
  );
};

// Demo
export default function App() {
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);

  const position = {
    id: 'president',
    label: 'President'
  };

  const candidates = [
    { id: 1, name: "Sarah Johnson", party: "Progressive Party", image: null },
    { id: 2, name: "Michael Chen", party: "Democratic Alliance", image: null },
    { id: 3, name: "Patricia Williams", party: "Unity Coalition", image: null },
    { id: 4, name: "Robert Garcia", party: "People's Front", image: null },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="container mx-auto">
        <PositionSection
          position={position}
          candidates={candidates}
          selectedCandidate={selectedCandidate}
          onVote={setSelectedCandidate}
          hasVoted={hasVoted}
        />
      </div>
    </div>
  );
}