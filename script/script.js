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

        const menu = document.querySelector('menu'),
            wbody = document.querySelector('body');

        const handlerMenu = () => {
            menu.classList.toggle('active-menu');
        };

        wbody.addEventListener('click', event => {
            const target = event.target;
            if (menu.classList.contains('active-menu')) {
                if (!target.closest('menu') || target.classList.contains('close-btn') || (target.tagName === 'A')) {
                    handlerMenu();
                }
            } else if (target.closest('.menu')) {
                handlerMenu();
            }
        });
    };

    toggleMenu();

    const animate = (elem, time) => {
        const startTime = Date.now(); // запомнить время начала
        elem.style.top = '-100%'; // двигаем меню за пределы экрана
        elem.style.display = 'block'; // показываем окно ( но оно еще не видно)
        let step = Math.floor((110 / time) * 20);
        let top = -100,
            animFrameId;

        const drawPopupDown = () => {
            const timePassed = Date.now() - startTime,
                leftToEnd = 10 - top;
            //точно вписываемся на последнем шаге
            step = leftToEnd < step ? leftToEnd : step;
            top += step;
            elem.style.top = top + '%';
            //если время вышло или окно в нужном месте на странице - то прекращаем анимацию
            if (timePassed >= time || top >= 10) {
                elem.style.top = 10 + '%';
                cancelAnimationFrame(animFrameId);
                return;
            }
            animFrameId = requestAnimationFrame(drawPopupDown);
        };
        drawPopupDown();
    };



    const togglePopUp = () => {
        const popup = document.querySelector('.popup'),
            popupContent = document.querySelector('.popup-content'),
            popupBtn = document.querySelectorAll('.popup-btn');

        popupBtn.forEach(elem => {
            elem.addEventListener('click', () => {
                popup.style.display = 'block';
                //если экран устройства не уже 768px
                if (screen.width <= 768) {
                    popupContent.style.display = 'block';
                } else {
                    animate(popupContent, 300);
                }
            });
        });

        // popUpClose.addEventListener('click', () => popup.style.display = 'none');

        popup.addEventListener('click', event => {
            let target = event.target;
            //проверка "крестика" в окне
            if (target.classList.contains('popup-close')) {
                popup.style.display = 'none';
            } else {
                //проверяем на клик внтутри модального окна popup
                // .popup-content - это самый верхний wrapper этого окна
                // если target будет Null - то кликнули за пределами popup
                target = target.closest('.popup-content');
                if (!target) {
                    popup.style.display = 'none';

                }
            }
        });

    };

    togglePopUp();

    //табы

    const tabs = () => {
        const tabHeader = document.querySelector('.service-header'),
            tab = tabHeader.querySelectorAll('.service-header-tab'),
            tabContent = document.querySelectorAll('.service-tab');

        const toggleTabContent = index => {
            for (let i = 0; i < tabContent.length; i++) {
                if (index === i) {
                    tab[i].classList.add('active');
                    tabContent[i].classList.remove('d-none');
                } else {
                    tab[i].classList.remove('active');
                    tabContent[i].classList.add('d-none');
                }
            }
        };

        tabHeader.addEventListener('click', event => {
            let target = event.target;
            target = target.closest('.service-header-tab');

            if (target) {
                tab.forEach((item, i) => {
                    if (item === target) {
                        toggleTabContent(i);
                    }
                });
            }
        });
    };

    tabs();

});
