/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdateLearnGS_2"]("main",{

/***/ "./src/modules/sendForm.js":
/*!*********************************!*\
  !*** ./src/modules/sendForm.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar sendForm = function sendForm(form, popup) {\n  var errorMessage = 'Что-то пошло не так...',\n      successMessage = 'Спасибо! Мы скоро с вами свяжемся!'; // const form = document.getElementById('form1');\n\n  var statusMessage = document.createElement('div');\n  statusMessage.style.cssText = 'font-size: 2rem; color: white;';\n  var statusAnim = document.createElement('div');\n  statusAnim.innerHTML = \"<div class=\\\"sk-wave sk-center\\\">\\n                                    <div class=\\\"sk-wave-rect\\\"></div>\\n                                    <div class=\\\"sk-wave-rect\\\"></div>\\n                                    <div class=\\\"sk-wave-rect\\\"></div>\\n                                    <div class=\\\"sk-wave-rect\\\"></div>\\n                                    <div class=\\\"sk-wave-rect\\\"></div>\\n                                </div>\";\n  statusAnim.setAttribute('style', '--sk-color: white;');\n\n  var postData = function postData(data) {\n    return fetch('./server.php', {\n      method: 'POST',\n      headers: {\n        'Content-Type': 'application/json'\n      },\n      body: data\n    });\n  };\n\n  var clearInputs = function clearInputs(form) {\n    form.querySelectorAll('input').forEach(function (item) {\n      return item.value = '';\n    });\n  };\n\n  form.addEventListener('submit', function (event) {\n    event.preventDefault();\n    form.appendChild(statusAnim);\n    var formData = new FormData(form);\n    var body = {};\n    formData.forEach(function (val, key) {\n      body[key] = val;\n    });\n    postData(JSON.stringify(body)).then(function (response) {\n      if (response.status !== 200) {\n        throw new Error('response status not 200');\n      }\n\n      statusAnim.replaceWith(statusMessage);\n      statusMessage.textContent = successMessage;\n    })[\"catch\"](function (error) {\n      console.error(error);\n      statusAnim.replaceWith(statusMessage);\n      statusMessage.textContent = errorMessage;\n    })[\"finally\"](function () {\n      setTimeout(function () {\n        statusMessage.textContent = '';\n      }, 3000);\n      clearInputs(form);\n\n      if (popup) {\n        setTimeout(function () {\n          form.closest('.popup').style.display = 'none';\n        }, 3500);\n      }\n    });\n  });\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (sendForm);\n\n//# sourceURL=webpack://LearnGS_2/./src/modules/sendForm.js?");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ "use strict";
/******/ 
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("2f9dd0e67488a39fa544")
/******/ })();
/******/ 
/******/ }
);