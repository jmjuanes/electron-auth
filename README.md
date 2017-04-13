# electron-auth

[![npm](https://img.shields.io/npm/v/electron-auth.svg?style=flat-square)](https://www.npmjs.com/package/electron-auth)
[![npm](https://img.shields.io/npm/dt/electron-auth.svg?style=flat-square)](https://www.npmjs.com/package/electron-auth)
[![npm](https://img.shields.io/npm/l/electron-auth.svg?style=flat-square)](https://github.com/jmjuanes/electron-auth)

> A dead simple electron library to handle the OAuth authentication for some providers

## Installation 

```
npm install --save electron-auth
```

## Usage 

```javascript
//Import dependencies
var app = require('electron').app;
var auth = require('electron-auth');


//Initialize the application
app.on('ready', function()
{
  //Initialize the github auth options
  var opt = { client_id: 'YOUR_CLIENT_ID', client_secret: 'YOUR_CLIENT_SECRET' };

  //Handle the github authentication
  return auth(auth.providers.github, opt, function(error, token)
  {
    //Do your magic with the token 
    //....
  });
});
```

## Providers 

### GitHub

Read more about the GitHub Authentication: https://developer.github.com/v3/oauth/ 

## Related 

- [electron-ejs](https://github.com/jmjuanes/electron-ejs): Simple Electron plugin for rendering EJS templates.

## License

[MIT LICENSE](./LICENSE) &copy; Josemi Juanes.
