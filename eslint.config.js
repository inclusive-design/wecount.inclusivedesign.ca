import {defineConfig} from 'eslint/config';
import eslintConfigInclusiveDesign from '@inclusive-design/eslint-config';

export default defineConfig([
	{
		extends: [eslintConfigInclusiveDesign],
		rules: {
			camelcase: ['error', {properties: 'never'}],
			'unicorn/no-null': 'off',
			'unicorn/no-this-assignment': 'off',
			'unicorn/prefer-top-level-await': 'off',
			'max-params': ['error', {max: 6}],
			'require-unicode-regexp': 'off',
		},
	},
	{
		ignores: ['_site/**', '"!.*.js"'],
	},
]);
