import React, { useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

type Project = {
  no: string;
  name: string;
  eyebrow: string;
  description: string;
  stack: string[];
  url: string;
  featured?: boolean;
};

const projects: Project[] = [
  {
    no: "01",
    name: "RazorGuard AI",
    eyebrow: "AI × RISK × SECURITY",
    description:
      "An AI-powered transaction risk platform for detection, investigation, explainable decisions, bounded automated responses, and a complete audit trail.",
    stack: ["Python", "ML", "FastAPI", "PostgreSQL", "Docker"],
    url: "https://github.com/hmvishwasballari-design/razorguard-ai",
    featured: true,
  },
  {
    no: "02",
    name: "AI IDS",
    eyebrow: "AI × CYBERSECURITY",
    description:
      "A machine-learning intrusion detection system with threat classification, severity scoring, a FastAPI inference service, and a Streamlit monitoring dashboard.",
    stack: ["Python", "scikit-learn", "XGBoost", "FastAPI", "Streamlit"],
    url: "https://github.com/hmvishwasballari-design/AI_IDS",
  },
  {
    no: "03",
    name: "AI-Pentest-Framework",
    eyebrow: "AI × PENTESTING",
    description:
      "An AI-powered penetration testing framework using Nmap, Nikto, Docker and Python for automated vulnerability assessment.",
    stack: ["Python", "Nmap", "Nikto", "Docker"],
    url: "https://github.com/hmvishwasballari-design/AI-Pentest-Framework",
  },
  {
    no: "04",
    name: "Enterprise RAG Dashboard",
    eyebrow: "AI × RAG × KNOWLEDGE",
    description:
      "An AI-powered Retrieval-Augmented Generation dashboard focused on document processing, semantic search, LLM capabilities and context-aware insights.",
    stack: ["Python", "RAG", "LLM", "Semantic Search"],
    url: "https://github.com/hmvishwasballari-design/enterprise-rag-dashboard",
  },
  {
    no: "05",
    name: "Smart Data Cleaner",
    eyebrow: "DATA × AUTOMATION",
    description:
      "A Python and Pandas data-cleaning system that handles missing values, duplicates, inconsistent formats and generates cleaning reports.",
    stack: ["Python", "Pandas", "NumPy", "Matplotlib", "OpenPyXL"],
    url: "https://github.com/hmvishwasballari-design/smart-data-cleaner",
  },
  {
    no: "06",
    name: "Smart Data Cleaner WebApp",
    eyebrow: "FULL-STACK × DATA",
    description:
      "A Flask web front-end for uploading datasets, previewing quality issues, choosing cleaning operations and downloading cleaned files.",
    stack: ["Python", "Flask", "HTML", "CSS", "JavaScript"],
    url: "https://github.com/hmvishwasballari-design/smart-data-cleaner-webapp",
  },
];

function App() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [scroll, setScroll] = useState(0);
  const cursor = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoaded(true), 80);
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScroll(max > 0 ? (window.scrollY / max) * 100 : 0);
    };
    const onMove = (e: MouseEvent) => {
      if (cursor.current) {
        cursor.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
      document.documentElement.style.setProperty("--mx", `${e.clientX}px`);
      document.documentElement.style.setProperty("--my", `${e.clientY}px`);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMove);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  useEffect(() => {
    const reveal = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("in-view");
      }),
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal").forEach((el) => reveal.observe(el));
    return () => reveal.disconnect();
  }, [loaded]);

  const featured = useMemo(() => projects.find((p) => p.featured)!, []);

  const go = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className={`site ${loaded ? "loaded" : ""}`}>
      <div className="progress" style={{ width: `${scroll}%` }} />
      <div className="cursor-glow" ref={cursor} />
      <div className="ambient" />

      <header className="nav">
        <button className="brand" onClick={() => go("home")} aria-label="Home">
          HM<span>.</span>
        </button>
        <nav className={menuOpen ? "nav-links open" : "nav-links"}>
          {["work", "stack", "about", "contact"].map((item) => (
            <button key={item} onClick={() => go(item)}>
              {item}
            </button>
          ))}
        </nav>
        <div className="nav-right">
          <span className="status"><i /> AVAILABLE TO BUILD</span>
          <button className="menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            {menuOpen ? "×" : "☰"}
          </button>
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-grid" />
          <div className="hero-copy">
            <div className="kicker reveal">AI / CYBERSECURITY / CLOUD</div>
            <h1 className="reveal delay-1">
              BUILDING
              <br />
              <span>INTELLIGENT</span>
              <br />
              SYSTEMS<span className="dot">.</span>
            </h1>
            <div className="hero-bottom reveal delay-2">
              <p>
                H M Vishwas — a technology builder focused on AI,
                cybersecurity, cloud systems and practical software engineering.
              </p>
              <div className="hero-actions">
                <button className="primary" onClick={() => go("work")}>Explore work <span>↘</span></button>
                <a className="ghost" href="https://github.com/hmvishwasballari-design" target="_blank" rel="noreferrer">GitHub ↗</a>
              </div>
            </div>
          </div>
          <div className="hero-meta">
            <span>26°N / 77°E</span>
            <span>2026</span>
          </div>
        </section>

        <section className="introduction" id="about">
          <div className="section-index">01 — INTRODUCTION</div>
          <div className="intro-grid reveal">
            <div className="intro-identity">
              <div className="portrait-mark">
                <span>HM</span>
              </div>
              <div>
                <div className="eyebrow">HELLO, I'M</div>
                <h2>H M<br /><span>VISHWAS.</span></h2>
              </div>
            </div>

            <div className="intro-copy">
              <p className="intro-lead">
                I'm a cybersecurity-focused technology builder exploring the
                intersection of <em>AI, security, cloud and software engineering.</em>
              </p>
              <p>
                I'm currently pursuing my MCA in Cybersecurity at Chandigarh University
                after completing my BCA in Data Science. I enjoy taking an idea from
                problem definition to a working system — then testing it, breaking it,
                documenting it and making it better.
              </p>
              <p>
                My projects span AI-powered risk detection, intrusion detection,
                penetration-testing automation, RAG systems, data engineering and
                full-stack applications.
              </p>

              <div className="intro-facts">
                <div><span>FOCUS</span><b>AI + CYBERSECURITY</b></div>
                <div><span>EDUCATION</span><b>MCA — CYBERSECURITY</b></div>
                <div><span>BASE</span><b>BENGALURU, INDIA</b></div>
                <div><span>APPROACH</span><b>BUILD → TEST → SHIP</b></div>
              </div>
            </div>
          </div>
        </section>

        <section className="featured" id="work">
          <div className="section-head">
            <div className="section-index">02 — SELECTED WORK</div>
            <span>06 repositories / 01 direction</span>
          </div>

          <article className="feature-card reveal">
            <div className="feature-top">
              <span>FEATURED / {featured.no}</span>
              <span>PUBLIC REPOSITORY</span>
            </div>
            <div className="feature-body">
              <div>
                <div className="eyebrow">{featured.eyebrow}</div>
                <h2>{featured.name}</h2>
                <p>{featured.description}</p>
                <div className="tags">{featured.stack.map((x) => <span key={x}>{x}</span>)}</div>
              </div>
              <div className="risk-visual">
                <div className="orbit orbit-a" />
                <div className="orbit orbit-b" />
                <div className="core">RISK<br /><b>ENGINE</b></div>
                <div className="signal s1">ML</div>
                <div className="signal s2">AI</div>
                <div className="signal s3">AUDIT</div>
              </div>
            </div>
            <div className="feature-bottom">
              <button onClick={() => setActiveProject(featured)}>Inspect project <span>↗</span></button>
              <a href={featured.url} target="_blank" rel="noreferrer">Open GitHub ↗</a>
            </div>
          </article>

          <div className="project-list">
            {projects.slice(1).map((project) => (
              <article className="project-row reveal" key={project.name} onClick={() => setActiveProject(project)}>
                <div className="project-no">{project.no}</div>
                <div className="project-main">
                  <div className="eyebrow">{project.eyebrow}</div>
                  <h3>{project.name}</h3>
                  <p>{project.description}</p>
                  <div className="tags">{project.stack.map((x) => <span key={x}>{x}</span>)}</div>
                </div>
                <div className="project-arrow">↗</div>
              </article>
            ))}
          </div>
        </section>

        <section className="marquee-section" id="stack">
          <div className="section-index">03 — STACK</div>
          <div className="marquee"><div>PYTHON · AI · CYBERSECURITY · LINUX · CLOUD · FASTAPI · FLASK · DJANGO · POSTGRESQL · REACT · DOCKER · GIT ·</div></div>
          <div className="stack-grid reveal">
            <div><small>01 / CORE</small><strong>Python<br />SQL<br />Bash</strong></div>
            <div><small>02 / AI</small><strong>Machine Learning<br />RAG<br />LLM Systems</strong></div>
            <div><small>03 / SECURITY</small><strong>Kali Linux<br />Nmap<br />Wireshark<br />IDS</strong></div>
            <div><small>04 / BUILD</small><strong>React<br />Flask / Django<br />FastAPI<br />PostgreSQL</strong></div>
          </div>
        </section>

        <section className="process">
          <div className="section-index">04 — HOW I BUILD</div>
          <div className="process-grid reveal">
            {[
              ["01", "FRAME", "Start with the problem, constraints and measurable outcome."],
              ["02", "ENGINEER", "Choose the smallest architecture that can actually work."],
              ["03", "TEST", "Attack assumptions, inspect failures and validate the result."],
              ["04", "SHIP", "Document it, publish it and keep improving the system."],
            ].map(([n, t, d]) => (
              <div className="process-card" key={n}>
                <span>{n}</span><h3>{t}</h3><p>{d}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="contact" id="contact">
          <div className="section-index">05 — CONTACT</div>
          <div className="contact-inner reveal">
            <div>
              <span className="eyebrow">H M VISHWAS</span>
              <h2>LET'S BUILD<br /><span>WHAT'S NEXT.</span></h2>
            </div>
            <div className="contact-links">
              <a href="mailto:hmvishwasballari@gmail.com">hmvishwasballari@gmail.com ↗</a>
              <a href="https://github.com/hmvishwasballari-design" target="_blank" rel="noreferrer">github.com/hmvishwasballari-design ↗</a>
              <a href="https://www.linkedin.com/in/h-m-vishwas-600269272/" target="_blank" rel="noreferrer">linkedin / H M Vishwas ↗</a>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <span>HM. / 2026</span>
        <span>AI × CYBERSECURITY × CLOUD</span>
        <button onClick={() => go("home")}>BACK TO TOP ↑</button>
      </footer>

      {activeProject && (
        <div className="modal-backdrop" onClick={() => setActiveProject(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="close" onClick={() => setActiveProject(null)}>×</button>
            <div className="eyebrow">{activeProject.eyebrow}</div>
            <div className="modal-no">{activeProject.no}</div>
            <h2>{activeProject.name}</h2>
            <p>{activeProject.description}</p>
            <div className="tags">{activeProject.stack.map((x) => <span key={x}>{x}</span>)}</div>
            <a className="primary modal-link" href={activeProject.url} target="_blank" rel="noreferrer">Open repository ↗</a>
          </div>
        </div>
      )}
    </div>
  );
}

createRoot(document.getElementById("root")!).render(
  <React.StrictMode><App /></React.StrictMode>
);