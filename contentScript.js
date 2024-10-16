const tabId = chrome.tabs?.TAB_ID_CURRENT || -1;
const shouldDisplayWarning = !sessionStorage.getItem(String(tabId));

if (shouldDisplayWarning) {
  //style injection
  const style = document.createElement("style");
  style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');
    @font-face {
      font-family: 'Material Icons';
      font-style: normal;
      font-weight: 400;
      src: url(https://fonts.gstatic.com/s/materialicons/v139/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2) format('woff2');
    }

    .material-icons {
      font-family: 'Material Icons';
      font-weight: normal;
      font-style: normal;
      font-size: 24px;
      line-height: 1;
      letter-spacing: normal;
      text-transform: none;
      display: inline-block;
      white-space: nowrap;
      word-wrap: normal;
      direction: ltr;
      -webkit-font-smoothing: antialiased;
    }

    #learn-more-button,
    #contact-support-button {
      padding: 10px 20px;
      background: linear-gradient(135deg, #3b82f6, #1d4ed8);
      color: white;
      font-size: 20px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-family: 'Poppins', sans-serif;
      font-weight: 600;
      transition: transform 0.3s ease;
      margin: 0 10px; /* Updated margin */
      text-decoration: none;
      display: inline-block;
    }

    #learn-more-button:hover,
    #contact-support-button:hover {
      transform: scale(1.05);
    }

    #warning-screen {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      z-index: 2147483647;
      font-family: 'Poppins', sans-serif;
      text-align: center;
      color: #ffffff;
    }

    #warning-title {
      font-size: 40px;
      font-weight: 600;
      color: #ffd700;
      margin-bottom: 20px;
      letter-spacing: 0.5px;
    }

    #warning-text {
      font-size: 20px;
      margin-bottom: 10px;
      max-width: 80%;
    }

    #info-text {
      font-size: 20px;
      margin-bottom: 30px;
      opacity: 0.9;
    }

    #navigate-button {
      padding: 10px 20px;
      background: transparent;
      color: white;
      font-size: 20px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-family: 'Poppins', sans-serif;
      font-weight: 600;
      transition: transform 0.3s ease;
    }

    #navigate-button:hover {
      transform: scale(1.05);
    }

    #report-link {
      margin-top: 20px;
      font-size: 18px;
      color: #ffd700;
      text-decoration: none;
      cursor: pointer;
      transition: color 0.3s ease;
      border-bottom: none;
      display: inline-block;
    }

    #report-link:hover {
      color: #ff8c00;
      text-decoration: underline;
    }

    #scam-protect-label {
      position: absolute;
      top: 20px;
      left: 20px;
      font-size: 24px;
      font-weight: 600;
      color: #ffffff;
      display: flex;
      align-items: center;
    }

    #scam-protect-label .material-icons {
      margin-right: 10px;
      font-size: 36px;
      background: linear-gradient(135deg, #ffd700, #ff8c00);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    #button-container {
      display: flex;
      justify-content: center;
      margin-bottom: 20px;
    }
  `;
  document.head.appendChild(style);

  //make warning screen
  const warningScreen = document.createElement("div");
  warningScreen.id = "warning-screen";
  warningScreen.innerHTML = `
    <p id="scam-protect-label"><span class="material-icons">security</span>Scam Protect</p>
    <p id="warning-title">WARNING!</p>
    <p id="warning-text">If someone on the phone has asked you to download this application, it may be a scam.</p>
    <p id="info-text">Legitimate companies will never ask you to download a remote desktop application</p>
    <div id="button-container">
      <a id="learn-more-button" href="http://localhost:3000/support" target="_blank">Contact Support</a>
      <a id="learn-more-button" href="http://localhost:3000/education" target="_blank">Learn More</a>
    </div>
    <button id="navigate-button">Continue Anyway</button>
    <a id="report-link" href="https://reportfraud.ftc.gov/#/assistant" target="_blank">Report Scam to the FTC</a>
  `;

  document.body.appendChild(warningScreen);

  //button event listner
  document.getElementById("navigate-button").addEventListener("click", () => {
    sessionStorage.setItem(String(tabId), "true");
    warningScreen.remove();
    style.remove();
  });

  document
    .getElementById("contact-support-button")
    .addEventListener("click", () => {
      console.log("Contact Support clicked");
    });
}
