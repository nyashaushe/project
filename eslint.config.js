import globals from 'globals';
import tseslint from 'typescript-eslint';
import nextPlugin from '@next/eslint-plugin-next';

export default tseslint.config(
  {
    // Global ignores
  ignores: ['dist', '.next', 'node_modules'],
  },
  {
    // Next.js specific configuration
    files: ['**/*.{js,jsx,ts,tsx}'],
    ...nextPlugin.configs.recommended,
    plugins: {
      '@next/next': nextPlugin,
    },
    rules: {
      // Add or override Next.js specific rules here
    },
  },
  {
    // General TypeScript/JavaScript configuration
    files: ['**/*.{ts,tsx,js,jsx}'],
    extends: [
      tseslint.configs.recommended,
      // Add other recommended configs if needed, e.g., 'eslint:recommended'
    ],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      // General rules for TypeScript/JavaScript
      'prefer-const': 'error',
      'no-unused-vars': 'warn',
    },
  }
);
