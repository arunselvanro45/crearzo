document.addEventListener("DOMContentLoaded", () => {

  /* =====================================================
     ELEMENT REFERENCES
  ===================================================== */

  const portfolioGrid = document.getElementById("portfolioGrid");
  const searchInput = document.getElementById("portfolioSearch");

  const modal = document.getElementById("portfolioModal");
  const modalImage = document.getElementById("modalImage");
  const modalTitle = document.getElementById("modalTitle");
  const modalCategory = document.getElementById("modalCategory");
  const modalDescription = document.getElementById("modalDescription");
  const modalClose = document.getElementById("modalClose");

  const contactForm = document.getElementById("contactForm");

  /* =====================================================
     SAFETY CHECK (VERY IMPORTANT)
  ===================================================== */

  if (!portfolioGrid || !modal || !modalClose) {
    console.error("Required DOM elements not found");
    return;
  }

  /* =====================================================
     RENDER PORTFOLIO
  ===================================================== */

  function renderPortfolio(projects) {
    portfolioGrid.innerHTML = "";

    projects.forEach(project => {
      const card = document.createElement("div");
      card.className = "portfolio-card";

      card.innerHTML = `
        <img src="${project.image}" alt="${project.title}">
        <h3>${project.title}</h3>
        <p>${project.category}</p>
      `;

      card.addEventListener("click", () => openModal(project));

      portfolioGrid.appendChild(card);
    });
  }

  renderPortfolio(portfolioData);

  /* =====================================================
     SEARCH
  ===================================================== */

  searchInput?.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();

    const filtered = portfolioData.filter(project =>
      project.title.toLowerCase().includes(query) ||
      project.category.toLowerCase().includes(query)
    );

    renderPortfolio(filtered);
  });

  /* =====================================================
     MODAL LOGIC
  ===================================================== */

  function openModal(project) {
    modalImage.src = project.image;
    modalTitle.textContent = project.title;
    modalCategory.textContent = project.category;
    modalDescription.textContent = project.description;

    modal.classList.remove("hidden");
  }

  modalClose.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.add("hidden");
    }
  });

  /* =====================================================
     CONTACT FORM → ONE-SHOT WHATSAPP
  ===================================================== */

  contactForm?.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const message = document.getElementById("message").value;

    const text = `Name: ${name}%0APhone: ${phone}%0AMessage: ${message}`;
    const whatsappURL = `https://wa.me/911234567890?text=${text}`;

    window.open(whatsappURL, "_blank");
  });

  /* =====================================================
     FOOTER YEAR
  ===================================================== */

  const year = document.getElementById("year");
  if (year) {
    year.textContent = new Date().getFullYear();
  }

});
