/*
====================================================
Crearzo Portfolio Website
Portfolio Data Source
File: data/portfolio.js
Purpose:
- Single source of truth for portfolio projects
- Add / remove projects ONLY here
- No UI or DOM logic in this file
====================================================
*/

// Portfolio projects array
// You can add unlimited projects by following the same object format

const portfolioProjects = [
  {
    title: "Brand Identity for Fintech Startup",
    category: "Fintech / Startup",
    image: "assets/portfolio/project1.jpg",
    description: "Complete logo and brand identity design for a modern fintech startup, focusing on trust and scalability."
  },
  {
    title: "Minimal Logo for Fashion Brand",
    category: "Fashion",
    image: "assets/portfolio/project2.jpg",
    description: "Designed a clean, minimal logo system for a premium fashion brand with global aspirations."
  },
  {
    title: "Corporate Branding for IT Company",
    category: "Corporate / IT",
    image: "assets/portfolio/project3.jpg",
    description: "Developed a professional brand identity including logo, colors, and typography for an IT services company."
  }
];

// IMPORTANT:
// - Do NOT rename 'portfolioProjects'
// - script.js will read from this variable directly
// - Images must exist in /assets/portfolio/
