# caver-js-examples
**caver-js-examples**는 Klaytn SDK([caver-js](https://github.com/klaytn/caver-js))를 더 쉽고 빠르게 사용할 수 있도록 예제 코드를 제공하는 프로젝트입니다.
다양한 상황에 맞는 예제 코드를 확인하고 직접 실행해 볼 수 있습니다.

## 1. 선행 작업
### 1.1 소프트웨어 설치
실습을 원활히 진행하려면 [문서](https://ko.docs.klaytn.com/bapp/sdk/caver-js/getting-started#prerequisites)에 작성된 소프트웨어를 먼저 설치해야 합니다. 해당 문서에는 본 프로젝트를 구성할 때 필요한 소프트웨어를 기술하고 있습니다.

### 1.2 KAS 회원가입
Klaytn SDK([caver-js](https://github.com/klaytn/caver-js))는 Klaytn 네트워크를 구성하는 노드를 연결해 사용할 수 있는데, caver-js-examples 프로젝트에서는 [KAS](https://klaytnapi.com)의 [Node API](https://refs.klaytnapi.com/en/node/latest)를 사용합니다. 따라서 사용자는 [엔드포인트 노드(EN)](https://docs.klaytn.com/node/endpoint-node)를 직접 운영하지 않아도 예제코드를 테스트 할 수 있습니다.

KAS를 사용하려면 먼저 [KAS](https://klaytnapi.com)에 가입하고, 예제코드 실행에 필요한 `AccessKey ID`와 `Secret AccessKey`를 발급 받습니다.
발급 받은 `AccessKey ID`와 `Secret AccessKey`의 사용 방법은 [2. 사용법](https://github.com/klaytn/caver-js-examples/blob/master/README.ko.md#2-%EC%82%AC%EC%9A%A9%EB%B2%95)에서 확인할 수 있습니다.

### 1.3 계정 준비
예제 코드를 실행하려면 테스트넷 KLAY를 충분히 보유한 테스트 계정이 준비되어야 합니다. 
예제 코드 역시 Klaytn에 트랜잭션을 전송하기 때문에 최소 1개의 테스트 계정이 필요합니다. 만약 계정 키를 업데이트해서 기존에 사용하던 테스트 계정을 더이상 사용할 수 없다면 새로운 계정을 생성할 수 있습니다. 아래 설명에 따라 테스트 계정을 생성하고 5 테스트넷 KLAY를 충전하세요. 예제 종류에 따라 여러 개의 테스트 계정이 필요할 수 있으며, 이 경우에는 아래 절차를 반복해 여러 개의 테스트 계정을 생성할 수 있습니다.
1. [Klaytn Wallet 테스트넷](https://baobab.wallet.klaytn.com/create)에서 테스트 계정을 생성합니다. 
    * 생성된 계정의 주소와 개인 키는 테스트에 활용되기 때문에 반드시 기록해두고 잊지 않도록 합니다.
    * 생성 시 저장한 키스토어 파일을 별도 보관하세요. 일부 예제 시나리오에서 키스토어 파일을 활용합니다.
2. [Baobab Klaytn Wallet의 Faucet](https://baobab.wallet.klaytn.com/faucet)에서 5 테스트넷 KLAY를 충전합니다.

## 2. 사용법
1. 이 프로젝트를 클론합니다. 터미널에서 `$ git clone https://github.com/klaytn/caver-js-examples.git`을 실행하세요.
2. 예제를 실행하려면 [KAS Console](https://console.klaytnapi.com/ko/security/credential)에서 발급받은 Credential(AccessKey ID와 Secret AccessKey)과 [Klaytn Wallet 테스트넷](https://baobab.wallet.klaytn.com/create)에서 발급받은 Klaytn 계정을 설정해야 합니다. 실습에 사용하는 계정은 테스트 용도로만 사용할 것을 권장합니다.
    * 옵션 1(권장): **caver-js-examples/.env** 파일에 발급 받은 Credential과 Klaytn 계정을 정의합니다. 이 파일에 정의된 내용은 모든 시나리오에 공통 적용됩니다. 각 시나리오의 **index.js** 파일 `loadEnv` 함수에서 **.env** 파일에 정의한 변수들을 읽어오는 코드가 있으니 참고하시기 바랍니다.
    * 옵션 2: 원하는 시나리오에 해당하는 **index.js** 파일을 열고 상단에 let 키워드로 선언된 변수의 값을 채웁니다.
3. 터미널에서 `node <Common Architecture 레이어>/<시나리오>/index.js`로 예제 코드를 실행합니다.
    * 예시 1: `$ node account/update_account_with_account_key_public/index.js`
    * 예시 2: `$ node contract/fee_delegation/index.js`
    
### 2.1 Hello World
시나리오에 관계없이 caver를 바로 사용해보고 싶다면 `hello_world`를 실행해보세요. 아래 명령어 중 하나를 사용해 실행할 수 있습니다.
* `$ cd hello_world && node ./index.js`
* `$ node hello_world/index.js`

**caver-js-examples/hello_world/index.js** 파일의 `run` 함수에 caver를 사용하는 코드를 자유롭게 작성하고 테스트해 보세요.

## 3. 프로젝트 구조
caver-js-examples 프로젝트 구조를 설명합니다.
### 3.1 CA-Layer/시나리오

디렉토리 트리의 첫 번째 레벨에는 [Common Architecture를 구성하는 레이어](https://kips.klaytn.com/KIPs/kip-34#layer-diagram-of-the-common-architecture)가 위치합니다. 이하 `CA-Layers`라고 표기합니다.
```
.
├── abi
├── account
├── ...
└── wallet
```

`CA-Layers` 하위 레벨에는 **예제 시나리오**가 위치하게 됩니다. 예를 들어 `account` 레이어 디렉토리 내부에 위치하는 예제 시나리오는 다음과 같습니다.
```
account
├── update_account_with_account_key_public
├── update_account_with_account_key_role_based
└── update_account_with_account_key_weighted_multisig
```
* 각 시나리오는 단일 **index.js** 파일을 포함하며, 해당 시나리오에 특정 파일이 필요한 경우 `resources` 디렉토리를 구성합니다.
* 이는 사용자가 예제를 바로 실행해 볼 수 있도록 구성하기 위함입니다.

### 3.2 Summary
caver-js-example 프로젝트는 여러 개의 `CA-Layer/시나리오`로 이루어져 있으며, 프로젝트의 루트 디렉토리에서 `node CA-Layer/시나리오/index.js` 또는 해당하는 시나리오 디렉토리에서 `node ./index.js`로 예제 코드를 실행할 수 있도록 지원합니다.

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
