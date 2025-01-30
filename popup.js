document.addEventListener("DOMContentLoaded", function () {
    // Retrieve the stored token data
    chrome.storage.local.get("tokenData", function (result) {
      const payloadDiv = document.getElementById("payload");
      const encryptedPassDiv = document.getElementById("encryptedPass");
      const copyButton = document.getElementById("copyButton");
  
      // Check if tokenData is available
      if (result.tokenData) {
        // Display the entire token data
        payloadDiv.textContent = JSON.stringify(result.tokenData, null, 2);
  
        // Look for the encrypted password field in the tokenData
        // (change this if the encrypted password field has a different name)
        const encryptedPassword = result.tokenData.password;
  
        if (encryptedPassword) {
          // Display the encrypted password
          encryptedPassDiv.textContent = encryptedPassword;
  
          // Show the Copy button
          copyButton.style.display = 'block';
        } else {
          encryptedPassDiv.textContent = "No encrypted password found.";
          copyButton.style.display = 'none'; // Hide Copy button if no encrypted password is found
        }
      } else {
        payloadDiv.textContent = "No payload data captured yet.";
        encryptedPassDiv.textContent = "No encrypted password available.";
        copyButton.style.display = 'none'; // Hide Copy button if no data is available
      }
    });
  
    // Handle the "Copy to Clipboard" functionality
    document.getElementById("copyButton").addEventListener("click", function () {
      const encryptedPassDiv = document.getElementById("encryptedPass");
      const encryptedPass = encryptedPassDiv.textContent;
  
      // Ensure there's an encrypted password to copy
      if (encryptedPass && encryptedPass !== "No encrypted password available." && encryptedPass !== "No encrypted password found.") {
        navigator.clipboard.writeText(encryptedPass).then(function () {
          // Notify the user that the password was copied
          alert("Encrypted password copied to clipboard!");
        }).catch(function (err) {
          console.error("Error copying text: ", err);
        });
      }
    });
  
    // Handle clearing of stored data
    document.getElementById("clearBtn").addEventListener("click", function () {
      chrome.storage.local.remove("tokenData", function () {
        // Clear the UI after clearing storage
        document.getElementById("payload").textContent = "No payload data captured yet.";
        document.getElementById("encryptedPass").textContent = "No encrypted password available.";
        document.getElementById("copyButton").style.display = 'none'; // Hide Copy button
      });
    });
  });
  