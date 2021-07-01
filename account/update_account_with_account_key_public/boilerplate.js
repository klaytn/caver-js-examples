const dotenv = require('dotenv')
const Caver = require('caver-js')

let nodeApiUrl = ""; // e.g. "https://node-api.klaytnapi.com/v1/klaytn";
let accessKeyId = ""; // e.g. "KASK1LVNO498YT6KJQFUPY8S";
let secretAccessKey = ""; // e.g. "aP/reVYHXqjw3EtQrMuJP4A3/hOb69TjnBT3ePKG";
let chainId = ""; // e.g. "1001" or "8217";
let senderAddress = ""; // e.g. "0xeb709d59954f4cdc6b6f3bfcd8d531887b7bd199"
let senderPrivateKey = ""; // e.g. "0x39a6375b608c2572fadb2ed9fd78c5c456ca3aa860c43192ad910c3269727fc1"

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
    result = dotenv.config()
    if (result.error) {
        throw result.error
    }

    nodeApiUrl = nodeApiUrl == "" ? result.parsed.NODE_API_URL : nodeApiUrl
    accessKeyId = accessKeyId == "" ? result.parsed.ACCESS_KEY_ID : accessKeyId
    secretAccessKey = secretAccessKey == "" ? result.parsed.SECRET_ACCESS_KEY : secretAccessKey
    chainId = chainId == "" ? result.parsed.CHAIN_ID : chainId
    senderAddress = senderAddress == "" ? result.parsed.SENDER_ADDRESS : senderAddress
    senderPrivateKey = senderPrivateKey == "" ? result.parsed.SENDER_PRIVATE_KEY : senderPrivateKey
}

async function run () {
    const option = {
        headers: [
            { name: 'Authorization', value: 'Basic ' + Buffer.from(accessKeyId + ':' + secretAccessKey).toString('base64') },
            { name: 'x-chain-id', value: chainId },
        ]
    }
    // Add keyring to in-memory wallet
    const caver = new Caver(new Caver.providers.HttpProvider(nodeApiUrl, option))
    const keyring = caver.wallet.keyring.create(senderAddress, senderPrivateKey)
    caver.wallet.add(keyring)

    // Create new private key
    const newKey = caver.wallet.keyring.generateSingleKey()
    console.log(`new private key: ${newKey}`)

    // Create new Keyring instance with new private key
    const newKeyring = caver.wallet.keyring.create(keyring.address, newKey)
    // Create an Account instance that includes the address and the public key
    const account = newKeyring.toAccount()

    // Create account update transaction object
    const accountUpdate = caver.transaction.accountUpdate.create({
        from: keyring.address,
        account: account,
        gas: 50000,
    })

    // Sign the transaction
    await caver.wallet.sign(keyring.address, accountUpdate)

    const receipt = await caver.rpc.klay.sendRawTransaction(accountUpdate)
    console.log(`Account Update Transaction receipt => `)
    console.log(receipt)

    // Get accountKey from network
    const accountKey = await caver.rpc.klay.getAccountKey(keyring.address)
    console.log(`Result of account key update to AccountKeyPublic`)
    console.log(`Account address: ${keyring.address}`)
    console.log(`accountKey =>`)
    console.log(accountKey)

    // Update keyring with new private key in in-memory wallet
    caver.wallet.updateKeyring(newKeyring)

    const vt = caver.transaction.valueTransfer.create({
        from: keyring.address,
        to: keyring.address,
        value: 1,
        gas: 25000,
    })

    // Sign the transaction with updated keyring
    await caver.wallet.sign(keyring.address, vt)

    // Send transaction
    const vtReceipt = await caver.rpc.klay.sendRawTransaction(vt)
    console.log(`After account update value transfer transaction receipt => `)
    console.log(vtReceipt)
}