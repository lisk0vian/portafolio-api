import caseStudiesEn from './en/case-studies.js';
import caseStudiesEs from './es/case-studies.js';
import certificationsEn from './en/certifications.js';
import certificationsEs from './es/certifications.js';
import educationEn from './en/education.js';
import educationEs from './es/education.js';
import experienceEn from './en/experience.js';
import experienceEs from './es/experience.js';
import profileEn from './en/profile.js';
import profileEs from './es/profile.js';
import projectsEn from './en/projects.js';
import projectsEs from './es/projects.js';
import publicationsEn from './en/publications.js';
import publicationsEs from './es/publications.js';
import skillsEn from './en/skills.js';
import skillsEs from './es/skills.js';

function slugs(items: Array<{ slug: string }>): string[] {
  return items.map((i) => i.slug).sort();
}

// Both locales must expose the same entries so no language returns
// content the other one is missing.
describe('locale parity (en/es)', () => {
  it('profile exposes the same keys', () => {
    assert.deepEqual(Object.keys(profileEn).sort(), Object.keys(profileEs).sort());
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
