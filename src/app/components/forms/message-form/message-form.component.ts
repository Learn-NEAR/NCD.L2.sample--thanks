import {Component} from '@angular/core';
import {ThankYouService} from "../../../services/thank-you.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-message-form',
  templateUrl: './message-form.component.html',
  styleUrls: ['./message-form.component.css']
})
export class MessageFormComponent {
  public loading = false;
  public anonymous = false;
  public attachedDeposit: any;
  public message = '';
  public recipient:any = null;


  constructor(public thankYouService: ThankYouService, private toastr: ToastrService) {
  }

  async handleSubmit() {
    this.loading = true;

    try {
      if (this.message === '') { throw new Error('Message length cannot be 0'); }

      await this.thankYouService.handleSendMessage({
        message: this.message,
        anonymous: this.anonymous,
        attachedDeposit: this.attachedDeposit ? String(this.attachedDeposit) : 0,
      });
      await this.thankYouService.updateMessages();
    } catch (e: any) {
      let message = this.thankYouService.err = e.kind ? e?.kind?.ExecutionError : e.message
      this.toastr.error(message.length > 26 ? message.slice(0, message.match(', filename').index) : message);
    }

    this.loading = false;
  }

  async handleTransfer() {
    this.loading = true;

    await this.thankYouService.handleTransfer();

    this.loading = false;
  }

  async recipientChange(recipient: any) {
    this.recipient = recipient.value;
  }

  formatDeposit() {
    this.attachedDeposit = (this.attachedDeposit as string).replace(',', '.');
    this.attachedDeposit = this.attachedDeposit > 0 ? (this.attachedDeposit < 5 ? this.attachedDeposit : 5) : 0;
  }
}
