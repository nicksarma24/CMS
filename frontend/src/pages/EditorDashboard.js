import React, { useState, useEffect } from 'react';
import ArticleList from '../components/ArticleList';
import ArticleEditor from '../components/ArticleEditor';
import DiffViewer from '../components/DiffViewer';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const EditorDashboard = () => {
  const [selectedArticleId, setSelectedArticleId] = useState(null);
  const [showDiff, setShowDiff] = useState(false);
  const [key, setKey] = useState(Date.now());
  const [version1, setVersion1] = useState(null);
  const [version2, setVersion2] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [articleVersions, setArticleVersions] = useState([]);


  useEffect(() => {
    if (selectedArticleId) {
      const fetchArticleVersions = async () => {
        try {
          const response = await api.get(`/articles/${selectedArticleId}/versions`);
          setArticleVersions(response.data);
        } catch (error) {
          console.error("Error fetching article versions:", error);
          setError("Could not load article versions.");
        }
      };

      fetchArticleVersions();
    }
  }, [selectedArticleId]);


  const handleArticleClick = (articleId) => {
    setSelectedArticleId(articleId);
    setShowDiff(false); // Reset diff view when selecting a new article
  };

  const handlePublish = async () => {
    try {
      if (selectedArticleId) {
        await api.put(`/articles/${selectedArticleId}/publish`);
        setSelectedArticleId(null);
        setKey(Date.now()); // Refresh the article list
        navigate('/editor'); // Navigate back to the editor dashboard
      }
    } catch (error) {
      console.error('Error publishing article:', error);
      setError('Could not publish article.');
    }
  };

  const handleSave = () => {
    setSelectedArticleId(null);
    setKey(Date.now()); // Refresh the article list
  };

  const handleShowDiff = (v1, v2) => {
    setVersion1(v1);
    setVersion2(v2);
    setShowDiff(true);
  };

  const getVersionContent = (versionNumber) => {
    const version = articleVersions.find(v => v.versionNumber === versionNumber);
    return version ? version.htmlContent : "";
  };


  return (
    <div>
      <h1>Editor Dashboard</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ArticleList role="Editor" key={key} />

      {selectedArticleId && !showDiff ? (
        <>
          <ArticleEditor articleId={selectedArticleId} onSave={handleSave} onSubmit={handlePublish} />
          <div>
            <button onClick={handlePublish}>Publish</button>
            {articleVersions.length > 1 && (
              <div>
                <h2>Compare Versions</h2>
                {articleVersions.map((version, index) => (
                  index > 0 ? (
                    <button key={version.id} onClick={() => handleShowDiff(getVersionContent(articleVersions[index - 1].versionNumber), getVersionContent(version.versionNumber))}>
                      Compare v{articleVersions[index - 1].versionNumber} with v{version.versionNumber}
                    </button>
                  ) : null
                ))}
              </div>
            )}
          </div>
        </>
      ) : selectedArticleId && showDiff ? (
        <DiffViewer articleId={selectedArticleId} version1={version1} version2={version2} />
      ) : null}
    </div>
  );
};

export default EditorDashboard;
