window.addEventListener('DOMContentLoaded', function () {
    "use strict";
    //Timer
    function countTimer(deadline) {
        let timerDays = document.querySelector('#timer-days'),
            timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds'),
            myInterval;

        function getTimeRemaining() {
            let dateStop = new Date(deadline).getTime(),
                dateNow = new Date().getTime(),
                timeRemaining = (dateStop - dateNow) / 1000,
                seconds = Math.floor(timeRemaining % 60),
                minutes = Math.floor((timeRemaining / 60) % 60),
                hours = Math.floor(timeRemaining / 3600) % 24,
                days = Math.floor(timeRemaining / 3600 / 24);
            return {
                timeRemaining,
                days,
                hours,
                minutes,
                seconds
            };
        }

        const zeroBefore = x => x <= 9 ? 0 + x.toString() : x.toString();

        const renderTimeRemaining = timer => {
            timerDays.textContent = zeroBefore(timer.days);
            timerHours.textContent = zeroBefore(timer.hours);
            timerMinutes.textContent = zeroBefore(timer.minutes);
            timerSeconds.textContent = zeroBefore(timer.seconds);
        };

        function updateClock() {
            let timer = getTimeRemaining();
            renderTimeRemaining(timer);
            if (timer.timeRemaining <= 0) {
                timer.days = 0;
                timer.hours = 0;
                timer.minutes = 0;
                timer.seconds = 0;
                renderTimeRemaining(timer);
                clearInterval(myInterval);
            }
        }

        myInterval = setInterval(updateClock, 1000);
    }

    countTimer('1 july 2021');
});