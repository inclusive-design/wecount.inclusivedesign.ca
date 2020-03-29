<template>
	<article>
		<h1 v-html="title" class="title" />
		<img v-if="picture" :src="picture" class="news-item-img">
		<WeCountLogo v-else class="news-item-img" />
		<div v-html="content" class="api-content" />
		<div v-for="(t, index) in tags" :key="index">
			<nuxt-link :to="{ path: '/tag', query: { s: t }}">
				{{ t }}
			</nuxt-link>
		</div>
		<Pagination v-if="pageNums > 1" :pageLinks="pageLinks" :currentPageNum="currentPageNum" />
	</article>
</template>

<script>
import Pagination from "~/components/Pagination"
import WeCountLogo from "~/assets/images/logo.svg?inline"

export default {
	components: {
		Pagination,
		WeCountLogo
	},
	props: {
		posts: {
			type: Array,
			default: () => []
		},
		title: {
			type: String,
			default: "Untitled"
		},
		content: {
			type: String,
			default: "No content found"
		},
		picture: {
			type: String,
			default: null
		},
		altTag: {
			type: String,
			default: "post thumbnail"
		},
		tags: {
			type: Array,
			default: () => []
		}
	},
	computed: {
		pageNums () {
			return this.posts.length
		},
		pageLinks () {
			return Array(this.pageNums).fill().map((x, i) => this.posts[i].slug)
		},
		currentPageNum () {
			return this.posts.findIndex(post => post.slug === this.$route.params.slug) + 1
		}
	}
}
</script>
