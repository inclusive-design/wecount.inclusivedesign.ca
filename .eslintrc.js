module.exports = {
	extends: [
		"fluid",
		"plugin:yml/standard",
		"plugin:markdown/recommended-legacy",
		"plugin:react/recommended"
	],
	plugins: ["react"],
	ignorePatterns: ["_site", "src/_locales/messages.js", "!.*.js"],
	env: {
		amd: true,
		browser: true,
		node: true,
		es6: true
	},
	parserOptions: {
		sourceType: "module",
		ecmaVersion: 2020,
		ecmaFeatures: {
			jsx: true
		}
	},
	rules: {
		"@stylistic/js/indent": ["error", "tab"],
		"linebreak-style": ["error", "unix"],
		"@stylistic/js/quotes": ["error", "double"],
		"@stylistic/js/semi": ["error", "always"],
		"react/react-in-jsx-scope": 0
	},
	overrides: [
		{
			files: ["**/*.md"],
			processor: "markdown/markdown"
		}
	],
	settings: {
		react: {
			version: "16.14.0"
		}
	}
};
