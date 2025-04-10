"use client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin";
import { useRef, useEffect, useState } from "react";
import { FaTwitter, FaGithub, FaLinkedin, FaArrowUp } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import Image from "next/image";
import { StaticImageData } from "next/image";
import dsasorting from "../public/dsasorting.png";
import excel from "../public/excel.png";
import notes from "../public/Notes.png";
import financeGo from "../public/FinanceGo.png";
import gamble from "../public/gamble.png";
import crypto from "../public/Crypto-exchange.png";
import profile from "../public/profile.jpeg";
import kittyWalking from "../public/kitty-walking.gif";

// Project interface
interface Project {
  id: number;
  title: string;
  description: string;
  image: StaticImageData;
  link: string;
  github?: string;
  altText: string;
  techStack: string[];
  isReversed?: boolean;
}

// Skills data
const skills = [
  { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "GSAP", "Redux"] },
  { category: "Backend", items: ["Node.js", "Express", "MongoDB", "Supabase"] },
  { category: "Tools", items: ["Git", "Figma", "VS Code", "Vercel", "Docker"] },
];

// Projects array
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
    isReversed: false,
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
    isReversed: true,
  },
  {
    id: 3,
    title: "Crypto-exchange",
    description: "Gateway for your cryptocurrency investments.",
    image: crypto,
    link: "https://crypto-exchange-plum.vercel.app/",
    github: "https://github.com/Satyam-a-Developer/crypto-exchange",
    altText: "Crypto Interface",
    techStack: ["Next.js", "CSS", "CoinDCX-API"],
    isReversed: false,
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
    isReversed: true,
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
    isReversed: false,
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
    isReversed: true,
  },
];

// Updated Kitty Cursor Styles
const cursorKittyStyles = `
  .cursor-kitty {
    position: fixed;
    width: 70px;
    height: 70px;
    pointer-events: none;
    z-index: 9999;
    transition: transform 0.2s ease;
  }
  .cursor-kitty.walking {
    animation: kittyWalk 0.3s steps(4) infinite;
  }
  .cursor-kitty:hover {
    transform: scale(1.2) rotate(10deg);
  }
  @keyframes kittyWalk {
    0% { background-position: 0 0; }
    100% { background-position: -280px 0; }
  }
`;

export default function Home() {
  const [isKittyWalking, setIsKittyWalking] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [showBackToTop, setShowBackToTop] = useState(false);
  const kittyRef = useRef<HTMLImageElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);
  const aboutRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    // Scroll-based active section and back-to-top button
    const sections = ["home", "about", "projects", "skills", "contact"];
    ScrollTrigger.create({
      onUpdate: () => {
        const scrollY = window.scrollY;
        setShowBackToTop(scrollY > 300);
        sections.forEach((section) => {
          const element = document.getElementById(section);
          if (element) {
            const { top, bottom } = element.getBoundingClientRect();
            if (top <= 100 && bottom >= 100) setActiveSection(section);
          }
        });
      },
    });

    // Kitty cursor logic
    const kitty = kittyRef.current;
    let targetX = 0,
      targetY = 0,
      currentX = 0,
      currentY = 0,
      prevX = 0;
    let isAnimating = false;

    const updateKittyPosition = () => {
      currentX += (targetX - currentX) * 0.1;
      currentY += (targetY - currentY) * 0.1;
      if (kitty) {
        kitty.style.left = `${currentX}px`;
        kitty.style.top = `${currentY}px`;
        kitty.style.transform = targetX < prevX ? "scaleX(-1)" : "scaleX(1)";
        prevX = targetX;
        setIsKittyWalking(
          Math.abs(targetX - currentX) > 1 || Math.abs(targetY - currentY) > 1
        );
        if (
          Math.abs(targetX - currentX) > 0.5 ||
          Math.abs(targetY - currentY) > 0.5
        ) {
          requestAnimationFrame(updateKittyPosition);
        } else {
          isAnimating = false;
        }
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX - 35;
      targetY = e.clientY - 35;
      if (!isAnimating) {
        isAnimating = true;
        requestAnimationFrame(updateKittyPosition);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const scrollToSection = (id: string) => {
    gsap.to(window, {
      duration: 1.2,
      scrollTo: { y: `#${id}`, offsetY: 50 },
      ease: "power4.inOut",
    });
    setActiveSection(id);
  };

  const scrollToTop = () => {
    gsap.to(window, {
      duration: 1.2,
      scrollTo: { y: 0 },
      ease: "power4.inOut",
    });
    setActiveSection("home");
  };

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !projectRefs.current.includes(el)) projectRefs.current.push(el);
  };

  const renderProject = (project: Project) => (
    <div
      key={project.id}
      ref={addToRefs}
      className={`project-card relative flex flex-col lg:flex-row ${
        project.isReversed ? "lg:flex-row-reverse" : ""
      } items-center gap-12 p-10 rounded-3xl bg-opacity-80 backdrop-blur-lg hover:shadow-2xl transition-all duration-700`}
      style={{ background: "rgba(30, 30, 40, 0.9)" }}
    >
      <div className="relative w-full lg:w-[550px] h-[350px] group project-image rounded-2xl overflow-hidden shadow-xl transform transition-transform duration-500 hover:rotate-2">
        <Image src={project.image} alt={project.altText} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/50 to-teal-500/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center gap-6">
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-teal-600 px-6 py-2 rounded-full font-bold hover:bg-teal-600 hover:text-white transition-all duration-300"
          >
            Live Demo
          </a>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-purple-600 px-6 py-2 rounded-full font-bold hover:bg-purple-600 hover:text-white transition-all duration-300"
            >
              View Code
            </a>
          )}
        </div>
      </div>
      <div className="flex-1 space-y-6">
        <h2 className="text-4xl font-extrabold text-white">{project.title}</h2>
        <p className="text-lg leading-relaxed text-gray-300">{project.description}</p>
        <div className="flex flex-wrap gap-4">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="px-5 py-2 bg-gradient-to-r from-teal-400 to-purple-500 text-white rounded-full text-sm font-semibold shadow-md"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      {/* Kitty Cursor */}
      <Image
        ref={kittyRef}
        src={kittyWalking}
        width={70}
        height={70}
        alt="Cursor kitty"
        className={`cursor-kitty ${isKittyWalking ? "walking" : ""}`}
        unoptimized
      />
      <style jsx global>{cursorKittyStyles}</style>

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-gray-800/90 backdrop-blur-lg z-40 py-5 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <a
            href="#"
            className="text-3xl font-extrabold bg-gradient-to-r from-teal-400 to-purple-500 bg-clip-text text-transparent"
          >
            Satyam Joshi
          </a>
          <div className="hidden md:flex space-x-12">
            {["home", "about", "projects", "skills", "contact"].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className={`text-lg font-semibold ${
                  activeSection === item
                    ? "text-teal-400"
                    : "text-gray-300 hover:text-teal-400"
                } transition-all duration-300`}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden bg-gray-800/90 backdrop-blur-lg z-50 shadow-[0_-4px_15px_rgba(0,0,0,0.1)]">
        <div className="flex justify-around py-4">
          {["home", "about", "projects", "skills", "contact"].map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item)}
              className={`flex flex-col items-center ${
                activeSection === item ? "text-teal-400" : "text-gray-300"
              } transition-colors duration-300`}
            >
              {item === "home" && (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
              )}
              {item === "about" && (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              )}
              {item === "projects" && (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              )}
              {item === "skills" && (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              )}
              {item === "contact" && (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              )}
              <span className="text-sm mt-1 capitalize">{item}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Header */}
      <header
        id="home"
        ref={headerRef}
        className="pt-40 pb-32 text-center bg-gradient-to-br from-teal-600 via-purple-700 to-gray-900"
      >
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-6xl md:text-8xl font-extrabold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-teal-200 to-white animate-pulse">
            Satyam Joshi
          </h1>
          <p className="text-2xl md:text-3xl text-gray-200 font-light max-w-3xl mx-auto">
            Architect of <span className="font-bold text-teal-300">Cutting-Edge</span> Digital Solutions
          </p>
          <div className="flex justify-center gap-10 mt-12 text-4xl text-gray-200">
            <a href="https://github.com/Satyam-a-Developer" target="_blank" rel="noopener noreferrer">
              <FaGithub className="hover:text-teal-300 hover:scale-125 transition-all duration-300" />
            </a>
            <a href="https://x.com/Satyamjosh44160" target="_blank" rel="noopener noreferrer">
              <FaTwitter className="hover:text-teal-300 hover:scale-125 transition-all duration-300" />
            </a>
            <a href="https://linkedin.com/in/satyam-joshi-9b8266240/" target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="hover:text-teal-300 hover:scale-125 transition-all duration-300" />
            </a>
            <a href="mailto:satyamjoshi567@gmail.com">
              <SiGmail className="hover:text-teal-300 hover:scale-125 transition-all duration-300" />
            </a>
          </div>
          <div className="mt-12 space-x-6">
            <button
              onClick={() => scrollToSection("projects")}
              className="bg-gradient-to-r from-teal-500 to-purple-600 text-white font-bold py-3 px-10 rounded-full hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Discover Projects
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="border-2 border-teal-300 text-teal-300 font-bold py-3 px-10 rounded-full hover:bg-teal-300 hover:text-gray-900 transition-all duration-300"
            >
              Connect With Me
            </button>
          </div>
        </div>
      </header>

      {/* About */}
      <section id="about" ref={aboutRef} className="py-28 bg-gray-800">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row gap-16 items-center">
          <div className="relative w-80 h-80 rounded-3xl overflow-hidden shadow-2xl transform hover:rotate-3 transition-transform duration-500">
            <Image src={profile} alt="Profile" fill className="object-cover" />
          </div>
          <div className="space-y-6">
            <h2 className="text-5xl font-extrabold bg-gradient-to-r from-teal-400 to-purple-500 bg-clip-text text-transparent">
              About Me
            </h2>
            <p className="text-xl leading-relaxed text-gray-300">
              I’m Satyam Joshi, a Full Stack Developer and UI/UX enthusiast, dedicated to crafting seamless, innovative web solutions that push the boundaries of technology and design.
            </p>
            <div className="grid grid-cols-3 gap-6">
              <div className="p-4 rounded-xl bg-gray-700/50">
                <h4 className="font-bold text-teal-300">Education</h4>
                <p className="text-gray-400">B.Tech CS</p>
              </div>
              <div className="p-4 rounded-xl bg-gray-700/50">
                <h4 className="font-bold text-teal-300">State</h4>
                <p className="text-gray-400">Gujarat</p>
              </div>
              <div className="p-4 rounded-xl bg-gray-700/50">
                <h4 className="font-bold text-teal-300">Location</h4>
                <p className="text-gray-400">India</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section
        id="skills"
        ref={skillsRef}
        className="py-28 bg-gradient-to-b from-gray-800 to-gray-900"
      >
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-5xl font-extrabold text-center bg-gradient-to-r from-teal-400 to-purple-500 bg-clip-text text-transparent mb-16">
            My Arsenal
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {skills.map((skillGroup, index) => (
              <div
                key={index}
                className="p-8 rounded-3xl bg-gray-700/50 backdrop-blur-lg shadow-xl hover:shadow-teal-500/30 transition-all duration-500"
              >
                <h3 className="text-2xl font-bold text-teal-400 mb-6">
                  {skillGroup.category}
                </h3>
                <div className="flex flex-wrap gap-4">
                  {skillGroup.items.map((skill) => (
                    <span
                      key={skill}
                      className="px-5 py-2 bg-teal-500/20 text-teal-300 rounded-full text-sm font-medium hover:bg-teal-500/40 transition-all duration-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-28 bg-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl font-extrabold text-center bg-gradient-to-r from-teal-400 to-purple-500 bg-clip-text text-transparent mb-16">
            Project Showcase
          </h2>
          <div className="space-y-24">
            {projects.map((project) => renderProject(project))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section
        id="contact"
        ref={contactRef}
        className="py-28 bg-gray-900"
      >
        <div className="max-w-6xl mx-auto px-6 text-white">
          <h2 className="text-5xl font-extrabold text-center mb-16">
            Let’s Collaborate
          </h2>
          <div className="bg-gray-800/50 p-10 rounded-3xl backdrop-blur-lg">
            <form
              action="https://formsubmit.co/satyampannaballer@gmail.com"
              method="POST"
              className="space-y-8"
            >
              <input type="hidden" name="_captcha" value="false" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  className="p-4 rounded-xl bg-gray-700/50 text-white placeholder-gray-400 focus:ring-2 focus:ring-teal-400 outline-none"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="p-4 rounded-xl bg-gray-700/50 text-white placeholder-gray-400 focus:ring-2 focus:ring-teal-400 outline-none"
                  required
                />
              </div>
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                className="w-full p-4 rounded-xl bg-gray-700/50 text-white placeholder-gray-400 focus:ring-2 focus:ring-teal-400 outline-none"
                required
              />
              <textarea
                name="message"
                rows={5}
                placeholder="Your Message"
                className="w-full p-4 rounded-xl bg-gray-700/50 text-white placeholder-gray-400 focus:ring-2 focus:ring-teal-400 outline-none"
                required
              />
              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-teal-500 to-purple-600 text-white font-bold rounded-full hover:scale-105 transition-all duration-300 shadow-lg"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-900 text-white text-center">
        <h3 className="text-3xl font-bold bg-gradient-to-r from-teal-400 to-purple-500 bg-clip-text text-transparent">
          Satyam Joshi
        </h3>
        <p className="mt-4 text-gray-400">© 2025. Crafted with Code & Creativity.</p>
        <div className="flex justify-center gap-8 mt-6 text-2xl">
          <a
            href="https://github.com/Satyam-a-Developer"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub className="hover:text-teal-400 transition-colors duration-300" />
          </a>
          <a
            href="https://x.com/Satyamjosh44160"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter className="hover:text-teal-400 transition-colors duration-300" />
          </a>
          <a
            href="https://linkedin.com/in/satyam-joshi-9b8266240/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin className="hover:text-teal-400 transition-colors duration-300" />
          </a>
          <a href="mailto:satyamjoshi567@gmail.com">
            <SiGmail className="hover:text-teal-400 transition-colors duration-300" />
          </a>
        </div>
      </footer>

      {/* Back to Top */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-10 right-10 bg-gradient-to-r from-teal-500 to-purple-600 text-white p-4 rounded-full shadow-lg hover:scale-110 transition-all duration-300 z-50"
        >
          <FaArrowUp />
        </button>
      )}
    </div>
  );
}