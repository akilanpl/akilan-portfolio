export interface NavLink {
  label: string;
  href: string;
  description: string;
}

export interface NavGroup {
  group: string;
  links: NavLink[];
}

export const primaryNav: NavLink[] = [
  { label: "Work", href: "/projects", description: "Projects & case studies" },
  { label: "Experience", href: "/experience", description: "Roles & internships" },
  { label: "Research", href: "/research", description: "Interests & publications" },
  { label: "Blog", href: "/blog", description: "Writing & notes" },
  { label: "Contact", href: "/contact", description: "Get in touch" }
];

export const allNav: NavGroup[] = [
  {
    group: "Profile",
    links: [
      { label: "Home", href: "/", description: "Overview" },
      { label: "About", href: "/about", description: "Background & values" },
      { label: "Timeline", href: "/timeline", description: "Milestones over time" },
      { label: "Skills", href: "/skills", description: "Technical toolkit" },
      { label: "Resume", href: "/resume", description: "Interactive & downloadable" }
    ]
  },
  {
    group: "Work",
    links: [
      { label: "Projects", href: "/projects", description: "Case studies" },
      { label: "Experience", href: "/experience", description: "KONE & Perplexity" },
      { label: "Open Source", href: "/open-source", description: "PyTorch & GitHub activity" },
      { label: "Achievements", href: "/achievements", description: "Awards & recognitions" }
    ]
  },
  {
    group: "Research & Writing",
    links: [
      { label: "Research", href: "/research", description: "Interests & philosophy" },
      { label: "Publications", href: "/publications", description: "Papers & preprints" },
      { label: "Blog", href: "/blog", description: "Long-form notes" },
      { label: "Speaking", href: "/speaking", description: "Talks & workshops" }
    ]
  },
  {
    group: "More",
    links: [
      { label: "Media", href: "/media", description: "Press & mentions" },
      { label: "Gallery", href: "/gallery", description: "Photos" },
      { label: "Startup Ideas", href: "/startup", description: "Founder notes" },
      { label: "Contact", href: "/contact", description: "Say hello" }
    ]
  }
];

export const flatNav: NavLink[] = allNav.flatMap((g) => g.links);
