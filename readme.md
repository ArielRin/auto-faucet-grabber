
# Brocks Leaky Faucet

**Brocks Leaky Faucet** is a Node.js script that automates the process of requesting tokens from the **Brock Token Faucet** at regular intervals. This script uses Puppeteer to simulate a browser, inputting an Ethereum address into the faucet's address field and clicking the "Request Testnet BROCK" button every 123 seconds. It also displays real-time updates in the command line interface (CLI), including the countdown until the next request and the number of requests made in the current session.

## How It Works

This script automates token requests from the [Brock Token Faucet](https://faucet.bit-rock.io/). Here's an overview of the process:

1. **Opens the Faucet Page**: The script uses Puppeteer to open the faucet page in a browser.
2. **Enters an Address**: It inputs the specified Ethereum address into the faucet's input field.
3. **Clicks the Request Button**: It simulates a click on the "Request Testnet BROCK" button, which sends a request to the faucet for tokens.
4. **Repeats the Process**: The script repeats this process every 123 seconds, allowing you to receive regular testnet BROCK tokens automatically.

### Features

- **Automated Token Requests**: Automates the process of requesting tokens every 123 seconds.
- **CLI Display**: Shows the faucet URL, address, time until the next request, and a count of requests made in the current session.
- **Real-Time Countdown**: A countdown timer displays the time remaining until the next request.
- **Error Handling**: Provides clear error messages in the CLI if any step fails.

## Prerequisites

- **Node.js**: Ensure that you have Node.js installed. [Download Node.js](https://nodejs.org/)
- **Puppeteer**: The script uses Puppeteer for browser automation.

## Installation

1. **Clone or Download** this repository to your local machine.
2. **Install Dependencies**: In the project directory, install the required npm packages:

   ```bash
   npm install puppeteer
   ```

## Usage

1. **Configure the Address**: Open the script file (`faucet_script.js`) and replace the `address` variable with your Ethereum testnet address.

2. **Run the Script**:

   ```bash
   node faucet_script.js
   ```

3. **Observe the CLI Output**: The CLI will display:
   - The faucet URL
   - Your Ethereum address
   - Action interval (123 seconds)
   - Count of actions performed
   - Countdown until the next action

4. **Stop the Script**: Press `Ctrl + C` in the terminal to stop the script.

## Code Summary

The script performs the following actions in sequence:
- Launches Puppeteer to open a browser and navigates to the faucet page.
- Enters the specified address in the input field and clicks the "Request Testnet BROCK" button.
- Logs each action, showing the number of requests made and the countdown until the next request.
- Runs indefinitely, requesting tokens every 123 seconds.

## Example Output

```plaintext
======== Brock Token Leaky Faucet ========
URL                : https://faucet.bit-rock.io/
Current Time       : 12:34:56 PM
Address            : 0x18Ff7f454B6A3233113f51030384F49054DD27BF
Action Interval    : 123 seconds
Actions Performed  : 3
Next Action In     : 35 seconds
==========================================

[12:32:00 PM] Address entered successfully!
[12:32:00 PM] Button clicked successfully!
```

## Notes

- **Browser Visibility**: The script launches the browser in visible mode (`headless: false`). To run it in headless mode, change `headless: true` in the Puppeteer launch options.
- **Adjusting the Interval**: The request interval is set to 123 seconds, but you can modify this by updating the `intervalSeconds` variable.

## Troubleshooting

If you encounter issues, ensure:
- Node.js and Puppeteer are correctly installed.
- Your network allows Puppeteer to access the faucet URL.

---

This README provides an overview of how **Brocks Leaky Faucet** works, helping you automate requests for testnet BROCK tokens in a user-friendly, continuous process.
