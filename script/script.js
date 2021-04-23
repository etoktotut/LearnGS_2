window.addEventListener('DOMContentLoaded', () => {
    "use strict";
    //Timer
    function countTimer(deadline) {
        const timerDays = document.querySelector('#timer-days'),
            timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds');
        let myInterval;

        function getTimeRemaining() {
            const dateStop = new Date(deadline).getTime(),
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

        const zeroBefore = x => (x <= 9 ? 0 + x.toString() : x.toString());

        const renderTimeRemaining = timer => {
            timerDays.textContent = zeroBefore(timer.days);
            timerHours.textContent = zeroBefore(timer.hours);
            timerMinutes.textContent = zeroBefore(timer.minutes);
            timerSeconds.textContent = zeroBefore(timer.seconds);
        };

        function updateClock() {
            const timer = getTimeRemaining();
            if (timer.timeRemaining <= 0) {
                timer.days = 0;
                timer.hours = 0;
                timer.minutes = 0;
                timer.seconds = 0;
                if (typeof myInterval !== undefined) {
                    clearInterval(myInterval);
                }
            }
            renderTimeRemaining(timer);
        }
        updateClock();
        myInterval = setInterval(updateClock, 1000);
    }
    countTimer('1 july 2021');

    //меню

    const toggleMenu = () => {

        const btnMenu = document.querySelector('.menu'),
            menu = document.querySelector('menu'),
            closeBtn = document.querySelector('.close-btn'),
            menuItems = menu.querySelectorAll('ul>li');

        const handlerMenu = () => {
            menu.classList.toggle('active-menu');
        };



        btnMenu.addEventListener('click', handlerMenu);
        closeBtn.addEventListener('click', handlerMenu);
        menuItems.forEach(item => item.addEventListener('click', handlerMenu));

    };

    toggleMenu();

    const animate = (popup, time) => {
        const startTime = Date.now(); // запомнить время начала
        popup.style.transform = 'translateY(-100%)'; // двигаем меню за пределы экрана
        popup.style.display = 'block';// показываем окно ( но оно еще не видно)
        let step = Math.floor((document.documentElement.clientHeight / time) * 20);
        let top = 0, animFrameId;

        const drawPopupDown = () => {
            const timePassed = Date.now() - startTime,
                docHeight = document.documentElement.clientHeight,
                leftToEnd = docHeight - top;
            //точно вписываемся на последнем шаге
            step = leftToEnd < step ? leftToEnd : step;
            top += step;
            popup.style.top = top + 'px';
            //если время вышло или окно целиком на странице - то прекращаем работать
            if (timePassed >= time || top >= docHeight) {
                cancelAnimationFrame(animFrameId);
                return;
            }

            animFrameId = requestAnimationFrame(drawPopupDown);
        };
        drawPopupDown();
    };



    const togglePopUp = () => {
        const popup = document.querySelector('.popup'),
            popupBtn = document.querySelectorAll('.popup-btn'),
            popUpClose = document.querySelector('.popup-close');

        popupBtn.forEach(elem => {
            elem.addEventListener('click', () => {
                //если экран устройства уже 768px
                if (screen.width <= 768) {
                    popup.style.display = 'block';
                } else {
                    animate(popup, 300);
                }
            });
        });
        popUpClose.addEventListener('click', () => popup.style.display = 'none');
    };

    togglePopUp();

});
