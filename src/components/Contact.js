import { Container } from "react-bootstrap";
import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { SiWhatsapp } from "react-icons/si";
import { SectionHeading } from "./SectionHeading";

export const Contact = () => {
  const whatsappMessage = "Heyy Karan, got ur contact from ur portfolio.";
  const rawWhatsappNumber = process.env.REACT_APP_WHATSAPP_NUMBER || "8789949389";
  const whatsappDigits = rawWhatsappNumber.replace(/\D/g, "");
  const whatsappNumber = whatsappDigits.length === 10 ? `91${whatsappDigits}` : whatsappDigits;
  const whatsappHref = whatsappNumber
    ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`
    : `https://wa.me/?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <section className="neo-section contact-section" id="contact">
      <Container>
        <SectionHeading
          title="Contact"
          description="Open to internships, freelance collaborations, and ambitious product ideas."
        />

        <motion.div
          className="glass-card contact-panel star-hover"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.6 }}
        >
          <div className="contact-cta-wrap">
            <span className="contact-cta-glow" aria-hidden="true" />
            <h3 className="contact-cta">Let&apos;s build something amazing 🚀</h3>
          </div>
          <p>karankumarofficial66@gmail.com</p>

          <div className="contact-socials">
            <a className="contact-social-btn" href="https://www.linkedin.com/in/karan-kumar-4360a82b4/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <span className="contact-social-icon">
                <FiLinkedin />
              </span>
              <span>LinkedIn</span>
            </a>
            <a className="contact-social-btn" href="https://github.com/Karan26-web" target="_blank" rel="noreferrer" aria-label="GitHub">
              <span className="contact-social-icon">
                <FiGithub />
              </span>
              <span>GitHub</span>
            </a>
            <a className="contact-social-btn whatsapp-btn" href={whatsappHref} target="_blank" rel="noreferrer" aria-label="WhatsApp">
              <span className="contact-social-icon">
                <SiWhatsapp />
              </span>
              <span>WhatsApp</span>
            </a>
            <a className="contact-social-btn" href="mailto:karankumarofficial66@gmail.com" aria-label="Email">
              <span className="contact-social-icon">
                <FiMail />
              </span>
              <span>Email</span>
            </a>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};
