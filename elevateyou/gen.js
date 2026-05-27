const fs = require('fs');
const path = require('path');
const prepFile = path.join(__dirname, 'frontend/src/data/prepData.js');
const scannerFile = path.join(__dirname, 'frontend/src/data/scannerData.js');

const events = [
  { id: 'Interview', icon: '💼' },
  { id: 'Presentation', icon: '📊' },
  { id: 'First Date', icon: '✨' },
  { id: 'Networking Event', icon: '🤝' },
  { id: 'Salary Negotiation', icon: '💰' },
  { id: 'Client Dinner', icon: '🍽️' },
  { id: 'Graduation Ceremony', icon: '🎓' },
  { id: 'Media Interview', icon: '🎥' },
  { id: 'Viva', icon: '🗣️' },
  { id: 'Group Discussion', icon: '👥' },
  { id: 'Meeting', icon: '📅' },
  { id: 'Hackathon', icon: '💻' },
  { id: 'Job Fair', icon: '🎪' },
  { id: 'Investor Pitch', icon: '🚀' },
  { id: 'Office Party', icon: '🎉' },
  { id: 'College Fest', icon: '🎸' },
  { id: 'Panel Discussion', icon: '🎙️' },
  { id: 'Product Launch', icon: '📦' },
  { id: 'Award Ceremony', icon: '🏆' },
  { id: 'Casual Friday', icon: '👖' },
  { id: 'Wedding Guest', icon: '💍' },
  { id: 'Daily Office', icon: '🏢' },
  { id: 'Career Fair', icon: '🎫' },
  { id: 'Alumni Meet', icon: '🏫' }
];

let prepDataContent = 'export const prepData = {\n';
let scannerDataContent = 'export const scannerData = {\n';

events.forEach(event => {
  const eid = event.id;
  
  // Prep Data Template for generic events
  prepDataContent += `  "${eid}": {
    "outfit": {
      "Style Rules": [
        "Dress appropriately for the ${eid}.",
        "Ensure your clothes are well-ironed.",
        "Choose comfortable but professional footwear."
      ],
      "Bonus Tip": [
        "Confidence is the best accessory you can wear to ${eid}."
      ]
    },
    "communication": {
      "Key Strategies": [
        "Speak clearly and maintain a moderate pace.",
        "Listen actively before responding.",
        "Ask insightful questions."
      ],
      "Phrasing": [
        "Avoid filler words like 'um' or 'like'.",
        "Frame your sentences positively."
      ]
    },
    "bodyLanguage": {
      "Posture": [
        "Stand or sit up straight with your shoulders back.",
        "Maintain natural eye contact.",
        "Avoid crossing your arms."
      ],
      "Presence": [
        "Use hand gestures to emphasize points but do not overdo it."
      ]
    }
  },\n`;

  // Scanner Data Template generic
  scannerDataContent += `  "${eid}": {
    "image": "Visual analysis of your ${eid} attire suggests a solid alignment with expectations.",
    "text": "Your description fits the ${eid} profile well.",
    "appropriate": [
      "Tailored, well-fitted clothing",
      "Clean and well-maintained footwear",
      "Appropriate color matching",
      "Professional grooming details"
    ],
    "notSuitable": [
      "Wrinkled or stained garments",
      "Overly casual or beachwear inappropriate for the context",
      "Distracting, loud accessories unless expected"
    ],
    "improvements": [
      "Consider adding a structured layer like a blazer or jacket.",
      "Ensure your collar is perfectly pressed.",
      "Ditch any worn-out shoes for a fresh clean pair."
    ],
    "groomingTips": [
      "Neat, tidy hair styling",
      "Fresh breath and clean teeth",
      "Subtle fragrance",
      "Clean and trimmed nails"
    ],
    "score": ${Math.floor(Math.random() * 2) + 8}
  },\n`;
});

prepDataContent += '};\n';
scannerDataContent += '};\n';

fs.writeFileSync(prepFile, prepDataContent);
fs.writeFileSync(scannerFile, scannerDataContent);
console.log('Successfully generated complete event data!');
