<template>
	<article>
		<h1 class="title">
			{{ title }}
		</h1>
		<img v-if="picture" :src="picture" class="news-item-img">
		<WeCountLogo v-else class="news-item-img" />
		<div v-html="content" class="api-content" />
		<div v-for="(t, index) in tags" :key="index">
			<nuxt-link :to="{ path: '/tag', query: { s: t }}">
				{{ t }}
			</nuxt-link>
		</div>
		<Pagination v-if="pageNums.length > 1" :pageLinks="pageLinks" :currentPageNum="currentPageNum" />
	</article>
</template>

<script>
import Pagination from "~/components/Pagination"
import WeCountLogo from "~/assets/images/logo_wecount.svg?inline"
export default {
	components: {
		Pagination,
		WeCountLogo
	},
	props: {
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
		tags: {
			type: Array,
			default: () => []
		}
	},
	computed: {
		pageNums () {
			return this.$store.state.posts
		},
		pageLinks () {
			return Array(this.pageNums.length).fill().map((x, i) => this.pageNums[i].slug)
		},
		currentPageNum () {
			return this.$store.state.posts.find(post => post.slug === this.$route.params.slug).count
		}
	}
}
</script>
