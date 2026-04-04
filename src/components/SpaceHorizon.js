import { useEffect, useMemo, useRef, useState } from "react";

export const SpaceHorizon = () => {
  const ref = useRef(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      setOffset(rect.top + rect.height / 2 - window.innerHeight / 2);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

  return (
    <div ref={ref} className="space-horizon" aria-hidden="true">
      {/* Layer 1 — far faint star field */}
      <div
        className="sh-layer"
        style={{ transform: `translateY(${offset * 0.07}px)` }}
      >
        {farStars.map((s) => (
          <span
            key={s.id}
            className="sh-star"
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              opacity: s.opacity,
              animationDelay: `${s.delay}s`,
              animationDuration: `${s.dur}s`,
            }}
          />
        ))}
      </div>

      {/* Layer 2 — nebula gas clouds */}
      <div
        className="sh-layer sh-nebula-layer"
        style={{ transform: `translateY(${offset * 0.13}px)` }}
      >
        <span className="sh-nebula sh-nebula-purple" />
        <span className="sh-nebula sh-nebula-cyan" />
        <span className="sh-nebula sh-nebula-mid" />
      </div>

      {/* Layer 3 — ringed planet */}
      <div
        className="sh-layer sh-planet-layer"
        style={{ transform: `translateY(${offset * 0.27}px)` }}
      >
        <span className="sh-planet-halo" />
        <div className="sh-planet">
          <span className="sh-ring" />
        </div>
      </div>

      {/* Layer 4 — bright near stars */}
      <div
        className="sh-layer"
        style={{ transform: `translateY(${offset * 0.19}px)` }}
      >
        {brightStars.map((s) => (
          <span
            key={s.id}
            className="sh-star sh-star--bright"
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              opacity: s.opacity,
              animationDelay: `${s.delay}s`,
              animationDuration: `${s.dur}s`,
            }}
          />
        ))}
      </div>

      {/* Gradient fades */}
      <div className="sh-fade-top" />
      <div className="sh-fade-bottom" />
    </div>
  );
};
