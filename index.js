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

async function test () {
  console.log(`=====> Update AccountKey to AccountKeyPublic`)

  const testAddress = '0x{address}'
  const testPrivateKey = '0x{private key}'

  // Add keyring to in-memory wallet
  const keyring = caver.wallet.keyring.create(testAddress, testPrivateKey)
  caver.wallet.add(keyring)

  // Create new private key
  const newKey = caver.wallet.keyring.generateSingleKey()
  console.log(`new private key: ${newKey}`)

  // Create new Keyring instance with new private key
  const newKeyring = caver.wallet.keyring.create(testAddress, newKey)
   // Create an Account instance that includes the address and the public key
  const account = newKeyring.toAccount()

  // Create account update transaction object
  const accountUpdate = new caver.transaction.accountUpdate({
      from: testAddress,
      account,
      gas: 50000,
  })

  // Sign the transaction
  await caver.wallet.sign(testAddress, accountUpdate)

  // Send transaction
  const receipt = await caver.rpc.klay.sendRawTransaction(accountUpdate)
  console.log(`Account Update Transaction receipt => `)
  console.log(receipt)
   // Get accountKey from network
  const accountKey = await caver.rpc.klay.getAccountKey(testAddress)
  console.log(`Result of account key update to AccountKeyPublic`)
  console.log(`Account address: ${testAddress}`)
  console.log(`accountKey =>`)
  console.log(accountKey)

  // Update keyring with new private key in in-memory wallet
  caver.wallet.updateKeyring(newKeyring)

  const vt = new caver.transaction.valueTransfer({
      from: testAddress,
      to: testAddress,
      value: 1,
      gas: 25000,
  })

  // Sign the transaction with updated keyring
  await caver.wallet.sign(testAddress, vt)

  // Send transaction
  const vtReceipt = await caver.rpc.klay.sendRawTransaction(vt)
  console.log(`After account update value transfer transaction receipt => `)
  console.log(vtReceipt)
}