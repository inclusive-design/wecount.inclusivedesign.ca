module.exports = {
	"extends": "stylelint-config-standard-scss",
	"plugins": [
		"stylelint-order"
	],
	"rules": {
		"order/order": [
			"custom-properties",
			"declarations"
		],
		"order/properties-alphabetical-order": true
	}
}
