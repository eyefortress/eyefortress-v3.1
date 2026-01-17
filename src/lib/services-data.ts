
import { Camera, HardDrive, Fingerprint, Puzzle, Video, GitCommitHorizontal, Volume2, Siren } from 'lucide-react';

export type Service = {
  name: string;
  slug: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  details?: {
    introduction: string;
    features: { title: string; description: string }[];
    idealFor: string;
  };
};

export const services: Service[] = [
  {
    name: 'Camera',
    slug: 'camera',
    description: 'High-definition and thermal cameras for crystal-clear surveillance, day or night.',
    icon: Camera,
    details: {
      introduction: "Our cutting-edge camera systems are the eyes of your security infrastructure. We offer a wide range of cameras, including 4K Ultra HD, thermal imaging, and PTZ (Pan-Tilt-Zoom) models, ensuring you have the perfect solution for any environment, from brightly-lit offices to pitch-black perimeters.",
      features: [
        { title: "AI-Powered Analytics", description: "Detect, classify, and track objects, people, and vehicles with advanced AI. Set up smart alerts for specific events to reduce false alarms." },
        { title: "Superior Image Quality", description: "Capture crisp, detailed footage in any lighting condition with technologies like Wide Dynamic Range (WDR) and advanced low-light sensors." },
        { title: "Robust & Weatherproof", description: "Our cameras are built to last, with IP67-rated weatherproof and vandal-resistant housings for reliable outdoor operation." }
      ],
      idealFor: "Businesses, public spaces, critical infrastructure, and high-security residential properties."
    }
  },
  {
    name: 'Storage Device',
    slug: 'storage-device',
    description: 'Reliable, high-capacity NVRs and DVRs to securely store your footage.',
    icon: HardDrive,
     details: {
      introduction: "Secure and reliable storage is critical for any surveillance system. Our Network Video Recorders (NVRs) and Digital Video Recorders (DVRs) offer high-capacity, scalable solutions to ensure your footage is safely archived and easily accessible when you need it most.",
      features: [
        { title: "High-Capacity & Scalable", description: "Start with a few terabytes and expand as your camera count grows. Our systems support multiple hard drives for extensive storage." },
        { title: "Redundant Backup", description: "Protect against data loss with RAID configurations and optional cloud backup, ensuring your critical footage is always safe." },
        { title: "Remote Access", description: "Review recorded video from anywhere in the world through our secure mobile and desktop applications." }
      ],
      idealFor: "Any organization requiring long-term video retention for security, compliance, or operational review."
    }
  },
  {
    name: 'Biometric Device',
    slug: 'biometric-device',
    description: 'Advanced fingerprint and facial recognition for secure access control.',
    icon: Fingerprint,
    details: {
      introduction: "Move beyond traditional keys and keycards with our advanced biometric access control systems. Using state-of-the-art fingerprint and facial recognition technology, you can ensure that only authorized personnel can access sensitive areas.",
      features: [
        { title: "Multi-Factor Authentication", description: "Combine biometrics with PINs or RFID cards for an added layer of security." },
        { title: "Fast & Accurate", description: "Our sensors provide near-instantaneous recognition, preventing bottlenecks at entry points." },
        { title: "Detailed Audit Trails", description: "Track every access event with detailed logs, providing a complete picture of who went where and when." }
      ],
      idealFor: "Data centers, laboratories, corporate offices, and any area requiring stringent access control."
    }
  },
  {
    name: 'Accessories',
    slug: 'accessories',
    description: 'A wide range of mounts, cables, and power supplies for any installation.',
    icon: Puzzle,
    details: {
      introduction: "The right accessories are key to a professional and reliable installation. We offer a comprehensive selection of high-quality components to ensure your security system is installed cleanly and functions flawlessly.",
      features: [
        { title: "Professional Mounts", description: "Find the perfect mounting solution for any surface, including pole, corner, and pendant mounts for a clean, secure fit." },
        { title: "Power & Cabling", description: "From Power over Ethernet (PoE) switches to bulk Siamese cable and durable power supplies, we have everything you need to power your system." },
        { title: "Junction Boxes & Housings", description: "Protect your connections from the elements and vandalism with our durable, weatherproof junction boxes and camera housings." }
      ],
      idealFor: "Professional installers and DIY users who want a robust and polished security system installation."
    }
  },
  {
    name: 'Video Door Phone',
    slug: 'video-door-phone',
    description: 'See and speak to visitors from anywhere with our smart video door phones.',
    icon: Video,
    details: {
      introduction: "Upgrade your first line of defense with our smart video door phones and intercoms. Greet visitors, accept deliveries, and deter unwanted guests from your smartphone, whether you're at home or on the go.",
      features: [
        { title: "Mobile App Integration", description: "Receive video calls on your phone when a visitor rings the bell and grant access with a single tap." },
        { title: "High-Definition Video", description: "See visitors clearly with wide-angle HD cameras featuring night vision." },
        { title: "Multi-Tenant Support", description: "We offer solutions for single-family homes, apartment complexes, and commercial buildings." }
      ],
      idealFor: "Residential properties, apartment buildings, and offices looking to enhance front-door security and convenience."
    }
  },
  {
    name: 'Boom Barrier',
    slug: 'boom-barrier',
    description: 'Automated boom barriers for efficient and secure vehicle access control.',
    icon: GitCommitHorizontal,
    details: {
      introduction: "Control vehicle flow and secure your perimeter with our automated boom barriers. Designed for durability and high-traffic environments, our barriers integrate seamlessly with access control systems for a complete vehicle management solution.",
      features: [
        { title: "Fast & Reliable Operation", description: "High-speed motors ensure quick entry and exit, minimizing queues and improving traffic flow." },
        { title: "Access Control Integration", description: "Integrate with RFID readers, license plate recognition (LPR) cameras, or biometric systems for automated, secure access." },
        { title: "Safety Features", description: "Equipped with safety sensors to prevent the boom from lowering onto a vehicle or person." }
      ],
      idealFor: "Parking lots, corporate campuses, gated communities, and toll plazas."
    }
  },
  {
    name: 'PA System',
    slug: 'pa-system',
    description: 'Integrated Public Address systems for clear communication and emergency alerts.',
    icon: Volume2,
    details: {
      introduction: "Our IP-based Public Address systems deliver crystal-clear audio for general announcements, background music, and critical emergency notifications. Integrated with your security network, it becomes a powerful tool for mass communication.",
      features: [
        { title: "Zoned Audio", description: "Deliver different messages or music to different areas of your facility simultaneously." },
        { title: "Scheduled Announcements", description: "Automate routine announcements, like class change bells or shift-end notifications." },
        { title: "Emergency Integration", description: "Automatically broadcast pre-recorded emergency instructions when a fire alarm or other security event is triggered." }
      ],
      idealFor: "Schools, hospitals, shopping malls, industrial facilities, and transportation hubs."
    }
  },
  {
    name: 'Fire Alarm',
    slug: 'fire-alarm',
    description: 'Smart fire detection and alarm systems that integrate with your security network.',
    icon: Siren,
    details: {
      introduction: "Protect lives and property with our intelligent fire alarm systems. Going beyond simple detection, our systems integrate with your surveillance and access control networks to provide a coordinated, automated response in an emergency.",
      features: [
        { title: "Addressable Sensors", description: "Pinpoint the exact location of a fire, enabling faster response from emergency services." },
        { title: "Automated Response", description: "Automatically unlock emergency exits, shut down ventilation systems, and alert monitoring stations." },
        { title: "Centralized Monitoring", description: "Manage and monitor your fire alarm system from the same platform as your CCTV and access control." }
      ],
      idealFor: "Any commercial, industrial, or residential building where life safety is a top priority."
    }
  },
];
