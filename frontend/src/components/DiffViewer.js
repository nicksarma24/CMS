import React from 'react';

const DiffViewer = ({ originalHtml, updatedHtml }) => {
  // This is a simplified diff viewer
  // In a real application, you'd use a library like react-diff-view or difflib
  
  return (
    <div className="bg-gray-50 p-4 rounded-lg shadow-inner mb-6">
      <h3 className="text-lg font-bold mb-4">Version Comparison</h3>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-red-50 p-2 rounded">
          <h4 className="text-sm font-bold mb-2">Original Version</h4>
          <pre className="whitespace-pre-wrap font-mono text-xs">{originalHtml}</pre>
        </div>
        
        <div className="bg-green-50 p-2 rounded">
          <h4 className="text-sm font-bold mb-2">Updated Version</h4>
          <pre className="whitespace-pre-wrap font-mono text-xs">{updatedHtml}</pre>
        </div>
      </div>
    </div>
  );
};

export default DiffViewer;
