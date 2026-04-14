export default {
	extends: '@inclusive-design/stylelint-config',
	ignoreFiles: ['_site/**'],
	rules: {
		'custom-property-pattern': '^([a-z][a-z0-9]*)([-_]*[a-zA-Z0-9]+)*$',
		'no-descending-specificity': undefined,
		'property-no-deprecated': [true, {ignoreProperties: ['clip']}],
		'selector-class-pattern': '^([a-z][a-z0-9]*)([-_]*[a-zA-Z0-9]+)*$',
		'selector-id-pattern': '^([a-z][a-z0-9]*)([-_]*[a-zA-Z0-9]+)*$',
	},
};
