/**
 * ==========================================================================
 * RUNTIME RUNTIME CONTROL ENGINE
 * ==========================================================================
 * Governs active localization, layout switching, and responsive viewport actions.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Application Runtime State Machine Cache
    let currentLang = localStorage.getItem('fixitium-lang') || 'fi';
    
    // Primary Core Selectors
    const themeToggleBtn = document.getElementById('theme-toggle');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const langBtns = document.querySelectorAll('.lang-btn');
    const sections = document.querySelectorAll('section');

    /* ==========================================================================
       1. LOCALIZATION (i18n) ENGINE LAYER
       ========================================================================== */
    function translateDOM(lang) {
        currentLang = lang;
        localStorage.setItem('fixitium-lang', lang);

        document.querySelectorAll('[data-i18n]').forEach(element => {
            const translationKey = element.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][translationKey]) {
                // Determine layout rules depending on component structural tag type
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.setAttribute('placeholder', translations[lang][translationKey]);
                } else {
                    element.textContent = translations[lang][translationKey];
                }
            }
        });

        // Toggle UI Selection Node Configurations
        langBtns.forEach(btn => {
            if (btn.getAttribute('data-lang') === lang) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // Enforce structural W3C standards matching language localization
        document.documentElement.setAttribute('lang', lang);
    }

    langBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            translateDOM(btn.getAttribute('data-lang'));
        });
    });

    // Fire default operational translation context execution run
    translateDOM(currentLang);

    /* ==========================================================================
       2. LIGHT / DARK ACTIVE THEMING ENGINE
       ========================================================================== */
    function synchronizeSystemTheme() {
        const structuralCache = localStorage.getItem('fixitium-theme');
        if (structuralCache === 'light') {
            document.body.classList.replace('dark-theme', 'light-theme');
            themeToggleBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
        } else {
            document.body.classList.replace('light-theme', 'dark-theme');
            themeToggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
        }
    }

    themeToggleBtn.addEventListener('click', () => {
        if (document.body.classList.contains('dark-theme')) {
            document.body.classList.replace('dark-theme', 'light-theme');
            themeToggleBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
            localStorage.setItem('fixitium-theme', 'light');
        } else {
            document.body.classList.replace('light-theme', 'dark-theme');
            themeToggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
            localStorage.setItem('fixitium-theme', 'dark');
        }
    });

    synchronizeSystemTheme();

    /* ==========================================================================
       3. MOBILE LAYOUT NAVIGATION MECHANICS (HAMBURGER)
       ========================================================================== */
    function dismissMobileNavigationMenu() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', dismissMobileNavigationMenu);
    });

    /* ==========================================================================
       4. SCROLL ANIMATION SUB-SYSTEM (INTERSECTION OBSERVER)
       ========================================================================== */
    const renderingObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                // Discontinue node connection cycles to prevent engine overhead
                renderingObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -40px 0px"
    });

    document.querySelectorAll('.fade-in').forEach(element => {
        renderingObserver.observe(element);
    });

    /* ==========================================================================
       5. PERSISTENT NAVIGATION AUTO-HIGHLIGHT POSITION ENGINE
       ========================================================================== */
    const positioningObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetID = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    if (link.getAttribute('href') === `#${targetID}`) {
                        link.classList.add('active-link');
                    } else {
                        link.classList.remove('active-link');
                    }
                });
            }
        });
    }, {
        threshold: 0.4,
        rootMargin: "-10% 0px -50% 0px"
    });

    sections.forEach(section => positioningObserver.observe(section));
});
