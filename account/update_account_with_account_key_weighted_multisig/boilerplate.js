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
let recipientAddress= ""; // e.g. "0xeb709d59954f4cdc6b6f3bfcd8d531887b7bd199"

/**
 * BoilerPlate code about "How to Update Klaytn Account Keys with Caver #2 — AccountKeyWeightedMultiSig"
 * Related article - Korean: https://medium.com/klaytn/caver-caver%EB%A1%9C-klaytn-%EA%B3%84%EC%A0%95%EC%9D%98-%ED%82%A4%EB%A5%BC-%EB%B0%94%EA%BE%B8%EB%8A%94-%EB%B0%A9%EB%B2%95-2-accountkeyweightedmultisig-c317a785299
 * Related article - English: https://medium.com/klaytn/caver-how-to-update-klaytn-account-keys-with-caver-2-accountkeyweightedmultisig-ed897b4e5b5b
 */
async function main () {
    try {
        loadEnv()
        run()
    } catch (err) {
        console.error(err)
    }
}
main()

function loadEnv() {
    result = dotenv.config({ path: `${ROOT_DIR}/.env` })
    if (result.error) {
        throw result.error
    }

    nodeApiUrl = nodeApiUrl === "" ? result.parsed.NODE_API_URL : nodeApiUrl
    accessKeyId = accessKeyId === "" ? result.parsed.ACCESS_KEY_ID : accessKeyId
    secretAccessKey = secretAccessKey === "" ? result.parsed.SECRET_ACCESS_KEY : secretAccessKey
    chainId = chainId === "" ? result.parsed.CHAIN_ID : chainId
    senderAddress = senderAddress === "" ? result.parsed.SENDER_ADDRESS : senderAddress
    senderPrivateKey = senderPrivateKey === "" ? result.parsed.SENDER_PRIVATE_KEY : senderPrivateKey
    recipientAddress = recipientAddress === "" ? result.parsed.RECIPIENT_ADDRESS : recipientAddress;
}

async function run () {
    console.log(`=====> Update AccountKey to AccountKeyWeightedMultiSig`)
    const option = {
        headers: [
            { name: 'Authorization', value: 'Basic ' + Buffer.from(accessKeyId + ':' + secretAccessKey).toString('base64') },
            { name: 'x-chain-id', value: chainId },
        ]
    }
    const caver = new Caver(new Caver.providers.HttpProvider(nodeApiUrl, option))

    // Add keyring to in-memory wallet
    const keyring = caver.wallet.keyring.create(senderAddress, senderPrivateKey)
    caver.wallet.add(keyring)

    // Create new private keys
    const newKeys = caver.wallet.keyring.generateMultipleKeys(3)
    console.log(`new private keys: ${JSON.stringify(newKeys)}`)

    // Create new Keyring instance with new private keys
    const newKeyring = caver.wallet.keyring.create(keyring.address, newKeys)
    // Create an Account instance that includes the address and the weighted multisig key
    const account = newKeyring.toAccount({ threshold: 3, weights: [2, 1, 1] })
    console.log(account)

    // Create account update transaction object
    const accountUpdate = caver.transaction.accountUpdate.create({
        from: keyring.address,
        account: account,
        gas: 100000,
    })

    // Sign the transaction
    await caver.wallet.sign(keyring.address, accountUpdate)
    // Send transaction
    const receipt = await caver.rpc.klay.sendRawTransaction(accountUpdate)
    console.log(`Account Update Transaction receipt => `)
    console.log(receipt)

    // Get accountKey from network
    const accountKey = await caver.rpc.klay.getAccountKey(keyring.address)
    console.log(`Result of account key update to AccountKeyWeightedMultiSig`)
    console.log(`Account address: ${keyring.address}`)
    console.log(`accountKey =>`)
    console.log(accountKey)

    // Update keyring with new private key in in-memory wallet
    caver.wallet.updateKeyring(newKeyring)
    // Send 1 Peb to recipient to test whether updated accountKey is well-working or not.
    const vt = caver.transaction.valueTransfer.create({
        from: keyring.address,
        to: recipientAddress,
        value: 1,
        gas: 100000,
    })

    // Sign the transaction with updated keyring
    // This sign function will sign the transaction with all private keys in the keyring
    await caver.wallet.sign(keyring.address, vt)
    // Send transaction
    const vtReceipt = await caver.rpc.klay.sendRawTransaction(vt)
    console.log(`Receipt of value transfer transaction after account update => `)
    console.log(vtReceipt)
}