require("dotenv").config();

module.exports = {
	airtableBase: process.env.CONTEXT === "production" ? process.env.AIRTABLE_BASE_PRODUCTION : process.env.AIRTABLE_BASE_DEV,
	context: process.env.CONTEXT || "dev",
	baseUrl: process.env.DEPLOY_PRIME_URL || false
};
