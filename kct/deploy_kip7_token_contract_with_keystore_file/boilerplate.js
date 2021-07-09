const fs = require('fs')
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
let recipientAddress = '' // e.g. '0xeb709d59954f4cdc6b6f3bfcd8d531887b7bd199'

/**
 * Boilerplate code about "How to deploy my own KIP7 token with keystore file."
 * Related article - Korean: https://medium.com/klaytn/common-architecture-of-caver-f7a7a1c554de
 * Related article - English: https://medium.com/klaytn/common-architecture-of-caver-a714224a0047
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

    // 1. Create your own keystore file at "https://baobab.wallet.klaytn.com/create".
    // 2. Rename that keystore file name with `keystore.json` or change the filename in line 60.
    // 3. Place that keystore file at `caver-js-examples/kct/deploy_kip7_token_contract_with_keystore_file/resources`.
    // 4. Get 5 KLAY at "https://baobab.wallet.klaytn.com/faucet".
    const keystore = fs.readFileSync(`${__dirname}/resources/keystore.json`, 'utf8')
    const password = '' // Put your password here.
    const deployerKeyring = caver.wallet.keyring.decrypt(keystore, password)
    caver.wallet.add(deployerKeyring)

    const initialSupply = new BigNumber('1000000000000000000')
    const params = { name: 'TestToken', symbol: 'TTK', decimals: 18, initialSupply }
    const kip7 = await caver.kct.kip7.deploy(params, deployerKeyring.address)
    console.log(`Deployed address of KIP7 token contract: ${kip7.options.address}`);

    const name = await kip7.name()
    console.log(`The name of the KIP-7 token contract: ${name}`)

    const opts = { from: deployerKeyring.address }
    const value = 1
    const receipt = await kip7.transfer(recipientAddress, value, opts)
    console.log(receipt)
}
