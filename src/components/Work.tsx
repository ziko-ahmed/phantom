import { useState } from "react";
import "./styles/Work.css";
import WorkImage from "./WorkImage";
import ProjectOverlay from "./ProjectOverlay";
import { projectData, Project } from "../data/projectData";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const Work = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useGSAP(() => {
    let translateX: number = 0;
    let timeline: gsap.core.Timeline;

    function setTranslateX() {
      const boxes = document.getElementsByClassName("work-box");
      if (boxes.length === 0) return;

      const workFlex = document.querySelector(".work-flex") as HTMLElement;

      if (!workFlex) return;

      // Sum up the width of all boxes
      let totalBoxWidth = 0;
      for (let i = 0; i < boxes.length; i++) {
        const box = boxes[i] as HTMLElement;
        // Get the full width including margins
        const style = window.getComputedStyle(box);
        const width = box.offsetWidth;
        const marginLeft = parseFloat(style.marginLeft);
        const marginRight = parseFloat(style.marginRight);
        totalBoxWidth += width + marginLeft + marginRight;
      }

      // Get flex container's visible width
      const flexStyle = window.getComputedStyle(workFlex);
      const flexPaddingLeft = parseFloat(flexStyle.paddingLeft);
      const flexPaddingRight = parseFloat(flexStyle.paddingRight);
      const flexClientWidth = workFlex.clientWidth;

      // Account for flex margins
      // Calculate scroll distance
      // We need to move enough so all boxes fit within the visible area
      translateX = Math.max(0, totalBoxWidth - (flexClientWidth + flexPaddingLeft + flexPaddingRight));

      console.log("Work scroll calculation (box-by-box):", {
        totalBoxWidth,
        flexClientWidth,
        flexPaddingLeft,
        flexPaddingRight,
        translateX,
        boxCount: boxes.length,
      });
    }

    function createTimeline() {
      // Kill existing timeline if it exists
      if (timeline) {
        timeline.kill();
        ScrollTrigger.getById("work")?.kill();
      }

      setTranslateX();

      if (translateX <= 0) {
        console.log("No horizontal scroll needed");
        return;
      }

      timeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".work-section",
          start: "top top",
          end: `+=${translateX * 1.5}`,
          scrub: true,
          pin: true,
          invalidateOnRefresh: true,
          id: "work",
          onUpdate: (self) => {
            console.log("ScrollTrigger progress:", self.progress, "translateX:", translateX);
          },
        },
      });

      timeline.to(".work-flex", {
        x: -translateX,
        ease: "none",
      });
    }

    // Add a small delay to ensure DOM is fully rendered
    const timeoutId = setTimeout(() => {
      createTimeline();
      // Refresh after a bit more to ensure images are loaded
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 500);
    }, 100);

    // Recalculate on window resize
    const handleResize = () => {
      createTimeline();
    };

    window.addEventListener("resize", handleResize);

    // Clean up
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", handleResize);
      if (timeline) {
        timeline.kill();
        ScrollTrigger.getById("work")?.kill();
      }
    };
  }, []);

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">
          {projectData.map((project) => (
            <div
              className="work-box"
              key={project.number}
              onClick={() => setSelectedProject(project)}
            >
              <div className="work-info">
                <div className="work-title">
                  <h3>{project.number}</h3>
                  <div>
                    <h4>{project.title}</h4>
                    <p>{project.category}</p>
                  </div>
                </div>
                <h4>Tools and features</h4>
                <p>{project.techStack.join(", ")}</p>
              </div>
              <WorkImage image={project.image} alt={project.title} />
            </div>
          ))}
        </div>
      </div>

      {selectedProject && (
        <ProjectOverlay
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
};

export default Work;
