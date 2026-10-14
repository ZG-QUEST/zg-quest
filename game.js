let map;
let userMarker;

// Lista misji w Zielonej Górze
const missions = [
  {
    id: 1,
    title: "Pomnik Bachusa",
    lat: 51.9386,
    lng: 15.5050,
    question: "Jak nazywa się słynny zielonogórski bożek wina?",
    answer: "bachus",
    reward: 100
  },
  {
    id: 2,
    title: "Palmiarnia",
    lat: 51.9360,
    lng: 15.5120,
    question: "Co rośnie wokół Palmiarni na Winnym Wzgórzu?",
    answer: "winorośl",
    reward: 150
  },
  {
    id: 3,
    title: "Ratusz Miejski",
    lat: 51.9380,
    lng: 15.5065,
    question: "Ile wież ma ratusz na Starym Rynku?",
    answer: "1",
    reward: 120
  }
];

let activeMission = null;

function startGame() {
  const username = document.getElementById('username').value.trim();

  if (username === '') {
    alert('Wpisz swój nick przed startem!');
    return;
  }

  // Zapisujemy nick w pamięci przeglądarki
  localStorage.setItem('zg_quest_username', username);

  // Przełączanie ekranów
  document.getElementById('screen-start').classList.remove('active');
  document.getElementById('screen-map').classList.add('active');

  document.getElementById('welcome-msg').innerText = `Witaj, ${username}! Znajdź punkty na mapie Zielonej Góry.`;

  initMap();
}

function initMap() {
  if (map) return;

  // Inicjalizacja mapy Leaflet wyśrodkowanej na Zielonej Górze
  map = L.map('map').setView([51.9356, 15.5061], 14);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
  }).addTo(map);

  // Dodawanie markerów misji
  missions.forEach(mission => {
    const marker = L.marker([mission.lat, mission.lng]).addTo(map);
    marker.bindPopup(`<b>${mission.title}</b><br><br>Kliknij, aby podjąć wyzwanie!`);
  });

  // Śledzenie lokalizacji GPS gracza
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
      (err) => console.log('Brak dostępu do GPS lub odmowa', err),
      { enableHighAccuracy: true }
    );
  }
}
