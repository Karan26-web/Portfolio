import { motion } from "framer-motion";

export const SectionHeading = ({ title, description }) => {
  return (
    <motion.div
      className="section-heading"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <h2 className="skills-title">
        {title}
        <span className="skills-title-dot" aria-hidden="true" />
      </h2>
      <span className="skills-title-line" aria-hidden="true" />
      {description ? <p className="skills-subtitle">{description}</p> : null}
    </motion.div>
  );
};
