const path = require('path')
const dotenv = require('dotenv')
const Caver = require('caver-js')
const ROOT_DIR = path.join(__dirname, '../..'); // Path can be changed based on its actual location.

// You can directly input values for the variables below, or you can enter values in the caver-js-examples/.env file.
let nodeApiUrl = ""; // e.g. "https://node-api.klaytnapi.com/v1/klaytn";
let accessKeyId = ""; // e.g. "KASK1LVNO498YT6KJQFUPY8S";
let secretAccessKey = ""; // e.g. "aP/reVYHXqjw3EtQrMuJP4A3/hOb69TjnBT3ePKG";
let chainId = ""; // e.g. "1001" or "8217";
let senderAddress = ""; // e.g. "0xeb709d59954f4cdc6b6f3bfcd8d531887b7bd199"
let senderPrivateKey = ""; // e.g. "0x39a6375b608c2572fadb2ed9fd78c5c456ca3aa860c43192ad910c3269727fc1"

/**
 * BoilerPlate code about "How to get receipts included in a block."
 * Related reference - Korean: https://ko.docs.klaytn.com/bapp/json-rpc/api-references/klay/block#klay_getblockreceipts
 * Related reference - English: https://docs.klaytn.com/bapp/json-rpc/api-references/klay/block#klay_getblockreceipts
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
    senderAddress = senderAddress === "" ? result.parsed.SENDER_ADDRESS : senderAddress
    senderPrivateKey = senderPrivateKey === "" ? result.parsed.SENDER_PRIVATE_KEY : senderPrivateKey
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

    // If there are no transactions in the block being looked up, the returned data will be empty.
    const blockHashEmpty = '0x0f7f242e97dd0334c1c3d76b2f39846064b3766072fd4f2350c62d288477de21'
    let blockTransactionReceipts = await caver.rpc.klay.getBlockReceipts(blockHashEmpty)
    console.log(blockTransactionReceipts)

    const blockHash = '0x28fdc2fdce29513105fdaa605384a75ee15623ccb2271febc5b73554f17ab09d'
    blockTransactionReceipts = await caver.rpc.klay.getBlockReceipts(blockHash)
    console.log(blockTransactionReceipts)
}