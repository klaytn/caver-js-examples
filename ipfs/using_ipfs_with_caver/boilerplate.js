const path = require('path')
const dotenv = require('dotenv')
const Caver = require('caver-js')

const ROOT_DIR = path.join(__dirname, '../..') // Path can be changed based on its actual location.

// You can directly input values for the variables below, or you can enter values in the caver-js-examples/.env file.
let nodeApiUrl = '' // e.g. 'https://node-api.klaytnapi.com/v1/klaytn'
let accessKeyId = '' // e.g. 'KASK1LVNO498YT6KJQFUPY8S'
let secretAccessKey = '' // e.g. 'aP/reVYHXqjw3EtQrMuJP4A3/hOb69TjnBT3ePKG'
let chainId = '' // e.g. '1001' or '8217'
let senderAddress = '' // e.g. '0xeb709d59954f4cdc6b6f3bfcd8d531887b7bd199'
let senderPrivateKey = '' // e.g. '0x39a6375b608c2572fadb2ed9fd78c5c456ca3aa860c43192ad910c3269727fc1'
let recipientAddress = '' // e.g. '0xeb709d59954f4cdc6b6f3bfcd8d531887b7bd199'

/**
 * Boilerplate code about "Using IPFS with Caver."
 * Related article - Korean: https://medium.com/klaytn/caver%EB%A5%BC-%EC%9D%B4%EC%9A%A9%ED%95%9C-ipfs-%EC%82%AC%EC%9A%A9%EB%B2%95-4889a3b29c0b
 * Related article - English: https://medium.com/klaytn/using-ipfs-with-caver-964e1f721bfe
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
    senderAddress = senderAddress === '' ? envs.parsed.SENDER_ADDRESS : senderAddress
    senderPrivateKey = senderPrivateKey === '' ? envs.parsed.SENDER_PRIVATE_KEY : senderPrivateKey
    recipientAddress = recipientAddress === '' ? envs.parsed.RECIPIENT_ADDRESS : recipientAddress
}

async function run() {
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

    // Set connection with IPFS Node
    caver.ipfs.setIPFSNode('ipfs.infura.io', 5001, true)
    // `ipfs.txt` is located at `caver-js-examples/ipfs/using_ipfs_with_caver/resources`.
    const testFile = `${__dirname}/resources/ipfs.txt`

    // Add a file to IPFS with file path
    const cid = await caver.ipfs.add(testFile)
    console.log(`cid: ${cid}`)

    // // Add a file to IPFS with file contents
    // const contents = Buffer.from('test data')
    // const cid = await caver.ipfs.add(contents)

    // Download a file from IPFS
    const buffer = await caver.ipfs.get(cid)
    console.log(`Contents downloaded from IPFS: ${buffer.toString('utf8')}`)

    // Convert from CID to multihash(hex formatted)
    const multihash = await caver.ipfs.toHex(cid)
    console.log(`multihash: ${multihash}`)

    // Add keyring to in-memory wallet
    const senderKeyring = caver.wallet.keyring.create(senderAddress, senderPrivateKey)
    caver.wallet.add(senderKeyring)

    // Create ValueTransferMemo transaction
    const tx = caver.transaction.valueTransferMemo.create({
        from: senderKeyring.address,
        to: recipientAddress,
        value: 1,
        input: multihash,
        gas: 30000,
    })

    // Sign to the transaction
    await caver.wallet.sign(senderKeyring.address, tx)

    // Send a signed transaction to Klaytn
    const receipt = await caver.rpc.klay.sendRawTransaction(tx)
    console.log(receipt)
}
