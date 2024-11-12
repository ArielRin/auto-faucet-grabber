const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    // Go to the faucet page
    await page.goto('https://faucet.bit-rock.io/', { waitUntil: 'networkidle2' });

    const address = '0x18Ff7f454B6A3233113f51030384F49054DD27BF';

    // Function to fill the input and click the button
    const fillInputAndClickButton = async () => {
        try {
            // Fill in the address
            await page.waitForSelector('input[placeholder="Enter your address"]', { visible: true });
            await page.type('input[placeholder="Enter your address"]', address, { delay: 50 });
            console.log("Address entered!");

            // Wait for the button using the exact selector provided
            await page.waitForSelector("#app > main > section > div.hero-body > div > div > div.box.svelte-he9fq1 > div > p:nth-child(2) > button", { visible: true });

            // Click the button
            await page.click("#app > main > section > div.hero-body > div > div > div.box.svelte-he9fq1 > div > p:nth-child(2) > button");
            console.log("Button clicked!");

        } catch (error) {
            console.error("Error in automation:", error);
        }
    };

    // Initial fill and click, then repeat every 123 seconds
    await fillInputAndClickButton();
    setInterval(async () => {
        // Clear the input before re-entering the address
        await page.evaluate(() => {
            const input = document.querySelector('input[placeholder="Enter your address"]');
            if (input) input.value = '';
        });
        await fillInputAndClickButton();
    }, 123 * 1000);

    // Optional: close the browser after a specific period
    // setTimeout(() => browser.close(), 600000); // Close after 10 minutes
})();
