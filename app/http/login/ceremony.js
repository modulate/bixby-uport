exports = module.exports = function(prompt) {
  
  return {
    prompt: prompt
  };
};

exports['@implements'] = 'http://i.bixbyjs.org/http/ceremony/Prompt';
exports['@name'] = 'login/did/uport';
exports['@require'] = [
  './ceremony/prompt'
];
