//Import dependencies
var electron = require('electron');

//Import electron modules
var BrowserWindow = electron.BrowserWindow || electron.remote.BrowserWindow;

//Auth object
module.exports = function(provider, opt, cb)
{
  //Check the provider
  if(typeof provider !== 'object'){ return; }

  //Check the options
  if(typeof opt !== 'object'){ return; }

  //Check the callback method
  if(typeof cb !== 'function'){ return; }

  //Get the authentication url
  return provider.authorization_url(opt, function(error, auth_url)
  {
    //Check the error
    if(error){ return cb(error); }

    //Initialize the new browser window
    var window = new BrowserWindow({ width: 800, height: 600, webPreferences: { nodeIntegration: false } });

    //Load the url
    window.loadURL(auth_url);

    //Display the authentication window
    window.show();

    //Handle the callback
    var handle_callback = function(url)
    {
      //Parse the redirected url
      return provider.authorization_done(opt, url, window, function()
      {
        //Destroy the window
        window.destroy();

        //Get the arguments
        var args = [].slice.call(arguments);

        //Do the callback with the provided arguments
        return cb.apply(null, args);
      });
    };

    //Capture the navigate url
    window.webContents.on('will-navigate', function(event, navigate_url)
    {
      //Handle the callback
      return handle_callback(navigate_url);
    });

    //Capture the redirect request
    window.webContents.on('did-get-redirect-request', function(event, old_url, new_url)
    {
      //Handle the callback
      return handle_callback(new_url);
    });
  });
};

//Exports the providers
module.exports.providers = require('./providers/index.js');
