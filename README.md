# caver-js-boilerplate

caver-js-boilerplate is a project provided to run an example using caver-js published by Klaytn Dev Team.

## Table of contents

   * [Requirements](#requirements)
   * [How to use caver-js-boilerplate](#how-to-use-caver-js-boilerplate)

## Requirements

The following packages are required to execute the caver-js examples.
- [Node.js](https://nodejs.org/en/download/)
- [npm](https://www.npmjs.com/get-npm)

**Note** caver-js can run on Node.js versions 8 and 10, and the recommended versions are:
- lts/carbon ([8.17.0](https://nodejs.org/dist/latest-v8.x/))
- lts/dubnium ([10.22.0](https://nodejs.org/dist/latest-v10.x/))
* lts/erbium ([12.19.0](https://nodejs.org/dist/latest-v12.x/))

If you are already using a different version of the node(for example, node v14), use the Node Version Manager([NVM](https://github.com/nvm-sh/nvm)) to install and use the version supported by caver-js.


## How to use caver-js-boilerplate

1. Download the necessary modules using the comments below.

```
$ npm install
```

2. Copy and paste caver-js example to `index.js` file.

3. Assign the auth issued from the [KAS Console](https://console.klaytnapi.com/) to the variables `accessKeyId` and `secretAccessKey` in the `index.js` file.

4. The chian id of the network to be used is assigned to the `chainId` variable in the `index.js` file. The chain id of Baobab network is '1001', and the chain id of Cypress network is '8217'.

5. Run the example with below command:

```
$ node ./index.js
```


### License
caver-js-boilerplate is released under the [MIT license](./LICENSE).

```
MIT License

Copyright (c) 2021 caver-js-boilerplate Authors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
```