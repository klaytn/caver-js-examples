const path = require('path')
const dotenv = require('dotenv')
const Caver = require('caver-js')
const ROOT_DIR = path.join(__dirname, '../..'); // Path can be changed based on its actual location.

// You can directly input values for the variables below, or you can enter values in the caver-js-examples/.env file.
let nodeApiUrl = ""; // e.g. "https://node-api.klaytnapi.com/v1/klaytn";
let accessKeyId = ""; // e.g. "KASK1LVNO498YT6KJQFUPY8S";
let secretAccessKey = ""; // e.g. "aP/reVYHXqjw3EtQrMuJP4A3/hOb69TjnBT3ePKG";
let chainId = ""; // e.g. "1001" or "8217";
let deployerAddress = ""; // e.g. "0xeb709d59954f4cdc6b6f3bfcd8d531887b7bd199"
let deployerPrivateKey = ""; // e.g. "0x39a6375b608c2572fadb2ed9fd78c5c456ca3aa860c43192ad910c3269727fc1"

/**
 * BoilerPlate code about "How to execute Smart Contract."
 */
async function main() {
    try {
        loadEnv()
        run()
    } catch (err) {
        console.error(err)
    }
}

main()

function loadEnv() {
    result = dotenv.config({path: `${ROOT_DIR}/.env`})
    if (result.error) {
        throw result.error
    }

    nodeApiUrl = nodeApiUrl === "" ? result.parsed.NODE_API_URL : nodeApiUrl
    accessKeyId = accessKeyId === "" ? result.parsed.ACCESS_KEY_ID : accessKeyId
    secretAccessKey = secretAccessKey === "" ? result.parsed.SECRET_ACCESS_KEY : secretAccessKey
    chainId = chainId === "" ? result.parsed.CHAIN_ID : chainId
    deployerAddress = deployerAddress === "" ? result.parsed.DEPLOYER_ADDRESS : deployerAddress
    deployerPrivateKey = deployerPrivateKey === "" ? result.parsed.DEPLOYER_PRIVATE_KEY : deployerPrivateKey
}

async function run() {
    const option = {
        headers: [
            {
                name: 'Authorization',
                value: 'Basic ' + Buffer.from(accessKeyId + ':' + secretAccessKey).toString('base64')
            },
            {name: 'x-chain-id', value: chainId},
        ]
    }
    const caver = new Caver(new Caver.providers.HttpProvider(nodeApiUrl, option))

    // abi is extracted by compiling caver-js-examples/resources/KVstore.sol using solc(solidity compiler)
    const abi = [
        {
            constant: true,
            inputs: [{name: 'key', type: 'string'}],
            name: 'get',
            outputs: [{name: '', type: 'string'}],
            payable: false,
            stateMutability: 'view',
            type: 'function',
        },
        {
            constant: false,
            inputs: [{name: 'key', type: 'string'}, {name: 'value', type: 'string'}],
            name: 'set',
            outputs: [],
            payable: false,
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [{name: 'key', type: 'string'}, {name: 'value', type: 'string'}],
            payable: false,
            stateMutability: 'nonpayable',
            type: 'constructor',
        },
    ]
    const contractAddress = '0x44464bb3d41fb35fff4b99819b4d8601a93f5a59'
    const deployer = caver.wallet.keyring.create(deployerAddress, deployerPrivateKey)
    caver.wallet.add(deployer)

    contract = caver.contract.create(abi, contractAddress)
    const receipt = await contract.send({
        from: deployer.address,
        gas: 1000000,
    }, 'set', 'k1', 'v1')
    console.log(receipt)

    const callResult = await contract.call('get', 'k1')
    console.log(`Result of calling get function with key: ${callResult}`)
}