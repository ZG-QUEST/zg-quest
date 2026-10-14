let map;
let userMarker;
let score = 0;
let currentMission = null;
const completedMissions = [];
let isMusicPlaying = false;

const missions = [
  { id: 1, title: "Pomnik Bachusa 🍷", lat: 51.9386, lng: 15.5050, image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Zielona_G%C3%B3ra_Bachus_2021.jpg/800px-Zielona_G%C3%B3ra_Bachus_2021.jpg", question: "Jak nazywa się słynny zielonogórski bożek wina?", answer: "bachus", reward: 50 },
  { id: 2, title: "Palmiarnia i Winne Wzgórze 🌴", lat: 51.9360, lng: 15.5120, image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Palmiarnia_w_Zielonej_G%C3%B3rze.jpg/800px-Palmiarnia_w_Zielonej_G%C3%B3rze.jpg", question: "Co rośnie wokół Palmiarni? (Wpisz w liczbie pojedynczej)", answer: "winorośl", reward: 70 },
  { id: 3, title: "Ratusz Miejski 🏛️", lat: 51.9380, lng: 15.5065, image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Zielona_G%C3%B3ra_Ratusz_2019.jpg/800px-Zielona_G%C3%B3ra_Ratusz_2019.jpg", question: "Ile głównych wież ma ratusz na Starym Rynku?", answer: "1", reward: 50 },
  { id: 4, title: "Lubuski Teatr 🎭", lat: 51.9405, lng: 15.5030, image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Teatr_Lubuski_w_Zielonej_G%C3%B3rze.jpg/800px-Teatr_Lubuski_w_Zielonej_G%C3%B3rze.jpg", question: "Jaki zasłużony polski aktor ma tutaj swoje imię w nazwie teatru? (Podaj nazwisko)", answer: "orzechowski", reward: 60 },
  { id: 5, title: "Konkatedra św. Jadwigi ⛪", lat: 51.9372, lng: 15.5082, image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Zielona_G%C3%B3ra_Konkatedra_2011.jpg/800px-Zielona_G%C3%B3ra_Konkatedra_2011.jpg", question: "Kto jest patronką tej najstarszej świątyni w mieście?", answer: "jadwiga", reward: 60 },
  { id: 6, title: "Filharmonia Zielonogórska 🎻", lat: 51.9420, lng: 15.5090, image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Filharmonia_Zielonog%C3%B3rska.jpg/800px-Filharmonia_Zielonog%C3%B3rska.jpg", question: "Jaki instrument muzyczny jest głównym symbolem filharmonii?", answer: "skrzypce", reward: 50 },
  { id: 7, title: "Stoliki Szachowe w Parku ♟️", lat: 51.9350, lng: 15.5040, image: "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&w=800&q=80", question: "W jakiej grze logicznej można zmierzyć się przy tutejszych stolikach?", answer: "szachy", reward: 40 },
  { id: 8, title: "Bachusik Winoryjek 🍇", lat: 51.9390, lng: 15.5070, image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Zielona_G%C3%B3ra_Bachus_2021.jpg/800px-Zielona_G%C3%B3ra_Bachus_2021.jpg", question: "Z czym zazwyczaj kojarzą się postacie Bachusików w Zielonej Górze? (Wino czy piwo?)", answer: "wino", reward: 40 },
  { id: 9, title: "Park Tysiąclecia 🌳", lat: 51.9430, lng: 15.4980, image: "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&w=800&q=80", question: "Jaki duży park miejski znajduje się w tej okolicy?", answer: "tysiąclecia", reward: 60 },
  { id: 10, title: "Fontanna z Akrobatką ⛲", lat: 51.9383, lng: 15.5058, image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Zielona_G%C3%B3ra_Ratusz_2019.jpg/800px-Zielona_G%C3%B3ra_Ratusz_2019.jpg", question: "Co przedstawia postać na szczycie słynnej deptakowej fontanny?", answer: "akrobatka", reward: 50 },
  { id: 11, title: "Wieżowiec (Ciob-Dan) 🏢", lat: 51.9410, lng: 15.5150, image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80", question: "Jak powszechnie nazywa się ten najwyższy punkt mieszkalny w mieście?", answer: "mrówkowiec", reward: 60 },
  { id: 12, title: "Plac Teatralny 🎟️", lat: 51.9400, lng: 15.5035, image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Teatr_Lubuski_w_Zielonej_G%C3%B3rze.jpg/800px-Teatr_Lubuski_w_Zielonej_G%C3%B3rze.jpg", question: "Przy jakim placu stoi gmach Lubuskiego Teatru?", answer: "teatralny", reward: 40 },
  { id: 13, title: "Winiarnia Degustacyjna 🥂", lat: 51.9375, lng: 15.5100, image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Palmiarnia_w_Zielonej_G%C3%B3rze.jpg/800px-Palmiarnia_w_Zielonej_G%C3%B3rze.jpg", question: "Z jakiego regionu w Polsce Zielona Góra jest stolicą winiarstwa?", answer: "lubuskie", reward: 50 },
  { id: 14, title: "Uniwersytet Zielonogórski 🎓", lat: 51.9320, lng: 15.5200, image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Zielona_G%C3%B3ra_Konkatedra_2011.jpg/800px-Zielona_G%C3%B3ra_Konkatedra_2011.jpg", question: "Jaka główna uczelnia wyższa ma tutaj swoją siedzibę? (Wpisz skrót lub pełną nazwę)", answer: "uniwersytet zielonogórski", reward: 80 },
  { id: 15, title: "Stary Rynek 🛍️", lat: 51.9381, lng: 15.5060, image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Zielona_G%C3%B3ra_Ratusz_2019.jpg/800px-Zielona_G%C3%B3ra_Ratusz_2019.jpg", question: "W jakim kształcie historycznie zaprojektowano płytę Starego Rynku?", answer: "wrzeciono", reward: 60 },
  { id: 16, title: "Basen Złotowianka 🏊‍♂️", lat: 51.9450, lng: 15.5020, image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=800&q=80", question: "Jak nazywa się popularny kompleks rekreacyjno-pływacki?", answer: "hala akro", reward: 50 },
  { id: 17, title: "Muzeum Ziemi Lubuskiej 🖼️", lat: 51.9415, lng: 15.5015, image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Teatr_Lubuski_w_Zielonej_G%C3%B3rze.jpg/800px-Teatr_Lubuski_w_Zielonej_G%C3%B3rze.jpg", question: "Jakie muzeum gromadzi pamiątki historyczne regionu?", answer: "muzeum", reward: 70 },
  { id: 18, title: "Park Piastowski 🌲", lat: 51.9300, lng: 15.4950, image: "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&w=800&q=80", question: "Który duży park na wzgórzach kryje wieżę widokową?", answer: "piastowski", reward: 70 },
  { id: 19, title: "Wieża Braniborska 🗼", lat: 51.9280, lng: 15.5150, image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80", question: "Jaki historyczny obiekt astronomiczno-widokowy znajduje się na Wzgórzu Braniborskim?", answer: "wieża", reward: 80 },
  { id: 20, title: "Skwer Pionierów 🌷", lat: 51.9395, lng: 15.5045, image: "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&w=800&q=80", question: "Kogo upamiętnia nazwa tego zielonego skweru w centrum?", answer: "pionierów", reward: 50 },
  { id: 21, title: "Kościół Najświętszego Zbawiciela ⛪", lat: 51.9425, lng: 15.5050, image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Zielona_G%C3%B3ra_Konkatedra_2011.jpg/800px-Zielona_G%C3%B3ra_Konkatedra_2011.jpg", question: "Jaki charakterystyczny kolor elewacji ma ten duży kościół przy Alei Niepodległości?", answer: "czerwony", reward: 60 },
  { id: 22, title: "Palmiarniany Bachusik 🍇", lat: 51.9362, lng: 15.5118, image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Palmiarnia_w_Zielonej_G%C3%B3rze.jpg/800px-Palmiarnia_w_Zielonej_G%C3%B3rze.jpg", question: "Jak ma na imię bachusik pilnujący drogi na Winne Wzgórze?", answer: "winoroślaczek", reward: 50 },
  { id: 23, title: "Pomnik Ofiar Faszyzmus 🕯️", lat: 51.9340, lng: 15.5080, image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Palmiarnia_w_Zielonej_G%C3%B3rze.jpg/800px-Palmiarnia_w_Zielonej_G%C3%B3rze.jpg", question: "W jakim parku znajduje się ten ważny pomnik pamięci?", answer: "park winny", reward: 50 },
  { id: 24, title: "Deptak (ul. Kupiecka) 🚶", lat: 51.9370, lng: 15.5040, image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Zielona_G%C3%B3ra_Bachus_2021.jpg/800px-Zielona_G%C3%B3ra_Bachus_2021.jpg", question: "Jak nazywa się najsłynniejszy deptak handlowy Zielonej Góry?", answer: "kupiecka", reward: 40 },
  { id: 25, title: "Kino Newa 🎬", lat: 51.9412, lng: 15.4990, image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80", question: "Jak nazywa się popularne studyjne kino w mieście?", answer: "newa", reward: 50 },
  { id: 26, title: "Plac Powstańców Wlkp. 🎆", lat: 51.9418, lng: 15.5060, image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Zielona_G%C3%B3ra_Ratusz_2019.jpg/800px-Zielona_G%C3%B3ra_Ratusz_2019.jpg", question: "Które powstanie patronuje temu dużemu placowi z fontanną?", answer: "wielkopolskie", reward: 60 },
  { id: 27, title: "Skwer Matki Sybiraczki 🕊️", lat: 51.9440, lng: 15.5080, image: "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&w=800&q=80", question: "Kogo upamiętnia ten skwer w północnej części Śródmieścia?", answer: "matki sybiraczki", reward: 50 },
  { id: 28, title: "Cmentarz Zasłużonych 📜", lat: 51.9355, lng: 15.4990, image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80", question: "Przy jakiej ulicy znajduje się najstarszy zachowany cmentarz komunalny?", answer: "wrocławska", reward: 60 },
  { id: 29, title: "Dworzec PKP 🚆", lat: 51.9455, lng: 15.5110, image: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=800&q=80", question: "Z jakim dużym miastem na literę P kursuje najwięcej ekspresów stąd?", answer: "poznań", reward: 50 },
  { id: 30, title: "Winnica Miejska 🍾", lat: 51.9365, lng: 15.5130, image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Palmiarnia_w_Zielonej_G%C3%B3rze.jpg/800px-Palmiarnia_w_Zielonej_G%C3%B3rze.jpg", question: "Czy tradycje winiarskie w Zielonej Górze sięgają średniowiecza? (Tak/Nie)", answer: "tak", reward: 40 }
];

function startGame() {
  const username = document.getElementById('username').value.trim();
  if (username === '') {
    alert('Wpisz swój nick przed startem! 🎮');
    return;
  }

  localStorage.setItem('zg_quest_username', username);
  document.getElementById('player-name-display').innerText = '🎮 ' + username;
  document.getElementById('profile-name').innerText = username;

  document.getElementById('screen-start').classList.remove('active');
  document.getElementById('screen-game').classList.add('active');

  const music = document.getElementById('bg-music');
  music.volume = 0.4;
  music.play().then(() => {
    isMusicPlaying = true;
    document.getElementById('btn-music-toggle').classList.remove('muted');
  }).catch(e => console.log("Autoplay zablokowany przez przeglądarkę"));

  buildMissionsList();
  updateRankAndProgress();

  setTimeout(() => {
    initMap();
  }, 200);
}

function toggleMusic() {
  const music = document.getElementById('bg-music');
  const btn = document.getElementById('btn-music-toggle');

  if (isMusicPlaying) {
    music.pause();
    isMusicPlaying = false;
    btn.classList.add('muted');
    btn.innerText = "🔇";
  } else {
    music.play();
    isMusicPlaying = true;
    btn.classList.remove('muted');
    btn.innerText = "🎵";
  }
}

function switchTab(tabName, event) {
  document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));

  if (tabName === 'map') {
    document.getElementById('tab-map').classList.add('active');
    event.currentTarget.classList.add('active');
    if (map) setTimeout(() => map.invalidateSize(), 150);
  } else if (tabName === 'missions') {
    document.getElementById('tab-missions').classList.add('active');
    event.currentTarget.classList.add('active');
  } else if (tabName === 'profile') {
    document.getElementById('tab-profile').classList.add('active');
    event.currentTarget.classList.add('active');
    updateProfileStats();
  }
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
            color: '#f43f5e',
            fillColor: '#a855f7',
            fillOpacity: 0.9,
            radius: 9
          }).addTo(map).bindPopup('📍 Twoja pozycja');
        } else {
          userMarker.setLatLng([lat, lng]);
        }
      },
      (err) => console.log('Brak GPS', err),
      { enableHighAccuracy: true }
    );
  }
}

function buildMissionsList() {
  const listContainer = document.getElementById('missions-list');
  listContainer.innerHTML = '';

  missions.forEach(mission => {
    const isDone = completedMissions.includes(mission.id);
    const item = document.createElement('div');
    item.className = `mission-item-card ${isDone ? 'completed' : ''}`;
    item.innerHTML = `
      <div class="mission-info">
        <h4>${isDone ? '✅ ' : '🎯 '} ${mission.title}</h4>
        <p>${isDone ? 'Misja zaliczona! 🎉' : 'Dotknij, aby odkryć zagadkę ✨'}</p>
      </div>
      <div class="mission-reward">+${mission.reward} pkt ⭐</div>
    `;
    item.onclick = () => openMission(mission);
    listContainer.appendChild(item);
  });
}

function openMission(mission) {
  if (completedMissions.includes(mission.id)) {
    alert('Ta misja została już przez Ciebie ukończona! 🎉');
    return;
  }

  currentMission = mission;
  document.getElementById('mission-title').innerText = mission.title;
  document.getElementById('mission-question').innerText = mission.question;
  document.getElementById('mission-img').src = mission.image;
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
    updateRankAndProgress();
    buildMissionsList();

    alert(`Brawo! Odpowiedź prawidłowa! 🎉 Zdobywasz +${currentMission.reward} pkt ⭐!`);
    closeMission();
  } else {
    alert('Błędna odpowiedź! ❌ Spróbuj jeszcze raz!');
  }
}

function updateRankAndProgress() {
  const rankBadge = document.getElementById('player-rank');
  const fillBar = document.getElementById('progress-bar-fill');
  const progressPoints = document.getElementById('progress-points');
  const progressText = document.getElementById('progress-text');

  let rankName = "🌱 Początkujący";
  let nextGoal = 300;
  let prevGoal = 0;

  if (score >= 1200) {
    rankName = "👑 Legenda ZG";
    nextGoal = 1200;
    prevGoal = 1200;
  } else if (score >= 700) {
    rankName = "🦊 Znawca Sekretów";
    nextGoal = 1200;
    prevGoal = 700;
  } else if (score >= 300) {
    rankName = "⭐ Zwiadowca";
    nextGoal = 700;
    prevGoal = 300;
  } else {
    rankName = "🌱 Początkujący";
    nextGoal = 300;
    prevGoal = 0;
  }

  rankBadge.innerText = rankName;

  if (score >= 1200) {
    fillBar.style.width = '100%';
    progressPoints.innerText = `${score} pkt (MAX! 🎉)`;
    progressText.innerText = "👑 Osiągnięto rangę Legendy ZG!";
  } else {
    const currentLevelScore = score - prevGoal;
    const levelSpan = nextGoal - prevGoal;
    const percent = Math.min(100, Math.max(0, (currentLevelScore / levelSpan) * 100));
    fillBar.style.width = `${percent}%`;
    progressPoints.innerText = `${score} / ${nextGoal} pkt`;
    progressText.innerText = `🚀 Do kolejnej rangi:`;
  }
}

function updateProfileStats() {
  document.getElementById('profile-completed-count').innerText = completedMissions.length;
  document.getElementById('profile-total-score').innerText = score;
  
  let rankName = "🌱 Początkujący";
  if (score >= 1200) rankName = "👑 Legenda ZG";
  else if (score >= 700) rankName = "🦊 Znawca Sekretów";
  else if (score >= 300) rankName = "⭐ Zwiadowca";

  document.getElementById('profile-rank-name').innerText = rankName;
}
