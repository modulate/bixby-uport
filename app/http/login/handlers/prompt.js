exports = module.exports = function(csrfProtection, ceremony) {
  
  return ceremony('login/did/uport',
    csrfProtection()
  );
};

exports['@require'] = [
  'http://i.bixbyjs.org/http/middleware/csrfProtection',
  'http://i.bixbyjs.org/http/middleware/ceremony'
];
