"use client";

import React, { useState, FormEvent } from 'react';

// Copied toolCategories from app/browse-tools/page.tsx
const toolCategories = [
  {
    name: "🧰 System & Administration",
    description: "Tools for managing and monitoring system resources and services.",
  },
  {
    name: "🗃️ File & Disk Management",
    description: "Tools for handling files, directories, and disk usage.",
  },
  {
    name: "🧑‍💻 Development & Programming",
    description: "Tools for coding, building, and managing software projects.",
  },
  {
    name: "🌐 Networking & Internet",
    description: "Tools for network diagnostics, file transfers, and web interactions.",
  },
  {
    name: "🔐 Security & Encryption",
    description: "Tools for encryption, password management, and file integrity.",
  },
  {
    name: "🧪 Data & Text Processing",
    description: "Tools for manipulating text, structured data, and documents.",
  },
  {
    name: "🧱 Containers & Virtualization",
    description: "Tools for managing containers, VMs, and orchestration.",
  },
  {
    name: "🧑‍🎨 Terminal Productivity & Aesthetics",
    description: "Tools to enhance terminal usability and appearance.",
  },
  {
    name: "🧠 AI & Data Science",
    description: "CLI tools for machine learning, data analysis, and notebooks.",
  },
];

interface SubmitToolModalProps {
  isOpen: boolean;
  onClose: () => void;
  githubRepoPath: string; // e.g., "clitools-dev/clitools_data"
}

export default function SubmitToolModal({ isOpen, onClose, githubRepoPath }: SubmitToolModalProps) {
  const [toolName, setToolName] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]); // New state for selected categories

  const handleCategoryChange = (categoryName: string) => {
    setSelectedCategories(prev =>
      prev.includes(categoryName)
        ? prev.filter(name => name !== categoryName)
        : [...prev, categoryName]
    );
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const title = `Tool Suggestion: ${toolName || 'New Tool'}`;
    let body = `**Tool Name:** ${toolName || 'N/A'}\n`;
    body += `**GitHub URL:** ${githubUrl || 'N/A'}\n`;
    body += `**Description:**\n${description || 'No description provided.'}`;
    body += `\n\n**Categories:**\n${selectedCategories.length > 0 ? selectedCategories.map(c => `- ${c.substring(c.indexOf(" ") + 1).trim()}`).join('\n') : 'N/A'}`; 

    // Prepare labels for GitHub issue URL
    const labelsForIssue = selectedCategories.map(c => c.substring(c.indexOf(" ") + 1).trim()); // Get name and trim whitespace
    const encodedLabels = labelsForIssue.map(label => encodeURIComponent(label)); // Encode each label individually
    const labelsQueryParam = encodedLabels.length > 0 ? `&labels=${encodedLabels.join(',')}` : ''; // Join with comma

    const issueUrl = `https://github.com/${githubRepoPath}/issues/new?title=${encodeURIComponent(title)}&body=${encodeURIComponent(body)}${labelsQueryParam}`;
    
    window.open(issueUrl, '_blank');
    onClose(); // Close modal after opening GitHub issue page
    // Reset form fields
    setToolName('');
    setGithubUrl('');
    setDescription('');
    setSelectedCategories([]); // Reset selected categories
  };

  if (!isOpen) return null;

  return (
    <div style={overlayStyle} onClick={onClose}> {/* Clicking overlay closes modal */}
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}> {/* Clicking modal content doesn't close */}
        <h2 style={{ color: '#fabd2f', borderBottom: '1px solid #504945', paddingBottom: '10px', marginBottom: '20px' }}>Suggest a New CLI Tool</h2>
        <form onSubmit={handleSubmit}>
          <div style={formGroupStyle}>
            <label htmlFor="toolName" style={labelStyle}>Tool Name:</label>
            <input 
              type="text" 
              id="toolName" 
              value={toolName} 
              onChange={(e) => setToolName(e.target.value)} 
              required 
              style={inputStyle}
            />
          </div>
          <div style={formGroupStyle}>
            <label htmlFor="githubUrl" style={labelStyle}>GitHub URL (Optional):</label>
            <input 
              type="url" 
              id="githubUrl" 
              value={githubUrl} 
              onChange={(e) => setGithubUrl(e.target.value)} 
              style={inputStyle}
            />
          </div>
          <div style={formGroupStyle}>
            <label htmlFor="description" style={labelStyle}>Description / Use Case:</label>
            <textarea 
              id="description" 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              required 
              rows={4} 
              style={textareaStyle}
            />
          </div>

          {/* Category Selection Tags */}
          <div style={formGroupStyle}>
            <label style={{...labelStyle, marginBottom: '10px'}}>Categories:</label>
            <div 
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px',
                padding: '10px',
                border: '1px solid #504945',
                backgroundColor: '#3c3836',
                maxHeight: '150px',
                overflowY: 'auto'
              }}
            >
              {toolCategories.map(category => {
                const isSelected = selectedCategories.includes(category.name);
                const tagStyle: React.CSSProperties = {
                  padding: '6px 12px',
                  borderRadius: '0px', // Keep it sharp as per theme
                  cursor: 'pointer',
                  transition: 'background-color 0.2s, border-color 0.2s, color 0.2s',
                  fontSize: '0.9em',
                  border: '1px solid',
                  ...(isSelected 
                    ? { backgroundColor: '#b8bb26', color: '#282828', borderColor: '#b8bb26' } // Selected: Gruvbox green
                    : { backgroundColor: '#504945', color: '#ebdbb2', borderColor: '#665c54' } // Default: Gruvbox gray
                  )
                };
                return (
                  <div 
                    key={category.name} 
                    style={tagStyle} 
                    onClick={() => handleCategoryChange(category.name)}
                  >
                    {category.name} 
                  </div>
                );
              })}
            </div>
          </div>

          <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
            <button type="button" onClick={onClose} style={{...buttonBaseStyle, ...secondaryButtonStyle}} className="hover:bg-gruvbox-yellow-transparent">
              Cancel
            </button>
            <button type="submit" style={{...buttonBaseStyle, ...primaryButtonStyle}} className="hover:bg-gruvbox-green-darker">
              Create GitHub Issue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Basic inline styles for the modal (can be moved to CSS or Tailwind if preferred)
const overlayStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
  color: '#ebdbb2', // Default text color for modal content
};

const modalStyle: React.CSSProperties = {
  backgroundColor: '#282828', // Gruvbox dark background
  padding: '30px',
  borderRadius: '0px', // Keep it sharp
  border: '2px solid #fe8019', // Gruvbox orange border
  width: '90%',
  maxWidth: '600px',
  boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
  position: 'relative',
};

const formGroupStyle: React.CSSProperties = {
  marginBottom: '15px',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  marginBottom: '5px',
  color: '#bdae93', // Gruvbox dim foreground
  fontSize: '0.9em',
};

const inputBaseStyle: React.CSSProperties = {
  width: '100%',
  padding: '10px',
  border: '1px solid #504945', // Gruvbox gray border
  backgroundColor: '#3c3836', // Gruvbox darker background
  color: '#ebdbb2', // Gruvbox foreground
  borderRadius: '0px',
  boxSizing: 'border-box', // Ensure padding doesn't expand width
};

const inputStyle: React.CSSProperties = {
  ...inputBaseStyle,
};

const textareaStyle: React.CSSProperties = {
  ...inputBaseStyle,
  resize: 'vertical',
};

const buttonBaseStyle: React.CSSProperties = {
  padding: '10px 20px',
  border: '2px solid', 
  borderRadius: '0px',
  cursor: 'pointer',
  fontWeight: 'bold',
  transition: 'background-color 0.15s ease-in-out, color 0.15s ease-in-out',
  fontSize: '0.9em',
};

const primaryButtonStyle: React.CSSProperties = {
  backgroundColor: '#b8bb26', // Gruvbox green
  color: '#282828',
  borderColor: '#b8bb26',
};

const secondaryButtonStyle: React.CSSProperties = {
  backgroundColor: 'transparent',
  color: '#fabd2f', // Gruvbox yellow
  borderColor: '#fabd2f',
}; 