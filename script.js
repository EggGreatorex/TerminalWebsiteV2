//--------------------------------------------------------------------------------------
// CONST DECLARATIONS
const banner = `--------------------------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------------

 |__   __|                (_)           | |
    | | ___ _ __ _ __ ___  _ _ __   __ _| |
    | |/ _ \ '__| '_   _ \| | '_ \ / _  | |
    | |  __/ |  | | | | | | | | | | (_| | |
    |_|\___|_|  |_| |_| |_|_|_| |_|\__,_|_|

--------------------------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------------
                                           `;

const helpMessge = ` projects                              links to other projects

 themes                               view list of themes

 theme set <theme>          set a theme

 mode dark|light                 set the background to light or dark mode

 clear                                    clear the terminal

 banner                                output the banner
 `;

 const linksMessage = `
      password lock                                        https://github.com/EggGreatorex/passwordLock
      message encrypter                                https://github.com/EggGreatorex/MessageEncypter
      notes  #work in progress                      https://github.com/EggGreatorex/Notes
      `;

const themesMessage = `

      midnight

      christmas

      neon

      monochrome
      `;


//--------------------------------------------------------------------------------------

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function outputBanner() {
  const bannerElement = document.querySelector(".banner");
  const bannerLines = banner.split("\n");

  for (const line of bannerLines) {
    bannerElement.textContent += line + "\n";
    await sleep(70);
  }
  await sleep(70);
  showWelcomeMessage();
}

async function showWelcomeMessage() {
  const welcomeMessage =
    'Welcome to the terminal website. Type "help" to see a list of avaliable commands.';

  const copyrightMessage = "(c) Ethan Greatorex. Version 0.1";

  copyrightDiv.textContent = copyrightMessage;
  await sleep(70);
  welcomeDiv.textContent = welcomeMessage;
}

outputBanner();

// Terminal divs
const inputElement = document.getElementById("user-input");
const outputContainer = document.getElementById("output-container");
const welcomeDiv = document.getElementById("welcome");
const copyrightDiv = document.getElementById("copyright");
const bannerElement = document.querySelector(".banner");

inputElement.addEventListener("keydown", async function (event) {
  if (event.key === "Enter") {
    await handleCommand(inputElement.value);
    inputElement.value = "";
  }
});

async function handleCommand(command) {
  let outputCommand = document.createElement("div");
  let output = document.createElement("div");
  outputCommand.textContent = `--${command}`;
  outputContainer.appendChild(outputCommand);

  // Check if the command is "help"
  if (command.toLowerCase() === "help") {
    // Split the help message into lines
    const helpMessageLines = helpMessge.split("\n");

    // Iterate through each line and create a new div for each
    for (const line of helpMessageLines) {
      const lineDiv = document.createElement("div");
      lineDiv.textContent = line;
      outputContainer.appendChild(lineDiv);
      await sleep(70); // Adjust the delay as needed
    }
  } else {
    // Process the command and display its output
    output.textContent = `${await processCommand(command)}`;
    if (output.textContent !== "") {
      outputContainer.appendChild(output);
    }
  }
}

async function processCommand(command) {
  const bodyElement = document.body;
  switch (command.toLowerCase()) {
    case "clear":
      for (let i = outputContainer.children.length - 1; i >= 0; i--) {
        const childElement = outputContainer.children[i];
        outputContainer.removeChild(childElement);
        await sleep(70);
      }
      bannerElement.innerHTML = "";
      outputContainer.innerHTML = "";
      copyrightDiv.innerHTML = "";
      welcomeDiv.innerHTML = "";
      return "";
    case "banner":
      outputContainer.innerHTML = "";
      copyrightDiv.innerHTML = "";
      welcomeDiv.innerHTML = "";
      outputBanner();
      return "";

    case "projects":

      const linksMessageLines = linksMessage.split("\n");

      for (const line of linksMessageLines) {
        const linkDiv = document.createElement("div");
        linkDiv.textContent = line;
        outputContainer.appendChild(linkDiv);
        await sleep(70);
      }

      return "";

    case "themes":

      themeMessageLines = themesMessage.split("\n");
      for (const line of themeMessageLines) {
        const themeMessageDiv = document.createElement("div");
        themeMessageDiv.textContent = line;
        outputContainer.appendChild(themeMessageDiv);
        await sleep(70);
      }

      return "";

    case "theme set midnight":
      applyThemeStyles("blue", "#1f3682");
      return "Theme set to midnight";

    case "theme set christmas":
      applyThemeStyles("red", "#23b10a");
      return "Theme set to Christmas";

    case "theme set neon":
      applyThemeStyles("cyan", "#8c00ff");
      return "Theme set to neon";

    case "theme set monochrome":
      applyThemeStyles("white", "#000000");
      return "Theme set to monochrome";

    default:
      return 'Command not found. Type "help" for assistance.';

    case "mode light":
      bodyElement.style.backgroundColor = "rgb(232, 232, 232)";
      return "Light mode activated --> only strange people use light mode :>";

    case "mode dark":
      bodyElement.style.backgroundColor = "rgb(28, 28, 28)";
      return "Dark mode activated";
  }
}

function applyThemeStyles(textColor, shadowColor) {
  // Add Neon theme styles
  bannerStyle = document.querySelector(".banner");
  bannerStyle.style.color = textColor;

  inputStyle = document.getElementById("user-input");
  inputStyle.style.color = textColor;
  spanStyle = document.querySelector(".inputSpan");
  spanStyle.style.color = textColor;

  glowElements = document.getElementsByClassName("glowText");
  for (var i = 0; i < glowElements.length; i++) {
    glowElements[i].style.color = textColor;
    glowElements[
      i
    ].style.textShadow = `0 0 10px ${shadowColor}, 0 0 20px ${shadowColor}, 0 0 30px ${shadowColor}`;
  }
}
