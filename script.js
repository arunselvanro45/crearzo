/*
====================================================
Crearzo Portfolio Website
Navigation, Portfolio, Modal, Search & Contact
====================================================
*/

document.addEventListener('DOMContentLoaded', function () {

  /* ==================================================
     STICKY NAVIGATION SCROLL
  ================================================== */

  const header = document.getElementById('header');

  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();

      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;

      const offset = header.offsetHeight;
      const position =
        target.getBoundingClientRect().top +
        window.pageYOffset -
        offset;

      window.scrollTo({ top: position, behavior: 'smooth' });
    });
  });

  /* ==================================================
     FOOTER YEAR
  ================================================== */

  document.getElementById('year').textContent =
    new Date().getFullYear();

  /* ==================================================
     PORTFOLIO RENDER + SEARCH
  ================================================== */

  const grid = document.getElementById('portfolioGrid');
  const searchInput = document.querySelector('.portfolio-search input');

  if (!grid || typeof portfolioProjects === 'undefined') return;

  function renderPortfolio(projects) {
    grid.innerHTML = '';

    projects.forEach((project, index) => {
      const card = document.createElement('div');
      card.className = 'portfolio-card';
      card.dataset.index = index;

      card.innerHTML = `
        <div class="portfolio-card-image">
          <img src="${project.image}" alt="${project.title}">
        </div>
        <div class="portfolio-card-body">
          <h3>${project.title}</h3>
          <span class="portfolio-card-category">${project.category}</span>
        </div>
      `;

      grid.appendChild(card);
    });
  }

  renderPortfolio(portfolioProjects);

  searchInput.addEventListener('input', function () {
    const query = this.value.toLowerCase().trim();

    const filtered = portfolioProjects.filter(p =>
      p.title.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query)
    );

    renderPortfolio(filtered);
  });

  /* ==================================================
     PORTFOLIO MODAL
  ================================================== */

  const modal = document.getElementById('portfolioModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalCategory = document.getElementById('modalCategory');
  const modalDescription = document.getElementById('modalDescription');
  const modalImage = document.getElementById('modalImage');

  const modalClose = document.querySelector('.modal-close');
  const modalOverlay = document.querySelector('.modal-overlay');

  grid.addEventListener('click', function (e) {
    const card = e.target.closest('.portfolio-card');
    if (!card) return;

    const project = portfolioProjects[card.dataset.index];

    modalTitle.textContent = project.title;
    modalCategory.textContent = project.category;
    modalDescription.textContent = project.description;
    modalImage.src = project.image;

    modal.classList.add('active');
  });

  function closeModal() {
    modal.classList.remove('active');
  }

  modalClose.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', closeModal);

  /* ==================================================
     CONTACT – WHATSAPP ONE-SHOT FLOW
  ================================================== */

  const whatsappCTA = document.querySelector('.contact-whatsapp');
  const contactForm = document.getElementById('contactForm');

  // Your WhatsApp number (CHANGE THIS)
  const WHATSAPP_NUMBER = '910000000000';

  // Primary WhatsApp CTA
  whatsappCTA.addEventListener('click', function (e) {
    e.preventDefault();
    window.open(`https://wa.me/${WHATSAPP_NUMBER}`, '_blank');
  });

  // One-shot form submit → WhatsApp
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = contactForm.querySelector('input[type=\"text\"]').value.trim();
    const phone = contactForm.querySelector('input[type=\"tel\"]').value.trim();
    const message = contactForm.querySelector('textarea').value.trim();

    if (!name || !phone || !message) return;

    const whatsappMessage =
      `Hello Crearzo,%0A%0A` +
      `Name: ${name}%0A` +
      `Phone: ${phone}%0A%0A` +
      `Message:%0A${message}`;

    const whatsappURL =
      `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`;

    // Disable button to prevent double click
    contactForm.querySelector('button').disabled = true;

    // Open WhatsApp (ONE SHOT)
    window.open(whatsappURL, '_blank');

    // Optional: reset form after open
    contactForm.reset();
    contactForm.querySelector('button').disabled = false;
  });

});
