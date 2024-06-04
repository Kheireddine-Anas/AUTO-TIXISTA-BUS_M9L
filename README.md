# Bus-Med Reservation Helper

This repository contains scripts designed to automate the reservation process on the Bus-Med website for the 1337 school. These scripts are especially helpful for students who find it challenging to type quickly on a keyboard.

## Overview

The repository includes two versions of the reservation helper script:

1. **Version 1**: A userscript that works with browser extensions like Greasemonkey or Tampermonkey.
2. **Version 2**: A Node.js script that uses Puppeteer for web automation and interacts with users through a Telegram bot.

## Scripts

### Version 1

- **Location**: `v_1/`
- **Description**: This userscript automates filling out CAPTCHA input fields on the [Bus-Med](https://bus-med.1337.ma/) website. It is designed to simplify the booking process by automatically completing the CAPTCHA, thus saving time and effort.

### Version 2

- **Location**: `v_2/`
- **Description**: This Node.js script uses Puppeteer for web automation and Telegram for user interaction. It logs into the Bus-Med website, retrieves CSRF tokens and CAPTCHA images, and waits until the specified reservation time to perform actions on the website.

## Usage

Each version has its own `README.md` file with detailed installation and usage instructions.

- [Version 1 README](v_1/README.md)
- [Version 2 README](v_2/README.md)

## Author

Kheireddine-Anas

kheireddine.anas@gmail.com

---

This project aims to assist students at 1337 school by automating the bus reservation process on the Bus-Med website.
