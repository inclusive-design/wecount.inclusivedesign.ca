module.exports = {
	extends: ["stylelint-config-fluid", "stylelint-config-standard-scss"],
	plugins: ["stylelint-use-logical-spec", "stylelint-order"],
	ignoreFiles: ["_site/**/*.scss"],
	rules: {
		"indentation": "tab",
		"custom-property-pattern": "^([a-z][a-z0-9]*)([-_]*[a-zA-Z0-9]+)*$",
		"import-notation": "string",
		"liberty/use-logical-spec": [
			"always",
			{ except: ["float", "top", "left", "right", "bottom"] }
		],
		"no-descending-specificity": null,
		"order/properties-alphabetical-order": true,
		"scss/at-if-closing-brace-newline-after": null,
		"scss/at-if-closing-brace-space-after": null,
		"selector-class-pattern": "^([a-z][a-z0-9]*)([-_]*[a-zA-Z0-9]+)*$",
		"selector-id-pattern": "^([a-z][a-z0-9]*)([-_]*[a-zA-Z0-9]+)*$"
	}
};
