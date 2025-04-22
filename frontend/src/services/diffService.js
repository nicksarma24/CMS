import React, { useState, useEffect } from 'react';
import api from '../services/api';

const DiffViewer = ({ articleId, version1, version2 }) => {
  const [diff, setDiff] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDiff = async () => {
      try {
        const response = await api.get(`/articles/${articleId}/diff`, {
          params: { version1, version2 }
        });
        setDiff(response.data); // Assuming the backend returns HTML
      } catch (error) {
        console.error('Error fetching diff:', error);
        setError('Could not retrieve diff.');
      }
    };

    fetchDiff();
  }, [articleId, version1, version2]);

  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <h2>Diff Viewer</h2>
      <div dangerouslySetInnerHTML={{ __html: diff }} />
    </div>
  );
};

export default DiffViewer;
