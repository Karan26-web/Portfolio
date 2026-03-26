import { useEffect, useState } from "react";

const randomInRange = (min, max) => min + Math.random() * (max - min);

export const Meteor = () => {
  const [meteors, setMeteors] = useState([]);

  useEffect(() => {
    let timeoutId;

    const spawnMeteor = () => {
      const direction = Math.random() > 0.5 ? "rtl" : "ltr";
      const meteor = {
        id: `${Date.now()}-${Math.random()}`,
        direction,
        top: randomInRange(-8, 14),
        left: direction === "rtl" ? randomInRange(72, 96) : randomInRange(4, 28),
        duration: randomInRange(3, 4),
        rotateStart: direction === "rtl" ? randomInRange(30, 42) : randomInRange(-42, -30),
        rotateEnd: direction === "rtl" ? randomInRange(42, 54) : randomInRange(-30, -18),
        scale: randomInRange(0.9, 1.15),
      };

      setMeteors((prev) => [...prev.slice(-1), meteor]);
      timeoutId = setTimeout(spawnMeteor, randomInRange(4000, 5000));
    };

    timeoutId = setTimeout(spawnMeteor, randomInRange(900, 1800));

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="meteor-container" aria-hidden="true">
      {meteors.map((meteor) => (
        <span
          key={meteor.id}
          className={`meteor meteor--${meteor.direction}`}
          style={{
            top: `${meteor.top}%`,
            left: `${meteor.left}%`,
            animationDuration: `${meteor.duration}s`,
            "--meteor-rotate-start": `${meteor.rotateStart}deg`,
            "--meteor-rotate-end": `${meteor.rotateEnd}deg`,
            "--meteor-scale": meteor.scale,
          }}
          onAnimationEnd={() => {
            setMeteors((prev) => prev.filter((item) => item.id !== meteor.id));
          }}
        />
      ))}
    </div>
  );
};
