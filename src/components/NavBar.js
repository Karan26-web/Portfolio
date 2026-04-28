import { useEffect, useMemo, useRef, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { SiInstagram } from "react-icons/si";
import { GlassLayers } from "./LiquidGlass";

const links = [
  { id: "home", label: "Home", href: "#home" },
  { id: "about", label: "About", href: "#about" },
  { id: "experience", label: "Experience", href: "#experience" },
  { id: "projects", label: "Projects", href: "#projects" },
  { id: "skills", label: "Skills", href: "#skills" },
  { id: "leadership", label: "Leadership", href: "#leadership" },
  { id: "ai", label: "AI", href: "#ai" },
];

export const NavBar = () => {
  const [activeLink, setActiveLink] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [orbitIndicator, setOrbitIndicator] = useState({ x: 0, trail: 34, ready: false });
  const navLinksRef = useRef(null);
  const linkRefs = useRef({});
  const sectionLinks = useMemo(() => links.filter((item) => item.href.startsWith("#")), []);
  const navbarStars = useMemo(
    () =>
      Array.from({ length: 20 }, (_, id) => ({
        id,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 1 + Math.random() * 2,
        delay: Math.random() * 7,
        duration: 3 + Math.random() * 5,
      })),
    []
  );

  useEffect(() => {
    const updateOrbitIndicator = () => {
      const container = navLinksRef.current;
      const activeNode = linkRefs.current[activeLink];
      if (!container || !activeNode) return;

      const containerRect = container.getBoundingClientRect();
      const activeRect = activeNode.getBoundingClientRect();
      const centerX = activeRect.left - containerRect.left + activeRect.width / 2;
      const trail = Math.max(28, Math.min(76, activeRect.width * 0.55));

      setOrbitIndicator((prev) => {
        if (prev.x === centerX && prev.trail === trail && prev.ready) return prev;
        return { x: centerX, trail, ready: true };
      });
    };

    updateOrbitIndicator();
    window.addEventListener("resize", updateOrbitIndicator);

    return () => {
      window.removeEventListener("resize", updateOrbitIndicator);
    };
  }, [activeLink, expanded]);

  useEffect(() => {
    const sections = sectionLinks
      .map((item) => ({ id: item.id, element: document.querySelector(item.href) }))
      .filter((entry) => entry.element);

    const onScroll = () => {
      setScrolled(window.scrollY > 24);

      const probeLine = window.scrollY + window.innerHeight * 0.34;
      let nextActive = sectionLinks[0]?.id || "home";

      sections.forEach(({ id, element }) => {
        if (element.offsetTop <= probeLine) {
          nextActive = id;
        }
      });

      setActiveLink((prev) => (prev === nextActive ? prev : nextActive));
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [sectionLinks]);

  const onLinkClick = (id) => {
    setActiveLink(id);
    setExpanded(false);
  };

  return (
    <Navbar expand="lg" expanded={expanded} onToggle={setExpanded} className={`neo-navbar ${scrolled ? "scrolled" : ""}`}>
      <Container fluid className="neo-navbar-shell">
        <div className="neo-navbar-stars" aria-hidden="true">
          {navbarStars.map((star) => (
            <span
              key={star.id}
              className="neo-navbar-star"
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                animationDelay: `${star.delay}s`,
                animationDuration: `${star.duration}s`,
              }}
            />
          ))}
        </div>

        <Navbar.Brand href="#home" className="neo-brand" onClick={() => onLinkClick("home")}>
          <span className="neo-brand-text">Karan Kumar</span>
          <span className="neo-brand-orbit" aria-hidden="true" />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" className="neo-toggle" />

        <Navbar.Collapse id="responsive-navbar-nav">
          <div className="neo-nav-center">
            <Nav className="neo-nav-links" ref={navLinksRef}>
              {links.map((item) => (
                <Nav.Link
                  key={item.id}
                  href={item.href}
                  ref={(node) => {
                    linkRefs.current[item.id] = node;
                  }}
                  className={`navbar-link ${activeLink === item.id ? "active-navbar-link" : ""}`}
                  aria-current={activeLink === item.id ? "page" : undefined}
                  onClick={() => onLinkClick(item.id)}
                >
                  <span className="neo-link-label">{item.label}</span>
                </Nav.Link>
              ))}
              <span
                className={`neo-orbit-indicator ${orbitIndicator.ready ? "is-ready" : ""}`}
                style={{
                  "--orbit-x": `${orbitIndicator.x}px`,
                  "--orbit-trail": `${orbitIndicator.trail}px`,
                }}
                aria-hidden="true"
              />
            </Nav>
          </div>

          <div className="neo-navbar-right">
            {[
              { href: "https://github.com/Karan26-web", icon: <FiGithub />, label: "GitHub", target: "_blank" },
              { href: "https://www.linkedin.com/in/karan-kumar-4360a82b4/", icon: <FiLinkedin />, label: "LinkedIn", target: "_blank" },
              { href: "https://www.instagram.com/__karano1/", icon: <SiInstagram />, label: "Instagram", target: "_blank" },
              { href: "mailto:karankumarofficial66@gmail.com", icon: <FiMail />, label: "Email", target: undefined },
            ].map(({ href, icon, label, target }) => (
              <a
                key={label}
                className="neo-social-btn"
                href={href}
                target={target}
                rel={target ? "noreferrer" : undefined}
                aria-label={label}
                style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.18)" }}
              >
                <GlassLayers tint="rgba(87, 200, 255, 0.08)" />
                <span style={{ position: "relative", zIndex: 3 }}>{icon}</span>
              </a>
            ))}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
