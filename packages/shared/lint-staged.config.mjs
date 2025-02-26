import path from 'node:path';

const lint = (filenames) =>
  `eslint --fix ${filenames
    .map((f) => path.relative(import.meta.dirname, f))
    .join(' ')}`;

const format = 'prettier --write';

export default {
  '*.{cjs,mjs,js,ts}': [format, lint],
  '*.json': [format],
};
