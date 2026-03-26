import { useMemo } from "react";
import { Container } from "react-bootstrap";
import {
  SiGithub,
  SiFigma,
  SiDocker,
  SiFlask,
  SiMongodb,
  SiPython,
  SiNodedotjs,
  SiExpress,
  SiVuedotjs,
  SiGit,
  SiCplusplus,
  SiJavascript as SiJsLogo,
} from "react-icons/si";
import { FiGitBranch, FiUser } from "react-icons/fi";

const orbits = [
  {
    id: "inner",
    label: "Programming",
    width: 430,
    height: 350,
    direction: "cw",
    duration: 18,
    nodes: [
      { name: "C++", icon: SiCplusplus, angle: 20, highlight: true, color: "#00599c" },
      { name: "Python", icon: SiPython, angle: 110, highlight: true, color: "#3776ab" },
      { name: "JavaScript", icon: SiJsLogo, angle: 200, highlight: true, color: "#f7df1e" },
      { name: "MongoDB", icon: SiMongodb, angle: 290, highlight: true, color: "#47a248" },
    ],
  },
  {
    id: "mid",
    label: "Frameworks & Tools",
    width: 740,
    height: 600,
    direction: "ccw",
    duration: 26,
    nodes: [
      { name: "Git", icon: SiGit, angle: 10, color: "#f1502f" },
      { name: "Node.js", icon: SiNodedotjs, angle: 70, color: "#68a063" },
      { name: "Express", icon: SiExpress, angle: 130, color: "#dbe7ff" },
      { name: "Flask", icon: SiFlask, angle: 190, color: "#ffffff" },
      { name: "Docker", icon: SiDocker, angle: 250, color: "#2496ed" },
      { name: "Vue", icon: SiVuedotjs, angle: 310, color: "#42b883" },
    ],
  },
  {
    id: "outer",
    label: "Design",
    width: 955,
    height: 815,
    direction: "cw",
    duration: 36,
    nodes: [
      { name: "Figma", icon: SiFigma, angle: 40, color: "#f24e1e" },
      { name: "GitHub", icon: SiGithub, angle: 130, color: "#ffffff" },
      { name: "User Research", icon: FiUser, angle: 220, color: "#ff61bc" },
      { name: "Design Systems", icon: FiGitBranch, angle: 310, color: "#ff61bc" },
    ],
  },
];

const stars = Array.from({ length: 40 }, (_, id) => ({
  id,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: 1 + Math.random() * 2,
  delay: Math.random() * 8,
}));

const angleToPos = (angle) => {
  const rad = (angle * Math.PI) / 180;
  return {
    left: 50 + Math.cos(rad) * 50,
    top: 50 + Math.sin(rad) * 50,
  };
};

export const Skills = () => {
  const mapped = useMemo(
    () =>
      orbits.map((orbit) => ({
        ...orbit,
        nodes: orbit.nodes.map((node) => ({
          ...node,
          ...angleToPos(node.angle),
        })),
      })),
    []
  );

  return (
    <section className="neo-section skills-section skills-section-cosmic" id="skills">
      <Container>
        <div className="skills-heading-wrap">
          <h2 className="skills-title">
            Skills
            <span className="skills-title-dot" aria-hidden="true" />
          </h2>
          <span className="skills-title-line" aria-hidden="true" />
          <p className="skills-subtitle">
            Planetary skill map across engineering, product design, and execution tooling.
          </p>
        </div>

        <div className="skills-cosmic-shell">
          <div className="skills-cosmic-stars" aria-hidden="true">
            {stars.map((star) => (
              <span
                key={star.id}
                className="skills-cosmic-star"
                style={{
                  left: `${star.x}%`,
                  top: `${star.y}%`,
                  width: `${star.size}px`,
                  height: `${star.size}px`,
                  animationDelay: `${star.delay}s`,
                }}
              />
            ))}
          </div>

          <div className="skills-cosmic-system">
            <span className="skills-ring-label skills-ring-label-outer">Design</span>
            <span className="skills-ring-label skills-ring-label-mid">Frameworks & Tools</span>
            <span className="skills-ring-label skills-ring-label-inner">Programming</span>

            {mapped.map((orbit) => (
              <div
                key={orbit.id}
                className={`skills-cosmic-orbit orbit-${orbit.id} orbit-${orbit.direction}`}
                style={{
                  "--orbit-w": `${orbit.width}px`,
                  "--orbit-h": `${orbit.height}px`,
                  "--orbit-dur": `${orbit.duration}s`,
                }}
              >
                <span className="skills-cosmic-path" aria-hidden="true" />

                {orbit.nodes.map((node) => {
                  const Icon = node.icon;
                  return (
                    <button
                      key={`${orbit.id}-${node.name}`}
                      type="button"
                      className={`skills-cosmic-node ${node.highlight ? "is-highlight" : ""}`}
                      style={{ left: `${node.left}%`, top: `${node.top}%`, "--node-color": node.color || "#d8e6ff" }}
                      title={node.name}
                      aria-label={node.name}
                    >
                      <span className="skills-cosmic-node-icon">
                        <Icon aria-hidden="true" />
                      </span>
                    </button>
                  );
                })}
              </div>
            ))}

            <div className="skills-cosmic-planet-wrap">
              <div className="skills-cosmic-planet">
                <span className="skills-cosmic-aura" aria-hidden="true" />
                <span className="skills-cosmic-highlight" aria-hidden="true" />
                <h3>Karan</h3>
              </div>
            </div>

            <span className="skills-cosmic-small-planet" aria-hidden="true" />
            <span className="skills-cosmic-small-planet two" aria-hidden="true" />
          </div>
        </div>
      </Container>
    </section>
  );
};
