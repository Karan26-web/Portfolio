import { Container, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import { FiAperture, FiGrid, FiBarChart2 } from "react-icons/fi";
import { SectionHeading } from "./SectionHeading";
import { CloudLightning } from "./CloudLightning";

const pillars = [
  {
    title: "Product Thinking",
    icon: FiAperture,
    text: "Framing user problems, defining outcomes, and turning ambiguity into clear product direction.",
  },
  {
    title: "UI/UX Design",
    icon: FiGrid,
    text: "Crafting user flows, wireframes, and polished interfaces that feel intuitive and alive.",
  },
  {
    title: "Data Analysis",
    icon: FiBarChart2,
    text: "Using analytics and experimentation to validate decisions and optimize engagement.",
  },
];

export const About = () => {
  return (
    <section className="neo-section about-section" id="about">
      <CloudLightning />
      <Container>
        <SectionHeading
          title="About Me"
          description="IIT Madras student blending product strategy, data-driven thinking, and game design to build immersive digital experiences."
        />

        <Row className="g-4">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <Col key={pillar.title} xs={12} md={4}>
                <motion.article
                  className="glass-card feature-card star-hover"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="feature-icon-wrap">
                    <Icon aria-hidden="true" />
                  </div>
                  <h3>{pillar.title}</h3>
                  <p>{pillar.text}</p>
                </motion.article>
              </Col>
            );
          })}
        </Row>
      </Container>
    </section>
  );
};
