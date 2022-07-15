import { Component } from '@angular/core';
import {HeroIconName} from "ng-heroicon";

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent {
  public transferFeatures = [
    {
      id: 1,
      name: 'Attach a custom message',
      description:
        'Attach any message to your expression of gratitude.  You can say thanks any way you like as long as it\'s under 500 characters :)',
      icon: 'annotation' as HeroIconName,
    },
    {
      id: 2,
      name: 'Attach a tip using native NEAR tokens ',
      description:
        'Because money is native to blockchain, you can add a tip to your message of gratitude, up to 5 NEAR',
      icon: 'lightning-bolt' as HeroIconName,
    },
  ]

  constructor() { }
}
