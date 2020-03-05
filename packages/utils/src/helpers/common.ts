import { toString } from 'lodash';
import sha256 from 'crypto-js/sha256';

/**
 * Generate sha256
 * @param input Represent the value going to generate sha based on it
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function sha(input: any): string {
  return sha256(toString(input)).toString();
}
