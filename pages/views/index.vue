<template>
	<main>
		<Posts :currentPageNum="currentPageNum" :allPosts="allViews" :title="title" :baseHref="baseHref" />
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

		await store.dispatch("fetchViews");

		return {
			title: "Views",
			baseHref: "/views",
			currentPageNum: 1,
			allViews: store.state.views
		};
	}
};
</script>
