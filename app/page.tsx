"use client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useRef, useEffect } from "react";
import { FaTwitter } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import Image from "next/image";
import { FaGithub } from "react-icons/fa";
import { RiPagesLine } from "react-icons/ri";
import { StaticImageData } from "next/image";
import dsasorting from "../public/dsasorting.png";
import excel from "../public/excel.png";
import notes from "../public/Notes.png";
import financeGo from "../public/FinanceGo.png";
import gamble from "../public/gamble.png";

// Define interfaces for project data
interface Project {
  title: string;
  description: string;
  image: StaticImageData;
  link: string;
  altText: string;
  isReversed?: boolean;
}

const projects: Project[] = [
  {
    title: "Notes App",
    description: "Notes App is a project that aims to create a productivity tool, including Notes, Notebooks, and Todos.",
    image: notes,
    link: "https://github.com/Satyam-a-Developer/Gamble-Project",
    altText: "Notes",
    isReversed: false
  },
  {
    title: "Gamble Project",
    description: "Gamble is a gambling application project that includes various gambling games for users to try their luck.",
    image: gamble,
    link: "https://notes-app-psi-ten.vercel.app/",
    altText: "Gamble",
    isReversed: true
  },
  {
    title: "Excel Clone",
    description: "Excel Clone is a project that replicates the functionality of Excel, allowing users to input data and perform calculations.",
    image: excel,
    link: "https://excel-sheet-344l.vercel.app/",
    altText: "Excel",
    isReversed: false
  },
  {
    title: "DSA Sorting Visualizer",
    description: "This project demonstrates sorting algorithms, visualizing each step to make understanding DSA algorithms easier.",
    image: dsasorting,
    link: "https://dsa-sorting-algo-zlls.vercel.app/",
    altText: "DSA Sorting",
    isReversed: true
  },
  {
    title: "FinanceGo",
    description: "FinanceGo helps you manage your financial data with features such as budgeting, investment tracking, and expense analysis.",
    image: financeGo,
    link: "https://finance-go-frontend.vercel.app/",
    altText: "FinanceGo",
    isReversed: false
  }
];

export default function Home() {
  const nameRef = useRef<HTMLSpanElement>(null);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);
  const socialIconsRef = useRef<HTMLDivElement>(null);

  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    // Name animation
    if (nameRef.current) {
      gsap.to(nameRef.current, {
        duration: 0.2,
        opacity: 3,
        ease: "power1.inOut",
      });
    }

    // Social Icons Animation
    if (socialIconsRef.current) {
      const icons = Array.from(socialIconsRef.current.children);
      gsap.from(icons, {
        opacity: 0,
        y: 50,
        duration: 0.5,
        stagger: 0.2,
        ease: "back.out(1.7)",
        delay: 0.3
      });

      icons.forEach((icon) => {
        icon.addEventListener('mouseenter', () => {
          gsap.to(icon, {
            scale:1.5,
            duration: 0.4,
            ease: "back.out(1.7)"
          });
        });

        icon.addEventListener('mouseleave', () => {
          gsap.to(icon, {
            scale: 1,
            duration: 0.4,
            ease: "power2.out"
          });
        });
      });
    }

    // Project animations
    projectRefs.current.forEach((project) => {
      if (project) {
        gsap.fromTo(
          project,
          {
            opacity: 0,
            y: 100,
          },
          {
            opacity: 3,
            y: 0,
            duration: 0.4,
            ease: "power2.out",
            scrollTrigger: {
              trigger: project,
              start: "top bottom-=100",
              end: "bottom center",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Helper function to add refs to projectRefs array
  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !projectRefs.current.includes(el)) {
      projectRefs.current.push(el);
    }
  };

  const renderProject = (project: Project) => (
    <div 
      key={project.title}
      ref={addToRefs}
      className={`project-card flex flex-col ${
        project.isReversed ? 'md:flex-row-reverse' : 'md:flex-row'
      } items-center gap-8 opacity-0 hover:scale-105 transition-transform duration-300`}
    >
      <Image 
        src={project.image} 
        alt={project.altText} 
        width={300} 
        height={300} 
        className="rounded-lg shadow-xl transform transition duration-500 hover:shadow-2xl" 
      />
      <div className="text-left">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">{project.title}</h2>
        <p className="text-lg text-gray-600 leading-relaxed">
          {project.description}
        </p>
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline transition duration-300"
        >
          View Project
        </a>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen pb-20 font-sans">
      <div className="flex flex-col gap-8 items-center text-center">
        {/* Main Header */}
        <div className="flex flex-col gap-8 text-center min-h-screen items-center justify-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800">
            Hello Developer, I am{" "}
            <span
              ref={nameRef}
              className="text-blue-500 opacity-0 inline-block ml-2 underline"
            >
              Satyam Joshi
            </span>
          </h1>

          {/* Details Section */}
          <p className="text-xl sm:text-2xl font-semibold text-gray-700">
            I am a Full Stack Developer and a UI/UX Designer
          </p>

          {/* Social Icons Section */}
          <div 
            ref={socialIconsRef}
            className="flex flex-row gap-6 items-center mt-6 text-blue-500 font-bold"
          >
            <a
              href="https://github.com/Satyam-a-Developer"
              target="_blank"
              rel="noopener noreferrer"
              className="transform-gpu"
            >
              <FaGithub className="text-4xl sm:text-5xl transition duration-300" />
            </a>
            <a
              href="https://x.com/Satyamjosh44160"
              target="_blank"
              rel="noopener noreferrer"
              className="transform-gpu"
            >
              <FaTwitter className="text-4xl sm:text-5xl transition duration-300" />
            </a>
            <a 
              href="mailto:your-email@example.com"
              className="transform-gpu"
            >
              <SiGmail className="text-4xl sm:text-5xl transition duration-300" />
            </a>
            <a
              href="https://x.com/Satyamjosh44160"
              target="_blank"
              rel="noopener noreferrer"
              className="transform-gpu"
            >
              <RiPagesLine className="text-4xl sm:text-5xl transition duration-300" />
            </a>
          </div>
        </div>

        {/* Projects Section */}
        <div className="w-full max-w-6xl px-4 mb-10">
          <div className="project-name mb-16">
            <h1 className="text-4xl font-semibold text-gray-700">My Projects</h1>
          </div>
          <div className="flex flex-col gap-24">
            {projects.map((project) => renderProject(project))}
          </div>
        </div>
      </div>
    </div>
  );
}