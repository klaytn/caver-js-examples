const path = require('path')
const dotenv = require('dotenv')
const Caver = require('caver-js')
const ROOT_DIR = path.join(__dirname, '../..'); // Path can be changed based on its actual location.

// You can directly input values for the variables below, or you can enter values in the caver-js-examples/.env file.
let nodeApiUrl = '' // e.g. 'https://node-api.klaytnapi.com/v1/klaytn'
let accessKeyId = '' // e.g. 'KASK1LVNO498YT6KJQFUPY8S'
let secretAccessKey = '' // e.g. 'aP/reVYHXqjw3EtQrMuJP4A3/hOb69TjnBT3ePKG'
let chainId = '' // e.g. '1001' or '8217'
let deployerAddress = ''; // e.g. '0xeb709d59954f4cdc6b6f3bfcd8d531887b7bd199'
let deployerPrivateKey = ''; // e.g. '0x39a6375b608c2572fadb2ed9fd78c5c456ca3aa860c43192ad910c3269727fc1'
let feePayerAddress = ''; // e.g. '0xeb709d59954f4cdc6b6f3bfcd8d531887b7bd199'
let feePayerPrivateKey = ''; // e.g. '0x39a6375b608c2572fadb2ed9fd78c5c456ca3aa860c43192ad910c3269727fc1'

/**
 * Boilerplate code about "How to use Fee Delegation with Contract."
 * Related article - Korean: https://medium.com/klaytn/caver-contract%EB%A5%BC-%EC%82%AC%EC%9A%A9%ED%95%98%EC%97%AC-%EC%88%98%EC%88%98%EB%A3%8C%EB%A5%BC-%EB%8C%80%EB%82%A9%ED%95%B4%EB%B3%B4%EC%9E%90-4c046900c4ed
 * Related article - English: https://medium.com/klaytn/caver-how-to-use-fee-delegation-with-contract-c599388c7cc0
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
    deployerAddress = deployerAddress === '' ? envs.parsed.DEPLOYER_ADDRESS : deployerAddress
    deployerPrivateKey = deployerPrivateKey === '' ? envs.parsed.DEPLOYER_PRIVATE_KEY : deployerPrivateKey
    feePayerAddress = feePayerAddress === '' ? envs.parsed.FEE_PAYER_ADDRESS : feePayerAddress
    feePayerPrivateKey = feePayerPrivateKey === '' ? envs.parsed.FEE_PAYER_PRIVATE_KEY : feePayerPrivateKey
}

async function run() {
    const option = {
        headers: [
            {
                name: 'Authorization',
                value: 'Basic ' + Buffer.from(accessKeyId + ':' + secretAccessKey).toString('base64')
            },
            {name: 'x-chain-id', value: chainId},
        ]
    }
    const caver = new Caver(new Caver.providers.HttpProvider(nodeApiUrl, option))

    // Add keyrings to in-memory wallet
    const senderKeyring = caver.wallet.keyring.create(deployerAddress, deployerPrivateKey)
    caver.wallet.add(senderKeyring)
    const feePayerKeyring = caver.wallet.keyring.create(feePayerAddress, feePayerPrivateKey)
    caver.wallet.add(feePayerKeyring)

    // byteCode are extracted by compiling caver-js-examples/resources/KVstore.sol using solc(solidity compiler)
    const byteCode =
        '0x608060405234801561001057600080fd5b5060405161072d38038061072d8339810180604052604081101561003357600080fd5b81019080805164010000000081111561004b57600080fd5b8281019050602081018481111561006157600080fd5b815185600182028301116401000000008211171561007e57600080fd5b5050929190602001805164010000000081111561009a57600080fd5b828101905060208101848111156100b057600080fd5b81518560018202830111640100000000821117156100cd57600080fd5b5050929190505050806000836040518082805190602001908083835b6020831061010c57805182526020820191506020810190506020830392506100e9565b6001836020036101000a0380198251168184511680821785525050505050509050019150509081526020016040518091039020908051906020019061015292919061015a565b5050506101ff565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061019b57805160ff19168380011785556101c9565b828001600101855582156101c9579182015b828111156101c85782518255916020019190600101906101ad565b5b5090506101d691906101da565b5090565b6101fc91905b808211156101f85760008160009055506001016101e0565b5090565b90565b61051f8061020e6000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c8063693ec85e1461003b578063e942b5161461016f575b600080fd5b6100f46004803603602081101561005157600080fd5b810190808035906020019064010000000081111561006e57600080fd5b82018360208201111561008057600080fd5b803590602001918460018302840111640100000000831117156100a257600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192905050506102c1565b6040518080602001828103825283818151815260200191508051906020019080838360005b83811015610134578082015181840152602081019050610119565b50505050905090810190601f1680156101615780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6102bf6004803603604081101561018557600080fd5b81019080803590602001906401000000008111156101a257600080fd5b8201836020820111156101b457600080fd5b803590602001918460018302840111640100000000831117156101d657600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192908035906020019064010000000081111561023957600080fd5b82018360208201111561024b57600080fd5b8035906020019184600183028401116401000000008311171561026d57600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192905050506103cc565b005b60606000826040518082805190602001908083835b602083106102f957805182526020820191506020810190506020830392506102d6565b6001836020036101000a03801982511681845116808217855250505050505090500191505090815260200160405180910390208054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156103c05780601f10610395576101008083540402835291602001916103c0565b820191906000526020600020905b8154815290600101906020018083116103a357829003601f168201915b50505050509050919050565b806000836040518082805190602001908083835b6020831061040357805182526020820191506020810190506020830392506103e0565b6001836020036101000a0380198251168184511680821785525050505050509050019150509081526020016040518091039020908051906020019061044992919061044e565b505050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061048f57805160ff19168380011785556104bd565b828001600101855582156104bd579182015b828111156104bc5782518255916020019190600101906104a1565b5b5090506104ca91906104ce565b5090565b6104f091905b808211156104ec5760008160009055506001016104d4565b5090565b9056fea165627a7a72305820adabefbb9574a90843d986f100c723c37f37e79f289b16aa527705b5341499aa0029'
    const abi = [
        {
            constant: true,
            inputs: [{name: 'key', type: 'string'}],
            name: 'get',
            outputs: [{name: '', type: 'string'}],
            payable: false,
            stateMutability: 'view',
            type: 'function',
        },
        {
            constant: false,
            inputs: [{name: 'key', type: 'string'}, {name: 'value', type: 'string'}],
            name: 'set',
            outputs: [],
            payable: false,
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [{name: 'key', type: 'string'}, {name: 'value', type: 'string'}],
            payable: false,
            stateMutability: 'nonpayable',
            type: 'constructor',
        },
    ]

    let contract = caver.contract.create(abi)

    const keyString = 'keyString'

    // Send a FeeDelegatedSmartContractDeploy transaction to Klaytn directly.
    contract = await contract.deploy({
        from: senderKeyring.address,
        feeDelegation: true,
        feePayer: feePayerKeyring.address,
        gas: 1000000,
    }, byteCode, keyString, 'valueString')
    console.log(`The address of deployed smart contract: ${contract.options.address}`)

    // // The sender and fee payer each sign the transaction to deploy a smart contract.
    // const deployTx = await contract.sign({
    //     from: senderKeyring.address,
    //     feeDelegation: true,
    //     gas: 1000000,
    // }, 'constructor', byteCode, keyString, 'valueString')
    // console.log(`Sender signed transaction: `)
    // console.log(deployTx)

    // await caver.wallet.signAsFeePayer(feePayerKeyring.address, deployTx) // Signs the transaction as a fee payer
    // const receipt = await caver.rpc.klay.sendRawTransaction(deployTx)
    // console.log(`The address of deployed smart contract: ${receipt.contractAddress}`)
    // contract = caver.contract.create(abi, receipt.contractAddress)

    // Read value string from the smart contract.
    let valueString = await contract.call('get', keyString)
    console.log(`key: ${keyString} / value: ${valueString}`)

    // Send a FeeDelegatedSmartContractExecutionWithRatio transaction to Klaytn directly.
    const setResult = await contract.send({
        from: senderKeyring.address,
        feeDelegation: true,
        feePayer: feePayerKeyring.address,
        feeRatio: 50, // Without feeRatio, `send` will use FeeDelegatedSmartContractExecution
        gas: 1000000,
    }, 'set', keyString, 'anotherValue')

    // // The sender and fee payer each sign the transaction to execute a smart contract.
    // const executionTx = await contract.sign({
    //     from: senderKeyring.address,
    //     feeDelegation: true,
    //     feeRatio: 50, // Withour feeRatio, `send` will use FeeDelegatedSmartContractExecution
    //     gas: 1000000,
    // }, 'set', keyString, 'anotherValue')
    // console.log(`Sender signed transaction: `)
    // console.log(executionTx)

    // await caver.wallet.signAsFeePayer(feePayerKeyring.address, executionTx) // Signs the transaction as a fee payer
    // const setResult = await caver.rpc.klay.sendRawTransaction(executionTx)

    console.log(`The set function execution result: ${setResult.status} / Transaction Type: ${setResult.type}`)

    // Read value string from the smart contract.
    valueString = await contract.call('get', keyString)
    console.log(`After executing set function => key: ${keyString} / value: ${valueString}`)
}
