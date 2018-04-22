exports = module.exports = function(promptHandler, authenticateHandler) {
  var express = require('express');
  var router = new express.Router();
  
  router.get('/', promptHandler);
  router.post('/', authenticateHandler);
  
  return router;
};

exports['@implements'] = [
  'http://i.bixbyjs.org/http/Service',
  'http://schemas.modulate.io/js/http/login/did/UPortService'
];
exports['@path'] = '/login/otp';
exports['@require'] = [
  './handlers/prompt',
  './handlers/authenticate'
];
