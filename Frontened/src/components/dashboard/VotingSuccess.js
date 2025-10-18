import React from 'react';
import { CheckCircle, User, Download, Share2, X } from 'lucide-react';

const VotingSuccess = ({ 
  isOpen = false,
  onClose,
  candidate,
  position,
  voteId = "VOTE-" + Date.now(),
  timestamp = new Date().toLocaleString()
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Success Modal */}
      <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-green-500/30 shadow-2xl max-w-lg w-full overflow-hidden animate-scaleIn">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Success Icon */}
        <div className="flex justify-center pt-8 pb-4">
          <div className="relative">
            <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-20" />
            <div className="relative bg-gradient-to-br from-green-500 to-emerald-500 rounded-full p-6 shadow-lg shadow-green-500/50">
              <CheckCircle className="w-16 h-16 text-white" />
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="text-center px-6 pb-4">
          <h2 className="text-3xl font-bold text-white mb-2">Vote Submitted!</h2>
          <p className="text-gray-400">Your vote has been successfully recorded</p>
        </div>

        {/* Vote Details */}
        <div className="px-6 pb-6">
          <div className="bg-white/5 rounded-xl p-5 border border-white/10 mb-4">
            {/* Position */}
            <div className="mb-4">
              <label className="text-xs text-gray-500 uppercase tracking-wide">Position</label>
              <p className="text-lg font-semibold text-white mt-1">{position}</p>
            </div>

            {/* Candidate */}
            <div className="mb-4">
              <label className="text-xs text-gray-500 uppercase tracking-wide mb-2 block">Your Vote</label>
              <div className="flex items-center gap-3 bg-green-500/10 p-3 rounded-lg border border-green-500/20">
                {candidate.image ? (
                  <img
                    src={candidate.image}
                    alt={candidate.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-lg flex items-center justify-center">
                    <User className="w-6 h-6 text-green-400" />
                  </div>
                )}
                <div>
                  <p className="font-bold text-white">{candidate.name}</p>
                  <p className="text-sm text-gray-400">{candidate.party}</p>
                </div>
              </div>
            </div>

            {/* Vote ID and Timestamp */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
              <div>
                <label className="text-xs text-gray-500 uppercase tracking-wide">Vote ID</label>
                <p className="text-sm font-mono text-white mt-1">{voteId}</p>
              </div>
              <div>
                <label className="text-xs text-gray-500 uppercase tracking-wide">Time</label>
                <p className="text-sm text-white mt-1">{timestamp}</p>
              </div>
            </div>
          </div>

          {/* Info Box */}
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 mb-4">
            <p className="text-sm text-blue-200">
              <span className="font-semibold">Note:</span> Your vote is encrypted and anonymous. Keep your Vote ID for verification purposes.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <button className="flex items-center justify-center gap-2 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl font-semibold transition-all">
              <Download className="w-5 h-5" />
              Receipt
            </button>
            <button className="flex items-center justify-center gap-2 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl font-semibold transition-all">
              <Share2 className="w-5 h-5" />
              Share
            </button>
          </div>

          {/* Continue Button */}
          <button
            onClick={onClose}
            className="w-full px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:shadow-lg hover:shadow-green-500/30 text-white rounded-xl font-bold transition-all"
          >
            Continue Voting
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

// Demo
export default function App() {
  const [isSuccessOpen, setIsSuccessOpen] = React.useState(true);

  const candidate = {
    id: 1,
    name: "Sarah Johnson",
    party: "Progressive Party",
    image: null
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl font-bold text-white mb-8">Success Modal Demo</h1>
        
        <button
          onClick={() => setIsSuccessOpen(true)}
          className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-4 rounded-xl font-bold"
        >
          Show Success Modal
        </button>

        <VotingSuccess
          isOpen={isSuccessOpen}
          onClose={() => setIsSuccessOpen(false)}
          candidate={candidate}
          position="President"
        />
      </div>
    </div>
  );
}