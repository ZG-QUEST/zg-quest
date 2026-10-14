let map;
let userMarker;

const missions = [
  { id: 1, title: "Pomnik Bachusa", lat: 51.9386, lng: 15.5050 },
  { id: 2, title: "Palmiarnia", lat: 51.9360, lng: 15.5120 },
  { id: 3, title: "Ratusz Miejski", lat: 51.9380, lng: 15.5065 }
];

function startGame() {
  const username = document.getElementById('username').value.trim();

  if (username === '') {
    alert('Wpisz swój nick przed startem!');
    return;
  }

  localStorage.setItem('zg_quest_username', username);

  document.getElementById('screen-start').classList.remove('active');
  document.getElementById('screen-map').classList.add('active');

  // Opóźnienie inicjalizacji mapy, aby kontener zdążył się pojawić na ekranie
  setTimeout(() => {
    initMap();
  }, 100);
}

function initMap() {
  if (map) {
    map.invalidateSize();
    return;
  }

  map = L.map('map').setView([51.9356, 15.5061], 14);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
  }).addTo(map);

  missions.forEach(mission => {
    L.marker([mission.lat, mission.lng]).addTo(map)
      .bindPopup(`<b>${mission.title}</b>`);
  });

  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        if (!userMarker) {
          userMarker = L.circleMarker([lat, lng], {
            color: '#38bdf8',
            fillColor: '#0284c7',
            fillOpacity: 0.8,
            radius: 8
          }).addTo(map).bindPopup('Twoja lokalizacja');
        } else {
          userMarker.setLatLng([lat, lng]);
        }
      },
      (err) => console.log('Brak GPS', err),
      { enableHighAccuracy: true }
    );
  }
}
