module.exports = {
	"extends": "stylelint-config-standard-scss",
	"plugins": [
		"stylelint-order"
	],
	"rules": {
		"indentation": 4,
		"order/order": [
			"custom-properties",
			"declarations"
		],
		"order/properties-alphabetical-order": true
	}
}
