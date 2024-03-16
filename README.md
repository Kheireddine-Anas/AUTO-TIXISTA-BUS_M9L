# AUTO TIXISTA BUS

This userscript automates the process of filling out captcha input fields on the [Tixista Bus](https://bus-med.1337.ma/) website.
It aims to simplify the process for users who need to book bus place by automatically completing the captcha, thereby saving time and effort.

## Installation

To use this userscript, you need to have a browser extension like Greasemonkey or Tampermonkey installed (I use Tampermokey in FireFox). Once you have the extension installed, follow these steps:

1. Change the time in the script in this line:
```javascript
targetTime.setHours(16, 34, 0, 0)
```
2. You have to change those variabls every time you need to take a place: csrfTokenInput, captchaInput & captchaText.
3. You need to change the index of the bus if the bus you need is the sencod in the list you have to write 1 in this line: 
```javascript
const secondButton = document.querySelectorAll('div.interact_container button[data-target="#reservationModal"]')[1]
 ```

( You can find the `csrfToken` and `captchaInput` values directly from the source code of the Tixista Bus website. Inspect the webpage and search for these values in the HTML source. They are hidden input fields or other form elements. )

## Author

Kheireddine-Anas

kheireddine.anas@gmail.com