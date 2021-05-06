const sendForm = (form, popup) => {

    const errorMessage = 'Что-то пошло не так...',
        successMessage = 'Спасибо! Мы скоро с вами свяжемся!';
    // const form = document.getElementById('form1');

    const statusMessage = document.createElement('div');
    statusMessage.style.cssText = 'font-size: 2rem; color: white;';
    const statusAnim = document.createElement('div');
    statusAnim.innerHTML = `<div class="sk-wave sk-center">
                                    <div class="sk-wave-rect"></div>
                                    <div class="sk-wave-rect"></div>
                                    <div class="sk-wave-rect"></div>
                                    <div class="sk-wave-rect"></div>
                                    <div class="sk-wave-rect"></div>
                                </div>`;
    statusAnim.setAttribute('style', '--sk-color: white;');

    const postData = data =>
        fetch('./server.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        });

    const clearInputs = form => {
        form.querySelectorAll('input').forEach(item => item.value = '');
    };

    form.addEventListener('submit', event => {
        event.preventDefault();
        form.appendChild(statusAnim);

        const formData = new FormData(form);
        const body = {};
        formData.forEach((val, key) => {
            body[key] = val;
        });

        postData(JSON.stringify(body))
            .then(response => {
                if (response.status !== 200) {
                    throw new Error('response status not 200');
                }
                statusAnim.replaceWith(statusMessage);
                statusMessage.textContent = successMessage;

            })
            .catch(error => {
                console.error(error);
                statusAnim.replaceWith(statusMessage);
                statusMessage.textContent = errorMessage;
            })
            .finally(() => {
                setTimeout(() => {
                    statusMessage.textContent = '';
                }, 3000);
                clearInputs(form);

                if (popup) {
                    setTimeout(() => {
                        form.closest('.popup').style.display = 'none';
                    }, 3500);
                }
            });
    });
};

export default sendForm;