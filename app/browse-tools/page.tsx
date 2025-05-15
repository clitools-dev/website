import React from 'react';
import Link from 'next/link';

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

export default function BrowseToolsPage() {
  return (
    <>
      <main style={{ backgroundColor: '#1d2021', color: '#ebdbb2', minHeight: 'calc(100vh - 160px)' /* Adjusted for potential navbar/footer */, paddingTop: '2rem', paddingBottom: '2rem' }}>
        <section id="categories" className="py-12" style={{ backgroundColor: '#32302f' }}>
          <div className="container mx-auto px-6">
            <div className="mb-10 text-left"> {/* Back link to the left */}
                <Link href="/" className="transition duration-150 hover:text-gruvbox-green inline-block" style={{ color: '#8ec07c', textDecoration: 'underline', fontSize: '1.1em' }}>
                    &lt; Back to Home
                </Link>
            </div>
            <h2 className="text-4xl font-bold mb-12 text-center" style={{ color: '#ebdbb2' }}>
              <span style={{ color: '#fabd2f' }}>&gt;$</span> Browse by Category
            </h2>
            <div className="space-y-8 max-w-3xl mx-auto"> {/* Max width for content readability */}
              {toolCategories.map((category, index) => (
                <div
                  key={index}
                  className="p-6 rounded-none border-2 transition-colors duration-300 hover:border-gruvbox-orange"
                  style={{ backgroundColor: '#3c3836', borderColor: '#504945' }}
                >
                  <h3 className="text-2xl font-semibold mb-3" style={{ color: '#ebdbb2' }}> {/* Slightly more margin for heading */}
                    {category.name}
                  </h3>
                  <p className="text-md" style={{ color: '#d5c4a1', lineHeight: '1.6' }}> {/* Improved line height for description */}
                    {category.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
} 