"use strict";

module.exports = {
    config: require("./node_modules/markdownlint-config-fluid/.markdownlintrc.json"),
    ignores: ["_site/**/*.md", "node_modules", "src/collections", "CHANGELOG.md", ".github/pull_request_template.md"]
};
