import { Container } from "react-bootstrap";
import { motion } from "framer-motion";
import { SectionHeading } from "./SectionHeading";
import { RGBWaveShader } from "./RGBWaveShader";

const experiences = [
  {
    role: "Game Design",
    roleColor: "#ffffff",
    company: "Convegenius",
    period: "Feb 2026 - Present",
    points: [
      "Designed and iterated game loops to improve learner engagement.",
      "Collaborated with developers and designers on UX-informed mechanics.",
      "Used player feedback and analytics to tune difficulty and retention.",
    ],
  },
  {
    role: "Product Designer",
    roleColor: "#ffffff",
    company: "Cosmic Sole",
    period: "Jan 2025",
    points: [
      "Mapped user journeys and translated product goals into interface systems.",
      "Worked cross-functionally to improve engagement through data-backed decisions.",
      "Built clear prototypes and design specs for fast implementation cycles.",
    ],
  },
];

export const Experience = () => {
  return (
    <section className="neo-section experience-section" id="experience">
      <RGBWaveShader />
      <Container>
        <SectionHeading
          title="Experience"
          description="A timeline inspired by orbital trajectories across design, product, and game development work."
        />

        <div className="orbit-timeline">
          {experiences.map((item, index) => (
            <motion.article
              key={item.company}
              className="glass-card timeline-node star-hover"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, delay: index * 0.12 }}
            >
              <span className="timeline-dot" aria-hidden="true" />
              <p className="timeline-period">{item.period}</p>
              <h3 style={{ color: item.roleColor }}>{item.role}</h3>
              <h4>{item.company}</h4>
              <ul>
                {item.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  );
};
