
export type Solution = {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  themeColor: string;
  mode: string;
  frameCount: number;
  imageSeed: string;
  imageUrl: string;
};

export const solutions: Solution[] = [
  {
    id: 'sentinel-pro',
    name: 'Sentinel Pro',
    subtitle: 'AI-Powered Urban Threat Detection',
    description: 'Leveraging advanced AI analytics, Sentinel Pro autonomously identifies, tracks, and alerts on potential threats in dense urban landscapes, ensuring public safety with unmatched precision.',
    themeColor: '#ef4444', // red-500
    mode: 'Urban Security',
    frameCount: 50,
    imageSeed: 'sentinel-cam',
    imageUrl: 'https://images.unsplash.com/photo-1565591452825-67d6b7df1d47?q=80&w=1026&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 'guardian-360',
    name: 'Guardian 360',
    subtitle: 'Comprehensive Industrial Site Overwatch',
    description: 'Engineered for sprawling industrial complexes, Guardian 360 offers a persistent 360-degree surveillance shield, eliminating blind spots and enables immediate, intelligent incident response to protect critical infrastructure.',
    themeColor: '#f97316', // orange-500
    mode: 'Industrial Monitoring',
    frameCount: 50,
    imageSeed: 'guardian-cam',
    imageUrl: 'https://images.unsplash.com/photo-1549109926-58f039549485?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 'aegis-home',
    name: 'Aegis Home',
    subtitle: 'Intelligent Residential Security',
    description: 'Aegis Home integrates seamlessly into your smart home, providing cutting-edge facial recognition, package detection, and behavioral analysis for proactive protection and ultimate peace of mind.',
    themeColor: '#10b981', // emerald-500
    mode: 'Residential Protection',
    frameCount: 50,
    imageSeed: 'aegis-cam',
    imageUrl: 'https://images.unsplash.com/photo-1669049515499-41f9cf5dd792?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
];

