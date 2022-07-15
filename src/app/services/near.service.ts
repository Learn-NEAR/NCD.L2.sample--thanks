import {Injectable} from '@angular/core';
import { Contract, keyStores, Near, utils, WalletConnection } from 'near-api-js';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class NearService {
  public near: Near;
  public wallet: WalletConnection;
  public thanksContract: any;
  public registryContract: any;

  constructor() {
    // connecting to NEAR
    this.near = new Near({
      networkId: environment.NETWORK_ID,
      keyStore: new keyStores.BrowserLocalStorageKeyStore(),
      nodeUrl: environment.NODE_URL,
      walletUrl: environment.WALLET_URL,
      headers: {}
    });

    // create wallet connection
    this.wallet = new WalletConnection(this.near, "thankyou");
    // get contracts
    this.thanksContract = this.getThanksContract()
    this.registryContract = this.getRegistryContract();
  }

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

  // --------------------------------------------------------------------------
  // functions to call contracts(Registry, Thanks) Public VIEW methods
  // --------------------------------------------------------------------------

  // functions to call REGISTRY contract public view methods
  // --------------------------------------------------------------------------

  // function to get all thanks contracts ids which were added to the registry contract
  async getRecipients() {
    return await this.registryContract.list_all();
  };

  async isRegistered(contractId: any) {
    return await this.registryContract.is_registered({ contract: contractId });
  }

  // functions to call THANKS contract public view methods
  // --------------------------------------------------------------------------

  // function to get owner of a thanks contract
  async getOwner() {
    return await this.thanksContract.get_owner();
  }

  // --------------------------------------------------------------------------
  // functions to call contracts(Registry, Thanks) Public CHANGE methods
  // --------------------------------------------------------------------------

  // functions to call THANKS contract public change methods
  // --------------------------------------------------------------------------

  // function to send a message anon or not anon
  sendMessage({message, anonymous, attachedDeposit}: { message: any, anonymous: any, attachedDeposit: any }) {
    attachedDeposit = utils.format.parseNearAmount(attachedDeposit) ?? utils.format.parseNearAmount("0");

    return this.thanksContract.say(
      { anonymous: anonymous, message: message },
      environment.GAS,
      attachedDeposit
    )
  }

  // --------------------------------------------------------------------------
  // functions to call contracts(Registry, Thanks) Owner CHANGE methods
  // --------------------------------------------------------------------------

  // function to get all messages from thanks contract
  async getMessages() {
    return await this.thanksContract.list();
  }

  // function to get summarized info about thanks contract
  async getSummarizedInfo() {
    return await this.thanksContract.summarize()
  }

  // function to transfer funds to  owner
  async transfer() {
    return await this.thanksContract.transfer()
  }
}
