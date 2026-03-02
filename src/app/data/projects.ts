import urbanPulseImg from 'figma:asset/8b4981ad0954bf99960bbdc332e6380071747c7c.png';
import roamReadyImg from 'figma:asset/e57a2409c31c37697b94bfe7679a74bba8499828.png';
import atheniaImg from 'figma:asset/f770d085c37622200284ddcad2810a1171e4afb4.png';
import stateOfGraceImg from 'figma:asset/67975d8c71f047d97a0add9e66dae9761b968565.png';

export interface Project {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  category: string;
  imageUrl: string;
  createdAt: string;
}

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'UrbanPulse',
    description: 'UrbanPulse is a mobile UX concept designed to help users discover nightlife events and connect with others who share similar social interests.',
    fullDescription: 'Overview: UrbanPulse is a mobile UX concept designed to help users discover nightlife events and connect with others who share similar social interests.\n\nProblem: Young adults often struggle to find safe, relevant nightlife experiences or meet people with similar interests conveniently.\n\nProcess: I created user personas, interaction flows, and mobile UI screens focused on clarity, safety, and engagement. The design emphasizes intuitive navigation, profile interaction, and real-time social discovery.\n\nSolution & Impact: UrbanPulse demonstrates my ability to design socially driven digital experiences that prioritize usability, community connection, and modern mobile UX patterns.',
    category: 'Mobile Design',
    imageUrl: urbanPulseImg,
    createdAt: '2024-10-15'
  },
  {
    id: '2',
    title: 'RoamReady',
    description: 'RoamReady is a responsive travel itinerary planning website designed to help users easily search destinations, organize trips, and manage personal travel details.',
    fullDescription: 'Overview: RoamReady is a responsive travel itinerary planning website designed to help users easily search destinations, organize trips, and manage personal travel details in one streamlined platform.\n\nProblem: Many travel planning tools are cluttered, difficult to navigate, or lack personalization, making it hard for users to efficiently organize their trips.\n\nProcess: I designed the interface structure, user flows, and responsive layouts using HTML, CSS, JavaScript, PHP, and MySQL. I focused on usability, accessibility, and clear navigation while implementing interactive features such as destination search, itinerary creation, and account management.\n\nSolution & Impact: The final product delivers a clean, user-centered planning experience that simplifies trip organization and demonstrates my ability to design and build full-stack, interactive digital products.',
    category: 'Web Development',
    imageUrl: roamReadyImg,
    createdAt: '2025-02-20'
  },
  {
    id: '3',
    title: 'Athenia Bar and Lounge',
    description: 'Athenia is a modern lesbian-centered bar concept in Bangkok designed to create a safe, elegant, and welcoming nightlife experience.',
    fullDescription: 'Overview: Athenia is a modern lesbian-centered bar concept in Bangkok designed to create a safe, elegant, and welcoming nightlife experience through cohesive branding, spatial atmosphere, and community-focused design.\n\nProblem: Many nightlife environments lack intentional design for queer women, often feeling exclusionary or disconnected from community needs, highlighting the need for a space centered on safety, inclusivity, and emotional comfort.\n\nProcess: I conducted research on LGBTQ+ nightlife gaps, developed the brand voice "Sip, smile. Stay awhile.", created a refined color palette of velvet, black, and gold, and planned the visual identity and experiential elements to support comfort, connection, and long-term sustainability.\n\nSolution & Impact: The final concept demonstrates my ability to apply UX thinking beyond digital products, combining inclusive brand strategy, emotional experience design, and real-world business considerations to create a meaningful community-focused space.',
    category: 'Brand Design',
    imageUrl: atheniaImg,
    createdAt: '2025-12-01'
  },
  {
    id: '4',
    title: 'CEHC State of Grace Event',
    description: 'A collection of branded event posters and promotional graphics created to communicate information clearly while maintaining a strong visual appeal.',
    fullDescription: 'Overview: A collection of branded event posters and promotional graphics created to communicate information clearly while maintaining a strong visual appeal.\n\nProblem: Event marketing materials must quickly capture attention while remaining readable and brand-consistent.\n\nProcess: I applied typography hierarchy, color theory, and layout balance to design engaging visuals optimized for digital sharing and audience engagement.\n\nSolution & Impact: These works highlight my graphic design foundation and ability to translate messaging into compelling visual storytelling.',
    category: 'Graphic Design',
    imageUrl: stateOfGraceImg,
    createdAt: '2025-11-24'
  }
];
