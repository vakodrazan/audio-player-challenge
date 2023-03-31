const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const stopBtn = document.getElementById('stop');
const uploadTitle = document.getElementById('audio-title');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');
const currTime = document.querySelector('#currTime');
const durTime = document.querySelector('#durTime');

// let audioF = new Audio();
let fileInput = document.getElementById('fileInput');

const songs = [
  'Bakozetra-Veloma-Rô',
  'Mangilatra-By-BAKOZETRA',
  'Scars-to-your-beautiful-Alessia-Cara',
  'MAGE4-Rediredy',
];

function loadFile(event) {
  let files = event.target.files;

  if (files.length > 0) {
    let file = files[0];
    const fileName = file?.name.split('.');
    const songTitle = file?.name.replace(
      `.${fileName[fileName.length - 1]}`,
      ''
    );
    title.innerText = songTitle;
    uploadTitle.innerText = file?.name;
    audio.src = URL.createObjectURL(file);
    audio.load();

    audio.currentTime = 0;
    playSong();
  }
}

let songIndex = 2;

loadSong(songs[songIndex]);

function loadSong(song) {
  title.innerText = song;

  audio.src = `music/${song}.mp3`;
}

playBtn.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play');

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

function playSong() {
  musicContainer.classList.add('play');
  playBtn.querySelector('i.fas').classList.remove('fa-play');
  playBtn.querySelector('i.fas').classList.add('fa-pause');

  audio.play();
}

function pauseSong() {
  musicContainer.classList.remove('play');
  playBtn.querySelector('i.fas').classList.add('fa-play');
  playBtn.querySelector('i.fas').classList.remove('fa-pause');

  audio.pause();
}
function stopSong() {
  musicContainer.classList.remove('play');
  playBtn.querySelector('i.fas').classList.add('fa-play');
  playBtn.querySelector('i.fas').classList.remove('fa-pause');
  audio.pause();
  audio.currentTime = 0;
}

stopBtn.addEventListener('click', stopSong);
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

function prevSong() {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);

  playSong();
}

function nextSong() {
  songIndex++;

  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);

  playSong();
}

audio.addEventListener('timeupdate', updateProgress);

function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

progressContainer.addEventListener('click', setProgress);

function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

audio.addEventListener('ended', nextSong);
