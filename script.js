/*
====================================================
Crearzo Portfolio Website
Navigation, Scroll & Portfolio Rendering
====================================================
*/

document.addEventListener('DOMContentLoaded', function () {

  /* ==================================================
     STICKY HEADER OFFSET + SMOOTH SCROLL
  ================================================== */

  const header = document.getElementById('header');
  const navLinks = document.querySelectorAll('.nav-links a');

  navLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();

      const targetSection = document.querySelector(this.getAttribute('href'));
      if (!targetSection) return;

      const headerOffset = header.offsetHeight;
      const sectionPosition = targetSection.getBoundingClientRect().top;
      const offsetPosition =
        sectionPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    });
  });

  /* ==================================================
     FOOTER YEAR AUTO UPDATE
  ================================================== */

  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  /* ==================================================
     PORTFOLIO CARD RENDERING (FROM data/portfolio.js)
  ================================================== */

  const portfolioGrid = document.getElementById('portfolioGrid');

  // Safety check
  if (!portfolioGrid || typeof portfolioProjects === 'undefined') {
    return;
  }

  // Clear grid before rendering
  portfolioGrid.innerHTML = '';

  // Loop through each project
  portfolioProjects.forEach(function (project, index) {

    // Create card container
    const card = document.createElement('div');
    card.className = 'portfolio-card';
    card.setAttribute('data-index', index);

    // Card HTML
    card.innerHTML = `
      <div class="portfolio-card-image">
        <img src="${project.image}" alt="${project.title}">
      </div>
      <div class="portfolio-card-body">
        <h3>${project.title}</h3>
        <span class="portfolio-card-category">${project.category}</span>
      </div>
    `;

    // Append card to grid
    portfolioGrid.appendChild(card);
  });

});
