import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const apiTranslatePath = join(process.cwd(), 'dist', 'api', 'translate.js');
let content = readFileSync(apiTranslatePath, 'utf-8');

// Replace ../src/ imports with ../dist/src/
content = content.replace(/from ['"]\.\.\/src\//g, "from '../dist/src/");

writeFileSync(apiTranslatePath, content, 'utf-8');
console.log('Fixed imports in dist/api/translate.js');
