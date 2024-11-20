const carouselElement = document.querySelector('#carouselExample');
const speedControl = document.querySelector('#speedControl');

speedControl.addEventListener('input', () => {
    const interval = parseInt(speedControl.value, 10);
    if (interval >= 1000) {
        const carousel = bootstrap.Carousel.getInstance(carouselElement);
        carouselElement.setAttribute('data-bs-interval', interval);
        carousel._config.interval = interval;
        carousel.cycle();
    }
});

const animatedSections = document.querySelectorAll('.animated-section');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
});

animatedSections.forEach(section => observer.observe(section));


// Initialize the map with a fixed center and zoom level
const map = L.map('map').setView([0, 0], 2);

// Add OpenStreetMap tile layer with noWrap to prevent map repetition
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 5,
    minZoom: 2,
    noWrap: true, // Prevents map repetition
}).addTo(map);

// Set max bounds to limit the scrollable area
const bounds = [[-90, -180], [90, 180]];
map.setMaxBounds(bounds);
map.on('drag', function () {
    map.panInsideBounds(bounds, { animate: true });
});

// Example markers for locations
L.marker([34.0522, -118.2437]).addTo(map).bindPopup('<b>Demacia</b><br>Home of justice.');
L.marker([48.8566, 2.3522]).addTo(map).bindPopup('<b>Noxus</b><br>City of power.');

