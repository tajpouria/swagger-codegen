import { readFileSync } from 'fs';

/**
 * Read file as UTF-8
 * @param filePath path to the target file
 */
export function readAsUTF8(filePath: string): string {
  return readFileSync(filePath, 'UTF-8');
}
