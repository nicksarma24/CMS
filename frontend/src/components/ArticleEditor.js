import React, { useState, useEffect } from 'react';
import api from '../services/api';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const ArticleEditor = ({ articleId, onSave, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [htmlContent, setHtmlContent] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (articleId) {
      const fetchArticle = async () => {
        try {
          const response = await api.get(`/articles/${articleId}`);
          setTitle(response.data.title);
          setHtmlContent(response.data.htmlContent);
        } catch (error) {
          console.error('Error fetching article:', error);
          setError('Could not load article.');
        }
      };
      fetchArticle();
    }
  }, [articleId]);

  const handleSave = async () => {
    try {
      const articleData = { title, htmlContent };
      if (articleId) {
        await api.put(`/articles/${articleId}`, articleData);
        onSave();
      } else {
        await api.post('/articles', articleData);
        onSave();
      }
    } catch (error) {
      console.error('Error saving article:', error);
      setError('Could not save article.');
    }
  };

  const handleSubmit = async () => {
    try {
      await api.post(`/articles/${articleId}/submit`, null, { params: { articleId } });
      onSubmit();
    } catch (error) {
      console.error('Error submitting article:', error);
      setError('Could not submit article.');
    }
  };

  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <label>Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div>
        <label>Content:</label>
        <ReactQuill value={htmlContent} onChange={setHtmlContent} />
      </div>
      <div>
        <button onClick={handleSave}>Save</button>
        {articleId && <button onClick={handleSubmit}>Submit for Review</button>}
      </div>
    </div>
  );
};

export default ArticleEditor;
