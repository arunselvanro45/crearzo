/* ============================================
   Crearzo â€” Main JavaScript
   Preloader, Theme, Nav, Animations, Portfolio,
   Lightbox, Contact Form, Scroll Effects
   ============================================ */

(function () {
    'use strict';

    // â”€â”€ CONSTANTS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    const ITEMS_PER_PAGE = 12;

    // â”€â”€ DOM CACHE â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    const $ = (sel, ctx = document) => ctx.querySelector(sel);
    const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

    const dom = {
        preloader: $('#preloader'),
        navbar: $('#navbar'),
        navLinks: $('#navLinks'),
        hamburger: $('#hamburger'),
        themeToggle: $('#themeToggle'),
        portfolioGrid: $('#portfolioGrid'),
        loadMoreBtn: $('#loadMoreBtn'),
        loadMoreContainer: $('#loadMoreContainer'),
        portfolioCount: $('#portfolioCount'),
        lightbox: $('#lightbox'),
        lightboxImg: $('#lightboxImg'),
        lightboxCaption: $('#lightboxCaption'),
        lightboxCounter: $('#lightboxCounter'),
        lightboxClose: $('#lightboxClose'),
        lightboxPrev: $('#lightboxPrev'),
        lightboxNext: $('#lightboxNext'),
        backToTop: $('#backToTop'),
        contactForm: $('#contactForm'),
    };

    // â”€â”€ STATE â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    let currentFilter = 'all';
    let currentPage = 1;
    let filteredData = [];
    let lightboxIndex = 0;
    let lightboxItems = [];

    // â”€â”€ PRELOADER â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    window.addEventListener('load', () => {
        setTimeout(() => {
            dom.preloader.classList.add('loaded');
            document.body.style.overflow = '';
            initAnimations();
        }, 600);
    });
    document.body.style.overflow = 'hidden';

    // â”€â”€ THEME TOGGLE â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    function initTheme() {
        const saved = localStorage.getItem('crearzo-theme');
        if (saved) {
            document.documentElement.setAttribute('data-theme', saved);
        }
    }

    function toggleTheme() {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('crearzo-theme', next);
    }

    initTheme();
    dom.themeToggle.addEventListener('click', toggleTheme);

    // â”€â”€ NAVIGATION â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    // Scroll effect
    let lastScroll = 0;
    let ticking = false;

    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                const scrollY = window.scrollY;

                // Navbar background
                dom.navbar.classList.toggle('scrolled', scrollY > 50);

                // Back to top visibility
                dom.backToTop.classList.toggle('visible', scrollY > 600);

                // Active nav link
                updateActiveNav(scrollY);

                lastScroll = scrollY;
                ticking = false;
            });
            ticking = true;
        }
    }
    window.addEventListener('scroll', onScroll, { passive: true });

    function updateActiveNav(scrollY) {
        const sections = $$('section[id]');
        let activeId = 'hero';

        for (const section of sections) {
            const top = section.offsetTop - 120;
            const bottom = top + section.offsetHeight;
            if (scrollY >= top && scrollY < bottom) {
                activeId = section.id;
            }
        }

        $$('.nav-link').forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === '#' + activeId);
        });
    }

    // Hamburger menu
    dom.hamburger.addEventListener('click', () => {
        dom.hamburger.classList.toggle('active');
        dom.navLinks.classList.toggle('active');
    });

    // Close mobile menu on link click
    $$('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            dom.hamburger.classList.remove('active');
            dom.navLinks.classList.remove('active');
        });
    });

    // Back to top
    dom.backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // â”€â”€ SCROLL ANIMATIONS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    function initAnimations() {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const delay = parseInt(entry.target.dataset.delay || 0);
                        setTimeout(() => {
                            entry.target.classList.add('animated');
                        }, delay);
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
        );

        $$('[data-animate]').forEach(el => observer.observe(el));
    }

    // â”€â”€ COUNTER ANIMATION â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    function initCounters() {
        const counterObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateCounter(entry.target);
                        counterObserver.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.5 }
        );

        $$('[data-count]').forEach(el => counterObserver.observe(el));
    }

    function animateCounter(el) {
        const target = parseInt(el.dataset.count);
        const duration = 2000;
        const start = performance.now();

        function update(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
            el.textContent = Math.floor(target * eased);

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                el.textContent = target;
            }
        }

        requestAnimationFrame(update);
    }

    initCounters();

    // â”€â”€ PORTFOLIO â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    function getFilteredData() {
        if (currentFilter === 'all') return PORTFOLIO_DATA;
        return PORTFOLIO_DATA.filter(item => item.category === currentFilter);
    }

    function renderPortfolio(resetPage) {
        if (resetPage) {
            currentPage = 1;
            dom.portfolioGrid.innerHTML = '';
        }

        filteredData = getFilteredData();
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        const end = currentPage * ITEMS_PER_PAGE;
        const pageItems = filteredData.slice(start, end);

        const fragment = document.createDocumentFragment();

        pageItems.forEach((item, i) => {
            const div = document.createElement('div');
            div.className = 'portfolio-item';
            div.dataset.category = item.category;
            div.dataset.index = start + i;
            div.style.animationDelay = `${Math.min(i * 0.05, 0.4)}s`;

            const img = document.createElement('img');
            img.alt = item.title;
            img.loading = 'lazy';

            // Lazy load with IntersectionObserver
            img.dataset.src = item.src;
            img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%2318181b" width="400" height="300"/%3E%3C/svg%3E';

            const overlay = document.createElement('div');
            overlay.className = 'overlay';
            const label = document.createElement('span');
            label.textContent = item.title;
            overlay.appendChild(label);

            div.appendChild(img);
            div.appendChild(overlay);

            div.addEventListener('click', () => openLightbox(start + i));

            fragment.appendChild(div);
        });

        dom.portfolioGrid.appendChild(fragment);

        // Observe new images for lazy loading
        observeImages();

        // Update count & button visibility
        const totalShown = Math.min(currentPage * ITEMS_PER_PAGE, filteredData.length);
        dom.portfolioCount.textContent = `Showing ${totalShown} of ${filteredData.length}`;

        if (totalShown >= filteredData.length) {
            dom.loadMoreContainer.style.display = 'none';
        } else {
            dom.loadMoreContainer.style.display = 'flex';
        }
    }

    // Lazy load images with IntersectionObserver
    function observeImages() {
        const imgObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                        }
                        imgObserver.unobserve(img);
                    }
                });
            },
            { rootMargin: '200px 0px' }
        );

        $$('.portfolio-item img[data-src]', dom.portfolioGrid).forEach(img => {
            imgObserver.observe(img);
        });
    }

    // Tab filtering
    $$('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            $$('.tab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            currentFilter = btn.dataset.filter;
            renderPortfolio(true);
        });
    });

    // Load more
    dom.loadMoreBtn.addEventListener('click', () => {
        currentPage++;
        renderPortfolio(false);
    });

    // Initialize portfolio
    renderPortfolio(true);

    // â”€â”€ LIGHTBOX â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    function openLightbox(index) {
        lightboxItems = filteredData;
        lightboxIndex = index;
        updateLightbox();
        dom.lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        dom.lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    function updateLightbox() {
        const item = lightboxItems[lightboxIndex];
        if (!item) return;

        dom.lightboxImg.style.opacity = '0';
        setTimeout(() => {
            dom.lightboxImg.src = item.src;
            dom.lightboxImg.alt = item.title;
            dom.lightboxCaption.textContent = item.title;
            dom.lightboxCounter.textContent = `${lightboxIndex + 1} / ${lightboxItems.length}`;
            dom.lightboxImg.style.opacity = '1';
        }, 150);
    }

    function lightboxPrev() {
        lightboxIndex = (lightboxIndex - 1 + lightboxItems.length) % lightboxItems.length;
        updateLightbox();
    }

    function lightboxNext() {
        lightboxIndex = (lightboxIndex + 1) % lightboxItems.length;
        updateLightbox();
    }

    dom.lightboxClose.addEventListener('click', closeLightbox);
    dom.lightboxPrev.addEventListener('click', lightboxPrev);
    dom.lightboxNext.addEventListener('click', lightboxNext);

    // Close on background click
    dom.lightbox.addEventListener('click', (e) => {
        if (e.target === dom.lightbox || e.target === dom.lightbox.querySelector('.lightbox-content')) {
            closeLightbox();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!dom.lightbox.classList.contains('active')) return;

        switch (e.key) {
            case 'Escape': closeLightbox(); break;
            case 'ArrowLeft': lightboxPrev(); break;
            case 'ArrowRight': lightboxNext(); break;
        }
    });

    // Touch swipe support for lightbox
    let touchStartX = 0;
    let touchEndX = 0;

    dom.lightbox.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    dom.lightbox.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 60) {
            if (diff > 0) lightboxNext();
            else lightboxPrev();
        }
    }, { passive: true });

    // â”€â”€ CONTACT FORM â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    dom.contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = dom.contactForm.querySelector('#name').value.trim();
        const email = dom.contactForm.querySelector('#email').value.trim();
        const service = dom.contactForm.querySelector('#service').value;
        const message = dom.contactForm.querySelector('#message').value.trim();

        if (!name || !service) return;

        // Build WhatsApp message with form data
        let msgParts = [`Hi, I'm ${name}.\n`];
        if (email) msgParts.push(`Email: ${email}`);
        msgParts.push(`Service: ${service}`);
        if (message) msgParts.push(`\nMessage: ${message}`);
        const waMessage = encodeURIComponent(msgParts.join('\n'));

        // Open WhatsApp with prefilled message
        window.open(`https://wa.me/919360345912?text=${waMessage}`, '_blank', 'noopener,noreferrer');

        // Show success feedback
        const btn = dom.contactForm.querySelector('button[type="submit"]');
        const originalHTML = btn.innerHTML;
        btn.innerHTML = 'âœ“ Opening WhatsApp...';
        btn.disabled = true;

        setTimeout(() => {
            btn.innerHTML = originalHTML;
            btn.disabled = false;
            dom.contactForm.reset();
        }, 3000);
    });

    // â”€â”€ SMOOTH SCROLL FOR ANCHOR LINKS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    $$('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // â”€â”€ PROFILE POPOVER â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    const profileTrigger = $('#profileTrigger');
    const profilePopover = $('#profilePopover');
    const profileOverlay = $('#profileOverlay');
    const popoverClose = $('#popoverClose');

    function openPopover() {
        profilePopover.classList.add('active');
        profileOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closePopover() {
        profilePopover.classList.remove('active');
        profileOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    profileTrigger.addEventListener('click', openPopover);
    profileTrigger.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openPopover();
        }
    });
    popoverClose.addEventListener('click', closePopover);
    profileOverlay.addEventListener('click', closePopover);
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && profilePopover.classList.contains('active')) {
            closePopover();
        }
    });

})();
