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
      <h2>
        {title}
        <span className="section-pointer" aria-hidden="true" />
      </h2>
      {description ? <p>{description}</p> : null}
    </motion.div>
  );
};
