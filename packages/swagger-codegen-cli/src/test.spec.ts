import { log } from '@swagger-codegen/core';
import { add } from '@swagger-codegen/utils';

it('cli test', () => {
  log('Core log at cli successfully');

  expect(add(1, 1)).toBe(2);
});
