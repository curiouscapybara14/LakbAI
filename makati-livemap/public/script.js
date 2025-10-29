(function () {
    const pwdInput = document.getElementById('password');
    const toggle = document.querySelector('.password-toggle');

    function setIcon(hidden) {
        
        toggle.innerHTML = hidden
            ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z"></path><circle cx="12" cy="12" r="3"></circle></svg>'
            : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a21.8 21.8 0 0 1 5.06-6.06"></path><path d="M1 1l22 22"></path><path d="M14.12 14.12A3 3 0 0 1 9.88 9.88"></path></svg>';
    }

    setIcon(true);

    toggle.addEventListener('click', function () {
        const isHidden = pwdInput.type === 'password';
        pwdInput.type = isHidden ? 'text' : 'password';
        toggle.setAttribute('aria-label', isHidden ? 'Hide password' : 'Show password');
        setIcon(!isHidden);
    });
})();

// Sidebar toggle + Leaflet map init

(function () {
  const menuBtn = document.getElementById('menuBtn');
  const sidebar = document.getElementById('sidebar');
  const closeBtn = document.getElementById('closeSidebar');

  function openSidebar() {
    sidebar.classList.add('open');
    sidebar.setAttribute('aria-hidden', 'false');
  }
  function closeSidebarFn() {
    sidebar.classList.remove('open');
    sidebar.setAttribute('aria-hidden', 'true');
  }

  menuBtn.addEventListener('click', openSidebar);
  closeBtn.addEventListener('click', closeSidebarFn);
  // close when clicking outside sidebar on mobile
  document.addEventListener('click', (e) => {
    if (!sidebar.contains(e.target) && !menuBtn.contains(e.target)) {
      closeSidebarFn();
    }
  });

  // Initialize Leaflet map
  try {
    const map = L.map('map', { zoomControl: false }).setView([14.5547, 121.0244], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap'
    }).addTo(map);

    // Example markers near Makati — replace/add as needed
    const markers = [
      { title: 'One Ayala', coords: [14.5585, 121.0244], img: 'oneayala.png' },
      { title: 'Dela Rosa Car Park 1', coords: [14.5579, 121.0257], img: 'carpark.png' },
      { title: 'Dela Rosa Car Park 2', coords: [14.5572, 121.0252], img: 'carpark.png' },
      { title: 'Valero 2 Car Park', coords: [14.5537, 121.0219], img: 'carpark.png' },
      { title: 'McKinley Exchange', coords: [14.5589, 121.0254], img: 'mckinley.png' },
    ];

    markers.forEach(m => {
      const marker = L.marker(m.coords).addTo(map);
      marker.bindPopup(`<strong>${m.title}</strong><br><img src="${m.img}" alt="${m.title}" style="width:120px;border-radius:6px;">`);
      marker.on('mouseover', () => marker.openPopup());
      marker.on('mouseout', () => marker.closePopup());
    });

    // enable dragging on mobile and desktop
    map.touchZoom.enable();
    map.scrollWheelZoom.enable();
    map.dragging.enable();
  } catch (err) {
    // Leaflet not loaded or error — keep a placeholder map styling
    console.error('Map init error:', err);
  }
})();