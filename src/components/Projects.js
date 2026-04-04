import { Container, Row } from "react-bootstrap";
import { SectionHeading } from "./SectionHeading";
import { ProjectCard } from "./ProjectCard";

const projects = [
  {
    title: "WanderLust",
    description:
      "Travel platform featuring listing cards, map-first discovery, secure auth, and image-rich destination previews.",
    githubUrl: "https://github.com/Karan26-web/WanderLust",
    stack: ["Node.js", "Express", "MongoDB Atlas", "Cloudinary", "EJS"],
  },
  {
    title: "QuizForge",
    description:
      "Role-based quiz platform with analytics dashboards, chart-driven insights, and scalable backend architecture.",
    githubUrl: "https://github.com/Karan26-web",
    stack: ["Python", "Flask", "SQLAlchemy", "Jinja2", "Chart.js"],
  },
  {
    title: "Business Data Management Capstone",
    description:
      "End-to-end capstone focused on data preprocessing, structured storage, and SQL-driven analysis.",
    githubUrl: "https://github.com/Karan26-web/BDM-CAPSTONE-PROJECT",
    stack: ["SQL", "Data Prep", "Data Storage", "Analysis"],
  },
  {
    title: "Game Designs",
    description:
      "A curated collection of game design explorations, mechanics concepts, and iterative design documentation.",
    githubUrl: "https://github.com/Karan26-web/Designs",
    stack: ["Game Design", "Mechanics Design", "Design Docs", "Iteration"],
  },
  {
    title: "Lattice Finance Dashboard",
    description:
      "A frontend finance workspace with role-based access, transaction management, and live spending insights. Built with React Context and Recharts; supports light/dark mode and local persistence.",
    liveUrl: "https://latticefinancebykaran.vercel.app/",
    stack: ["React 18", "Vite", "Tailwind CSS", "Recharts", "Context API"],
  },
  {
    title: "VillageMela — Game Design",
    description:
      "A browser-based coin-toss game set in a village fair, designed around simple mechanics, playful feedback, and a lighthearted mela atmosphere.",
    liveUrl: "https://karan26-web.github.io/CoinForTheVillageMela/",
    stack: ["Game Design", "HTML", "CSS", "JavaScript"],
  },
];

export const Projects = () => {
  return (
    <section className="neo-section projects-section" id="projects">
      <Container>
        <SectionHeading
          title="Projects"
          description="Visually rich product builds that combine interface craft, data thinking, and clean engineering."
        />

        <Row className="g-4">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} {...project} index={index} />
          ))}
        </Row>
      </Container>
    </section>
  );
};
