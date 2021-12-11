/* eslint-disable @typescript-eslint/no-var-requires */

// Native
const { format } = require("url");

// Packages
const { BrowserWindow, app } = require("electron");
const isDev = require("electron-is-dev");
const prepareNext = require("electron-next");
const { resolve } = require("app-root-path");

// Prepare the renderer once the app is ready
app.on("ready", async () => {
  await prepareNext("./");

  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
  });

  const devPath = "http://localhost:3000";

  const prodPath = format({
    pathname: resolve("out/start/index.html"),
    protocol: "file:",
    slashes: true,
  });

  const url = isDev ? devPath : prodPath;
  mainWindow.loadURL(url);
});

// Quit the app once all windows are closed
app.on("window-all-closed", app.quit);
