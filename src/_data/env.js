import {env} from "node:process";

export default {
	context: env.CONTEXT || "dev",
	baseUrl: env.DEPLOY_PRIME_URL || false
};
