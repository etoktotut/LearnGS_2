(()=>{"use strict";function e(t){return(e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(t)}const t=function(e,t){var n,o=Date.now(),r=e/t*16,i=r<0,a=Math.abs(e),l=window.pageYOffset;e+=window.pageYOffset,function s(){var c=Date.now()-o;if(r=a<Math.abs(r)?r>0?a:-a:r,l+=r,window.scrollTo(0,l),a-=Math.abs(r),c>=t||(i?l<=e:l>=e))return window.scrollTo(0,e),void cancelAnimationFrame(n);n=requestAnimationFrame(s)}()};function n(e,t){var n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=function(e,t){if(e){if("string"==typeof e)return o(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?o(e,t):void 0}}(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var r=0,i=function(){};return{s:i,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,l=!0,s=!1;return{s:function(){n=n.call(e)},n:function(){var e=n.next();return l=e.done,e},e:function(e){s=!0,a=e},f:function(){try{l||null==n.return||n.return()}finally{if(s)throw a}}}}function o(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,o=new Array(t);n<t;n++)o[n]=e[n];return o}const r=function(e,t){var n=document.createElement("div");n.style.cssText="font-size: 2rem; color: white;";var o=document.createElement("div");o.innerHTML='<div class="sk-wave sk-center">\n                                    <div class="sk-wave-rect"></div>\n                                    <div class="sk-wave-rect"></div>\n                                    <div class="sk-wave-rect"></div>\n                                    <div class="sk-wave-rect"></div>\n                                    <div class="sk-wave-rect"></div>\n                                </div>',o.setAttribute("style","--sk-color: white;"),e.addEventListener("submit",(function(r){r.preventDefault();var i=function(e){var t,n=e.querySelector('input[name = "user_phone"]'),o=e.querySelector('input[name = "user_name"]'),r=e.querySelector('input[name = "user_email"]'),i=n.value.replace(/\D/g,"").length;return o.value.split(" ")[0].length<2?(o.focus(),"В имени не может быть менее одного символа! "):(t=r.value,/^([a-zA-Z0-9\-_.]{1,30}@([a-zA-Z\-]{2,12}\.){1,2}[a-zA-Z]{2,5})?$/.test(t)?i<11?(n.focus(),"Телефонный номер не может быть короче 11 цифр!"):"OK":(o.focus(),"Неверный формат e-mail!"))}(e);if("OK"!==i)return n.textContent=i,e.appendChild(n),void setTimeout((function(){n.textContent="",e.removeChild(n)}),2e3);var a=new FormData(e);e.appendChild(o);var l,s={};a.forEach((function(e,t){s[t]=e})),(l=JSON.stringify(s),fetch("./server.php",{method:"POST",headers:{"Content-Type":"application/json"},body:l})).then((function(e){if(200!==e.status)throw new Error("response status not 200");o.replaceWith(n),n.textContent="Спасибо! Мы скоро с вами свяжемся!"})).catch((function(e){console.error(e),o.replaceWith(n),n.textContent="Что-то пошло не так..."})).finally((function(){setTimeout((function(){n.textContent=""}),3e3),function(e){e.querySelectorAll("input").forEach((function(e){return e.value=""}))}(e),t&&setTimeout((function(){e.closest(".popup").style.display="none"}),3500)}))}))};function i(e,t){if(e){if("string"==typeof e)return a(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?a(e,t):void 0}}function a(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,o=new Array(t);n<t;n++)o[n]=e[n];return o}function l(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}var s=function(){function e(t){var n=t.main,o=t.wrap,r=t.next,i=t.prev,a=t.infinity,l=void 0!==a&&a,s=t.position,c=void 0===s?0:s,u=t.slidesToShow,d=void 0===u?3:u,f=t.responsive,m=void 0===f?[]:f;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),n&&o||console.warn('slider-carusel: Необходимо 2 свойства, "main" и "wrap"!'),this.main=document.querySelector(n),this.wrap=document.querySelector(o),this.sliders=document.querySelector(o).children,this.next=document.querySelector(r),this.prev=document.querySelector(i),this.slidesToShow=d,this.options={position:c,infinity:l,widthSlide:Math.floor(100/this.slidesToShow)},this.responsive=m}var t,n;return t=e,(n=[{key:"init",value:function(){this.addGloClass(),this.addStyle(),this.prev&&this.next||this.addArrow(),this.controlSlider(),this.responsive&&this.responseInit()}},{key:"addGloClass",value:function(){this.main.classList.add("glo-slider"),this.wrap.classList.add("glo-slider__wrap");var e,t=function(e,t){var n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=i(e))){n&&(e=n);var o=0,r=function(){};return{s:r,n:function(){return o>=e.length?{done:!0}:{done:!1,value:e[o++]}},e:function(e){throw e},f:r}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,l=!0,s=!1;return{s:function(){n=n.call(e)},n:function(){var e=n.next();return l=e.done,e},e:function(e){s=!0,a=e},f:function(){try{l||null==n.return||n.return()}finally{if(s)throw a}}}}(this.sliders);try{for(t.s();!(e=t.n()).done;)e.value.classList.add("glo-slider__item")}catch(e){t.e(e)}finally{t.f()}}},{key:"addStyle",value:function(){var e=document.getElementById("sliderCarousel-style");e||((e=document.createElement("style")).id="sliderCarousel-style"),e.textContent="\n        .glo-slider{\n            overflow: hidden !important;\n        }\n        .glo-slider__wrap {\n            display: flex !important;\n            transition: transform 0.5s !important;\n            will-change: transform !important;\n        }\n\n        .glo-slider__item{\n            display: flex !important;\n            align-items:center;\n            justify-content:center;\n            flex: 0 0 ".concat(this.options.widthSlide,"% !important;\n            margin: auto 0 !important;\n        }\n        "),document.head.appendChild(e)}},{key:"controlSlider",value:function(){this.prev.addEventListener("click",this.prevSlide.bind(this)),this.next.addEventListener("click",this.nextSlide.bind(this))}},{key:"prevSlide",value:function(){(this.options.infinity||this.options.position>0)&&(--this.options.position,this.options.position<0&&(this.options.position=this.sliders.length-this.slidesToShow),this.wrap.style.transform="translateX(-".concat(this.options.position*this.options.widthSlide,"%)"))}},{key:"nextSlide",value:function(){(this.options.infinity||this.options.position<this.sliders.length-this.slidesToShow)&&(++this.options.position,this.options.position>this.sliders.length-this.slidesToShow&&(this.options.position=0),this.wrap.style.transform="translateX(-".concat(this.options.position*this.options.widthSlide,"%)"))}},{key:"addArrow",value:function(){this.prev=document.createElement("button"),this.next=document.createElement("button"),this.prev.className="glo-slider__prev",this.next.className="glo-slider__next",this.main.appendChild(this.prev),this.main.appendChild(this.next);var e=document.createElement("style");e.textContent="\n        .glo-slider__prev,\n        .glo-slider__next{\n            margin:0 10px;\n            border: 20px solid transparent;\n            background: transparent;\n            \n        }\n        .glo-slider__next {\n            border-left-color: #19b5fe;\n        }\n        .glo-slider__prev {\n            border-right-color: #19b5fe;\n        }\n\n        .glo-slider__prev:hover,\n        .glo-slider__next:hover,\n        .glo-slider__prev:focus,\n        .glo-slider__next:focus{\nbackground: transparent;\noutline:transparent\n        }\n\n\n        ",document.head.appendChild(e)}},{key:"responseInit",value:function(){var e,t=this,n=this.slidesToShow,o=this.responsive.map((function(e){return e.breakpoint})),r=Math.max.apply(Math,function(e){if(Array.isArray(e))return a(e)}(e=o)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||i(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),l=function(){var e=document.documentElement.clientWidth;if(e<r)for(var i=0;i<o.length;i++)e<o[i]&&(t.slidesToShow=t.responsive[i].slideToShow,t.options.widthSlide=Math.floor(100/t.slidesToShow),t.addStyle());else t.slidesToShow=n,t.options.widthSlide=Math.floor(100/t.slidesToShow),t.addStyle()};l(),window.addEventListener("resize",l)}}])&&l(t.prototype,n),e}();var c,u,d,f,m,v,p,h,y,g,S,b,w,E,_,A,q,x,L,k,C;(function(t){var n,o=document.querySelector("#timer-days"),r=document.querySelector("#timer-hours"),i=document.querySelector("#timer-minutes"),a=document.querySelector("#timer-seconds"),l=function(e){return e<=9?0+e.toString():e.toString()};function s(){var s,c,u,d,f=(s=(new Date(t).getTime()-(new Date).getTime())/1e3,c=Math.floor(s%60),u=Math.floor(s/60%60),d=Math.floor(s/3600)%24,{timeRemaining:s,days:Math.floor(s/3600/24),hours:d,minutes:u,seconds:c});f.timeRemaining<=0&&(f.days=0,f.hours=0,f.minutes=0,f.seconds=0,void 0!==e(n)&&clearInterval(n)),function(e){o.textContent=l(e.days),r.textContent=l(e.hours),i.textContent=l(e.minutes),a.textContent=l(e.seconds)}(f)}s(),n=setInterval(s,1e3)})("1 july 2021"),L=document.querySelector("menu"),k=document.querySelector("body"),C=function(e){e.preventDefault(),L.classList.toggle("active-menu")},k.addEventListener("click",(function(e){var n=e.target,o=n.closest("li"),r=!!o&&o.closest("menu");L.classList.contains("active-menu")?o&&r?function(e){C(e);var n=e.target.closest("li").querySelector("a").getAttribute("href"),o=document.querySelector("".concat(n)).getBoundingClientRect().y;t(o,500)}(e):n.closest("menu")&&!n.classList.contains("close-btn")||C(e):n.closest(".menu")&&C(e)})),(x=document.querySelector('img[src = "images/scroll.svg"]')).addEventListener("click",(function(){var e=x.parentNode.getAttribute("href"),n=document.querySelector("".concat(e)).getBoundingClientRect().y;t(n,500)})),A=document.querySelector(".popup"),q=document.querySelector(".popup-content"),document.querySelectorAll(".popup-btn").forEach((function(e){e.addEventListener("click",(function(){A.style.display="block",screen.width<=768?q.style.display="block":function(e,t){var n=Date.now();e.style.top="-100%",e.style.display="block";var o,r=Math.floor(110/300*20),i=-100;!function t(){var a=Date.now()-n,l=10-i;if(i+=r=l<r?l:r,e.style.top=i+"%",a>=300||i>=10)return e.style.top="10%",void cancelAnimationFrame(o);o=requestAnimationFrame(t)}()}(q)}))})),A.addEventListener("click",(function(e){var t=e.target;t.classList.contains("popup-close")?A.style.display="none":(t=t.closest(".popup-content"))||(A.style.display="none")})),w=document.querySelector(".service-header"),E=w.querySelectorAll(".service-header-tab"),_=document.querySelectorAll(".service-tab"),w.addEventListener("click",(function(e){var t=e.target;(t=t.closest(".service-header-tab"))&&E.forEach((function(e,n){e===t&&function(e){for(var t=0;t<_.length;t++)e===t?(E[t].classList.add("active"),_[t].classList.remove("d-none")):(E[t].classList.remove("active"),_[t].classList.add("d-none"))}(n)}))})),m=document.querySelectorAll(".portfolio-item"),v=document.querySelector(".portfolio-content"),p=document.querySelector(".portfolio-dots"),h=0,y=function(e,t,n){e[t].classList.remove(n)},g=function(e,t,n){e[t].classList.add(n)},S=function(){y(m,h,"portfolio-item-active"),y(d,h,"dot-active"),++h>=m.length&&(h=0),g(m,h,"portfolio-item-active"),g(d,h,"dot-active")},b=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:3e3;f=setInterval(S,e)},m.forEach((function(e){var t=document.createElement("li");t.classList.add("dot"),e.classList.contains("portfolio-item-active")&&t.classList.add("dot-active"),p.insertAdjacentElement("beforeend",t)})),d=document.querySelectorAll(".dot"),v.addEventListener("click",(function(e){e.preventDefault();var t=e.target;t.matches(".portfolio-btn, .dot")&&(y(m,h,"portfolio-item-active"),y(d,h,"dot-active"),t.matches("#arrow-right")?h++:t.matches("#arrow-left")?h--:t.matches(".dot")&&d.forEach((function(e,n){e===t&&(h=n)})),h>=m.length&&(h=0),h<0&&(h=m.length-1),g(m,h,"portfolio-item-active"),g(d,h,"dot-active"))})),v.addEventListener("mouseover",(function(e){(e.target.matches(".portfolio-btn")||e.target.matches(".dot"))&&clearInterval(f)})),v.addEventListener("mouseout",(function(e){(e.target.matches(".portfolio-btn")||e.target.matches(".dot"))&&b(1500)})),b(1500),c=document.querySelectorAll(".command .command__photo"),u=function(e){var t=e.target.src;e.target.src=e.target.dataset.img,e.target.dataset.img=t},c.forEach((function(e){return e.addEventListener("mouseenter",u)})),c.forEach((function(e){return e.addEventListener("mouseleave",u)})),function(){document.querySelectorAll('input[name="user_email"]').forEach((function(e){return e.setAttribute("required","true")})),document.querySelectorAll('input[name="user_email"]').forEach((function(e){return e.setAttribute("maxlength","35")})),document.querySelectorAll('input[name="user_name"]').forEach((function(e){return e.setAttribute("maxlength","35")})),function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"+7 (___) ___-__-__",o=document.querySelectorAll(e);function r(e){var n=e.keyCode,o=t,r=o.replace(/\D/g,""),i=this.value.replace(/\D/g,""),a=0,l=o.replace(/[_\d]/g,(function(e){return a<i.length?i.charAt(a++)||r.charAt(a):e}));-1!==(a=l.indexOf("_"))&&(l=l.slice(0,a));var s=o.substr(0,this.value.length).replace(/_+/g,(function(e){return"\\d{1,"+e.length+"}"})).replace(/[+()]/g,"\\$&");(!(s=new RegExp("^"+s+"$")).test(this.value)||this.value.length<5||n>47&&n<58)&&(this.value=l),"blur"===e.type&&this.value.length<5&&(this.value="")}var i,a=n(o);try{for(a.s();!(i=a.n()).done;){var l=i.value;l.addEventListener("input",r),l.addEventListener("focus",r),l.addEventListener("blur",r)}}catch(e){a.e(e)}finally{a.f()}}('input[name="user_phone"]');var e,t;document.querySelectorAll("#calc input").forEach((function(e){return e.addEventListener("input",(function(){return e.value=e.value.replace(/\D/g,"")}))})),t=document.querySelector('input[name="user_message"]'),document.querySelectorAll('input[name="user_name"]').forEach((function(e){return e.addEventListener("input",(function(){return e.value=e.value.replace(/[^а-яёА-ЯЁ ]/gi,"")}))})),(e=t).addEventListener("input",(function(){return e.value=e.value.replace(/[^а-яёА-ЯЁ \d.,;:\-?!()"«»]/gi,"")})),document.querySelectorAll('input[name="user_email"]').forEach((function(e){return e.addEventListener("input",(function(){var t=e.value.replace(/[^a-zA-Z@\-_!~'.*\d]/gi,"");e.value="a",e.value=t}))}));var o=function(e){return e.addEventListener("blur",(function(){e.value=e.value.replace(/^[ -]*/,""),e.value=e.value.replace(/[ -]*$/,""),e.value=e.value.replace(/ +/g," "),e.value=e.value.replace(/-+/g,"-"),"user_name"===e.name&&(e.value=e.value.replace(/[а-яА-Я]+/g,(function(e){return e.slice(0,1).toUpperCase()+e.slice(1).toLowerCase()})));var t=e.value;e.value="a",e.value=t}))};document.querySelectorAll('input[name="user_name"]').forEach(o),document.querySelectorAll('input[name="user_email"]').forEach(o)}(),function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:100,t=document.querySelector(".calc-block"),n=document.querySelector(".calc-type"),o=document.querySelector(".calc-square"),r=document.querySelector(".calc-day"),i=document.querySelector(".calc-count"),a=document.getElementById("total"),l=function(e,t){var n,o=e<t,r=Math.floor(Math.abs(t-e)/30);!function i(){if(o&&e>=t||!o&&e<=t)return cancelAnimationFrame(n),void(a.textContent=t);Math.abs(t-e)<r&&(r=Math.abs(t-e)),e=o?e+r:e-r,a.textContent=e,n=requestAnimationFrame(i)}()},s=function(){var t,s=1,c=1,u=+a.textContent,d=n.value,f=+o.value;i.value>1&&(s+=(+i.value-1)/10),r.value&&r.value<5?c*=2:r.value&&r.value<10&&(c*=1.5),t=d&&f?Math.floor(e*d*f*s*c):0,l(u,t)};t.addEventListener("change",(function(e){var t=e.target;(t.matches("select")||t.matches("input"))&&s()}))}(200),r(document.getElementById("form1")),r(document.getElementById("form2")),r(document.getElementById("form3"),!0),new s({main:".companies-wrapper",wrap:".companies-hor",slidesToShow:4,infinity:!0,responsive:[{breakpoint:1024,slideToShow:3},{breakpoint:768,slideToShow:2},{breakpoint:576,slideToShow:1}]}).init()})();