const TurndownService = require("turndown");

module.exports = value => {
	const td = new TurndownService({
		headingStyle: "atx",
		codeBlockStyle: "fenced"
	});
	return td.turndown(value);
};
