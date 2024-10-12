chrome.webNavigation.onCompleted.addListener((details) => {
  const { tabId, url } = details;
  //array for adding websites, also remember to add them under host_permissions in manifest.json
  const targetWebsites = [
    "*://anydesk.com/*",
    "*://www.teamviewer.com/*",
    "*://www.logmein.com/*",
  ];
  if (targetWebsites.some((pattern) => matchPattern(url, pattern))) {
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      files: ["contentScript.js"],
    });
  }
});
chrome.tabs.onRemoved.addListener((tabId) => {
  sessionStorage.removeItem(String(tabId));
});
function matchPattern(url, pattern) {
  const regex = new RegExp(`^${pattern.replace(/\*/g, ".*")}$`);
  return regex.test(url);
}
