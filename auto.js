// ==UserScript==
// @name         AUTO TIXISTA BUS
// @namespace    http://1337.ma
// @version      1.0 Last
// @description  Automatically fills captcha input fields
// @match        https://bus-med.1337.ma/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const targetTime = new Date();
    targetTime.setHours(16, 34, 0, 0);

    const currentTime = new Date();
    const remainingTime = targetTime - currentTime;

    const isReloaded = sessionStorage.getItem('isReloaded');

    if (remainingTime > 0) {
        setTimeout(() => {
            sessionStorage.setItem('isReloaded', 'true');
            location.reload();
        }, remainingTime);
    } else {
        if (isReloaded === 'true') {
            const csrfTokenInput = document.querySelector('input[name="csrfmiddlewaretoken"]');
            const captchaInput = document.querySelector('input[name="captcha_0"]');
            const captchaText = document.getElementById('id_captcha_1');
            const submitButton = document.querySelector('button.btn.btn-success');
            //const claimButtons = document.querySelectorAll('button.claimbutton[data-target="#reservationModal"]');
            const secondButton = document.querySelectorAll('div.interact_container button[data-target="#reservationModal"]')[1]; //INDEX BUS

            if (csrfTokenInput && captchaInput && captchaText && submitButton && secondButton) {
                csrfTokenInput.value = 'xaKKU328YZUoYl7Mr4W3fvx8wElnT8IbDettA19Fpq5bXT1gcdwApZRBNImC20rj';
                captchaInput.value = 'bf74f3dc4c180fb0a6204ed39c5077f978c5b7a6';
                secondButton.click();
                setTimeout(() => {
                    captchaText.focus();
                    captchaText.value = 'cylu'; 
                }, 500);
                //setTimeout(() => {
                  //  submitButton.click();
                //}, 500);
            }
        }
        sessionStorage.removeItem('isReloaded');
    }
})();