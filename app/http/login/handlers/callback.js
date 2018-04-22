exports = module.exports = function(parse) {
  var uport = require('uport')
  
  
  function processx(req, res, next) {
    console.log(req.headers)
    console.log(req.body)
    
    const signer = uport.SimpleSigner(process.env.UPORT_SIGNING_KEY)
    const credentials = new uport.Credentials({
      appName: 'Hanson HQ',
      address: '2odZ3QeMLfpTN84ddFUpeeefjAnVMVAMFri',
      signer: signer,
      //networks: networks
    })
    
    
    credentials.receive(req.body.access_token).then( function(creds) {
      console.log('GOT CREDS!');
        console.log(creds)
      
        /*
        if (creds.address == creds.verified[0].sub && 
           creds.verified[0].iss == '2od4Re9CL92phRUoAhv1LFcFkx2B9UAin92' &&
           creds.verified[0].claim['My Title']['KeyOne'] === 'ValueOne' &&
           creds.verified[0].claim['My Title']['KeyTwo'] === 'Value2' &&
           creds.verified[0].claim['My Title']['Last Key'] === 'Last Value')
        {
          console.log('Credential verified.');
        } else {
          console.log('Verification failed.');
        }
        */
      })
    
  }
  
  
  return [
    parse('application/json'),
    processx
  ]
};

exports['@require'] = [
  'http://i.bixbyjs.org/http/middleware/parse',
];
