import { useState } from "react";
import { Col } from "react-bootstrap";
import { motion } from "framer-motion";
import { FiGithub } from "react-icons/fi";

export const ProjectCard = ({ title, description, githubUrl, stack, index }) => {
  const [tiltStyle, setTiltStyle] = useState({
    transform: "perspective(1000px) rotateX(0deg) rotateY(0deg)",
  });

  const onMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateY = (x / rect.width - 0.5) * 10;
    const rotateX = (0.5 - y / rect.height) * 10;

    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`,
    });
  };

  return (
    <Col xs={12} lg={6}>
      <motion.article
        className="glass-card project-card star-hover"
        style={tiltStyle}
        onMouseMove={onMove}
        onMouseLeave={() =>
          setTiltStyle({
            transform: "perspective(1000px) rotateX(0deg) rotateY(0deg)",
          })
        }
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ delay: index * 0.08, duration: 0.55 }}
      >
        <div className="project-card-body">
          <h3>{title}</h3>
          <p>{description}</p>

          <ul className="project-stack">
            {stack.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <div className="project-actions">
            <a href={githubUrl} target="_blank" rel="noreferrer" className="ghost-btn star-hover">
              <FiGithub aria-hidden="true" /> GitHub
            </a>
          </div>
        </div>
      </motion.article>
    </Col>
  );
};
