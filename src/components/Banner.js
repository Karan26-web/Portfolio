import { useMemo } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import headerImg from "../assets/img/header-img.svg";
import { GlassLayers } from "./LiquidGlass";
import { WebGLShader } from "./WebGLShader";

export const Banner = () => {
  const stars = useMemo(
    () =>
      Array.from({ length: 200 }, (_, i) => ({
        id: i,
        size: 0.8 + Math.random() * 2.8,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 6,
        duration: 3 + Math.random() * 9,
        opacity: 0.4 + Math.random() * 0.6,
      })),
    []
  );

  return (
    <section className="banner hero-neo" id="home" style={{ background: "#000" }}>
      {/* Bottom wave */}
      <WebGLShader position="bottom" />
      {/* Top wave — flipped */}
      <WebGLShader position="top" />
      {/* Slim strip just under the navbar */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 160,
          overflow: "hidden",
          zIndex: 1,
          pointerEvents: "none",
        }}
      >
        <WebGLShader position="bottom" />
      </div>

      <div className="starfield" aria-hidden="true" style={{ zIndex: 1 }}>
        {stars.map((star) => (
          <span
            key={star.id}
            className="star"
            style={{
              width: `${star.size}px`,
              height: `${star.size}px`,
              left: `${star.x}%`,
              top: `${star.y}%`,
              animationDelay: `${star.delay}s`,
              animationDuration: `${star.duration}s`,
              opacity: star.opacity,
            }}
          />
        ))}
      </div>

      <motion.div
        className="hero-planet parallax slow"
        aria-hidden="true"
        animate={{ y: [0, -20, 0], rotate: [0, 4, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="hero-planet-ring parallax fast"
        aria-hidden="true"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
      />

      <Container style={{ position: "relative", zIndex: 2 }}>
        <Row className="align-items-center g-5">
          <Col xs={12} lg={6}>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <p className="hero-kicker">Welcome to my Universe..</p>
              <h1>
                Hi, I&apos;m Karan
                <span className="hero-role">Game Designer & Product Builder</span>
              </h1>

              <p>
                I design immersive digital experiences and data-driven products.
              </p>

              <a
                href="#projects"
                className="hero-cta star-hover"
                style={{
                  position: "relative",
                  background: "transparent",
                  border: "1px solid rgba(255,255,255,0.3)",
                  boxShadow: "0 6px 20px rgba(0,0,0,0.25)",
                }}
              >
                <GlassLayers tint="rgba(87, 236, 255, 0.1)" />
                <span style={{ position: "relative", zIndex: 3 }}>View My Work</span>
              </a>
            </motion.div>
          </Col>

          <Col xs={12} lg={6}>
            <motion.div
              className="hero-visual parallax medium"
              initial={{ opacity: 0, scale: 0.92, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.12, ease: "easeOut" }}
            >
              <img src={headerImg} alt="Floating astronaut" loading="eager" />
              <span className="hero-orb" aria-hidden="true" />
            </motion.div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
