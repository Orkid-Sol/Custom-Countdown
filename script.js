const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdownform');
const dateEl = document.getElementById('date-picker');

const countdownEl = document.getElementById('countdown');
const countdownElTitle = document.getElementById('countdown-title');
const countdownBtn = document.getElementById('countdown-button');
const timeElements = document.querySelectorAll('span');

let countdownTitle = '';
let countdownDate = '';
let countdownValue = Date;
let countdownActive;
let saveCountdown ;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

const completeEl = document.getElementById('complete');
const completeElInfo = document.getElementById('complete-info');
const copmleteBtn = document.getElementById('complete-button');

// Set Date Input Min with Today's Date
const today = new Date().toISOString().split('T')[0];
dateEl.setAttribute('min', today);

// Populate Countdown / Complete UI
function updateDOM() {
    countdownActive = setInterval(() => {
        const now = new Date().getTime();
        const distance = countdownValue - now ;
        const days = Math.floor(distance / day);
        const hours = Math.floor((distance % day) / hour);
        const minutes = Math.floor((distance % hour) / minute);
        const seconds = Math.floor((distance % minute) / second);
        
         // Hide Input
         inputContainer.hidden = true;

        //  If the countdown has ended, show complete
        if (distance < 0) {
            countdownEl.hidden = true;
            clearInterval(countdownActive);
            completeElInfo.textContent = `${countdownTitle} finshed on ${countdownDate}`;
            completeEl.hidden = false;
        } else {
            // Else, show the countdown Progress
            countdownElTitle.textContent = `${countdownTitle}`;
            timeElements[0].textContent = `${days}`;
            timeElements[1].textContent = `${hours}`;
            timeElements[2].textContent = `${minutes}`;
            timeElements[3].textContent = `${seconds}`;
            completeEl.hidden = true;
            countdownEl.hidden = false;
        }
    }, second);
}



// Take Values from Input
function updateCountdown(e) {
    e.preventDefault();
    countdownTitle = e.srcElement[0].value;
    countdownDate = e.srcElement[1].value;
    saveCountdown = {
        title: countdownTitle,
        date: countdownDate,
    };
  
    localStorage.setItem('countdown', JSON.stringify(saveCountdown));

    // Check for valid date
    if (countdownDate === '') {
        alert('Please select a Date for the countdown.');
    } else {
        // Get number version of current Date, updateDOM
        countdownValue = new Date(countdownDate).getTime();
        updateDOM();
    }
}

// Reset All Values
function reset() {
    // Hide Countdowns, show Input
    countdownEl.hidden = true;
    completeEl.hidden = true;
    inputContainer.hidden = false;
    // Stop the Countdown
    clearInterval(countdownActive);
    // Reset values
    countdownTitle = '';
    countdownDate = '';
    localStorage.removeItem('countdown');

}

function restorePreviousCountdown() {
    // Get countdown from localStorage if available
    if (localStorage.getItem('countdown')) {
        inputContainer.hidden = true;
        saveCountdown = JSON.parse(localStorage.getItem('countdown'));
        countdownTitle = saveCountdown.title;
        countdownDate = saveCountdown.date;
        countdownValue = new Date(countdownDate).getTime();
        updateDOM();
    }

}
// Event Listeners
countdownForm.addEventListener('submit', updateCountdown);
countdownBtn.addEventListener('click', reset);
copmleteBtn.addEventListener('click', reset);   

// On Load, check local storage
restorePreviousCountdown();
