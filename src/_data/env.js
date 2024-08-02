require("dotenv").config();

module.exports = {
	context: process.env.CONTEXT || "dev",
	baseUrl: process.env.DEPLOY_PRIME_URL || false
};
