import { useMemo } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import headerImg from "../assets/img/header-img.svg";

export const Banner = () => {
  const stars = useMemo(
    () =>
      Array.from({ length: 56 }, (_, i) => ({
        id: i,
        size: 1 + Math.random() * 2.5,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 4 + Math.random() * 8,
      })),
    []
  );

  return (
    <section className="banner hero-neo" id="home">
      <div className="starfield" aria-hidden="true">
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

      <Container>
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

              <a href="#projects" className="hero-cta star-hover">
                View My Work
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
