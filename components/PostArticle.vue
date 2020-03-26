<template>
	<article>
		<h1 v-html="title" class="title" />
		<img :src="picture" class="postImage">
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

export default {
	components: {
		Pagination
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
			default: "https://wecount-cms.inclusivedesign.ca/wp-content/uploads/2019/10/We-Count-logos_colour-and-bw-01.png"
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
			return this.posts.find(post => post.slug === this.$route.params.slug).count
		}
	}
}
</script>
