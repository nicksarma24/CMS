import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from '../src/components/Login';
import Header from './components/Header';
import CreatorDashboard from './pages/CreatorDashboard';
import EditorDashboard from './pages/EditorDashboard';
import ReaderDashboard from './pages/ReaderDashboard';
import ArticleDetail from './pages/ArticleDetail';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app-container">
          <Header />
          <main className="container mx-auto p-4">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route 
                path="/creator/*" 
                element={
                  <ProtectedRoute allowedRoles={['Creator']}>
                    <CreatorDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/editor/*" 
                element={
                  <ProtectedRoute allowedRoles={['Editor']}>
                    <EditorDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/reader/*" 
                element={
                  <ProtectedRoute allowedRoles={['Reader']}>
                    <ReaderDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route path="/article/:id" element={<ArticleDetail />} />
              <Route path="/" element={<Navigate to="/login" />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;