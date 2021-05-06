
const calc = (price = 100) => {
    const calcBlock = document.querySelector('.calc-block');
    const calcType = document.querySelector('.calc-type');
    const calcSquare = document.querySelector('.calc-square');
    const calcDay = document.querySelector('.calc-day');
    const calcCount = document.querySelector('.calc-count');
    const totalValue = document.getElementById('total');


    const animTotal = (start, stop) => {
        const toUp = start < stop;
        let step = Math.floor(Math.abs(stop - start) / 30); //60fps - то есть 1 секунда)
        let idFrame;

        const countUpDown = () => {
            if ((toUp && start >= stop) || (!toUp && start <= stop)) {
                cancelAnimationFrame(idFrame);
                totalValue.textContent = stop;
                return;
            }
            if (Math.abs(stop - start) < step) {
                step = Math.abs(stop - start);
            } // Последний шажок
            start = toUp ? start + step : start - step;
            totalValue.textContent = start;
            idFrame = requestAnimationFrame(countUpDown);
        };
        countUpDown();
    };

    const countSum = () => {
        let total = 0,
            countValue = 1,
            dayValue = 1;

        const startValue = +totalValue.textContent;
        const typeValue = calcType.value;
        //const typeValue = calcType.options[calcType.selectedIndex].value;
        const squareValue = +calcSquare.value;

        if (calcCount.value > 1) {
            countValue += (+calcCount.value - 1) / 10;
        }

        if (calcDay.value && calcDay.value < 5) {
            dayValue *= 2;
        } else if (calcDay.value && calcDay.value < 10) {
            dayValue *= 1.5;
        }

        if (typeValue && squareValue) {
            total = Math.floor(price * typeValue * squareValue * countValue * dayValue);
        } else {
            total = 0;
        }
        animTotal(startValue, total);
    };

    calcBlock.addEventListener('change', event => {
        const target = event.target;
        if (target.matches('select') || target.matches('input')) {
            countSum();

        }
    });
};

export default calc;