// seed.js — Run once to populate MongoDB with Haseeb's data
// Usage: node seed.js

require('dotenv').config();
const mongoose = require('mongoose');
const Portfolio = require('./models/Portfolio');

const data = {
  personal: {
    name: 'Haseeb Ur Rehman',
    firstName: 'Haseeb',
    lastName: 'Ur Rehman',
    tagline: 'Full Stack Developer',
    subtitle: 'I build clean, modern web applications using React, Node.js & MongoDB. Turning ideas into real products.',
    availability: 'Open to Work',
    profilePhoto: '/portfolio/assets/profile.jpg',
    logo: 'H',
    logoText: 'Haseeb',
    location: 'Pakistan',
    resumeLink: '',
  },
  contact: {
    email: 'haseebmalhi08@gmail.com',
    phone: '+92-300-0000000',
    address: 'Lahore, Punjab, Pakistan',
    website: 'https://haseebmalhi08-bit.github.io/portfolio/',
  },
  social: {
    github: 'https://github.com/haseebmalhi08-bit',
    linkedin: '',
    twitter: '',
    instagram: '',
    youtube: '',
    facebook: '',
  },
  about: {
    heading: 'Passionate about Clean Code',
    bio: [
      "I'm Haseeb Ur Rehman, a Full Stack Developer from Pakistan who loves building clean, modern web applications that actually work great.",
      "I specialize in the MERN stack — MongoDB, Express, React, and Node.js — and I'm always learning new technologies to deliver better solutions."
    ],
    stats: [
      { number: '10+', label: 'Projects Completed' },
      { number: '2+', label: 'Years Experience' },
      { number: '100%', label: 'Client Satisfaction' },
      { number: '5+', label: 'Technologies' },
    ],
  },
  skills: [
    { name: 'React',       level: 85, color: '#61DAFB', category: 'Frontend' },
    { name: 'JavaScript',  level: 80, color: '#F7DF1E', category: 'Frontend' },
    { name: 'HTML & CSS',  level: 90, color: '#E34F26', category: 'Frontend' },
    { name: 'Node.js',     level: 75, color: '#339933', category: 'Backend' },
    { name: 'Express.js',  level: 75, color: '#ffffff', category: 'Backend' },
    { name: 'MongoDB',     level: 70, color: '#47A248', category: 'Backend' },
    { name: 'Git & GitHub',level: 80, color: '#F05032', category: 'Tools' },
    { name: 'Python',      level: 60, color: '#3776AB', category: 'Backend' },
  ],
  services: [
    {
      icon: '🌐',
      title: 'Web Development',
      description: 'Full-stack web applications built with React, Node.js and MongoDB. Fast, modern, and scalable.',
    },
    {
      icon: '🎨',
      title: 'UI/UX Design',
      description: 'Clean, intuitive interfaces with great user experience. Responsive on all devices.',
    },
    {
      icon: '🗄️',
      title: 'Backend & APIs',
      description: 'RESTful API development with Express.js and MongoDB. Secure authentication included.',
    },
    {
      icon: '📱',
      title: 'Responsive Design',
      description: 'Mobile-first websites that look perfect on phones, tablets, and desktops.',
    },
  ],
  experience: [
    {
      company: 'Freelance',
      role: 'Full Stack Developer',
      duration: '2023 – Present',
      location: 'Remote',
      description: 'Building custom web applications for clients. Working with React, Node.js, and MongoDB to deliver full-stack solutions.',
      tech: ['React', 'Node.js', 'MongoDB', 'Express'],
      type: 'Freelance',
    },
    {
      company: 'Self-Learning & Projects',
      role: 'Web Developer',
      duration: '2022 – 2023',
      location: 'Pakistan',
      description: 'Built multiple personal and open-source projects. Learned modern web development through online courses and hands-on practice.',
      tech: ['HTML', 'CSS', 'JavaScript', 'React'],
      type: 'Self',
    },
  ],
  education: [
    {
      institution: 'University',
      degree: 'BS Computer Science',
      year: '2021 – Present',
      grade: 'In Progress',
      description: 'Currently studying Computer Science with focus on Software Engineering and Web Development.',
      icon: '🎓',
    },
    {
      institution: 'Online Platforms',
      degree: 'Web Development Courses',
      year: '2022 – Present',
      grade: 'Certified',
      description: 'Completed multiple courses on React, Node.js, MongoDB, and full-stack development on Udemy and YouTube.',
      icon: '📜',
    },
  ],
  projects: [
    {
      title: 'Portfolio Website',
      description: 'A professional portfolio built with React + Vite, featuring a Node.js backend, MongoDB database, and a password-protected admin panel to edit all content.',
      tech: ['React', 'Node.js', 'MongoDB', 'Express'],
      emoji: '💼',
      image: '',
      githubLink: 'https://github.com/haseebmalhi08-bit/portfolio',
      liveLink: 'https://haseebmalhi08-bit.github.io/portfolio/',
      gradient: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
      featured: true,
    },
    {
      title: 'MERN Todo App',
      description: 'A full-stack task management application with user authentication, CRUD operations, and a clean modern UI.',
      tech: ['React', 'Node.js', 'MongoDB', 'JWT'],
      emoji: '✅',
      image: '',
      githubLink: 'https://github.com/haseebmalhi08-bit',
      liveLink: '',
      gradient: 'linear-gradient(135deg, #10b981, #06b6d4)',
      featured: true,
    },
    {
      title: 'E-Commerce Store',
      description: 'A complete online store with product listings, cart functionality, and a clean checkout flow.',
      tech: ['React', 'CSS', 'JavaScript'],
      emoji: '🛍️',
      image: '',
      githubLink: 'https://github.com/haseebmalhi08-bit',
      liveLink: '',
      gradient: 'linear-gradient(135deg, #f97316, #ec4899)',
      featured: false,
    },
  ],
  certificates: [
    {
      title: 'React - The Complete Guide',
      issuer: 'Udemy',
      date: 'Dec 2023',
      imageUrl: '',
      fileUrl: 'https://udemy.com/certificate/example',
    },
    {
      title: 'Node.js, Express, MongoDB & More',
      issuer: 'Udemy',
      date: 'Jan 2024',
      imageUrl: '',
      fileUrl: '',
    },
    {
      title: 'JavaScript Algorithms and Data Structures',
      issuer: 'freeCodeCamp',
      date: 'Mar 2023',
      imageUrl: '',
      fileUrl: 'https://freecodecamp.org/certification/example',
    },
  ],
  theme: {
    primaryColor:   '#2563eb',
    secondaryColor: '#14b8a6',
    accentColor:    '#0ea5e9',
    darkBg:         '#0f172a',
    darkerBg:       '#0b1120',
  },
  seo: {
    siteTitle:   'Haseeb Ur Rehman | Full Stack Developer',
    description: 'Portfolio of Haseeb Ur Rehman — Full Stack Developer from Pakistan specializing in React, Node.js, and MongoDB.',
    keywords:    'Haseeb Ur Rehman, React Developer, Node.js, MongoDB, MERN Stack, Web Developer Pakistan',
    ogImage:     '',
  },
};

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    const existingPortfolio = await Portfolio.findOne();
    if (existingPortfolio) {
      console.log('Portfolio data already exists; seed skipped to protect your saved data.');
      return;
    }

    await Portfolio.create(data);
    console.log('✅ Portfolio data seeded successfully!');
  } catch (err) {
    console.error('❌ Seeding failed:', err.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seed();
