<template>
	<PostArticle :allPosts="views" :postToRender="viewToRender" />
</template>

<script>
import PostArticle from "~/components/PostArticle"
export default {
	async validate ({ params, store }) {
		await store.dispatch("fetchViews")

		// Verify the requested views is valid
		const linkList = store.state.views.map(({ slug }) => slug)
		return linkList.includes(params.slug)
	},
	head () {
		return {
			title: this.title
		}
	},
	components: {
		PostArticle
	},
	data () {
		return {
		}
	},
	computed: {
		views () {
			return this.$store.state.views
		},
		viewToRender () {
			return this.views.find(view => view.slug === this.$route.params.slug)
		}
	}
}
</script>
