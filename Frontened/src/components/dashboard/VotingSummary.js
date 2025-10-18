import React from 'react';
import { CheckCircle, Crown, Building2, Users, UserCircle, Briefcase, MapPin, Calendar, Clock, TrendingUp } from 'lucide-react';

const VotingSummary = ({ votes = [], totalPositions = 6 }) => {
  const positionIcons = {
    president: Crown,
    governor: Building2,
    senator: Users,
    'women-rep': UserCircle,
    mp: Briefcase,
    mca: MapPin
  };

  const votedCount = votes.length;
  const progress = (votedCount / totalPositions) * 100;
  const isComplete = votedCount === totalPositions;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header Card */}
      <div className="bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl p-8 mb-6 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Voting Summary</h2>
            <p className="text-white/80">Track your voting progress</p>
          </div>
          <div className="bg-white/20 p-4 rounded-xl">
            <TrendingUp className="w-8 h-8 text-white" />
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-white/20 rounded-full h-4 mb-3 overflow-hidden">
          <div
            className="bg-gradient-to-r from-green-400 to-emerald-400 h-full transition-all duration-500 flex items-center justify-end pr-2"
            style={{ width: `${progress}%` }}
          >
            {progress > 20 && (
              <span className="text-xs font-bold text-white">{Math.round(progress)}%</span>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between text-white">
          <span className="text-sm font-medium">
            {votedCount} of {totalPositions} positions completed
          </span>
          {isComplete && (
            <div className="flex items-center gap-2 bg-green-500/30 px-3 py-1 rounded-full">
              <CheckCircle className="w-4 h-4" />
              <span className="text-sm font-bold">Complete!</span>
            </div>
          )}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-green-500/20 p-2 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-400" />
            </div>
            <span className="text-sm text-gray-400">Completed</span>
          </div>
          <p className="text-3xl font-bold text-white">{votedCount}</p>
        </div>

        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-orange-500/20 p-2 rounded-lg">
              <Clock className="w-5 h-5 text-orange-400" />
            </div>
            <span className="text-sm text-gray-400">Pending</span>
          </div>
          <p className="text-3xl font-bold text-white">{totalPositions - votedCount}</p>
        </div>

        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-blue-500/20 p-2 rounded-lg">
              <Calendar className="w-5 h-5 text-blue-400" />
            </div>
            <span className="text-sm text-gray-400">Total Positions</span>
          </div>
          <p className="text-3xl font-bold text-white">{totalPositions}</p>
        </div>
      </div>

      {/* Votes List */}
      <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl overflow-hidden">
        <div className="bg-white/5 px-6 py-4 border-b border-white/10">
          <h3 className="text-xl font-bold text-white">Your Votes</h3>
        </div>

        <div className="divide-y divide-white/10">
          {votes.length === 0 ? (
            <div className="p-12 text-center">
              <div className="bg-white/5 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-gray-500" />
              </div>
              <p className="text-gray-400">No votes cast yet</p>
              <p className="text-sm text-gray-500 mt-2">Start voting to see your selections here</p>
            </div>
          ) : (
            votes.map((vote, index) => {
              const Icon = positionIcons[vote.positionId] || CheckCircle;
              
              return (
                <div
                  key={index}
                  className="p-5 hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="bg-gradient-to-br from-purple-500 to-blue-500 p-3 rounded-xl">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-white mb-1">{vote.position}</h4>
                        <p className="text-sm text-gray-400">{vote.candidateName}</p>
                        <p className="text-xs text-gray-500 mt-1">{vote.party}</p>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="flex items-center gap-2 bg-green-500/20 px-3 py-1 rounded-full mb-2">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span className="text-sm font-semibold text-green-400">Confirmed</span>
                      </div>
                      <p className="text-xs text-gray-500">{vote.timestamp}</p>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Action Button */}
      {!isComplete && (
        <div className="mt-6 text-center">
          <button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-purple-500/30 transition-all">
            Continue Voting
          </button>
        </div>
      )}

      {isComplete && (
        <div className="mt-6 bg-green-500/10 border border-green-500/30 rounded-xl p-6 text-center">
          <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-3" />
          <h3 className="text-xl font-bold text-white mb-2">All Votes Submitted!</h3>
          <p className="text-gray-300">Thank you for participating in this election</p>
        </div>
      )}
    </div>
  );
};

// Demo
export default function App() {
  const sampleVotes = [
    {
      positionId: 'president',
      position: 'President',
      candidateName: 'Sarah Johnson',
      party: 'Progressive Party',
      timestamp: '2:34 PM'
    },
    {
      positionId: 'governor',
      position: 'Governor',
      candidateName: 'Michael Chen',
      party: 'Democratic Alliance',
      timestamp: '2:36 PM'
    },
    {
      positionId: 'senator',
      position: 'Senator',
      candidateName: 'Patricia Williams',
      party: 'Unity Coalition',
      timestamp: '2:38 PM'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <VotingSummary votes={sampleVotes} totalPositions={6} />
    </div>
  );
}