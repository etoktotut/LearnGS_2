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

export default smoothScroll;