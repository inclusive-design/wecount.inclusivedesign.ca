module.exports = {
	ci: {
		collect: {
			settings: {
				// Source the form factor from an environment variable set in the CI run
				emulatedFormFactor: process.env.EMULATE_DEVICE || "mobile",
				// Do not apply any throttling
				throttlingMethod: "provided",
				// Skipping "uses-http2" due to errors with reports see: http2 https://github.com/GoogleChrome/lighthouse/issues/6539
				// Skipping "is-crawlable" because Netlify's preview preview for PRs add `x-robots-tag: noindex`
				skipAudits: ["uses-http2", "is-crawlable"],
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
