module.exports = {
  env: {
    es6: true,
		node: true,
		browser: true
  },
  extends: "eslint:recommended",
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 2017
	},
	"ignorePatterns": ["src/_includes/static/", "dist"],
  rules: {
		"indent": [1, "tab"],
    "linebreak-style": ["error", "unix"],
    quotes: ["error", "double"],
    semi: ["error", "always"]
  }
};
