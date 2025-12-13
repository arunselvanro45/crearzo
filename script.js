/* =====================================================
   GLOBAL ELEMENT REFERENCES
===================================================== */

const portfolioGrid = document.getElementById("portfolioGrid");
const searchInput = document.getElementById("portfolioSearch");

const modal = document.getElementById("portfolioModal");
const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalCategory = document.getElementById("modalCategory");
const modalDescription = document.getElementById("modalDescription");
const modalClose = document.getElementById("modalClose");

/* =====================================================
   RENDER PORTFOLIO CARDS
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

    // Open modal on click
    card.addEventListener("click", () => openModal(project));

    portfolioGrid.appendChild(card);
  });
}

// Initial render
renderPortfolio(portfolioData);

/* =====================================================
   SEARCH FUNCTIONALITY
===================================================== */

searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();

  const filtered = portfolioData.filter(project =>
    project.title.toLowerCase().includes(query) ||
    project.category.toLowerCase().includes(query)
  );

  renderPortfolio(filtered);
});

/* =====================================================
   MODAL CONTROLS
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

// Close modal when clicking outside content
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.add("hidden");
  }
});

/* =====================================================
   CONTACT FORM → WHATSAPP + EMAIL
===================================================== */

const contactForm = document.getElementById("contactForm");
const whatsappLink = document.getElementById("whatsappLink");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const message = document.getElementById("message").value;

  const text = `Name: ${name}%0APhone: ${phone}%0AMessage: ${message}`;
  const whatsappURL = `https://wa.me/919360345912?text=${text}`;

  window.open(whatsappURL, "_blank");
});

// Direct WhatsApp link
whatsappLink.href = "https://wa.me/919360345912";

/* =====================================================
   FOOTER YEAR
===================================================== */

document.getElementById("year").textContent = new Date().getFullYear();
