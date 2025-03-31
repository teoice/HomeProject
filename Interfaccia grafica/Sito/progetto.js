function handleClick() {
    alert("Bottone cliccato!");
}


/*//////////TIMER//////////*/

let timerMinutes = 0;
let timerSeconds = 0;
let timerInterval = null;

const timeDisplay = document.getElementById('time-display');
const addMinuteButton = document.getElementById('add-minute');
const subtractMinuteButton = document.getElementById('subtract-minute');
const startButton = document.getElementById('start-timer');
const pauseButton = document.getElementById('pause-timer');
const resetIcon = document.getElementById('reset-icon');

function updateTimeDisplay() {
  const minutes = String(timerMinutes).padStart(2, '0');
  const seconds = String(timerSeconds).padStart(2, '0');
  timeDisplay.textContent = `${minutes}:${seconds}`;
}

addMinuteButton.addEventListener('click', () => {
  timerMinutes++;
  updateTimeDisplay();
});

subtractMinuteButton.addEventListener('click', () => {
  if (timerMinutes > 0) {
    timerMinutes--;
  } else if (timerSeconds > 0) {
    timerSeconds = 0; 
  }
  updateTimeDisplay();
});

startButton.addEventListener('click', () => {
  if (timerInterval) return; 

  startButton.disabled = true; 
  pauseButton.disabled = false; 
  timerInterval = setInterval(() => {
    if (timerSeconds === 0) {
      if (timerMinutes === 0) {
        clearInterval(timerInterval); 
        timerInterval = null;
        startButton.disabled = false;
        pauseButton.disabled = true; 
        alert('Time is up!');
      } else {
        timerMinutes--;
        timerSeconds = 59;
      }
    } else {
      timerSeconds--;
    }
    updateTimeDisplay();
  }, 1000);
});

pauseButton.addEventListener('click', () => {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
    startButton.disabled = false; 
  }
});

resetIcon.addEventListener('click', () => {
  clearInterval(timerInterval);
  timerInterval = null;
  timerMinutes = 0;
  timerSeconds = 0;
  startButton.disabled = false;
  pauseButton.disabled = true; 
  updateTimeDisplay();
});

updateTimeDisplay();


/*//////////TIMER//////////*/
(function() {
  const mercuryLevel = document.getElementById('mercury-level');
  const tempValue = document.getElementById('temp-value');
  const tempControl = document.getElementById('temp-control');
  
  function updateTemp() {
    const temp = tempControl.value;
    const height = (temp / 40) * 100;
    mercuryLevel.style.height = height + '%';
    tempValue.textContent = temp + '°C';
  }
  
  tempControl.addEventListener('input', updateTemp);
  updateTemp(); // Inizializza
})();