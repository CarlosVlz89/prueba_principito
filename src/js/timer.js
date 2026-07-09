/* timer.js - Countdown Timer and Tickets Counter */

export function initTimer() {
  const targetDate = new Date("2026-07-11T12:00:00-06:00"); // 11 de Julio 12:00 PM CDMX
  
  const timerElements = {
    days: document.getElementById("timer-days"),
    hours: document.getElementById("timer-hours"),
    minutes: document.getElementById("timer-minutes"),
    seconds: document.getElementById("timer-seconds"),
    container: document.getElementById("countdown-container")
  };

  if (!timerElements.days) return; // Check if elements exist

  function updateTimer() {
    const now = new Date();
    const difference = targetDate - now;

    if (difference <= 0) {
      if (timerElements.container) {
        timerElements.container.innerHTML = "<div class='countdown-title'>¡Las funciones han comenzado!</div><p style='font-family:var(--font-serif); font-size:1.2rem; color:var(--color-rose-red); font-weight:700;'>¡Te esperamos en el Teatro de las Artes!</p>";
      }
      return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    timerElements.days.textContent = String(days).padStart(2, "0");
    timerElements.hours.textContent = String(hours).padStart(2, "0");
    timerElements.minutes.textContent = String(minutes).padStart(2, "0");
    timerElements.seconds.textContent = String(seconds).padStart(2, "0");
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}

