#  🎓 NCD.L2.sample--thanks dapp
This repository contains a complete frontend applications (React) to work with 
<a href="https://github.com/Learn-NEAR/NCD.L1.sample--thanks" target="_blank">NCD.L1.sample--thanks smart contract</a> targeting the NEAR platform:
1. React (master branch)

The goal of this repository is to make it as easy as possible to get started writing frontend with React for AssemblyScript contracts built to work with NEAR Protocol.

## DEMO:
<a href="https://sample-thanks.onrender.com/" target="_blank">Open demo</a>

## ⚠️ Warning
Any content produced by NEAR, or developer resources that NEAR provides, are for educational and inspiration purposes only. NEAR does not encourage, induce or sanction the deployment of any such applications in violation of applicable laws or regulations.


## ⚡  Usage
Right now I sent PR to NCD.L1.sample--thanks with version of contract which will work with this frontend: 
<a href="https://github.com/Learn-NEAR/NCD.L1.sample--thanks/pull/7/commits/7393471f09499dfd72cee6b9a8c36279953adfbd" target="_blank">code</a> after this line will be removed

Owner view

![image](https://user-images.githubusercontent.com/38455192/169348821-a191c98b-c1ab-4580-811c-d91baaf21db4.png)

<a href="https://www.loom.com/share/da86b0536ee540a8b79d4e7c59f88b3a" target="_blank">UI walkthrough</a>

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
REACT_APP_CONTRACT_ID = "put your thanks contract id here"
REACT_APP_REGISTRY_CONTRACT_ID="put your registry contract id here"
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

<a href="https://www.loom.com/share/6019554fd4c24aef9bf032971452ec93" target="_blank">Code walkthrough video</a>

We are using ```near-api-js``` to work with NEAR blockchain. In ``` /services/near.js ``` we are importing classes, functions and configs which we are going to use:
```
import { keyStores, Near, Contract, WalletConnection, utils } from "near-api-js";
```
Then we are connecting to NEAR:
```
// connecting to NEAR, new NEAR is being used here to avoid async/await
const near = new Near({
    networkId: process.env.VUE_APP_networkId,
    keyStore: new keyStores.BrowserLocalStorageKeyStore(),
    nodeUrl: process.env.VUE_APP_nodeUrl,
    walletUrl: process.env.VUE_APP_walletUrl,
});

``` 
and creating wallet connection
```
export const wallet = () => new WalletConnection(near, localStorage.getItem('REGISTRY_CONTRACT_ID'));
```
After this by using API we can use ```wallet``` and call ```signIn()``` and ```signOut()``` functions of wallet object. By doing this, login functionality can now be used in any component. 

And also we in return statement we are returning wallet object, we are doing this to call ``` wallet.getAccountId()``` to show accountId in ``` /components/Login.jsx ```

```wallet``` code :
```
  await wallet().requestSignIn(contractId);
  wallet().getAccountId();
  wallet().signOut();
```

To work with smart thanks and registry smart contracts we are loading the contracts inside  ``` /services/near.js:```
```
export const thanksContract = () =>
  new Contract(wallet().account(), localStorage.getItem('CONTRACT_ID'), {
    viewMethods: ['get_owner'],
    changeMethods: ['list', 'transfer', 'summarize', 'say'],
    sender: wallet().account(),
  });

export const registryContract = () =>
  new Contract(wallet().account(), localStorage.getItem('REGISTRY_CONTRACT_ID'), {
    viewMethods: ['list_all'],
    changeMethods: [],
    sender: wallet().account(),
  });
```

and we are creating function to export for each contract function

example of a call with no params: 
```
//function to get all messages from thanks contract
export const getMessages = () => thanksContract().list();
```

example of call with params 
```
//function to send a message anon or not anon
export const sendMessage = ({ message, anonymous, attachedDeposit }) => {
  attachedDeposit = utils.format.parseNearAmount(attachedDeposit.toString());
  if (attachedDeposit) {
    return thanksContract().say({ message, anonymous }, gas, attachedDeposit);
  } else {
    return thanksContract().say({ message, anonymous });
  }
};

```

Then in ```context/ContractsProvider/index.jsx``` we are just state all global data and functions from ```services/near.js```:
For example in Login component
```
import { useContract } from '../../../context/ContractsProvider';

export const Login = ({ error, setApiError }) => {
  const {
    data: { contractId },
    user,
    setUser,
    signOut,
  } = useContract();
  ...
}
```

and using it to store some state of contracts and to call contracts functions: 
```
import React, { createContext, useContext, useState } from 'react';
import { wallet } from '../../services/near';

const DataContext = createContext();

export const ContractsProvider = ({ children }) => {
  const [data, setData] = useState({
    contractId: contract ?? defaultContractId,
    registryContractId: registryContract ?? defaultRegistryContractId,
  });

  const [user, setUser] = useState();

  const signOut = () => {
    wallet().signOut();
    localStorage.removeItem(`near-api-js:keystore:${user}:testnet`);
    setUser(null);
  };

  const setContracts = (contractId, registryContractId) => {
    contractId !== localStorage.getItem('CONTRACT_ID') && signOut();
    localStorage.setItem('CONTRACT_ID', contractId);
    registryContractId && localStorage.setItem('REGISTRY_CONTRACT_ID', registryContractId);
    setData({ registryContractId: registryContractId || data.registryContractId, contractId });
  };

  return <DataContext.Provider value={{ data, setContracts, user, setUser, signOut }}>{children}</DataContext.Provider>;
};

export const useContract = () => useContext(DataContext);

```

Inside ```/pages/HomePage.jsx``` we have lifecycle hook ``` useEffect() ``` where we are getting all the data from the smart contract
```
  const getData = useCallback(async () => {
    try {
      setRecipients(await getRecipients());
      setOwner(await getOwner());
    } catch (e) {
      setRecipients([]);
      setOwner('');
      setApiError(e);
      console.error(e);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contractId, registryContractId]);

  useEffect(() => {
    getData();
  }, [getData]);
```

And inside components we are using API request from ```services/near.js``` as an example :
```
  const { addToast } = useToasts();

  const [summarize, setSummarize] = useState(null);
  const [isLoadingSummarize, setLoadingSummarize] = useState(true);
  const [isLoadingTransfer, setLoadingTransfer] = useState(false);
  const [onTransfer, setOnTransfer] = useState(false);

  const handleTransfer = async () => {
    setLoadingTransfer(true);
    try {
      const res = await transfer();
      setOnTransfer(true);
      addToast(`Transfer success \n ${res}`, {
        appearance: 'success',
        autoDismiss: true,
        autoDismissTimeout: 30000,
      });
    } catch (error) {
      const errorMessage = error?.kind?.ExecutionError;
      addToast(errorMessage.slice(0, errorMessage.match(/, filename/).index), {
        appearance: 'error',
        autoDismiss: true,
        autoDismissTimeout: 30000,
      });
    }
    setLoadingTransfer(false);
  };

  const getData = async () => {
    setLoadingSummarize(true);
    try {
      const res = await getSummarize();
      setSummarize(Object.entries(res?.contributions));
    } catch (error) {
      console.log(error);
    }
    setLoadingSummarize(false);
  };

  useEffect(() => {
    user && owner === user && getData();
  }, [owner, user, contractId, registryContractId, onTransfer]);
```
