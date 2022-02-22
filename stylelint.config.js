module.exports = {
	"extends": "stylelint-config-standard-scss",
	"plugins": [
		"stylelint-order"
	],
	"rules": {
		"indentation": "tab",
		"no-descending-specificity": null,
		"order/order": [
			"custom-properties",
			"declarations"
		],
		"order/properties-alphabetical-order": true,
		"selector-class-pattern": "^([a-z][a-z0-9]*)([-_]*[a-zA-Z0-9]+)*$",
		"selector-id-pattern": "^([a-z][a-z0-9]*)([-_]*[a-zA-Z0-9]+)*$",
		"custom-property-pattern": "^([a-z][a-z0-9]*)([-_]*[a-zA-Z0-9]+)*$"
	}
};
