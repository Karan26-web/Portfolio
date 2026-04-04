import { useEffect, useMemo, useRef, useState } from "react";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { SiWhatsapp, SiInstagram } from "react-icons/si";

const GLITCH_DURATION = 1700;

const BH_PARTICLES = [
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

export const CosmicFooter = () => {
  // ── Footer interaction state ──────────────────────────────────────────────
  const [isHovering, setIsHovering] = useState(false);
  const [isGlitching, setIsGlitching] = useState(false);
  const [hasClicked, setHasClicked] = useState(false);
  const [showerBurstId, setShowerBurstId] = useState(0);
  const resetTimer = useRef(null);

  // ── Direct-DOM scroll refs (zero React re-renders on scroll) ─────────────
  const containerRef = useRef(null);
  const starFarRef = useRef(null);
  const nebulaRef = useRef(null);
  const planetLayerRef = useRef(null);
  const starBrightRef = useRef(null);
  const bhZoneRef = useRef(null);

  // ── Static data ───────────────────────────────────────────────────────────
  const farStars = useMemo(
    () =>
      Array.from({ length: 110 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 140 - 20,
        size: 0.7 + Math.random() * 1.1,
        opacity: 0.2 + Math.random() * 0.6,
        delay: Math.random() * 7,
        dur: 2.8 + Math.random() * 3.5,
      })),
    []
  );

  const brightStars = useMemo(
    () =>
      Array.from({ length: 35 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 140 - 20,
        size: 1.6 + Math.random() * 2.2,
        opacity: 0.55 + Math.random() * 0.45,
        delay: Math.random() * 5,
        dur: 1.8 + Math.random() * 2.4,
      })),
    []
  );

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

  // ── rAF scroll animation ──────────────────────────────────────────────────
  useEffect(() => {
    let rafId = null;

    const tick = () => {
      rafId = null;
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const offset = rect.top + rect.height / 2 - window.innerHeight / 2;

      if (starFarRef.current)
        starFarRef.current.style.transform =
          `translateY(${(offset * 0.05).toFixed(2)}px)`;

      if (nebulaRef.current)
        nebulaRef.current.style.transform =
          `translateY(${(offset * 0.09).toFixed(2)}px)`;

      if (planetLayerRef.current) {
        const ty = offset * 0.20;
        const tx = offset * -0.04;
        const sc = 1 + Math.max(-0.08, Math.min(0.15, offset * -0.00012));
        planetLayerRef.current.style.transform =
          `translate(${tx.toFixed(2)}px, ${ty.toFixed(2)}px) scale(${sc.toFixed(4)})`;
      }

      if (starBrightRef.current)
        starBrightRef.current.style.transform =
          `translateY(${(offset * 0.14).toFixed(2)}px)`;

      // Blackhole: fastest layer — only on desktop (mobile CSS handles positioning)
      if (bhZoneRef.current && window.innerWidth > 768) {
        const bhTy = Math.max(-70, Math.min(70, offset * 0.28));
        bhZoneRef.current.style.transform =
          `translateY(calc(-50% + ${bhTy.toFixed(2)}px))`;
      }
    };

    const onScroll = () => {
      if (rafId === null) rafId = requestAnimationFrame(tick);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  // ── Cleanup ───────────────────────────────────────────────────────────────
  useEffect(() => {
    return () => {
      if (resetTimer.current) window.clearTimeout(resetTimer.current);
      document.body.classList.remove("blackhole-glitch");
    };
  }, []);

  const onTrigger = () => {
    setHasClicked(true);
    setShowerBurstId((p) => p + 1);
    if (resetTimer.current) { window.clearTimeout(resetTimer.current); resetTimer.current = null; }
    setIsGlitching(true);
    // Apply both local blackhole glitch and global full-site glitch
    document.body.classList.add("blackhole-glitch", "glitch-active");
    resetTimer.current = window.setTimeout(() => {
      setIsGlitching(false);
      document.body.classList.remove("blackhole-glitch", "glitch-active");
      resetTimer.current = null;
    }, GLITCH_DURATION);
  };

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div ref={containerRef} className="cosmic-scene">

      {/* ── Parallax layers — span entire scene ── */}
      <div ref={starFarRef} className="sh-layer" aria-hidden="true">
        {farStars.map((s) => (
          <span key={s.id} className="sh-star" style={{
            left: `${s.x}%`, top: `${s.y}%`,
            width: `${s.size}px`, height: `${s.size}px`,
            opacity: s.opacity,
            animationDelay: `${s.delay}s`, animationDuration: `${s.dur}s`,
          }} />
        ))}
      </div>

      <div ref={nebulaRef} className="sh-layer sh-nebula-layer" aria-hidden="true">
        <span className="sh-nebula sh-nebula-purple" />
        <span className="sh-nebula sh-nebula-cyan" />
        <span className="sh-nebula sh-nebula-mid" />
      </div>

      <div ref={planetLayerRef} className="sh-layer sh-planet-layer" aria-hidden="true">
        <span className="sh-planet-halo" />
        <div className="sh-planet"><span className="sh-ring" /></div>
      </div>

      <div ref={starBrightRef} className="sh-layer" aria-hidden="true">
        {brightStars.map((s) => (
          <span key={s.id} className="sh-star sh-star--bright" style={{
            left: `${s.x}%`, top: `${s.y}%`,
            width: `${s.size}px`, height: `${s.size}px`,
            opacity: s.opacity,
            animationDelay: `${s.delay}s`, animationDuration: `${s.dur}s`,
          }} />
        ))}
      </div>

      {/* Seamless blend from previous section */}
      <div className="sh-fade-top" aria-hidden="true" />

      {/* ── Footer — full viewport height, all content centered ── */}
      <footer className="neo-footer cs-footer-stage" role="contentinfo">

        {/* Atmospheric decorations */}
        <div className="footer-nebula" aria-hidden="true" />

        <div className="footer-stars" aria-hidden="true">
          {footerStars.map((star) => (
            <span key={star.id} className="footer-star" style={{
              left: `${star.x}%`, top: `${star.y}%`,
              width: `${star.size}px`, height: `${star.size}px`,
              animationDelay: `${star.delay}s`,
              "--drift-x": `${star.driftX}px`, "--drift-y": `${star.driftY}px`,
            }} />
          ))}
        </div>

        <div className="footer-shooting-stars" aria-hidden="true">
          {footerMeteors.map((m) => (
            <span key={m.id} className="footer-shooting-star" style={{
              top: m.top, left: m.left, width: m.length,
              animationDuration: m.duration, animationDelay: m.delay,
            }} />
          ))}
        </div>

        <div key={showerBurstId} className={`asteroid-shower-layer${isGlitching ? " active" : ""}`} aria-hidden="true">
          {asteroidShower.map((a) => (
            <span key={a.id} className="asteroid-shower-item" style={{
              "--asteroid-top": a.top, "--asteroid-right": a.right,
              "--asteroid-size": a.size, "--asteroid-delay": a.delay,
              "--asteroid-dur": a.duration, "--asteroid-angle": a.angle,
              "--asteroid-shift-x": a.shiftX, "--asteroid-shift-y": a.shiftY,
              "--asteroid-tail-scale": a.tailScale,
            }} />
          ))}
        </div>

        <div key={`ms-${showerBurstId}`} className={`meteor-shower-layer${isGlitching ? " active" : ""}`} aria-hidden="true">
          {meteorShower.map((m) => (
            <span key={m.id} className="meteor-shower-item" style={{
              "--meteor-top": m.top, "--meteor-right": m.right,
              "--meteor-length": m.length, "--meteor-thickness": m.thickness,
              "--meteor-delay": m.delay, "--meteor-dur": m.duration,
              "--meteor-angle": m.angle,
              "--meteor-shift-x": m.shiftX, "--meteor-shift-y": m.shiftY,
            }} />
          ))}
        </div>

        {/* Signature — perfectly centered */}
        <div className="cs-footer-center">
          <p className="footer-signature">
            © 2026 Karan Kumar&nbsp;&nbsp;·&nbsp;&nbsp;Designed with product thinking &amp; cosmic curiosity
          </p>

          {/* Social Media Icons */}
          <div className="footer-socials">
            <a
              className="footer-social-link"
              href="https://www.linkedin.com/in/karan-kumar-4360a82b4/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
            >
              <FiLinkedin />
            </a>
            <a
              className="footer-social-link"
              href="https://github.com/Karan26-web"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
            >
              <FiGithub />
            </a>
            <a
              className="footer-social-link"
              href="https://wa.me/918789949389?text=Heyy Karan, got ur contact from ur portfolio."
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
            >
              <SiWhatsapp />
            </a>
            <a
              className="footer-social-link"
              href="mailto:karankumarofficial66@gmail.com"
              aria-label="Email"
            >
              <FiMail />
            </a>
            <a
              className="footer-social-link"
              href="https://www.instagram.com/__karano1/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
            >
              <SiInstagram />
            </a>
          </div>
        </div>

        {/* Blackhole — absolute left, non-layout, scroll-animated */}
        <div
          ref={bhZoneRef}
          className={`footer-blackhole-zone${isHovering ? " is-hovering" : ""}${isGlitching ? " is-glitching" : ""}`}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <button type="button" className="blackhole-trigger" onClick={onTrigger}>
            {hasClicked ? "Told you." : "Do Not Click"}
          </button>

          <div className="blackhole-particle-field" aria-hidden="true">
            {BH_PARTICLES.map((p, i) => (
              <span key={`${p.x}-${p.y}-${i}`} className="blackhole-particle" style={{
                "--px": `${p.x}px`, "--py": `${p.y}px`,
                width: `${p.size}px`, height: `${p.size}px`,
                animationDelay: `${p.delay}s`,
              }} />
            ))}
          </div>

          <div className="blackhole-core-wrap" aria-hidden="true">
            <span className="blackhole-accretion" />
            <span className="blackhole-ring" />
            <span className="blackhole-core" />
            <span className="blackhole-lens" />
          </div>
        </div>
      </footer>
    </div>
  );
};
