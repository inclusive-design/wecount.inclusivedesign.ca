module.exports = {
	base: process.env.ELEVENTY_ENV === "dev" ? "https://wecount-dev.inclusivedesign.ca/wp-json/wp/v2" : "https://wecount-cms.inclusivedesign.ca/wp-json/wp/v2"
};
