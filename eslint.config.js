// eslint.config.js
import js from "@eslint/js";
import importPlugin from "eslint-plugin-import";
import nPlugin from "eslint-plugin-n";
import promisePlugin from "eslint-plugin-promise";
import reactPlugin from "eslint-plugin-react";
import securityPlugin from "eslint-plugin-security";
import globals from "globals";
/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
	// Ignore build output
	{ ignores: ["dist/**", "node_modules/**"] },

	{
		files: ["**/*.js", "**/*.mjs", "**/*.cjs"],
		languageOptions: {
			ecmaVersion: "latest",
			sourceType: "module",
			globals: {
				...globals.node,
				...globals.es2024,
			},
			parserOptions: {
				ecmaFeatures: { jsx: true },
			},
		},
		settings: {
			"import/resolver": { node: { extensions: [".js", ".json"] } },
		},
		plugins: {
			import: importPlugin,
			n: nPlugin,
			promise: promisePlugin,
			security: securityPlugin,
			react: reactPlugin,
		},
		rules: {
			// Base recommendations
			...js.configs.recommended.rules,
			...nPlugin.configs["flat/recommended"].rules,
			...promisePlugin.configs["flat/recommended"].rules,
			...securityPlugin.configs.recommended.rules,
			...reactPlugin.configs.recommended.rules,
			"react/react-in-jsx-scope": "off",
			"react/jsx-uses-react": "error",
			"react/jsx-uses-vars": "error",
			"security/detect-object-injection": "off",
			"security/detect-non-literal-fs-filename": "off",
			// ✅ Enforce tabs
			indent: ["error", "tab", { SwitchCase: 1 }],
			"no-tabs": "off",

			// Import hygiene
			"import/no-unresolved": ["error", {
				ignore: ["^#", "@iamnapo/construct-url", "got"],
			}],
			"import/order": ["warn", {
				"newlines-between": "always",
				alphabetize: { order: "asc", caseInsensitive: true },
				groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
			}],
		},
	},
];
