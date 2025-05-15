import React from 'react';
import Link from 'next/link';

export default function AboutUsPage() {
  const GITHUB_ORG_URL = "https://github.com/clitools-dev";
  const DISCORD_URL = "https://discord.com/channels/1372408959809486870/1372408959809486873";

  const sectionStyle: React.CSSProperties = {
    backgroundColor: '#32302f', // Gruvbox dark background
    color: '#ebdbb2',           // Gruvbox light text
    padding: '40px 0',
    minHeight: 'calc(100vh - 120px)', // Adjust based on navbar/footer
  };

  const containerStyle: React.CSSProperties = {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '0 20px',
  };

  const headingStyle: React.CSSProperties = {
    fontSize: '2.5em',
    fontWeight: 'bold',
    marginBottom: '30px',
    color: '#fabd2f', // Gruvbox yellow
    textAlign: 'center',
  };

  const paragraphStyle: React.CSSProperties = {
    fontSize: '1.1em',
    lineHeight: '1.7',
    marginBottom: '20px',
    color: '#d5c4a1', // Gruvbox lighter text
  };

  const linkStyle: React.CSSProperties = {
    color: '#8ec07c', // Gruvbox green
    textDecoration: 'underline',
  };
  
  const highlightLinkStyle: React.CSSProperties = {
    ...linkStyle,
    fontWeight: 'bold',
    fontSize: '1.2em',
    display: 'inline-block',
    margin: '5px 0',
  };

  return (
    <main style={{ backgroundColor: '#1d2021' }}>
      <section style={sectionStyle}>
        <div style={containerStyle}>
          <div className="mb-10 text-left">
            <Link href="/" className="transition duration-150 hover:text-gruvbox-green inline-block" style={{ ...linkStyle, fontSize: '1.1em' }}>
              &lt; Back to Home
            </Link>
          </div>

          <h1 style={headingStyle}>About CliTools.Dev</h1>
          
          <p style={paragraphStyle}>
            Welcome to CliTools.Dev! We are passionate about command-line interface (CLI) tools 
            and believe in the power of a well-crafted CLI to boost developer productivity and streamline workflows.
          </p>
          <p style={paragraphStyle}>
            Our mission is to curate and showcase a collection of modern, efficient, and innovative CLI tools 
            for developers of all backgrounds. Whether you're looking for tools for system administration, 
            file management, development, networking, or anything in between, we aim to be your go-to resource.
          </p>
          
          <h2 style={{ ...headingStyle, fontSize: '1.8em', color: '#b8bb26', marginTop: '40px', marginBottom: '20px', textAlign: 'left' }}>
            Our Community
          </h2>
          <p style={paragraphStyle}>
            We are an open-source initiative and believe in the power of community.
          </p>
          <p style={paragraphStyle}>
            Join our development and discussion on GitHub:
            <br />
            <a href={GITHUB_ORG_URL} target="_blank" rel="noopener noreferrer" style={highlightLinkStyle}>
              {GITHUB_ORG_URL}
            </a>
          </p>
          <p style={paragraphStyle}>
            Connect with us and other CLI enthusiasts on Discord:
            <br />
            <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer" style={highlightLinkStyle}>
              Join our Discord Server
            </a>
          </p>
          <p style={paragraphStyle}>
            We encourage contributions, suggestions, and feedback. Let's build the ultimate CLI tool directory together!
          </p>
        </div>
      </section>
    </main>
  );
} 