/*
====================================================
Crearzo Portfolio Website
Navigation + Portfolio Modal
====================================================
*/

document.addEventListener('DOMContentLoaded', function () {

  /* ================= NAV SCROLL ================= */

  const header = document.getElementById('header');
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;

      const offset = header.offsetHeight;
      const position =
        target.getBoundingClientRect().top + window.pageYOffset - offset;

      window.scrollTo({ top: position, behavior: 'smooth' });
    });
  });

  /* ================= FOOTER YEAR ================= */

  document.getElementById('year').textContent = new Date().getFullYear();

  /* ================= PORTFOLIO RENDER ================= */

  const grid = document.getElementById('portfolioGrid');
  if (!grid || typeof portfolioProjects === 'undefined') return;

  grid.innerHTML = '';

  portfolioProjects.forEach((project, index) => {
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

  /* ================= MODAL LOGIC ================= */

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

    const data = portfolioProjects[card.dataset.index];

    modalTitle.textContent = data.title;
    modalCategory.textContent = data.category;
    modalDescription.textContent = data.description;
    modalImage.src = data.image;

    modal.classList.add('active');
  });

  function closeModal() {
    modal.classList.remove('active');
  }

  modalClose.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', closeModal);

});
