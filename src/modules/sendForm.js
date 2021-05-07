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

    function validateEmail(email) {
        const re = /^([a-z0-9\-_.]{2,30}@[a-z]{2,10}\.[a-z]{2,5})?$/;
        return re.test(email);
    }

    const formDataValidation = formData => {
        const userPhone = formData.querySelector('input[name = "user_phone"]');
        const userName = formData.querySelector('input[name = "user_name"]');
        const userEmail = formData.querySelector('input[name = "user_email"]');
        const phoneLength = userPhone.value.replace(/\D/g, '').length;
        if (userName.value.split(' ')[0].length < 2) {
            userName.focus();
            return 'В имени не может быть менее одного символа! ';
        }

        if (!validateEmail(userEmail.value)) {
            userName.focus();
            return 'Неверный формат e-mail!';

        }




        if (phoneLength < 11) {
            userPhone.focus();
            return 'Телефонный номер не может быть короче 11 цифр!';
        }


        return 'OK';

    };



    form.addEventListener('submit', event => {
        event.preventDefault();
        const canSend = formDataValidation(form);
        if (canSend !== 'OK') {
            statusMessage.textContent = canSend;
            form.appendChild(statusMessage);
            setTimeout(() => {
                statusMessage.textContent = '';
                form.removeChild(statusMessage);
            }, 3000);
            return;
        }

        const formData = new FormData(form);
        form.appendChild(statusAnim);
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