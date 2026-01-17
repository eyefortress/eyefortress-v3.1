
import { PlaceHolderImages, type ImagePlaceholder } from './placeholder-images';

export type ProjectCategory = 'Commercial' | 'Public Sector' | 'Industrial' | 'Residential';

export interface Project {
  id: string;
  name: string;
  category: ProjectCategory;
  date: string; // YYYY-MM-DD
  description: string;
  image: ImagePlaceholder;
  solution: string;
}

const getImage = (id: string) => {
    const image = PlaceHolderImages.find(img => img.id === id);
    if (!image) {
        throw new Error(`Image with id ${id} not found.`);
    }
    return image;
}

export const projects: Project[] = [
  {
    id: 'proj-001',
    name: 'Corporate HQ Security Overhaul',
    category: 'Commercial',
    date: '2023-10-15',
    description: 'A complete overhaul of the access control and surveillance systems for a Fortune 500 company\'s headquarters. Deployed over 200 AI-powered cameras and biometric scanners.',
    image: getImage('project-corporate-hq'),
    solution: 'Sentinel Pro',
  },
  {
    id: 'proj-002',
    name: 'City-Wide Smart Surveillance',
    category: 'Public Sector',
    date: '2023-08-20',
    description: 'Partnered with a major metropolitan area to deploy a network of smart cameras for traffic monitoring and public safety. Reduced incident response time by 30%.',
    image: getImage('project-city-surveillance'),
    solution: 'Guardian 360',
  },
  {
    id: 'proj-003',
    name: 'Industrial Plant Monitoring',
    category: 'Industrial',
    date: '2022-11-05',
    description: 'Implemented a robust surveillance system for a large-scale manufacturing plant, including perimeter protection and monitoring of critical machinery.',
    image: getImage('project-industrial-plant'),
    solution: 'Guardian 360',
  },
  {
    id: 'proj-004',
    name: 'Luxury Smart Home Integration',
    category: 'Residential',
    date: '2024-01-25',
    description: 'A fully integrated security solution for a luxury residence, featuring smart locks, AI cameras, and a centralized control system via our Aegis Home platform.',
    image: getImage('project-smart-home'),
    solution: 'Aegis Home',
  },
  {
    id: 'proj-005',
    name: 'Retail Chain Loss Prevention',
    category: 'Commercial',
    date: '2023-05-12',
    description: 'Deployed advanced analytics to a chain of retail stores to identify and reduce shrinkage, resulting in a 15% decrease in losses.',
    image: getImage('project-corporate-hq'),
    solution: 'Sentinel Pro',
  },
  {
    id: 'proj-006',
    name: 'Smart Residential Complex',
    category: 'Residential',
    date: '2022-09-30',
    description: 'Provided a comprehensive security package for a new residential complex, including video door phones, boom barriers, and community-wide surveillance.',
    image: getImage('project-smart-home'),
    solution: 'Aegis Home',
  }
];

export const projectCategories: ProjectCategory[] = [
    'Commercial',
    'Public Sector',
    'Industrial',
    'Residential'
];
