import { Container } from "react-bootstrap";
import { motion } from "framer-motion";
import { FiCompass } from "react-icons/fi";
import { SectionHeading } from "./SectionHeading";

const highlights = [
  "Led strategic initiatives and planning for flagship Space Club programs.",
  "Coordinated cross-functional teams to execute events, sessions, and outreach activities.",
  "Managed collaborations with student communities and external partners for joint initiatives.",
  "Acted as a key point of coordination between club members and leadership to keep projects aligned.",
];

export const Leadership = () => {
  return (
    <section className="neo-section leadership-section" id="leadership">
      <Container>
        <SectionHeading
          title="Leadership & Interests"
          description="Community leadership and space-focused initiatives that strengthened execution, collaboration, and team ownership."
        />

        <motion.article
          className="glass-card leadership-card star-hover"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55 }}
        >
          <span className="leadership-tag">
            <FiCompass aria-hidden="true" />
            Space Leadership
          </span>
          <h3>Secretary — Nebula Pioneers (Space Club), IIT Madras</h3>

          <ul className="leadership-points">
            {highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </motion.article>
      </Container>
    </section>
  );
};
