import path from 'node:path';

const lint = (filenames) =>
  `next lint --fix --file ${filenames
    .map((f) => path.relative(import.meta.dirname, f))
    .join(' --file ')}`;

const format = 'prettier --write';

export default {
  '*.{cjs,mjs,js,jsx,ts,tsx}': [format, lint],
  '*.json': [format],
};
