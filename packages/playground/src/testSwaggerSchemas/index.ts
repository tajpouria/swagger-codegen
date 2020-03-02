import { resolve } from 'path';

import { readAsUTF8 } from '../helper';

/**
 * @link https://petstore.swagger.io/v2/swagger.json
 */
export const pet = JSON.parse(readAsUTF8(resolve(__dirname, './pet.json')));
