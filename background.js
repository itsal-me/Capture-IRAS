chrome.webRequest.onBeforeRequest.addListener(
  function (details) {
      if (details.method === "POST" && details.url.includes("https://iras.iub.edu.bd:8079//v3/account/token")) {
          let data = null;

          if (details.requestBody) {
              if (details.requestBody.raw) {
                  let decoder = new TextDecoder("utf-8");
                  data = decoder.decode(details.requestBody.raw[0].bytes);
                  try {
                      data = JSON.parse(data);
                  } catch (e) {
                      return; // Ignore invalid JSON
                  }
              } else if (details.requestBody.formData) {
                  data = details.requestBody.formData;
              }
          }

          if (data) {
              chrome.storage.local.set({ tokenData: data });
          }
      }
  },
  { urls: ["https://iras.iub.edu.bd:8079//v3/account/token"] },
  ["requestBody"]
);
