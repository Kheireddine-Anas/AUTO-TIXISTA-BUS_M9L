# Bus-Med Reservation Helper - Version 2

This project is designed to help students who cannot type quickly on the keyboard. It automates the reservation process on the Bus-Med website for the 1337 school.

## Overview

The script uses Puppeteer for web automation and Telegram for user interaction. It retrieves CSRF tokens and CAPTCHA images, and waits until the reservation time to perform actions on the website.

## Features

- Automates login and navigation on the Bus-Med website.
- Retrieves CSRF tokens and CAPTCHA images for the reservation process.
- Interacts with users through a Telegram bot.
- Waits for the specified reservation time and performs actions on the website.

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/Kheireddine-Anas/AUTO-TIXISTA-BUS_M9L.git
    cd AUTO-TIXISTA-BUS_M9L
    ```

2. Install the required dependencies:
    ```bash
    npm install puppeteer-extra node-telegram-bot-api
    ```

3. Replace `YOUR_TELEGRAM_BOT` in the script with your Telegram bot token.

4. Replace `USERNAME` and `PASSWORD` in the script with your intra  credentials.

5. Create captcha_data.txt file to let the script store the date on it.

## Usage

1. Run the script:
    ```bash
    node bus.mjs
    ```

2. Interact with the Telegram bot:
    - **2 or 3 Characters**: Send a 2 or 3-character message where the first one or two characters represent the hour (e.g., "1" for 1 AM or "16" for 4 PM) and the last character represents the index of the bus (0, 1, or 2). The script will retrieve the CSRF token and CAPTCHA image, and send the CAPTCHA image to you via Telegram.
    - **4 Characters**: After receiving the CAPTCHA image, reply with the 4-character CAPTCHA string. The script will then complete the reservation process at the specified time.

## Details

- The script will open the browser, navigate to the login page, and log in with your credentials automatically.
- When you send a 2 or 3-character message, the script will retrieve the CSRF token and CAPTCHA image, and save them along with the specified time and bus index. It will then send the CAPTCHA image to you via Telegram.
- When you send a 4-character message, the script will set the reservation time. At the specified time, it will reload the page, replace the CSRF token and CAPTCHA values, and complete the reservation process by clicking on the specified bus index and then submitting the form.

## Example

1. **3 Characters**: Sending "163" means the reservation time is 16:00 (4 PM) and the bus index is 3.
2. **2 Characters**: Sending "13" means the reservation time is 1:00 (1 AM) and the bus index is 3.
3. **4 Characters**: After receiving the CAPTCHA image, reply with the 4-character CAPTCHA string to complete the reservation process.

## Author

Kheireddine-Anas

kheireddine.anas@gmail.com

---

This project simplifies the reservation process on the Bus-Med website, making it accessible for users who find it difficult to type quickly. With this script, you can automate the reservation process and ensure you get a seat on the bus with minimal effort.
