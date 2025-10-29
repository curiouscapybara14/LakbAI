const hamburger = document.querySelector('.hamburger');
const sidebar = document.querySelector('.sidebar');

function toggleMenu() {
    const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', !isExpanded);
    hamburger.classList.toggle('active');
    sidebar.classList.toggle('active');
}

// Handle click events
hamburger.addEventListener('click', toggleMenu);

// Handle keyboard navigation
hamburger.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleMenu();
    }
    if (e.key === 'Escape' && hamburger.classList.contains('active')) {
        toggleMenu();
    }
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !sidebar.contains(e.target)) {
        if (hamburger.classList.contains('active')) {
            toggleMenu();
        }
    }
});