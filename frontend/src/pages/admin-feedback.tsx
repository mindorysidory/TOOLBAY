import React, { useState, useEffect } from 'react';

interface Feedback {
  id: string;
  email?: string;
  subject: string;
  message: string;
  status: string;
  created_at: string;
  updated_at: string;
}

const AdminFeedback: React.FC = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    
    if (password === 'TjskTjsk87') {
      setIsAuthenticated(true);
      loadFeedbacks();
    } else {
      setAuthError('Invalid password');
    }
  };

  const loadFeedbacks = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/feedback?secret=TjskTjsk87');
      const result = await response.json();
      
      if (result.success) {
        setFeedbacks(result.data.feedbacks);
      } else {
        setError(result.error || 'Failed to load feedbacks');
      }
    } catch (err) {
      setError('Network error occurred');
      console.error('Load feedbacks error:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      const response = await fetch(`/api/admin/feedback/${id}?secret=TjskTjsk87`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      const result = await response.json();
      if (result.success) {
        // Update local state
        setFeedbacks(prev => 
          prev.map(fb => 
            fb.id === id ? { ...fb, status, updated_at: new Date().toISOString() } : fb
          )
        );
      } else {
        alert('Failed to update status');
      }
    } catch (err) {
      alert('Network error occurred');
      console.error('Update status error:', err);
    }
  };

  // Remove automatic loading on mount - require authentication first

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'unread': return 'bg-red-100 text-red-800';
      case 'read': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Show login form if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 max-w-md w-full">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">TOOLBAY Admin</h1>
            <p className="text-gray-600 mt-2">Enter password to access feedback management</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter admin password"
                required
              />
            </div>
            
            {authError && (
              <div className="text-red-600 text-sm text-center">
                {authError}
              </div>
            )}
            
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg">Loading feedbacks...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-red-600 text-lg">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">TOOLBAY Admin - Feedback Management</h1>
              <p className="text-gray-600 mt-1">Total {feedbacks.length} feedbacks received</p>
            </div>
            <button
              onClick={loadFeedbacks}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Refresh
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-red-600">
              {feedbacks.filter(fb => fb.status === 'unread').length}
            </div>
            <div className="text-sm text-gray-600">Unread</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-yellow-600">
              {feedbacks.filter(fb => fb.status === 'read').length}
            </div>
            <div className="text-sm text-gray-600">Read</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-green-600">
              {feedbacks.filter(fb => fb.status === 'resolved').length}
            </div>
            <div className="text-sm text-gray-600">Resolved</div>
          </div>
        </div>

        {/* Feedback List */}
        <div className="space-y-4">
          {feedbacks.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <div className="text-gray-500">No feedback received yet.</div>
            </div>
          ) : (
            feedbacks.map((feedback) => (
              <div key={feedback.id} className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {feedback.subject}
                      </h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(feedback.status)}`}>
                        {feedback.status.toUpperCase()}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 mb-2">
                      {feedback.email ? (
                        <span>From: <strong>{feedback.email}</strong></span>
                      ) : (
                        <span className="italic">Anonymous feedback</span>
                      )}
                      <span className="ml-4">
                        Created: {formatDate(feedback.created_at)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <select
                      value={feedback.status}
                      onChange={(e) => updateStatus(feedback.id, e.target.value)}
                      className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="unread">Unread</option>
                      <option value="read">Read</option>
                      <option value="resolved">Resolved</option>
                    </select>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-gray-800 whitespace-pre-wrap">
                    {feedback.message}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminFeedback;