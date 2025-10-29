function toggleSidebar() {
    document.querySelector('.sidebar').classList.toggle('active');
    document.querySelector('.overlay').classList.toggle('active');
}

// Close sidebar when clicking outside
document.addEventListener('click', function(event) {
    if (event.target.closest('.sidebar') || event.target.closest('.menu-button')) return;
    document.querySelector('.sidebar').classList.remove('active');
    document.querySelector('.overlay').classList.remove('active');
});