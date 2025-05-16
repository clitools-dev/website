import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface TeamMember {
  name: string;
  role: string;
  avatar: string;
  github: string;
  description: string;
}

async function getTeamMembers(): Promise<TeamMember[]> {
  try {
    // Fetch public organization members
    const membersResponse = await fetch(
      'https://api.github.com/orgs/clitools-dev/public_members',
      {
        next: { revalidate: 3600 } // Revalidate every hour
      }
    );

    if (!membersResponse.ok) {
      throw new Error('Failed to fetch GitHub members');
    }

    const members = await membersResponse.json();

    // Fetch additional user details for each member
    const teamMembers = await Promise.all(
      members.map(async (member: any) => {
        const userResponse = await fetch(member.url);

        if (!userResponse.ok) {
          throw new Error(`Failed to fetch user details for ${member.login}`);
        }

        const userDetails = await userResponse.json();

        return {
          name: userDetails.name || userDetails.login,
          role: 'Team Member',
          avatar: userDetails.avatar_url,
          github: userDetails.html_url,
          description: userDetails.bio || 'Contributor to clitools-dev',
        };
      })
    );

    return teamMembers;
  } catch (error) {
    console.error('Error fetching team members:', error);
    return [];
  }
}

export default async function AboutUsPage() {
  const GITHUB_ORG_URL = "https://github.com/clitools-dev";
  const DISCORD_URL = "https://discord.com/channels/1372408959809486870/1372408959809486873";
  const teamMembers = await getTeamMembers();

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
          
          {/* Team Members Section */}
          <h2 style={{ ...headingStyle, fontSize: '1.8em', color: '#b8bb26', marginTop: '40px', marginBottom: '20px', textAlign: 'left' }}>
            Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {teamMembers.map((member) => (
              <div
                key={member.github}
                className="p-6 rounded-lg border-2 transition-all duration-300 hover:transform hover:scale-105"
                style={{ 
                  backgroundColor: '#3c3836',
                  borderColor: '#fe8019',
                  color: '#ebdbb2'
                }}
              >
                <div className="flex items-start space-x-4">
                  <div className="relative w-20 h-20 flex-shrink-0">
                    <Image
                      src={member.avatar}
                      alt={`${member.name}'s avatar`}
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2" style={{ color: '#b8bb26' }}>
                      {member.name}
                    </h3>
                    <p className="text-sm mb-2" style={{ color: '#fabd2f' }}>
                      {member.role}
                    </p>
                    <p className="text-sm mb-4" style={{ color: '#d5c4a1' }}>
                      {member.description}
                    </p>
                    <a
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm transition duration-150 hover:text-gruvbox-green"
                      style={{ color: '#8ec07c' }}
                    >
                      <svg
                        className="w-4 h-4 mr-2"
                        style={{ fill: '#8ec07c' }}
                        viewBox="0 0 16 16"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                      </svg>
                      GitHub Profile
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
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