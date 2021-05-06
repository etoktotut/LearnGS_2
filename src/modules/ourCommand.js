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

export default ourCommand;