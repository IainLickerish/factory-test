// Checks every source and test file parses, and, unless --syntax-only, that none uses var or console.log.
import { readdirSync, readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { join } from 'node:path';

const syntaxOnly = process.argv.includes('--syntax-only');
let failed = false;
for (const dir of ['src', 'test']) {
  for (const name of readdirSync(dir).filter((n) => n.endsWith('.js'))) {
    const path = join(dir, name);
    const check = spawnSync(process.execPath, ['--check', path], { encoding: 'utf8' });
    if (check.status !== 0) {
      console.error(`${path}: does not parse\n${check.stderr}`);
      failed = true;
    }
    if (!syntaxOnly && /\bvar\s|console\.log\(/.test(readFileSync(path, 'utf8'))) {
      console.error(`${path}: uses var or console.log`);
      failed = true;
    }
  }
}
process.exit(failed ? 1 : 0);
