import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const inputDate = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('button[data-start]');
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');
let inputTime;
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        inputTime = selectedDates[0];
        if(inputTime <= Date.now()) {        
            Notiflix.Notify.failure("Please choose a date in the future");
            btnStart.disabled = true;
        } else {
            btnStart.disabled = false;
        }
    },
};

btnStart.disabled = true;

flatpickr(inputDate, options);

function timerCountDown() {
    let int = setInterval(() => {
        let timeDif = convertMs(inputTime - Date.now())
        if(timeDif.days == 0 && timeDif.hours == 0 && timeDif.minutes == 0 && timeDif.seconds == 0) {
            clearInterval(int);
            btnStart.disabled = true;
        };
    days.textContent = addLeadingZero(timeDif.days)
    hours.textContent = addLeadingZero(timeDif.hours)
    minutes.textContent = addLeadingZero(timeDif.minutes)
    seconds.textContent = addLeadingZero(timeDif.seconds)
    }, 1000);

}

btnStart.addEventListener('click', timerCountDown);

function addLeadingZero(value){
    return value.toString().padStart(2,'0')
};

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  };

