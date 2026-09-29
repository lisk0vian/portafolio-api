import { caseStudiesEn, caseStudiesEs } from './case-studies/index.js';
import { certificationsEn, certificationsEs } from './certifications/index.js';
import { educationEn, educationEs } from './education/index.js';
import { experienceEn, experienceEs } from './experience/index.js';
import { profileEn, profileEs } from './profile/index.js';
import { projectsEn, projectsEs } from './projects/index.js';
import { publicationsEn, publicationsEs } from './publications/index.js';
import { skillsEn, skillsEs } from './skills/index.js';

function slugs(items: Array<{ slug: string }>): string[] {
  return items.map((i) => i.slug).sort();
}

// Both locales must expose the same entries so no language returns
// content the other one is missing.
describe('locale parity (en/es)', () => {
  it('profile exposes the same keys', () => {
    assert.deepEqual(
      Object.keys(profileEn).sort(),
      Object.keys(profileEs).sort(),
    );
  });

  it('projects expose the same slugs', () => {
    assert.deepEqual(slugs(projectsEn), slugs(projectsEs));
  });

  it('certifications expose the same slugs', () => {
    assert.deepEqual(slugs(certificationsEn), slugs(certificationsEs));
  });

  it('publications expose the same slugs', () => {
    assert.deepEqual(slugs(publicationsEn), slugs(publicationsEs));
  });

  it('case studies expose the same slugs', () => {
    assert.deepEqual(slugs(caseStudiesEn), slugs(caseStudiesEs));
  });

  it('experience, skills and education have the same entry count', () => {
    assert.equal(experienceEn.length, experienceEs.length);
    assert.equal(skillsEn.length, skillsEs.length);
    assert.equal(educationEn.length, educationEs.length);
  });
});
