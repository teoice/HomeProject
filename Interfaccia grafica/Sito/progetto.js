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
// Elementi DOM
const mercury = document.getElementById('mercury');
const tempDisplay = document.getElementById('temp-display');
const tempSlider = document.getElementById('temp-slider');

// Aggiorna il termometro in base alla temperatura
function updateThermometer(temp) {
  // Calcola l'altezza del mercurio (percentuale)
  const percentage = (temp / 40) * 100;
  mercury.style.height = `${percentage}%`;
  
  // Aggiorna il display
  tempDisplay.textContent = `${temp}°C`;
}

// Event listener per lo slider
tempSlider.addEventListener('input', function() {
  updateThermometer(parseInt(this.value));
});

// Inizializza
updateThermometer(20);