const htmlmin = require("html-minifier");

module.exports = function htmlMinTransform(value, outputPath) {
	if (outputPath && outputPath.includes(".html")) {
		let minified = htmlmin.minify(value, {
			useShortDoctype: true,
			removeComments: true,
			collapseWhitespace: true,
			minifyCSS: true
		});
		return minified;
	}
	return value;
};
