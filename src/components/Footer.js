import { useEffect, useMemo, useRef, useState } from "react";
import { Container } from "react-bootstrap";

const GLITCH_DURATION = 1700;
const particles = [
  { x: -56, y: -30, size: 2.1, delay: 0.1 },
  { x: -42, y: -8, size: 1.8, delay: 1.2 },
  { x: -26, y: -44, size: 2.4, delay: 0.6 },
  { x: -6, y: -22, size: 1.9, delay: 2.1 },
  { x: -60, y: 14, size: 1.7, delay: 1.7 },
  { x: -34, y: 20, size: 2.2, delay: 0.8 },
  { x: -10, y: 14, size: 1.6, delay: 1.4 },
  { x: -52, y: 38, size: 1.8, delay: 2.6 },
  { x: -22, y: 34, size: 2.3, delay: 0.3 },
];

export const Footer = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isGlitching, setIsGlitching] = useState(false);
  const [hasClicked, setHasClicked] = useState(false);
  const [showerBurstId, setShowerBurstId] = useState(0);
  const resetTimer = useRef(null);
  const footerStars = useMemo(
    () =>
      Array.from({ length: 16 }, (_, id) => ({
        id,
        x: 6 + Math.random() * 88,
        y: 8 + Math.random() * 74,
        size: 1 + Math.random() * 2.2,
        delay: Math.random() * 7,
        driftX: Math.round((Math.random() * 2 - 1) * 5),
        driftY: Math.round((Math.random() * 2 - 1) * 6),
      })),
    []
  );
  const footerMeteors = useMemo(
    () => [
      { id: 0, top: "26%", left: "84%", duration: "16s", delay: "4s", length: "120px" },
      { id: 1, top: "42%", left: "90%", duration: "18s", delay: "11s", length: "150px" },
    ],
    []
  );
  const asteroidShower = useMemo(
    () =>
      Array.from({ length: 18 }, (_, id) => ({
        id,
        top: `${Math.round(-18 + Math.random() * 74)}vh`,
        right: `${Math.round(-8 - Math.random() * 22)}vw`,
        size: `${Math.round(96 + Math.random() * 78)}px`,
        delay: `${(Math.random() * 0.58).toFixed(2)}s`,
        duration: `${(1.02 + Math.random() * 0.52).toFixed(2)}s`,
        angle: `${(-14 - Math.random() * 19).toFixed(2)}deg`,
        shiftX: `-${Math.round(130 + Math.random() * 34)}vw`,
        shiftY: `${Math.round(62 + Math.random() * 58)}vh`,
        tailScale: `${(1.2 + Math.random() * 0.8).toFixed(2)}`,
      })),
    []
  );
  const meteorShower = useMemo(
    () =>
      Array.from({ length: 62 }, (_, id) => ({
        id,
        top: `${Math.round(-20 + Math.random() * 84)}vh`,
        right: `${Math.round(-4 - Math.random() * 20)}vw`,
        length: `${Math.round(130 + Math.random() * 190)}px`,
        thickness: `${(1.2 + Math.random() * 2.2).toFixed(2)}px`,
        delay: `${(Math.random() * 0.95).toFixed(2)}s`,
        duration: `${(0.72 + Math.random() * 0.9).toFixed(2)}s`,
        angle: `${(-16 - Math.random() * 18).toFixed(2)}deg`,
        shiftX: `-${Math.round(132 + Math.random() * 42)}vw`,
        shiftY: `${Math.round(64 + Math.random() * 52)}vh`,
      })),
    []
  );

  useEffect(() => {
    return () => {
      if (resetTimer.current) {
        window.clearTimeout(resetTimer.current);
      }
      document.body.classList.remove("blackhole-glitch");
    };
  }, []);

  const onTrigger = () => {
    setHasClicked(true);
    setShowerBurstId((prev) => prev + 1);

    if (resetTimer.current) {
      window.clearTimeout(resetTimer.current);
      resetTimer.current = null;
    }

    setIsGlitching(true);
    document.body.classList.add("blackhole-glitch");

    resetTimer.current = window.setTimeout(() => {
      setIsGlitching(false);
      document.body.classList.remove("blackhole-glitch");
      resetTimer.current = null;
    }, GLITCH_DURATION);
  };

  return (
    <footer className="neo-footer">
      <div className="footer-nebula" aria-hidden="true" />
      <div className="footer-stars" aria-hidden="true">
        {footerStars.map((star) => (
          <span
            key={star.id}
            className="footer-star"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDelay: `${star.delay}s`,
              "--drift-x": `${star.driftX}px`,
              "--drift-y": `${star.driftY}px`,
            }}
          />
        ))}
      </div>

      <div className="footer-shooting-stars" aria-hidden="true">
        {footerMeteors.map((meteor) => (
          <span
            key={meteor.id}
            className="footer-shooting-star"
            style={{
              top: meteor.top,
              left: meteor.left,
              width: meteor.length,
              animationDuration: meteor.duration,
              animationDelay: meteor.delay,
            }}
          />
        ))}
      </div>

      <div key={showerBurstId} className={`asteroid-shower-layer ${isGlitching ? "active" : ""}`} aria-hidden="true">
        {asteroidShower.map((asteroid) => (
          <span
            key={asteroid.id}
            className="asteroid-shower-item"
            style={{
              "--asteroid-top": asteroid.top,
              "--asteroid-right": asteroid.right,
              "--asteroid-size": asteroid.size,
              "--asteroid-delay": asteroid.delay,
              "--asteroid-dur": asteroid.duration,
              "--asteroid-angle": asteroid.angle,
              "--asteroid-shift-x": asteroid.shiftX,
              "--asteroid-shift-y": asteroid.shiftY,
              "--asteroid-tail-scale": asteroid.tailScale,
            }}
          />
        ))}
      </div>

      <div
        key={`meteor-shower-${showerBurstId}`}
        className={`meteor-shower-layer ${isGlitching ? "active" : ""}`}
        aria-hidden="true"
      >
        {meteorShower.map((meteor) => (
          <span
            key={meteor.id}
            className="meteor-shower-item"
            style={{
              "--meteor-top": meteor.top,
              "--meteor-right": meteor.right,
              "--meteor-length": meteor.length,
              "--meteor-thickness": meteor.thickness,
              "--meteor-delay": meteor.delay,
              "--meteor-dur": meteor.duration,
              "--meteor-angle": meteor.angle,
              "--meteor-shift-x": meteor.shiftX,
              "--meteor-shift-y": meteor.shiftY,
            }}
          />
        ))}
      </div>

      <Container className="footer-inner">
        <p className="footer-signature">© 2026 Karan Kumar · Designed with product thinking &amp; cosmic curiosity 🚀</p>

        <div
          className={`footer-blackhole-zone ${isHovering ? "is-hovering" : ""} ${isGlitching ? "is-glitching" : ""}`}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <button type="button" className="blackhole-trigger" onClick={onTrigger}>
            {hasClicked ? "Told you." : "Do Not Click"}
          </button>

          <div className="blackhole-particle-field" aria-hidden="true">
            {particles.map((particle, index) => (
              <span
                key={`${particle.x}-${particle.y}-${index}`}
                className="blackhole-particle"
                style={{
                  "--px": `${particle.x}px`,
                  "--py": `${particle.y}px`,
                  width: `${particle.size}px`,
                  height: `${particle.size}px`,
                  animationDelay: `${particle.delay}s`,
                }}
              />
            ))}
          </div>

          <div className="blackhole-core-wrap" aria-hidden="true">
            <span className="blackhole-accretion" />
            <span className="blackhole-ring" />
            <span className="blackhole-core" />
            <span className="blackhole-lens" />
          </div>
        </div>
      </Container>
    </footer>
  );
};
