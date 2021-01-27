// const { stream } = require("browser-sync");

const video = document.querySelector(".player");
const canvas = document.querySelector(".photo");
const ctx = canvas.getContext("2d");
const strip = document.querySelector(".strip");
const snap = document.querySelector(".snap");
const rgbInputs = document.querySelectorAll(".rgb input[type=range]");

let red = 0;
let green = 0;
let blue = 0;

function streamVideo() {
  navigator.mediaDevices
    .getUserMedia({ video: true, audio: false })
    .then((stream) => {
      video.srcObject = stream;
      video.play();
    })
    .catch(() => {
      console.log("An error occurred: " + err);
    });
}

function captureVideo() {
  let ctx = canvas.getContext("2d");
  ctx.canvas.width = video.videoWidth;
  ctx.canvas.height = video.videoHeight;
  ctx.drawImage(video, 0, 0);
  let frame = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
  frame = rgbEditor(frame, this);
  ctx.putImageData(frame, 0, 0);
  setTimeout(() => {
    captureVideo();
  }, 90);
}

function takePhoto() {
  snap.currentTime = 0;
  snap.play();
  let ctx = canvas.getContext("2d");
  ctx.drawImage(video, 0, 0);
  const data = canvas.toDataURL("image/png");
  const a = document.createElement("a");
  a.href = data;
  a.download = "handsome";
  a.innerHTML = `<img src="${data}" >`;
  strip.insertBefore(a, strip.firstChild);
}

function redEffect(frame) {
  // console.log(frame);
  // debugger
  for (let i = 0; i < frame.data.length; i += 4) {
    frame.data[i + 0] = frame.data[i + 0] + this.value; // RED
    frame.data[i + 1] = frame.data[i + 1] - 250; // GREEN
    frame.data[i + 2] = frame.data[i + 2] * 0.5; // Blue
  }
  return frame;
}

streamVideo();

function rgbEditor(frame, element) {
  element.name === "rmin" && (red = parseFloat(element.value));
  element.name === "rmax" && (red = parseFloat(element.value));
  element.name === "gmin" && (green = parseFloat(element.value));
  element.name === "gmax" && (green = parseFloat(element.value));
  element.name === "bmin" && (blue = parseFloat(element.value));
  element.name === "bmax" && (green = parseFloat(element.value));
  //   debugger
  for (let i = 0; i < frame.data.length; i += 4) {
    frame.data[i + 0] = frame.data[i + 0] + red; // RED
    frame.data[i + 1] = frame.data[i + 1] + green; // GREEN
    frame.data[i + 2] = frame.data[i + 2] + blue; // Blue
  }
  return frame;
}

video.addEventListener("canplay", captureVideo);
rgbInputs.forEach((input) => input.addEventListener("input", captureVideo));
