"use client";

import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import SubmitToolModal from '../../components/SubmitToolModal'; // Adjust path if your components folder is elsewhere
import Link from 'next/link'; // For linking back to home or other pages

const GITHUB_REPO_PATH = "clitools-dev/clitools_data";

export default function SubmitToolPage() {
  const { isAuthenticated, isLoading, loginWithRedirect, user } = useAuth0();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    if (!isLoading && !isAuthenticated) {
      loginWithRedirect({
        appState: { returnTo: '/submit-tool' } // Redirect back to this page after login
      });
    } else if (isAuthenticated) {
      setIsModalOpen(true);
    }
  };

  const pageContainerStyle: React.CSSProperties = {
    minHeight: 'calc(100vh - 180px)', // Adjust based on your navbar and footer height
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px',
    textAlign: 'center',
    // backgroundColor: '#32302f', // Optional: same as hero section background
  };

  const buttonStyle: React.CSSProperties = {
    backgroundColor: '#b8bb26', // Gruvbox green
    color: '#282828',
    border: '2px solid #b8bb26',
    padding: '12px 24px',
    fontSize: '1.1em',
    fontWeight: 'bold',
    cursor: 'pointer',
    borderRadius: '0px',
    transition: 'background-color 0.15s ease-in-out',
  };

  const messageStyle: React.CSSProperties = {
    color: '#d5c4a1',
    marginBottom: '20px',
    fontSize: '1.1em',
  };

  if (isLoading) {
    return <div style={pageContainerStyle}><p style={messageStyle}>Loading user status...</p></div>;
  }

  return (
    <div style={pageContainerStyle}>
      <h1 style={{ color: '#ebdbb2', fontSize: '2.5em', fontWeight: 'bold', marginBottom: '20px' }}>
        Suggest a CLI Tool
      </h1>
      <p style={messageStyle}>
        Help expand our collection! If you know a great command-line tool that we don't have listed,
        <br />
        please use the button below to open a suggestion form.
      </p>
      
      <button 
        onClick={handleOpenModal} 
        style={buttonStyle}
        className="hover:bg-gruvbox-green-darker"
      >
        {isAuthenticated ? "Suggest a New Tool" : "Login to Suggest a Tool"}
      </button>

      {isAuthenticated && user && (
        <SubmitToolModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          githubRepoPath={GITHUB_REPO_PATH} 
        />
      )}
      
      <div style={{ marginTop: '40px' }}>
        <Link href="/" style={{ color: '#8ec07c', textDecoration: 'underline' }} className="hover:text-gruvbox-aqua-darker">
          &lt; Back to Home
        </Link>
      </div>
    </div>
  );
} 