*Read this in Korean:* [Korean](https://github.com/klaytn/caver-js-examples/blob/master/README.ko.md) 

# caver-js-examples
**caver-js-examples** provide code samples to help you use the Klaytn SDK([caver-js](https://github.com/klaytn/caver-js)) easier and faster. Here you can find and test code samples conceived for different scenarios.

## 1. Prerequisites
### 1.1 Installing Software
In order to follow this tutorial, you have to first install the software as listed on [Docs](https://docs.klaytn.com/bapp/sdk/caver-js/getting-started#prerequisites). The link explains which software you need for creating this project.

### 1.2 Sign Up on KAS
You can use the Klaytn SDK([caver-js](https://github.com/klaytn/caver-js)) by connecting to one of the nodes that comprise the Klaytn network. But for the caver-js-examples project, we are using the [Node API](https://refs.klaytnapi.com/en/node/latest) of [KAS](https://klaytnapi.com), which means that you don't have to run an [Endpoint Node (EN)](https://docs.klaytn.com/node/endpoint-node) yourself to test the code samples.

To use KAS, first sign up on [KAS](https://klaytnapi.com), and obtain the `AccessKey ID` and `Secret AccessKey`.
You can find detailed instructions on how to use the `AccessKey ID` and `Secret AccessKey` in [2. How to Use](https://github.com/klaytn/caver-js-examples#2-how-to-use).

### 1.3 Creating Account
In order to execute the code samples, you need a test account with a sufficient balance of testnet KLAY.
Because the code samples also involves sending a transaction to Klaytn, you need at least one test account. If you have updated your account key, and your old test account is rendered unusable, you can create a new account. Create a test account following the instructions below and obtain your 5 testnet KLAY. Depending on the scenarios, you may need multiple test accounts. In that case, just repeat the process to create multiple test accounts.
1. Create a test account at [Klaytn Wallet Testnet](https://baobab.wallet.klaytn.com/create). 
    * Have the address and private key of the new account written down, because you will need them for testing the code samples.
    * Make sure to also save the keystore file, because some scenarios require it.
2. Obtain 5 testnet KLAY on [Baobab Klaytn Wallet Faucet](https://baobab.wallet.klaytn.com/faucet).

## 2. How to Use
1. Clone this project and then execute `$ git clone https://github.com/klaytn/caver-js-examples.git` in Terminal.
2. To run the samples, you need to set the Credential (AccessKey ID and Secret AccessKey) which can be obtained on [KAS Console](https://console.klaytnapi.com/ko/security/credential) as well as a Klaytn account obtained on [Klaytn Wallet Testnet](https://baobab.wallet.klaytn.com/create). We recommend using the test account just for testing.
    * Option 1 (recommended): Define the Credential information and your Klaytn account in the **caver-js-examples/.env** file. The variables defined in this file apply for all scenarios. You can find the code for retrieving the variables defined in the **.env** file in the `loadEnv` function within **index.js** of each scenario.
    * Option 2: Open the **index.js** file for the scenario and fill in the variables declared with the keyword `let`.
3. In Terminal, execute the code sample using `node <Common Architecture Layer>/<Scenario>/index.js`.
    * Example 1: `$ node account/update_account_with_account_key_public/index.js`
    * Example 2: `$ node contract/fee_delegation/index.js`
    
### 2.1 Hello World
If you want to jump right into using caver regardless of the scenarios, try printing `hello_world` using one of the commands below:
* `$ cd hello_world && node ./index.js`
* `$ node hello_world/index.js`

Explore and test code using caver with the `run` function in the **caver-js-examples/hello_world/index.js** file.

## 3. Project Sturcture
Below is an explanation of the caver-js-examples project structure.
### 3.1 CA-Layer/Scenario

On the first level of the directory tree, you will find [Layers that Comprise the Common Architecture](https://kips.klaytn.com/KIPs/kip-34#layer-diagram-of-the-common-architecture). This will be refered to as `CA-Layers` from now on.
```
.
├── abi
├── account
├── ...
└── wallet
```

Under the `CA-Layers` level, you will find **Sample Scenarios**. For example, the sample scenarios within the directory of the `account` layer look like this:
```
account
├── update_account_with_account_key_public
├── update_account_with_account_key_role_based
└── update_account_with_account_key_weighted_multisig
```
* Each scenario includes a **index.js** file, and if the scenario requires a specific file, it employs a `resources` directory.
* This allows the users to execute the samples right away.

### 3.2 Summary
The caver-js-example project consists of multiple `CA-Layer/Scenario`, and lets you run the code samples with `node CA-Layer/Scenario/index.js` in the project root directory or `node ./index.js` in the scenario's directory.

## License
**caver-js-examples** is released under the [MIT license](./LICENSE).

```
MIT License

Copyright (c) 2021 caver-js-examples Authors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
