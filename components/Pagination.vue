<template>
	<nav class="pagination is-centered" role="navigation" aria-label="pagination">
		<a v-if="currentPageNum>1" :href="beforeLink" class="pagination-previous">Previous</a>
		<a v-if="currentPageNum<postsLen" :href="afterLink" class="pagination-next">Next</a>
		<ul class="pagination-list">
			<li><a :href="firstLink" class="pagination-link" aria-label="Goto page 1">1</a></li>
			<li><span class="pagination-ellipsis">&hellip;</span></li>
			<li><a :href="beforeLink" class="pagination-link" aria-label="Goto page 45">{{ before }}</a></li>
			<li><a :href="currentLink" class="pagination-link is-current" aria-label="Page 46" aria-current="page">{{ currentPageNum }}</a></li>
			<li><a :href="afterLink" class="pagination-link" aria-label="Goto page 47">{{ after }}</a></li>
			<li><span class="pagination-ellipsis">&hellip;</span></li>
			<li><a :href="lastLink" class="pagination-link" aria-label="Goto page 86">{{ postsLen }}</a></li>
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
		firstLink () {
			return this.$store.state.posts.find(post => post.count === 1).slug
		},
		beforeLink () {
			return this.$store.state.posts.find(post => post.count === this.before).slug
		},
		currentLink () {
			return this.$store.state.posts.find(post => post.count === this.currentPageNum).slug
		},
		afterLink () {
			return this.$store.state.posts.find(post => post.count === this.after).slug
		},
		lastLink () {
			return this.$store.state.posts.find(post => post.count === this.postsLen).slug
		}
	}
}
</script>
