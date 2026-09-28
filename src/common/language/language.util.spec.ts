import { resolveLanguage } from './language.util.js';

describe('resolveLanguage', () => {
  it('defaults to English for missing values', () => {
    assert.equal(resolveLanguage(undefined), 'en');
    assert.equal(resolveLanguage(''), 'en');
  });

  it('resolves Spanish tags', () => {
    assert.equal(resolveLanguage('es'), 'es');
    assert.equal(resolveLanguage('es-ES'), 'es');
    assert.equal(resolveLanguage('es-ES,es;q=0.9,en;q=0.8'), 'es');
  });

  it('resolves English tags', () => {
    assert.equal(resolveLanguage('en'), 'en');
    assert.equal(resolveLanguage('en-US'), 'en');
  });

  it('falls back to English for unsupported languages', () => {
    assert.equal(resolveLanguage('fr'), 'en');
    assert.equal(resolveLanguage('de-DE,de;q=0.9'), 'en');
  });
});
