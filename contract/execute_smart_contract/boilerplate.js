const path = require('path')
const dotenv = require('dotenv')
const Caver = require('caver-js')
const ROOT_DIR = path.join(__dirname, '../..'); // Path can be changed based on its actual location.

// You can directly input values for the variables below, or you can enter values in the caver-js-examples/.env file.
let nodeApiUrl = '' // e.g. 'https://node-api.klaytnapi.com/v1/klaytn'
let accessKeyId = '' // e.g. 'KASK1LVNO498YT6KJQFUPY8S'
let secretAccessKey = '' // e.g. 'aP/reVYHXqjw3EtQrMuJP4A3/hOb69TjnBT3ePKG'
let chainId = '' // e.g. '1001' or '8217'
let deployerAddress = '' // e.g. '0xeb709d59954f4cdc6b6f3bfcd8d531887b7bd199'
let deployerPrivateKey = '' // e.g. '0x39a6375b608c2572fadb2ed9fd78c5c456ca3aa860c43192ad910c3269727fc1'

/**
 * Boilerplate code about "How to execute Smart Contract."
 * Related reference - Korean: https://ko.docs.klaytn.com/bapp/sdk/caver-js/getting-started#smart-contract
 * Related reference - English: https://docs.klaytn.com/bapp/sdk/caver-js/getting-started#smart-contract
 */
async function main() {
    try {
        loadEnv()
        await run()
    } catch (err) {
        console.error(err)
    }
}

main()

function loadEnv() {
    envs = dotenv.config({ path: `${ROOT_DIR}/.env` })
    if (envs.error) {
        throw envs.error
    }

    nodeApiUrl = nodeApiUrl === '' ? envs.parsed.NODE_API_URL : nodeApiUrl
    accessKeyId = accessKeyId === '' ? envs.parsed.ACCESS_KEY_ID : accessKeyId
    secretAccessKey = secretAccessKey === '' ? envs.parsed.SECRET_ACCESS_KEY : secretAccessKey
    chainId = chainId === '' ? envs.parsed.CHAIN_ID : chainId
    deployerAddress = deployerAddress === '' ? envs.parsed.DEPLOYER_ADDRESS : deployerAddress
    deployerPrivateKey = deployerPrivateKey === '' ? envs.parsed.DEPLOYER_PRIVATE_KEY : deployerPrivateKey
}

async function run() {
    const option = {
        headers: [
            {
                name: 'Authorization',
                value: 'Basic ' + Buffer.from(accessKeyId + ':' + secretAccessKey).toString('base64')
            },
            { name: 'x-chain-id', value: chainId },
        ]
    }
    const caver = new Caver(new Caver.providers.HttpProvider(nodeApiUrl, option))

    // abi is extracted by compiling caver-js-examples/resources/KVstore.sol using solc(solidity compiler)
    const abi = [
        {
            constant: true,
            inputs: [{ name: 'key', type: 'string' }],
            name: 'get',
            outputs: [{ name: '', type: 'string' }],
            payable: false,
            stateMutability: 'view',
            type: 'function',
        },
        {
            constant: false,
            inputs: [{ name: 'key', type: 'string' }, { name: 'value', type: 'string' }],
            name: 'set',
            outputs: [],
            payable: false,
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [{ name: 'key', type: 'string' }, { name: 'value', type: 'string' }],
            payable: false,
            stateMutability: 'nonpayable',
            type: 'constructor',
        },
    ]
    const contractAddress = '0xde81b1a37d52be59003b490c670a574ccf06a061'
    const deployerKeyring = caver.wallet.keyring.create(deployerAddress, deployerPrivateKey)
    caver.wallet.add(deployerKeyring)

    contract = caver.contract.create(abi, contractAddress)
    const receipt = await contract.send({
        from: deployerKeyring.address,
        gas: 1000000,
    }, 'set', 'k1', 'v1')
    console.log(receipt)

    const callResult = await contract.call('get', 'k1')
    console.log(`Result of calling get function with key: ${callResult}`)
}
