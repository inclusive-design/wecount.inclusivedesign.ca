module.exports = {
	env: {
		es6: true,
		node: true,
		browser: true
	},
	extends: [
		"eslint:recommended",
		"plugin:react/recommended"
	],
	plugins: [
		"react"
	],
	parserOptions: {
		sourceType: "module",
		ecmaVersion: 2018,
		ecmaFeatures: {
			"jsx": true
		}
	},
	"ignorePatterns": ["dist", "!.eslintrc.js", "!.eleventy.js"],
	rules: {
		"indent": [1, "tab"],
		"linebreak-style": ["error", "unix"],
		quotes: ["error", "double"],
		semi: ["error", "always"],
		"react/react-in-jsx-scope": 0
	},
	"settings": {
		"react": {
			"version": "16.14.0"
		}
	}
};
