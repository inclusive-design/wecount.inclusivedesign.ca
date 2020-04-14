<template>
	<PostArticle :allPosts="views" :postToRender="viewToRender" />
</template>

<script>
import PostArticle from "~/components/PostArticle";
import Config from "~/assets/config";
export default {
	async validate ({ params, store }) {
		await store.dispatch("fetchViews");

		// Verify the requested views is valid
		const linkList = store.state.views.map(({ slug }) => slug);
		return linkList.includes(params.slug);
	},
	components: {
		PostArticle
	},
	data () {
		return {
		};
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
	computed: {
		views () {
			return this.$store.state.views;
		},
		viewToRender () {
			return this.views.find(view => view.slug === this.$route.params.slug);
		}
	}
};
</script>
