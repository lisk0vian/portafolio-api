import { apiVersionExtractor } from './api-version.extractor.js';

describe('apiVersionExtractor', () => {
  it('returns the default version when the header is missing', () => {
    assert.equal(apiVersionExtractor({ headers: {} }), '1');
    assert.equal(apiVersionExtractor({}), '1');
    assert.equal(apiVersionExtractor(undefined), '1');
  });

  it('returns the requested version when supported', () => {
    assert.equal(apiVersionExtractor({ headers: { 'x-api-version': '1' } }), '1');
  });

  it('falls back to the default for unsupported versions', () => {
    assert.equal(apiVersionExtractor({ headers: { 'x-api-version': '2' } }), '1');
    assert.equal(apiVersionExtractor({ headers: { 'x-api-version': '' } }), '1');
  });
});
