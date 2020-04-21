window.addEventListener('DOMContentLoaded', () => { // браузер полностью загрузил HTML

    'use strict'; // по классике , строгий режим

    //получение элементов из DOM 
    let timerHours = document.querySelector('#timer-hours'),
        timerMinutes = document.querySelector('#timer-minutes'),
        timerSeconds = document.querySelector('#timer-seconds');

    // таймер 
    function countTimer(deadline) {

        function getTimeRemaining() {

            let dateStop = new Date(deadline).getTime(), // получаем конечную дату 
                dateNow = new Date().getTime(), // текущая дата 
                timeRemaining = (dateStop - dateNow) / 1000, // полученная разница 
                seconds = Math.floor(timeRemaining % 60), // подсчет секунд
                minutes = Math.floor((timeRemaining / 60) % 60), // подсчет минут
                hours = Math.floor(timeRemaining / 60 / 60); // подсчет часов

            // возврат значений в виде объекта
            return {
                timeRemaining,
                hours,
                minutes,
                seconds
            };
        }

        // функция обновления значения на странице
        function updateClock() {

            let timer = getTimeRemaining();

            // условие для отображения часов
            if (timer.hours < 10) {
                timerHours.textContent = "0" + timer.hours;
            } else {
                timerHours.textContent = timer.hours;
            }
            // условие для отображения минут
            if (timer.minutes < 10) {
                timerMinutes.textContent = "0" + timer.minutes;
            } else {
                timerMinutes.textContent = timer.minutes;
            }
            // условие для отображения секунд
            if (timer.seconds < 10) {
                timerSeconds.textContent = "0" + timer.seconds;
            } else {
                timerSeconds.textContent = timer.seconds;
            }

            let newInterval = setInterval(updateClock, 1000); // используем метод setInterval()

            // условие , если время больше нуля , продолжать отсчет ( менять значение каждую секунду)
            if (timer.timeRemaining > 0) {
                setTimeout(updateClock, 1000);
            } // если значение обнулилось , то ... 
            else {
                clearInterval(newInterval); // ... останавливать отсчет
                timerHours.textContent = '00'; // задавать значение равное нулю
                timerMinutes.textContent = '00'; // задавать значение равное нулю
                timerSeconds.textContent = '00'; // задавать значение равное нулю
            }

            //console.log(timer);
        }

        // вызов функции обновления времени на странице
        updateClock();

    }

    // до какой даты идет отсчет
    countTimer('31 april 2020');


    // меню 
    const toggleMenu = () => {

        const btnMenu = document.querySelector('.menu'),
            menu = document.querySelector('menu'),
            closeBtn = document.querySelector('.close-btn'),
            menuItems = menu.querySelectorAll('ul>li');

        const handlerMenu = () => {

            menu.classList.toggle('active-menu');
        };

        btnMenu.addEventListener('click', handlerMenu);
        closeBtn.addEventListener('click', handlerMenu);
        menuItems.forEach((elem) => elem.addEventListener('click', handlerMenu));

    };

    toggleMenu();

    /*
        
    1) Написать скрипт Меню и модального окна по видео

    2) Написать анимацию появления модального окна

        Использовать JS анимацию. Использовать нативный JavaScript. 
    Использование сторонних библиотек запрещено!
    Необходимо манипулировать элементами по средством JS. СSS анимация не подходит. 
    Сделать можно по аналогии с летающим червем из урока. Есть пример с паровозом здесь.

        Если пользователь заходит на сайт с устройства, у которого ширина экрана 
    меньше 768px (мобильного устройства) - анимация отключается

    3) Проверить, чтобы все работало и не было ошибок в консоли

    https://developer.mozilla.org/en-US/docs/Web/API/Window/innerWidth
    https://learn.javascript.ru/js-animation
    https://learn.javascript.ru/metrics-window
    https://developer.mozilla.org/ru/docs/DOM/window.requestAnimationFrame
    */

    // popup
    const togglePopUp = () => {

        const popup = document.querySelector('.popup'),
            popupBtn = document.querySelectorAll('.popup-btn'),
            popupClose = document.querySelector('.popup-close'),
            popupContent = document.querySelector('.popup-content'); // получаем элемент модального окна из DOM для взаимодействия с ним

        // создаем перменные для дальнейшего взаимодействия с анимацией
        let startPoint = -500;
        let setAnimation;

        const popupBegin = () => {

            let width = document.documentElement.clientWidth; // получение размеров видимой части окна 
            setAnimation = requestAnimationFrame(popupBegin); // requestAnimationFrame указывает о желание запустить анимацию / перерисовку
            startPoint += 25; // скорость анимации
            popupContent.style.top = startPoint + 'px';
            // условие для своевременной отсановки анимации
            if (startPoint > (width / 10)) {
                cancelAnimationFrame(setAnimation); // cancelAnimationFrame() останавливает анимацию, запланированную requestAnimationFrame()
            }
        };

        popupBtn.forEach((elem) => {

            elem.addEventListener('click', () => {

                let width = document.documentElement.clientWidth; // получение размеров видимой части окна 
                // услвоие , для того, чтобы модальное окно открывалось без анимации на смарфтонах
                if (width > 768) {
                    popup.style.display = 'block';
                    popupBegin(); // запуск функции проигрывания анимации
                } else {
                    popup.style.display = 'block';
                }
            });
        });

        popupClose.addEventListener('click', () => {

            startPoint = -500; // возврщаем модальное окно на место начала анимации 
            popup.style.display = 'none';
        });

    };

    togglePopUp();

});