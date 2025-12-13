/*
====================================================
Crearzo Portfolio Website
Navigation & Scroll Behaviour
====================================================
*/

document.addEventListener('DOMContentLoaded', function () {

  /* ===== Sticky Header Offset Scroll ===== */

  const header = document.getElementById('header');
  const navLinks = document.querySelectorAll('.nav-links a');

  navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();

      const target = document.querySelector(this.getAttribute('href'));
      const offset = header.offsetHeight;

      const position = target.getBoundingClientRect().top + window.pageYOffset - offset;

      window.scrollTo({
        top: position,
        behavior: 'smooth'
      });
    });
  });

  /* ===== Footer Year ===== */

  document.getElementById('year').textContent = new Date().getFullYear();

});
