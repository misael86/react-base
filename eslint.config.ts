/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import eslint from "@eslint/js";
import tsParser from "@typescript-eslint/parser";
import prettier from "eslint-config-prettier";
import eslintPluginJsonc from "eslint-plugin-jsonc";
import jsxA11y from "eslint-plugin-jsx-a11y";
import noRelativeImportPaths from "eslint-plugin-no-relative-import-paths";
import perfectionist from "eslint-plugin-perfectionist";
import playwright from "eslint-plugin-playwright";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import security from "eslint-plugin-security";
import sonarJs from "eslint-plugin-sonarjs";
import unicorn from "eslint-plugin-unicorn";
import { defineConfig } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig(
  // Ignore folders that are generated or contain dependencies
  {
    ignores: ["node_modules", "dist", "public", "**/vite-env.d.ts"],
  },

  // Files that are run on the browser
  // Enable type-aware linting for TypeScript file with the projectSeervice option
  {
    extends: [
      eslint.configs.recommended,
      tseslint.configs.recommendedTypeChecked,
      tseslint.configs.stylisticTypeChecked,
      perfectionist.configs["recommended-natural"],
      unicorn.configs.recommended,
      security.configs.recommended as any,
      sonarJs.configs.recommended,
    ],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      globals: globals.browser,
      parser: tsParser,
      parserOptions: { project: "./tsconfig.json", projectService: true },
    },
    plugins: { "no-relative-import-paths": noRelativeImportPaths as any },
    rules: {
      "no-relative-import-paths/no-relative-import-paths": [
        "error",
        { allowSameFolder: true, prefix: "", rootDir: "src" },
      ],
    },
  },

  // Make all .ts files use kebab-case filenames
  {
    files: ["**/*.ts"],
    rules: { "unicorn/filename-case": ["error", { case: "kebabCase" }] },
  },

  // Make all .tsx files use PascalCase filenames
  // Add plugins that are only relevant to React files
  {
    extends: [
      react.configs.flat.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.recommended,
      jsxA11y.flatConfigs.recommended as any,
    ],
    files: ["**/*.tsx"],
    rules: {
      "react/react-in-jsx-scope": "off",
      "unicorn/filename-case": ["error", { case: "pascalCase" }],
    },
  },

  // Playwright test files
  {
    extends: [playwright.configs["flat/recommended"]],
    files: ["tests/**/*.ts"],
  },

  // Files that are run on Node.js
  {
    files: ["**/vite.config.ts", "tests/**/*.ts"],
    languageOptions: { globals: globals.node },
  },

  // JSON files
  {
    extends: [eslintPluginJsonc.configs["flat/recommended-with-jsonc"], eslintPluginJsonc.configs["flat/prettier"]],
    files: ["**/*.json"],
    rules: { "jsonc/key-name-casing": "error", "jsonc/sort-array-values": "error", "jsonc/sort-keys": "error" },
    // ignores: ["package-lock.json"],
  },

  // Remove linting rules that conflict with Prettier
  // Needs to be the last config applied
  prettier
);
