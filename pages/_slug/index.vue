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
	head () {
		return {
			titleTemplate: this.title + " | %s",
			meta: [
				{ hid: "og:title", property: "og:title", content: this.title + " | We Count" },
				{ hid: "og:url", property: "og:url", content: Config.appBaseUrl + this.$nuxt.$route.fullPath }
			]
		};
	},
	asyncData ({ $axios, $payloadURL, route, store, payload }) {
		if (process.static && process.client && $payloadURL) {
			return $axios.$get($payloadURL(route));
		}

		return payload;
	}
};
</script>
