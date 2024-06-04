import puppeteer from "puppeteer-extra";
import TelegramBot from 'node-telegram-bot-api';
import fs from 'fs';

(async () => {
	let csrfToken = '';
	let captchaHexa = '';
	let reservationTime = '';

	const performActionAndRedirect = async (page) => {
		const token = 'YOUR_TELEGRAM_BOT';
		
		const bot = new TelegramBot(token, { polling: true });
		
		bot.on('message', async (msg) => {
			const chatId = msg.chat.id;
			const userMessage = msg.text;
			
			console.log(`Received message from ${chatId}: ${userMessage}`);
			
			if (userMessage.length === 3 || userMessage.length === 2) {
				await page.goto("https://bus-med.1337.ma/");
				const result = await page.evaluate(() => {
					const csrfTokenInput = document.querySelector('input[name="csrfmiddlewaretoken"]');
					const captchaInput = document.querySelector('input[name="captcha_0"]');
					return {
						csrfToken: csrfTokenInput ? csrfTokenInput.value : null,
						captchaHexa: captchaInput ? captchaInput.value : null,
					};
				});
				csrfToken = result.csrfToken;
				captchaHexa = result.captchaHexa;

				console.log('CSRF Token Retrieved:', csrfToken);
				console.log('Captcha Hexa Retrieved:', captchaHexa);

				if (csrfToken && captchaHexa) {
					let firstTwoChars;
					let lastChar;

					if (userMessage.length === 3) {
						firstTwoChars = userMessage.slice(0, 2);
						lastChar = userMessage.slice(-1);
					}
					else if (userMessage.length === 2) {
						firstTwoChars = userMessage.slice(0, 1);
						lastChar = userMessage.slice(1,2);
					}
					let img = `https://bus-med.1337.ma/captchaimage/${captchaHexa}`;
					bot.sendPhoto(chatId, img);
					fs.writeFileSync('captcha_data.txt', `${csrfToken}\n${captchaHexa}\n${firstTwoChars}\n${lastChar}\n`);
				}
			} 

			else if (userMessage.length === 4) {
				const code = userMessage;
				const data = fs.readFileSync('captcha_data.txt', 'utf-8').split('\n');
				csrfToken = data[0];
				captchaHexa = data[1];
				reservationTime = parseInt(data[2]);
				const index = data[3];
				console.log(`CSRF Token: ${csrfToken}, Captcha Hexa: ${captchaHexa}, Reservation Time: ${reservationTime}`);

				const targetTime = new Date();
				targetTime.setHours(reservationTime, 0, 0, 0);
				const currentTime = new Date();
				let timeDifference = targetTime - currentTime;

				if (timeDifference < 0) {
					targetTime.setDate(targetTime.getDate() + 1);
					timeDifference = targetTime - currentTime;
				}

				console.log('Time Difference:', timeDifference / 1000, 'seconds');
				await new Promise(resolve => setTimeout(resolve, timeDifference));

				await page.goto("https://bus-med.1337.ma/");
				await page.waitForSelector('button[data-target="#reservationModal"]', { visible: true });

				const evaluationResult = await page.evaluate((csrfToken, captchaHexa, code, index) => {
					const csrfTokenInput = document.querySelector('input[name="csrfmiddlewaretoken"]');
					const captchaInput = document.querySelector('input[name="captcha_0"]');
					const captchaInput1 = document.getElementById('id_captcha_1');

					if (csrfTokenInput) csrfTokenInput.value = csrfToken;
					if (captchaInput) captchaInput.value = captchaHexa;
					if (captchaInput1) captchaInput1.value = code;

					const secondButtons = document.querySelectorAll('div.interact_container button[data-target="#reservationModal"]');
					if (secondButtons) {
						secondButtons[parseInt(index)].click();
						const trds = document.querySelector('button.btn.btn-success');
						if (trds) {
							setTimeout(() => {
								trds.click();
							}, 500);
						}
					}

					return {
						csrfTokenSet: csrfTokenInput ? csrfTokenInput.value : null,
						captchaHexaSet: captchaInput ? captchaInput.value : null,
						captchaInputSet: captchaInput1 ? captchaInput1.value : null,
					};
				}, csrfToken, captchaHexa, code, index);

				console.log('CSRF Token Set:', evaluationResult.csrfTokenSet);
				console.log('Captcha Hexa Set:', evaluationResult.captchaHexaSet);
				console.log('Captcha Input Set:', evaluationResult.captchaInputSet);
			}
			bot.sendMessage(chatId, 'Received your message')
				.then(() => {
					console.log(`Message sent to ${chatId}`);
				})
				.catch((error) => {
					console.error(`Error sending message to ${chatId}: ${error}`);
				});
		});

		bot.on('polling_error', (error) => {
			console.error(`Polling error: ${error}`);
		});

		bot.on('webhook_error', (error) => {
			console.error(`Webhook error: ${error}`);
		});
		bot.on('error', (error) => {
			console.error(`General error: ${error}`);
		});
		console.log('Telegram bot started...');
	};

	try {
		const browser = await puppeteer.launch({
			defaultViewport: null,
			executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
			headless: false,
		});

		for (let i = 0; i < 1; i++) {
			const page = await browser.newPage();
			await page.setDefaultNavigationTimeout(0);
			await page.goto("https://bus-med.1337.ma/user/login?next=/", {
				waitUntil: "domcontentloaded",
				timeout: `1000000`,
			});

			await page.waitForSelector('a.intralogin', { visible: true });
			await page.evaluate(() => {
				document.querySelector('a.intralogin').click();
			});
			await page.waitForSelector('input#username', { visible: true });
			await page.type('input#username', 'USERNAME');
			await page.waitForSelector('input#password', { visible: true });
			await page.type('input#password', 'PASSWORD');
			await page.click('input#kc-login');
			await performActionAndRedirect(page);
		}
	} catch (error) {
		console.log(error, "ERROR");
	}
})();
