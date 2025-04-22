import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const ReaderDashboard = () => {
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await api.get('/articles'); // Assuming this gets published articles
        setArticles(response.data);
      } catch (error) {
        console.error('Error fetching articles:', error);
        setError('Could not retrieve articles.');
      }
    };

    fetchArticles();
  }, []);

  const handleArticleClick = (articleId) => {
    setSelectedArticle(articleId);
    navigate(`/reader/article/${articleId}`);
  };

  return (
    <div>
      <h1>Reader Dashboard</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {articles.length === 0 ? (
        <p>No articles published yet.</p>
      ) : selectedArticle === null ? (
        <ul>
          {articles.map(article => (
            <li key={article.id} onClick={() => handleArticleClick(article.id)} style={{ cursor: 'pointer' }}>
              {article.title}
            </li>
          ))}
        </ul>
      ) : (
        <div>
          <h2>{selectedArticle.title}</h2>
          <div dangerouslySetInnerHTML={{ __html: selectedArticle.htmlContent }} />
          <button onClick={() => setSelectedArticle(null)}>Back to Article List</button>
        </div>
      )}
    </div>
  );
};

export default ReaderDashboard;
