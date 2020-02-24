<template>
	<Article :title="Title" :content="Content" :picture="Picture" :tags="Tags" />
</template>

<script>
import Article from "~/components/Article"
export default {
	async validate ({ params, store }) {
		if (store.state.posts === null) {
			await store.dispatch("fetchApiData", "posts")
		}
		const linkList = store.state.posts.map(({ slug }) => slug)
		return linkList.includes(params.slug)
	},
	head () {
		return {
			title: this.Title
		}
	},
	components: {
		Article
	},
	data () {
		return {
		}
	},
	computed: {
		links () {
			return this.$store.state.posts.map(({ slug }) => slug)
		},
		linkNames () {
			return this.links.map(x => x.replace(/-/g, " "))
		},
		Title () {
			return this.$store.state.posts.find(post => post.slug === this.$route.params.slug).title
		},
		Picture () {
			return this.$store.state.posts.find(post => post.slug === this.$route.params.slug).picture
		},
		Content () {
			return this.$store.state.posts.find(post => post.slug === this.$route.params.slug).content
		},
		Tags () {
			return this.$store.state.posts.find(post => post.slug === this.$route.params.slug).tags
		}
	}
}
</script>
