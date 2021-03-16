const CaverExtKAS = require('caver-js-ext-kas')
const env = require('./env.json')
const chainId = require('./chainId')

const caver = new CaverExtKAS(chainId[env.network], env.accessKeyId, env.secretAccessKey)

test()

async function test() {
	// You can get test KLAY available on Baobab network through Klaytn Wallet-Faucet.
	// https://baobab.wallet.klaytn.com/faucet
	const keyringContainer = new caver.keyringContainer()
	const keyring = keyringContainer.add(keyringContainer.keyring.createFromPrivateKey('0xa1fbc252cf7acf7fe2380a46e9f3353d765fdfa78483acf06e881cbcf29e3f8c'))

	// Since this is an example that works using KAS, we use caver-js-ext-kas.
	// KAS SDK basically operates using an account in the KAS Wallet API.
	// In the case of direct account management as in this example,
	// the wallet implementing IWallet is passed as the last parameter of the deploy function.
	const kip17 = await caver.kct.kip17.deploy({
		name: 'Jasmine',
		symbol: 'JAS',
	}, keyring.address, keyringContainer)

	console.log(`KIP-17 contract address: ${kip17.options.address}`)

	const tokenId = 0
	const minted = await kip17.mintWithTokenURI(keyring.address, tokenId, 'tokenURI string', { from: keyring.address })
	console.log(minted)

	const owner = await kip17.ownerOf(tokenId)
	console.log(owner)
}
