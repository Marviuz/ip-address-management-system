import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/*'],
  splitting: false,
  dts: true,
  format: ['esm'],
  outDir: 'dist',
  treeshake: true,
});
