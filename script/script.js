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

    const smoothScroll = (targetYposition, timeOfScroll) => {
        const startTime = Date.now();
        let animFrameId;
        let step = (targetYposition / timeOfScroll) * 16; //расчет шага смещения (16ms - 60fps)
        const moveUp = step < 0; //направление движения, если шаг смещения отрицательный - двигаем страницу Up
        let leftToEnd = Math.abs(targetYposition); // остаток перемещения - постоянно корректируется
        let currentYposition = window.pageYOffset; //стартовая точка
        targetYposition += window.pageYOffset; //цель (точка прибытия)

        const drawDown = () => {
            const timePassed = Date.now() - startTime;
            //точно вписываемся на последнем шаге (последний шаг может быть как положительным, так и отрицательным)
            step = leftToEnd < Math.abs(step) ? step > 0 ? leftToEnd : -leftToEnd : step;
            currentYposition += step;
            window.scrollTo(0, currentYposition);
            leftToEnd -= Math.abs(step); // корректируем оставшееся расстояние после перемещения окна
            //если время вышло или окно в нужном месте на странице - то прекращаем анимацию
            if (timePassed >= timeOfScroll || (moveUp ? currentYposition <= targetYposition : currentYposition >= targetYposition)) {
                window.scrollTo(0, targetYposition);
                cancelAnimationFrame(animFrameId);
                return;
            }
            animFrameId = requestAnimationFrame(drawDown);
        };
        drawDown();
    };

    const toggleMenu = () => {

        const menu = document.querySelector('menu'),
            wbody = document.querySelector('body');

        const handlerMenu = event => {
            event.preventDefault();
            menu.classList.toggle('active-menu');
        };

        const scrollMenu = event => {
            handlerMenu(event);
            const blockID = event.target.closest('li').querySelector('a').getAttribute('href');
            const blockY = document.querySelector(`${blockID}`).getBoundingClientRect().y;
            smoothScroll(blockY, 500);
        };


        wbody.addEventListener('click', event => {
            const target = event.target;
            const isLi = target.closest('li');
            const isMenu = isLi ? isLi.closest('menu') : false;

            if (menu.classList.contains('active-menu')) {
                if (isLi && isMenu) {
                    scrollMenu(event);
                } else if (!target.closest('menu') || target.classList.contains('close-btn')) {
                    handlerMenu(event);
                }
            } else if (target.closest('.menu')) {
                handlerMenu(event);
            }
        });
    };

    toggleMenu();

    //кнопка внизу первой страницы страницы
    const imgDownScroll = () => {
        const imgDown = document.querySelector('img[src = "images/scroll.svg"]');
        imgDown.addEventListener('click', () => {
            const blckId = imgDown.parentNode.getAttribute('href');
            const blckY = document.querySelector(`${blckId}`).getBoundingClientRect().y;
            smoothScroll(blckY, 500);
        });
    };

    imgDownScroll();



    //popup
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

    //cлайдер

    const slider = () => {
        const slide = document.querySelectorAll('.portfolio-item'),
            slider = document.querySelector('.portfolio-content'),
            dotUl = document.querySelector('.portfolio-dots');
        let dot;

        let currentSlide = 0,
            interval;

        const prevSlide = (elem, index, strClass) => {
            elem[index].classList.remove(strClass);
        };

        const nextSlide = (elem, index, strClass) => {
            elem[index].classList.add(strClass);
        };


        const autoPlaySlide = () => {

            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');
            currentSlide++;
            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        };

        const startSlide = (time = 3000) => {

            interval = setInterval(autoPlaySlide, time);

        };

        const stopSlide = () => {
            clearInterval(interval);

        };

        //dot add
        const dotInsert = () => {

            slide.forEach(item => {
                const newDot = document.createElement('li');
                newDot.classList.add('dot');
                if (item.classList.contains('portfolio-item-active')) {
                    newDot.classList.add('dot-active');
                }
                dotUl.insertAdjacentElement('beforeend', newDot);
            });
            dot = document.querySelectorAll('.dot');

        };

        dotInsert();



        slider.addEventListener('click', event => {
            event.preventDefault();
            const target = event.target;

            if (!target.matches('.portfolio-btn, .dot')) {
                return;
            }

            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');

            if (target.matches('#arrow-right')) {
                currentSlide++;
            } else if (target.matches('#arrow-left')) {
                currentSlide--;
            } else if (target.matches('.dot')) {
                dot.forEach((elem, index) => {
                    if (elem === target) {
                        currentSlide = index;
                    }
                });
            }

            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }
            if (currentSlide < 0) {
                currentSlide = slide.length - 1;
            }
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');

        });

        slider.addEventListener('mouseover', event => {
            if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
                stopSlide();
            }

        });

        slider.addEventListener('mouseout', event => {
            if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
                startSlide(1500);
            }


        });


        startSlide(1500);

    };

    slider();

    // command

    const ourCommand = () => {
        const imgCommandElems = document.querySelectorAll('.command .command__photo');

        const imgExchange = e => {
            const temp = e.target.src;
            e.target.src = e.target.dataset.img;
            e.target.dataset.img = temp;
        };

        imgCommandElems.forEach(item => item.addEventListener('mouseenter', imgExchange));
        imgCommandElems.forEach(item => item.addEventListener('mouseleave', imgExchange));
    };

    ourCommand();

    //validations


    //только Кириллица + дефис и пробел
    const withotEngSymbols = elem =>
        elem.addEventListener('input', () => elem.value = elem.value.replace(/[^а-яёА-ЯЁ\- ]/gi, ''));

    //только цифры
    const approvedDigits = elem =>
        elem.addEventListener('input', () => elem.value = elem.value.replace(/\D/g, ''));
    //e-mail
    const approvedEmail = elem =>
        elem.addEventListener('input', () => elem.value = elem.value.replace(/[^a-zA-Z@\-_!~'.*]/gi, ''));

    //phone
    const approvedPhone = elem =>
        elem.addEventListener('input', () => elem.value = elem.value.replace(/[^\d-()]/g, ''));

    const calcValidations = () => {
        const calcInputs = document.querySelectorAll('#calc input');
        calcInputs.forEach(approvedDigits);
    };
    calcValidations();

    const textValidations = () => {
        const userMessage = document.querySelector('input[name="user_message"]');
        const userNames = document.querySelectorAll('input[name="user_name"]');
        userNames.forEach(withotEngSymbols);
        withotEngSymbols(userMessage);
    };
    textValidations();

    const emailValidations = () => {
        const userEmails = document.querySelectorAll('input[name="user_email"]');
        userEmails.forEach(approvedEmail);

    };
    emailValidations();

    const phoneValidations = () => {
        const userPhones = document.querySelectorAll('input[name="user_phone"]');
        userPhones.forEach(approvedPhone);

    };
    phoneValidations();

    const valueValidation = elem => elem.addEventListener('blur', () => {
        elem.value = elem.value.replace(/^[ -]*/, '');
        elem.value = elem.value.replace(/[ -]*$/, '');
        elem.value = elem.value.replace(/ +/g, ' ');
        elem.value = elem.value.replace(/-+/g, '-');

        if (elem.name === 'user_name') {
            elem.value = elem.value.replace(/[а-яА-Я]+/g,
                match => match.slice(0, 1).toUpperCase() + match.slice(1).toLowerCase());
        }

    });

    const blurValidation = () => {
        const allInputs = document.querySelectorAll('input');
        allInputs.forEach(valueValidation);

    };

    blurValidation();

});