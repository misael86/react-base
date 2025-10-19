/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import eslint from "@eslint/js";
import json from "@eslint/json";
import tsParser from "@typescript-eslint/parser";
import prettier from "eslint-config-prettier";
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

const tsConfig = defineConfig(
  // Files that are run on the browser
  // Enable type-aware linting for TypeScript file
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

  {
    files: ["**/*.ts"],
    rules: { "unicorn/filename-case": ["error", { case: "kebabCase" }] },
  },

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

  {
    extends: [playwright.configs["flat/recommended"]],
    files: ["tests/**/*.ts"],
    languageOptions: { globals: globals.node },
  },

  // Files that are run on Node.js
  {
    files: ["**/vite.config.ts"],
    languageOptions: { globals: globals.node },
  }
);

const jsonConfig = defineConfig({
  extends: ["json/recommended"],
  files: ["**/*.json"],
  ignores: ["package-lock.json"],
  language: "json/jsonc",
  plugins: { json },
});

export default defineConfig(
  // Ignore folders that are generated or contain dependencies
  {
    ignores: ["node_modules", "dist", "public", "**/vite-env.d.ts"],
  },

  ...tsConfig,
  ...jsonConfig,

  // Remove linting rules that conflict with Prettier
  // Needs to be the last config applied
  prettier
);
