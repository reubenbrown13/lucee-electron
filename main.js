
var app = require('app');  // Module to control application life.
var BrowserWindow = require('browser-window');  // Module to create native browser window.
const is = require("electron-is");

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  stopLucee();
  if (process.platform != 'darwin') {
    app.quit();
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function() {
  // Start Lucee
  startLucee();
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600+410});

  // Wait a few seconds so Lucee can load
  setTimeout(function() {
      mainWindow.loadUrl('http://localhost:8888/')
  }, 5000);

  // Open the DevTools.
  mainWindow.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    stopLucee();
    mainWindow = null;
  });
});

function startLucee() {
  const process = require('child_process');

  var cmd = (is.windows()) ? 'lucee/startup.bat' : './lucee/startup.sh';
      
  var child = process.spawn(cmd); 

  child.on('close', function (code) {

  });
};

function stopLucee() {
  const process = require('child_process');

  var cmd = (is.windows()) ? 'lucee/shutdown.bat' : './lucee/shutdown.sh';
      
  var child = process.spawn(cmd); 

  child.on('close', function (code) {

  });
};