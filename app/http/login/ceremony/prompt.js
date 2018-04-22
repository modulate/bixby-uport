exports = module.exports = function() {
  var uport = require('uport')
    , path = require('path')
    , ejs = require('ejs');
  
  function uportStuff(req, res, next) {
    const signer = uport.SimpleSigner(process.env.UPORT_SIGNING_KEY)
    const credentials = new uport.Credentials({
      appName: 'Hanson HQ',
      address: '2odZ3QeMLfpTN84ddFUpeeefjAnVMVAMFri',
      signer: signer,
      //networks: networks
    })
    
    
    // http://192.168.0.82:8080/login/did/uport
    // https://github.com/uport-project/uport-js/blob/develop/tutorial/requestcredential.js
    
    
    credentials.createRequest({
      verified: ['My Title'],
      callbackUrl: 'http://192.168.0.82:8080/login/did/uport/callback',
      exp: Math.floor(new Date().getTime()/1000) + 300
    }).then(function(requestToken) {
      // send requestToken to browser
      console.log('GOT REQ TOKEN');
      console.log(requestToken)
      
      res.locals.requestToken = requestToken;
      
      var uri = 'me.uport:me?requestToken=' + requestToken + '%26callback_type=post'
      var qrurl = 'http://chart.apis.google.com/chart?cht=qr&chs=400x400&chl=' + uri
      var mobileUrl = 'https://id.uport.me/me?requestToken=' + requestToken + '&callback_type=post'
      
      res.locals.qrURL = qrurl;
      
      console.log(uri)
      //res.send('<div><img src=' + qrurl + '></img></div><div><a href=' + mobileUrl + '>Click here if on mobile</a></div>');
      
      next();
    })
    
    
    /*
    const connect = new uport.Connect('Hanson HQ', {
      clientId: 'CLIENT_ID',
      signer: uport.SimpleSigner('SIGNING KEY')
    })
    
    connect.requestCredentials()
      .then(function(userProfile) {
           // Do something after they have disclosed credentials
        console.log('GOT USER PROFILE?');
        console.log(userProfile);
      })
    */
  }
  
  function prompt(req, res, next) {
    res.locals.csrfToken = req.csrfToken();
    
    res.render('login/did/uport', function(err, str) {
      if (err && err.view) {
        var view = path.resolve(__dirname, '../views/prompt.ejs');
        ejs.renderFile(view, res.locals, function(err, str) {
          if (err) { return next(err); }
          res.send(str);
        });
        return;
      } else if (err) {
        return next(err);
      }
      res.send(str);
    });
  }
  
  
  return [
    uportStuff,
    prompt
  ];
};

exports['@require'] = [];
