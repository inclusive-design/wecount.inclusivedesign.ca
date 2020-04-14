module.exports = {
	"extends": "stylelint-config-standard-scss",
	"plugins": [
		"stylelint-order"
	],
	"rules": {
		"indentation": "tab",
		"order/order": [
			"custom-properties",
			"declarations"
		],
		"order/properties-alphabetical-order": true
	}
}
