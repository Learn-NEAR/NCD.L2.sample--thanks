import { Component } from '@angular/core';
import {HeroIconName} from "ng-heroicon";

@Component({
  selector: 'app-learn-section',
  templateUrl: './learn-section.component.html',
  styleUrls: ['./learn-section.component.css']
})
export class LearnSectionComponent {
  public communicationFeatures = [
    {
      id: 1,
      name: 'Self-paced Courses',
      description:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
      icon: 'desktop-computer' as HeroIconName,
    },
    {
      id: 2,
      name: 'Certifications and Awards',
      description:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
      icon: 'academic-cap' as HeroIconName,
    },
  ]
  constructor() { }

}
