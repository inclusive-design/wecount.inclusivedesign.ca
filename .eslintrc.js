var double = "double";

module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
	parser: 'babel-eslint'
	// "parser": "babel-eslint"
  },
  extends: [
	//'eslint-config-fluid',
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  // add your custom rules here
  rules: {
	  "indent": [2, "tab"],
	  "no-tabs": 0,
	  "quotes": [2, "double", { "avoidEscape": true }],
	  "import/no-named-as-default": 0
  }
}
