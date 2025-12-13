# /*

Crearzo Portfolio Website
Step 3: Navigation Behaviour & Scroll Handling
Author: Crearzo
Purpose:

* Ensure smooth scrolling
* Fix scroll offset due to sticky header
* Add basic safe DOM handling
* NO portfolio logic yet
  ====================================================
  */

// Always wait for DOM to load to avoid timing issues
window.addEventListener('DOMContentLoaded', function () {

/* ================= HEADER OFFSET SETUP ================= */

// Select the header (sticky navigation)
const header = document.getElementById('header');

// Function to get current header height
function getHeaderHeight() {
return header.offsetHeight;
}

/* ================= SMOOTH SCROLL WITH OFFSET ================= */

// Select all navigation links that point to sections
const navLinks = document.querySelectorAll('.nav-links a');

navLinks.forEach(function (link) {
link.addEventListener('click', function (event) {
event.preventDefault(); // Stop default jump

```
  // Get target section ID from href
  const targetId = this.getAttribute('href');
  const targetSection = document.querySelector(targetId);

  if (!targetSection) return;

  // Calculate scroll position with header offset
  const headerOffset = getHeaderHeight();
  const sectionPosition = targetSection.getBoundingClientRect().top;
  const offsetPosition = sectionPosition + window.pageYOffset - headerOffset;

  // Smooth scroll to adjusted position
  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth'
  });
});
```

});

/* ================= FOOTER YEAR AUTO UPDATE ================= */

const yearSpan = document.getElementById('year');
if (yearSpan) {
yearSpan.textContent = new Date().getFullYear();
}

});
