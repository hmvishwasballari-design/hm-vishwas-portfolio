import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import {
  EMAIL,
  GITHUB,
  LINKEDIN,
  allProjects,
  categories,
  education,
  experience,
  featured,
  recent,
  sections,
  skills,
  type Category,
  type Project,
} from "./data";

/* ───────────────────────────────────────────────
   3D tilt — used ONLY on project images
   ─────────────────────────────────────────────── */
function TiltImage({ src, alt, max = 13 }: { src: string; alt: string; max?: number }) {
  const wrap = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  const canTilt = () =>
    window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const move = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!canTilt() || !wrap.current || !inner.current) return;
    const r = wrap.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width; // 0 → 1
    const py = (e.clientY - r.top) / r.height;
    const ry = (px - 0.5) * 2 * max;
    const rx = -(py - 0.5) * 2 * max;
    const s = inner.current.style;
    s.setProperty("--rx", `${rx.toFixed(2)}deg`);
    s.setProperty("--ry", `${ry.toFixed(2)}deg`);
    s.setProperty("--gx", `${(px * 100).toFixed(1)}%`);
    s.setProperty("--gy", `${(py * 100).toFixed(1)}%`);
    s.setProperty("--sx", `${(-ry * 2).toFixed(1)}px`);
    s.setProperty("--sy", `${(rx * 2 + 26).toFixed(1)}px`);
    wrap.current.classList.add("active");
  };

  const leave = () => {
    if (!wrap.current || !inner.current) return;
    wrap.current.classList.remove("active");
    const s = inner.current.style;
    ["--rx", "--ry", "--gx", "--gy", "--sx", "--sy"].forEach((p) => s.removeProperty(p));
  };

  return (
    <div className="tilt" ref={wrap} onPointerMove={move} onPointerLeave={leave}>
      <div className="tilt-inner" ref={inner}>
        <img src={src} alt={alt} loading="lazy" draggable={false} />
        <span className="tilt-glare" />
      </div>
    </div>
  );
}

/* ───────────────────────────────────────────────
   Project card: image, details, then links below
   ─────────────────────────────────────────────── */
function ProjectCard({ p, variant }: { p: Project; variant: "feature" | "recent" | "compact" }) {
  return (
    <article className={`pcard ${variant} ${p.live ? "" : "solo"} reveal`}>
      <div className="pmedia">
        <TiltImage src={p.img} alt={`${p.name} preview`} max={variant === "feature" ? 12 : 14} />
      </div>
      <div className="pbody">
        {p.badge && <span className="badge">{p.badge}</span>}
        <div className="eyebrow">{p.eyebrow}</div>
        <h3>{p.name}</h3>
        <p>{p.description}</p>
        <div className="tags">
          {p.stack.map((x) => (
            <span key={x}>{x}</span>
          ))}
        </div>
      </div>
      <div className="pfoot">
        <a className="foot-link" href={p.repo} target="_blank" rel="noreferrer">
          <span>Source code</span>
          <b>GitHub ↗</b>
        </a>
        {p.live ? (
          <a className="foot-link live" href={p.live} target="_blank" rel="noreferrer">
            <span>
              <i className="pulse" /> Live application
            </span>
            <b>{p.live.replace("https://", "")} ↗</b>
          </a>
        ) : null}
      </div>
    </article>
  );
}

function SectionTitle({ index, kicker, title }: { index: string; kicker: string; title: React.ReactNode }) {
  return (
    <div className="sec-title reveal">
      <div className="comment">
        {"..."}/{kicker}
        {"..."} <em>{index}</em>
      </div>
      <h2>{title}</h2>
    </div>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [scroll, setScroll] = useState(0);
  const [active, setActive] = useState("home");
  const [filter, setFilter] = useState<"All" | Category>("All");
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const cursor = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoaded(true), 60);
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScroll(max > 0 ? (window.scrollY / max) * 100 : 0);
    };
    const onMove = (e: MouseEvent) => {
      if (cursor.current) cursor.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMove);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  // scroll-reveal
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("in-view");
            io.unobserve(en.target);
          }
        }),
      { threshold: 0.08 }
    );
    document.querySelectorAll(".reveal:not(.in-view)").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [loaded, filter]);

  // active section → side dots
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((en) => {
          if (en.isIntersecting) setActive(en.target.id);
        }),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  const go = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const shown = filter === "All" ? allProjects : allProjects.filter((p) => p.cats.includes(filter));
  const totalProjects = featured.length + recent.length + allProjects.length;
  const liveCount = [...featured, ...recent, ...allProjects].filter((p) => p.live).length;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio enquiry from ${form.name || "a visitor"}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name}\n${form.email}`);
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <div className={`site ${loaded ? "loaded" : ""}`}>
      <div className="progress" style={{ width: `${scroll}%` }} />
      <div className="cursor-glow" ref={cursor} />
      <div className="ambient" />

      {/* vertical section dots */}
      <aside className="dots-nav" aria-label="Sections">
        {sections.map((s) => (
          <button
            key={s.id}
            className={active === s.id ? "on" : ""}
            onClick={() => go(s.id)}
            aria-label={s.label}
            title={s.label}
          >
            <span>{s.label}</span>
          </button>
        ))}
      </aside>

      <header className="nav">
        <button className="brand" onClick={() => go("home")} aria-label="Home">
          hm<span>.</span>dev
        </button>
        <nav className={menuOpen ? "nav-links open" : "nav-links"}>
          {[
            ["home", "Home"],
            ["about", "About"],
            ["experience", "Experience"],
            ["education", "Education"],
            ["skills", "Skills"],
            ["featured", "Projects"],
            ["contact", "Contact"],
          ].map(([id, label]) => (
            <button key={id} className={active === id ? "cur" : ""} onClick={() => go(id)}>
              {label}
            </button>
          ))}
        </nav>
        <div className="nav-right">
          <span className="status">
            <i /> OPEN TO OPPORTUNITIES
          </span>
          <button className="menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            {menuOpen ? "×" : "☰"}
          </button>
        </div>
      </header>

      <main>
        {/* ───────── 1 · HOME ───────── */}
        <section className="hero" id="home">
          <div className="hero-grid" />
          <div className="hero-copy">
            <div className="hello reveal">
              <span className="wave">// hello world</span>
            </div>
            <h1 className="reveal delay-1">
              H M <span>Vishwas</span>
            </h1>
            <div className="roles reveal delay-1">
              <span>Software Developer</span>
              <i>|</i>
              <span>AI/ML Enthusiast</span>
              <i>|</i>
              <span>Cybersecurity &amp; DevSecOps Engineer</span>
            </div>
            <p className="hero-sub reveal delay-2">
              Building intelligent applications, modern web experiences and security-focused engineering solutions.
            </p>
            <div className="hero-actions reveal delay-2">
              <button className="pill primary" onClick={() => go("featured")}>
                Projects <span className="circ">→</span>
              </button>
              <button className="pill" onClick={() => go("contact")}>
                Contact me
              </button>
            </div>
            <div className="chips reveal delay-3">
              <a href={GITHUB} target="_blank" rel="noreferrer">GitHub</a>
              <a href={LINKEDIN} target="_blank" rel="noreferrer">LinkedIn</a>
              <a href={`mailto:${EMAIL}`}>Email</a>
            </div>
          </div>

          <div className="hero-card reveal delay-2" aria-hidden="true">
            <div className="win-bar">
              <i /><i /><i />
              <span>about me</span>
            </div>
            <pre>
              <span className="p">~/vishwas $</span> whoami{"\n"}
              <b>H M Vishwas</b>
              {"\n\n"}
              <span className="p">~/vishwas $</span> cat roles.txt{"\n"}
              <u>›</u> Software Developer{"\n"}
              <u>›</u> AI/ML Enthusiast{"\n"}
              <u>›</u> Cybersecurity &amp; DevSecOps{"\n"}
              {"\n"}
              <span className="p">~/vishwas $</span> ls projects | wc -l{"\n"}
              <b>{totalProjects}</b>
              {"\n\n"}
              <span className="p">~/vishwas $</span> <span className="caret" />
            </pre>
          </div>

          <div className="hero-stats">
            <div><b>{totalProjects}</b><span>Projects</span></div>
            <div><b>{liveCount}</b><span>Live apps</span></div>
            <div><b>3</b><span>Months at HAL</span></div>
          </div>
        </section>

        {/* ───────── 2 · ABOUT ───────── */}
        <section className="about" id="about">
          <div className="about-inner">
            <h2 className="mega reveal">
              Who
              <br />I am
            </h2>
            <div className="about-grid">
              <div className="about-card reveal">
                <div className="win-bar light">
                  <i /><i /><i />
                  <span>about me</span>
                </div>
                <div className="about-card-body">
                  <div className="monogram">HM</div>
                  <div>
                    <h3>H M Vishwas</h3>
                    <p className="role">Software Developer · AI/ML · Cybersecurity</p>
                    <div className="contact-mini">
                      <a href={`mailto:${EMAIL}`}>✉ {EMAIL}</a>
                      <a href={GITHUB} target="_blank" rel="noreferrer">⌥ github.com/hmvishwasballari-design</a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="about-copy reveal delay-1">
                <p className="lead">
                  I'm a developer who enjoys turning ideas into working systems — from full-stack web apps to{" "}
                  <em>AI-driven and security-focused</em> software.
                </p>
                <p>
                  I'm currently pursuing my MCA at Chanakya University in Bangalore, after completing my BCA. My work
                  spans modern web applications, machine-learning projects, intrusion detection, penetration-testing
                  automation and DevSecOps pipelines.
                </p>
                <p>
                  I'm aiming for roles in software development, SOC analysis and vulnerability assessment &amp;
                  penetration testing — wherever I can build things and make them more secure.
                </p>
                <div className="facts">
                  <div><span>Based in</span><b>Bengaluru, India</b></div>
                  <div><span>Focus</span><b>Full-stack · AI/ML · Security</b></div>
                  <div><span>Speaks</span><b>Kannada · English · Telugu · Hindi</b></div>
                  <div><span>Approach</span><b>Build → Test → Secure → Ship</b></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ───────── 3 · EXPERIENCE ───────── */}
        <section id="experience">
          <SectionTitle index="03" kicker="Experience" title={<>Work <span>experience</span></>} />
          <div className="work-table reveal">
            {experience.map((x) => (
              <div className="work-row hl" key={x.company}>
                <div className="w-period">
                  {x.period}
                  <small>internship</small>
                </div>
                <div className="w-company">{x.company}</div>
                <div className="w-role">
                  {x.role}
                  <small>{x.note}</small>
                </div>
              </div>
            ))}
            <div className="work-total">
              Work experience <em>3 months</em>
            </div>
          </div>
        </section>

        {/* ───────── 4 · EDUCATION ───────── */}
        <section id="education">
          <SectionTitle index="04" kicker="Education" title={<>My <span>education</span></>} />
          <div className="edu-grid">
            {education.map((e, i) => (
              <article className={`edu-card reveal delay-${i + 1}`} key={e.degree}>
                <div className="edu-top">
                  <span className="edu-status">{e.status}</span>
                  <span>{e.period}</span>
                </div>
                <h3>{e.degree}</h3>
                <p className="edu-full">{e.full}</p>
                <p className="edu-school">{e.school}</p>
              </article>
            ))}
          </div>
        </section>

        {/* ───────── 5 · SKILLS ───────── */}
        <section id="skills">
          <SectionTitle index="05" kicker="Skills" title={<>Skill<span>-Set</span></>} />
          <div className="skill-grid">
            {skills.map((s, i) => (
              <article className={`skill-card reveal delay-${(i % 3) + 1} k-${s.key}`} key={s.key}>
                <div className="skill-icon">{s.icon}</div>
                <h3>{s.title}</h3>
                <div className="tags">
                  {s.items.map((x) => (
                    <span key={x}>{x}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
          <div className="marquee" aria-hidden="true">
            <div>
              PYTHON · REACT · FASTAPI · DEVSECOPS · AI/ML · VAPT · SOC · DOCKER · POSTGRESQL · TYPESCRIPT · PYTHON · REACT ·
              FASTAPI · DEVSECOPS · AI/ML · VAPT · SOC · DOCKER · POSTGRESQL · TYPESCRIPT ·
            </div>
          </div>
        </section>

        {/* ───────── 6 · FEATURED PROJECTS ───────── */}
        <section id="featured">
          <SectionTitle index="06" kicker="Featured Projects" title={<>Featured <span>projects</span></>} />
          <div className="feature-list">
            {featured.map((p) => (
              <ProjectCard key={p.id} p={p} variant="feature" />
            ))}
          </div>
        </section>

        {/* ───────── 7 · RECENT PROJECTS ───────── */}
        <section id="recent">
          <SectionTitle index="07" kicker="Recent Projects" title={<>Recent <span>projects</span></>} />
          <div className="recent-grid">
            {recent.map((p) => (
              <ProjectCard key={p.id} p={p} variant="recent" />
            ))}
          </div>
        </section>

        {/* ───────── 8 · ALL PROJECTS ───────── */}
        <section id="all-projects">
          <SectionTitle index="08" kicker="All Projects" title={<>All <span>projects</span></>} />
          <div className="filters reveal">
            {categories.map((c) => (
              <button key={c} className={filter === c ? "on" : ""} onClick={() => setFilter(c)}>
                {c}
              </button>
            ))}
            <span className="count">{shown.length} / {allProjects.length}</span>
          </div>
          <div className="all-grid">
            {shown.map((p) => (
              <ProjectCard key={p.id} p={p} variant="compact" />
            ))}
          </div>
          <a className="more-link reveal" href={GITHUB} target="_blank" rel="noreferrer">
            See every repository on GitHub <span>↗</span>
          </a>
        </section>

        {/* ───────── 9 · CONTACT ───────── */}
        <section className="contact" id="contact">
          <div className="contact-inner">
            <div className="reveal">
              <div className="comment">
                {"..."}/Contact{"..."} <em>09</em>
              </div>
              <h2>
                Connect <span>with me</span>
              </h2>
              <p className="contact-sub">
                Have a project, an opportunity or just want to say hello? Send a message — I'll get back to you.
              </p>
              <div className="contact-links">
                <a href={`mailto:${EMAIL}`}><span>Email</span>{EMAIL} ↗</a>
                <a href={GITHUB} target="_blank" rel="noreferrer"><span>GitHub</span>hmvishwasballari-design ↗</a>
                <a href={LINKEDIN} target="_blank" rel="noreferrer"><span>LinkedIn</span>H M Vishwas ↗</a>
              </div>
            </div>
            <form className="contact-form reveal delay-1" onSubmit={submit}>
              <label>
                Name
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your name"
                  required
                />
              </label>
              <label>
                Email
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="you@example.com"
                  required
                />
              </label>
              <label>
                Message
                <textarea
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell me about your project…"
                  required
                />
              </label>
              <button className="send" type="submit">
                Stay Connected <span>▶</span>
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer>
        <span>hm.dev / {new Date().getFullYear()}</span>
        <span>Software · AI/ML · Cybersecurity · DevSecOps</span>
        <button onClick={() => go("home")}>BACK TO TOP ↑</button>
      </footer>
    </div>
  );
}

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
