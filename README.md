# electron-auth

[![npm](https://img.shields.io/npm/v/electron-auth.svg?style=flat-square)](https://www.npmjs.com/package/electron-auth)
[![npm](https://img.shields.io/npm/dt/electron-auth.svg?style=flat-square)](https://www.npmjs.com/package/electron-auth)
[![npm](https://img.shields.io/npm/l/electron-auth.svg?style=flat-square)](https://github.com/jmjuanes/electron-auth)

> A dead simple electron library to handle the OAuth authentication for some providers

**NOTE**: More authorization providers and documentation are in progress. Interested in contribute? You are welcome :smile:

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

## API 

#### auth(provider, options, callback)

Perform the user authentication for the desired provider. This method accepts the following arguments: 

- `provider`: an object with the information about the provider. You can use the built-in providers or use a custom provider. 
- `options`: an object with the options. 
- `callback`: a function that will be executed when the authentication is done or when there is an error during the process of authentication.

## Providers 

All the supported providers are stored in `auth.providers.PROVIDER_NAME`. You can also use your own provider.

### GitHub

Read more about the GitHub Authentication: https://developer.github.com/v3/oauth/ 



## Related 

- [electron-ejs](https://github.com/jmjuanes/electron-ejs): Simple Electron plugin for rendering EJS templates.

## License

[MIT LICENSE](./LICENSE) &copy; Josemi Juanes.
