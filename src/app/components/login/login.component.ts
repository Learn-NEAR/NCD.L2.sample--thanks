import {Component, OnInit} from '@angular/core';
import {environment} from "../../../environments/environment";
import { ThankYouService } from "../../services/thank-you.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public accountId: any;

  constructor(public thankYouService: ThankYouService) {
  }

  ngOnInit(): void {
    this.accountId = this.thankYouService.nearService.wallet.getAccountId();
  }

  signIn() {
    this.thankYouService.nearService.wallet.requestSignIn(environment.CONTRACT_ID);
  }

  signOut() {
    this.thankYouService.nearService.wallet.signOut();
    localStorage.removeItem(`near-api-js:keystore:${this.accountId}:testnet`);
    this.accountId = undefined;
    this.thankYouService.isOwner = false;
  }
}
