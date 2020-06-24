module.exports = {
	ci: {
		collect: {
			settings: {
				// Source the form factor from an environment variable set in the CI run
				emulatedFormFactor: process.env.EMULATE_DEVICE || "mobile",
				// Do not apply any throttling
				throttlingMethod: "provided",
				// Skipping due to errors with reports see: http2 https://github.com/GoogleChrome/lighthouse/issues/6539
				skipAudits: ["uses-http2"],
				// Select the categories to analyze
				onlyCategories: ["performance", "accessibility", "best-practices", "seo"]
			}
		},
		assert: {
			assertions: {
				"categories:performance": ["error", {"minScore": 0.9}],
				"categories:accessibility": ["error", {"minScore": 1}],
				"categories:best-practices": ["error", {"minScore": 0.9}],
				"categories:seo": ["error", {"minScore": 0.9}]
			}
		}
	}
};
