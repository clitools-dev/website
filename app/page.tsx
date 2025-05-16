"use client"; // Mark this component as a Client Component

import dynamic from 'next/dynamic';
import Image from 'next/image'; // Potentially for future use, not strictly needed for direct SVG embedding
import Link from 'next/link';   // For Next.js optimised navigation if routes are internal
import { useAuth0 } from '@auth0/auth0-react'; // Import useAuth0
import { useEffect, useState, Suspense } from 'react'; // Import useEffect for logging and useState for dropdown

// Dynamically import non-critical components
const UserDropdown = dynamic(() => import('./components/UserDropdown'), {
  loading: () => <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />,
  ssr: false
});

// Dynamically import search component
const SearchBar = dynamic(() => import('./components/SearchBar'), {
  loading: () => <div className="w-48 h-8 bg-gray-200 animate-pulse" />,
  ssr: false
});

export default function HomePage() {
  const { user, isAuthenticated, isLoading, loginWithRedirect, logout, error } = useAuth0(); // Get user state and auth methods
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown

  useEffect(() => {
    console.log("Auth0 State:", {
      isLoading,
      isAuthenticated,
      user,
      error,
    });
  }, [isLoading, isAuthenticated, user, error]);

  // Add click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const dropdown = document.getElementById('user-dropdown');
      const trigger = document.getElementById('user-dropdown-trigger');
      if (dropdown && trigger && !dropdown.contains(event.target as Node) && !trigger.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // 使用 Intersection Observer 实现懒加载
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.lazy-load').forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

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
            <Suspense fallback={<div className="w-48 h-8 bg-gray-200 animate-pulse" />}>
              <SearchBar />
            </Suspense>
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
              <Suspense fallback={<div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />}>
                <UserDropdown user={user} isOpen={isDropdownOpen} onToggle={setIsDropdownOpen} onLogout={logout} />
              </Suspense>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section with lazy loading */}
      <header className="py-16 lazy-load opacity-0" style={{ backgroundColor: '#32302f', color: '#ebdbb2' }}>
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
              aria-label="Browse CLI tools"
            >
              ./browse_tools
            </Link>
            <Link
              href="/submit-tool"
              className="font-semibold px-6 py-2 rounded-none border-2 transition duration-150 hover:bg-gruvbox-yellow-transparent"
              style={{ backgroundColor: 'transparent', color: '#fabd2f', borderColor: '#fabd2f' }}
              aria-label="Submit a new CLI tool"
            >
              ./submit_tool
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content with lazy loading */}
      <main>
        {/* Add structured data for enhanced search results */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "CLI Tools",
              "url": "https://clitools.dev",
              "description": "A curated collection of modern CLI tools for developers",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://clitools.dev/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />

        {/* Add Organization structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "CLI Tools",
              "url": "https://clitools.dev",
              "logo": "https://clitools.dev/logo.png",
              "sameAs": [
                "https://github.com/clitools-dev",
                "https://discord.gg/clitools"
              ],
              "description": "A community-driven platform for discovering and sharing command-line tools"
            })
          }}
        />

        {/* Add BreadcrumbList structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [{
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://clitools.dev"
              }]
            })
          }}
        />

        {/* GitHub Organization Invitation Section with lazy loading */}
        <section className="container mx-auto px-6 py-16 lazy-load opacity-0" aria-labelledby="github-invitation-heading">
          <div className="text-center">
            <h2 id="github-invitation-heading" className="text-3xl font-bold mb-10" style={{ color: '#ebdbb2' }}>
              <span style={{ color: '#b8bb26' }}>user@clitools</span>:
              <span style={{ color: '#83a598' }}>~</span>$ Want to join our GitHub organization?
            </h2>
            <p className="mt-4 text-lg mb-8" style={{ color: '#928374' }}>
              // Submit an issue to request joining our organization, let's build the best CLI tools directory together!
            </p>
            <a
              href="https://github.com/clitools-dev/members/issues/new?title=Request%20to%20join%20organization&body=%F0%9F%91%8B%20Hey%20there%21%0A%0A%F0%9F%9A%80%20I%20would%20love%20to%20join%20the%20clitools-dev%20organization%20and%20contribute%20to%20building%20the%20best%20CLI%20tools%20directory%21%0A%0A%23%23%20%F0%9F%93%9D%20About%20me%0A%0A-%20%F0%9F%91%A5%20GitHub%20username%3A%20%0A-%20%F0%9F%92%AC%20Why%20I%20want%20to%20join%3A%20%0A-%20%F0%9F%92%BB%20What%20I%20can%20contribute%3A%20%0A%0A%23%23%20%F0%9F%93%9A%20Additional%20information%0A%0A%3C!--%20Feel%20free%20to%20add%20any%20other%20relevant%20information%20here%20--%3E%0A%0A%F0%9F%8C%9F%20Looking%20forward%20to%20joining%20the%20community%21&labels=join-request"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold px-8 py-3 rounded-none border-2 transition duration-150 inline-flex items-center hover:bg-gruvbox-yellow-darker"
              style={{ backgroundColor: '#fabd2f', color: '#282828', borderColor: '#fabd2f' }}
              aria-label="Request to join GitHub organization"
            >
              <svg
                className="w-5 h-5 mr-2"
                style={{ fill: '#282828' }}
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
              </svg>
              Request to join organization
            </a>
          </div>
        </section>

        {/* Call to Action / Discord */}
        <section
          className="border-t-2 border-b-2 border-dashed py-12 lazy-load opacity-0"
          style={{ backgroundColor: '#3c3836', borderColor: '#fe8019' }}
          aria-labelledby="discord-cta-heading"
        >
          <div className="container mx-auto px-6 py-10 text-center">
            <h2 id="discord-cta-heading" className="text-3xl font-bold" style={{ color: '#ebdbb2' }}>
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
              aria-label="Join our Discord community"
            >
              <svg
                className="w-5 h-5 mr-2"
                style={{ fill: '#282828' }}
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path d="M13.545 2.907a13.227 13.227 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.19 12.19 0 0 0-3.658 0 8.258 8.258 0 0 0-.412-.833.051.051 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.041.041 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032c.001.014.01.028.021.037a13.276 13.276 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019c.308-.42.582-.863.818-1.329a.05.05 0 0 0-.01-.059l-.018-.011a8.852 8.852 0 0 1-1.248-.595.05.05 0 0 1-.02-.066l.015-.019c.123-.096.248-.19.368-.283a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.05.05 0 0 1 .053.007c.12.093.243.187.368.283a.05.05 0 0 1-.002.085 8.809 8.809 0 0 1-1.249.594.05.05 0 0 0-.03.03.052.052 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.235 13.235 0 0 0 4.001-2.02.049.049 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.034.034 0 0 0-.02-.019Zm-8.198 7.307c-.789 0-1.438-.724-1.438-1.612 0-.888.637-1.613 1.438-1.613.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612Zm5.316 0c-.788 0-1.438-.724-1.438-1.612 0-.888.637-1.613 1.438-1.613.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612Z" />
              </svg>
              Join Discord
            </a>
          </div>
        </section>
      </main>

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