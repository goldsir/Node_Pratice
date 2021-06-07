let enCode = Buffer.from('test-casino.key:test-apiToken').toString('base64');
console.log(enCode);  // dGVzdC1jYXNpbm8ua2V5OnRlc3QtYXBpVG9rZW4=

let deCode = Buffer.from(enCode, 'base64').toString('utf-8');
console.log(deCode);