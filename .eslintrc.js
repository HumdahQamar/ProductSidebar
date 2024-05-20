module.exports = {
  env: {
    browser: true,
    es2021: true,
    'jest/globals': true, // Include this line to support Jest globals in your test files
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'jest', // Include Jest plugin
  ],
  rules: {
    'react/react-in-jsx-scope': 'off', // Disable the rule that requires React in scope for JSX
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }], // Adjust the rule to warn instead of error
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
