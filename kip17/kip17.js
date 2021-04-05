const Caver = require('caver-js')

const URL_NODE_API = 'https://node-api.klaytnapi.com/v1/klaytn'

// Configuration Part
// Set your KAS access key and secretAccessKey.
const accessKeyId = '{your_accessKeyId}'
const secretAccessKey = '{your_secretAccessKey}'

// const CHAIN_ID_BAOBOB = '1001'
// const CHAIN_ID_CYPRESS = '8217'
const chainId = '1001'

const option = {
    headers: [
        { name: 'Authorization', value: 'Basic ' + Buffer.from(accessKeyId + ':' + secretAccessKey).toString('base64') },
        { name: 'x-chain-id', value: chainId },
    ]
}

const caver = new Caver(new Caver.providers.HttpProvider(URL_NODE_API, option))

test()

async function test () {
    const privateKey = '0x{private key}'

    // Add keyring to in-memory wallet
    const keyring = caver.wallet.keyring.createFromPrivateKey(privateKey)
	caver.wallet.add(keyring)

	// caver.kct.kip17.deploy returns a KIP17 instance
	const kip17 = await caver.kct.kip17.deploy({
		name: 'Jasmine',
		symbol: 'JAS',
	}, keyring.address)

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