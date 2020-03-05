module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'airbnb-base',
    'prettier/@typescript-eslint',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    'prettier/prettier': 'error',
    'import/no-unresolved': 'off',
    'import/prefer-default-export': 'off',
    'no-underscore-dangle': 'off',
    'import/extensions': 'off',
    'no-useless-constructor': 'off',
    'no-console': ['error', { allow: ['warn', 'error', 'info'] }],
  },
  ignorePatterns: ['node_modules/', 'dist/'],

  overrides: [
    {
      files: ['**/*.spec.ts', '**/*.spec.tsx'],
      env: {
        jest: true,
      },
    },
  ],
};
