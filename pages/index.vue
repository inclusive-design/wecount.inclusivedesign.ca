<template>
	<main>
		<PageArticle :title="title" :content="content" />
		<div class="homepage-cards">
			<nuxt-link class="blue card" to="/views/">
				<h3>Read current views in inclusive data science</h3>
			</nuxt-link>
			<!-- TODO: Remove hidden attribute -->
			<nuxt-link class="green card" to="/tools/" hidden>
				<h3 class="green-title">
					Find inclusive data tools
				</h3>
			</nuxt-link>
			<nuxt-link class="yellow card" to="/inclusion-challenges/">
				<h3>Participate in our inclusion challenge workshops</h3>
			</nuxt-link>
		</div>
	</main>
</template>

<script>
import Config from "~/assets/config";
import PageArticle from "~/components/PageArticle";

export default {
	components: {
		PageArticle
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
	asyncData ({ $axios, $payloadURL, route, store }) {
		if (process.static && process.client && $payloadURL) {
			return $axios.$get($payloadURL(route));
		}

		return store.state.sitePages.find(oneSitePage => oneSitePage.slug === "home");
	}
};
</script>
