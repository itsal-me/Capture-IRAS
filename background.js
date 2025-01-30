chrome.webRequest.onBeforeRequest.addListener(
    function (details) {
      console.log("Request Captured:", details);
  
      if (details.method === "POST") {
        console.log("🔹 POST Request Found:", details.url);
  
        let data = null;
        if (details.requestBody) {
          if (details.requestBody.raw) {
            let decoder = new TextDecoder("utf-8");
            data = decoder.decode(details.requestBody.raw[0].bytes);
            try {
              data = JSON.parse(data);
            } catch (e) {
              console.error("Failed to parse JSON:", e);
            }
          } else if (details.requestBody.formData) {
            data = details.requestBody.formData;
          }
        }
  
        if (data) {
          console.log("✅ Captured Payload:", data);
          chrome.storage.local.set({ tokenData: data });
        } else {
          console.warn("⚠️ No requestBody found.");
        }
      }
    },
    { urls: ["<all_urls>"] },
    ["requestBody"]
  );
  