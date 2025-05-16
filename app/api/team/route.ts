import { NextResponse } from 'next/server';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_ORG = 'clitools-dev';

export async function GET() {
  try {
    // Fetch organization members
    const membersResponse = await fetch(
      `https://api.github.com/orgs/${GITHUB_ORG}/members`,
      {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
          Accept: 'application/vnd.github.v3+json',
        },
      }
    );

    if (!membersResponse.ok) {
      throw new Error('Failed to fetch GitHub members');
    }

    const members = await membersResponse.json();

    // Fetch additional user details for each member
    const teamMembers = await Promise.all(
      members.map(async (member: any) => {
        const userResponse = await fetch(member.url, {
          headers: {
            Authorization: `token ${GITHUB_TOKEN}`,
            Accept: 'application/vnd.github.v3+json',
          },
        });

        if (!userResponse.ok) {
          throw new Error(`Failed to fetch user details for ${member.login}`);
        }

        const userDetails = await userResponse.json();

        return {
          name: userDetails.name || userDetails.login,
          role: userDetails.bio || 'Team Member',
          avatar: userDetails.avatar_url,
          github: userDetails.html_url,
          description: userDetails.bio || `Contributor to ${GITHUB_ORG}`,
        };
      })
    );

    return NextResponse.json(teamMembers);
  } catch (error) {
    console.error('Error fetching team members:', error);
    return NextResponse.json(
      { error: 'Failed to fetch team members' },
      { status: 500 }
    );
  }
} 