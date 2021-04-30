class Validator {
    constructor({
        selector,
        pattern = {},
        method
    }) {
        this.form = document.querySelector(selector);
        this.pattern = pattern;
        this.method = method;
        this.elementsForm = [...this.form.elements].filter(item => {
            return item.tagName.toLowerCase() !== 'button' &&
                item.type !== 'button';
        });
        this.error = new Set();
    }

    init() {
        this.applyStyle();
        this.setPattern();
        this.elementsForm.forEach(elem => elem.addEventListener('change', this.checkIt.bind(this)));
        this.form.addEventListener('submit', e => {
            this.elementsForm.forEach(elem => this.checkIt({
                target: elem
            }));
            if (this.error.size) {
                e.preventDefault();
            }
        });

    }

    isValid(elem) {
        const validatorMethod = {
            notEmpty(elem) {
                if (elem.value.trim() === '') {

                    return false;
                }
                return true;
            },
            pattern(elem, pattern) {
                return pattern.test(elem.value);
            }
        };

        if (this.method) {
            const method = this.method[elem.id];
            if (method) {
                return method.every(item => validatorMethod[item[0]](elem, this.pattern[item[1]]));
            }
        } else {
            console.warn('Необходимо передать id полей ввода и методы проверки этих полей!');
        }

        return true;

    }

    checkIt(event) {
        const target = event.target;

        if (this.isValid(target)) {
            console.log("valid success");
            this.showSuccess(target);
            this.error.delete(target);
        } else {
            console.log("valid error");
            this.showError(target);
            this.error.add(target);
        }
    }

    showError(elem) {
        elem.classList.add('alert-danger');
        elem.classList.remove('alert-success');
        if (elem.nextElementSibling && elem.nextElementSibling.classList.contains('validator-error')) {
            return;
        }
        const errorDiv = document.createElement('div');
        errorDiv.textContent = 'Ошибка в этом поле';
        errorDiv.classList.add('validator-error');
        elem.insertAdjacentElement('afterend', errorDiv);
    }

    showSuccess(elem) {
        elem.classList.add('alert-success');
        elem.classList.remove('alert-danger');
        if (elem.nextElementSibling && elem.nextElementSibling.classList.contains('validator-error')) {
            elem.nextElementSibling.remove();
        }
    }

    applyStyle() {
        const style = document.createElement('style');
        style.textContent = `
        input.success{
            border: 2px solid green;
        }
        input.error {
            border: 2px solid red:
            color: red;
        }
        validator-error {
            font-size: 14px;
            color: red;
        }
        `;
        document.head.appendChild(style);

    }

    setPattern() {
        if (!this.pattern.phone) {
            this.pattern.phone = /^\+?[78]([-()]*\d){10}$/;
        }
        if (!this.pattern.email) {
            this.pattern.email = /^\w+@\w+\.\w{2,}$/;
        }
    }
}

//HTML part
const validForm1 = new Validator({
    selector: '#form1',
    pattern: {
        name: /^[а-яёА-ЯЁ]+ [а-яёА-ЯЁ]+$/,
    },
    method: {
        'form1-name': [
            ['notEmpty'],
            ['pattern', 'name']
        ],
    }
});
validForm1.init();

const validForm2 = new Validator({
    selector: '#form2',
    pattern: {
        name: /^[а-яёА-ЯЁ]+ [а-яёА-ЯЁ]+$/,
        message: /^[а-яёА-ЯЁ \-.]+$/
    },
    method: {
        'form2-name': [
            ['notEmpty'],
            ['pattern', 'name']
        ],
        'form2-message': [
            ['notEmpty'],
            ['pattern', 'message']
        ]
    }
});
validForm2.init();

const validForm3 = new Validator({
    selector: '#form3',
    pattern: {
        name: /^[а-яёА-ЯЁ]+ [а-яёА-ЯЁ]+$/,
    },
    method: {
        'form3-name': [
            ['notEmpty'],
            ['pattern', 'name']
        ],
    }
});
validForm3.init();


// const valid = new Validator({
// 	selector: '#form1',
// 	pattern: {
// 		phone: /^\+380\d{7}$/,
// 		zip: /\d{5, 6}/,
// 		name: /[а-яёА-ЯЁ]+/
// 	},
// 	method: {
// 		'form1-name': [
// 			['notEmpty'],
// 			['pattern', 'phone']
// 		],
// 		'form1-email': [
// 			['notEmpty'],
// 			['pattern', 'email']

// 		]
// 	}
// });