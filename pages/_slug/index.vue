<template>
	<div class="content-wrapper">
		<Aside :headers="headers" />
		<main>
			<PageArticle :title="title" :content="content" />
		</main>
	</div>
</template>

<script>
import Aside from "~/components/Aside";
import Config from "~/assets/config";
import PageArticle from "~/components/PageArticle";

export default {
	components: {
		PageArticle,
		Aside
	},
	data () {
		const currentPage = this.$store.state.sitePages.find(oneSitePage => oneSitePage.slug === this.$route.params.slug);

		if (currentPage) {
			return {
				title: currentPage.title,
				content: currentPage.content,
				headers: this.$store.state.sitePages.find(x => x.slug === this.$route.params.slug).headers || []
			};
		} else {
			this.$nuxt.error({
				statusCode: 404
			});
			return {
				title: "Page not found",
				content: ""
			};
		}
	},
	fetch ({ store }) {
		return store.dispatch("fetchSitePages");
	},
	head () {
		return {
			titleTemplate: this.title + " | %s",
			meta: [
				{ hid: "og:title", property: "og:title", content: this.title + " | We Count" },
				{ hid: "og:url", property: "og:url", content: Config.appBaseUrl + this.$nuxt.$route.fullPath }
			]
		};
	}
};
</script>
