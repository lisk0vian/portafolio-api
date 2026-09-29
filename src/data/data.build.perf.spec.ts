// Performance evidence for the eager bilingual build (Q10-lazy, option A).
// Imports run every factory eagerly; this spec measures that cost so a
// future switch to lazy per-locale builds can rely on numbers, not guesses.
import { performance } from 'node:perf_hooks';
import { caseStudiesEn, caseStudiesEs } from './case-studies/index.js';
import { certificationsEn, certificationsEs } from './certifications/index.js';
import { educationEn, educationEs } from './education/index.js';
import { experienceEn, experienceEs } from './experience/index.js';
import { profileEn, profileEs } from './profile/index.js';
import { projectsEn, projectsEs } from './projects/index.js';
import { publicationsEn, publicationsEs } from './publications/index.js';
import { skillsEn, skillsEs } from './skills/index.js';

const locales = {
  caseStudiesEn,
  caseStudiesEs,
  certificationsEn,
  certificationsEs,
  educationEn,
  educationEs,
  experienceEn,
  experienceEs,
  profileEn,
  profileEs,
  projectsEn,
  projectsEs,
  publicationsEn,
  publicationsEs,
  skillsEn,
  skillsEs,
};

describe('data build performance (eager)', () => {
  it('serves every locale within budget', () => {
    const start = performance.now();
    let entries = 0;
    let bytes = 0;
    for (const dataset of Object.values(locales)) {
      const payload = JSON.stringify(dataset);
      bytes += payload.length;
      entries += Array.isArray(dataset) ? dataset.length : 1;
    }
    const elapsed = performance.now() - start;

    // eslint-disable-next-line no-console
    console.log(
      `data perf: ${entries} entries, ${bytes} bytes, ${elapsed.toFixed(2)} ms`,
    );

    assert.ok(entries > 0);
    assert.ok(elapsed < 2000, `data build took ${elapsed.toFixed(2)} ms`);
  });
});
