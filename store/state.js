export default () => ({
	// Flags are to ensure the data will only be fetched once when the website starts because any changes
	// to the backend database will trigger the website to be re-deployed, which means the website always
	// works with a static set of data.
	news: [],
	isNewsFetched: false,

	views: [],
	isViewsFetched: false,

	sitePages: [],
	isSitePagesFetched: false
})
