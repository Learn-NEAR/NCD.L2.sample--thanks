import BN from 'bn.js';
import { keyStores, Near, WalletConnection, utils, Contract } from 'near-api-js';

const gas = new BN('70000000000000');

// new NEAR is using  here to  avoid  async/await
export const near = new Near({
  networkId: 'testnet',
  keyStore: new keyStores.BrowserLocalStorageKeyStore(),
  nodeUrl: 'https://rpc.testnet.near.org',
  walletUrl: 'https://wallet.testnet.near.org',
});

export const wallet = () => new WalletConnection(near, localStorage.getItem('REGISTRY_CONTRACT_ID'));

export const contract = () =>
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

//function to get all recipients from registry contract
export const getRecipients = () => registryContract().list_all();

//function to get all messages from thankyou contract
export const getMessages = () => contract().list();

export const getOwner = () => contract().get_owner();

export const getSummarize = () => contract().summarize();

//function to transfer funds to  owner
export const transfer = () => contract().transfer();

//function to sendMessage
export const sendMessage = ({ message, anonymous, attachedDeposit }) => {
  attachedDeposit = utils.format.parseNearAmount(attachedDeposit.toString());
  if (attachedDeposit) {
    return contract().say({ message, anonymous }, gas, attachedDeposit);
  } else {
    return contract().say({ message, anonymous });
  }
};
