

# Brocks Leaky Faucet

This project automates requests for BROCK tokens from the [Brock Token Faucet](https://faucet.bit-rock.io/). It uses Puppeteer to simulate a browser that enters an Ethereum address into the faucet’s input field and clicks the "Request Testnet BROCK" button every 123 seconds.

This guide provides instructions for configuring Puppeteer in a CLI-only environment, such as Linode, and installing all required dependencies to run headless Chromium successfully.

## Prerequisites

- **Node.js**: Required to run Puppeteer scripts.
- **Puppeteer**: The Node.js library for headless browser automation.

## Setup Guide

### 1. Install Node.js and npm

If Node.js isn’t already installed, run the following commands:

```bash
# Update the package index
sudo apt-get update

# Install Node.js (LTS version)
sudo apt-get install -y nodejs npm
```

### 2. Clone the Repository and Install Dependencies

1. **Clone this repository** to your server:

   ```bash
   git clone <repository-url>
   cd faucet-automation
   ```

2. **Install Puppeteer** (this will download a compatible Chromium version):

   ```bash
   npm install puppeteer
   ```

### 3. Install Required System Libraries

Install system libraries required to run Chromium in a headless environment:

```bash
sudo apt-get install -y \
    libcairo2 \
    libpango1.0-0 \
    libasound2 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libx11-xcb1 \
    libnss3 \
    libxss1 \
    libxcomposite1 \
    libxrandr2 \
    libgbm1 \
    libxdamage1 \
    libxshmfence1 \
    fonts-liberation \
    libcups2 \
    libdrm2 \
    libjpeg-turbo8 \
    libgif7 \
    libxtst6 \
    libxinerama1 \
    libxrender1
```

> **Note**: `libcairo2` is a critical library for graphics rendering; make sure it is successfully installed.

### 4. Verify Installation of `libcairo.so.2`

Confirm that `libcairo.so.2` is present:

```bash
ldconfig -p | grep libcairo
```

You should see output that includes the path to `libcairo.so.2` (typically `/usr/lib/x86_64-linux-gnu/libcairo.so.2`).

### 5. Run the Faucet Script

With all dependencies installed, use the following script to automate the faucet requests.

### Full Faucet Script: `dripcli.js`

This script will open the faucet page, input the specified Ethereum address, click the request button, and repeat every 123 seconds.

```javascript
const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        headless: true, // Run in headless mode for CLI environments
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-gpu',
            '--disable-dev-shm-usage'
        ]
    });

    const page = await browser.newPage();

    // Faucet URL and target address
    const url = 'https://faucet.bit-rock.io/';
    const address = '0x18Ff7f454B6A3233113f51030384F49054DD27BF';
    const intervalSeconds = 123; // Interval between actions in seconds
    let actionCount = 0; // Counter for actions performed
    let countdown = intervalSeconds; // Countdown timer

    // Function to format the current time
    const getCurrentTime = () => {
        const now = new Date();
        return now.toLocaleTimeString();
    };

    // Function to display status in the CLI
    const displayStatus = () => {
        console.clear();
        console.log("======== Brock Token Leaky Faucet ========");
        console.log(`URL                : ${url}`);
        console.log(`Current Time       : ${getCurrentTime()}`);
        console.log(`Address            : ${address}`);
        console.log(`Action Interval    : ${intervalSeconds} seconds`);
        console.log(`Actions Performed  : ${actionCount}`);
        console.log(`Next Action In     : ${countdown} seconds`);
        console.log("==========================================\n");
    };

    // Function to fill the input field and click the request button
    const fillInputAndClickButton = async () => {
        try {
            // Wait for the input field and type the address
            await page.waitForSelector('input[placeholder="Enter your address"]', { visible: true });
            await page.type('input[placeholder="Enter your address"]', address, { delay: 50 });
            console.log(`[${getCurrentTime()}] Address entered successfully!`);

            // Wait for the button and click it
            await page.waitForSelector("#app > main > section > div.hero-body > div > div > div.box.svelte-he9fq1 > div > p:nth-child(2) > button", { visible: true });
            await page.click("#app > main > section > div.hero-body > div > div > div.box.svelte-he9fq1 > div > p:nth-child(2) > button");
            console.log(`[${getCurrentTime()}] Button clicked successfully!`);

            // Increment the action counter
            actionCount++;
            countdown = intervalSeconds; // Reset countdown after each action
            displayStatus();
        } catch (error) {
            console.error(`[${getCurrentTime()}] Error in automation:`, error);
        }
    };

    // Navigate to the faucet page and perform the initial action
    await page.goto(url, { waitUntil: 'networkidle2' });
    await fillInputAndClickButton();

    // Schedule the action to repeat every specified interval
    setInterval(async () => {
        try {
            // Clear the input field before re-entering the address
            await page.evaluate(() => {
                const input = document.querySelector('input[placeholder="Enter your address"]');
                if (input) input.value = '';
            });

            // Perform the input and button click
            await fillInputAndClickButton();
        } catch (error) {
            console.error(`[${getCurrentTime()}] Error during scheduled action:`, error);
        }
    }, intervalSeconds * 1000);

    // Countdown display that updates every second
    setInterval(() => {
        if (countdown > 0) {
            countdown--;
            displayStatus();
        }
    }, 1000);

    // Optional: close the browser after a set time (e.g., 10 minutes)
    // setTimeout(() => browser.close(), 600000); // Close after 10 minutes
})();
```

### 6. Run the Script

To start the automation, run:

```bash
node dripcli.js
```

### Troubleshooting

If you encounter additional missing libraries, identify them from the error message (e.g., `libXYZ.so`) and install the necessary packages using `sudo apt-get install <library-name>`. You can also refer to [Puppeteer’s troubleshooting guide](https://pptr.dev/troubleshooting) for more help.
