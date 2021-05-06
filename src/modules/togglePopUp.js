const togglePopUp = () => {
    const popup = document.querySelector('.popup'),
        popupContent = document.querySelector('.popup-content'),
        popupBtn = document.querySelectorAll('.popup-btn');

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

export default togglePopUp;
