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
	'eslint-config-fluid',
    //'@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  // add your custom rules here
  rules: {
  }
}
