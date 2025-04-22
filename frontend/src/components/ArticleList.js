import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ArticleList = ({ role }) => {
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();
  const { user } = useAuth();


  useEffect(() => {
    const fetchArticles = async () => {
      try {
        let response;
        if (role === 'Editor') {
          response = await api.get('/articles/pending');
        } else if (role === 'Reader') {
          response = await api.get('/articles'); // Assuming a general GET /articles endpoint exists
        } else if (role === 'Creator') {
          response = await api.get('/articles'); // Or an endpoint to get creator's articles
        }


        setArticles(response.data);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchArticles();
  }, [role]);

  const handleArticleClick = (articleId) => {
    navigate(`/${role}/article/${articleId}`); // Navigate to article detail, include role in path
  };


  return (
    <div>
      <h2>{role} - Article List</h2>
      {articles.map(article => (
        <div key={article.id} onClick={() => handleArticleClick(article.id)} style={{ cursor: 'pointer' }}>
          <h3>{article.title}</h3>
          <p>{article.htmlContent.substring(0, 100)}...</p> {/* Simple preview */}
        </div>
      ))}
    </div>
  );
};

export default ArticleList;
