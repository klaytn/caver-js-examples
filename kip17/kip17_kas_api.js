const CaverExtKAS = require('caver-js-ext-kas')
const { timeout } = require('../utils')

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
	const tokenName = 'TokenName'
	const symbol = 'TN'
	// Alias should be unique. If send duplicated alias, KAS will return an error.
    const alias = `kip-17-contract-alias`
	const deployedResult = await caver.kas.kip17.deploy(tokenName, symbol, alias)

	console.log(deployedResult)

	// Wait for KIP-17 that requested deployment to be successfully deployed to Klaytn and applied in KAS KIP-17 API.
	await timeout(10000)

    const tokenId = '1'
	const uri = 'http://test.url'

	// Create an account in KAS Wallet API
	const account = await caver.kas.wallet.createAccount()
	console.log(`Account in KAS Wallet API`)
	console.log(account)

	// mint(addressOrAlias, to, tokenId, tokenURI
    const mintResult = await caver.kas.kip17.mint(alias, account.address, tokenId, uri)
    console.log(`mint result: `)
    console.log(mintResult)

	// transfer(addressOrAlias, sender, owner, to, tokenId)
	const transferResult = await caver.kas.kip17.transfer(alias, account.address, account.address, account.address, tokenId)
	console.log(`transfer result: `)
    console.log(transferResult)

	// burn(addressOrAlias, from, tokenId)
    const burnResult = await caver.kas.kip17.burn(alias, account.address, tokenId)
    console.log(`burn result: `)
    console.log(burnResult)
}
