"use client";
import { useRef, useEffect, useState, useMemo, useCallback } from "react";
import { FaTwitter, FaGithub, FaLinkedin, FaArrowUp, FaExternalLinkAlt, FaCode, FaStar } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { MdSearch } from "react-icons/md";
// import { GiToyBrick } from "react-icons/gi";
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

// LEGO color palette
const legoColors = {
  red: "#D01012",
  blue: "#0D69AB",
  yellow: "#FFD500",
  green: "#00AF4D",
  black: "#05131D",
  darkGray: "#6D6E71",
  lightGray: "#E6E6E6",
  orange: "#FE8A18",
  purple: "#81007B",
};

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

// LEGO-themed styles
const legoStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;600;700&display=swap');
  
  body {
    font-family: 'Rubik', sans-serif;
    line-height: 1.6;
    background-color: #F8F9FA;
    background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23e1e1e1' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  }
  
  /* LEGO Studs Effect */
  .lego-studs {
    position: relative;
  }
  
  .lego-studs::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 8px;
    background: repeating-linear-gradient(90deg, rgba(0,0,0,0.1), rgba(0,0,0,0.1) 10px, transparent 10px, transparent 20px);
    border-radius: 4px 4px 0 0;
  }
  
  /* LEGO Brick Style */
  .lego-brick {
    position: relative;
    border-radius: 8px;
    box-shadow: 
      inset 0 -3px 0 rgba(0,0,0,0.2),
      0 8px 10px rgba(0,0,0,0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    overflow: visible;
  }
  
  .lego-brick::after {
    content: "";
    position: absolute;
    top: -6px;
    left: 10px;
    right: 10px;
    height: 6px;
    display: flex;
    justify-content: space-around;
    background: repeating-linear-gradient(90deg, 
      currentColor 0px, 
      currentColor 12px, 
      transparent 12px, 
      transparent 24px);
    border-radius: 3px 3px 0 0;
    opacity: 0.7;
  }
  
  .lego-brick:hover {
    transform: translateY(-5px);
    box-shadow: 
      inset 0 -3px 0 rgba(0,0,0,0.2),
      0 14px 20px rgba(0,0,0,0.15);
  }
  
  .lego-input {
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    padding: 10px 16px;
    font-family: 'Rubik', sans-serif;
    box-shadow: 
      inset 0 -3px 0 rgba(0,0,0,0.1),
      0 2px 4px rgba(0,0,0,0.05);
    transition: all 0.2s ease;
  }
  
  .lego-input:focus {
    border-color: ${legoColors.blue};
    box-shadow: 
      inset 0 -3px 0 rgba(13, 105, 171, 0.3),
      0 2px 4px rgba(0,0,0,0.05);
    outline: none;
  }
  
  .lego-btn {
    font-weight: 600;
    border-radius: 8px;
    box-shadow: 
      inset 0 -4px 0 rgba(0,0,0,0.2),
      0 4px 6px rgba(0,0,0,0.1);
    transition: all 0.2s ease;
    position: relative;
    overflow: hidden;
  }
  
  .lego-btn:hover {
    transform: translateY(-2px);
    box-shadow: 
      inset 0 -4px 0 rgba(0,0,0,0.2),
      0 8px 10px rgba(0,0,0,0.1);
  }
  
  .lego-btn:active {
    transform: translateY(2px);
    box-shadow: 
      inset 0 -2px 0 rgba(0,0,0,0.2),
      0 2px 3px rgba(0,0,0,0.1);
  }
  
  .lego-toggle {
    cursor: pointer;
    transition: all 0.3s ease;
    border-radius: 8px;
    background: linear-gradient(to bottom, #ffffff, #f0f0f0);
    box-shadow: 
      inset 0 -3px 0 rgba(0,0,0,0.1),
      0 2px 4px rgba(0,0,0,0.05);
  }
  
  .lego-toggle:hover {
    background: linear-gradient(to bottom, #f8f8f8, #e8e8e8);
  }
  
  .lego-toggle.active {
    background: linear-gradient(to bottom, #e8e8e8, #d8d8d8);
    box-shadow: 
      inset 0 2px 3px rgba(0,0,0,0.1),
      0 1px 2px rgba(0,0,0,0.05);
  }
  
  .lego-toggle-content {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.5s cubic-bezier(0, 1, 0, 1);
  }
  
  .lego-toggle-content.active {
    max-height: 5000px;
    transition: max-height 1s ease-in-out;
  }
  
  .lego-stud {
    display: inline-block;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: currentColor;
    box-shadow: inset 0 -2px 0 rgba(0,0,0,0.2);
    margin-right: 5px;
    position: relative;
    top: 2px;
  }
  
  .category-chip {
    display: inline-block;
    padding: 6px 14px;
    border-radius: 20px;
    font-size: 14px;
    font-weight: 600;
    margin-right: 8px;
    margin-bottom: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 
      inset 0 -2px 0 rgba(0,0,0,0.1),
      0 2px 4px rgba(0,0,0,0.05);
  }
  
  .category-chip:hover {
    transform: translateY(-2px);
    box-shadow: 
      inset 0 -2px 0 rgba(0,0,0,0.1),
      0 4px 8px rgba(0,0,0,0.1);
  }
  
  .category-chip.active {
    background: ${legoColors.blue};
    color: white;
    box-shadow: 
      inset 0 -2px 0 rgba(0,0,0,0.2),
      0 4px 8px rgba(13, 105, 171, 0.3);
  }
  
  .lego-profile {
    border: 6px solid white;
    box-shadow: 
      inset 0 0 0 2px ${legoColors.yellow},
      0 10px 20px rgba(0,0,0,0.15);
  }
  
  /* Animation for stud appearance */
  @keyframes studsAppear {
    0% { opacity: 0; transform: translateY(-10px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  
  .stud-animation > * {
    animation: studsAppear 0.5s ease forwards;
  }
  
  .stud-animation > *:nth-child(1) { animation-delay: 0.05s; }
  .stud-animation > *:nth-child(2) { animation-delay: 0.1s; }
  .stud-animation > *:nth-child(3) { animation-delay: 0.15s; }
  .stud-animation > *:nth-child(4) { animation-delay: 0.2s; }
  .stud-animation > *:nth-child(5) { animation-delay: 0.25s; }
  .stud-animation > *:nth-child(6) { animation-delay: 0.3s; }
`;

// Optimized debounce utility with useCallback
function useDebounce<T extends (arg: string) => void>(callback: T, delay: number) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  return useCallback((arg: Parameters<T>[0]) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      callback(arg);
      timeoutRef.current = null;
    }, delay);
  }, [callback, delay]);
}

// Reusable ToggleSection component with LEGO theme
interface ToggleSectionProps {
  title: string;
  section: string;
  isOpen: boolean;
  onToggle: (section: string) => void;
  children: React.ReactNode;
  color: string;
  icon?: React.ReactNode;
}

const ToggleSection: React.FC<ToggleSectionProps> = ({ 
  title, 
  section, 
  isOpen, 
  onToggle, 
  children, 
  color,
  icon 
}) => (
  <div className="mb-8">
    <div
      className={`lego-toggle p-4 flex items-center gap-3 text-xl font-bold ${isOpen ? "active" : ""}`}
      onClick={() => onToggle(section)}
      style={{ color: color }}
    >
      <div className="flex items-center justify-center w-8 h-8 bg-white rounded-full shadow">
        {icon }
      </div>
      <span className="toggle-icon transform transition-transform duration-300" style={{ 
        transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)' 
      }}>▶</span> 
      {title}
    </div>
    <div className={`lego-toggle-content ${isOpen ? "active" : ""} pt-4`}>
      {children}
    </div>
  </div>
);

// ProjectCard component with LEGO design
interface ProjectCardProps {
  project: Project;
  color: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, color }) => {
  return (
    <div 
      className="lego-brick bg-white"
      style={{ color: color }}
    >
      <div className="relative overflow-hidden rounded-t-lg h-48">
        <Image 
          src={project.image} 
          alt={project.altText} 
          fill 
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 flex items-end justify-between p-4 opacity-0 hover:opacity-100 transition-opacity duration-300">
          <div className="flex gap-2">
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="lego-btn bg-white text-gray-800 px-3 py-2 flex items-center gap-1 text-sm"
              aria-label={`Visit ${project.title} demo`}
            >
              <FaExternalLinkAlt /> Demo
            </a>
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="lego-btn bg-white text-gray-800 px-3 py-2 flex items-center gap-1 text-sm"
                aria-label={`View ${project.title} code on GitHub`}
              >
                <FaCode /> Code
              </a>
            )}
          </div>
        </div>
        {project.featured && (
          <div className="absolute top-3 right-3 bg-yellow-400 text-black font-bold px-3 py-1 rounded-lg flex items-center gap-1 text-sm transform -rotate-3 shadow-lg">
            <FaStar /> Featured
          </div>
        )}
      </div>
      <div className="p-5">
        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
        <p className="text-gray-600 text-sm mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-1 mb-4">
          {project.categories.map((category) => (
            <span key={category} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded font-medium">
              {category}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span 
              key={tech} 
              className="px-3 py-1 text-white text-xs rounded-md font-medium shadow-sm"
              style={{ backgroundColor: color, opacity: 0.9 }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

// LEGO stud component for visual elements
const LegoStud: React.FC<{ color?: string; size?: string }> = ({ color = legoColors.blue, size = "normal" }) => {
  const sizeClasses = {
    small: "w-4 h-4",
    normal: "w-6 h-6",
    large: "w-8 h-8",
  };
  
  return (
    <div 
      className={`rounded-full shadow-inner ${sizeClasses[size as keyof typeof sizeClasses] || sizeClasses.normal}`}
      style={{ 
        backgroundColor: color,
        boxShadow: `inset 0 -2px 0 rgba(0,0,0,0.2), 0 1px 2px rgba(0,0,0,0.1)`
      }}
    ></div>
  );
};

export default function Home() {
  // Initialize state on the client side only
  const [mounted, setMounted] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>("about"); // Open About section by default
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [projectSearchTerm, setProjectSearchTerm] = useState<string>("");
  const [showNavigation, setShowNavigation] = useState(false);

  // Color mapping for sections and projects
  const sectionColors = {
    about: legoColors.blue,
    skills: legoColors.green,
    projects: legoColors.red,
    contact: legoColors.yellow,
  };
  
  // Project color mapping (alternate colors)
  const getProjectColor = (index: number) => {
    const colors = [legoColors.blue, legoColors.red, legoColors.green, legoColors.yellow, legoColors.orange, legoColors.purple];
    return colors[index % colors.length];
  };

  // Execute after component mounts to prevent hydration issues
  useEffect(() => {
    setMounted(true);
    
    // Handle the back-to-top button visibility
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
      setShowNavigation(window.scrollY > 100);
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

  // Navigation links
  const navLinks = [
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ];

  // Scroll to section
  const scrollToSection = (sectionId: string) => {
    setOpenSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  // Prevent rendering issues during SSR/hydration
  if (!mounted) {
    return null; // Return empty during SSR to prevent hydration mismatch
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <style jsx global>{legoStyles}</style>

      {/* Fixed Navigation Bar */}
      <header className={`fixed w-full z-50 transition-all duration-300 ${showNavigation ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="font-bold text-xl">SJ</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`font-medium transition-colors hover:text-blue-600 ${openSection === link.id ? 'text-blue-600' : 'text-gray-600'}`}
              >
                {link.label}
              </button>
            ))}
          </nav>
          
          <div className="flex gap-4 text-xl">
            <a href="https://github.com/Satyam-a-Developer" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile" className="text-gray-600 hover:text-blue-600 transition-colors">
              <FaGithub />
            </a>
            <a href="https://linkedin.com/in/satyam-joshi-9b8266240/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile" className="text-gray-600 hover:text-blue-600 transition-colors">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section with LEGO Theme */}
      <div className="pt-24 pb-16 bg-gradient-to-br from-blue-50 to-yellow-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-48 h-48 rounded-full overflow-hidden border-8 border-white shadow-xl lego-profile">
              <Image 
                src={profile} 
                alt="Profile" 
                width={160} 
                height={160} 
                className="object-cover"
                priority
              />
            </div>
            
            <div className="text-center md:text-left">
              <h1 className="text-5xl font-extrabold mb-4 relative">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-600">
                  Satyam Joshi
                </span>
                <div className="absolute -top-6 -right-6 transform rotate-12 hidden md:block">
                  <LegoStud color={legoColors.yellow} size="large" />
                </div>
              </h1>
              
              <p className="text-xl text-gray-600 mb-6">Building digital experiences, brick by brick</p>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <a 
                  href="mailto:satyamjoshi567@gmail.com"
                  className="lego-btn bg-blue-600 text-white px-6 py-3 flex items-center gap-2"
                >
                  <SiGmail /> Contact Me
                </a>
                <a 
                  href="https://github.com/Satyam-a-Developer"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="lego-btn bg-gray-800 text-white px-6 py-3 flex items-center gap-2"
                >
                  <FaGithub /> GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Colorful LEGO Separator */}
      <div className="flex h-4">
        <div className="w-1/4 bg-blue-600"></div>
        <div className="w-1/4 bg-red-600"></div>
        <div className="w-1/4 bg-yellow-500"></div>
        <div className="w-1/4 bg-green-600"></div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
     {/* About Section */}
        <section id="about">
          <ToggleSection
            title="About Me"
            section="about"
            isOpen={openSection === "about"}
            onToggle={toggleSection}
            color={sectionColors.about}
            icon={<FaGithub />}
          >
            <div className="lego-brick p-6 bg-white" style={{ color: sectionColors.about }}>
              <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                <div className="w-full md:w-1/3 flex flex-col items-center">
                  <div className="relative">
                    <div className="w-40 h-40 rounded-lg overflow-hidden border-4 border-white shadow-lg">
                      <Image 
                        src={profile} 
                        alt="Profile" 
                        width={160} 
                        height={160} 
                        className="object-cover"
                      />
                    </div>
                    
                    {/* LEGO decorations */}
                    <div className="absolute -bottom-4 -left-4 z-10">
                      <LegoStud color={legoColors.blue} />
                    </div>
                    <div className="absolute -top-4 -right-4 z-10">
                      <LegoStud color={legoColors.red} />
                    </div>
                  </div>
                  
                  <div className="mt-8 grid grid-cols-2 gap-4 w-full">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <span className="font-bold block">Education</span>
                      <span className="text-sm">B.Tech CS</span>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <span className="font-bold block">State</span>
                      <span className="text-sm">Gujarat</span>
                    </div>
                    <div className="text-center p-3 bg-yellow-50 rounded-lg">
                      <span className="font-bold block">Location</span>
                      <span className="text-sm">India</span>
                    </div>
                    <div className="text-center p-3 bg-red-50 rounded-lg">
                      <span className="font-bold block">Experience</span>
                      <span className="text-sm">3+ Years</span>
                    </div>
                  </div>
                </div>
                
                <div className="w-full md:w-2/3">
                  <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <LegoStud color={sectionColors.about} size="small" />
                    Who Am I?
                  </h3>
                  
                  <div className="space-y-4 text-gray-700">
                    <p className="leading-relaxed">
                      I&apos;m <strong>Satyam Joshi</strong>, a Full Stack Developer and UI/UX enthusiast with a passion for creating exceptional digital experiences. Think of me as a LEGO Master Builder, but for the web - I connect the right pieces to build robust, scalable, and beautiful solutions.
                    </p>
                    
                    <p className="leading-relaxed">
                      With a strong foundation in both frontend and backend technologies, I specialize in crafting seamless, innovative applications that push the boundaries of design and functionality. Whether it&apos;s building interactive dashboards, optimizing performance, or implementing complex features, I approach each project with creativity and technical precision.
                    </p>
                    
                    <p className="leading-relaxed">
                      Outside of coding, I&apos;m an avid learner, always exploring new technologies and methodologies to expand my skillset and stay ahead of industry trends.
                    </p>
                  </div>
                  
                  <div className="mt-6 flex flex-wrap gap-3">
                    <div className="bg-white border-2 border-blue-100 rounded-full px-4 py-1 font-medium text-blue-800 text-sm flex items-center gap-1">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      Problem Solver
                    </div>
                    <div className="bg-white border-2 border-yellow-100 rounded-full px-4 py-1 font-medium text-yellow-800 text-sm flex items-center gap-1">
                      <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                      Creative Thinker
                    </div>
                    <div className="bg-white border-2 border-green-100 rounded-full px-4 py-1 font-medium text-green-800 text-sm flex items-center gap-1">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      Detail Oriented
                    </div>
                    <div className="bg-white border-2 border-red-100 rounded-full px-4 py-1 font-medium text-red-800 text-sm flex items-center gap-1">
                      <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                      Team Player
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ToggleSection>
        </section>

        {/* Skills Section with LEGO theme */}
        <section id="skills">
          <ToggleSection
            title="My Arsenal"
            section="skills"
            isOpen={openSection === "skills"}
            onToggle={toggleSection}
            color={sectionColors.skills}
          >
            <div className="lego-brick p-6 bg-white" style={{ color: sectionColors.skills }}>
              <div className="flex flex-col md:flex-row gap-8">
                <div className="w-full md:w-1/3">
                  <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <LegoStud color={sectionColors.skills} size="small" />
                    Build with Me
                  </h3>
                  
                  <p className="text-gray-700 mb-6">
                    Like master LEGO builders who know just which brick to use, I&apos;ve mastered these tools and technologies to build exceptional digital products.
                  </p>
                  
                  <div className="relative mb-6">
                    <input
                      type="text"
                      placeholder="Search skills..."
                      onChange={handleSearchChange}
                      value={searchTerm}
                      className="lego-input w-full"
                    />
                    <MdSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                  </div>
                  
                  {searchQuery && filteredSkills.length > 0 ? (
                    <div className="p-4 bg-green-50 rounded-lg border border-green-100 mb-6">
                      <p className="text-green-800">
                        Looking for these skills?{" "}
                        <span className="font-bold">
                          {filteredSkills.flatMap((group) => group.items).join(", ")}
                        </span>
                      </p>
                    </div>
                  ) : searchQuery && filteredSkills.length === 0 ? (
                    <div className="p-4 bg-red-50 rounded-lg border border-red-100 mb-6">
                      <p className="text-red-800">No matching skills found.</p>
                    </div>
                  ) : null}
                </div>
                
                <div className="w-full md:w-2/3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 stud-animation">
                    {filteredSkills.map((skillGroup) => (
                      <div 
                        key={skillGroup.category} 
                        className="p-4 rounded-lg relative overflow-hidden"
                        style={{ 
                          backgroundColor: skillGroup.category === "Frontend" ? "#e6f7ff" : 
                                           skillGroup.category === "Backend" ? "#e6ffe6" : "#fff5e6" 
                        }}
                      >
                        <div className="flex items-center gap-2 mb-4">
                          <LegoStud 
                            color={skillGroup.category === "Frontend" ? legoColors.blue : 
                                   skillGroup.category === "Backend" ? legoColors.green : legoColors.yellow} 
                          />
                          <h3 className="text-lg font-bold">{skillGroup.category}</h3>
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                          {skillGroup.items.map((skill) => (
                            <span 
                              key={skill} 
                              className="px-3 py-2 bg-white rounded-lg shadow-sm font-medium text-sm flex items-center gap-1"
                            >
                              <span 
                                className="w-2 h-2 rounded-full"
                                style={{ 
                                  backgroundColor: skillGroup.category === "Frontend" ? legoColors.blue : 
                                                  skillGroup.category === "Backend" ? legoColors.green : legoColors.yellow 
                                }}
                              ></span>
                              {skill}
                            </span>
                          ))}
                        </div>
                        
                        {/* Decorative LEGO studs */}
                        <div className="absolute -bottom-2 -right-2 opacity-10">
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </ToggleSection>
        </section>

        {/* Projects Section with LEGO theme */}
        <section id="projects">
          <ToggleSection
            title="Project Showcase"
            section="projects"
            isOpen={openSection === "projects"}
            onToggle={toggleSection}
            color={sectionColors.projects}
            icon={<FaCode />}
          >
            <div className="lego-brick p-6 bg-white mb-6" style={{ color: sectionColors.projects }}>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
                    <LegoStud color={sectionColors.projects} size="small" />
                    My Builds
                  </h3>
                  <p className="text-gray-600">
                    Each project is a unique creation, built brick by brick with passion and expertise.
                  </p>
                </div>
                
                <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                  <div className="relative flex-grow md:w-64">
                    <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search projects..."
                      value={projectSearchTerm}
                      onChange={handleProjectSearchChange}
                      className="lego-input pl-10 w-full"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Project Categories */}
            <div className="flex flex-wrap gap-2 mb-6">
              {projectCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`category-chip ${activeCategory === category ? 'active' : ''}`}
                  style={{
                    backgroundColor: activeCategory === category ? sectionColors.projects : '#f0f0f0',
                    color: activeCategory === category ? 'white' : '#333'
                  }}
                >
                  {category}
                </button>
              ))}
            </div>
            
            {/* Projects Grid */}
            {filteredProjects.length === 0 ? (
              <div className="lego-brick flex flex-col items-center justify-center p-12 bg-white text-center">
                <p className="text-gray-500 text-lg">No projects match your criteria.</p>
                <p className="text-gray-400">Try adjusting your filters or search terms.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stud-animation">
                {filteredProjects.map((project, index) => (
                  <ProjectCard 
                    key={project.id} 
                    project={project} 
                    color={getProjectColor(index)}
                  />
                ))}
              </div>
            )}
          </ToggleSection>
        </section>

        {/* Contact Section with LEGO theme */}
        <section id="contact">
          <ToggleSection
            title="Let's Collaborate"
            section="contact"
            isOpen={openSection === "contact"}
            onToggle={toggleSection}
            color={sectionColors.contact}
            icon={<SiGmail />}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="lego-brick p-6 bg-white" style={{ color: sectionColors.contact }}>
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <LegoStud color={sectionColors.contact} size="small" />
                  Send Me a Message
                </h3>
                
                <form action="https://formsubmit.co/satyampannaballer@gmail.com" method="POST" className="space-y-4">
                  <input type="hidden" name="_captcha" value="false" />
                  
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">Your Name</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="John Doe"
                      className="lego-input w-full"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="john@example.com"
                      className="lego-input w-full"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      placeholder="Project Inquiry"
                      className="lego-input w-full"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">Your Message</label>
                    <textarea
                      name="message"
                      rows={4}
                      placeholder="Tell me about your project..."
                      className="lego-input w-full"
                      required
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="lego-btn w-full py-3 text-lg font-bold text-white"
                    style={{ backgroundColor: sectionColors.contact }}
                  >
                    Send Message
                  </button>
                </form>
              </div>
              
              <div className="lego-brick p-6 bg-white" style={{ color: sectionColors.contact }}>
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <LegoStud color={sectionColors.contact} size="small" />
                  Connect With Me
                </h3>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4 p-4 bg-yellow-50 rounded-lg">
                    <div className="p-3 bg-yellow-100 rounded-full">
                      <SiGmail className="text-yellow-600 text-xl" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">Email</h4>
                      <a href="mailto:satyamjoshi567@gmail.com" className="text-blue-600 hover:underline">
                        satyamjoshi567@gmail.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg">
                    <div className="p-3 bg-blue-100 rounded-full">
                      <FaLinkedin className="text-blue-600 text-xl" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">LinkedIn</h4>
                      <a 
                        href="https://linkedin.com/in/satyam-joshi-9b8266240/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        Satyam Joshi
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="p-3 bg-gray-200 rounded-full">
                      <FaGithub className="text-gray-700 text-xl" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">GitHub</h4>
                      <a 
                        href="https://github.com/Satyam-a-Developer" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        Satyam-a-Developer
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg">
                    <div className="p-3 bg-blue-100 rounded-full">
                      <FaTwitter className="text-blue-500 text-xl" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">Twitter</h4>
                      <a 
                        href="https://x.com/Satyamjosh44160" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        @Satyamjosh44160
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ToggleSection>
        </section>
      </div>

      {/* LEGO Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <span className="font-bold text-2xl">Satyam Joshi</span>
            </div>
            
            <div className="flex gap-6 text-2xl">
              <a href="https://github.com/Satyam-a-Developer" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile" className="text-gray-300 hover:text-yellow-500 transition-colors">
                <FaGithub />
              </a>
              <a href="https://x.com/Satyamjosh44160" target="_blank" rel="noopener noreferrer" aria-label="Twitter Profile" className="text-gray-300 hover:text-yellow-500 transition-colors">
                <FaTwitter />
              </a>
              <a href="https://linkedin.com/in/satyam-joshi-9b8266240/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile" className="text-gray-300 hover:text-yellow-500 transition-colors">
                <FaLinkedin />
              </a>
              <a href="mailto:satyamjoshi567@gmail.com" aria-label="Email Contact" className="text-gray-300 hover:text-yellow-500 transition-colors">
                <SiGmail />
              </a>
            </div>
          </div>
          
          <div className="h-4 flex mb-6">
            <div className="w-1/4 bg-blue-600"></div>
            <div className="w-1/4 bg-red-600"></div>
            <div className="w-1/4 bg-yellow-500"></div>
            <div className="w-1/4 bg-green-600"></div>
          </div>
          
          <div className="text-center">
            <p className="text-gray-400">© 2025 Satyam Joshi. Built with creativity, block by block.</p>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="lego-btn fixed bottom-6 right-6 bg-yellow-500 text-black p-3 rounded-full"
          aria-label="Back to top"
        >
          <FaArrowUp />
        </button>
      )}
    </div>
  );
}