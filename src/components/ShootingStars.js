import { useMemo } from "react";

const METEOR_COUNT = 18;
const STAR_COUNT = 520;

const randomBetween = (a, b) => a + Math.random() * (b - a);

export const ShootingStars = () => {
  const meteors = useMemo(
    () =>
      Array.from({ length: METEOR_COUNT }, (_, i) => ({
        id: i,
        top: `${randomBetween(2, 75)}%`,
        left: `${randomBetween(10, 95)}%`,
        duration: `${randomBetween(4.5, 9)}s`,
        delay: `${randomBetween(0, 14)}s`,
        size: `${randomBetween(100, 220)}px`,
      })),
    []
  );

  const stars = useMemo(
    () =>
      Array.from({ length: STAR_COUNT }, (_, i) => {
        // ~8% are large bright feature stars, rest are small
        const isBig = i % 13 === 0;
        return {
          id: i,
          top: `${randomBetween(0, 100)}%`,
          left: `${randomBetween(0, 100)}%`,
          size: isBig ? randomBetween(2.8, 4.2) : randomBetween(0.6, 2.2),
          delay: `${randomBetween(0, 8)}s`,
          duration: `${randomBetween(2.5, 11)}s`,
          opacity: isBig ? randomBetween(0.7, 1.0) : randomBetween(0.25, 0.85),
          glow: isBig ? 6 : 3,
        };
      }),
    []
  );

  return (
    <div className="shooting-stars-layer" aria-hidden="true">
      {/* Global fixed starfield — visible across all sections */}
      {stars.map((s) => (
        <span
          key={`star-${s.id}`}
          className="star"
          style={{
            position: "fixed",
            top: s.top,
            left: s.left,
            width: `${s.size}px`,
            height: `${s.size}px`,
            animationDelay: s.delay,
            animationDuration: s.duration,
            opacity: s.opacity,
            borderRadius: "50%",
            background: "rgba(214, 240, 255, 0.95)",
            boxShadow: `0 0 ${s.size * s.glow}px rgba(184,226,255,0.55)`,
          }}
        />
      ))}

      {/* Shooting meteors spread across the full viewport */}
      {meteors.map((m) => (
        <span
          key={`meteor-${m.id}`}
          className="shooting-star"
          style={{
            top: m.top,
            left: m.left,
            width: m.size,
            animationDuration: m.duration,
            animationDelay: m.delay,
          }}
        />
      ))}
    </div>
  );
};
