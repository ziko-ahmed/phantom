import { useEffect, useCallback, useState } from "react";
import { Project } from "../data/projectData";
import "./styles/ProjectOverlay.css";

interface ProjectOverlayProps {
    project: Project;
    onClose: () => void;
}

const ProjectOverlay = ({ project, onClose }: ProjectOverlayProps) => {
    const [closing, setClosing] = useState(false);

    const handleClose = useCallback(() => {
        setClosing(true);
        setTimeout(() => {
            onClose();
        }, 250);
    }, [onClose]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") handleClose();
        };
        document.addEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "hidden";

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "";
        };
    }, [handleClose]);

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) handleClose();
    };

    return (
        <div
            className={`overlay-backdrop ${closing ? "overlay-closing" : ""}`}
            onClick={handleBackdropClick}
        >
            <div className="overlay-panel">
                <div className="overlay-corner"></div>
                <button className="overlay-close" onClick={handleClose}>
                    ✕
                </button>

                <div className="overlay-image">
                    <img src={project.image} alt={project.title} />
                </div>

                <div className="overlay-details">
                    <div className="overlay-header">
                        <span className="overlay-number">{project.number}</span>
                        <div className="overlay-title-group">
                            <h3 className="overlay-title">{project.title}</h3>
                            <p className="overlay-category">{project.category}</p>
                        </div>
                    </div>

                    <p className="overlay-desc">{project.description}</p>

                    <p className="overlay-tech-label">Tech Stack</p>
                    <div className="overlay-tech-list">
                        {project.techStack.map((tech, i) => (
                            <span key={i} className="overlay-tech-tag">
                                {tech}
                            </span>
                        ))}
                    </div>

                    <p className="overlay-features-label">Key Features</p>
                    <ul className="overlay-features">
                        {project.features.map((feature, i) => (
                            <li key={i}>{feature}</li>
                        ))}
                    </ul>

                    <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="overlay-link"
                    >
                        View Project <span className="overlay-link-arrow">→</span>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ProjectOverlay;
