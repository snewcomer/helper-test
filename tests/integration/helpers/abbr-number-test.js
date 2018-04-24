import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import hbs from 'htmlbars-inline-precompile';

module('scott Integration | Helper | abbr-number', function(hooks) {
  setupRenderingTest(hooks);

  test('abbreviates correctly', async function(assert) {
    await render(hbs`{{abbr-number 888}}`);
    assert.equal(this.element.textContent.trim(), '888', '888 is abbreviated correctly');

    await render(hbs`{{abbr-number 999000000}}`);
    assert.equal(this.element.textContent.trim(), '999M', '999000000 is abbreviated correctly'); // passes 3.0, fails 3.1.1/latest tarball undefined passed to helper
    await render(hbs`{{abbr-number 111111100}}`);
    assert.equal(this.element.textContent.trim(), '111.1M', '111.1 mil is abbreviated correctly'); // passes 3.0, fails 3.1.1/latest tarball - says it is 37.4M
    await render(hbs`{{abbr-number 1111111100}}`);
    assert.equal(this.element.textContent.trim(), '1.1B', 'about 1 bil'); // fails 3.0 undefined
    await render(hbs`{{abbr-number 1000000000}}`);
    assert.equal(this.element.textContent.trim(), '1B', '1 bil is abbreviated correctly'); // passes 3.0, fails 3.1.1/latest tarball - undefined passed to helper
  });
});
