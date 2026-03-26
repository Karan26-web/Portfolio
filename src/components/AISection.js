import { Container, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import {
  SiClaude,
  SiGooglegemini,
  SiJupyter,
  SiNumpy,
  SiOpenai,
  SiPandas,
  SiPython,
  SiScikitlearn,
  SiTensorflow,
} from "react-icons/si";
import { SectionHeading } from "./SectionHeading";

const foundations = [
  "Machine Learning Algorithms",
  "Neural Networks & Deep Learning",
  "Natural Language Processing",
  "Data Preprocessing & Feature Engineering",
];

const tools = [
  "Proficiency in using AI for ideation, coding assistance, product direction, and faster experimentation.",
  "Prompt engineering workflows for consistent and useful LLM outputs.",
  "AI-Powered Product Design",
  "LLM Integration & API Usage",
  "AI for Game Design & Balancing",
];

const tech = [
  { name: "Python", icon: SiPython, color: "#4b8bbe" },
  { name: "TensorFlow", icon: SiTensorflow, color: "#ff6f00" },
  { name: "Pandas", icon: SiPandas, color: "#e4e8ff" },
  { name: "NumPy", icon: SiNumpy, color: "#4dabcf" },
  { name: "Scikit-learn", icon: SiScikitlearn, color: "#f7931e" },
  { name: "ChatGPT", icon: SiOpenai, color: "#f0f6ff" },
  { name: "Claude", icon: SiClaude, color: "#ffb894" },
  { name: "Gemini", icon: SiGooglegemini, color: "#9ec2ff" },
  { name: "Jupyter", icon: SiJupyter, color: "#f39b35" },
];

export const AISection = () => {
  return (
    <section className="neo-section ai-section" id="ai">
      <Container>
        <SectionHeading
          title="AI & Machine Learning"
          description="Applied AI proficiency focused on practical product outcomes through experimentation, ML workflows, and reliable prompt engineering."
        />

        <Row className="g-4">
          <Col md={6}>
            <motion.article
              className="glass-card ai-card star-hover"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55 }}
            >
              <h3>AI/ML Fundamentals</h3>
              <ul>
                {foundations.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </motion.article>
          </Col>

          <Col md={6}>
            <motion.article
              className="glass-card ai-card star-hover"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, delay: 0.1 }}
            >
              <h3>AI Tools & Platforms</h3>
              <ul>
                {tools.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </motion.article>
          </Col>
        </Row>

        <motion.div
          className="glass-card ai-tech-card star-hover"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, delay: 0.05 }}
        >
          <div className="ai-tech-wrap">
            {tech.map(({ name, icon: Icon, color }) => (
              <span key={name} className="ai-tech-chip">
                <span className="ai-tech-icon" style={{ "--ai-tech-icon-color": color }} aria-hidden="true">
                  <Icon />
                </span>
                <span>{name}</span>
              </span>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
};
