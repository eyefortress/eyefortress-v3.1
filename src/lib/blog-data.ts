
import { type ImagePlaceholder, PlaceHolderImages } from './placeholder-images';

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // YYYY-MM-DD
  image: ImagePlaceholder;
  structuredContent: {
    type: 'heading' | 'paragraph' | 'list';
    content: string | string[];
  }[];

}

const getImage = (id: string) => {
    const image = PlaceHolderImages.find(img => img.id === id);
    if (!image) {
        return PlaceHolderImages.find(img => img.id === 'contact-bg')!;
    }
    return image;
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'cctv-guide-ip-vs-ahd-nvr-vs-dvr',
    title: 'The Ultimate Guide to Choosing a CCTV System',
    excerpt: 'IP vs AHD, NVR vs DVR, and storage requirements explained. Your complete guide to building the perfect surveillance solution for your home, shop, or business.',
    date: '2024-07-26',
    image: getImage('project-city-surveillance'),
    structuredContent: [
        {
            type: 'paragraph',
            content: 'Choosing the right CCTV system is one of the most critical security decisions you can make. With a dizzying array of acronyms and technologies, it can be tough to know where to start. This guide will demystify the key components, helping you build a surveillance solution that’s perfectly tailored to your needs and budget, whether for a home, a small shop, or a large enterprise.'
        },
        {
            type: 'heading',
            content: 'Part 1: The Cameras — AHD vs. IP'
        },
        {
            type: 'paragraph',
            content: 'The first major choice is the camera technology itself. The two dominant types on the market today are Analog High Definition (AHD) and Internet Protocol (IP).'
        },
        {
            type: 'heading',
            content: 'Analog HD (AHD) Cameras'
        },
        {
            type: 'paragraph',
            content: 'AHD cameras are the modern successors to traditional analog CCTV. They can transmit high-definition video (up to 5MP in our range) over standard coaxial cables, the same type used by older analog systems.'
        },
        {
            type: 'list',
            content: [
                '**Advantages:** Generally have a lower upfront cost and are very easy to install, especially when upgrading an existing analog system as you can reuse the coaxial cabling.',
                '**Disadvantages:** Resolution tops out lower than high-end IP cameras. They are more susceptible to signal interference over long distances and offer fewer advanced features.',
                '**Pricing:** More budget-friendly, making them an excellent entry-point into HD surveillance.',
                '**Who should use them?** Homeowners, small retail shops, and anyone on a tight budget or looking for a straightforward upgrade from an old analog setup.'
            ]
        },
        {
            type: 'heading',
            content: 'Internet Protocol (IP) Cameras'
        },
        {
            type: 'paragraph',
            content: 'IP cameras are fully digital devices that transmit data over a network, just like a computer. This allows for much higher resolutions and a host of advanced capabilities.'
        },
        {
            type: 'list',
            content: [
                '**Advantages:** Superior image quality with resolutions up to 8MP (4K) and beyond. They support advanced features like AI-powered analytics, two-way audio, and can be powered over the same Ethernet cable that carries data (PoE - Power over Ethernet), simplifying installation.',
                '**Disadvantages:** Higher initial cost per camera and may require some basic networking knowledge for setup.',
                '**Pricing:** More expensive than AHD, but offer significantly more functionality.',
                '**Who should use them?** Businesses, malls, industrial sites, and anyone who needs crystal-clear detail, scalability, and intelligent features like person detection or vehicle tracking.'
            ]
        },
        {
            type: 'heading',
            content: 'Part 2: The Recorder — DVR vs. NVR'
        },
        {
            type: 'paragraph',
            content: 'Your cameras need a central brain to record and manage footage. This is either a DVR or an NVR, and your choice is directly tied to your choice of camera.'
        },
        {
            type: 'list',
            content: [
                '**DVR (Digital Video Recorder):** DVRs are paired with AHD cameras. They receive the analog signal from the camera via a coaxial cable and then encode it for digital storage.',
                '**NVR (Network Video Recorder):** NVRs are paired with IP cameras. They receive a digital stream directly from the cameras over the network. Since IP cameras handle their own video encoding, the NVR is primarily for storage and management.'
            ]
        },
        {
            type: 'paragraph',
            content: 'The simple rule is: **AHD cameras use DVRs; IP cameras use NVRs.** Our hybrid DVRs can support a mix, offering a flexible upgrade path.'
        },
        {
            type: 'heading',
            content: 'Part 3: Calculating Your Storage Needs'
        },
        {
            type: 'paragraph',
            content: 'How much hard drive space do you need? This is a crucial question to avoid running out of storage when you need footage the most. The primary factors are:'
        },
        {
            type: 'list',
            content: [
                '**Number of Cameras:** More cameras mean more data.',
                '**Resolution:** A 5MP camera uses significantly more space than a 2MP camera.',
                '**Frame Rate (FPS):** Higher FPS (e.g., 30) creates smoother video but uses more space than a lower rate (e.g., 15).',
                '**Recording Mode:** Recording 24/7 uses the most space. Recording only on motion detection can save a massive amount of storage.'
            ]
        },
        {
            type: 'heading',
            content: 'Storage Estimates by Scenario:'
        },
        {
            type: 'list',
            content: [
                '**For a Home (4-8 cameras):** With 2.4MP AHD cameras recording on motion, a 1TB to 2TB hard drive is often sufficient to hold several weeks of footage.',
                '**For a Small Shop/Office (8-16 cameras):** Using 4-5MP IP cameras with 24/7 recording during business hours and motion detection at night, plan for a 4TB to 8TB NVR.',
                '**For a Large Business or Mall (32+ cameras):** This requires a robust solution. You\'ll need a high-capacity NVR with multiple hard drive bays (e.g., our 32CH Dual SATA model) and total storage often exceeding 16TB to retain footage for 30 days or more. Centralized server racks and professional consultation are highly recommended.'
            ]
        },
        {
            type: 'heading',
            content: 'Conclusion'
        },
        {
            type: 'paragraph',
            content: 'Building the right security system involves balancing cost, features, and future needs. AHD systems offer an affordable entry point for basic surveillance, while IP systems provide a powerful, scalable, and feature-rich platform for serious security. By understanding your camera, recorder, and storage needs, you can design a system that delivers true peace of mind. For a personalized consultation and quote, don\'t hesitate to contact the experts at EyeFortress.'
        }
    ]
  }
];
