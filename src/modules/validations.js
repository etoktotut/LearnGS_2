//только Кириллица + пробел
const validations = () => {

    //e-mail required
    const emailRequired = () => {
        document.querySelectorAll('input[name="user_email"]').forEach(elem => elem.setAttribute('required', 'true'));
    };
    emailRequired();


    function maskPhone(selector, masked = '+7 (___) ___-__-__') {
        const elems = document.querySelectorAll(selector);

        function mask(event) {
            const keyCode = event.keyCode;
            const template = masked,
                def = template.replace(/\D/g, ""),
                val = this.value.replace(/\D/g, "");

            let i = 0,
                newValue = template.replace(/[_\d]/g, function (a) {
                    let z = i < val.length ? val.charAt(i++) || def.charAt(i) : a;
                    return z;
                });
            i = newValue.indexOf("_");
            if (i !== -1) {
                newValue = newValue.slice(0, i);
            }
            let reg = template.substr(0, this.value.length).replace(/_+/g,
                function (a) {
                    return "\\d{1," + a.length + "}";
                }).replace(/[+()]/g, "\\$&");
            reg = new RegExp("^" + reg + "$");
            if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) {
                this.value = newValue;
            }
            if (event.type === "blur" && this.value.length < 5) {
                this.value = "";
            }
        }

        for (const elem of elems) {
            elem.addEventListener("input", mask);
            elem.addEventListener("focus", mask);
            elem.addEventListener("blur", mask);
        }

    }

    maskPhone('input[name="user_phone"]');


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
    // const approvedPhone = elem =>
    //     elem.addEventListener('input', () => elem.value = elem.value.replace(/[^\d+]/g, ''));

    //Калькулятор
    const calcValidations = () => {
        const calcInputs = document.querySelectorAll('#calc input');
        calcInputs.forEach(approvedDigits);
    };
    calcValidations();

    //INPUT - валидация текстовых полей
    const textValidations = () => {
        const userMessage = document.querySelector('input[name="user_message"]');
        const userNames = document.querySelectorAll('input[name="user_name"]');
        userNames.forEach(withotEngSymbols);
        validForMessage(userMessage);
    };
    textValidations();

    //INPUT - валидация e-mail
    const emailValidations = () => {
        const userEmails = document.querySelectorAll('input[name="user_email"]');
        userEmails.forEach(approvedEmail);
    };
    emailValidations();

    // const phoneValidations = () => {
    //     const userPhones = document.querySelectorAll('input[name="user_phone"]');
    //     userPhones.forEach(approvedPhone);
    // };
    // phoneValidations();

    // BLUR validations для текстовых полей и e-mail
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

    const blurValidationUserName = () => {
        const allInputs = document.querySelectorAll('input[name="user_name"]');
        allInputs.forEach(valueValidation);
    };

    const blurValidationEmail = () => {
        const allInputs = document.querySelectorAll('input[name="user_email"]');
        allInputs.forEach(valueValidation);
    };

    blurValidationUserName();
    blurValidationEmail();


};

export default validations;