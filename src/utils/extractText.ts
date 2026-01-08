import fs from 'fs';

export function extractText(filePath: string): string {
  return fs.readFileSync(filePath, 'utf-8');
}
