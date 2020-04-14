import DataFetcher from "~/shared/DataFetcher.js";

export default {
	fetchNews: async (context) => {
		// Only fetch data one time when the site is up. The same data will be re-used.
		if (!context.state.isNewsFetched) {
			const news = await DataFetcher.categorizedItems("news", 8);
			context.commit("setNews", news);
		}
	},

	fetchViews: async (context) => {
		// Only fetch at the first time since the website works with a static set of data. Any data change
		// will trigger the website to be re-deployed.
		if (!context.state.isViewsFetched) {
			const views = await DataFetcher.categorizedItems("views", 1);
			context.commit("setViews", views);
		}
	},

	fetchSitePages: async (context) => {
		if (!context.state.isSitePagesFetched) {
			const sitePages = await DataFetcher.sitePages();
			context.commit("setSitePages", sitePages);
		}
	}
};
