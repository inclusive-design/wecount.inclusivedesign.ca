const slugify = require("slugify");

module.exports = function (string) {
	return slugify(string, {
		replacement: "-",
		lower: true,
		strict: true
	});
};
