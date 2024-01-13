#!/usr/bin/env node
const { build } = require("estrella");

build({
	entry: "src/admin/cms.js",
	outfile: "_site/admin/cms.js",
	bundle: true,
	loader: {".js": "jsx"}
});
