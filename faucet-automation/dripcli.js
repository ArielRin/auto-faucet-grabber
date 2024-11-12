const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        headless: true, // Run in headless mode for CLI environments
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-gpu',
            '--disable-dev-shm-usage',
            '--disable-software-rasterizer'
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
