const path = require('path')
const dotenv = require('dotenv')
const Caver = require('caver-js')
const ROOT_DIR = path.join(__dirname, '../..'); // Path can be changed based on its actual location.
const BigNumber = require('bignumber.js')

// You can directly input values for the variables below, or you can enter values in the caver-js-examples/.env file.
let nodeApiUrl = ""; // e.g. "https://node-api.klaytnapi.com/v1/klaytn";
let accessKeyId = ""; // e.g. "KASK1LVNO498YT6KJQFUPY8S";
let secretAccessKey = ""; // e.g. "aP/reVYHXqjw3EtQrMuJP4A3/hOb69TjnBT3ePKG";
let chainId = ""; // e.g. "1001" or "8217";
let senderAddress = ""; // e.g. "0xeb709d59954f4cdc6b6f3bfcd8d531887b7bd199"
let senderPrivateKey = ""; // e.g. "0x39a6375b608c2572fadb2ed9fd78c5c456ca3aa860c43192ad910c3269727fc1"
let recipientAddress = ""; // e.g. "0xeb709d59954f4cdc6b6f3bfcd8d531887b7bd199"

/**
 * Boilerplate code about "How to use Klay Units."
 * Related reference - Korean: https://ko.docs.klaytn.com/klaytn/design/klaytn-native-coin-klay#units-of-klay
 * Related reference - English: https://docs.klaytn.com/klaytn/design/klaytn-native-coin-klay#units-of-klay
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
    recipientAddress = recipientAddress === "" ? result.parsed.RECIPIENT_ADDRESS : recipientAddress
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

    const senderKeyring = caver.wallet.keyring.create(senderAddress, senderPrivateKey)
    caver.wallet.add(senderKeyring)

    // Because a field "value" always interprets its value as a unit "peb",
    // you must take care what is the actual value when you sending some KLAY.
    const vt = caver.transaction.valueTransfer.create({
        from: senderKeyring.address,
        to: recipientAddress,
        gas: 25000,
        value: 1,
    })
    // Example-1: Sending 0.5 KLAY to recipient
    // 1 KLAY is actually 10^18(=1000000000000000000) peb. So if you want send 0.5 KLAY,
    // option-1: Set actual peb value directly to ValueTransfer transaction instance.
    const bigNumberKLAY = new BigNumber('500000000000000000')
    vt.value = bigNumberKLAY
    console.log(`Example-1) The value what we set using option-1 is ${vt.value}`)

    // option-2 (Recommended): option-1 is very cumbersome and difficult to read. Let's use more elegant way.
    const KLAY = caver.utils.convertToPeb(5, caver.utils.klayUnit.KLAY.unit)
    vt.value = KLAY / 10
    console.log(`Example-1) The value what we set using option-2 is ${vt.value}`)

    // Example-2: Sending 0.005 KLAY to recipient
    // option-1: Use bigNumberKLAY we created at option-2 of Example-1.
    vt.value = bigNumberKLAY / 100
    console.log(`Example-2) The value what we set using option-1 is ${vt.value}`)

    // option-2 (Recommended): option-1 has a high probability of being wrong by human error. Let's use more secure methomethodd.
    const mKLAY = caver.utils.convertToPeb(5, caver.utils.klayUnit.mKLAY.unit)
    vt.value = mKLAY
    console.log(`Example-2) The value what we set using option-2 is ${vt.value}`)
}