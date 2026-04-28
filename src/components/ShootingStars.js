import { useEffect, useRef } from "react";

const STAR_COUNT  = 160;
const METEOR_COUNT = 10;

export const ShootingStars = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let rafId;
    let W = window.innerWidth;
    let H = window.innerHeight;

    const resize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width  = W;
      canvas.height = H;
    };

    const stars = Array.from({ length: STAR_COUNT }, () => ({
      x: Math.random(),
      y: Math.random(),
      size: 0.5 + Math.random() * 2,
      opacity: 0.25 + Math.random() * 0.75,
      phase: Math.random() * Math.PI * 2,
      speed: 0.003 + Math.random() * 0.006,
    }));

    const meteors = Array.from({ length: METEOR_COUNT }, () => ({
      active: false,
      delay: Math.floor(60 + Math.random() * 300),
      x: 0, y: 0,
      progress: 0,
      length: 80 + Math.random() * 140,
      travelSpeed: 0.0004 + Math.random() * 0.0004,
    }));

    const COS = Math.cos(-Math.PI / 4);
    const SIN = Math.sin(-Math.PI / 4);

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      for (const s of stars) {
        s.phase += s.speed;
        const op = s.opacity * (0.55 + 0.45 * Math.sin(s.phase));
        ctx.beginPath();
        ctx.arc(s.x * W, s.y * H, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(214,240,255,${op.toFixed(2)})`;
        ctx.fill();
      }

      for (const m of meteors) {
        if (!m.active) {
          m.delay--;
          if (m.delay <= 0) {
            m.active = true;
            m.x = Math.random() * 0.9 + 0.05;
            m.y = Math.random() * 0.6;
            m.progress = 0;
            m.length = 80 + Math.random() * 140;
            m.travelSpeed = 0.0004 + Math.random() * 0.0004;
          }
          continue;
        }

        m.progress += m.travelSpeed;
        if (m.progress >= 1) {
          m.active = false;
          m.delay = Math.floor(180 + Math.random() * 480);
          continue;
        }

        const dist = m.progress * 700;
        const hx = m.x * W + dist * COS;
        const hy = m.y * H + dist * SIN;
        const tx = hx - m.length * COS;
        const ty = hy - m.length * SIN;

        const grad = ctx.createLinearGradient(tx, ty, hx, hy);
        grad.addColorStop(0, "rgba(255,255,255,0)");
        grad.addColorStop(1, "rgba(255,255,255,0.75)");

        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(hx, hy);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      rafId = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    draw();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0, left: 0,
        width: "100%", height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
};
