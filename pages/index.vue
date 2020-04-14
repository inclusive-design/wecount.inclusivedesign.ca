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
			titleTemplate: "Home | %s",
			meta: [
				{ hid: "og:title", property: "og:title", content: "Home | We Count" },
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
			const res = sitePages.filter(oneSitePage => oneSitePage.slug === "home")[0];
			return {
				title: res.title,
				content: res.content
			};
		}
	}
};
</script>
