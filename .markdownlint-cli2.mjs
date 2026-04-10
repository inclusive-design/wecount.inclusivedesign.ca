import markdownlintConfig from '@inclusive-design/markdownlint-config';

export default {
	config: markdownlintConfig.config,
	ignores: ["_site/**/*.md", "node_modules", "src/collections/**/*.md", "CHANGELOG.md", ".github/*.md"]
};
