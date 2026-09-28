import type { ProfileDto } from '../../modules/profile/profile.dto.js';

// Static content for the profile section (en).
const profile = {
  "name": "Your Name",
  "role": "Full-Stack Developer",
  "tagline": "I build fast, maintainable APIs and web experiences",
  "bio": "Developer focused on TypeScript, NestJS and clean architectures. Edit this file with your real information.",
  "location": "Remote / Your City",
  "availability": "Available for projects",
  "email": "hello@yourdomain.com",
  "socials": [
    {
      "label": "GitHub",
      "url": "https://github.com/your-user"
    },
    {
      "label": "LinkedIn",
      "url": "https://linkedin.com/in/your-user"
    },
    {
      "label": "X",
      "url": "https://x.com/your-user"
    }
  ]
} satisfies ProfileDto;

export default profile;
