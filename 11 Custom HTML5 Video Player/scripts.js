const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const playBtn = player.querySelector(".player__button");
const ranges = player.querySelectorAll("input[type=range]");
const skipBtns = player.querySelectorAll("button[data-skip]");
const progress = player.querySelector(".progress");
const fullScreenBtn = player.querySelector(".fullscreen");

function togglePlay() {
  const method = video.paused ? "play" : "pause";
  video[method]();
}

function handlePlaying(e) {
  const btnLogo = e.type === "playing" ? "❚❚" : "►";
  playBtn.innerHTML = btnLogo;
}

function handleSkip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

function handleRanges() {
  video[this.name] = this.value;
}

function startProgress() {
  const percentage = Math.floor((100 / video.duration) * video.currentTime);
  progress.children[0].style.flexBasis = `${percentage}%`;
}

function handleProgress(e) {
  const seek = e.offsetX - e.offsetY / progress.clientWidth;
  const percentage = (e.offsetX / progress.clientWidth) * 100;
  progress.children[0].style.flexBasis = `${percentage}%`;
  video.currentTime = seek;
}

function fullScreen() {
    video.requestFullscreen()
}

video.addEventListener("click", togglePlay);
video.addEventListener("playing", handlePlaying);
video.addEventListener("pause", handlePlaying);
video.addEventListener("progress", startProgress);

playBtn.addEventListener("click", togglePlay);
skipBtns.forEach((skipBtn) => skipBtn.addEventListener("click", handleSkip));
ranges.forEach((range) => range.addEventListener("mousemove", handleRanges));

let mousedown = false;
progress.addEventListener("mousedown", () => (mousedown = true));
progress.addEventListener("mouseup", () => (mousedown = false));
progress.addEventListener("mousemove", (e) => mousedown && handleProgress(e));

fullScreenBtn.addEventListener("click", fullScreen);
