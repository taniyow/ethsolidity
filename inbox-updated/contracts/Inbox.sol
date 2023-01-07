// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

// contract code will go below here

contract Inbox {
    string public message;

    constructor(string memory initialMessage) {
        message = initialMessage;
    }

    function setMessage(string memory newMessage) public {
        message = newMessage;
    }
}