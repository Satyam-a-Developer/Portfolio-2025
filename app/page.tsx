"use client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin";
import { useRef, useEffect, useState } from "react";
import { FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import Image from "next/image";
import { StaticImageData } from "next/image";
import dsasorting from "../public/dsasorting.png";
import excel from "../public/excel.png";
import notes from "../public/Notes.png";
import financeGo from "../public/FinanceGo.png";
import gamble from "../public/gamble.png";
import profile from "../public/profile.jpeg";

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

// Updated projects array with more details
const projects: Project[] = [
  {
    id: 1,
    title: "Notes App",
    description:
      "A comprehensive productivity tool featuring notes, notebooks, and todo lists with real-time synchronization. Users can organize their thoughts, set priorities, and access their content across devices.",
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
      "An interactive gambling application with multiple games and a sleek user interface. Features include user authentication, virtual currency, and real-time game statistics.",
    image: gamble,
    link: "https://bubble-gamble.vercel.app/",
    github: "https://github.com/Satyam-a-Developer/Gamble-Project",
    altText: "Gambling Game Interface",
    techStack: ["Next.js", "Tailwind CSS"],
    isReversed: true,
  },
  {
    id: 3,
    title: "Excel Clone",
    description:
      "A fully functional Excel-like spreadsheet application with formula support and data visualization. Includes features like cell formatting, data export, and custom functions.",
    image: excel,
    link: "https://excel-sheet-344l.vercel.app/",
    github: "https://github.com/Satyam-a-Developer/Excel-Sheet",
    altText: "Spreadsheet Application",
    techStack: ["Next-JS", "CSS Grid", "TailwindCSS"],
    isReversed: false,
  },
  {
    id: 4,
    title: "DSA Sorting Visualizer",
    description:
      "An educational tool that visualizes various sorting algorithms with step-by-step animations. Helps users understand the inner workings of algorithms like Bubble Sort, Quick Sort, and Merge Sort.",
    image: dsasorting,
    link: "https://dsa-sorting-algo-lo71tt.vercel.app/",
    github: "https://github.com/Satyam-a-Developer/DSA-Sorting-Algo",
    altText: "Sorting Algorithm Visualizer",
    techStack: ["JavaScript", "Algorithm Design"],
    isReversed: true,
  },
  {
    id: 5,
    title: "FinanceGo",
    description:
      "A personal finance management tool with budgeting, investment tracking, and expense analysis features. Helps users visualize spending patterns and set financial goals.",
    image: financeGo,
    link: "https://excel-sheet-fby2.vercel.app/",
    github: "https://github.com/Satyam-a-Developer/Finance-Go",
    altText: "Finance Management Dashboard",
    techStack: ["Next.js", "Chart.js", "MongoDB"],
    isReversed: false,
  },
];

export default function Home() {
  const nameRef = useRef<HTMLSpanElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);
  const socialIconsRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState("home");
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Apply dark mode if user prefers it
    if (typeof window !== "undefined") {
      const storedTheme = localStorage.getItem("theme");
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;

      if (storedTheme === "dark" || (!storedTheme && prefersDark)) {
        setIsDarkMode(true);
        document.documentElement.classList.add("dark");
      }
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    // Header animation
    gsap.fromTo(
      headerRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    );

    // Name animation with bounce
    if (nameRef.current) {
      gsap.fromTo(
        nameRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "bounce.out",
          delay: 0.3,
        }
      );
    }

    // Social icons animation
    if (socialIconsRef.current) {
      const icons = Array.from(socialIconsRef.current.children);
      gsap.from(icons, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.2,
        ease: "elastic.out(1, 0.8)",
        delay: 0.5,
      });

      icons.forEach((icon) => {
        icon.addEventListener("mouseenter", () =>
          gsap.to(icon, {
            scale: 1.2,
            rotation: 10,
            duration: 0.3,
            ease: "power2.out",
          })
        );
        icon.addEventListener("mouseleave", () =>
          gsap.to(icon, {
            scale: 1,
            rotation: 0,
            duration: 0.3,
            ease: "power2.out",
          })
        );
      });
    }

    // About section animation
    if (aboutRef.current) {
      gsap.fromTo(
        aboutRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: aboutRef.current,
            start: "top 80%",
            end: "bottom 20%",
          },
        }
      );
    }

    // Skills section animation
    if (skillsRef.current) {
      const skillCategories =
        skillsRef.current.querySelectorAll(".skill-category");

      skillCategories.forEach((category, index) => {
        gsap.fromTo(
          category,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: index * 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: skillsRef.current,
              start: "top 80%",
            },
          }
        );
      });
    }

    // Contact section animation
    if (contactRef.current) {
      gsap.fromTo(
        contactRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contactRef.current,
            start: "top 80%",
          },
        }
      );
    }

    // Enhanced project animations
    projectRefs.current.forEach((project, index) => {
      if (project) {
        const image = project.querySelector(".project-image");
        const content = project.querySelector(".project-content");

        const direction = index % 2 === 0 ? -1 : 1;

        gsap.fromTo(
          project,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: project,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );

        gsap.fromTo(
          image,
          { x: direction * 50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            delay: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: project,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );

        gsap.fromTo(
          content,
          { x: -direction * 50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            delay: 0.4,
            ease: "power3.out",
            scrollTrigger: {
              trigger: project,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    });

    // Set up scroll triggers for active section detection
    const sections = ["home", "about", "projects", "skills", "contact"];

    sections.forEach((section) => {
      const element = document.getElementById(section);
      if (element) {
        ScrollTrigger.create({
          trigger: element,
          start: "top center",
          end: "bottom center",
          onEnter: () => setActiveSection(section),
          onEnterBack: () => setActiveSection(section),
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const scrollToSection = (id: string) => {
    gsap.to(window, {
      duration: 1,
      scrollTo: { y: `#${id}`, offsetY: 50 },
      ease: "power3.inOut",
    });
  };

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !projectRefs.current.includes(el)) {
      projectRefs.current.push(el);
    }
  };

  const renderProject = (project: Project) => (
    <div
      key={project.id}
      ref={addToRefs}
      className={`project-card flex flex-col lg:flex-row ${
        project.isReversed ? "lg:flex-row-reverse" : ""
      } items-center gap-8 mb-24 p-6 rounded-xl transition-all duration-300 hover:shadow-lg dark:hover:shadow-blue-900/20 bg-white dark:bg-gray-800`}
    >
      <div className="relative w-full lg:w-[450px] h-[300px] group project-image overflow-hidden rounded-xl shadow-md">
        <Image
          src={project.image}
          alt={project.altText}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
          <div className="flex gap-4">
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-700 transition-colors duration-300"
            >
              Live Demo
            </a>
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 dark:bg-gray-700 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-900 dark:hover:bg-gray-600 transition-colors duration-300"
              >
                View Code
              </a>
            )}
          </div>
        </div>
      </div>
      <div className="flex-1 space-y-4 project-content">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          {project.title}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-300">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md z-50 py-4 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
          <a href="#" className="text-xl font-bold text-white ">
            {/* <Image className="w-8 h-8 rounded-xl" src={profile} alt="Logo" /> */}
            Satyam joshi
          </a>

          <div className="hidden md:flex items-center space-x-8">
            {["home", "about", "projects", "skills", "contact"].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className={`capitalize ${
                  activeSection === item
                    ? "text-blue-600 dark:text-blue-400 font-medium"
                    : "text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                } transition-colors duration-300`}
              >
                {item}
              </button>
            ))}
          </div>

          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
            aria-label="Toggle dark mode"
          >
            {/* {isDarkMode ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            )} */}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden bg-white/80 dark:bg-gray-900/80 backdrop-blur-md z-50 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] dark:shadow-[0_-4px_10px_rgba(0,0,0,0.2)]">
        <div className="flex justify-around py-3">
          {["home", "about", "projects", "skills", "contact"].map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item)}
              className={`flex flex-col items-center ${
                activeSection === item
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-gray-500 dark:text-gray-400"
              }`}
            >
              {item === "home" && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
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
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
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
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
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
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
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
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
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
              <span className="text-xs mt-1 capitalize">{item}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Header Section */}
      <header ref={headerRef} id="home" className="pt-32 pb-32 text-center">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
            Hey There, I&apos;m{" "}
            <span ref={nameRef} className="text-blue-600 dark:text-blue-400">
              Satyam Joshi
            </span>
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto text-gray-600 dark:text-gray-300">
            A passionate Full Stack Developer & UI/UX Designer crafting digital
            experiences with code and creativity
          </p>
          <div
            ref={socialIconsRef}
            className="flex justify-center gap-6 mt-8 text-3xl text-gray-600 dark:text-gray-300"
          >
            <a
              href="https://github.com/Satyam-a-Developer"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <FaGithub className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors" />
            </a>
            <a
              href="https://x.com/Satyamjosh44160"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
            >
              <FaTwitter className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors" />
            </a>
            <a
              href="https://linkedin.com/in/satyam-joshi"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors" />
            </a>
            <a href="mailto:satyamjoshi@example.com" aria-label="Email">
              <SiGmail className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors" />
            </a>
            {/* <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" aria-label="Resume">
              <RiPagesLine className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors" />
            </a> */}
          </div>
          <div className="mt-10">
            <button
              onClick={() => scrollToSection("projects")}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-600/30"
            >
              View My Work
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="ml-4 bg-transparent border-2 border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 font-medium py-3 px-8 rounded-full transition-all duration-300 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-400 dark:hover:text-gray-900"
            >
              Contact Me
            </button>
          </div>
        </div>
      </header>

      {/* About Section */}
      <section
        id="about"
        ref={aboutRef}
        className="py-20 bg-white dark:bg-gray-800"
      >
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6 text-center">About Me</h2>
          <div className="flex flex-col md:flex-row gap-8 items-center mt-12">
            <div className="w-full md:w-1/3 flex justify-center">
              <div className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-blue-600 dark:border-blue-400 shadow-xl">
                {/* Add your profile image here or use a placeholder */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white text-6xl font-bold">
                  <Image
                    src={profile}
                    className="rounded-full"
                    alt="Profile"
                    width={308}
                    height={308}
                  />
                </div>
              </div>
            </div>
            <div className="w-full md:w-2/3">
              <h3 className="text-2xl font-bold mb-3 text-gray-800 dark:text-white">
                Full Stack Developer & UI/UX Designer
              </h3>
              <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-300 mb-4">
                I&apos;m Satyam Joshi, a dedicated developer with a passion for
                building intuitive and efficient web applications. With
                expertise in both frontend and backend development, I love
                transforming complex problems into elegant solutions.
              </p>
              <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-300 mb-6">
                I specialize in creating responsive, user-friendly interfaces
                with React and Next.js, backed by robust server architecture. My
                goal is to create applications that not only look great but also
                provide a seamless user experience across all devices.
              </p>
              <div className="flex flex-wrap gap-6 mt-6">
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-white mb-1">
                    Education
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    B.Tech in Computer Science
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-white mb-1">
                    State
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300">
                   Gujarat
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-white mb-1">
                    Location
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300">India</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section
        id="skills"
        ref={skillsRef}
        className="py-20 bg-gray-50 dark:bg-gray-900"
      >
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">My Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {skills.map((skillGroup, index) => (
              <div
                key={index}
                className="skill-category bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-transform duration-300 hover:transform hover:scale-105"
              >
                <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-4">
                  {skillGroup.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill, i) => (
                    <span
                      key={i}
                      className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full text-gray-700 dark:text-gray-300 text-sm"
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
      <section id="projects" className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4 text-center">
            Featured Projects
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-16">
            Here are some of my recent projects showcasing my skills and
            experience in web development.
          </p>
          <div className="space-y-16">
            {projects.map((project) => renderProject(project))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        ref={contactRef}
        className="py-20 bg-gray-50 dark:bg-gray-900"
      >
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4 text-center">Get In Touch</h2>
          <p className="text-center text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-12">
            Interested in working together? Feel free to reach out. I am always
            open to discussing new projects, creative ideas, or opportunities to
            be part of your vision.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 text-center">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <SiGmail className="text-blue-600 dark:text-blue-400 text-xl" />
              </div>
              <h3 className="font-bold text-lg mb-2">Email</h3>
              <p className="text-gray-600 dark:text-gray-300">
                satyamjoshi567@Gmail.com
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 text-center">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaTwitter className="text-blue-600 dark:text-blue-400 text-xl" />
              </div>
              <h3 className="font-bold text-lg mb-2">Twitter</h3>
              <p className="text-gray-600 dark:text-gray-300">
                @Satyamjosh44160
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 text-center">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaLinkedin className="text-blue-600 dark:text-blue-400 text-xl" />
              </div>
              <h3 className="font-bold text-lg mb-2">LinkedIn</h3>
              <p className="text-gray-600 dark:text-gray-300">
                linkedin.com/in/satyam-joshi-9b8266240/
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold mb-6 text-center">
              Send Me a Message
            </h3>
            <form
              action="https://formsubmit.co/satyampannaballer@gmail.com"
              method="POST"
              className="space-y-6"
            >
              {/* Hidden input to prevent spam */}
              <input type="hidden" name="_captcha" value="false" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors"
                    placeholder="Your email"
                    required
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="subject"
                  className="block text-gray-700 dark:text-gray-300 mb-2"
                >
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  id="subject"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors"
                  placeholder="Subject"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-gray-700 dark:text-gray-300 mb-2"
                >
                  Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors"
                  placeholder="Your message"
                  required
                ></textarea>
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-600/30"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-800 dark:bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold text-blue-400">Satyam Joshi</h3>
              <p className="text-gray-400 mt-2">
                Full Stack Developer & UI/UX Designer
              </p>
            </div>

            <div className="flex space-x-6 text-lg">
              <a
                href="https://github.com/Satyam-a-Developer"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <FaGithub className="hover:text-blue-400 transition-colors" />
              </a>
              <a
                href="https://x.com/Satyamjosh44160"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
              >
                <FaTwitter className="hover:text-blue-400 transition-colors" />
              </a>
              <a
                href="https://www.linkedin.com/in/satyam-joshi-9b8266240/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="hover:text-blue-400 transition-colors" />
              </a>
              <a href="mailto:satyam.joshi567@gmail.com" aria-label="Email">
                <SiGmail className="hover:text-blue-400 transition-colors" />
              </a>
            </div>
          </div>

          </div>
      </footer>
    </div>
  );
}
