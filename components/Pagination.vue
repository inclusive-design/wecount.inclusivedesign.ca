<template>
	<nav class="pagination is-centered" role="navigation" aria-label="pagination">
		<a v-if="currentPageNum>1" :href="beforeLink" class="pagination-previous">Previous</a>
		<a v-if="currentPageNum<postsLen" :href="afterLink" class="pagination-next">Next</a>
		<ul class="pagination-list">
			<li><span class="pagination-ellipsis">&hellip;</span></li>
			<li><a v-if="currentPageNum>1" :href="beforeLink" :aria-label="`Goto page ${beforeLink}`" class="pagination-link">{{ before }}</a></li>
			<li><a :href="currentLink" :aria-label="`Goto page ${currentPageNum}`" class="pagination-link is-current" aria-current="page">{{ currentPageNum }}</a></li>
			<li><a v-if="currentPageNum<postsLen" :href="afterLink" :aria-label="`Goto page ${afterLink}`" class="pagination-link">{{ after }}</a></li>
			<li><span class="pagination-ellipsis">&hellip;</span></li>
		</ul>
	</nav>
</template>

<script>
export default {
	props: {
		currentPageNum: {
			type: Number,
			default: 2
		}
	},
	computed: {
		postsLen () {
			return this.$store.state.posts.length
		},
		before () {
			if (this.currentPageNum <= 1) {
				return 1
			} else {
				return this.currentPageNum - 1
			}
		},
		after () {
			if (this.currentPageNum >= this.postsLen) {
				return this.postsLen
			} else {
				return this.currentPageNum + 1
			}
		},
		beforeLink () {
			return this.$store.state.posts.find(post => post.count === this.before).slug
		},
		currentLink () {
			return this.$store.state.posts.find(post => post.count === this.currentPageNum).slug
		},
		afterLink () {
			return this.$store.state.posts.find(post => post.count === this.after).slug
		}
	}
}
</script>
