<template>
	<div>
		<PageArticle :title="title" :content="content" />
		<div class="homepage-cards">
			<a class="blue card" href="/views/">
				<h3>Read current views in inclusive data science</h3>
			</a>
			<!-- TODO: Remove hidden attribute -->
			<a class="green card" href="/tools/" hidden>
				<h3 class="green-title">Find inclusive data tools</h3>
			</a>
			<a class="yellow card" href="/inclusion-challenges/">
				<h3>Participate in our inclusion challenge workshops</h3>
			</a>
		</div>
	</div>
</template>

<script>
import Config from "~/assets/config";
import PageArticle from "~/components/PageArticle";

export default {
	components: {
		PageArticle
	},
	data () {
		const currentPage = this.$store.state.sitePages.filter(oneSitePage => oneSitePage.slug === "home")[0];
		return {
			title: currentPage.title,
			content: currentPage.content
		};
	},
	head () {
		return {
			titleTemplate: "Home | %s",
			meta: [
				{ hid: "og:title", property: "og:title", content: "Home | We Count" },
				{ hid: "og:url", property: "og:url", content: Config.appBaseUrl + this.$nuxt.$route.fullPath }
			]
		};
	},
	fetch ({ store }) {
		return store.dispatch("fetchSitePages");
	}
};
</script>
