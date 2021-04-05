const CaverExtKAS = require('caver-js-ext-kas')

// Configuration Part
// Set your KAS access key and secretAccessKey.
const accessKeyId = '{your_accessKeyId}'
const secretAccessKey = '{your_secretAccessKey}'

// const CHAIN_ID_BAOBOB = '1001'
// const CHAIN_ID_CYPRESS = '8217'
const chainId = '1001'

const caver = new CaverExtKAS(chainId, accessKeyId, secretAccessKey)

test()

async function test () {
    const privateKey = '0x{private key}'

    // Create a KeyringContainer instance
    const keyringContainer = new caver.keyringContainer()

    // Add keyring to in-memory wallet
    const keyring = keyringContainer.keyring.createFromPrivateKey(privateKey)
    keyringContainer.add(keyring)
	
    // caver.kct.kip17.deploy returns a KIP17 instance
    // If you send IWallet as a last paramter, caver.kct.kip17 will use that to sign.
    // If you create a KIP17 instance, you can call `kip17.setWallet(keyringContainer)` to use KeyringContainer instead of KAS Wallet API
    const kip17 = await caver.kct.kip17.deploy({
        name: 'Jasmine',
        symbol: 'JAS',
    }, keyring.address, keyringContainer)

    const kip17Address = kip17.options.address
    console.log(`kip17Address : ${kip17Address}`)

    const tokenId = '1'
    const uri = 'http://test.url'
    const mintReceipt = await kip17.mintWithTokenURI(keyring.address, tokenId, uri, { from:keyring.address })
    console.log(`mint receipt: `)
    console.log(mintReceipt)

    const transferReceipt = await kip17.transferFrom(keyring.address, keyring.address, tokenId, { from:keyring.address })
    console.log(`transfer receipt: `)
    console.log(transferReceipt)

    const burnReceipt = await kip17.burn(tokenId, { from:keyring.address })
    console.log(`burn receipt: `)
    console.log(burnReceipt)
}
