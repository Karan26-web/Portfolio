import { Container } from "react-bootstrap";
import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { SiWhatsapp } from "react-icons/si";
import { SectionHeading } from "./SectionHeading";
import { GlassLayers } from "./LiquidGlass";

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
            {[
              { href: "https://www.linkedin.com/in/karan-kumar-4360a82b4/", icon: <FiLinkedin />, label: "LinkedIn", tint: "rgba(87,160,255,0.1)", extra: "", target: "_blank" },
              { href: "https://github.com/Karan26-web", icon: <FiGithub />, label: "GitHub", tint: "rgba(180,180,255,0.1)", extra: "", target: "_blank" },
              { href: whatsappHref, icon: <SiWhatsapp />, label: "WhatsApp", tint: "rgba(37,211,102,0.1)", extra: " whatsapp-btn", target: "_blank" },
              { href: "mailto:karankumarofficial66@gmail.com", icon: <FiMail />, label: "Email", tint: "rgba(87,200,255,0.1)", extra: "", target: undefined },
            ].map(({ href, icon, label, tint, extra, target }) => (
              <a
                key={label}
                className={`contact-social-btn${extra}`}
                href={href}
                target={target}
                rel={target ? "noreferrer" : undefined}
                aria-label={label}
                style={{ position: "relative", background: "transparent", border: "1px solid rgba(255,255,255,0.2)" }}
              >
                <GlassLayers tint={tint} />
                <span className="contact-social-icon" style={{ position: "relative", zIndex: 3 }}>
                  {icon}
                </span>
                <span style={{ position: "relative", zIndex: 3 }}>{label}</span>
              </a>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
};
