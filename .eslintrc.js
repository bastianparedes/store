const eslintrc = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:sonarjs/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'next',
    'next/core-web-vitals',
    'plugin:prettier/recommended',
    'prettier'
  ],
  globals: {},
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    project: 'tsconfig.json',
    sourceType: 'module'
  },
  plugins: [
    '@typescript-eslint',
    'import',
    'prettier',
    'react',
    'sonarjs',
    'sort-keys-fix'
  ],
  root: true,
  rules: {
    'arrow-parens': 'warn',
    'import/order': [
      'warn',
      {
        alphabetize: {
          caseInsensitive: true,
          order: 'asc'
        },
        groups: [
          ['builtin', 'external'],
          'internal',
          ['parent', 'sibling'],
          'index'
        ],
        'newlines-between': 'always',
        pathGroups: [
          {
            group: 'external',
            pattern: '@(react|react-native)',
            position: 'before'
          },
          {
            group: 'internal',
            pattern: '@src/**'
          }
        ],
        pathGroupsExcludedImportTypes: ['internal', 'react']
      }
    ],
    'no-alert': 'error',
    'no-console': 'warn',
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    semi: ['warn', 'always'],
    'sort-imports': ['warn', { ignoreCase: true, ignoreDeclarationSort: true }],
    'sort-keys': [
      'warn',
      'asc',
      {
        allowLineSeparatedGroups: false,
        caseSensitive: true,
        minKeys: 2,
        natural: true
      }
    ],
    "@typescript-eslint/no-explicit-any": "off"
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
};

module.exports = eslintrc;
