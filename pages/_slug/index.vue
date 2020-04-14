<template>
	<PageArticle :title="title" :content="content" />
</template>

<script>
import Config from "~/assets/config";
import DataFetcher from "~/shared/DataFetcher";
import PageArticle from "~/components/PageArticle";

export default {
	components: {
		PageArticle
	},
	data () {
		return {
			title: "",
			content: ""
		};
	},
	head () {
		return {
			titleTemplate: this.title + " | %s",
			meta: [
				{ hid: "og:title", property: "og:title", content: this.title + " | We Count" },
				{ hid: "og:url", property: "og:url", content: Config.appBaseUrl + this.$nuxt.$route.fullPath }
			]
		};
	},
	async asyncData (context) {
		if (context.payload) {
			// Extract the page object passed from nuxt.config.js for building the static page
			return {
				title: context.payload.title,
				content: context.payload.content
			};
		} else {
			// Build the dynamic page when starting the website using `npm run dev`
			const sitePages = await DataFetcher.sitePages();
			const res = sitePages.filter(oneSitePage => oneSitePage.slug === context.params.slug)[0];
			return {
				title: res.title,
				content: res.content
			};
		}
	}
};
</script>
