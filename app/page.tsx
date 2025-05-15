"use client"; // Mark this component as a Client Component

import Image from 'next/image'; // Potentially for future use, not strictly needed for direct SVG embedding
import Link from 'next/link';   // For Next.js optimised navigation if routes are internal
import { useAuth0 } from '@auth0/auth0-react'; // Import useAuth0
import { useEffect } from 'react'; // Import useEffect for logging

export default function HomePage() {
  const { user, isAuthenticated, isLoading, loginWithRedirect, logout, error } = useAuth0(); // Get user state and auth methods

  useEffect(() => {
    console.log("Auth0 State:", {
      isLoading,
      isAuthenticated,
      user,
      error,
    });
  }, [isLoading, isAuthenticated, user, error]);

  if (isLoading) {
    console.log("Auth0 is loading...");
    // Optionally render a loading indicator here for the auth part
  }
  if (error) {
    console.error("Auth0 Error:", error);
    // Optionally render an error message here
  }

  return (
    <>
      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b-2" style={{ backgroundColor: '#1d2021', borderColor: '#fe8019' }}>
        <div className="container mx-auto px-6 py-3 flex justify-between items-center">
          <Link className="font-bold text-2xl transition duration-150 hover:text-gruvbox-green" href="#" style={{ color: '#ebdbb2' }}>
            CliTools.Dev
          </Link>
          <div className="hidden md:flex space-x-6 items-center">
            <Link className="transition duration-150 hover:text-gruvbox-green" href="#" style={{ color: '#ebdbb2' }}>Home</Link>
            <Link className="transition duration-150 hover:text-gruvbox-green" href="/browse-tools" style={{ color: '#ebdbb2' }}>Categories</Link>
            <Link className="transition duration-150 hover:text-gruvbox-green" href="/submit-tool" style={{ color: '#ebdbb2' }}>Submit a Tool</Link>
            <Link className="transition duration-150 hover:text-gruvbox-green" href="/about" style={{ color: '#ebdbb2' }}>About Us</Link>
          </div>
          <div className="flex items-center space-x-4">
            <input
              className="border rounded-none px-3 py-1 placeholder-gruvbox focus:outline-none focus:ring-0"
              style={{ backgroundColor: '#3c3836', color: '#ebdbb2', borderColor: '#fe8019' }}
              type="text"
              placeholder="Search_tools>"
            />
            {!isLoading && !isAuthenticated && (
              <button 
                onClick={() => loginWithRedirect()}
                className="transition duration-150 hover:text-gruvbox-green whitespace-nowrap"
                style={{ color: '#ebdbb2', background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontFamily:'inherit', fontSize: 'inherit' }}
              >
                Login
              </button>
            )}
            {!isLoading && isAuthenticated && user && (
              <div className="flex items-center space-x-2">
                {user.picture && <Image src={user.picture} alt={user.name || 'User avatar'} width={32} height={32} className="rounded-full" />}
                {user.name && <span style={{color: '#ebdbb2'}} className="whitespace-nowrap">{user.name}</span>}
                <button 
                  onClick={() => logout({ logoutParams: { returnTo: typeof window !== 'undefined' ? window.location.origin : undefined } })}
                  className="transition duration-150 hover:text-gruvbox-green whitespace-nowrap"
                  style={{ color: '#ebdbb2', background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontFamily:'inherit', fontSize: 'inherit' }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="py-16" style={{ backgroundColor: '#32302f', color: '#ebdbb2' }}>
        <div className="container mx-auto px-6 py-12 text-center">
          <h1 className="text-5xl font-bold mb-4 animate-pulse" style={{ color: '#ebdbb2' }}>
            Discover the Best Command-Line Tools
          </h1>
          <p className="mt-4 text-lg" style={{ color: '#d5c4a1' }}>
            A curated collection of modern CLI tools for developers.
          </p>
          <div className="mt-8 space-x-4">
            <Link
              href="/browse-tools"
              className="font-semibold px-6 py-2 rounded-none border-2 transition duration-150 hover:bg-gruvbox-green-darker"
              style={{ backgroundColor: '#b8bb26', color: '#282828', borderColor: '#b8bb26' }}
            >
              ./browse_tools
            </Link>
            <Link
              href="/submit-tool"
              className="font-semibold px-6 py-2 rounded-none border-2 transition duration-150 hover:bg-gruvbox-yellow-transparent"
              style={{ backgroundColor: 'transparent', color: '#fabd2f', borderColor: '#fabd2f' }}
            >
              ./submit_tool
            </Link>
          </div>
        </div>
      </header>

      {/* Featured Tools Section */}
      <section className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-10 text-center" style={{ color: '#ebdbb2' }}>
          <span style={{ color: '#fabd2f' }}>&gt;$</span> Featured Tools
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Tool Card 1 */}
          <div
            className="border-2 p-6 rounded-none flex flex-col transition-colors duration-300 hover:border-gruvbox-orange"
            style={{ backgroundColor: '#3c3836', borderColor: '#504945' }}
          >
            <svg
              width="80"
              height="80"
              viewBox="0 0 80 80"
              className="w-20 h-20 mx-auto rounded-none border-2"
              style={{ borderColor: '#665c54' }}
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="80" height="80" style={{ fill: '#3c3836' }} />
              <path d="M20 55 V25 H35" style={{ stroke: '#8ec07c' }} strokeWidth="4" />
              <path d="M32 40 H60" style={{ stroke: '#8ec07c' }} strokeWidth="4" />
              <path d="M50 32 L60 40 L50 48" style={{ stroke: '#8ec07c' }} strokeWidth="4" />
            </svg>
            <h3 className="text-2xl font-semibold mt-6 mb-2 text-center" style={{ color: '#ebdbb2' }}>
              Tool Name_v1.0
            </h3>
            <p className="mt-2 text-sm flex-grow" style={{ color: '#d5c4a1' }}>
              &gt; Brief_description_of_the_tool_and_its_main_purpose. Highlighting_key_features.
            </p>
            <div className="mt-4 text-center">
              <span
                className="inline-block border text-xs font-medium px-3 py-1 rounded-none"
                style={{ backgroundColor: '#504945', color: '#bdae93', borderColor: '#665c54' }}
              >
                -linux
              </span>
              <span
                className="inline-block border text-xs font-medium px-3 py-1 rounded-none ml-2"
                style={{ backgroundColor: '#504945', color: '#bdae93', borderColor: '#665c54' }}
              >
                -macos
              </span>
              <span
                className="inline-block border text-xs font-medium px-3 py-1 rounded-none ml-2"
                style={{ backgroundColor: '#504945', color: '#bdae93', borderColor: '#665c54' }}
              >
                -windows
              </span>
            </div>
            <Link
              href="#"
              className="block text-center font-semibold mt-6 px-6 py-2 rounded-none border-2 transition duration-150 hover:bg-gruvbox-aqua-darker"
              style={{ backgroundColor: '#8ec07c', color: '#282828', borderColor: '#8ec07c' }}
            >
              cat tool_details.md
            </Link>
          </div>

          {/* Tool Card 2 (Example) */}
          <div
            className="border-2 p-6 rounded-none flex flex-col transition-colors duration-300 hover:border-gruvbox-orange"
            style={{ backgroundColor: '#3c3836', borderColor: '#504945' }}
          >
            <svg
              width="80"
              height="80"
              viewBox="0 0 80 80"
              className="w-20 h-20 mx-auto rounded-none border-2"
              style={{ borderColor: '#665c54' }}
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="80" height="80" style={{ fill: '#3c3836' }} />
              <path d="M20 55 V25 H35" style={{ stroke: '#8ec07c' }} strokeWidth="4" />
              <path d="M32 40 H60" style={{ stroke: '#8ec07c' }} strokeWidth="4" />
              <path d="M50 32 L60 40 L50 48" style={{ stroke: '#8ec07c' }} strokeWidth="4" />
            </svg>
            <h3 className="text-2xl font-semibold mt-6 mb-2 text-center" style={{ color: '#ebdbb2' }}>
              Another_Tool.sh
            </h3>
            <p className="mt-2 text-sm flex-grow" style={{ color: '#d5c4a1' }}>
              &gt; This_is_another_excellent_tool_that_helps_you_achieve_tasks_more_efficiently.
            </p>
            <div className="mt-4 text-center">
              <span
                className="inline-block border text-xs font-medium px-3 py-1 rounded-none"
                style={{ backgroundColor: '#504945', color: '#bdae93', borderColor: '#665c54' }}
              >
                -cross-platform
              </span>
            </div>
            <Link
              href="#"
              className="block text-center font-semibold mt-6 px-6 py-2 rounded-none border-2 transition duration-150 hover:bg-gruvbox-aqua-darker"
              style={{ backgroundColor: '#8ec07c', color: '#282828', borderColor: '#8ec07c' }}
            >
              man another_tool
            </Link>
          </div>

          {/* Tool Card 3 (Example) */}
          <div
            className="border-2 p-6 rounded-none flex flex-col transition-colors duration-300 hover:border-gruvbox-orange"
            style={{ backgroundColor: '#3c3836', borderColor: '#504945' }}
          >
            <svg
              width="80"
              height="80"
              viewBox="0 0 80 80"
              className="w-20 h-20 mx-auto rounded-none border-2"
              style={{ borderColor: '#665c54' }}
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="80" height="80" style={{ fill: '#3c3836' }} />
              <path d="M20 55 V25 H35" style={{ stroke: '#8ec07c' }} strokeWidth="4" />
              <path d="M32 40 H60" style={{ stroke: '#8ec07c' }} strokeWidth="4" />
              <path d="M50 32 L60 40 L50 48" style={{ stroke: '#8ec07c' }} strokeWidth="4" />
            </svg>
            <h3 className="text-2xl font-semibold mt-6 mb-2 text-center" style={{ color: '#ebdbb2' }}>
              UtilityPro.exe
            </h3>
            <p className="mt-2 text-sm flex-grow" style={{ color: '#d5c4a1' }}>
              &gt; The_ultimate_utility_for_professionals,_boosting_productivity_and_workflow.
            </p>
            <div className="mt-4 text-center">
              <span
                className="inline-block border text-xs font-medium px-3 py-1 rounded-none"
                style={{ backgroundColor: '#504945', color: '#bdae93', borderColor: '#665c54' }}
              >
                --scriptable
              </span>
              <span
                className="inline-block border text-xs font-medium px-3 py-1 rounded-none ml-2"
                style={{ backgroundColor: '#504945', color: '#bdae93', borderColor: '#665c54' }}
              >
                --open-source
              </span>
            </div>
            <Link
              href="#"
              className="block text-center font-semibold mt-6 px-6 py-2 rounded-none border-2 transition duration-150 hover:bg-gruvbox-aqua-darker"
              style={{ backgroundColor: '#8ec07c', color: '#282828', borderColor: '#8ec07c' }}
            >
              ./discover_utility
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action / Discord */}
      <section
        className="border-t-2 border-b-2 border-dashed py-12"
        style={{ backgroundColor: '#3c3836', borderColor: '#fe8019' }}
      >
        <div className="container mx-auto px-6 py-10 text-center">
          <h2 className="text-3xl font-bold" style={{ color: '#ebdbb2' }}>
            <span style={{ color: '#b8bb26' }}>user@clitools</span>:
            <span style={{ color: '#83a598' }}>~</span>$ Have an Idea or Suggestion?
          </h2>
          <p className="mt-4 text-lg mb-8" style={{ color: '#928374' }}>
            // Join our community on Discord to share your thoughts and help us grow!
          </p>
          <a
            href="https://discord.com/channels/1372408959809486870/1372408959809486873"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold px-8 py-3 rounded-none border-2 transition duration-150 inline-flex items-center hover:bg-gruvbox-yellow-darker"
            style={{ backgroundColor: '#fabd2f', color: '#282828', borderColor: '#fabd2f' }}
          >
            <svg
              className="w-5 h-5 mr-2"
              style={{ fill: '#282828' }}
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M13.545 2.907a13.227 13.227 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.19 12.19 0 0 0-3.658 0 8.258 8.258 0 0 0-.412-.833.051.051 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.041.041 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032c.001.014.01.028.021.037a13.276 13.276 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019c.308-.42.582-.863.818-1.329a.05.05 0 0 0-.01-.059l-.018-.011a8.852 8.852 0 0 1-1.248-.595.05.05 0 0 1-.02-.066l.015-.019c.123-.096.248-.19.368-.283a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.05.05 0 0 1 .053.007c.12.093.243.187.368.283a.05.05 0 0 1-.002.085 8.809 8.809 0 0 1-1.249.594.05.05 0 0 0-.03.03.052.052 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.235 13.235 0 0 0 4.001-2.02.049.049 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.034.034 0 0 0-.02-.019Zm-8.198 7.307c-.789 0-1.438-.724-1.438-1.612 0-.888.637-1.613 1.438-1.613.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612Zm5.316 0c-.788 0-1.438-.724-1.438-1.612 0-.888.637-1.613 1.438-1.613.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612Z" />
            </svg>
            echo "Join Discord" &gt; /dev/ttyS0 {/* Note: This specific text might need to be adjusted if it implies a literal command */}
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-2 py-8" style={{ backgroundColor: '#1d2021', color: '#a89984', borderColor: '#fe8019' }}>
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm">&copy; 2025 CLI Tools Dev. All rights reserved. Kernel version: Gruvbox-dark-0.1</p>
          <div className="mt-4 space-x-4 text-xs">
            <Link href="#" className="transition duration-150 hover:text-gruvbox-green" style={{ color: '#ebdbb2' }}>
              README.md
            </Link>{' '}
            <span style={{ color: '#665c54' }}>|</span>{' '}
            <Link href="#" className="transition duration-150 hover:text-gruvbox-green" style={{ color: '#ebdbb2' }}>
              CONTRIBUTING.md
            </Link>{' '}
            <span style={{ color: '#665c54' }}>|</span>{' '}
            <Link href="#" className="transition duration-150 hover:text-gruvbox-green" style={{ color: '#ebdbb2' }}>
              LICENSE
            </Link>{' '}
            <span style={{ color: '#665c54' }}>|</span>{' '}
            <Link href="#" className="transition duration-150 hover:text-gruvbox-green" style={{ color: '#ebdbb2' }}>
              status --extended
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
} 