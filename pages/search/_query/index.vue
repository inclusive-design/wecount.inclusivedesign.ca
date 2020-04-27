<template>
	<main>
		<article>
			<h1 class="title">
				Search: “{{ searchQuery }}”
			</h1>
			<p role="status">
				We found {{ searchResults.length }} results for your search.
			</p>
			<NewsGrid :postList="pagePostList[$route.query.page ? parseInt($route.query.page) - 1 : 0]" />
			<Pagination v-if="pageCount > 1" :pageLinks="pageLinks" :currentPageNum="currentPageNum" />
		</article>
	</main>
</template>

<script>
import _ from "lodash";
import Pagination from "~/components/Pagination";
import NewsGrid from "~/components/NewsGrid";
import Config from "~/assets/config.js";

export default {
	components: {
		NewsGrid,
		Pagination
	},
	head () {
		return {
			titleTemplate: "Search (Page " + this.currentPageNum + ") | %s",
			meta: [
				{ hid: "og:title", property: "og:title", content: this.title + " (Page " + this.currentPageNum + ") | We Count" },
				{ hid: "og:url", property: "og:url", content: Config.appBaseUrl + this.$nuxt.$route.fullPath }
			]
		};
	},
	computed: {
		searchQuery () {
			return decodeURIComponent(this.$route.query.s);
		},
		currentPageNum () {
			return this.$route.query.page ? parseInt(this.$route.query.page) : 1;
		},
		foundNews () {
			return this.$store.state.news.filter((oneNews) => {
				return oneNews.title.concat(" ", oneNews.content, " ", oneNews.tags.join(" ")).toLowerCase().match(this.searchQuery.toLowerCase());
			});
		},
		foundViews () {
			return this.$store.state.views.filter((oneViews) => {
				return oneViews.title.concat(" ", oneViews.content, " ", oneViews.tags.join(" ")).toLowerCase().match(this.searchQuery.toLowerCase());
			});
		},
		foundSitePages () {
			return this.$store.state.sitePages.filter((page) => {
				return page.title.concat(" ", page.content).toLowerCase().match(this.searchQuery.toLowerCase());
			});
		},
		searchResults () {
			return [...this.foundNews, ...this.foundViews, ...this.foundSitePages];
		},
		pageCount () {
			return Math.ceil(this.searchResults.length / Config.numOfRecsPerPage);
		},
		pageLinks () {
			const pageLinks = [];
			for (let i = 1; i <= this.pageCount; i++) {
				pageLinks.push(`/search?s=${this.searchQuery}&page=${i}`);
			}
			return pageLinks;
		},
		pagePostList () {
			return _.chunk(this.searchResults, Config.numOfRecsPerPage);
		}
	},
	fetch ({ store }) {
		return Promise.all([
			store.dispatch("fetchSitePages"),
			store.dispatch("fetchNews"),
			store.dispatch("fetchViews")
		]);
	}
	// Below is an attempt to make search behave more statically. This approach did not work.
	//* ****************************************************************************************************************************************************** */
	// async asyncData ({ $axios, $payloadURL, route, store }) {
	// 	if (process.static && process.client && $payloadURL) {
	// 		return $axios.$get($payloadURL(route));
	// 	}

	// 	await store.dispatch("fetchNews");
	// 	await store.dispatch("fetchViews");
	// 	await store.dispatch("fetchSitePages");

	// 	const searchQuery = route.query.s || "NICETALK";
	// 	const foundNews = store.state.news.filter((oneNews) => { return oneNews.title.concat(" ", oneNews.content, " ", oneNews.tags.join(" ")).toLowerCase().match(searchQuery.toLowerCase()); });
	// 	const foundViews = store.state.views.filter((oneViews) => { return oneViews.title.concat(" ", oneViews.content, " ", oneViews.tags.join(" ")).toLowerCase().match(searchQuery.toLowerCase()); });
	// 	const foundSitePages = store.state.sitePages.filter((page) => { return page.title.concat(" ", page.content).toLowerCase().match(searchQuery.toLowerCase()); });
	// 	const numOfRecsPerPage = Config.numOfRecsPerPage;
	// 	const searchResults = [...foundNews, ...foundViews, ...foundSitePages];
	// 	const pageCount = Math.ceil(searchResults.length / numOfRecsPerPage);
	// 	const pageLinks = [];
	// 	for (let i = 1; i <= pageCount; i++) {
	// 		pageLinks.push(`/search?s=${searchQuery}&page=${i}`);
	// 	}

	// 	return {
	// 		searchQuery,
	// 		currentPageNum: route.query.page ? parseInt(route.query.page) : 1,
	// 		searchResults,
	// 		pageCount,
	// 		pageLinks,
	// 		pagePostList: _.chunk(searchResults, numOfRecsPerPage)

	// 	};
	// }
};
</script>
