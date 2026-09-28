import { ProfileService } from './profile.service.js';

describe('ProfileService', () => {
  it('returns localized profiles', () => {
    const service = new ProfileService();
    const en = service.findOne('en');
    const es = service.findOne('es');
    assert.ok(en.name);
    assert.ok(es.name);
    assert.notEqual(en.tagline, es.tagline);
  });
});
