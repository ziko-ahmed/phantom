import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const Work = () => {
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
          <div className="work-box">
            <div className="work-info">
              <div className="work-title">
                <h3>01</h3>
                <div>
                  <h4>FinanceAI Assistant</h4>
                  <p>AI/ML</p>
                </div>
              </div>
              <h4>Tools and features</h4>
              <p>Python, PostgreSQL, Redis, APIs</p>
            </div>
            <WorkImage image="src/assets/images/Rayibot.png" alt="FinanceAI Assistant" />
          </div>
          <div className="work-box">
            <div className="work-info">
              <div className="work-title">
                <h3>02</h3>
                <div>
                  <h4>ASL Detection</h4>
                  <p>AI/ML</p>
                </div>
              </div>
              <h4>Tools and features</h4>
              <p>Python, TensorFlow, OpenCV, MediaPipe</p>
            </div>
            <WorkImage image="src/assets/images/ASL.png" alt="ASL Detection" />
          </div>
          <div className="work-box">
            <div className="work-info">
              <div className="work-title">
                <h3>03</h3>
                <div>
                  <h4>Primetrade</h4>
                  <p>Web Development</p>
                </div>
              </div>
              <h4>Tools and features</h4>
              <p>React, Node.js, MongoDB, WebSockets, Tailwind CSS</p>
            </div>
            <WorkImage image="src/assets/images/primetrade.png" alt="Primetrade" />
          </div>
          <div className="work-box">
            <div className="work-info">
              <div className="work-title">
                <h3>04</h3>
                <div>
                  <h4>DRAKZ</h4>
                  <p>Web Development</p>
                </div>
              </div>
              <h4>Tools and features</h4>
              <p>MERN Stack, Express, React, Node.js, MongoDB</p>
            </div>
            <WorkImage image="src/assets/images/DRAKZ.png" alt="DRAKZ" />
          </div>
          <div className="work-box">
            <div className="work-info">
              <div className="work-title">
                <h3>05</h3>
                <div>
                  <h4>Movie Recommender</h4>
                  <p>AI/ML</p>
                </div>
              </div>
              <h4>Tools and features</h4>
              <p>Python, Streamlit, Pandas, Scikit-learn</p>
            </div>
            <WorkImage image="src/assets/images/Movie-Recommender.png" alt="Movie Recommender" />
          </div>
          <div className="work-box">
            <div className="work-info">
              <div className="work-title">
                <h3>06</h3>
                <div>
                  <h4>Trend Scrapper</h4>
                  <p>Web Development</p>
                </div>
              </div>
              <h4>Tools and features</h4>
              <p>Python, BeautifulSoup, Selenium, Pandas</p>
            </div>
            <WorkImage image="src/assets/images/trend_scrapper.png" alt="Trend Scrapper" />
          </div>
          <div className="work-box">
            <div className="work-info">
              <div className="work-title">
                <h3>07</h3>
                <div>
                  <h4>Healthcare Chatbot</h4>
                  <p>AI/ML</p>
                </div>
              </div>
              <h4>Tools and features</h4>
              <p>Python, Streamlit, NLP, Scikit-learn</p>
            </div>
            <WorkImage image="src/assets/images/HealthBot.png" alt="Healthcare Chatbot" />
          </div>
          <div className="work-box">
            <div className="work-info">
              <div className="work-title">
                <h3>08</h3>
                <div>
                  <h4>AI vs Human Text Classification</h4>
                  <p>AI/ML</p>
                </div>
              </div>
              <h4>Tools and features</h4>
              <p>Python, TensorFlow, Scikit-learn, NLTK</p>
            </div>
            <WorkImage image="src/assets/images/AI_vs_Human.png" alt="AI vs Human Text Classification" />
          </div>
          <div className="work-box">
            <div className="work-info">
              <div className="work-title">
                <h3>09</h3>
                <div>
                  <h4>EI & DS Lab Website</h4>
                  <p>Web Development</p>
                </div>
              </div>
              <h4>Tools and features</h4>
              <p>React, Next.js, Tailwind CSS, Vercel</p>
            </div>
            <WorkImage image="src/assets/images/EIDS.png" alt="EI & DS Lab Website" />
          </div>
          <div className="work-box">
            <div className="work-info">
              <div className="work-title">
                <h3>10</h3>
                <div>
                  <h4>Restaurant App</h4>
                  <p>Web Development</p>
                </div>
              </div>
              <h4>Tools and features</h4>
              <p>HTML, CSS, JavaScript, React</p>
            </div>
            <WorkImage image="src/assets/images/restaurant_app.png" alt="Restaurant App" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;
