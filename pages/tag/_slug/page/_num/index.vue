<template>
	<main>
		<article class="container">
			<h1 class="title">
				Tag: “{{ searchQuery }}”
			</h1>
			<NewsGrid :postList="pagePostList[$route.params.num ? parseInt($route.params.num) - 1 : 0]" />
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
			titleTemplate: this.searchQuery + " (Page " + this.currentPageNum + ") | Tag | %s",
			meta: [
				{ hid: "og:title", property: "og:title", content: this.title + " (Page " + this.currentPageNum + ") | We Count" },
				{ hid: "og:url", property: "og:url", content: Config.appBaseUrl + this.$nuxt.$route.fullPath }
			]
		};
	},
	async asyncData ({ $axios, $payloadURL, route, store }) {
		if (process.static && process.client && $payloadURL) {
			return $axios.$get($payloadURL(route));
		}

		await store.dispatch("fetchNews");
		await store.dispatch("fetchViews");

		const searchQuery = route.params.slug.replace("-", " ");
		const foundNews = store.state.news.filter((oneNews) => { return oneNews.tags.join(" ").toLowerCase().match(searchQuery.toLowerCase()); });
		const foundViews = store.state.views.filter((oneViews) => { return oneViews.tags.join(" ").toLowerCase().match(searchQuery.toLowerCase()); });
		const numOfRecsPerPage = Config.numOfRecsPerPage;
		const searchResults = [...foundNews, ...foundViews];
		const pageCount = Math.ceil(searchResults.length / numOfRecsPerPage);
		const pageLinks = [];
		for (let i = 1; i <= pageCount; i++) {
			pageLinks.push(`/tag/${searchQuery}/page/${i}`);
		}

		return {
			searchQuery,
			currentPageNum: route.params.num ? parseInt(route.params.num) : 1,
			searchResults,
			pageCount,
			pageLinks,
			pagePostList: _.chunk(searchResults, numOfRecsPerPage)

		};
	}
};
</script>
