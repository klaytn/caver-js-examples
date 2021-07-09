const path = require('path')
const dotenv = require('dotenv')
const Caver = require('caver-js')
const BigNumber = require('bignumber.js')
const ROOT_DIR = path.join(__dirname, '../..') // Path can be changed based on its actual location.

// You can directly input values for the variables below, or you can enter values in the caver-js-examples/.env file.
let nodeApiUrl = '' // e.g. 'https://node-api.klaytnapi.com/v1/klaytn'
let accessKeyId = '' // e.g. 'KASK1LVNO498YT6KJQFUPY8S'
let secretAccessKey = '' // e.g. 'aP/reVYHXqjw3EtQrMuJP4A3/hOb69TjnBT3ePKG'
let chainId = '' // e.g. '1001' or '8217'
let deployerAddress = '' // e.g. '0xeb709d59954f4cdc6b6f3bfcd8d531887b7bd199'
let deployerPrivateKey = '' // e.g. '0x39a6375b608c2572fadb2ed9fd78c5c456ca3aa860c43192ad910c3269727fc1'
let recipientAddress = '' // e.g. '0xeb709d59954f4cdc6b6f3bfcd8d531887b7bd199'

/**
 * Boilerplate code about "How to deploy my own KIP7 token."
 * Related reference - Korean: https://ko.docs.klaytn.com/bapp/sdk/caver-js/api-references/caver.kct/kip7
 * Related reference - English: https://docs.klaytn.com/bapp/sdk/caver-js/api-references/caver.kct/kip7
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
    recipientAddress = recipientAddress === '' ? envs.parsed.RECIPIENT_ADDRESS : recipientAddress
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


    const deployerKeyring = caver.wallet.keyring.create(deployerAddress, deployerPrivateKey)
    caver.wallet.add(deployerKeyring)

    const initialSupply = new BigNumber('1000000000000000000')
    const params = {name: 'TestToken', symbol: 'TTK', decimals: 18, initialSupply}
    const kip7 = await caver.kct.kip7.deploy(params, deployerKeyring.address)
    console.log(`Deployed address of KIP7 token contract: ${kip7.options.address}`);

    const name = await kip7.name()
    console.log(`The name of the KIP-7 token contract: ${name}`)

    const opts = {from: deployerKeyring.address}
    const value = 1
    const receipt = await kip7.transfer(recipientAddress, value, opts)
    console.log(receipt)
}
