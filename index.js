const Caver = require('caver-js')

// Configuration Part
const accessKeyId = '{your_accessKeyId}'
const secretAccessKey = '{your_secretAccessKey}'
const chainId = '1001' // Baobab '1001', Cypress '8217'

const option = {
	headers: [
		{ name: 'Authorization', value: 'Basic ' + Buffer.from(accessKeyId + ':' + secretAccessKey).toString('base64') },
		{ name: 'x-chain-id', value: chainId },
	]
}

const caver = new Caver(new Caver.providers.HttpProvider('https://node-api.klaytnapi.com/v1/klaytn', option))

test()

async function test() {
	// You can get test KLAY available on Baobab network through Klaytn Wallet-Faucet.
	// https://baobab.wallet.klaytn.com/faucet
	const keyring = caver.wallet.add(caver.wallet.keyring.createFromPrivateKey('0x{private key}'))

	const kip17 = await caver.kct.kip17.deploy({
		name: 'Jasmine',
		symbol: 'JAS',
	}, keyring.address)

	console.log(`KIP-17 contract address: ${kip17.options.address}`)

	const tokenId = 0
	const minted = await kip17.mintWithTokenURI(keyring.address, tokenId, 'tokenURI string', { from: keyring.address })
	console.log(minted)

	const owner = await kip17.ownerOf(tokenId)
	console.log(owner)
}
