import smoothScroll from './smoothScroll';

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

export default toggleMenu;
