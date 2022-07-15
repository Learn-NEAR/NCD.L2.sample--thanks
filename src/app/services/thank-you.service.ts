import {Injectable} from '@angular/core';
import {NearService} from "./near.service";
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ThankYouService {
  public isOwner: boolean = false;
  public isUpdated: boolean = false;
  public isLoading: any;
  public recipients: any;
  public messages: any;
  public err: any;
  public isUpdatedChanged: Subject<boolean> = new Subject<boolean>();

  constructor(public nearService: NearService) {
    this.updateValues();
    this.isUpdatedChanged.subscribe((value) => {
      this.isUpdated = value;
    })
  }

  async updateValues() {
    this.recipients = await this.nearService.getRecipients();
    this.isOwner = this.nearService.wallet.getAccountId() === await this.nearService.getOwner()
    await this.updateMessages();
  };

  async handleSendMessage({message, anonymous, attachedDeposit}: { message: any, anonymous: any, attachedDeposit: any }) {
    await this.nearService.sendMessage({message, anonymous, attachedDeposit});
    await this.toggleIsUpdated();
  };

  async handleTransfer() {
    await this.nearService.transfer();
    await this.toggleIsUpdated();
  }

  async updateMessages() {
    if (this.isOwner) {
      this.messages = await this.nearService.getMessages();
      this.messages.reverse();
    }
  }

  async toggleIsUpdated() {
    this.isUpdatedChanged.next(!this.isUpdated);
  }
}
