import { fixupPluginRules } from "@eslint/compat"
import { FlatCompat } from "@eslint/eslintrc"
import js from "@eslint/js"
import typescriptEslint from "@typescript-eslint/eslint-plugin"
import _import from "eslint-plugin-import"
import jestDom from "eslint-plugin-jest-dom"
import preferArrow from "eslint-plugin-prefer-arrow"
import testingLibrary from "eslint-plugin-testing-library"
import globals from "globals"
import path from "node:path"
import { fileURLToPath } from "node:url"
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: js.configs.recommended,
	allConfig: js.configs.all
})

export default [
	{
		ignores: [
			"src/components/formSpecs/typescript/**/*",
			"src/redux/services/aemsApi.ts"
		]
	},

	...compat.extends(
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:@typescript-eslint/recommended-requiring-type-checking",
		"plugin:jest-dom/recommended",
		"plugin:testing-library/react",
		"plugin:@next/next/recommended"
	),
	{
		plugins: {
			"@typescript-eslint": typescriptEslint,
			"prefer-arrow": preferArrow,
			import: fixupPluginRules(_import),
			"testing-library": testingLibrary,
			"jest-dom": jestDom
		},

		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node
			}
		},

		rules: {
			"jest-dom/prefer-checked": "error",
			"jest-dom/prefer-enabled-disabled": "error",
			"jest-dom/prefer-required": "error",
			"jest-dom/prefer-to-have-attribute": "error",
			"@typescript-eslint/array-type": "error",
			"@typescript-eslint/explicit-module-boundary-types": "off",
			"@typescript-eslint/consistent-type-definitions": "error",

			"@typescript-eslint/explicit-member-accessibility": [
				"warn",
				{
					accessibility: "explicit"
				}
			],

			"@typescript-eslint/interface-name-prefix": "off",
			"@typescript-eslint/member-ordering": "error",
			"@typescript-eslint/explicit-function-return-type": "off",
			"@typescript-eslint/no-empty-function": "warn",
			"@typescript-eslint/no-empty-interface": "off",
			"@typescript-eslint/no-explicit-any": "off",
			"@typescript-eslint/no-floating-promises": "error",
			"@typescript-eslint/no-unsafe-assignment": "off",
			"@typescript-eslint/no-parameter-properties": "off",
			"@typescript-eslint/prefer-regexp-exec": "off",
			"@typescript-eslint/no-use-before-define": "off",
			"@typescript-eslint/require-await": "warn",

			"@typescript-eslint/no-unused-vars": [
				"error",
				{
					varsIgnorePattern: "_*"
				}
			],

			"@typescript-eslint/await-thenable": "off",
			"@typescript-eslint/unbound-method": "off",
			"@typescript-eslint/prefer-for-of": "error",
			"@typescript-eslint/ban-ts-comment": "off",
			"@typescript-eslint/prefer-function-type": "error",

			"@typescript-eslint/unified-signatures": "error",

			"testing-library/no-dom-import": "off",
			"arrow-body-style": "error",
			"arrow-parens": ["warn", "always"],
			"comma-dangle": "warn",

			complexity: [
				"warn",
				{
					max: 10
				}
			],

			"constructor-super": "error",
			curly: "error",
			"dot-notation": "error",
			"eol-last": "error",
			eqeqeq: ["error", "smart"],
			"guard-for-in": "error",
			"id-blacklist": "off",
			"id-match": "error",
			"import/order": 1,
			"linebreak-style": [1, "unix"],
			"max-classes-per-file": ["error", 1],

			"max-len": [
				"error",
				{
					code: 120
				}
			],

			"new-parens": "error",
			"newline-per-chained-call": "off",
			"no-bitwise": "error",
			"no-caller": "error",
			"no-cond-assign": "error",

			"no-console": [
				"warn",
				{
					allow: [
						"dirxml",
						"warn",
						"error",
						"dir",
						"timeLog",
						"assert",
						"clear",
						"count",
						"countReset",
						"group",
						"groupCollapsed",
						"groupEnd",
						"table",
						"Console",
						"markTimeline",
						"profile",
						"profileEnd",
						"timeline",
						"timelineEnd",
						"timeStamp",
						"context"
					]
				}
			],

			"no-debugger": "warn",
			"no-duplicate-imports": "error",
			"no-empty": "warn",
			"no-eval": "error",
			"no-fallthrough": "off",
			"no-invalid-this": "off",
			"no-irregular-whitespace": "error",

			"no-multiple-empty-lines": [
				"warn",
				{
					max: 2
				}
			],

			"no-new-wrappers": "error",

			"no-shadow": [
				"error",
				{
					hoist: "all"
				}
			],

			"no-throw-literal": "error",
			"no-trailing-spaces": "error",
			"no-undef-init": "error",
			"no-underscore-dangle": "warn",
			"no-unsafe-finally": "error",
			"no-unused-expressions": "error",
			"no-unused-labels": "error",
			"object-shorthand": "error",
			"no-multi-spaces": "error",
			"object-curly-spacing": ["error", "always"],
			"no-mixed-spaces-and-tabs": ["warn", "smart-tabs"],
			"one-var": ["error", "never"],
			indent: "off",

			"padding-line-between-statements": [
				"warn",
				{
					blankLine: "always",
					prev: "*",
					next: "return"
				}
			],

			"prefer-arrow/prefer-arrow-functions": [
				"warn",
				{
					singleReturnOnly: true
				}
			],

			"quote-props": ["error", "as-needed"],
			radix: "off",

			"space-before-function-paren": [
				"error",
				{
					anonymous: "always",
					named: "never",
					asyncArrow: "always"
				}
			],

			"spaced-comment": "error",
			"use-isnan": "error",
			"valid-typeof": "error",

			"no-restricted-imports": [
				1,
				{
					name: "@mui/material",
					message:
						"Importing from @mui/material is slow, please import from the corresponding module i.e. `@mui/material/Grid2` instead"
				},
				{
					name: "underscore",
					message: "Please use lodash instead."
				}
			]
		}
	},
	{
		files: ["**/*.ts", "**/*.tsx"],

		languageOptions: {
			ecmaVersion: 5,
			sourceType: "script",

			parserOptions: {
				project: ["./tsconfig.json"]
			}
		}
	}
]
