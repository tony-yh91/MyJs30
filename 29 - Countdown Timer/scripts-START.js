let countdown;
const displaytime = document.querySelector(".display__time-left");
const endtime = document.querySelector(".display__end-time");
const controls = document.querySelectorAll("button[data-time]");

function timer(seconds) {
  clearInterval(countdown);
  const now = Date.now();
  const then = now + seconds * 1000;

  countdown = setInterval(() => {
    const countdownTimer = then - Date.now();
    displayCountdown(countdownTimer);
    displayEndTime(then);
    // If the count down is finished, clear the timer
    if (countdownTimer < 1) {
      clearInterval(countdown);
      return;
    }
  }, 1000);
}

function displayCountdown(countdownTimer) {
  const hoursleft = Math.floor((countdownTimer % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minsleft = Math.floor((countdownTimer % (1000 * 60 * 60)) / (1000 * 60));
  const secondsleft = Math.floor((countdownTimer / 1000) % 60);
  displaytime.textContent = `${hoursleft}:${minsleft < 10 ? "0" : ""}${minsleft}:${
    secondsleft < 10 ? "0" : ""
  }${secondsleft}`;
}

function displayEndTime(then) {
  const endTimer = new Date(then);
  const localeEndTimer = endTimer.toLocaleString("en-US", { hour: "numeric", minute: "numeric", hour12: true });
  endtime.textContent = `Come back in ${localeEndTimer}`;
}

function setTimer() {
  const btnTimer = parseInt(this.dataset.time);
  timer(btnTimer);
}

controls.forEach((control) => control.addEventListener("click", setTimer));
document.customForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const inputMins = this.minutes.value;
  const inputSecs = parseInt(inputMins) * 60;
  timer(inputSecs);
});
