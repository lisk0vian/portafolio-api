import type { EducationDto } from '../../modules/education/education.dto.js';

// Static content for the education section (en).
// Shape mirrors the "Trayectoria" mockup sidebar: period, degree, school, description.
const education = [
  {
    "school": "Example University",
    "degree": "Systems Engineering",
    "period": "2020 - 2024",
    "description": "Edit with your real education: major, thesis or honors."
  },
  {
    "school": "Example Institution",
    "degree": "Course or certification",
    "period": "2023",
    "description": "Short description."
  }
] satisfies EducationDto[];

export default education;
