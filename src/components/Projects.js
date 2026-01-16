import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import { ProjectCard } from "./ProjectCard";
import projImg1 from "../assets/img/image2.png";
import projImg2 from "../assets/img/image.png";
import colorSharp2 from "../assets/img/color-sharp2.png";
import 'animate.css';
import TrackVisibility from 'react-on-screen';

export const Projects = () => {
  const projects = [
  {
    title: "Wanderlust",
    description: "Travel listing platform that enables users to securely create, discover, and manage property listings through searchable, category-based, image-rich interfaces, while handling real-world deployment and configuration challenges.!",
    imgUrl: projImg1,
    link: "https://wanderlust-9i2x.onrender.com/listings",
  },
  {
    title: "Quiz Forge",
    description: "A role-based quiz and analytics platform enabling students to attempt quizzes and track performance, while allowing admins to manage quizzes and gain insights through interactive dashboards.",
    imgUrl: projImg2,
    link: "https://quizforge-production.up.railway.app/",
  },
];


  return (
    <section className="project" id="projects">
      <Container>
        <Row className="justify-content-center">
          <Col size={12}>
            <TrackVisibility>
              {({ isVisible }) =>
              <div className={isVisible ? "animate__animated animate__fadeIn": ""}>
                <h2>Projects</h2>
                <p>A selection of full-stack projects showcasing my experience in building
real-world web applications, from backend architecture to responsive UI
and deployment.
</p>
                <Tab.Container id="projects-tabs" defaultActiveKey="first">
                  <Nav variant="pills" className="nav-pills mb-5 justify-content-center align-items-center" id="pills-tab">
                    <Nav.Item>
                      <Nav.Link eventKey="first">Featured Projects</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="second">Coming soon..</Nav.Link>
                    </Nav.Item>
                  </Nav>
                  <Tab.Content id="slideInUp" className={isVisible ? "animate__animated animate__slideInUp" : ""}>
                    <Tab.Pane eventKey="first">
                      <Row className="justify-content-center">
                        {
                          projects.map((project, index) => {
                            return (
                              <ProjectCard
                                key={index}
                                {...project}
                                />
                            )
                          })
                        }
                      </Row>
                    </Tab.Pane>
                    <Tab.Pane eventKey="section">
                      <p>A selection of full-stack projects showcasing my experience in building
real-world web applications, from backend architecture to responsive UI
and deployment.
</p>
                    </Tab.Pane>
                    <Tab.Pane eventKey="second">
                      <p>Currently working on new projects involving advanced backend features,
authentication, and performance optimization. Updates coming soon..
</p>
                    </Tab.Pane>
                  </Tab.Content>
                </Tab.Container>
              </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
      <img className="background-image-right" src={colorSharp2}></img>
    </section>
  )
}