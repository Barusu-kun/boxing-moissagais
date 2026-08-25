document.addEventListener('DOMContentLoaded', () => {
    // 1. Gestion du Tiroir Mobile ARIA
    const drawerToggle = document.getElementById('drawer-toggle');
    const mobileDrawer = document.getElementById('mobile-drawer');
    const drawerOverlay = document.getElementById('drawer-overlay');
    const drawerLinks = document.querySelectorAll('.drawer-link');

    function toggleMenu() {
        const isExpanded = drawerToggle.getAttribute('aria-expanded') === 'true';
        if (isExpanded) {
            drawerToggle.setAttribute('aria-expanded', 'false');
            mobileDrawer.classList.remove('open');
            drawerOverlay.classList.remove('active');
            mobileDrawer.setAttribute('aria-hidden', 'true');
            drawerOverlay.setAttribute('aria-hidden', 'true');
            drawerToggle.innerHTML = '<i class="fa fa-bars" aria-hidden="true"></i>';
        } else {
            drawerToggle.setAttribute('aria-expanded', 'true');
            mobileDrawer.classList.add('open');
            drawerOverlay.classList.add('active');
            mobileDrawer.setAttribute('aria-hidden', 'false');
            drawerOverlay.setAttribute('aria-hidden', 'false');
            drawerToggle.innerHTML = '<i class="fa fa-times" aria-hidden="true"></i>';
        }
    }

    if (drawerToggle) drawerToggle.addEventListener('click', toggleMenu);
    if (drawerOverlay) drawerOverlay.addEventListener('click', toggleMenu);

    drawerLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (drawerToggle.getAttribute('aria-expanded') === 'true') toggleMenu();
        });
    });

    // 2. Gestion du Formulaire de Contact (envoi réel via Formspree)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fa fa-spinner fa-spin" aria-hidden="true"></i> Envoi en cours...';

            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: new FormData(contactForm),
                    headers: { 'Accept': 'application/json' }
                });
                if (response.ok) {
                    alert('Merci pour votre message ! Notre équipe vous répondra très rapidement.');
                    contactForm.reset();
                } else {
                    alert("Une erreur s'est produite. Merci de réessayer ou de nous appeler au 06 73 21 39 34.");
                }
            } catch (error) {
                alert("Impossible d'envoyer le message. Vérifiez votre connexion ou appelez-nous au 06 73 21 39 34.");
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            }
        });
    }

    // 3. Compte à Rebours (Gala : 4 Avril 2026 à 19h00)
    const elDays = document.getElementById('cd-days');
    const elHours = document.getElementById('cd-hours');
    const elMins = document.getElementById('cd-mins');
    const elSecs = document.getElementById('cd-secs');

    function updateCountdown() {
        if (!elDays) return;
        const targetDate = new Date('2026-04-04T19:00:00').getTime();
        const now = new Date().getTime();
        const diff = targetDate - now;

        if (diff > 0) {
            const d = Math.floor(diff / (1000 * 60 * 60 * 24));
            const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const s = Math.floor((diff % (1000 * 60)) / 1000);

            elDays.textContent = String(d).padStart(2, '0');
            elHours.textContent = String(h).padStart(2, '0');
            elMins.textContent = String(m).padStart(2, '0');
            elSecs.textContent = String(s).padStart(2, '0');
        } else {
            elDays.textContent = '00';
            elHours.textContent = '00';
            elMins.textContent = '00';
            elSecs.textContent = '00';
        }
    }

    setInterval(updateCountdown, 1000);
    updateCountdown();

    // 4. Scroll Spy (surlignage du lien de navigation actif)
    const sections = document.querySelectorAll('main section[id]');
    const navLinks = document.querySelectorAll('.nav-link, .drawer-link');

    function updateActiveLink() {
        let currentId = '';
        const scrollPos = window.scrollY + 120;
        sections.forEach(section => {
            if (scrollPos >= section.offsetTop) currentId = section.getAttribute('id');
        });
        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
        });
    }
    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink();

    // 5. Bouton Retour en Haut
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', () => backToTop.classList.toggle('visible', window.scrollY > 500));
        backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }
});