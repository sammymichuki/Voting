import React from 'react';
import { X, AlertCircle, Check, User } from 'lucide-react';

const ConfirmationModal = ({ 
  isOpen = false,
  onClose,
  onConfirm,
  candidate,
  position
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-white/20 shadow-2xl max-w-md w-full overflow-hidden animate-scaleIn">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header */}
        <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-6">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-3 rounded-xl">
              <AlertCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Confirm Your Vote</h3>
              <p className="text-sm text-white/80">Please review before submitting</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Position */}
          <div className="mb-4">
            <label className="text-sm text-gray-400 uppercase tracking-wide">Position</label>
            <p className="text-lg font-semibold text-white mt-1">{position}</p>
          </div>

          {/* Candidate Card */}
          <div className="bg-white/5 rounded-xl p-4 border border-white/10 mb-6">
            <div className="flex items-center gap-4">
              {candidate.image ? (
                <img
                  src={candidate.image}
                  alt={candidate.name}
                  className="w-16 h-16 rounded-xl object-cover"
                />
              ) : (
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-xl flex items-center justify-center">
                  <User className="w-8 h-8 text-white/50" />
                </div>
              )}
              <div>
                <h4 className="text-xl font-bold text-white">{candidate.name}</h4>
                <p className="text-sm text-gray-400">{candidate.party}</p>
              </div>
            </div>
          </div>

          {/* Warning Message */}
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 mb-6">
            <div className="flex gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-yellow-200 font-medium mb-1">Important Notice</p>
                <p className="text-xs text-yellow-200/80">
                  Once confirmed, your vote cannot be changed. Please ensure you have selected the correct candidate.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl font-semibold transition-all"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:shadow-lg hover:shadow-green-500/30 text-white rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
            >
              <Check className="w-5 h-5" />
              Confirm Vote
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
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
  const [isModalOpen, setIsModalOpen] = React.useState(true);

  const candidate = {
    id: 1,
    name: "Sarah Johnson",
    party: "Progressive Party",
    image: null
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl font-bold text-white mb-8">Confirmation Modal Demo</h1>
        
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-8 py-4 rounded-xl font-bold"
        >
          Open Confirmation Modal
        </button>

        <ConfirmationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={() => {
            alert('Vote confirmed!');
            setIsModalOpen(false);
          }}
          candidate={candidate}
          position="President"
        />
      </div>
    </div>
  );
}