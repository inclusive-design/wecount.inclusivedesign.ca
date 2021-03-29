const TurndownService = require("turndown");

const turndownService = new TurndownService();

module.exports = value => {
	return turndownService.turndown(value);
};
