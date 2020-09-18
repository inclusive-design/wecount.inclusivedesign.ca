module.exports = {
	wpApi: process.env.CONTEXT === "production" ? "https://wecount-cms.inclusivedesign.ca/wp-json/wp/v2" : "https://wecount-dev.inclusivedesign.ca/wp-json/wp/v2",
	airtableBase: process.env.CONTEXT === "production" ? "app47GBs2ANe0yVGS" : "appalfcvZ68ydXxx5",
	moderatorEmail: process.env.CONTEXT === "production" ? process.env.EMAIL_TO_PRODUCTION : process.env.EMAIL_TO_DEV,
	context: process.env.CONTEXT || "dev",
	baseUrl: process.env.DEPLOY_PRIME_URL || false
};
