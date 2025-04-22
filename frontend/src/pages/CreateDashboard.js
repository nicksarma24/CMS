import React, { useState } from 'react';
import ArticleEditor from '../components/ArticleEditor';
import ArticleList from '../components/ArticleList';

const CreatorDashboard = () => {
  const [editingArticleId, setEditingArticleId] = useState(null);
  const [key, setKey] = useState(Date.now()); // Force re-render of ArticleList after changes

  const handleSave = () => {
    setEditingArticleId(null);
    setKey(Date.now()); // Update key to re-render ArticleList
  };

  const handleSubmit = () => {
    setEditingArticleId(null);
    setKey(Date.now()); // Update key to re-render ArticleList
  };

  const handleCreateNewArticle = () => {
    setEditingArticleId(null); // Ensure no article is being edited
    setKey(Date.now());
  };

  return (
    <div>
      <h1>Creator Dashboard</h1>
      <button onClick={handleCreateNewArticle}>Create New Article</button>
      {editingArticleId === null ? (
        <>
          <ArticleList role="Creator" key={key} />
          {/* You might want to add buttons here to select an article for editing */}
        </>
      ) : (
        <ArticleEditor articleId={editingArticleId} onSave={handleSave} onSubmit={handleSubmit} />
      )}
    </div>
  );
};

export default CreatorDashboard;
