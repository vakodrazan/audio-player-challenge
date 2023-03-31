const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('previous');
const nextBtn = document.getElementById('next');
const stopBtn = document.getElementById('stop');
const uploadTitle = document.getElementById('audio-title');

const audioElm = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('music-info-title');

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
    audioElm.src = URL.createObjectURL(file);
    audioElm.load();

    audioElm.currentTime = 0;
    playSong();
  }
}

let songIndex = 2;

loadSong(songs[songIndex]);

function loadSong(song) {
  title.innerText = song;

  audioElm.src = `music/${song}.mp3`;
}

function playSong() {
  musicContainer.classList.add('play');
  playBtn.querySelector('i.fas').classList.remove('fa-play');
  playBtn.querySelector('i.fas').classList.add('fa-pause');

  audioElm.play();
}

function pauseSong() {
  musicContainer.classList.remove('play');
  playBtn.querySelector('i.fas').classList.add('fa-play');
  playBtn.querySelector('i.fas').classList.remove('fa-pause');

  audioElm.pause();
}
function stopSong() {
  musicContainer.classList.remove('play');
  playBtn.querySelector('i.fas').classList.add('fa-play');
  playBtn.querySelector('i.fas').classList.remove('fa-pause');
  audioElm.pause();
  audioElm.currentTime = 0;
}

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

function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audioElm.duration;

  audioElm.currentTime = (clickX / width) * duration;
}

playBtn.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play');

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

stopBtn.addEventListener('click', stopSong);
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
audioElm.addEventListener('timeupdate', updateProgress);
progressContainer.addEventListener('click', setProgress);
audioElm.addEventListener('ended', nextSong);
