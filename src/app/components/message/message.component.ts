import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent {
  @Input() message: any = {};

  constructor() {
  }

  getAmount(tip: number) {
    return tip == 0 ? tip + " N" : (tip / 1000000000000000000000000).toFixed(4) + " N"
  }
}
