import React, { useState } from 'react';
import { Crown, Building2, Users, UserCircle, Briefcase, MapPin, ChevronRight, CheckCircle, User, Vote, Check, X, AlertCircle, Clock, BarChart3, Menu } from 'lucide-react';

export const DashboardHeader = () => {
  const [activeTab, setActiveTab] = useState('vote');
  const [activePosition, setActivePosition] = useState('president');
  const [selectedCandidates, setSelectedCandidates] = useState({});
  const [votedPositions, setVotedPositions] = useState([]);
  const [votes, setVotes] = useState([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [pendingVote, setPendingVote] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const positions = {
    president: { label: 'President', icon: Crown },
    governor: { label: 'Governor', icon: Building2 },
    senator: { label: 'Senator', icon: Users },
    'women-rep': { label: 'Women Rep', icon: UserCircle },
    mp: { label: 'MP', icon: Briefcase },
    mca: { label: 'MCA', icon: MapPin }
  };

  const candidatesData = {
    president: [
      { id: 1, name: "Sarah Johnson", party: "Progressive Party" },
      { id: 2, name: "Michael Chen", party: "Democratic Alliance" },
      { id: 3, name: "Patricia Williams", party: "Unity Coalition" },
    ],
    governor: [
      { id: 4, name: "James Miller", party: "People's Party" },
      { id: 5, name: "Linda Garcia", party: "Reform Movement" },
    ],
    senator: [
      { id: 6, name: "Robert Taylor", party: "Democratic Front" },
      { id: 7, name: "Amanda Brown", party: "Progressive Union" },
    ],
    'women-rep': [
      { id: 8, name: "Jennifer Davis", party: "Women's Alliance" },
      { id: 9, name: "Maria Rodriguez", party: "Unity Party" },
    ],
    mp: [
      { id: 10, name: "David Wilson", party: "National Party" },
      { id: 11, name: "Susan Martinez", party: "Liberal Coalition" },
    ],
    mca: [
      { id: 12, name: "Thomas Anderson", party: "Local First" },
      { id: 13, name: "Emily Johnson", party: "Community Alliance" },
    ]
  };

  const handleVote = (candidate) => {
    setSelectedCandidates({ ...selectedCandidates, [activePosition]: candidate });
  };

  const handleConfirmClick = () => {
    const candidate = selectedCandidates[activePosition];
    if (candidate) {
      setPendingVote({ candidate, position: activePosition });
      setShowConfirmModal(true);
    }
  };

  const handleConfirmVote = () => {
    const vote = {
      positionId: activePosition,
      position: positions[activePosition].label,
      candidateName: pendingVote.candidate.name,
      party: pendingVote.candidate.party,
      timestamp: new Date().toLocaleTimeString()
    };
    setVotes([...votes, vote]);
    setVotedPositions([...votedPositions, activePosition]);
    setShowConfirmModal(false);
    setShowSuccessModal(true);
  };

  const currentCandidates = candidatesData[activePosition] || [];
  const selectedCandidate = selectedCandidates[activePosition];
  const hasVoted = votedPositions.includes(activePosition);
  const votedCount = votedPositions.length;
  const totalPositions = Object.keys(positions).length;
  const progress = (votedCount / totalPositions) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" />
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-lg border-b border-white/20">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {/* Mobile menu button */}
                <button
                  className="md:hidden inline-flex items-center justify-center p-2 rounded-lg bg-white/10 border border-white/10 text-white"
                  onClick={() => setIsSidebarOpen(true)}
                  aria-label="Open menu"
                >
                  <Menu className="w-5 h-5" />
                </button>
                <div className="bg-gradient-to-br from-purple-500 to-blue-500 p-3 rounded-xl shadow-lg">
                  <Vote className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">Voting In Progress</h1>
                  <p className="text-sm text-gray-300">Cast Your Vote</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-xl border border-white/10">
                <div className="bg-gradient-to-br from-blue-500 to-purple-500 p-2 rounded-lg">
                  <User className="w-5 h-5 text-white" />
                </div>
                {/* 
                  ERROR: "user" is not defined
                  Solution: Make sure "user" is retrieved, for example from localStorage or props/context, above this code.
                  For demonstration, let's safely get it from localStorage here:
                */}
                {(() => {
                  let user = null;
                  try {
                    user = JSON.parse(localStorage.getItem('user'));
                  } catch (e) {
                    user = null;
                  }
                  return (
                    <div className="text-right">
                      <p className="text-sm font-semibold text-white">
                        {user && user.firstName && user.lastName
                          ? `${user.firstName} ${user.lastName}`
                          : "Loading..."}
                      </p>
                      <p className="text-xs text-gray-400">
                        {user && user.voterId ? user.voterId : ""}
                      </p>
                    <button
                      onClick={() => {
                        // Remove token and user from localStorage, redirect to login
                        localStorage.removeItem('token');
                        localStorage.removeItem('user');
                        window.location.href = '/login';
                      }}
                      className="mt-1 text-xs text-red-400 hover:underline focus:outline-none"
                    >
                      Logout
                    </button>
                    </div>
                  );
                })()}
              </div>
            </div>
          </div>
        </header>

        <div className="pt-20">
          {/* Mobile overlay when sidebar is open */}
          {isSidebarOpen && (
            <div
              className="fixed inset-0 bg-black/50 z-30 md:hidden"
              onClick={() => setIsSidebarOpen(false)}
            />
          )}
          {/* Sidebar */}
          <aside
            className={`fixed top-20 left-0 bottom-0 z-40 w-64 md:w-72 bg-white/5 backdrop-blur-lg border-r border-white/10 overflow-y-auto transform transition-transform duration-300
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
          >
            <div className="p-6">
              {/* Timer */}
              <div className="mb-6 p-4 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-xl border border-white/10">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-purple-300" />
                  <span className="text-xs font-semibold text-purple-300">TIME REMAINING</span>
                </div>
                <div className="text-2xl font-bold text-white">2h 34m</div>
              </div>

              {/* Tab Navigation */}
              <div className="mb-6 space-y-2">
                <button
                  onClick={() => { setActiveTab('vote'); setIsSidebarOpen(false); }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    activeTab === 'vote'
                      ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg'
                      : 'text-gray-300 hover:bg-white/5'
                  }`}
                >
                  <Vote className="w-5 h-5" />
                  <span className="font-medium">Cast Vote</span>
                </button>
                <button
                  onClick={() => { setActiveTab('summary'); setIsSidebarOpen(false); }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    activeTab === 'summary'
                      ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg'
                      : 'text-gray-300 hover:bg-white/5'
                  }`}
                >
                  <BarChart3 className="w-5 h-5" />
                  <span className="font-medium">Summary</span>
                </button>
              </div>

              {activeTab === 'vote' && (
                <>
                  <h2 className="text-lg font-bold text-white mb-2">Positions</h2>
                  <p className="text-sm text-gray-400 mb-4">Select a position</p>
                  <nav className="space-y-2">
                    {Object.entries(positions).map(([id, pos]) => {
                      const Icon = pos.icon;
                      const isActive = activePosition === id;
                      const hasVoted = votedPositions.includes(id);
                      return (
                        <button
                          key={id}
                          onClick={() => { setActivePosition(id); setIsSidebarOpen(false); }}
                          className={`w-full flex items-center justify-between p-4 rounded-xl transition-all ${
                            isActive
                              ? 'bg-gradient-to-r from-purple-500 to-blue-500 shadow-lg'
                              : 'bg-white/5 hover:bg-white/10'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${isActive ? 'bg-white/20' : 'bg-white/10'}`}>
                              <Icon className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-white font-medium">{pos.label}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            {hasVoted && <CheckCircle className="w-5 h-5 text-green-400" />}
                            {isActive && <ChevronRight className="w-5 h-5 text-white" />}
                          </div>
                        </button>
                      );
                    })}
                  </nav>
                  <div className="mt-6 p-4 bg-white/5 rounded-xl border border-white/10">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-400">Progress</span>
                      <span className="text-sm font-bold text-white">{votedCount}/{totalPositions}</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                </>
              )}
              {/* Close button on mobile */}
              <button
                className="md:hidden mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 bg-white/10 border border-white/10 text-white rounded-xl"
                onClick={() => setIsSidebarOpen(false)}
              >
                <X className="w-4 h-4" />
                Close Menu
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <main className="p-8 md:ml-72">
            {activeTab === 'vote' ? (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-2">{positions[activePosition].label}</h2>
                    <p className="text-gray-400">Select your preferred candidate</p>
                  </div>
                  {hasVoted && (
                    <div className="flex items-center gap-2 bg-green-500/20 border border-green-400/50 px-4 py-2 rounded-xl">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span className="text-green-400 font-semibold">Vote Recorded</span>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {currentCandidates.map((candidate) => {
                    const isSelected = selectedCandidate?.id === candidate.id;
                    return (
                      <div key={candidate.id} className={`relative group transition-all duration-300 ${isSelected ? 'scale-105' : 'hover:scale-105'}`}>
                        <div className={`relative overflow-hidden rounded-2xl border-2 transition-all ${
                          isSelected
                            ? 'border-green-400 bg-gradient-to-br from-green-500/20 to-emerald-500/20 shadow-2xl shadow-green-500/30'
                            : 'border-white/10 bg-white/5 backdrop-blur-lg hover:border-purple-400/50 hover:shadow-xl'
                        }`}>
                          {isSelected && (
                            <div className="absolute top-4 right-4 z-10 bg-green-500 rounded-full p-2 shadow-lg animate-pulse">
                              <Check className="w-5 h-5 text-white" />
                            </div>
                          )}
                          <div className="relative h-64 bg-gradient-to-br from-purple-500/20 to-blue-500/20">
                            <div className="w-full h-full flex items-center justify-center">
                              <div className="bg-white/10 rounded-full p-8">
                                <User className="w-24 h-24 text-white/50" />
                              </div>
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                          </div>
                          <div className="p-6">
                            <h3 className="text-2xl font-bold text-white mb-2">{candidate.name}</h3>
                            <p className="text-sm text-gray-400 mb-4">{candidate.party}</p>
                            <button
                              onClick={() => handleVote(candidate)}
                              className={`w-full py-3 px-6 rounded-xl font-semibold transition-all ${
                                isSelected
                                  ? 'bg-green-500 text-white shadow-lg shadow-green-500/50'
                                  : 'bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:shadow-lg'
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
                        </div>
                      </div>
                    );
                  })}
                </div>

                {selectedCandidate && !hasVoted && (
                  <div className="flex justify-center">
                    <button
                      onClick={handleConfirmClick}
                      className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-12 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-green-500/30 transition-all"
                    >
                      Confirm Vote
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="max-w-4xl mx-auto">
                <div className="bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl p-8 mb-6 shadow-2xl">
                  <h2 className="text-3xl font-bold text-white mb-6">Voting Summary</h2>
                  <div className="bg-white/20 rounded-full h-4 mb-3 overflow-hidden">
                    <div className="bg-gradient-to-r from-green-400 to-emerald-400 h-full transition-all" style={{ width: `${progress}%` }} />
                  </div>
                  <div className="flex items-center justify-between text-white">
                    <span className="text-sm font-medium">{votedCount} of {totalPositions} positions completed</span>
                    {votedCount === totalPositions && (
                      <div className="flex items-center gap-2 bg-green-500/30 px-3 py-1 rounded-full">
                        <CheckCircle className="w-4 h-4" />
                        <span className="text-sm font-bold">Complete!</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl overflow-hidden">
                  <div className="bg-white/5 px-6 py-4 border-b border-white/10">
                    <h3 className="text-xl font-bold text-white">Your Votes</h3>
                  </div>
                  <div className="divide-y divide-white/10">
                    {votes.length === 0 ? (
                      <div className="p-12 text-center">
                        <p className="text-gray-400">No votes cast yet</p>
                      </div>
                    ) : (
                      votes.map((vote, index) => {
                        const Icon = positions[vote.positionId].icon;
                        return (
                          <div key={index} className="p-5 hover:bg-white/5 transition-colors">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                <div className="bg-gradient-to-br from-purple-500 to-blue-500 p-3 rounded-xl">
                                  <Icon className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                  <h4 className="font-semibold text-white">{vote.position}</h4>
                                  <p className="text-sm text-gray-400">{vote.candidateName}</p>
                                  <p className="text-xs text-gray-500">{vote.party}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2 bg-green-500/20 px-3 py-1 rounded-full">
                                <CheckCircle className="w-4 h-4 text-green-400" />
                                <span className="text-sm font-semibold text-green-400">Confirmed</span>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowConfirmModal(false)} />
          <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-white/20 shadow-2xl max-w-md w-full">
            <button onClick={() => setShowConfirmModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white">
              <X className="w-6 h-6" />
            </button>
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
            <div className="p-6">
              <div className="mb-4">
                <label className="text-sm text-gray-400 uppercase">Position</label>
                <p className="text-lg font-semibold text-white mt-1">{positions[activePosition]?.label}</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10 mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-xl flex items-center justify-center">
                    <User className="w-8 h-8 text-white/50" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white">{pendingVote?.candidate.name}</h4>
                    <p className="text-sm text-gray-400">{pendingVote?.candidate.party}</p>
                  </div>
                </div>
              </div>
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 mb-6">
                <div className="flex gap-3">
                  <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                  <p className="text-xs text-yellow-200">Once confirmed, your vote cannot be changed.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setShowConfirmModal(false)} className="flex-1 px-6 py-3 bg-white/5 border border-white/10 text-white rounded-xl font-semibold">
                  Cancel
                </button>
                <button onClick={handleConfirmVote} className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold flex items-center justify-center gap-2">
                  <Check className="w-5 h-5" />
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowSuccessModal(false)} />
          <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-green-500/30 shadow-2xl max-w-lg w-full">
            <button onClick={() => setShowSuccessModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white">
              <X className="w-6 h-6" />
            </button>
            <div className="flex justify-center pt-8 pb-4">
              <div className="relative bg-gradient-to-br from-green-500 to-emerald-500 rounded-full p-6 shadow-lg">
                <CheckCircle className="w-16 h-16 text-white" />
              </div>
            </div>
            <div className="text-center px-6 pb-6">
              <h2 className="text-3xl font-bold text-white mb-2">Vote Submitted!</h2>
              <p className="text-gray-400 mb-6">Your vote has been successfully recorded</p>
              <div className="bg-white/5 rounded-xl p-5 border border-white/10 mb-6">
                <div className="mb-4">
                  <label className="text-xs text-gray-500 uppercase">Position</label>
                  <p className="text-lg font-semibold text-white mt-1">{positions[activePosition]?.label}</p>
                </div>
                <div className="flex items-center gap-3 bg-green-500/10 p-3 rounded-lg border border-green-500/20">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-lg flex items-center justify-center">
                    <User className="w-6 h-6 text-green-400" />
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-white">{pendingVote?.candidate.name}</p>
                    <p className="text-sm text-gray-400">{pendingVote?.candidate.party}</p>
                  </div>
                </div>
              </div>
              <button onClick={() => setShowSuccessModal(false)} className="w-full px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-bold">
                Continue Voting
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}