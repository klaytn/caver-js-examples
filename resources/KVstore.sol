pragma solidity ^0.5.6;

contract KVstore {
    mapping(string=>string) store;
    constructor (string memory key, string memory value) public {
        store[key] = value;
    }
    function get(string memory key) public view returns (string memory) {
        return store[key];
    }
    function set(string memory key, string memory value) public {
        store[key] = value;
    }
}
