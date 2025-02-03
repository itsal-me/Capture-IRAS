document.addEventListener("DOMContentLoaded", function () {
  const payloadDiv = document.getElementById("payload");
  const encryptedPassDiv = document.getElementById("encryptedPass");
  const copyButton = document.getElementById("copyButton");
  const clearButton = document.getElementById("clearBtn");

  function updateUI(tokenData) {
      if (tokenData) {
          payloadDiv.textContent = JSON.stringify(tokenData, null, 2);
          const encryptedPassword = tokenData.password; // Adjust field name if needed

          if (encryptedPassword) {
              encryptedPassDiv.textContent = encryptedPassword;
              copyButton.style.display = "block";
          } else {
              encryptedPassDiv.textContent = "No encrypted password found.";
              copyButton.style.display = "none";
          }
      } else {
          payloadDiv.textContent = "No payload data captured yet.";
          encryptedPassDiv.textContent = "No encrypted password available.";
          copyButton.style.display = "none";
      }
  }

  // Retrieve and update UI with stored token data
  chrome.storage.local.get("tokenData", (result) => updateUI(result.tokenData));

  // Copy encrypted password to clipboard
  copyButton.addEventListener("click", function () {
      const encryptedPass = encryptedPassDiv.textContent;
      if (encryptedPass && !encryptedPass.includes("No encrypted password")) {
          navigator.clipboard.writeText(encryptedPass)
              .then(() => alert("Encrypted password copied to clipboard!"))
              .catch((err) => console.error("Error copying text: ", err));
      }
  });

  // Clear stored data and reset UI
  clearButton.addEventListener("click", function () {
      chrome.storage.local.remove("tokenData", () => updateUI(null));
  });
});
