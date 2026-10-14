let map;
let userMarker;
let score = 0;
let currentMission = null;
const completedMissions = [];

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
    question: "Co rośnie wokół Palmiarni na Winnym Wzgórzu? (Wpisz w liczbie pojedynczej)",
    answer: "winorośl",
    reward: 150
  },
  {
    id: 3,
    title: "Ratusz Miejski",
    lat: 51.9380,
    lng: 15.5065,
    question: "Ile głównych wież ma ratusz na Starym Rynku?",
    answer: "1",
    reward: 120
  }
];

function startGame() {
  const username = document.getElementById('username').value.trim();

  if (username === '') {
    alert('Wpisz swój nick przed startem!');
    return;
  }

  localStorage.setItem('zg_quest_username', username);
  document.getElementById('player-name-display').innerText = username;

  document.getElementById('screen-start').classList.remove('active');
  document.getElementById('screen-map').classList.add('active');

  setTimeout(() => {
    initMap();
  }, 150);
}

function initMap() {
  if (map) {
    map.invalidateSize();
    return;
  }

  map = L.map('map').setView([51.9356, 15.5061], 15);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
  }).addTo(map);

  missions.forEach(mission => {
    const marker = L.marker([mission.lat, mission.lng]).addTo(map);
    
    marker.on('click', () => {
      openMission(mission);
    });
  });

  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        if (!userMarker) {
          userMarker = L.circleMarker([lat, lng], {
            color: '#818cf8',
            fillColor: '#6366f1',
            fillOpacity: 0.9,
            radius: 9
          }).addTo(map).bindPopup('Twoja pozycja');
        } else {
          userMarker.setLatLng([lat, lng]);
        }
      },
      (err) => console.log('Brak GPS', err),
      { enableHighAccuracy: true }
    );
  }
}

function openMission(mission) {
  if (completedMissions.includes(mission.id)) {
    alert('Ta misja została już przez Ciebie ukończona!');
    return;
  }

  currentMission = mission;
  document.getElementById('mission-title').innerText = mission.title;
  document.getElementById('mission-question').innerText = mission.question;
  document.getElementById('mission-answer').value = '';
  document.getElementById('mission-panel').classList.remove('hidden');
}

function closeMission() {
  document.getElementById('mission-panel').classList.add('hidden');
  currentMission = null;
}

function checkAnswer() {
  const answerInput = document.getElementById('mission-answer');
  if (!answerInput || !currentMission) return;
  
  const userAnswer = answerInput.value.trim().toLowerCase();

  if (userAnswer === currentMission.answer) {
    score += currentMission.reward;
    completedMissions.push(currentMission.id);

    document.getElementById('player-score').innerText = score;
    updateRank();

    alert(`Gratulacje! Zdobyto +${currentMission.reward} pkt! 🎉`);
    closeMission();
  } else {
    alert('Błędna odpowiedź. Spróbuj ponownie!');
  }
}

function updateRank() {
  const rankBadge = document.getElementById('player-rank');
  if (score >= 300) {
    rankBadge.innerText = "👑 Legenda ZG";
  } else if (score >= 150) {
    rankBadge.innerText = "⭐ Zwiadowca";
  } else {
    rankBadge.innerText = "🌱 Początkujący";
  }
}
