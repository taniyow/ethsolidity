// compile code will go here
const path = require('path');
const fs = require('fs');

const solc = require('solc');

// path to look the sol file
const  inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');

// read the sol file
const source = fs.readFileSync(inboxPath, 'utf8');

console.log(solc.compile(source, 1));
module.exports = solc.compile(source, 1).contracts[':Inbox'];