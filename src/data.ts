// ─────────────────────────────────────────────────────────────
//  All portfolio content lives here — edit this file to update
//  projects, links, skills, experience and education.
// ─────────────────────────────────────────────────────────────
import ids from "./assets/projects/ids.webp";
import rag from "./assets/projects/rag.webp";
import cleanerWeb from "./assets/projects/cleaner-web.webp";
import cleanerCore from "./assets/projects/cleaner-core.webp";
import fleet from "./assets/projects/fleet.webp";
import hissa from "./assets/projects/hissa.webp";
import razorguard from "./assets/projects/razorguard.webp";
import chatApp from "./assets/projects/chat-app.webp";
import photoGallery from "./assets/projects/photo-gallery.webp";
import pipelineguard from "./assets/projects/pipelineguard.webp";
import commonroom from "./assets/projects/commonroom.webp";
import pentest from "./assets/projects/pentest.webp";
import portfolio from "./assets/projects/portfolio.webp";

export const GITHUB = "https://github.com/hmvishwasballari-design";
export const LINKEDIN = "https://www.linkedin.com/in/h-m-vishwas-600269272/";
export const EMAIL = "hmvishwasballari@gmail.com";

export type Category = "AI / ML" | "Security" | "Web" | "Data";

export type Project = {
  id: string;
  name: string;
  eyebrow: string;
  description: string;
  stack: string[];
  repo: string; // GitHub repository URL
  live?: string; // hosted (Render) application
  img: string;
  cats: Category[];
  badge?: string;
};

const gh = (repo: string) => `${GITHUB}/${repo}`;

export const featured: Project[] = [
  {
    id: "pipelineguard",
    name: "PipelineGuard",
    eyebrow: "DEVSECOPS × CI/CD × SECURITY",
    description:
      "Automated CI/CD security framework for detecting workflow injection, exposed secrets, suspicious activities and artifact tampering.",
    stack: ["Python", "FastAPI", "React", "PostgreSQL", "GitHub Actions"],
    repo: gh("PipelineGuard"),
    img: pipelineguard,
    cats: ["Security"],
    badge: "Recent upload",
  },
  {
    id: "razorguard",
    name: "RazorGuard AI",
    eyebrow: "AI × RISK × FRAUD DETECTION",
    description:
      "AI-powered transaction risk detection, investigation and automated fraud response platform.",
    stack: ["Python", "FastAPI", "React", "PostgreSQL", "Scikit-learn", "XGBoost"],
    repo: gh("razorguard-ai"),
    live: "https://razorguard-frontend-lyve.onrender.com",
    img: razorguard,
    cats: ["AI / ML", "Security"],
  },
];

export const recent: Project[] = [
  {
    id: "photo-gallery",
    name: "Photo Gallery",
    eyebrow: "FRONTEND × UI",
    description:
      "Modern photography gallery application for viewing and exploring images with a visually appealing interface.",
    stack: ["JavaScript"],
    repo: gh("photo-gallery"),
    live: "https://photo-gallery-esbx.onrender.com",
    img: photoGallery,
    cats: ["Web"],
    badge: "Recent upload",
  },
  {
    id: "chat-app",
    name: "Chat-app",
    eyebrow: "REAL-TIME × MESSAGING",
    description:
      "JavaScript-based chat application featuring a messaging interface and interactive communication experience.",
    stack: ["JavaScript"],
    repo: gh("Chat-app"),
    live: "https://chat-app-z1x7.onrender.com",
    img: chatApp,
    cats: ["Web"],
    badge: "Recent upload",
  },
  {
    id: "commonroom",
    name: "CommonRoom Chat",
    eyebrow: "REACT × TEAM CHAT",
    description:
      "Premium React team chat application designed for team communication and collaboration.",
    stack: ["React", "CSS"],
    repo: gh("commonroom-chat"),
    img: commonroom,
    cats: ["Web"],
    badge: "Recent upload",
  },
  {
    id: "hissa",
    name: "Hissa — Shared Bill Splitter",
    eyebrow: "FULL-STACK × FINTECH",
    description:
      "Application for managing shared expenses, splitting bills and tracking group payments.",
    stack: ["TypeScript", "React", "Hono", "Cloudflare D1"],
    repo: gh("hissa-shared-bill-splitter"),
    live: "https://hissa-shared-bill-splitter.onrender.com",
    img: hissa,
    cats: ["Web"],
    badge: "Recent upload",
  },
];

export const allProjects: Project[] = [
  {
    id: "fleet",
    name: "Fleet Operations Suite — Odoo 20",
    eyebrow: "ERP × ODOO ADDON",
    description: "Custom Odoo ERP addon for fleet operations management.",
    stack: ["Python", "Odoo 20", "PostgreSQL", "XML"],
    repo: gh("fleet-operations-suite"),
    img: fleet,
    cats: ["Web"],
  },
  {
    id: "ids",
    name: "AI_IDS",
    eyebrow: "AI × CYBERSECURITY",
    description:
      "AI-powered intrusion detection system for identifying suspicious network activities and potential cyberattacks.",
    stack: ["Python", "Scikit-learn", "PyShark", "Scapy"],
    repo: gh("AI_IDS"),
    img: ids,
    cats: ["AI / ML", "Security"],
  },
  {
    id: "pentest",
    name: "AI-Pentest-Framework",
    eyebrow: "AI × PENTESTING",
    description:
      "AI-powered penetration testing framework using Nmap, Nikto, Docker and Python for automated vulnerability assessment.",
    stack: ["Python", "Nmap", "Nikto", "Docker"],
    repo: gh("AI-Pentest-Framework"),
    img: pentest,
    cats: ["Security", "AI / ML"],
  },
  {
    id: "rag",
    name: "Enterprise RAG Dashboard",
    eyebrow: "AI × RAG × KNOWLEDGE",
    description:
      "AI-powered document processing, semantic retrieval and intelligent response generation platform.",
    stack: ["Python", "RAG", "Semantic Search"],
    repo: gh("enterprise-rag-dashboard"),
    img: rag,
    cats: ["AI / ML"],
  },
  {
    id: "cleaner-web",
    name: "Smart Data Cleaner Web App",
    eyebrow: "FULL-STACK × DATA",
    description: "Web-based interface for uploading and processing datasets.",
    stack: ["Python"],
    repo: gh("smart-data-cleaner-webapp"),
    img: cleanerWeb,
    cats: ["Data", "Web"],
  },
  {
    id: "cleaner",
    name: "Smart Data Cleaner",
    eyebrow: "DATA × AUTOMATION",
    description:
      "AI-powered data preprocessing system designed to detect missing values, duplicates, inconsistencies and formatting errors.",
    stack: ["Python", "Pandas", "NumPy"],
    repo: gh("smart-data-cleaner"),
    img: cleanerCore,
    cats: ["Data", "AI / ML"],
  },
  {
    id: "portfolio",
    name: "HM Vishwas Portfolio",
    eyebrow: "PORTFOLIO × FRONTEND",
    description:
      "Personal developer portfolio showcasing professional information, technical skills and software projects.",
    stack: ["React", "CSS"],
    repo: gh("hm-vishwas-portfolio"),
    img: portfolio,
    cats: ["Web"],
  },
];

export const categories: ("All" | Category)[] = ["All", "AI / ML", "Security", "Web", "Data"];

export const skills: { key: string; title: string; icon: string; items: string[] }[] = [
  { key: "programming", title: "Programming", icon: "{ }", items: ["Python", "JavaScript", "TypeScript", "SQL", "Bash"] },
  {
    key: "fullstack",
    title: "Full Stack",
    icon: "</>",
    items: ["React", "Node.js", "MERN", "Django", "FastAPI", "Flask", "Hono", "PostgreSQL", "Cloudflare D1"],
  },
  {
    key: "ai",
    title: "AI / ML",
    icon: "AI",
    items: ["Scikit-learn", "XGBoost", "Pandas", "NumPy", "RAG", "Semantic Search", "Power BI", "Tableau"],
  },
  {
    key: "security",
    title: "Cybersecurity",
    icon: "◈",
    items: ["VAPT", "SOC Analysis", "Burp Suite", "Nmap", "Metasploit", "Nikto", "Wireshark", "Kali Linux"],
  },
  {
    key: "devsecops",
    title: "DevSecOps",
    icon: "∞",
    items: ["CI/CD Security", "GitHub Actions", "Docker", "Secrets Detection", "Git", "Render"],
  },
];

export const experience = [
  {
    period: "3 months",
    company: "HAL",
    role: "Frontend Developer Intern",
    note: "Frontend development internship — building and refining user-facing interfaces.",
  },
];

export const education = [
  {
    degree: "MCA",
    full: "Master of Computer Applications",
    school: "Chanakya University, Bangalore",
    period: "Expected 2027",
    status: "Pursuing",
  },
  {
    degree: "BCA",
    full: "Bachelor of Computer Applications",
    school: "Chanakya University, Bangalore",
    period: "Completed",
    status: "Graduated",
  },
];

export const sections = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
  { id: "featured", label: "Featured Projects" },
  { id: "recent", label: "Recent Projects" },
  { id: "all-projects", label: "All Projects" },
  { id: "contact", label: "Contact" },
];
