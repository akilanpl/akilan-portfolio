import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const CONTENT_DIR = path.join(process.cwd(), "content");

function readJSON<T>(file: string): T {
  const filePath = path.join(CONTENT_DIR, file);
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as T;
}

// ---- Types ----

export interface Profile {
  name: string;
  roles: string[];
  tagline: string;
  location: string;
  email: string;
  phone: string;
  links: { linkedin: string; github: string; resume: string };
  profileSummary: string;
  stats: { label: string; value: number; suffix?: string }[];
}

export interface ExperienceHighlight {
  text: string;
  metrics: string[];
}

export interface Experience {
  id: string;
  org: string;
  orgType: string;
  role: string;
  location: string;
  start: string;
  end: string;
  current: boolean;
  summary: string;
  highlights: ExperienceHighlight[];
  tech: string[];
}

export interface ProjectMetric {
  label: string;
  value: string;
  detail?: string;
}

export interface Project {
  slug: string;
  title: string;
  category: string;
  featured: boolean;
  period: string;
  badge?: string;
  oneLiner: string;
  problem: string;
  background: string;
  architecture: string;
  techStack: string[];
  metrics: ProjectMetric[];
  challenges: string[];
  lessons: string;
  futureWork: string;
  links: { github: string | null; demo: string | null };
}

export interface SkillItem {
  name: string;
  level: number;
  note?: string;
  usedIn?: string[];
}

export interface SkillCategory {
  category: string;
  items: SkillItem[];
}

export interface EducationEntry {
  institution: string;
  degree: string;
  location: string;
  start: string;
  end: string;
  highlights: string[];
}

export interface Certificate {
  title: string;
  issuer: string;
  description: string;
}

export interface OpenSourceContribution {
  project: string;
  type: string;
  url: string;
  status: string;
  description: string;
  impact: string;
}

export interface OpenSourceData {
  githubUsername: string;
  contributions: OpenSourceContribution[];
}

export interface Achievement {
  title: string;
  org: string;
  date: string;
  category: string;
  description: string;
}

export interface ResearchInterest {
  title: string;
  description: string;
  evidence: string;
}

export interface ResearchData {
  interests: ResearchInterest[];
  philosophy: string;
  current: string[];
  future: string[];
  collaborations: string[];
  readingList: string[];
  notes: string[];
}

export interface Publication {
  title: string;
  venue: string;
  year: string;
  type: string;
  role: string;
  abstract: string;
  doi: string | null;
  pdf: string | null;
  bibtex: string | null;
  relatedProject: string | null;
  placeholder?: boolean;
}

export interface SpeakingEngagement {
  title: string;
  type: string;
  org: string;
  date: string;
  audience: string;
  description: string;
  slides: string | null;
  video: string | null;
}

export interface MediaData {
  interviews: unknown[];
  articles: unknown[];
  podcasts: unknown[];
  news: unknown[];
  mentions: unknown[];
}

export interface StartupData {
  vision: string;
  ideas: unknown[];
  roadmap: unknown[];
  learning: unknown[];
  books: unknown[];
}

export interface GalleryData {
  categories: string[];
  images: unknown[];
}

export interface BlogMeta {
  slug: string;
  title: string;
  date: string;
  category: string;
  tags: string[];
  excerpt: string;
  draft: boolean;
}

// ---- Loaders ----

export const getProfile = () => readJSON<Profile>("profile.json");
export const getExperience = () => readJSON<Experience[]>("experience.json");
export const getProjects = () => readJSON<Project[]>("projects.json");
export const getProject = (slug: string) => getProjects().find((p) => p.slug === slug);
export const getSkills = () => readJSON<SkillCategory[]>("skills.json");
export const getEducation = () => readJSON<EducationEntry[]>("education.json");
export const getCertificates = () => readJSON<Certificate[]>("certificates.json");
export const getOpenSource = () => readJSON<OpenSourceData>("opensource.json");
export const getAchievements = () => readJSON<Achievement[]>("achievements.json");
export const getResearch = () => readJSON<ResearchData>("research.json");
export const getPublications = () => readJSON<Publication[]>("publications.json");
export const getSpeaking = () => readJSON<SpeakingEngagement[]>("speaking.json");
export const getMedia = () => readJSON<MediaData>("media.json");
export const getStartup = () => readJSON<StartupData>("startup.json");
export const getGallery = () => readJSON<GalleryData>("gallery.json");
export const getBlogList = () => readJSON<BlogMeta[]>("blog.json");

export function getBlogPost(slug: string) {
  const filePath = path.join(CONTENT_DIR, "blog", `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { content, data } = matter(raw);
  const stats = readingTime(content);
  return { content, meta: data as BlogMeta, readingTime: stats.text };
}

// ---- Derived / combined ----

export interface TimelineEvent {
  date: string;
  title: string;
  subtitle: string;
  category: "Education" | "Experience" | "Achievement" | "Open Source";
}

export function getTimeline(): TimelineEvent[] {
  const events: TimelineEvent[] = [];

  for (const edu of getEducation()) {
    events.push({
      date: edu.start,
      title: edu.degree,
      subtitle: edu.institution,
      category: "Education"
    });
  }

  for (const exp of getExperience()) {
    events.push({
      date: exp.start,
      title: `${exp.role} · ${exp.org}`,
      subtitle: exp.summary,
      category: "Experience"
    });
  }

  for (const ach of getAchievements()) {
    events.push({
      date: ach.date,
      title: ach.title,
      subtitle: ach.description,
      category: "Achievement"
    });
  }

  const os = getOpenSource();
  for (const c of os.contributions) {
    events.push({
      date: "2025",
      title: `${c.project} — ${c.type}`,
      subtitle: c.description,
      category: "Open Source"
    });
  }

  return events.sort((a, b) => (a.date < b.date ? -1 : 1));
}
