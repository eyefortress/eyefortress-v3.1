import { PlaceHolderImages, type ImagePlaceholder } from './placeholder-images';

export interface Testimonial {
  id: string;
  name: string;
  title: string;
  company: string;
  quote: string;
  avatar: ImagePlaceholder;
}

const getAvatar = (id: string) => {
    const image = PlaceHolderImages.find(img => img.id === id);
    if (!image) {
        // A default fallback
        return PlaceHolderImages.find(img => img.id === 'avatar-1')!;
    }
    return image;
}

export const testimonials: Testimonial[] = [
    {
        id: 'testimonial-1',
        name: 'Rohan Sharma',
        title: 'Security Director',
        company: 'Apex Innovations Inc.',
        quote: "EyeFortress completely transformed our security infrastructure. The AI-powered analytics of the Sentinel Pro system are a game-changer. We've seen a 40% reduction in false alarms and our response time has never been faster. It's more than a camera system; it's true security intelligence.",
        avatar: getAvatar('avatar-1')
    },
    {
        id: 'testimonial-2',
        name: 'Priya Patel',
        title: 'Operations Manager',
        company: 'Starlight Manufacturing',
        quote: "The Guardian 360 solution gave us complete oversight of our 50-acre facility. The installation was seamless, and the command center software is incredibly intuitive. We now have eyes on every corner of the plant, which has significantly improved both safety and operational efficiency.",
        avatar: getAvatar('avatar-2')
    },
    {
        id: 'testimonial-3',
        name: 'Vikram Singh',
        title: 'Facility Manager',
        company: 'Quantum Logistics',
        quote: "We chose EyeFortress for their robust hardware and stellar reputation. The integration with our existing access control was flawless. The image quality is exceptional, even in low light, which is critical for our 24/7 operations. Their support team is also top-notch.",
        avatar: getAvatar('avatar-3')
    },
    {
        id: 'testimonial-4',
        name: 'Ananya Gupta',
        title: 'Homeowner',
        company: 'The Oakwood Estates',
        quote: "The Aegis Home system has given my family incredible peace of mind. The mobile app is so easy to use, and features like package detection are genuinely useful every day. It feels like we have a personal security guard watching over our home. I couldn't be happier.",
        avatar: getAvatar('avatar-4')
    },
    {
        id: 'testimonial-5',
        name: 'Arjun Kumar',
        title: 'IT Infrastructure Head',
        company: 'DataCorp',
        quote: "The biometric access control systems are phenomenal. Fast, reliable, and the audit trail is incredibly detailed. EyeFortress has significantly hardened our physical security posture for our data centers.",
        avatar: getAvatar('avatar-5')
    },
    {
        id: 'testimonial-6',
        name: 'Sania Mirza',
        title: 'Lead Architect',
        company: 'Horizon Designs',
        quote: "We now specify EyeFortress for all our high-end residential projects. The Aegis Home system is sleek, powerful, and integrates beautifully with modern smart home ecosystems. Our clients love it.",
        avatar: getAvatar('avatar-6')
    },
    {
        id: 'testimonial-7',
        name: 'Raj Malhotra',
        title: 'Franchise Owner',
        company: 'The Daily Grind Coffee',
        quote: "As a multi-location business, being able to monitor all my stores from a single app is invaluable. The Sentinel Pro's AI helps us understand customer flow while preventing loss. It's a fantastic dual-purpose tool.",
        avatar: getAvatar('avatar-7')
    },
    {
        id: 'testimonial-8',
        name: 'Aisha Khan',
        title: 'Urban Planning Dept.',
        company: 'City of Northgate',
        quote: "The Guardian 360 cameras were instrumental in our 'Smart City' initiative. The data they provide goes beyond security, helping us with traffic management and public space utilization. A true partnership.",
        avatar: getAvatar('avatar-8')
    },
    {
        id: 'testimonial-9',
        name: 'Ishan Verma',
        title: 'Project Engineer',
        company: 'InnoConstruct',
        quote: "EyeFortress provided a durable, all-weather surveillance solution for our remote construction site. The cameras have held up in extreme conditions and have been critical for site security and project monitoring.",
        avatar: getAvatar('avatar-9')
    },
    {
        id: 'testimonial-10',
        name: 'Aditya Mehta',
        title: 'COO',
        company: 'Global Shipping Co.',
        quote: "Their team's expertise is unmatched. They designed a custom solution for our port facility that has drastically reduced unauthorized access and improved our compliance with maritime security regulations.",
        avatar: getAvatar('avatar-10')
    }
];

    
