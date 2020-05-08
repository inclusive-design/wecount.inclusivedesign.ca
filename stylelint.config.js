module.exports = {
	"extends": "stylelint-config-standard-scss",
	"plugins": [
		"stylelint-order"
	],
	"rules": {
		"font-family-no-missing-generic-family-keyword": [true, { "ignoreFontFamilies": ["Roboto"] }],
		"indentation": "tab",
		"order/order": [
			"custom-properties",
			"declarations"
		],
		"order/properties-alphabetical-order": true
	}
};
