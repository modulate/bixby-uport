exports = module.exports = function(promptHandler, callbackHandler, authenticateHandler) {
  var express = require('express');
  var router = new express.Router();
  
  router.get('/', promptHandler);
  //router.post('/', authenticateHandler);
  router.post('/callback', callbackHandler)
  
  return router;
};

exports['@implements'] = [
  'http://i.bixbyjs.org/http/Service',
  'http://schemas.modulate.io/js/http/login/did/UPortService'
];
exports['@path'] = '/login/did/uport';
exports['@require'] = [
  './handlers/prompt',
  './handlers/callback'
  //'./handlers/authenticate'
];
