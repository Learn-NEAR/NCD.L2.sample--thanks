import { AnnotationIcon, LightningBoltIcon, AcademicCapIcon, DesktopComputerIcon } from '@heroicons/vue/outline';

export const transferFeatures = [
  {
    id: 1,
    name: 'Attach a custom message',
    description:
      "Attach any message to your expression of gratitude.  You can say thanks any way you like as long as it's under 500 characters :)",
    icon: AnnotationIcon,
  },
  {
    id: 2,
    name: 'Attach a tip using native NEAR tokens ',
    description: 'Because money is native to blockchain, you can add a tip to your message of gratitude, up to 5 NEAR',
    icon: LightningBoltIcon,
  },
];

export const mockDonatesHistory = [
  {
    id: 1,
    sender: 'jane.near',
    text: 'Thanks for helping me with my first smart contract!',
    contribution: 2000000000000000000000000,
  },
  {
    id: 2,
    sender: 'john.near',
    text: 'Appreciate your questions in the Zoom meeting',
    contribution: 0,
  },
  {
    id: 3,
    sender: 'mary.near',
    text: 'Loved your examples today, thank you!!!',
    contribution: 10000000000000000000000000,
  },
  {
    id: 4,
    sender: '',
    text: "You're so awesome",
    contribution: 0,
  },
];

export const communicationFeatures = [
  {
    id: 1,
    name: 'Self-paced Courses',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
    icon: DesktopComputerIcon,
  },
  {
    id: 2,
    name: 'Certifications and Awards',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
    icon: AcademicCapIcon,
  },
];