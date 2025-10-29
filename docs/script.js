// Initialize map centered on Makati, Philippines
const map = L.map('map').setView([14.5547, 121.0244], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Add markers for alerts
const alerts = [
    { lat: 14.5547, lng: 121.0244, title: 'Konstruksyon - Boulevard Ave' },
    { lat: 14.5587, lng: 121.0284, title: 'Sarado ang Kalsada - Roxas Street' },
    { lat: 14.5507, lng: 121.0204, title: 'Konstruksyon - Columbia Street' },
    { lat: 14.5527, lng: 121.0264, title: 'Nagtutubero - Tabi-Tabi Street' }
];

alerts.forEach(alert => {
    const marker = L.marker([alert.lat, alert.lng]).addTo(map);
    marker.bindPopup(alert.title);
});

// Sidebar functionality
const menuBtn = document.getElementById('menuBtn');
const closeBtn = document.getElementById('closeBtn');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('sidebarOverlay');

function openSidebar() {
    sidebar.classList.add('active');
    overlay.classList.add('active');
}

function closeSidebar() {
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
}

menuBtn.addEventListener('click', openSidebar);
closeBtn.addEventListener('click', closeSidebar);
overlay.addEventListener('click', closeSidebar);

// Update time
function updateTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    document.querySelector('.status-bar span').textContent = `${hours}:${minutes}`;
}
updateTime();
setInterval(updateTime, 60000);