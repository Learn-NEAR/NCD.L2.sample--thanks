#  🎓 NCD.L2.sample--thanks dapp
This repository contains a complete frontend applications (Vue.js, React, Angular) to work with 
<a href="https://github.com/Learn-NEAR/NCD.L1.sample--thanks" target="_blank">NCD.L1.sample--thanks smart contract</a> targeting the NEAR platform:
1. Vue.Js (main branch)
2. React (react branch)
3. Angular (angular branch)

The goal of this repository is to make it as easy as possible to get started writing frontend with Vue.js, React and Angular for AssemblyScript contracts built to work with NEAR Protocol.


## ⚠️ Warning
Any content produced by NEAR, or developer resources that NEAR provides, are for educational and inspiration purposes only. NEAR does not encourage, induce or sanction the deployment of any such applications in violation of applicable laws or regulations.


## ⚡  Usage
Right now I sent PR to NCD.L1.sample--thanks with version of contract which will work with this frontend: 
<a href="https://github.com/Learn-NEAR/NCD.L1.sample--thanks/pull/7/commits/7393471f09499dfd72cee6b9a8c36279953adfbd" target="_blank">code</a> after this line will be removed

Owner view

![image](https://user-images.githubusercontent.com/38455192/169348821-a191c98b-c1ab-4580-811c-d91baaf21db4.png)

UI walkthrough
<a href="https://www.loom.com/share/da86b0536ee540a8b79d4e7c59f88b3a" target="_blank">![image](https://user-images.githubusercontent.com/38455192/179209812-21dda94f-504f-4f87-bf7b-371cb9f1140b.png)</a>

You can use this app with contract ids which were deployed by the creators of this repo or you can use it with your own deployed contract ids.
If you are using not yours contract ids some functions of the thanks/registry contracts will not work because they are set to work only if owner called this  functions.

<a href="https://github.com/Learn-NEAR/NCD.L1.sample--thanks/blob/66dc6fb42a62317f8ff31c9c9ab96a995f3edd78/src/thanks/assembly/index.ts#L57" target="_blank">Example of such  function:</a>
```
  summarize(): Contract {
    this.assert_owner()
    return this
  }

```

To deploy sample--thanks to your account visit <a href="https://github.com/Learn-NEAR/NCD.L1.sample--thanks/tree/registry" target="_blank">this repo (smart contract deployment instructions are inside):</a> 

Also you can watch this video : 

<a href="https://www.loom.com/share/15692f40800a4686ad47af71e9368a3d" target="_blank">![image](https://user-images.githubusercontent.com/38455192/169353150-81bf6d02-1a9e-428b-88eb-23f3c2c14328.png)</a>

After you successfully deployed registry and thanks contracts and you have contract ids, you can input them on a deployed <a href="sample-thanks.onrender.com/" target="_blank">website </a> or you can clone the repo and put contract ids inside .env file :

```
VUE_APP_THANKS_CONTRACT_ID = "put your thanks contract id here"
VUE_APP_REGISTRY_CONTRACT_ID="put your registry contract id here"
...
```

After you input your values inside .env file, you need to :
1. Install all dependencies 
```
npm install
```
or
```
yarn
```
2. Run the project locally
```
npm run serve
```
or 
```
yarn serve
```

Other commands:

Compiles and minifies for production
```
npm run build
```
or
```
yarn build
```
Lints and fixes files
```
npm run lint
```
or
```
yarn lint
```

## 👀 Code walkthrough for Near university students

<a href="https://www.loom.com/share/0a7cc29f84fb4a33a691e0024ea125d7" target="_blank">Code walkthrough video</a>

We are using ```near-api-js``` to work with NEAR blockchain. In ``` /services/near.js ``` we are importing classes, functions and configs which we are going to use:
```
import { keyStores, Near, Contract, WalletConnection, utils } from "near-api-js";
```
Then we are connecting to NEAR:
```
// connecting to NEAR, new NEAR is being used here to awoid async/await
export const near = new Near({
    networkId: process.env.VUE_APP_networkId,
    keyStore: new keyStores.BrowserLocalStorageKeyStore(),
    nodeUrl: process.env.VUE_APP_nodeUrl,
    walletUrl: process.env.VUE_APP_walletUrl,
});

``` 
and creating wallet connection
```
export const wallet = new WalletConnection(near, "sample--Thanks--dapp");
```
After this by using Composition API we need to create ```useWallet()``` function and use inside ```signIn()``` and ```signOut()``` functions of wallet object. By doing this, login functionality can now be used in any component. 

And also we in return statement we are returning wallet object, we are doing this to call ``` wallet.getAccountId()``` to show accountId in ``` /components/Login.vue ```

``` useWallet()``` code :
```
export const useWallet = () => {

  const handleSignIn = () => {
    // redirects user to wallet to authorize your dApp
    // this creates an access key that will be stored in the browser's local storage
    // access key can then be used to connect to NEAR and sign transactions via keyStore
    wallet.requestSignIn({
      contractId: THANKS_CONTRACT_ID,
      methodNames: [] // add methods names to restrict access
    })
  }

  const handleSignOut = () => {
    wallet.signOut()
    accountId.value = wallet.getAccountId()
  }

  return {
    wallet,
    accountId,
    err,
    signIn: handleSignIn,
    signOut: handleSignOut
  };
};
```

To work with smart thanks and registry smart contracts we will create separate ```useContracts()``` function with Composition API to split the logic. We are loading the contracts inside  ``` /services/near.js:```
```
const thanksContract = getThanksContract()
const registryContract = getRegistryContract()

function getThanksContract() {
    return new Contract(
        wallet.account(), // the account object that is connecting
        THANKS_CONTRACT_ID, // name of contract you're connecting to
        {
            viewMethods: ['get_owner'], // view methods do not change state but usually return a value
            changeMethods: ['say', 'list', 'summarize', 'transfer'] // change methods modify state
        }
    )
}

function getRegistryContract() {
    return new Contract(
        wallet.account(), // the account object that is connecting
        REGISTRY_CONTRACT_ID, // name of contract you're connecting to
        {
            viewMethods: ["list_all", "is_registered"], // view methods do not change state but usually return a value
            changeMethods: ['register'] // change methods modify state
        }
    )
}
```

and we are creating function to export for each contract function

example of a call with no params: 
```
//function to get all messages from thanks contract
export const getMessages = async () => {
    return await thanksContract.list()
}
```

example of call with params 
```
//function to send a message anon or not anon
export const sendMessage = async ({ message, anonymous, attachedDeposit }) => {
    attachedDeposit = (utils.format.parseNearAmount(attachedDeposit.toString())) // converts yoctoNEAR (10^-24) amount into NEAR
    return await thanksContract.say(
        { anonymous: anonymous, message: message },
        gas,
        attachedDeposit
    )
}

```

Then in ```composables/near.js``` we are just importing all logic from ```services/near.js```: 
```
 import {
  wallet,
  THANKS_CONTRACT_ID,
  getRecipients,
  getOwner,
  isRegistered,
  sendMessage,
  getMessages,
  getSummarizedInfo,
  transferFundsToOwner
} from "../services/near";
```

and using it to store some state of contracts and to call contracts functions: 
```
const owner = ref(null)
const recipients = ref(null)
const isLoading = ref(false)
const isTransferingToOwner = ref(null)
const messages = ref(null)
const summarizedInfo = ref(null)
const err = ref(null)

export const useContracts = () => {

  const handleGetRecipients = () => {
    return getRecipients()
  }

  const handleGetSummarizedInfo = () => {
    return getSummarizedInfo()
  }

  const handleGetOwner = () => {
    return getOwner()
  }

  const fetchMessages = () => {
    return getMessages()
  }

  const handleSendMessage = ({ message, anonymous, attachedDeposit }) => {
    return sendMessage({ message, anonymous, attachedDeposit });
  };

  const handleTransfer = () => {
    return transferFundsToOwner();
  }

  return {
    isLoading,
    isTransferingToOwner,
    isRegistered,
    owner,
    err,
    getOwner: handleGetOwner,
    recipients,
    getRecipients: handleGetRecipients,
    messages,
    getMessages: fetchMessages,
    summarizedInfo,
    getSummarizedInfo: handleGetSummarizedInfo,
    sendMessage: handleSendMessage,
    transferFunds: handleTransfer
  };
};
```

Inside ```/views/Home.vue``` we have lifecycle hook ``` onBeforeMount() ``` where we are getting all the data from the smart contract with ``` useWallet()``` and ``` useContracts()``` functions
```
setup() {
      const { accountId } = useWallet()
      const { getOwner, owner, messages, getMessages, recipients, getRecipients, summarizedInfo, getSummarizedInfo} = useContracts()

      onBeforeMount(async () => {
          accountId.value = await wallet.getAccountId()
          owner.value = await getOwner()
          recipients.value = await getRecipients()
          messages.value = mockDonatesHistory
          if (owner.value == accountId.value) {
              messages.value = await getMessages()
              summarizedInfo.value = await getSummarizedInfo()
            } 
      })

      watch(accountId, async ()=>{
        if (owner.value == accountId.value) {
            messages.value = await getMessages()
            return
        }
        messages.value = mockDonatesHistory
      }, {deep:true})
      
      return {
          accountId,
          getOwner,
          owner,
          messages,
          getMessages,
          recipients,
          getRecipients,
          summarizedInfo,
          getSummarizedInfo
      }
  }
}
```

And inside components we are using the same ``` useWallet()``` and ``` useContracts()``` functions to manage state of dapp. ``` /components/Summarize.vue ``` as an example :
```
    setup() {
        const { transferFunds, summarizedInfo, getSummarizedInfo } = useContracts()
        const isTransferingToOwner = ref(false)
        const onTransfer = ref(false)
        const toast = useToast()

        async function handleTransfer() {
            try {
                isTransferingToOwner.value = true
                await transferFunds()
                toast.success(`Transfer success`)
                onTransfer.value = true
            } catch (error) {
                const errorMessage = error?.kind?.ExecutionError
                toast.error(errorMessage.slice(0, errorMessage.match(', filename').index))
            }
            isTransferingToOwner.value = false
        }

        watch(onTransfer, async () => {
            if (onTransfer.value) {
                summarizedInfo.value = await getSummarizedInfo()
                onTransfer.value = false
            }
        }, { deep: true })

        return {
            isTransferingToOwner,
            handleTransfer,
            summarizedInfo,
            getSummarizedInfo,
            utils
        }
    }
```
