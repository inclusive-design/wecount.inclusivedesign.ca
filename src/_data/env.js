module.exports = {
	wpApi: process.env.CONTEXT === "production" ? "https://wecount-cms.inclusivedesign.ca/wp-json/wp/v2" : "https://wecount-dev.inclusivedesign.ca/wp-json/wp/v2",
	airtableBase: process.env.CONTEXT === "production" ? "appQ6MnPwuBsANUn0" : "appalfcvZ68ydXxx5",
	context: process.env.CONTEXT || "dev",
	baseUrl: process.env.DEPLOY_PRIME_URL || false
};
