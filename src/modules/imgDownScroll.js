import smoothScroll from './smoothScroll';

const imgDownScroll = () => {
    const imgDown = document.querySelector('img[src = "images/scroll.svg"]');
    imgDown.addEventListener('click', () => {
        const blckId = imgDown.parentNode.getAttribute('href');
        const blckY = document.querySelector(`${blckId}`).getBoundingClientRect().y;
        smoothScroll(blckY, 500);
    });

};

export default imgDownScroll;