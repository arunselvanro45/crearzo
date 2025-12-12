// Simple site JS: set year and configure WhatsApp link
document.getElementById('year').textContent = new Date().getFullYear();

// WhatsApp number provided: +91 1234567890
const PHONE = "919360345912"; // country code + number, no plus sign
const PRESET_TEXT = encodeURIComponent("Hi! I'm interested in logo/branding services. Please share details.");
const WA_URL = `https://wa.me/${PHONE}?text=${PRESET_TEXT}`;

const waLinks = document.querySelectorAll('#whatsappLink, #whatsappHero');
waLinks.forEach(a => { a.href = WA_URL; });

// Page title already set, brand logo used in header image.

