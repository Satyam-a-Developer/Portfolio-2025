"use client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useRef, useEffect } from "react";
import { FaTwitter } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import Image from "next/image";
import { FaGithub } from "react-icons/fa";
import { RiPagesLine } from "react-icons/ri";
import dsasorting from "../public/dsasorting.png";
import excel from "../public/excel.png";
import notes from "../public/Notes.png";
import financeGo from "../public/FinanceGo.png";
import gamble from "../public/gamble.png";

export default function Home() {
  const Name = useRef(null);
  const projectRefs = useRef<HTMLDivElement[]>([]);

  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    // Name animation
    if (Name.current) {
      gsap.to(Name.current, {
        duration: 1,
        opacity: 3,
        ease: "power1.inOut",
      });
    }

    // Project animations
    projectRefs.current.forEach((project) => {
      gsap.fromTo(
        project,
        {
          opacity: 0,
          y: 100,
        },
        {
          opacity: 3,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: project,
            start: "top bottom-=100",
            end: "bottom center",
            toggleActions: "play none none reverse",
            markers: false, // Set to true for debugging
          },
        }
      );
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

  return (
    <div className="min-h-screen pb-20 font-sans">
      <div className="flex flex-col gap-8 items-center text-center">
        {/* Main Header */}
        <div className="flex flex-col gap-8 text-center min-h-screen items-center justify-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800">
            Hello Developer, I am{" "}
            <span
              ref={Name}
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
          <div className="flex flex-row gap-6 items-center mt-6 text-blue-500 font-bold">
            <a
              href="https://github.com/Satyam-a-Developer"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub className="text-4xl sm:text-5xl hover:text-blue-700 transition duration-300" />
            </a>
            <a
              href="https://x.com/Satyamjosh44160"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter className="text-4xl sm:text-5xl hover:text-blue-700 transition duration-300" />
            </a>
            <a href="mailto:your-email@example.com">
              <SiGmail className="text-4xl sm:text-5xl hover:text-blue-700 transition duration-300" />
            </a>
            <a
              href="https://x.com/Satyamjosh44160"
              target="_blank"
              rel="noopener noreferrer"
            >
              <RiPagesLine className="text-4xl sm:text-5xl hover:text-blue-700 transition duration-300" />
            </a>
          </div>
        </div>

        {/* Projects Section */}
        <div className="w-full max-w-6xl px-4">
          <div className="project-name mb-16">
            <h1 className="text-4xl font-semibold text-gray-700">My Projects</h1>
          </div>
          <div className="flex flex-col gap-24">
            {/* Project 1 */}
            <div 
              ref={addToRefs}
              className="project-card flex flex-col md:flex-row items-center gap-8 opacity-0"
            >
              <Image src={notes} alt="Notes" width={300} height={300} className="rounded-lg shadow-lg" />
              <div className="text-left">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Notes App</h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Notes App is a project that aims to create a productivity tool, including Notes, Notebooks, and Todos.
                </p>
                <a
                  href="https://github.com/Satyam-a-Developer/Gamble-Project"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline transition duration-300"
                >
                  View Project
                </a>
              </div>
            </div>

            {/* Project 2 */}
            <div 
              ref={addToRefs}
              className="project-card flex flex-col md:flex-row-reverse items-center gap-8 opacity-0"
            >
              <Image src={gamble} alt="Gamble" width={300} height={300} className="rounded-lg shadow-lg" />
              <div className="text-left">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Gamble Project</h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Gamble is a gambling application project that includes various gambling games for users to try their luck.
                </p>
                <a
                  href="https://notes-app-psi-ten.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline transition duration-300"
                >
                  View Project
                </a>
              </div>
            </div>

            {/* Project 3 */}
            <div 
              ref={addToRefs}
              className="project-card flex flex-col md:flex-row items-center gap-8 opacity-0"
            >
              <Image src={excel} alt="Excel" width={300} height={300} className="rounded-lg shadow-lg" />
              <div className="text-left">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Excel Clone</h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Excel Clone is a project that replicates the functionality of Excel, allowing users to input data and perform calculations.
                </p>
                <a
                  href="https://excel-sheet-344l.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline transition duration-300"
                >
                  View Project
                </a>
              </div>
            </div>

            {/* Project 4 */}
            <div 
              ref={addToRefs}
              className="project-card flex flex-col md:flex-row-reverse items-center gap-8 opacity-0"
            >
              <Image src={dsasorting} alt="DSA Sorting" width={300} height={300} className="rounded-lg shadow-lg" />
              <div className="text-left">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">DSA Sorting Visualizer</h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  This project demonstrates sorting algorithms, visualizing each step to make understanding DSA algorithms easier.
                </p>
                <a
                  href="https://dsa-sorting-algo-zlls.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline transition duration-300"
                >
                  View Project
                </a>
              </div>
            </div>

            {/* Project 5 */}
            <div 
              ref={addToRefs}
              className="project-card flex flex-col md:flex-row items-center gap-8 opacity-0"
            >
              <Image src={financeGo} alt="FinanceGo" width={300} height={300} className="rounded-lg shadow-lg" />
              <div className="text-left">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">FinanceGo</h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  FinanceGo helps you manage your financial data with features such as budgeting, investment tracking, and expense analysis.
                </p>
                <a
                  href="https://finance-go-frontend.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline transition duration-300"
                >
                  View Project
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
