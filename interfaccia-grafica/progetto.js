let timerMinutes = 0;
let timerSeconds = 0;
let timerInterval = null;


let lampAlert = document.getElementById('luce');
let windowsAlert = document.getElementsByClassName('finestra');
let alarmAlert = document.getElementById('allarme');

const timeDisplay = document.getElementById('time-display');
const addMinuteButton = document.getElementById('add-minute');
const subtractMinuteButton = document.getElementById('subtract-minute');
const startButton = document.getElementById('start-timer');
const pauseButton = document.getElementById('pause-timer');
const resetIcon = document.getElementById('reset-icon');

const tempValue = document.getElementById('temp-value');
const tempSlider = document.getElementById('temp-control');
const outTemp = document.getElementById('t-interna');


let start = tempSlider.value;
let currentTemp = parseInt(start);
let intervalId = null;

outTemp.innerText = currentTemp;

tempSlider.addEventListener('input', () => {
  const target = parseInt(tempSlider.value);

  if (intervalId) {
    clearInterval(intervalId);
  }

  intervalId = setInterval(() => {
    if (currentTemp < target) {
      currentTemp++;
    } else if (currentTemp > target) {
      currentTemp--;
    }

    outTemp.innerText = currentTemp;

    if (currentTemp === target) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }, 1000); // intervallo più veloce
});



/*//////////ALERT//////////*/
lampAlert.addEventListener('click', function() {
  if (this.checked) {
    alert("Hai ACCESO la luce!");
  } else {
    alert("Hai SPENTO la luce!");
  }
});

for(let window of windowsAlert) {
  window.addEventListener("click", () => {
    if (window.checked) {
      alert("Hai APERTO la finestra!");
    } else {
      alert("Hai CHIUSO la finestra!");
    }
  });
}

alarmAlert.addEventListener('click', function() {
  if (this.checked) {
    alert("Hai ACCESO l'Allarme!");
  } else {
    alert("Hai SPENTO l'Allarme!");
  }
});


/*//////////TIMER//////////*/

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

  alert('Hai ACCESO il Timer per gli irrigatori!');

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
        alert('Il tempo è scaduto, si sono SPENTI gli Irrigatori!');
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


/*//////////TERMOMETRO//////////*/
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


/*//////////CAMBIO VALORI//////////*/
function updateRandomValue(id, min, max) {
  const display = document.getElementById(id);
  let current = Math.random() * (max - min) + min;

  function update() {
    // Calcola un delta tra -0.5 e +0.5
    let delta = (Math.random() - 0.5) * 1;
    let newValue = current + delta;

    // Limita il valore nei confini
    newValue = Math.max(min, Math.min(max, newValue));

    current = newValue;
    display.textContent = current.toFixed(1);
  }

  // Aggiorna ogni 2000 millisecondi (2 secondi)
  update(); // esegue subito la prima volta
  setInterval(update, 6000);
}


updateRandomValue("t-esterna", 12, 30);
updateRandomValue("pro-h", 2,7);
updateRandomValue("batteria", 60, 100);
updateRandomValue("consumo", 1.5, 4);