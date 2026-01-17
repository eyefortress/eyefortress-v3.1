export type FaqItem = {
  question: string;
  answer: string;
};

export const faqs: FaqItem[] = [
  {
    question: "What makes EyeFortress cameras different from other brands?",
    answer: "Our cameras are equipped with proprietary AI-powered analytics that go beyond simple motion detection. They can identify specific objects like people and vehicles, track movement patterns, and even predict potential security threats before they happen. This intelligence minimizes false alarms and provides you with actionable insights.",
  },
  {
    question: "How is my video footage stored?",
    answer: "We offer flexible storage solutions. You can store footage locally on one of our high-capacity NVRs (Network Video Recorders), or you can opt for our secure cloud storage service. Many clients use a hybrid approach, storing recent footage locally and archiving older footage in the cloud.",
  },
  {
    question: "Can I access my camera feeds remotely?",
    answer: "Absolutely. Our secure mobile and web applications allow you to view live and recorded footage from anywhere in the world. You can also receive real-time alerts and manage your system settings remotely.",
  },
  {
    question: "Do you offer professional installation services?",
    answer: "Yes, we have a network of certified installation partners who can ensure your system is set up for optimal performance and coverage. We can include installation services in your purchase quote.",
  },
  {
    question: "What is the warranty on your products?",
    answer: "All EyeFortress hardware comes with a standard 2-year manufacturer's warranty covering defects in materials and workmanship. Extended warranty options are also available.",
  },
  {
    question: "How do your biometric access control systems work?",
    answer: "Our biometric systems use advanced fingerprint or facial recognition to grant access. This is far more secure than traditional keys or cards, which can be lost or stolen. The system creates a detailed audit trail, so you always know who has accessed secure areas and when.",
  },
];
