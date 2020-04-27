<template>
	<main>
		<Posts :currentPageNum="currentPageNum" :allPosts="allNews" :title="title" :baseHref="baseHref" />
	</main>
</template>

<script>
import Posts from "~/components/Posts";
import Config from "~/assets/config";

export default {
	components: {
		Posts
	},
	head () {
		return {
			titleTemplate: this.title + " (Page " + this.currentPageNum + ") | %s",
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

		return {
			title: "News",
			baseHref: "/news",
			currentPageNum: 1,
			allNews: store.state.news
		};
	}
};
</script>
