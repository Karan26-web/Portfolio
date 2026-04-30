import { lazy, Suspense, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./styles/futuristic.css";
import { NavBar } from "./components/NavBar";
import { Banner } from "./components/Banner";
import { ShootingStars } from "./components/ShootingStars";
import { GlassFilter } from "./components/LiquidGlass";

// Below-fold sections loaded only when needed
const About      = lazy(() => import("./components/About").then(m => ({ default: m.About })));
const Experience = lazy(() => import("./components/Experience").then(m => ({ default: m.Experience })));
const Projects   = lazy(() => import("./components/Projects").then(m => ({ default: m.Projects })));
const Skills     = lazy(() => import("./components/Skills").then(m => ({ default: m.Skills })));
const Leadership = lazy(() => import("./components/Leadership").then(m => ({ default: m.Leadership })));
const AISection  = lazy(() => import("./components/AISection").then(m => ({ default: m.AISection })));
const CosmicFooter = lazy(() => import("./components/CosmicFooter").then(m => ({ default: m.CosmicFooter })));

function App() {
  const [cursor, setCursor] = useState({ x: 0, y: 0, active: false });

  useEffect(() => {
    const onMove = (e) => setCursor({ x: e.clientX, y: e.clientY, active: true });
    const onLeave = () => setCursor((prev) => ({ ...prev, active: false }));
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
      <GlassFilter />
      <ShootingStars />

      <div className="glitch-overlay" aria-hidden="true" />

      <div
        className={`moon-cursor ${cursor.active ? "is-visible" : ""}`}
        style={{ transform: `translate3d(${cursor.x}px, ${cursor.y}px, 0)` }}
        aria-hidden="true"
      />

      <div className="site-content">
        <NavBar />
        <Banner />
        <Suspense fallback={null}>
          <About />
          <Experience />
          <Projects />
          <Skills />
          <Leadership />
          <AISection />
          <CosmicFooter />
        </Suspense>
      </div>
    </div>
  );
}

export default App;
