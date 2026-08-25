document.addEventListener('DOMContentLoaded', () => {
    // 1. Gestion Menu Mobile
    const drawerToggle = document.getElementById('drawer-toggle');
    const mobileDrawer = document.getElementById('mobile-drawer');
    const drawerOverlay = document.getElementById('drawer-overlay');
    const drawerLinks = document.querySelectorAll('.drawer-link');

    function toggleDrawer() {
        const isExpanded = drawerToggle.getAttribute('aria-expanded') === 'true';
        
        if (isExpanded) {
            // Fermer
            drawerToggle.setAttribute('aria-expanded', 'false');
            mobileDrawer.classList.remove('open');
            drawerOverlay.classList.remove('active');
            mobileDrawer.setAttribute('aria-hidden', 'true');
            drawerOverlay.setAttribute('aria-hidden', 'true');
            drawerToggle.innerHTML = '<i class="fa fa-bars" aria-hidden="true"></i>';
        } else {
            // Ouvrir
            drawerToggle.setAttribute('aria-expanded', 'true');
            mobileDrawer.classList.add('open');
            drawerOverlay.classList.add('active');
            mobileDrawer.setAttribute('aria-hidden', 'false');
            drawerOverlay.setAttribute('aria-hidden', 'false');
            drawerToggle.innerHTML = '<i class="fa fa-times" aria-hidden="true"></i>';
        }
    }

    if (drawerToggle) {
        drawerToggle.addEventListener('click', toggleDrawer);
    }

    if (drawerOverlay) {
        drawerOverlay.addEventListener('click', toggleDrawer);
    }

    drawerLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (drawerToggle.getAttribute('aria-expanded') === 'true') {
                toggleDrawer();
            }
        });
    });

    // 2. Gestion Formulaire de Contact
    const contactForm = document.getElementById('contactForm');
    if(contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Merci pour votre message ! Notre équipe vous répondra très rapidement.');
            contactForm.reset();
        });
    }

    // 3. Compte à Rebours (Gala : 4 Avril 2026 à 19h00)
    const elDays = document.getElementById('cd-days');
    const elHours = document.getElementById('cd-hours');
    const elMins = document.getElementById('cd-mins');
    const elSecs = document.getElementById('cd-secs');

    function updateCountdown() {
        if(!elDays) return;

        const eventDate = new Date('2026-04-04T19:00:00').getTime();
        const now = new Date().getTime();
        const diff = eventDate - now;

        if (diff > 0) {
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            elDays.textContent = String(days).padStart(2, '0');
            elHours.textContent = String(hours).padStart(2, '0');
            elMins.textContent = String(minutes).padStart(2, '0');
            elSecs.textContent = String(seconds).padStart(2, '0');
        } else {
            elDays.textContent = '00';
            elHours.textContent = '00';
            elMins.textContent = '00';
            elSecs.textContent = '00';
        }
    }

    setInterval(updateCountdown, 1000);
    updateCountdown();
});