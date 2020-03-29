export default {
	setNews: (state, news) => {
		state.news = news
		state.isNewsFetched = true
	},
	setViews: (state, views) => {
		state.views = views
		state.isViewsFetched = true
	},
	setSitePages: (state, sitePages) => {
		state.sitePages = sitePages
		state.isSitePagesFetched = true
	}
}
