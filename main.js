document.addEventListener('DOMContentLoaded', () => {
    // 1. Gestion du Menu Mobile
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
            drawerToggle.innerHTML = '<i class="fa fa-bars" aria-hidden="true"></i>';
        } else {
            drawerToggle.setAttribute('aria-expanded', 'true');
            mobileDrawer.classList.add('open');
            drawerOverlay.classList.add('active');
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

    // 2. Compte à Rebours (Gala : 4 Avril 2026 19:00)
    const elDays = document.getElementById('cd-days');
    const elHours = document.getElementById('cd-hours');
    const elMins = document.getElementById('cd-mins');
    const elSecs = document.getElementById('cd-secs');

    function updateCountdown() {
        if(!elDays) return;
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
        }
    }

    setInterval(updateCountdown, 1000);
    updateCountdown();
});