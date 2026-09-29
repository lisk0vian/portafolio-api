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

  it('exposes about, notes, letter, cvUrl and social handles', () => {
    const service = new ProfileService();
    const en = service.findOne('en');
    const es = service.findOne('es');
    assert.ok(Array.isArray(en.about) && en.about.length > 0);
    assert.ok(Array.isArray(en.notes) && en.notes.length > 0);
    assert.ok(en.letter);
    assert.ok(en.cvUrl);
    assert.ok(en.socials.every((s) => s.handle !== undefined));
    assert.notEqual(en.about, es.about);
    assert.notEqual(en.letter, es.letter);
  });
});
