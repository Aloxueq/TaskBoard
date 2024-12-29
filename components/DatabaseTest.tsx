'use client';

import { useState } from 'react';

export function DatabaseTest() {
  const [status, setStatus] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const testConnection = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/test');
      const data = await response.json();
      
      if (response.ok) {
        setStatus(`✅ ${data.status}`);
      } else {
        setStatus(`❌ Error: ${data.error}`);
      }
    } catch (error) {
      setStatus('❌ Failed to test connection');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg bg-white">
      <h2 className="text-lg font-semibold mb-4">Database Connection Test</h2>
      <button
        onClick={testConnection}
        disabled={loading}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
      >
        {loading ? 'Testing...' : 'Test Connection'}
      </button>
      {status && (
        <p className="mt-4 text-sm">
          {status}
        </p>
      )}
    </div>
  );
} 