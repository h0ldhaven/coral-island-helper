import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import stylisticTs from '@stylistic/eslint-plugin-ts'
import parserTs from '@typescript-eslint/parser'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import react from 'eslint-plugin-react'

export default tseslint.config(
  {
    ignores: ['dist', 'node_modules'],
  },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parser: parserTs,
    },
    plugins: {
      '@stylistic/ts': stylisticTs,
      'jsx-a11y': jsxA11y,
      'react': react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,

      // ✅ Ajout des règles stylistiques
      'indent': ['error', 4], // Indentation à 4 espaces
      'semi': 'error', // Oblige les points-virgules
      'quotes': ['error', 'single'], // Utilisation des apostrophes (' ')
      'prefer-const': 'off', // Désactive l'obligation d'utiliser const

      // ✅ React Refresh
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],

      // ✅ Règles d'accessibilité JSX
      'jsx-a11y/aria-role': [
        2,
        {
          allowedInvalidRoles: ['text'],
          ignoreNonDOM: true,
        },
      ],
    },
  },
)
