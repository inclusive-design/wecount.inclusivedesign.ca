<template>
	<Posts :currentPageNum="currentPageNum" :allPosts="allViews" :title="title" :baseHref="baseHref" />
</template>

<script>
import Posts from "~/components/Posts";
import Config from "~/assets/config";

export default {
	components: {
		Posts
	},
	data () {
		return {
			title: "Views",
			baseHref: "/views",
			allViews: this.$store.state.views,
			currentPageNum: parseInt(this.$route.params.num)
		};
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
	fetch ({ store }) {
		return store.dispatch("fetchViews");
	}
};
</script>
