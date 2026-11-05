const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
  personal: {
    name:         { type: String, default: 'Haseeb Ur Rehman' },
    firstName:    { type: String, default: 'Haseeb' },
    lastName:     { type: String, default: 'Ur Rehman' },
    tagline:      { type: String, default: 'Full Stack Developer' },
    subtitle:     { type: String, default: 'Building modern web applications with clean code and great user experiences.' },
    availability: { type: String, default: 'Open to Work' },
    profilePhoto: { type: String, default: '/portfolio/assets/profile.jpg' },
    logo:         { type: String, default: 'H' },
    logoText:     { type: String, default: 'Haseeb' },
    location:     { type: String, default: 'Pakistan' },
    resumeLink:   { type: String, default: '' },
  },
  contact: {
    email:   { type: String, default: 'haseebmalhi08@gmail.com' },
    phone:   { type: String, default: '+92-300-0000000' },
    address: { type: String, default: 'Lahore, Punjab, Pakistan' },
    website: { type: String, default: '' },
  },
  social: {
    github:    { type: String, default: 'https://github.com/haseebmalhi08-bit' },
    linkedin:  { type: String, default: '' },
    twitter:   { type: String, default: '' },
    instagram: { type: String, default: '' },
    youtube:   { type: String, default: '' },
    facebook:  { type: String, default: '' },
  },
  about: {
    heading: { type: String, default: 'Passionate Developer' },
    bio: {
      type: [String],
      default: [
        "I'm Haseeb Ur Rehman, a Full Stack Developer from Pakistan who loves building clean, modern web applications.",
        "I specialize in React and Node.js with MongoDB, crafting end-to-end solutions that are fast, scalable, and user-friendly."
      ]
    },
    stats: { type: mongoose.Schema.Types.Mixed, default: [] },
  },
  skills:       { type: mongoose.Schema.Types.Mixed, default: [] },
  services:     { type: mongoose.Schema.Types.Mixed, default: [] },
  experience:   { type: mongoose.Schema.Types.Mixed, default: [] },
  education:    { type: mongoose.Schema.Types.Mixed, default: [] },
  projects:     { type: mongoose.Schema.Types.Mixed, default: [] },
  certificates: { type: mongoose.Schema.Types.Mixed, default: [] },
  theme: {
    primaryColor:   { type: String, default: '#2563eb' },
    secondaryColor: { type: String, default: '#14b8a6' },
    accentColor:    { type: String, default: '#0ea5e9' },
    darkBg:         { type: String, default: '#0f172a' },
    darkerBg:       { type: String, default: '#0b1120' },
  },
  seo: {
    siteTitle:   { type: String, default: 'Haseeb Ur Rehman | Full Stack Developer' },
    description: { type: String, default: 'Portfolio of Haseeb Ur Rehman — Full Stack Developer.' },
    keywords:    { type: String, default: 'Haseeb Ur Rehman, React Developer, Node.js, MongoDB, Web Developer Pakistan' },
    ogImage:     { type: String, default: '' },
  },
}, { timestamps: true, strict: false });

module.exports = mongoose.model('Portfolio', portfolioSchema);
