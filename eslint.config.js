import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import jsxA11y from 'eslint-plugin-jsx-a11y-x'
import sonarjs from 'eslint-plugin-sonarjs'
import prettier from 'eslint-config-prettier'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
      jsxA11y.configs.recommended,
      sonarjs.configs.recommended,
    ],
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      // Already covered by @eslint/js / typescript-eslint — avoid double reports.
      'sonarjs/no-unused-vars': 'off',
      'sonarjs/no-fallthrough': 'off',
      'sonarjs/no-empty-character-class': 'off',
      'sonarjs/no-useless-catch': 'off',
      'sonarjs/no-delete-var': 'off',
      'sonarjs/no-invalid-regexp': 'off',
      'sonarjs/no-misleading-character-class': 'off',
      'sonarjs/no-control-regex': 'off',
      'sonarjs/no-regex-spaces': 'off',
      'sonarjs/no-identical-conditions': 'off', // = no-dupe-else-if + no-duplicate-case
    },
  },
  // Must be last: disables rules that conflict with Prettier formatting.
  prettier,
])
