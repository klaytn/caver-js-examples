const CaverExtKAS = require('caver-js-ext-kas')
const env = require('./env.json')
const chainId = require('./chainId')

const caver = new CaverExtKAS(chainId[env.network], env.accessKeyId, env.secretAccessKey)

caver.rpc.klay.getBlockNumber().then(console.log)
