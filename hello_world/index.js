const path = require('path')
const dotenv = require('dotenv')
const Caver = require('caver-js')

const ROOT_DIR = path.join(__dirname, '..') // Path can be changed based on its actual location.

// You can directly input values for the variables below, or you can enter values in the caver-js-examples/.env file.
let nodeApiUrl = 'https://node-api.klaytnapi.com/v1/klaytn' // e.g. 'https://node-api.klaytnapi.com/v1/klaytn'
let accessKeyId = '' // e.g. 'KASK1LVNO498YT6KJQFUPY8S'
let secretAccessKey = '' // e.g. 'aP/reVYHXqjw3EtQrMuJP4A3/hOb69TjnBT3ePKG'
let chainId = '1001' // e.g. '1001' or '8217'

/**
 * Hello world for caver-js Klaytn SDK! Please read the README before starting :)
 * Related article - Korean: https://ko.docs.klaytn.com/bapp/sdk/caver-js/getting-started
 * Related reference - English: https://docs.klaytn.com/bapp/sdk/caver-js/getting-started
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
}

async function run() {
    // In the caver, almost everything starts with the caver. Let's create a caver instance
    const option = {
        headers: [
            {
                name: 'Authorization',
                value: `Basic ${Buffer.from(`${accessKeyId}:${secretAccessKey}`).toString('base64')}`,
            },
            { name: 'x-chain-id', value: chainId },
        ],
    }
    const caver = new Caver(new Caver.providers.HttpProvider(nodeApiUrl, option))

    // Now that we have created the caver instance, we can do whatever we want with the caver.
    // Write your own code below using Caver instance :)
    const singleKeyring = caver.wallet.keyring.generate()
    console.log(singleKeyring)
}
