<template>
	<PostArticle :posts="views" :title="title" :content="content" :picture="picture" :tags="tags" />
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
		title () {
			return this.views.find(post => post.slug === this.$route.params.slug).title
		},
		picture () {
			return this.views.find(post => post.slug === this.$route.params.slug).picture
		},
		content () {
			return this.views.find(post => post.slug === this.$route.params.slug).content
		},
		tags () {
			return this.views.find(post => post.slug === this.$route.params.slug).tags
		}
	}
}
</script>
