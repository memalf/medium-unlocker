function redirectMedium() {
  const newUrl = window.location.toString().replace("https://", "https://freedium.cfd/");
  if (newUrl !== window.location.toString()) {
    window.location = newUrl;
  }
}

function executeUnlocker(tabId, url) {
  if (url.includes("medium.com")) {
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      function: redirectMedium
    })
    .then(() => console.log("Medium redirection executed."))
    .catch(err => console.error("Error executing redirection:", err));
  } else {
    console.log("Not a Medium page. No action executed.");
  }
}

chrome.action.onClicked.addListener((tab) => {
  if (tab && tab.id && tab.url) {
    console.log("Extension icon clicked. Active tab URL:", tab.url);
    executeUnlocker(tab.id, tab.url);
  }
});

chrome.commands.onCommand.addListener((command) => {
  if (command === "activate-medium-unlocker") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      let tab = tabs[0];
      console.log("Keyboard shortcut activated. Active tab URL:", tab?.url);
      if (tab && tab.id && tab.url) {
        executeUnlocker(tab.id, tab.url);
      }
    });
  }
});
