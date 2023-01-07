// compile code will go here
const path = require('path');
const fs = require('fs');

const solc = require('solc');

// path to look the sol file
const  inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');

// read the sol file
const source = fs.readFileSync(inboxPath, 'utf8');

const input = {
    language: 'Solidity',
    sources: {
        'Inbox.sol': {
            content: source,
        },
    },
    settings: {
        outputSelection: {
            '*': {
                '*': ['*'],
            },
        },
    },
};

console.log(JSON.parse(solc.compile(JSON.stringify(input))).contracts);

module.exports = 
JSON.parse(solc.compile(JSON.stringify(input))).contracts[
    'Inbox.sol'
].Inbox;