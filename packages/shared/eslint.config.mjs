import globals from 'globals';
import vercel from '@vercel/style-guide/eslint/flat';
import turboConfig from 'eslint-config-turbo/flat';

/** @type {import('eslint').Linter.Config[]} */
const eslintConfig = [
  ...turboConfig,
  ...vercel.configs.recommended,
  ...vercel.configs.typescript,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
      },
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
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
      '@typescript-eslint/no-extraneous-class': 'off',
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
    },
  },
  {
    ignores: ['*.config.*'],
  },
];

export default eslintConfig;
