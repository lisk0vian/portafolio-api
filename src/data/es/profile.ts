import type { ProfileDto } from '../../modules/profile/profile.dto.js';

// Static content for the profile section (es).
const profile = {
  "name": "Tu Nombre",
  "role": "Desarrollador Full-Stack",
  "tagline": "Construyo APIs y experiencias web rápidas y mantenibles",
  "bio": "Desarrollador enfocado en TypeScript, NestJS y arquitecturas limpias. Edita este JSON con tu información real.",
  "location": "Remoto / Tu Ciudad",
  "availability": "Disponible para proyectos",
  "email": "hola@tudominio.com",
  "socials": [
    {
      "label": "GitHub",
      "url": "https://github.com/tu-usuario"
    },
    {
      "label": "LinkedIn",
      "url": "https://linkedin.com/in/tu-usuario"
    },
    {
      "label": "X",
      "url": "https://x.com/tu-usuario"
    }
  ]
} satisfies ProfileDto;

export default profile;
