import type { EducationDto } from '../../modules/education/education.dto.js';

// Static content for the education section (es).
// Shape mirrors the "Trayectoria" mockup sidebar: period, degree, school, description.
const education = [
  {
    "school": "Universidad ejemplo",
    "degree": "Ingeniería en Sistemas",
    "period": "2020 - 2024",
    "description": "Edita con tu educación real: especialidad, tesis o mención."
  },
  {
    "school": "Institución ejemplo",
    "degree": "Curso o certificación",
    "period": "2023",
    "description": "Descripción breve."
  }
] satisfies EducationDto[];

export default education;
