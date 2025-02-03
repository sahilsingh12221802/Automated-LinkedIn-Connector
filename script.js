let clickedCount = 0;

function clickNextConnectButton() {
    // Find the "Connect" button
    let connectButton = [...document.querySelectorAll('.artdeco-button__text')]
        .find(btn => btn.innerText.trim().toLowerCase() === 'connect');

    if (connectButton) {
        // Click the "Connect" button
        connectButton.click();
        clickedCount++;
        console.log(`✅ Clicked Connect Button ${clickedCount}`);

        // Wait for the "Send without a note" button to appear
        setTimeout(() => {
            let sendWithoutNote = [...document.querySelectorAll('.artdeco-button__text')]
                .find(btn => btn.innerText.trim().toLowerCase() === 'send without a note');

            if (sendWithoutNote) {
                sendWithoutNote.click();
                console.log("🔄 Clicked 'Send without a note'");

                // Wait for the final "Send" button to appear
                setTimeout(() => {
                    let finalSendButton = document.querySelector('.artdeco-modal .artdeco-button--primary');
                    if (finalSendButton) {
                        finalSendButton.click();
                        console.log("✅ Clicked Final Send Button");
                    }

                    // Wait and continue the process
                    setTimeout(clickNextConnectButton, 700); // Wait 700 miliSeconds seconds before next action
                }, 700); // Wait 700 miliSeconds seconds for the modal to load
            } else {
                // If "Send without a note" is not found, continue
                setTimeout(clickNextConnectButton, 700); // Wait 700 miliSeconds seconds before next action
            }
        }, 700); // Wait 700 miliSeconds seconds for the "Send without a note" button to load
    } else {
        // If no "Connect" button is found, look for the "Next" button
        let nextButton = [...document.querySelectorAll('.artdeco-button__text')]
            .find(btn => btn.innerText.trim().toLowerCase() === 'next');

        if (nextButton) {
            console.log("🔄 Moving to the next page...");
            nextButton.click();

            // Wait for the new page to load
            setTimeout(() => {
                // Retry finding the "Connect" button after the page loads
                let retryCount = 0;
                const maxRetries = 5; // Maximum number of retries
                const retryInterval = 3000; // Wait 3 seconds between retries

                const retryFindConnectButton = () => {
                    let newConnectButton = [...document.querySelectorAll('.artdeco-button__text')]
                        .find(btn => btn.innerText.trim().toLowerCase() === 'connect');

                    if (newConnectButton) {
                        clickNextConnectButton(); // Continue the process
                    } else if (retryCount < maxRetries) {
                        retryCount++;
                        console.log(`🔄 Retrying to find "Connect" button (Attempt ${retryCount})...`);
                        setTimeout(retryFindConnectButton, retryInterval);
                    } else {
                        console.log("❌ Failed to find 'Connect' button after multiple retries.");
                    }
                };

                retryFindConnectButton(); // Start retrying
            }, 5000); // Wait 5 seconds for the new page to load
        } else {
            // If no "Next" button is found, end the process
            console.log(`✅ Process Complete: Clicked ${clickedCount} connections.`);
        }
    }
}

// Run the function
clickNextConnectButton();