// Case studies in display order.
import type { CaseStudyDto } from '../../modules/case-studies/case-studies.dto.js';
import paymentsPlatform from './payments-platform.js';
import churnPrediction from './churn-prediction.js';

const entries = [paymentsPlatform, churnPrediction];

export const caseStudiesEn: CaseStudyDto[] = entries.map((e) => e.en);
export const caseStudiesEs: CaseStudyDto[] = entries.map((e) => e.es);
