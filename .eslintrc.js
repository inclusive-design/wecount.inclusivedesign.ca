var double = "double";

module.exports = {
	root: true,
	env: {
		browser: true,
		node: true
	},
	parserOptions: {
		parser: 'babel-eslint'
	},
	extends: [
		'@nuxtjs',
		'plugin:nuxt/recommended'
	],
	rules: {
		"indent": [1, "tab"],
		"no-tabs": 0,
		"quotes": [2, "double", { "avoidEscape": true }],
		"import/no-named-as-default": 0,
		"semi": [2, "always"],
		"vue/html-indent": [1, "tab"]
	}
}
