# caver-js-examples
**caver-js-examples** 은 더 쉽고 빠르게 Klaytn SDK([caver-js](https://github.com/klaytn/caver-js))를 사용할 수 있도록 예제 소스코드를 제공하는 프로젝트입니다.
다양한 상황에 맞는 예제코드를 확인하고 직접 실행해 볼 수 있습니다.

## 1. 선행되어야 하는 작업
### 1.1 실습을 위해 필요한 소프트웨어 설치
본 프로젝트를 구성할 때 필요한 소프트웨어들을 기술합니다. 원활한 실습 진행을 위해 서는 [문서](https://ko.docs.klaytn.com/bapp/sdk/caver-js/getting-started#prerequisites)에 기술되어 있는 소프트웨어들은 실습 전에 설치해야 합니다.

### 1.2 KAS 회원가입
Klaytn SDK([caver-js](https://github.com/klaytn/caver-js))는 Klaytn 네트워크를 구성하는 Node를 연결하여 사용할 수 있으며, caver-js-examples 프로젝트에서는 사용자들이 [EN](https://docs.klaytn.com/node/endpoint-node)을 직접 운영하지 않고 예제코드들을 테스트 할 수 있도록 [KAS](https://klaytnapi.com)의 [NODE API](https://refs.klaytnapi.com/en/node/latest)를 사용합니다.

KAS를 사용하기 위해서는 [KAS](https://klaytnapi.com)에 가입해야 합니다. 가입하면 예제코드 실행에 필요한 `access key id`와 `secret access key`를 발급받을 수 있습니다.
발급받은 `access key id`와 `secret access key`를 사용하는 방법은 [2. 사용법](https://github.com/klaytn/caver-js-examples/blob/master/README.ko.md#2-%EC%82%AC%EC%9A%A9%EB%B2%95)에 설명되어 있습니다.

### 1.3 계정 준비
예제코드 실행을 위해서는 충분한 테스트넷 KLAY를 보유하고 있는 테스트 계정이 준비되어야 합니다. 아래는 테스트용 계정을 생성하고 5 테스트넷 KLAY를 충전하는 방법을 설명합니다.
예제코드에서는 Klaytn에 트랜잭션을 전송하기 때문에 최소 1개의 테스트 계정이 필요하며, 예제에 따라서 여러 개의 테스트 계정이 필요한 경우 아래의 절차대로 여러 개의 테스트계정을 생성할 수 있습니다. 또한 계정키를 업데이트해서 더이상 기존에 사용하던 테스트계정을 사용할 수 없는 경우에도 새롭게 테스트계정을 생성할 수 있습니다.
* https://baobab.wallet.klaytn.com/create 에서 테스트용 계정을 생성합니다. 
    * 생성된 계정의 주소와 개인키는 추후 테스트에 사용되기 때문에 따로 적어놔야 합니다.
    * 생성 시 저장한 키스토어 파일도 따로 보관해야 합니다. 일부 예제 시나리오에서는 키스토어 파일이 사용됩니다.
* [Baobab Klaytn Wallet의 Faucet](https://baobab.wallet.klaytn.com/faucet)에서 5 테스트넷 KLAY를 받습니다.

## 2. 사용법
1. 이 프로젝트를 클론합니다. `$ git clone https://github.com/klaytn/caver-js-examples.git`
2. 예제를 실행하기 위해서는 [KAS Console](https://console.klaytnapi.com/ko/security/credential)에서 발급받은 credential 과 위에서 발급받은 클레이튼 계정을 설정해야 합니다. 실습에 사용하는 계정은 테스트 용도의 계정만 사용하는 것을 권장합니다.
    * 옵션 1(권장): `caver-js-examples/.env` 파일의 내용에 정의합니다. 이 파일에 정의된 내용은 모든 시나리오에 공통 적용됩니다. 각 시나리오의 `boilerplate.js` 파일의 `loadEnv` 함수에서 `.env` 파일에 정의된 변수들을 읽어오는 코드가 있으니 참고하시기 바랍니다.
    * 옵션 2: 원하는 시나리오에 해당하는 `boilerplate.js` 파일을 열고 상단에 let 키워드로 선언된 변수들의 값을 채워줍니다.
3. 터미널에서 `node <Common Architecture 레이어>/<시나리오>/boilerplate.js`로 예제 소스코드를 실행합니다.
    * 예시 1: `$ node account/update_account_with_account_key_public/boilerplate.js`
    * 예시 2: `$ node contract/fee_delegation/boilerplate.js`

## 3. 프로젝트 구조
caver-js-examples 프로젝트의 구조에 대해 설명합니다.
### 3.1 CA-Layer/시나리오

디렉토리 트리의 가장 첫 번째 레벨에는 [Common Architecture를 구성하는 레이어들](https://kips.klaytn.com/KIPs/kip-34#layer-diagram-of-the-common-architecture)이 위치합니다. 아래 설명부터는 이를 `CA-Layers`라고 표기합니다.
```
.
├── abi
├── account
├── ...
└── wallet
```

`CA-Layers` 바로 밑에는 **예제 시나리오들**이 위치하게 됩니다. 일례로 `account` 레이어 디렉토리 내부에는 다음의 예제 시나리오들이 위치합니다.
```
account
├── update_account_with_account_key_public
├── update_account_with_account_key_role_based
└── update_account_with_account_key_weighted_multisig
```
* 각 시나리오들은 단일 `boilerplate.js` 파일 그리고 해당 시나리오에 특정 파일이 필요한 경우 `resources` 디렉토리를 가지고 있습니다.
* 이는 사용자가 예제를 바로 실행해 볼 수 있도록 구성하기 위함입니다.

### 3.2 Summary
caver-js-example 프로젝트는 여러 개의 `CA-Layer/시나리오`로 되어 있으며, 프로젝트의 루트 디렉토리에서 `node CA-Layer/시나리오/boilerplate.js` 또는 해당 시나리오 디렉토리에서 `node ./boilerplate.js`로 예제코드를 실행할 수 있게 구성되어 있습니다.

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
