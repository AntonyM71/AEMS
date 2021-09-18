module.exports = {
	extends: [
		"plugin:@typescript-eslint/recommended",
		"plugin:@typescript-eslint/recommended-requiring-type-checking"
	],
	plugins: [
		"@typescript-eslint",
		"@typescript-eslint/tslint",
		"prefer-arrow",
		"import"
	],
	parserOptions: {
		project: "tsconfig.json"
	},
	rules: {
		"@typescript-eslint/array-type": "error",
		"@typescript-eslint/explicit-module-boundary-types": "off", // we're returning components, try and put return types on functions
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
			{ varsIgnorePattern: "_*" }
		],
		"@typescript-eslint/await-thenable": "off", // this not working properly
		"@typescript-eslint/unbound-method": "off", // functional programing and preferring arrow functions leads us to the state where all functions are unbound by definition
		"@typescript-eslint/prefer-for-of": "error",
		"@typescript-eslint/prefer-function-type": "error",
		"@typescript-eslint/quotes": ["warn", "double"],
		"@typescript-eslint/unified-signatures": "error",
		"arrow-body-style": "error",
		"arrow-parens": [
			// Following this style will help you find arrow functions (=>) which may be mistakenly included in a condition when a comparison such as >= was the intent.
			"warn",
			"always"
		],
		camelcase: "warn",
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
		"id-blacklist": "off", // this conflicting with typescript. It bans Number, Boolean, String, number, boolean, undefined but we widely use it in typescript
		"id-match": "error",
		"import/order": 1, // too strict, turning it off 🙂
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
		"no-mixed-spaces-and-tabs": ["warn", "smart-tabs"], // smart-tabs stops it arguing with prettier
		"one-var": ["error", "never"],
		indent: "off", // because @typescript-eslint/indent is on
		"padding-line-between-statements": [
			"error",
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
		radix: "off", // doesnt respect the fact that radix can be undefined
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
		"@typescript-eslint/tslint/config": [
			"error",
			{
				rules: {
					"import-spacing": true,
					"jsdoc-format": true,
					"no-boolean-literal-compare": true,
					"no-reference-import": true,
					"no-unnecessary-callback-wrapper": true,
					"one-line": [
						true,
						"check-catch",
						"check-finally",
						"check-else",
						"check-open-brace",
						"check-whitespace"
					]
				}
			}
		]
	}
}
