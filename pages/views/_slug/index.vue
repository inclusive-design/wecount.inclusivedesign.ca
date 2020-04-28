<template>
	<div class="content-wrapper">
		<Aside :headers="headers" />
		<main>
			<PostArticle :allPosts="views" :postToRender="viewToRender" />
		</main>
	</div>
</template>

<script>
import Aside from "~/components/Aside";
import PostArticle from "~/components/PostArticle";
import Config from "~/assets/config";
export default {
	components: {
		PostArticle,
		Aside
	},
	head () {
		return {
			titleTemplate: this.viewToRender.title + " | %s",
			meta: [
				{ hid: "og:title", property: "og:title", content: this.viewToRender.title + " | We Count" },
				{ hid: "og:url", property: "og:url", content: Config.appBaseUrl + this.$nuxt.$route.fullPath }
			]
		};
	},
	async asyncData ({ $axios, $payloadURL, route, store, payload }) {
		if (process.static && process.client && $payloadURL) {
			return $axios.$get($payloadURL(route));
		}
		await store.dispatch("fetchViews");
		const views = store.state.views;

		return {
			headers: payload.headers || [],
			views,
			viewToRender: payload
		};
	}
};
</script>
