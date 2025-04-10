"use client";
import { useRef, useEffect, useState, useMemo, useCallback } from "react";
import { FaTwitter, FaGithub, FaLinkedin, FaArrowUp, FaExternalLinkAlt, FaCode, FaStar } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { MdFilterList, MdSearch } from "react-icons/md";
import Image from "next/image";
import { StaticImageData } from "next/image";
import dsasorting from "../public/dsasorting.png";
import excel from "../public/excel.png";
import notes from "../public/Notes.png";
import financeGo from "../public/FinanceGo.png";
import gamble from "../public/gamble.png";
import crypto from "../public/Crypto-exchange.png";
import profile from "../public/profile.jpeg";

// Extended Project interface
interface Project {
  id: number;
  title: string;
  description: string;
  image: StaticImageData;
  link: string;
  github?: string;
  altText: string;
  techStack: string[];
  categories: string[];
  featured: boolean;
}

// Skills data
const skills = [
  { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "GSAP", "Redux"] },
  { category: "Backend", items: ["Node.js", "Express", "MongoDB", "Supabase"] },
  { category: "Tools", items: ["Git", "Figma", "VS Code", "Vercel", "Docker"] },
];

// Project category tags for filtering
const projectCategories = ["All", "Frontend", "Backend", "Full Stack", "UI/UX"];

// Enhanced Projects data with categories
const projects: Project[] = [
  {
    id: 1,
    title: "Notes App",
    description: "A comprehensive productivity tool featuring notes, notebooks, and todo lists with real-time synchronization.",
    image: notes,
    link: "https://notesappprivate-mjzu.vercel.app/",
    github: "https://github.com/Satyam-a-Developer/Notes-App",
    altText: "Notes Application Interface",
    techStack: ["Next.js", "TypeScript", "Supabase", "TailwindCSS"],
    categories: ["Full Stack", "UI/UX"],
    featured: true
  },
  {
    id: 2,
    title: "Gamble Project",
    description: "An interactive gambling application with multiple games and a sleek user interface.",
    image: gamble,
    link: "https://bubble-gamble.vercel.app/",
    github: "https://github.com/Satyam-a-Developer/Gamble-Project",
    altText: "Gambling Game Interface",
    techStack: ["Next.js", "Tailwind CSS"],
    categories: ["Frontend", "UI/UX"],
    featured: false
  },
  {
    id: 3,
    title: "Crypto-exchange",
    description: "Gateway for your cryptocurrency investments with real-time market data and portfolio tracking.",
    image: crypto,
    link: "https://crypto-exchange-plum.vercel.app/",
    github: "https://github.com/Satyam-a-Developer/crypto-exchange",
    altText: "Crypto Interface",
    techStack: ["Next.js", "CSS", "CoinDCX-API"],
    categories: ["Frontend", "Full Stack"],
    featured: true
  },
  {
    id: 4,
    title: "Excel Clone",
    description: "A fully functional Excel-like spreadsheet application with formula support and data visualization.",
    image: excel,
    link: "https://excel-sheet-344l.vercel.app/",
    github: "https://github.com/Satyam-a-Developer/Excel-Sheet",
    altText: "Spreadsheet Application",
    techStack: ["Next.js", "CSS Grid", "TailwindCSS"],
    categories: ["Frontend"],
    featured: false
  },
  {
    id: 5,
    title: "DSA Sorting Visualizer",
    description: "An educational tool that visualizes various sorting algorithms with step-by-step animations.",
    image: dsasorting,
    link: "https://dsa-sorting-algo-lo71tt.vercel.app/",
    github: "https://github.com/Satyam-a-Developer/DSA-Sorting-Algo",
    altText: "Sorting Algorithm Visualizer",
    techStack: ["JavaScript", "Algorithm Design"],
    categories: ["Frontend", "UI/UX"],
    featured: false
  },
  {
    id: 6,
    title: "FinanceGo",
    description: "A personal finance management tool with budgeting, investment tracking, and expense analysis features.",
    image: financeGo,
    link: "https://finance-go-frontend.vercel.app/",
    github: "https://github.com/Satyam-a-Developer/Finance-Go",
    altText: "Finance Management Dashboard",
    techStack: ["Next.js", "Chart.js", "MongoDB"],
    categories: ["Full Stack", "Backend"],
    featured: true
  },
];

// Notion-inspired styles
const notionStyles = `
  body {
    font-family: 'Inter', system-ui, sans-serif;
    line-height: 1.6;
  }
  .toggle {
    cursor: pointer;
    transition: all 0.2s ease;
    padding: 8px;
    border-radius: 4px;
  }
  .toggle:hover {
    background: #F1F0ED;
  }
  .toggle-content {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease-out;
  }
  .toggle-content.active {
    max-height: 5000px; /* Large enough value to accommodate content */
    transition: max-height 0.5s ease-in;
  }
  .notion-block {
    padding: 12px 16px;
    border-radius: 4px;
    background: white;
    margin-bottom: 8px;
    transition: background 0.2s ease;
  }
  .notion-block:hover {
    background: #F1F0ED;
  }
  .toggle-icon {
    transition: transform 0.2s ease;
  }
  .toggle.active .toggle-icon {
    transform: rotate(90deg);
  }
  .search-bar {
    width: 100%;
    padding: 8px 12px;
    border: 1px solid #E0E0E0;
    border-radius: 4px;
    background: #FAFAFA;
    outline: none;
    transition: border-color 0.2s ease;
  }
  .search-bar:focus {
    border-color: #2EAADC;
  }
  .project-card {
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  .project-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.12);
  }
  .project-image-container {
    position: relative;
    width: 100%;
    height: 180px;
    overflow: hidden;
  }
  .project-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.7));
    opacity: 0;
    transition: opacity 0.3s ease;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 12px;
  }
  .project-card:hover .project-overlay {
    opacity: 1;
  }
  .project-btn {
    padding: 8px 12px;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 4px;
    font-weight: 500;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    gap: 4px;
  }
  .project-btn:hover {
    background: white;
    transform: scale(1.05);
  }
  .featured-badge {
    position: absolute;
    top: 10px;
    right: 10px;
    background: rgba(245, 158, 11, 0.9);
    color: white;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 4px;
  }
  .category-chip {
    display: inline-block;
    padding: 4px 12px;
    background: #F3F4F6;
    color: #4B5563;
    border-radius: 16px;
    font-size: 12px;
    margin-right: 6px;
    margin-bottom: 6px;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  .category-chip:hover {
    background: #E5E7EB;
  }
  .category-chip.active {
    background: #0EA5E9;
    color: white;
  }
`;

// Optimized debounce utility with useCallback
function useDebounce<T extends (...args: any[]) => void>(callback: T, delay: number) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  return useCallback((...args: Parameters<T>) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      callback(...args);
      timeoutRef.current = null;
    }, delay);
  }, [callback, delay]);
}

// Reusable ToggleSection component
interface ToggleSectionProps {
  title: string;
  section: string;
  isOpen: boolean;
  onToggle: (section: string) => void;
  children: React.ReactNode;
}

const ToggleSection: React.FC<ToggleSectionProps> = ({ title, section, isOpen, onToggle, children }) => (
  <div>
    <div
      className={`toggle text-xl font-semibold text-gray-800 flex items-center gap-2 ${isOpen ? "active" : ""}`}
      onClick={() => onToggle(section)}
    >
      <span className="toggle-icon text-teal-500">▶</span> {title}
    </div>
    <div className={`toggle-content ${isOpen ? "active" : ""}`}>{children}</div>
  </div>
);

// ProjectCard component for better encapsulation
interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="project-card bg-white">
      <div className="project-image-container">
        <Image 
          src={project.image} 
          alt={project.altText} 
          fill 
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          loading="lazy"
        />
        <div className="project-overlay">
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="project-btn"
            aria-label={`Visit ${project.title} demo`}
          >
            <FaExternalLinkAlt /> Demo
          </a>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="project-btn"
              aria-label={`View ${project.title} code on GitHub`}
            >
              <FaCode /> Code
            </a>
          )}
        </div>
        {project.featured && (
          <div className="featured-badge">
            <FaStar /> Featured
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{project.title}</h3>
        <p className="text-gray-600 text-sm mb-3">{project.description}</p>
        <div className="flex flex-wrap gap-1 mb-3">
          {project.categories.map((category) => (
            <span key={category} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
              {category}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span key={tech} className="px-2 py-1 bg-teal-50 text-teal-700 text-xs rounded-md">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  // Initialize state on the client side only
  const [mounted, setMounted] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [projectSearchTerm, setProjectSearchTerm] = useState<string>("");

  // Execute after component mounts to prevent hydration issues
  useEffect(() => {
    setMounted(true);
    
    // Handle the back-to-top button visibility
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle search input with debounce
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);

  // Handle project search
  const handleProjectSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setProjectSearchTerm(e.target.value);
  }, []);

  // Apply debounce to search query updates
  const debouncedSetSearchQuery = useDebounce((value: string) => {
    setSearchQuery(value);
  }, 300);

  // Update the debounced search query when search term changes
  useEffect(() => {
    debouncedSetSearchQuery(searchTerm);
  }, [searchTerm, debouncedSetSearchQuery]);

  // Memoized filtered skills for better performance
  const filteredSkills = useMemo(() => {
    if (!searchQuery) return skills;
    
    return skills
      .map((skillGroup) => ({
        category: skillGroup.category,
        items: skillGroup.items.filter((skill) =>
          skill.toLowerCase().includes(searchQuery.toLowerCase())
        ),
      }))
      .filter((skillGroup) => skillGroup.items.length > 0);
  }, [searchQuery]);

  // Memoized filtered and sorted projects based on search and category
  const filteredProjects = useMemo(() => {
    let filtered = [...projects];
    
    // Filter by category first
    if (activeCategory !== "All") {
      filtered = filtered.filter(project => 
        project.categories.includes(activeCategory)
      );
    }
    
    // Then filter by search term if present
    if (projectSearchTerm) {
      const lowercaseSearch = projectSearchTerm.toLowerCase();
      filtered = filtered.filter(project => 
        project.title.toLowerCase().includes(lowercaseSearch) ||
        project.description.toLowerCase().includes(lowercaseSearch) ||
        project.techStack.some(tech => tech.toLowerCase().includes(lowercaseSearch))
      );
    }
    
    // Sort featured projects first
    return filtered.sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return 0;
    });
  }, [activeCategory, projectSearchTerm]);

  // Toggle section handler
  const toggleSection = useCallback((section: string) => {
    setOpenSection((prev) => (prev === section ? null : section));
  }, []);

  // Category filter handler
  const handleCategoryChange = useCallback((category: string) => {
    setActiveCategory(category);
  }, []);

  // Scroll to top handler
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Prevent rendering issues during SSR/hydration
  if (!mounted) {
    return null; // Return empty during SSR to prevent hydration mismatch
  }

  return (
    <div className="min-h-screen bg-[#F7F6F3] text-gray-800 px-6 py-8">
      <style jsx global>{notionStyles}</style>

      {/* Page Header */}
      <div className="max-w-5xl mx-auto mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Satyam Joshi</h1>
        <p className="text-lg text-gray-600">Architect of Cutting-Edge Digital Solutions</p>
        <div className="flex gap-4 mt-4 text-xl text-gray-500">
          <a href="https://github.com/Satyam-a-Developer" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile">
            <FaGithub className="hover:text-teal-500 transition-colors" />
          </a>
          <a href="https://x.com/Satyamjosh44160" target="_blank" rel="noopener noreferrer" aria-label="Twitter Profile">
            <FaTwitter className="hover:text-teal-500 transition-colors" />
          </a>
          <a href="https://linkedin.com/in/satyam-joshi-9b8266240/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile">
            <FaLinkedin className="hover:text-teal-500 transition-colors" />
          </a>
          <a href="mailto:satyamjoshi567@gmail.com" aria-label="Email Contact">
            <SiGmail className="hover:text-teal-500 transition-colors" />
          </a>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto space-y-6">
        {/* About Section */}
        <ToggleSection
          title="About Me"
          section="about"
          isOpen={openSection === "about"}
          onToggle={toggleSection}
        >
          <div className="notion-block">
            <div className="flex items-center gap-4">
              <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0">
                <Image 
                  src={profile} 
                  alt="Profile" 
                  width={96} 
                  height={96} 
                  className="object-cover"
                  priority
                />
              </div>
              <p className="text-gray-600">
                I'm Satyam Joshi, a Full Stack Developer and UI/UX enthusiast, dedicated to crafting seamless, innovative web solutions that push the boundaries of technology and design.
              </p>
            </div>
          </div>
          <div className="notion-block grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-800">Education:</span> B.Tech CS
            </div>
            <div>
              <span className="font-medium text-gray-800">State:</span> Gujarat
            </div>
            <div>
              <span className="font-medium text-gray-800">Location:</span> India
            </div>
          </div>
        </ToggleSection>

        {/* Skills Section with Search Bar */}
        <ToggleSection
          title="My Arsenal"
          section="skills"
          isOpen={openSection === "skills"}
          onToggle={toggleSection}
        >
          <div className="notion-block">
            <input
              type="text"
              placeholder="Search skills for your job..."
              onChange={handleSearchChange}
              value={searchTerm}
              className="search-bar mb-4"
            />
            {searchQuery && filteredSkills.length > 0 ? (
              <p className="text-gray-600 mb-2">
                Looking for these skills for your job:{" "}
                <span className="text-teal-500">
                  {filteredSkills.flatMap((group) => group.items).join(", ")}
                </span>
              </p>
            ) : searchQuery && filteredSkills.length === 0 ? (
              <p className="text-gray-600 mb-2">No matching skills found.</p>
            ) : null}
          </div>
          {filteredSkills.length > 0 ? (
            filteredSkills.map((skillGroup) => (
              <div key={skillGroup.category} className="notion-block">
                <h3 className="text-lg font-medium text-teal-500">{skillGroup.category}</h3>
                <ul className="list-disc pl-5 text-gray-600">
                  {skillGroup.items.map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
              </div>
            ))
          ) : (
            <div className="notion-block">
              <p className="text-gray-600">
                {searchQuery ? "No skills match your search." : "All skills are available. Start typing to filter!"}
              </p>
            </div>
          )}
        </ToggleSection>

        {/* Enhanced Projects Section */}
        <ToggleSection
          title="Project Showcase"
          section="projects"
          isOpen={openSection === "projects"}
          onToggle={toggleSection}
        >
          {/* Projects Filter & Search Bar */}
          <div className="notion-block mb-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <div className="flex flex-wrap gap-2">
                {projectCategories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={`category-chip ${activeCategory === category ? 'active' : ''}`}
                  >
                    {category}
                  </button>
                ))}
              </div>
              <div className="relative w-full md:w-64">
                <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={projectSearchTerm}
                  onChange={handleProjectSearchChange}
                  className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>
            
            {filteredProjects.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">No projects match your criteria. Try adjusting your filters.</p>
              </div>
            )}
          </div>
          
          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </ToggleSection>

        {/* Contact Section */}
        <ToggleSection
          title="Let's Collaborate"
          section="contact"
          isOpen={openSection === "contact"}
          onToggle={toggleSection}
        >
          <div className="notion-block">
            <form action="https://formsubmit.co/satyampannaballer@gmail.com" method="POST" className="space-y-4">
              <input type="hidden" name="_captcha" value="false" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  className="p-2 rounded-md bg-gray-100 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="p-2 rounded-md bg-gray-100 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                />
              </div>
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                className="w-full p-2 rounded-md bg-gray-100 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                required
              />
              <textarea
                name="message"
                rows={3}
                placeholder="Your Message"
                className="w-full p-2 rounded-md bg-gray-100 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                required
              />
              <button
                type="submit"
                className="w-full py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </ToggleSection>
      </div>

      {/* Footer */}
      <div className="max-w-5xl mx-auto mt-12 text-center text-gray-500">
        <p>© 2025 Satyam Joshi. Crafted with Code & Creativity.</p>
      </div>

      {/* Back to Top */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-teal-500 text-white p-2 rounded-full shadow-md hover:bg-teal-600 transition-colors"
          aria-label="Back to top"
        >
          <FaArrowUp />
        </button>
      )}
    </div>
  );
}