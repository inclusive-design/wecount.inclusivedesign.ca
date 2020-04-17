<template>
	<PageArticle :title="title" :content="content" />
</template>

<script>
import Config from "~/assets/config";
import PageArticle from "~/components/PageArticle";

export default {
	components: {
		PageArticle
	},
	data () {
		const currentPage = this.$store.state.sitePages.find(oneSitePage => oneSitePage.slug === this.$route.params.slug);

		return currentPage ? {
			title: currentPage.title,
			content: currentPage.content
		} : {
			title: "Not Found",
			content: undefined
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
	fetch ({ store }) {
		return store.dispatch("fetchSitePages");
	}
};
</script>
