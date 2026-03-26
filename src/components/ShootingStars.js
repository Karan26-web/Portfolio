const meteors = [
  { top: "8%", left: "92%", duration: "7.2s", delay: "0s", size: "170px" },
  { top: "24%", left: "88%", duration: "5.8s", delay: "2.8s", size: "140px" },
  { top: "42%", left: "94%", duration: "6.6s", delay: "5.4s", size: "190px" },
];

export const ShootingStars = () => {
  return (
    <div className="shooting-stars-layer" aria-hidden="true">
      {meteors.map((meteor, index) => (
        <span
          key={index}
          className="shooting-star"
          style={{
            top: meteor.top,
            left: meteor.left,
            width: meteor.size,
            animationDuration: meteor.duration,
            animationDelay: meteor.delay,
          }}
        />
      ))}
    </div>
  );
};
