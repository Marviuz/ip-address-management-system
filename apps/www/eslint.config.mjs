import globals from 'globals';
import reactRefresh from 'eslint-plugin-react-refresh';
import vercel from '@vercel/style-guide/eslint/flat';
import turboConfig from 'eslint-config-turbo/flat';
import pluginRouter from '@tanstack/eslint-plugin-router';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { ignores: ['dist', '*.config.*', '*/routeTree.gen.ts'] },
  ...turboConfig,
  ...pluginRouter.configs['flat/recommended'],
  ...vercel.configs.recommended,
  ...vercel.configs.typescript,
  ...vercel.configs.react,
  {
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      'react-refresh': reactRefresh,
    },
    rules: {
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
      ],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-confusing-void-expression': [
        'error',
        {
          ignoreArrowShorthand: true,
        },
      ],
      '@typescript-eslint/no-misused-promises': [
        'off',
        {
          checksVoidReturn: { attributes: false },
        },
      ],
      '@typescript-eslint/restrict-template-expressions': [
        'error',
        {
          allowNumber: true,
        },
      ],
      'no-implicit-coercion': ['error', { allow: ['!!'] }],
      'react/jsx-sort-props': [
        'error',
        {
          callbacksLast: true,
        },
      ],
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
  {
    files: ['**/*.tsx'],
    ignores: ['**/routes/**/*'],
    rules: {
      'react/function-component-definition': [
        'error',
        { namedComponents: 'arrow-function' },
      ],
    },
  },
];
