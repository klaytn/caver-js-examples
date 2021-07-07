# caver-js-examples
**caver-js-examples** 프로젝트는 SDK를 사용하는 분들이 좀 더 쉽고 빠르게 SDK를 사용하실 수 있게끔 도움을 드리기 위한 프로젝트입니다.
다양한 상황에 맞는 예제코드를 직접 확인하시고 실행해보실 수 있습니다.

## 1. 선행되어야 하는 작업
### 1.1 실습을 위해 필요한 소프트웨어 설치
> 본 프로젝트를 구성할 때 사용한 소프트웨어들을 기술합니다. 원활한 실습 진행을 위해 아래 기술한 소프트웨어들은 실습 전에 설치 해주시기 바랍니다.
* [Node.js](https://nodejs.org/en/download/) (아래 버전 중 하나를 권장드립니다.)
  * lts/erbium ([12.21.0](https://nodejs.org/dist/latest-v12.x/)) 
  * lts/fermium ([14.16.0](https://nodejs.org/dist/latest-v14.x/))
* [npm](https://www.npmjs.com/get-npm)
* [gcc-c++](https://gcc.gnu.org/)

### 1.2 KAS 회원가입
Caver SDK는 [Klaytn EndpointNode(이하 Klaytn EN)](https://docs.klaytn.com/node/endpoint-node)와 함께 사용할 수 있도록 만들어져 있습니다.
[EN](https://docs.klaytn.com/node/endpoint-node)을 직접 운영하지 않아도 본 예제코드들을 테스트해볼 수 있도록, caver-js-examples 프로젝트는 [KAS](https://klaytnapi.com)의 [NODE API](https://refs.klaytnapi.com/en/node/latest)를 사용합니다.

KAS를 사용하기 위해서는 [KAS](https://klaytnapi.com)에 가입하셔야 합니다. 가입하시면 예제코드 실행에 필요한 `access key id`와 `secret access key`를 발급받으실 수 있습니다.
발급받은 `access key id`와 `secret access key`는 [2. 사용법](https://github.com/klaytn/caver-js-examples/blob/master/README.ko.md#2-%EC%82%AC%EC%9A%A9%EB%B2%95) 섹션을 참고하셔서 적절한 위치에 값을 넣어주신 후 사용하시면 됩니다.

### 1.3 계정 준비
5 KLAY 이상을 보유하고 있는 테스트 용도의 계정을 3개 이상 준비해주시기 바랍니다.
* https://baobab.wallet.klaytn.com/create 에서 테스트용 계정을 생성하실 수 있습니다.
* 생성하신 테스트 계정으로 https://baobab.wallet.klaytn.com/faucet 에서 테스트용 5 KLAY를 충전하실 수 있습니다.

향후 다시 테스트하실 때 생성하신 테스트용 계정들을 재사용하실 수 있으니 계정의 주소와 개인키를 기억할 수 있는 곳에 잘 보관해두시는 것을 추천드립니다.

## 2. 사용법
1. 이 프로젝트를 클론합니다. `$ git clone https://github.com/klaytn/caver-js-examples.git`
2. [KAS](https://www.klaytnapi.com/ko/landing/main)에서 본인의 계정으로 발급받은 credential 정보와 실습에 사용하실 클레이튼 계정들의 주소와 개인키 값을 설정합니다. 실습에 사용하시는 계정은 테스트 용도의 계정 사용을 권장드립니다.
   * 옵션 1(권장): `caver-js-examples/.env` 파일의 내용을 채워주도록 합니다. 이 파일에 채우신 내용은 모든 시나리오에 공통 적용됩니다. 각 시나리오의 `boilerplate.js` 파일의 `loadEnv` 함수에 `.env` 파일에 정의된 변수들을 읽어들이는 코드가 있으니 참고해주세요.
   * 옵션 2: 원하는 시나리오에 해당하는 `boilerplate.js` 파일을 열고 상단에 let 키워드로 선언된 변수들의 값을 채워줍니다.
3. 사용하시는 터미널에서 원하는 시나리오를 정하신 뒤 `node <Common Architecture 레이어>/<시나리오>.js`와 같이 실행시켜줍니다.
   * 예시 1: `$ node account/update_account_with_account_key_public/boilerplate.js`
   * 예시 2: `$ node contract/fee_delegation/boilerplate.js`

## 3. 프로젝트 구조
> caver-js-examples 프로젝트의 구조에 대한 이해를 돕기 위해 작성한 세션입니다.
### 3.1 CA-Layer/시나리오

디렉토리 트리의 가장 첫 번째 레벨에는 [Common Architecture를 구성하는 레이어들](https://kips.klaytn.com/KIPs/kip-34#layer-diagram-of-the-common-architecture)이 위치해 있습니다. 편의상 아래 설명부터는 `CA-Layers`라고 표기하도록 하겠습니다.
```
.
├── abi
├── account
├── ...
└── wallet
```

`CA-Layers` 바로 밑에는 **예제 시나리오들**이 위치하게 됩니다. 일례로 `account` 레이어에는 다음과 같은 예제 시나리오들이 위치해 있습니다.
```
account
├── update_account_with_account_key_public
├── update_account_with_account_key_role_based
└── update_account_with_account_key_weighted_multisig
```
* 각 시나리오들은 단일 `boilerplate.js` 파일 그리고 해당 시나리오에 특정 파일이 필요한 경우 `resources` 디렉토리를 가지고 있습니다.
* 이는 사용자 분들이 바로 시나리오 디렉토리에서 예제를 바로 실행해보실 수 있도록 구성하기 위함입니다.

### 3.2 Summary
정리해보면 이 프로젝트는 여러 개의 `CA-Layer/시나리오`로 되어 있으며 사용자들이 원하는 시나리오를 프로젝트의 루트 디렉토리에서 `node CA-Layer/시나리오/boilerplate.js` 또는 해당 시나리오 디렉토리에서 `./node boilerplate.js`로 바로 예제코드를 실행해볼 수 있게 구성되어 있습니다.

## License
**caver-java-examples** is released under the [MIT license](./LICENSE).

```
MIT License

Copyright (c) 2021 caver-java-examples Authors

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

