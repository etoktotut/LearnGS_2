//только Кириллица + пробел
const validations = () => {

    const withotEngSymbols = elem =>
        elem.addEventListener('input', () => elem.value = elem.value.replace(/[^а-яёА-ЯЁ ]/gi, ''));

    //только кириллицу, пробелы, цифры и знаки препинания.
    const validForMessage = elem =>
        elem.addEventListener('input',
            () => elem.value = elem.value.replace(/[^а-яёА-ЯЁ \d.,;:\-?!()"«»]/gi, ''));

    //только цифры
    const approvedDigits = elem =>
        elem.addEventListener('input', () => elem.value = elem.value.replace(/\D/g, ''));
    //e-mail
    const approvedEmail = elem =>
        elem.addEventListener('input', () => {
            const temp = elem.value.replace(/[^a-zA-Z@\-_!~'.*\d]/gi, '');
            elem.value = 'a';
            elem.value = temp;
        });

    //phone
    const approvedPhone = elem =>
        elem.addEventListener('input', () => elem.value = elem.value.replace(/[^\d+]/g, ''));

    const calcValidations = () => {
        const calcInputs = document.querySelectorAll('#calc input');
        calcInputs.forEach(approvedDigits);
    };
    calcValidations();

    const textValidations = () => {
        const userMessage = document.querySelector('input[name="user_message"]');
        const userNames = document.querySelectorAll('input[name="user_name"]');
        userNames.forEach(withotEngSymbols);
        validForMessage(userMessage);
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
        const temp = elem.value;
        elem.value = 'a';
        elem.value = temp;
    });

    const blurValidation = () => {
        const allInputs = document.querySelectorAll('input');
        allInputs.forEach(valueValidation);
    };

    blurValidation();
};

export default validations;