<template>
	<article>
		<h1 class="title">
			{{ title }}
		</h1>
		<img :src="picture" class="postImage">
		<div v-html="content" class="api-content" />
		<div v-for="(tag, index) in tags" :key="index">
			<nuxt-link :to="{ path: '/tag/' + tag +'/1'}">
				{{ tag }}
			</nuxt-link>
		</div>
		<Pagination v-if="pageNums.length > 1" :pageLinks="pageLinks" :currentPageNum="currentPageNum" />
	</article>
</template>

<script>
import Pagination from "~/components/Pagination"
export default {
	components: {
		Pagination
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
			default: "https://wecount.inclusivedesign.ca/wp-content/uploads/2019/10/We-Count-logos_colour-and-bw-01.png"
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
