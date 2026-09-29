// Projects in display order.
import type { ProjectDto } from '../../modules/projects/projects.dto.js';
import portfolioApi from './portfolio-api.js';
import myFeaturedProject from './my-featured-project.js';
import paymentsPlatform from './payments-platform.js';
import churnPrediction from './churn-prediction.js';

const entries = [
  portfolioApi,
  myFeaturedProject,
  paymentsPlatform,
  churnPrediction,
];

export const projectsEn: ProjectDto[] = entries.map((e) => e.en);
export const projectsEs: ProjectDto[] = entries.map((e) => e.es);
