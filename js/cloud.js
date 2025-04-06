import { app } from "/scripts/app.js";

// Function to trigger the backend action
async function triggerBackendAction() {
    try {
        const response = await fetch('/cloud-handler-action', { // Must match the route in __init__.py
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            // You could send data in the body if needed:
            // body: JSON.stringify({ some_data: "value" })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log("Backend response:", result);
        // Optionally, show a success message to the user
        // app.ui.dialog.show("Action successful!"); // Simple popup

    } catch (error) {
        console.error("Error triggering backend action:", error);
        // Optionally, show an error message
        // app.ui.dialog.show(`Error: ${error.message}`);
    }
}

// Register the extension
app.registerExtension({
    name: "CloudExtension.Button", // Unique name for the extension
    async setup(appInstance) {
        // Find the menu bar element where buttons like "Queue Prompt" reside
        // The exact selector might change in future ComfyUI versions.
        // Use browser developer tools (F12) to inspect the element if needed.
        const menuBar = document.querySelector("#comfy-menu-btns"); // A common place

        if (!menuBar) {
            console.error("My Button Extension: Could not find menu bar element (#comfy-menu-btns). Button not added.");
            return;
        }

        // Create the button element
        const myButton = document.createElement("button");
        myButton.id = "cloud-extension-button";
        myButton.textContent = "Deploy To Cloud"; // Text displayed on the button
        myButton.style.backgroundColor = "dodgerblue"; // Example styling
        myButton.style.color = "white";
        myButton.style.margin = "0 6px"; // Add some spacing
        myButton.style.border = "none";
        myButton.style.padding = "4px 8px";
        myButton.style.borderRadius = "4px";
        myButton.style.cursor = "pointer";


        // Add event listener to the button
        myButton.addEventListener("click", () => {
            console.log("My Custom Button clicked (frontend)");
            triggerBackendAction(); // Call the function to interact with the backend
        });

        // Prepend the button to the menu bar (or append, depending on preference)
        // menuBar.appendChild(myButton); // Adds to the end
        menuBar.prepend(myButton); // Adds to the beginning (before Queue Prompt)

        console.log("### My Button Extension: Button added to UI.");
    }
});
