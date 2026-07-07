// ============================================================
//  🚀 PORTFOLIO CONFIG FILE — Edit this file to update your portfolio
//  No React knowledge needed. Just change the values below!
// ============================================================

const portfolioConfig = {

  // ----------------------------------------------------------
  // 👤 PERSONAL INFO
  // ----------------------------------------------------------
  personal: {
    name: "Haseeb Ur Rehman",
    firstName: "Haseeb",
    lastName: "Ur Rehman",
    tagline: "Developer & Designer",
    subtitle:
      "Crafting immersive 3D experiences and cutting-edge web applications that push the boundaries of what's possible.",
    availability: "Available for Projects", // shown in hero badge
    profilePhoto: "/assets/profile.jpg", // Your profile photo (stored in public/assets/)
    logo: "H", // Letter(s) shown on the 3D cube in navbar
    logoText: "Haseeb", // Text next to the cube logo
    location: "Pakistan",
    resumeLink: "#", // URL to your resume PDF e.g. "/resume.pdf"
  },

  // ----------------------------------------------------------
  // 📞 CONTACT INFO
  // ----------------------------------------------------------
  contact: {
    email: "haseeb.rehman@example.com",
    phone: "+92-300-1234567",
    website: "https://haseeb.dev",
  },

  // ----------------------------------------------------------
  // 🔗 SOCIAL MEDIA LINKS
  // ----------------------------------------------------------
  social: {
    github: "https://github.com/haseebrehman",
    linkedin: "https://linkedin.com/in/haseebrehman",
    twitter: "https://twitter.com/haseebrehman",
    instagram: "",  // leave empty to hide
    youtube: "",    // leave empty to hide
    facebook: "",   // leave empty to hide
  },

  // ----------------------------------------------------------
  // 📝 ABOUT ME
  // ----------------------------------------------------------
  about: {
    heading: "Creative Problem Solver",
    bio: [
      "I'm Haseeb Ur Rehman, a passionate developer with 5+ years of experience building innovative web applications. I specialize in creating immersive 3D experiences and modern, performant interfaces that users love.",
      "My approach combines technical excellence with creative design thinking, ensuring every project is not just functional, but memorable and engaging.",
    ],
    stats: [
      { number: "50+", label: "Projects Completed" },
      { number: "5+",  label: "Years Experience" },
      { number: "30+", label: "Happy Clients" },
      { number: "15+", label: "Awards Won" },
    ],
  },

  // ----------------------------------------------------------
  // 🛠️ SKILLS
  // (level: 0-100, color: any CSS hex color)
  // ----------------------------------------------------------
  skills: [
    { name: "React",       level: 95, color: "#61DAFB", category: "Frontend" },
    { name: "JavaScript",  level: 90, color: "#F7DF1E", category: "Frontend" },
    { name: "Node.js",     level: 85, color: "#339933", category: "Backend" },
    { name: "TypeScript",  level: 88, color: "#3178C6", category: "Frontend" },
    { name: "Three.js",    level: 80, color: "#8b5cf6", category: "3D/WebGL" },
    { name: "UI/UX",       level: 92, color: "#FF6B6B", category: "Design" },
    { name: "MongoDB",     level: 78, color: "#47A248", category: "Backend" },
    { name: "Python",      level: 75, color: "#3776AB", category: "Backend" },
  ],

  // ----------------------------------------------------------
  // 💼 SERVICES
  // (what you offer to clients)
  // ----------------------------------------------------------
  services: [
    {
      icon: "🌐",
      title: "Web Development",
      description:
        "Full-stack web applications built with modern technologies. Fast, scalable, and SEO-friendly.",
    },
    {
      icon: "🎨",
      title: "UI/UX Design",
      description:
        "Beautiful, intuitive interfaces designed with user experience at the core. Figma to production.",
    },
    {
      icon: "🧊",
      title: "3D & WebGL",
      description:
        "Immersive 3D experiences for the web using Three.js and WebGL. Product viewers, AR features.",
    },
    {
      icon: "📱",
      title: "Mobile Apps",
      description:
        "Cross-platform mobile applications with React Native. iOS & Android from one codebase.",
    },
    {
      icon: "⚡",
      title: "Performance Optimization",
      description:
        "Speed up your existing website or app. Core Web Vitals, lazy loading, and bundle optimization.",
    },
    {
      icon: "🤖",
      title: "AI Integration",
      description:
        "Integrate OpenAI, Gemini, or custom ML models into your product for smart features.",
    },
  ],

  // ----------------------------------------------------------
  // 💼 EXPERIENCE (work history)
  // ----------------------------------------------------------
  experience: [
    {
      company: "TechVision Labs",
      role: "Senior Frontend Developer",
      duration: "Jan 2023 – Present",
      location: "Remote",
      description:
        "Led development of 3D product visualization platform used by 500k+ monthly users. Migrated legacy jQuery codebase to React + TypeScript.",
      tech: ["React", "TypeScript", "Three.js", "WebGL"],
      type: "Full-time",
    },
    {
      company: "InnovateCo",
      role: "Full Stack Developer",
      duration: "Jun 2021 – Dec 2022",
      location: "Lahore, Pakistan",
      description:
        "Built and maintained multiple SaaS products. Designed RESTful APIs consumed by mobile and web clients.",
      tech: ["Node.js", "React", "MongoDB", "AWS"],
      type: "Full-time",
    },
    {
      company: "Freelance",
      role: "Web Developer & Designer",
      duration: "Jan 2020 – May 2021",
      location: "Remote",
      description:
        "Delivered 20+ client projects across e-commerce, portfolios, and dashboards. 5-star rated on Upwork.",
      tech: ["React", "WordPress", "Figma", "Shopify"],
      type: "Freelance",
    },
  ],

  // ----------------------------------------------------------
  // 🎓 EDUCATION
  // ----------------------------------------------------------
  education: [
    {
      institution: "COMSATS University",
      degree: "BS Computer Science",
      year: "2016 – 2020",
      grade: "3.7 GPA",
      description:
        "Specialized in Software Engineering. Final year project: AI-powered code review assistant.",
      icon: "🎓",
    },
    {
      institution: "Coursera & Udemy",
      degree: "Online Certifications",
      year: "2020 – Present",
      grade: "Multiple Certs",
      description:
        "React Advanced, Three.js Journey, AWS Cloud Practitioner, Google UX Design Certificate.",
      icon: "📜",
    },
  ],

  // ----------------------------------------------------------
  // 🚀 PROJECTS
  // Add as many as you want. Delete entries to remove them.
  // ----------------------------------------------------------
  projects: [
    {
      title: "3D E-Commerce Platform",
      description:
        "Interactive shopping experience with 3D product visualization and AR try-on features.",
      tech: ["React", "Three.js", "WebGL", "Node.js"],
      emoji: "🛍️",            // shown if no image
      image: "",              // URL to project screenshot e.g. "/assets/project1.jpg"
      githubLink: "https://github.com/haseebrehman/ecommerce-3d",
      liveLink: "https://demo.haseeb.dev/ecommerce",
      gradient: "linear-gradient(135deg, #6366f1, #ec4899)",
      featured: true,
    },
    {
      title: "AI Dashboard Analytics",
      description:
        "Real-time analytics dashboard with AI-powered insights, predictions, and beautiful data visualizations.",
      tech: ["React", "D3.js", "Python", "TensorFlow"],
      emoji: "📊",
      image: "",
      githubLink: "https://github.com/haseebrehman/ai-dashboard",
      liveLink: "",
      gradient: "linear-gradient(135deg, #3b82f6, #06b6d4)",
      featured: true,
    },
    {
      title: "Virtual Reality Portfolio",
      description:
        "Immersive VR portfolio experience showcasing creative work in a fully navigable 3D space.",
      tech: ["WebXR", "Three.js", "React", "Blender"],
      emoji: "🥽",
      image: "",
      githubLink: "",
      liveLink: "https://vr.haseeb.dev",
      gradient: "linear-gradient(135deg, #10b981, #14b8a6)",
      featured: false,
    },
    {
      title: "Smart City IoT Hub",
      description:
        "IoT management platform for smart city infrastructure monitoring with real-time WebSocket updates.",
      tech: ["React", "WebSocket", "Node.js", "MongoDB"],
      emoji: "🌆",
      image: "",
      githubLink: "https://github.com/haseebrehman/iot-hub",
      liveLink: "",
      gradient: "linear-gradient(135deg, #f97316, #ef4444)",
      featured: false,
    },
  ],

  // ----------------------------------------------------------
  // 🎨 THEME SETTINGS
  // Change these hex colors to completely restyle the portfolio
  // ----------------------------------------------------------
  theme: {
    primaryColor:   "#6366f1",  // indigo — main brand color
    secondaryColor: "#ec4899",  // pink — accent/gradient
    accentColor:    "#8b5cf6",  // purple — secondary accent
    darkBg:         "#0a0a0f",  // main background
    darkerBg:       "#05050a",  // darker background
    defaultMode:    "dark",     // "dark" or "light"
  },

  // ----------------------------------------------------------
  // 🔍 SEO
  // ----------------------------------------------------------
  seo: {
    siteTitle: "Haseeb Ur Rehman | Developer & Designer",
    description:
      "Portfolio of Haseeb Ur Rehman — Full Stack Developer specializing in 3D web experiences, React, and modern UI/UX.",
    keywords:
      "Haseeb Ur Rehman, React Developer, Three.js, Portfolio, Web Developer Pakistan",
    ogImage: "", // social media preview image URL
  },
};

export default portfolioConfig;
