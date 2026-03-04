import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Teaching Assistant</h4>
                <h5>IIIT Sri City</h5>
              </div>
              <div>
                <h3>2026</h3>
                <h5>Jan - Present</h5>
              </div>
            </div>
            <p>
              Teaching Assistant for Full Stack Development (FSD-1) Course. Guided students in Full Stack Development Course and resolved technical queries.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Research Intern</h4>
                <h5>Edge Intelligence and Distributed Systems Lab at IIIT Sri City</h5>
              </div>
               <div>
                <h3>2025</h3>
                <h5>Dec - Present</h5>
              </div>
            </div>
            <p>
              Selected as a Research Intern at the Edge Intelligence and Distributed Systems Lab at IIIT Sri City, contributing to a DST-funded TiHAN (IIT Hyderabad) project titled: "Adaptive Mobile IoT Networks Using UAV-Assisted Weighted Federated Learning for Disaster Response."
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Application Dev Domain Lead</h4>
                <h5>GDG IIIT Sri City</h5>
              </div>
              <div>
                <h3>2025</h3>
                <h5>Aug - Present</h5>
              </div>
            </div>
            <p>
              Spearheaded technical development for the chapter by mentoring 50+ members through hands-on workshops, driving a 20% increase in deployed applications.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Software Engineer Intern</h4>
                <h5>OntuneAI</h5>
              </div>
              <div>
                <h3>2025</h3>
                <h5>May - Oct</h5>
              </div>
            </div>
            <p>
              Engineered outbound AI agents handling 2000+ daily real estate calls, reducing manual screening by 40%. Optimized production prompt pipelines to boost intent recognition accuracy by 25% and overall reliability. Orchestrated enterprise releases and technical demos, directly contributing to securing 3 key client renewals.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>AI Developer Intern</h4>
                <h5>Rayi</h5>
              </div>
              <div>
                <h3>2025</h3>
                <h5>June - July</h5>
              </div>
            </div>
            <p>
              Shipped voice-enabled fintech LLM chatbot, onboarding 1,000+ beta users with 98% system uptime. Architected optimized PostgreSQL schemas with pooling, reducing financial query execution time by 30%. Integrated Redis caching and async endpoints, reducing API latency by 60ms for seamless voice features.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
