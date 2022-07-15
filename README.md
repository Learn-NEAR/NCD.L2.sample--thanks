#  🎓 NCD.L2.sample--thanks dApp
This repository contains a complete frontend applications (Vue.js, React) to work with
<a href="https://github.com/Learn-NEAR/NCD.L1.sample--thanks" target="_blank">NCD.L1.sample--thanks smart contract</a> targeting the NEAR platform:
1. Vue.Js (main branch)
2. React (react branch)
2. Angular (angular branch)

The goal of this repository is to make it as easy as possible to get started writing frontend with Vue.js, React, and Angular for AssemblyScript contracts built to work with NEAR Protocol.


## ⚠️ Warning
Any content produced by NEAR, or developer resources that NEAR provides, are for educational and inspirational purposes only. NEAR does not encourage, induce or sanction the deployment of any such applications in violation of applicable laws or regulations.


## ⚡  Usage
Owner view

![image](https://user-images.githubusercontent.com/38455192/169348821-a191c98b-c1ab-4580-811c-d91baaf21db4.png)

<a href="https://www.loom.com/share/da86b0536ee540a8b79d4e7c59f88b3a" target="_blank">UI walkthrough</a>

You can use this app with contract ids that were deployed by the creators of this repo or you can use it with your own deployed contract ids.
If you are using not your contract ids some functions of the thanks/registry contracts will not work because they are set to work only if the owner called this functions.

<a href="https://github.com/Learn-NEAR/NCD.L1.sample--thanks/blob/66dc6fb42a62317f8ff31c9c9ab96a995f3edd78/src/thanks/assembly/index.ts#L57" target="_blank">Example of such  function:</a>
```
  summarize(): Contract {
    this.assert_owner()
    return this
  }

```

To deploy sample--thanks to your account visit <a href="https://github.com/Learn-NEAR/NCD.L1.sample--thanks/tree/registry" target="_blank">this repo (smart contract deployment instructions are inside):</a>

Also, you can watch this video :

<a href="https://www.loom.com/share/15692f40800a4686ad47af71e9368a3d" target="_blank">![image](https://user-images.githubusercontent.com/38455192/169353150-81bf6d02-1a9e-428b-88eb-23f3c2c14328.png)</a>

After you successfully deployed the registry and thanks contracts and you have contract ids, you can input them on a deployed <a href="sample-thanks.onrender.com/" target="_blank">website </a> or you can clone the repo and put contract ids inside ``` src/environments/environment.ts ``` file :

```
CONTRACT_ID = "put your thanks contract id here"
REGISTRY_CONTRACT_ID="put your registry contract id here"
...
```

After you input your values inside environment.ts file, you need to :
1. Install Angular CLI (if previously you didn't)
```
npm i -g @angular/cli
```

2. Install all dependencies
```
npm i
```
3. Run the project locally
```
npm run serve
```

Other commands:

Compiles and minifies for production
```
npm run build
```
Lints and fixes files
```
npm run lint
```

## 👀 Code walkthrough for Near university students

### -- Contract's --

To work with thanks, and registry, contracts were separated inside ``` src/app/services/near.service.ts```.
```
  getThanksContract() {
    return new Contract(
      this.wallet.account(), // the account object that is connecting
      environment.CONTRACT_ID, // name of contract you're connecting to
      {
        viewMethods: ['get_owner'], // view methods do not change state but usually return a value
        changeMethods: ['say', 'list', 'summarize', 'transfer'] // change methods modify state
      }
    )
  }

  getRegistryContract() {
    return new Contract(
      this.wallet.account(), // the account object that is connecting
      environment.REGISTRY_CONTRACT_ID, // name of contract you're connecting to
      {
        viewMethods: ["list_all", "is_registered"], // view methods do not change state but usually return a value
        changeMethods: ['register'] // change methods modify state
      }
    )
  }
```

### -- Main Service --

<a href="" >Code walk-through video | TBA |</a>

We are using ```near-api-js``` to work with NEAR blockchain. In ``` src/app/services/near.service.ts ``` we are importing classes, functions, and configs which we are going to use:
```
import { keyStores, Near, Contract, utils, WalletConnection } from "near-api-js";
```

The class contains two variables
```
public near: Near;
public wallet: WalletConnection;
```

Then in ``` constructor() ``` we are connecting to NEAR:
```
this.near = new Near({
  networkId: environment.NETWORK_ID,
  keyStore: new keyStores.BrowserLocalStorageKeyStore(),
  nodeUrl: environment.NODE_URL,
  walletUrl: environment.WALLET_URL,
  headers: {}
});
``` 
and creating wallet connection
```
// create wallet connection
this.wallet = new WalletConnection(this.near, "thankyou");
```

### -- ThankYou Service --

``` src/app/services/thank-you.service.ts ``` represents the main container for the functionality needed in the app

We use that class to store all shared data and functions:
```
  public recipients: any;
  public messages: any;
  public err: any;
  
  updateValues() {...};
  handleSendMessage() {...};
  handleTransfer() {...};
  updateMessages() {...};
```

With dependency injection, we can share everything with other components. ``` src/app/components/message-form.component.ts ``` as an example :
```
  constructor(public thankYouService: ThankYouService) {}

  handleSubmit() {
    this.loading = true;

    await this.thankYouService.handleSendMessage({
      message: this.message,
      anonymous: this.anonymous,
      attachedDeposit: this.attachedDeposit
    });
    await this.thankYouService.updateMessages();
    this.loading = false;
  }

  handleTransfer() {
    this.loading = true;

    await this.thankYouService.handleTransfer();

    this.loading = false;
  }
```

### -- Login Component --
``` src/app/components/login/login.component.ts ``` Contain all logic related to user AUTH functionality.

Inside that class, you can find ```signIn()``` and ```signOut()``` functions of wallet object.

``` login.component.ts ``` functions code :
```
signIn() {
  this.nearService.wallet.requestSignIn(environment.CONTRACT_ID);
}

signOut() {
  this.nearService.wallet.signOut();
  localStorage.removeItem(`near-api-js:keystore:${this.accountId}:testnet`);
  this.accountId = this.nearService.wallet.getAccountId()
}
```

## Examples
### - Function | No Parameters -
``` src/app/services/near.service.ts ```
```
// function to get all messages from thanks contract
getMessages() {
  return await thanksContract.list()
}
```

### - Function | With Parameters -
```
  // function to send a message anon or not anon
  sendMessage({message, anonymous, attachedDeposit}: { message: any, anonymous: any, attachedDeposit: any }) {
    attachedDeposit = utils.format.parseNearAmount(attachedDeposit) ?? utils.format.parseNearAmount("0");

    return this.thanksContract.say(
      { anonymous: anonymous, message: message },
      environment.GAS, 
      attachedDeposit
    )
  }
```
