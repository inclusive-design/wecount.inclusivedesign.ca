#!/usr/bin/env node
const { build } = require("estrella");

build({
	entry: "src/admin/cms.jsx",
	outfile: "dist/admin/cms.js",
	bundle: true,
});
