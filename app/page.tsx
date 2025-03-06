"use client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin";
import { useRef, useEffect, useState } from "react";
import { FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { FaArrowUp } from "react-icons/fa";
import Image from "next/image";
import { StaticImageData } from "next/image";
import dsasorting from "../public/dsasorting.png";
import excel from "../public/excel.png";
import notes from "../public/Notes.png";
import financeGo from "../public/FinanceGo.png";
import gamble from "../public/gamble.png";
import crypto from "../public/Crypto-exchange.png";
import profile from "../public/profile.jpeg";

// Add this (make sure to add kitty-walking.gif to your public folder)
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
  {
    category: "Frontend",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "GSAP", "Redux"],
  },
  {
    category: "Backend",
    items: ["Node.js", "Express", "MongoDB", "Superbase"],
  },
  { category: "Tools", items: ["Git", "Figma", "VS Code", "Vercel", "Docker"] },
];

// Projects array
const projects: Project[] = [
  {
    id: 1,
    title: "Notes App",
    description:
      "A comprehensive productivity tool featuring notes, notebooks, and todo lists with real-time synchronization.",
    image: notes,
    link: "https://notesappprivate-mjzu.vercel.app/",
    github: "https://github.com/Satyam-a-Developer/Notes-App",
    altText: "Notes Application Interface",
    techStack: ["Next-JS", "TypeScript", "Superbase", "TailwindCSS"],
    isReversed: false,
  },
  {
    id: 2,
    title: "Gamble Project",
    description:
      "An interactive gambling application with multiple games and a sleek user interface.",
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
    description: "Get way for your cryptocurrency investments",
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
    description:
      "A fully functional Excel-like spreadsheet application with formula support and data visualization.",
    image: excel,
    link: "https://excel-sheet-344l.vercel.app/",
    github: "https://github.com/Satyam-a-Developer/Excel-Sheet",
    altText: "Spreadsheet Application",
    techStack: ["Next-JS", "CSS Grid", "TailwindCSS"],
    isReversed: true,
  },
  {
    id: 5,
    title: "DSA Sorting Visualizer",
    description:
      "An educational tool that visualizes various sorting algorithms with step-by-step animations.",
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
    description:
      "A personal finance management tool with budgeting, investment tracking, and expense analysis features.",
    image: financeGo,
    link: "https://finance-go-frontend.vercel.app/",
    github: "https://github.com/Satyam-a-Developer/Finance-Go",
    altText: "Finance Management Dashboard",
    techStack: ["Next.js", "Chart.js", "MongoDB"],
    isReversed: true,
  },
];

// Kitty CSS styles
const cursorKittyStyles = `
  .cursor-kitty {
    position: fixed;
    width: 60px;
    height: 60px;
    pointer-events: none;
    z-index: 9999;
    transform-origin: bottom center;
  }

  .cursor-kitty.walking {
    animation: kittyWalk 0.4s steps(4) infinite; /* Slightly faster animation */
  }

  @keyframes kittyWalk {
    0% { background-position: 0 0; }
    100% { background-position: -240px 0; }
  }
`;

export default function Home() {
  const nameRef = useRef<HTMLSpanElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);
  const socialIconsRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const kittyRef = useRef<HTMLImageElement>(null);
  const [activeSection, setActiveSection] = useState("home");
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isKittyWalking, setIsKittyWalking] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
    setActiveSection("home");
    setShowBackToTop(false);
    // Kitty cursor follower
    const kitty = kittyRef.current;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let prevX = 0;
    let isAnimating = false;

    const updateKittyPosition = () => {
      // Smoothly interpolate towards the target
      currentX += (targetX - currentX) * 0.02;
      currentY += (targetY - currentY) * 0.02;

      if (kitty) {
        kitty.style.left = `${currentX}px`;
        kitty.style.top = `${currentY}px`;

        // Flip direction based on movement
        kitty.style.transform = targetX < prevX ? "scaleX(-1)" : "scaleX(1)";
        prevX = targetX;

        // Toggle walking state based on movement
        const isMoving =
          Math.abs(targetX - currentX) > 1 || Math.abs(targetY - currentY) > 1;
        setIsKittyWalking(isMoving);

        // Continue animation if still moving
        if (isMoving) {
          requestAnimationFrame(updateKittyPosition);
        } else {
          isAnimating = false;
        }
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX - 100;
      targetY = e.clientY - 30;

      if (!isAnimating) {
        isAnimating = true;
        requestAnimationFrame(updateKittyPosition);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const scrollToSection = (id: string) => {
    gsap.to(window, {
      duration: 1,
      scrollTo: { y: `#${id}`, offsetY: 50 },
      ease: "power3.inOut",
    });
  };

  const scrollToTop = () => {
    gsap.to(window, { duration: 1, scrollTo: { y: 0 }, ease: "power3.inOut" });
  };

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !projectRefs.current.includes(el)) projectRefs.current.push(el);
  };

  const renderProject = (project: Project) => (
    <div
      key={project.id}
      ref={addToRefs}
      className={`project-card flex flex-col lg:flex-row ${
        project.isReversed ? "lg:flex-row-reverse" : ""
      } items-center gap-12 mb-24 p-8 rounded-2xl transition-all duration-500 hover:shadow-xl bg-white`}
    >
      <div className="relative w-full lg:w-[500px] h-[320px] group project-image overflow-hidden rounded-xl shadow-lg">
        <Image
          src={project.image}
          alt={project.altText}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-teal-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-6">
          <div className="flex gap-4">
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-teal-500 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-teal-600 transition-all duration-300 shadow-md"
            >
              Live Demo
            </a>
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-700 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition-all duration-300 shadow-md"
              >
                View Code
              </a>
            )}
          </div>
        </div>
      </div>
      <div className="flex-1 space-y-5 project-content">
        <h2 className="text-3xl font-bold text-gray-900">{project.title}</h2>
        <p className="text-gray-700 leading-relaxed text-lg">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-3">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="px-4 py-1.5 bg-teal-100 text-teal-800 rounded-full text-sm font-medium"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 font-sans relative">
      {/* Kitty cursor follower */}
      <Image
        ref={kittyRef}
        src={kittyWalking}
        width={60}
        height={60}
        alt="Cursor following kitty"
        className={`cursor-kitty ${isKittyWalking ? "walking" : ""}`}
        unoptimized
      />
      <style jsx global>
        {cursorKittyStyles}
      </style>

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-lg z-50 py-4 shadow-[1px_25px_59px_-6px_rgba(34,_197,_94,_0.5)]">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <a href="#" className="text-2xl font-extrabold text-teal-600">
            Satyam Joshi
          </a>
          <div className="hidden md:flex items-center space-x-10">
            {["home", "about", "projects", "skills", "contact"].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className={`capitalize text-lg font-medium ${
                  activeSection === item
                    ? "text-teal-600"
                    : "text-gray-600 hover:text-teal-600"
                } transition-colors duration-300`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden bg-white/90 backdrop-blur-lg z-50 shadow-[0_-4px_15px_rgba(0,0,0,0.1)]">
        <div className="flex justify-around py-4">
          {["home", "about", "projects", "skills", "contact"].map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item)}
              className={`flex flex-col items-center ${
                activeSection === item ? "text-teal-600" : "text-gray-500"
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

      {/* Header Section */}
      <header
        ref={headerRef}
        id="home"
        className="pt-36 pb-28 text-center bg-gradient-to-b from-teal-50 to-gray-100"
      >
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
            Hey, I&rsquo;m{" "}
            <span ref={nameRef} className="text-teal-600">
              Satyam Joshi
            </span>
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto text-gray-700 font-light leading-relaxed">
            Crafting seamless digital experiences as a Full Stack Developer &
            UI/UX Designer
          </p>
          <div
            ref={socialIconsRef}
            className="flex justify-center gap-8 mt-10 text-3xl text-gray-600"
          >
            <a
              href="https://github.com/Satyam-a-Developer"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <FaGithub className="hover:text-teal-600 transition-colors duration-300" />
            </a>
            <a
              href="https://x.com/Satyamjosh44160"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
            >
              <FaTwitter className="hover:text-teal-600 transition-colors duration-300" />
            </a>
            <a
              href="https://linkedin.com/in/satyam-joshi"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="hover:text-teal-600 transition-colors duration-300" />
            </a>
            <a href="mailto:satyamjoshi@example.com" aria-label="Email">
              <SiGmail className="hover:text-teal-600 transition-colors duration-300" />
            </a>
          </div>
          <div className="mt-12 space-x-4">
            <button
              onClick={() => scrollToSection("projects")}
              className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-10 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-teal-600/40"
            >
              Explore Projects
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="bg-transparent border-2 border-teal-600 text-teal-600 font-semibold py-3 px-10 rounded-full transition-all duration-300 hover:bg-teal-600 hover:text-white"
            >
              Get in Touch
            </button>
          </div>
        </div>
      </header>

      {/* About Section */}
      <section id="about" ref={aboutRef} className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-12 text-center text-gray-900">
            About Me
          </h2>
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="w-full md:w-1/3 flex justify-center">
              <div className="relative w-72 h-72 rounded-full overflow-hidden border-4 border-teal-500 shadow-2xl transform transition-transform duration-500 hover:scale-105">
                <Image
                  src={profile}
                  alt="Profile"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="w-full md:w-2/3 space-y-6">
              <h3 className="text-2xl font-semibold text-teal-600">
                Full Stack Developer & UI/UX Designer
              </h3>
              <p className="text-lg leading-relaxed text-gray-700">
                I&rsquo;m Satyam Joshi, a passionate developer dedicated to
                creating intuitive and impactful web applications. With
                proficiency in both frontend and backend technologies, I thrive
                on turning complex challenges into elegant, user-centric
                solutions.
              </p>
              <p className="text-lg leading-relaxed text-gray-700">
                Specializing in modern frameworks like React and Next.js, I
                design responsive interfaces paired with robust server-side
                logic to deliver exceptional user experiences across all
                platforms.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
                <div>
                  <h4 className="font-semibold text-gray-900">Education</h4>
                  <p className="text-gray-600">B.Tech in Computer Science</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">State</h4>
                  <p className="text-gray-600">Gujarat</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Location</h4>
                  <p className="text-gray-600">India</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" ref={skillsRef} className="py-24 bg-teal-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-12 text-center text-gray-900">
            My Skills
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {skills.map((skillGroup, index) => (
              <div
                key={index}
                className="skill-category bg-white rounded-2xl shadow-lg p-8 transition-transform duration-500 hover:scale-105 border border-teal-200"
              >
                <h3 className="text-xl font-bold text-teal-600 mb-6">
                  {skillGroup.category}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {skillGroup.items.map((skill, i) => (
                    <span
                      key={i}
                      className="bg-teal-100 px-4 py-2 rounded-full text-teal-700 text-sm font-medium"
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

      {/* Projects Section */}
      <section id="projects" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-6 text-center text-gray-900">
            Featured Projects
          </h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-16 text-lg">
            A showcase of my recent work blending creativity and technical
            expertise.
          </p>
          <div className="space-y-20">
            {projects.map((project) => renderProject(project))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" ref={contactRef} className="py-24 bg-teal-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-6 text-center text-gray-900">
            Get In Touch
          </h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-16 text-lg">
            Let’s collaborate on your next project or just say hello!
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-center border border-teal-200">
              <div className="w-14 h-14 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <SiGmail className="text-teal-600 text-2xl" />
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">Email</h3>
              <p className="text-gray-600">satyamjoshi567@gmail.com</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-center border border-teal-200">
              <div className="w-14 h-14 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaTwitter className="text-teal-600 text-2xl" />
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">Twitter</h3>
              <p className="text-gray-600">@Satyamjosh44160</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-center border border-teal-200">
              <div className="w-14 h-14 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaLinkedin className="text-teal-600 text-2xl" />
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">LinkedIn</h3>
              <p className="text-gray-600">
                linkedin.com/in/satyam-joshi-9b8266240/
              </p>
            </div>
          </div>
          <div className="bg-white p-10 rounded-2xl shadow-xl border border-teal-200">
            <h3 className="text-2xl font-bold mb-8 text-center text-gray-900">
              Send a Message
            </h3>
            <form
              action="https://formsubmit.co/satyampannaballer@gmail.com"
              method="POST"
              className="space-y-8"
            >
              <input type="hidden" name="_captcha" value="false" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-gray-700 mb-2 font-medium"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="w-full px-5 py-3 rounded-lg border border-teal-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors duration-300"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-gray-700 mb-2 font-medium"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="w-full px-5 py-3 rounded-lg border border-teal-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors duration-300"
                    placeholder="Your email"
                    required
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="subject"
                  className="block text-gray-700 mb-2 font-medium"
                >
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  id="subject"
                  className="w-full px-5 py-3 rounded-lg border border-teal-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors duration-300"
                  placeholder="Subject"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-gray-700 mb-2 font-medium"
                >
                  Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  rows={5}
                  className="w-full px-5 py-3 rounded-lg border border-teal-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors duration-300"
                  placeholder="Your message"
                  required
                ></textarea>
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-10 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-teal-600/40"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0 text-center md:text-left">
              <h3 className="text-2xl font-bold text-teal-400">Satyam Joshi</h3>
              <p className="text-gray-400 mt-2 text-lg">
                Full Stack Developer & UI/UX Designer
              </p>
            </div>
            <div className="flex space-x-8 text-2xl">
              <a
                href="https://github.com/Satyam-a-Developer"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <FaGithub className="hover:text-teal-400 transition-colors duration-300" />
              </a>
              <a
                href="https://x.com/Satyamjosh44160"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
              >
                <FaTwitter className="hover:text-teal-400 transition-colors duration-300" />
              </a>
              <a
                href="https://www.linkedin.com/in/satyam-joshi-9b8266240/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="hover:text-teal-400 transition-colors duration-300" />
              </a>
              <a href="mailto:satyam.joshi567@gmail.com" aria-label="Email">
                <SiGmail className="hover:text-teal-400 transition-colors duration-300" />
              </a>
            </div>
          </div>
          <p className="text-center text-gray-500 mt-8 text-sm">
            © 2025 Satyam Joshi. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-10 right-10 bg-teal-600 text-white p-4 rounded-full shadow-lg hover:bg-teal-700 transition-all duration-300 transform hover:scale-110 z-50"
          aria-label="Back to Top"
        >
          <FaArrowUp className="h-6 w-6" />
        </button>
      )}
    </div>
  );
}
