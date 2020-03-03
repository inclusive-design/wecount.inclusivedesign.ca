module.exports = {
	"extends": "stylelint-config-recommended-scss",
	"plugins": [
		"stylelint-order",
		"stylelint-scss"
	],
	"rules": {
		"order/order": [
			"custom-properties",
			"declarations"
		],
		"order/properties-alphabetical-order": true
	}
}
