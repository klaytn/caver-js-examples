# caver-js-examples
**caver-js-examples** 프로젝트는 SDK를 사용하는 분들이 좀 더 쉽고 빠르게 SDK를 사용하실 수 있게끔 도움을 드리기 위한 프로젝트입니다.
다양한 상황에 맞는 예제코드를 직접 확인하시고 실행해보실 수 있습니다.

## 1. 선행되어야 하는 작업
### 1.1 실습을 위해 필요한 소프트웨어 설치
> 본 프로젝트를 구성할 때 사용한 소프트웨어들을 기술합니다. 원활한 실습 진행을 위해 아래 기술한 소프트웨어들은 실습 전에 설치 해주시기 바랍니다.
* [Node.js](https://nodejs.org/en/download/) (Below versions are recommended.)
  * lts/erbium ([12.21.0](https://nodejs.org/dist/latest-v12.x/)) 
  * lts/fermium ([14.16.0](https://nodejs.org/dist/latest-v14.x/))
* [npm](https://www.npmjs.com/get-npm)
* [gcc-c++](https://gcc.gnu.org/)

### 1.2 KAS 회원가입
Caver SDK는 [Klaytn EndpointNode(이하 Klaytn EN)](https://docs.klaytn.com/node/endpoint-node)와 함께 사용할 수 있도록 만들어져 있습니다.
EN을 직접 운영하지 않아도 본 Boilerplate에 있는 예제코드들을 사용하실 수 있도록, caver-js-examples 프로젝트는 KAS의 [NODE API](https://refs.klaytnapi.com/en/node/latest)를 사용합니다.

KAS를 사용하기 위해서는 [KAS](https://www.klaytnapi.com/ko/landing/main)에 가입하셔야 합니다. 가입하시면 Boilerplate 코드 실행에 필요한 `access key id`와 `secret access key`를 발급받으실 수 있습니다.
발급받은 `access key id`와 `secret access key`는 Boilerplate 코드 실행에 필요합니다.

### 1.3 계정 준비
5 KLAY 이상을 보유하고 있는 테스트 용도의 계정을 3개 이상 준비해주시기 바랍니다.
* https://baobab.wallet.klaytn.com/create 에서 테스트용 계정을 생성하실 수 있습니다.
* 생성하신 테스트 계정으로 https://baobab.wallet.klaytn.com/faucet 에서 테스트용 5 KLAY를 충전하실 수 있습니다.

향후 다시 테스트하실 때 생성하신 테스트용 계정들을 재사용하실 수 있으니 계정의 주소와 개인키를 기억할 수 있는 곳에 잘 보관해두시는 것을 추천드립니다.

## 2. 사용법
> 본 caver-js-examples 프로젝트를 그대로 클론해서 사용하시는 방법입니다.
1. 이 프로젝트를 클론합니다. `$ git clone https://github.com/klaytn/caver-java-examples.git`
2. [KAS](https://www.klaytnapi.com/ko/landing/main)에서 본인의 계정으로 발급받은 credential 정보와 실습에 사용하실 클레이튼 계정들의 주소와 개인키 값을 설정합니다. 실습에 사용하시는 계정은 테스트 용도의 계정 사용을 권장드립니다.
   * 옵션 1(권장): `caver-js-examples/.env` 파일의 내용을 채워주도록 합니다. 이 파일에 채우신 내용은 모든 시나리오에 공통 적용됩니다. 각 시나리오의 `src/main/java/Boilerplate.java` 파일의 `loadEnv` 메서드에 `.env` 파일에 정의된 변수들을 읽어들이는 코드가 있으니 참고해주세요.
   * 옵션 2: 원하는 시나리오에 해당하는 `Boilerplate.java` 파일을 열고 Boilerplate class 밑에 정의되어 있는 `private static`으로 선언된 변수들의 값을 채워줍니다.
3. 사용하시는 터미널에서 원하는 시나리오를 정하신 뒤 `node common-architecture-layer/scenario.js`와 같이 실행시켜줍니다.
   * 예시 1: `$ node account/update_account_with_account_key_public.js`
   * 예시 2: `$ node contract/fee_delegation.js`

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

