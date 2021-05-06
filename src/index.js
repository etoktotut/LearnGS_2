"use strict";

import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import imgDownScroll from './modules/imgDownScroll';
import togglePopUp from './modules/togglePopUp';
import tabs from './modules/tabs';
import slider from './modules/slider';
import ourCommand from './modules/ourCommand';
import validations from './modules/validations';
import calc from './modules/calc';
import sendForm from './modules/sendForm';

//Timer
countTimer('1 july 2021');
//меню
toggleMenu();
//кнопка внизу первой страницы страницы
imgDownScroll();
//popup
togglePopUp();
//табы
tabs();
//cлайдер
slider();
// command
ourCommand();
//validations
validations();

//калькулятор
calc(200);

//ajax send
sendForm(document.getElementById('form1'));
sendForm(document.getElementById('form2'));
sendForm(document.getElementById('form3'), true);