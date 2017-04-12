//Import dependencies
var request = require('request');

//Initialize the github provider
var provider = {};

//Authorizarion url
provider._auth_url = 'https://github.com/login/oauth/authorize?';

//Token url
provider._token_url = 'https://github.com/login/oauth/access_token';

//Build the authentication url
provider.authorization_url = function(opt, cb)
{
  //Check the options
  if(typeof opt.client_id !== 'string'){ return cb(new Error('No client ID provided', null)); }

  //Check the client secret key
  if(typeof opt.client_secret !== 'string'){ return cb(new Error('No client secret provided'), null); }

  //Check the state value
  if(typeof opt.state !== 'string'){ opt.state = Math.random().toString().slice(2); }

  //Check the scopes
  if(typeof opt.scope === 'undefined'){ opt.scope = []; }

  //Check the scope
  if(typeof opt.scope === 'string'){ opt.scope = [ opt.scope ]; }

  //Check the allow signup value
  if(typeof opt.allow_signup !== 'boolean'){ opt.alow_signup = true; }

  //Initialize the authentication url
  var url = provider._auth_url + 'client_id=' + opt.client_id + '&' + 'state=' + opt.state;

  //Add the scope and the allow signup
  url = url + '&' + 'scope=' + opt.scope.join(' ') + '&' + 'allow_signup=' + opt.allow_signup.toString();

  //Do the callback
  return cb(null, url);
};

//Authorization done
provider.authorization_done = function(opt, url, window, cb)
{
  //Get the raw code
  var raw_code = /code=([^&]*)/.exec(url) || null;

  //Parse the raw code and get the real code
  var code = (raw_code && raw_code.length > 1) ? raw_code[1] : null;

  //Check for error
  var error = /\?error=(.+)$/.exec(url);

  // If there is a code, proceed to get token from github
  if(code)
  {
    //Destroy the window
    window.destroy();

    //Initialize the form object
    var form = { client_id: opt.client_id, client_secret : opt.client_secret, state: opt.state, code: code };

    //Get the token
    return request.post({ url: provider._token_url, form: form, json: true }, function(e, res, body)
    {
      //Check for error
      if(e){ return cb(e, null); }

      //Check the response status code
      if(res.statusCode !== 200){ return cb(new Error('Server responded with ' + res.StatusCode + ' code'), null); }

      //Do the callback with the status code
      return cb(null, body.access_token);
    });
  }
  else if(error)
  {
    //Get the error detail
    var error_detail = /\?error_description=(.+)$/.exec(url);

    //Do the callback with the error
    return cb(new Error(error_detail), null);
  }
};

//Exports to node
module.exports = provider;