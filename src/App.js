import { useEffect, useState } from "react";
import "./App.css";
import "./styles/futuristic.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavBar } from "./components/NavBar";
import { Banner } from "./components/Banner";
import { About } from "./components/About";
import { Projects } from "./components/Projects";
import { Experience } from "./components/Experience";
import { Leadership } from "./components/Leadership";
import { Skills } from "./components/Skills";
import { AISection } from "./components/AISection";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { ShootingStars } from "./components/ShootingStars";

function App() {
  const [cursor, setCursor] = useState({ x: 0, y: 0, active: false });

  useEffect(() => {
    const onMove = (event) => {
      setCursor({ x: event.clientX, y: event.clientY, active: true });
    };

    const onLeave = () => {
      setCursor((prev) => ({ ...prev, active: false }));
    };

    const onScroll = () => {
      document.documentElement.style.setProperty("--scroll-y", `${window.scrollY}`);
    };

    onScroll();
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className="App">
      <ShootingStars />

      <div
        className={`moon-cursor ${cursor.active ? "is-visible" : ""}`}
        style={{ transform: `translate3d(${cursor.x}px, ${cursor.y}px, 0)` }}
        aria-hidden="true"
      />

      <div className="site-content">
        <NavBar />
        <Banner />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Leadership />
        <AISection />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}

export default App;
