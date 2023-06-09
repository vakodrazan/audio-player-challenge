const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const stopBtn = document.getElementById('stop');
const uploadTitle = document.getElementById('audio-title');
const audioElm = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('music-info-title');
const canvas = document.getElementById('canvasElm');

function loadFile(event) {
  const files = event.target.files;

  if (files.length > 0) {
    const file = files[0];
    title.innerText = file?.name;
    uploadTitle.innerText = file?.name;
    audioElm.src = URL.createObjectURL(file);
    audioElm.load();

    audioElm.currentTime = 0;
    playSong();

    playBtn.disabled = false;
    stopBtn.disabled = false;
  }
}

function playSong() {
  musicContainer.classList.add('play');
  playBtn.querySelector('i.fas').classList.remove('fa-play');
  playBtn.querySelector('i.fas').classList.add('fa-pause');
  audioElm.play();
  visualiserAudio();
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

function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;

  // Check if song is done playing
  if (currentTime === duration) {
    pauseSong();
  } else {
    playSong;
  }

  progress.style.width = `${progressPercent}%`;
}

function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audioElm.duration;
  audioElm.currentTime = (clickX / width) * duration;
}

function visualiserAudio() {
  const context = new AudioContext();
  const src = context.createMediaElementSource(audioElm);
  let analyser = context.createAnalyser();
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const ctx = canvas.getContext('2d');
  src.connect(analyser);
  analyser.connect(context.destination);
  analyser.fftSize = 256;

  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);

  const WIDTH = canvas.width;
  const HEIGHT = canvas.height;

  const barWidth = (WIDTH / bufferLength) * 2.5;
  let barHeight;
  let x = 0;

  function renderFrame() {
    requestAnimationFrame(renderFrame);

    x = 0;

    analyser.getByteFrequencyData(dataArray);

    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    for (let i = 0; i < bufferLength; i++) {
      barHeight = dataArray[i];
      const red = barHeight + 25 * (i / bufferLength);
      const green = 250 * (i / bufferLength);
      const blue = 90;

      ctx.fillStyle = 'rgb(' + red + ',' + green + ',' + blue + ')';
      ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);

      x += barWidth + 1;
    }
  }
  renderFrame();
}

playBtn.disabled = true;
stopBtn.disabled = true;

playBtn.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play');
  isPlaying ? pauseSong() : playSong();
});
stopBtn.addEventListener('click', stopSong);
audioElm.addEventListener('timeupdate', updateProgress);
progressContainer.addEventListener('click', setProgress);
