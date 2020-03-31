<template>
	<article class="post-article">
		<h1 v-html="postToRender.title" class="title" />

		<div v-html="postToRender.author" class="author" />

		<div v-html="postToRender.date" class="date" />

		<div v-html="postToRender.content" class="api-content" />

		<div class="tags">
			Tags:
			<div v-for="(t, index) in postToRender.tags" :key="index">
				<nuxt-link :to="{ path: '/tag', query: { s: t }}">
					{{ t }}
				</nuxt-link>
			</div>
		</div>

		<Pagination v-if="pageNums > 1" :pageLinks="pageLinks" :currentPageNum="currentPageNum" />
	</article>
</template>

<script>
import Pagination from "~/components/Pagination"

export default {
	components: {
		Pagination
	},
	props: {
		allPosts: {
			type: Array,
			default: () => []
		},
		postToRender: {
			type: Object,
			default: () => []
		}
	},
	computed: {
		pageNums () {
			return this.allPosts.length
		},
		pageLinks () {
			return Array(this.pageNums).fill().map((x, i) => this.allPosts[i].slug)
		},
		currentPageNum () {
			return this.allPosts.findIndex(post => post.slug === this.$route.params.slug) + 1
		}
	}
}
</script>
