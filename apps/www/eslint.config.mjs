import globals from 'globals';
import vercel from '@vercel/style-guide/eslint/flat';
import boundaries from 'eslint-plugin-boundaries';

/** @type {import('eslint').Linter.Config[]} */
const eslintConfig = [
  ...vercel.configs.recommended,
  ...vercel.configs.typescript,
  ...vercel.configs.react,
  ...vercel.configs.next,
  {
    plugins: {
      boundaries,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    settings: {
      'boundaries/include': ['src/**/*'],
      'boundaries/elements': [
        {
          mode: 'full',
          type: 'shared',
          pattern: [
            'src/assets/**/*',
            'src/components/**/*',
            'src/contexts/**/*',
            'src/data/**/*',
            'src/hooks/**/*',
            'src/lib/**/*',
            'src/server/**/*',
            'src/utils/**/*',
            'src/styles/**/*',
            'src/env.mjs',
          ],
        },
        {
          mode: 'full',
          type: 'feature',
          capture: ['featureName'],
          pattern: ['src/features/*/**/*'],
        },
        {
          mode: 'full',
          type: 'app',
          capture: ['_', 'fileName'],
          pattern: ['src/app/**/*'],
        },
      ],
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
      'boundaries/no-unknown': ['error'],
      'boundaries/no-unknown-files': ['error'],
      'boundaries/element-types': [
        'error',
        {
          default: 'disallow',
          rules: [
            {
              from: ['shared'],
              allow: ['shared'],
            },
            {
              from: ['feature'],
              allow: [
                'shared',
                ['feature', { featureName: '${from.featureName}' }],
              ],
            },
            {
              from: ['app', 'neverImport'],
              allow: ['shared', 'feature'],
            },
            {
              from: ['app'],
              allow: [['app', { fileName: '*.css' }]],
            },
          ],
        },
      ],
      'no-implicit-coercion': ['error', { allow: ['!!'] }],
      'react/jsx-sort-props': [
        'error',
        {
          callbacksLast: true,
        },
      ],
    },
  },
  {
    files: ['**/*.tsx'],
    ignores: ['**/app/**/*'],
    rules: {
      'unicorn/filename-case': ['error', { case: 'pascalCase' }],
      'react/function-component-definition': [
        'error',
        { namedComponents: 'arrow-function' },
      ],
    },
  },
  {
    files: ['src/app/**/*.tsx'],
    rules: {
      'import/no-default-export': 'off',
    },
  },
  {
    ignores: ['*.config.*'],
  },
];

export default eslintConfig;
