const tabId = chrome.tabs?.TAB_ID_CURRENT || -1;
const shouldDisplayWarning = !sessionStorage.getItem(String(tabId));
if (shouldDisplayWarning) {
  const whiteScreen = document.createElement("div");
  whiteScreen.style = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    font-family: Arial, sans-serif;
    text-align: center;
  `;
  const warning = document.createElement("p");
  warning.textContent = "WARNING!";
  warning.style = `
    font-size: 40px;
    color: red;
  `;
  const warningText = document.createElement("p");
  warningText.textContent =
    "If someone on the phone has asked you to download this application, it could be a scam.";
  warningText.style = `
    font-size: 40px;
    margin-bottom: 20px;
  `;
  const infoText = document.createElement("p");
  infoText.textContent =
    "Big companies will never ask you to download a remote desktop application";
  infoText.style = `
    font-size: 20px;
    margin-bottom: 20px;
  `;
  const navigateButton = document.createElement("button");
  navigateButton.textContent = "Go Anyways";
  navigateButton.style = `
    padding: 10px 20px;
    background-color: blue;
    color: white;
    font-size: 25px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  `;
  const reportButton = document.createElement("a");
  reportButton.textContent = "Report Scam to the FTC";
  reportButton.href = "https://reportfraud.ftc.gov/#/assistant";
  reportButton.target = "_blank";
  reportButton.style = `
    margin-top: 10px;
    font-size: 18px;
    color: red; /* Updated color to red */
    text-decoration: underline;
    cursor: pointer;
  `;

  whiteScreen.appendChild(warning);
  whiteScreen.appendChild(warningText);
  whiteScreen.appendChild(infoText);
  whiteScreen.appendChild(navigateButton);
  whiteScreen.appendChild(reportButton);
  document.documentElement.innerHTML = "";
  document.documentElement.appendChild(whiteScreen);
  navigateButton.addEventListener("click", () => {
    sessionStorage.setItem(String(tabId), "true");
    window.location.href = location.href;
  });
}
