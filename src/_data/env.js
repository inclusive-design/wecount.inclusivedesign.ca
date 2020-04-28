module.exports = {
	api: process.env.CONTEXT === "production" ? "https://wecount-cms.inclusivedesign.ca/wp-json/wp/v2" : "https://wecount-dev.inclusivedesign.ca/wp-json/wp/v2",
	context: process.env.CONTEXT || "dev",
	baseUrl: process.env.DEPLOY_PRIME_URL || false
};
