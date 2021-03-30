#!/usr/bin/env node
const { build } = require("estrella");

build({
	entry: "src/admin/cms.js",
	outfile: "dist/admin/cms.js",
	bundle: true,
	loader: {".js": "jsx"}
});
