<template>
	<nav class="pagination is-centered" role="navigation" aria-label="pagination">
		<a v-if="currentPageNum > 1" :href="beforeLink" class="pagination-previous">Previous</a>
		<a v-if="currentPageNum < postsLen" :href="afterLink" class="pagination-next">Next</a>
		<ul class="pagination-list">
			<li v-if="currentPageNum > 2">
				<a :href="firstLink" class="pagination-link" aria-label="Goto page 1">1</a>
			</li>
			<li v-if="currentPageNum > 2">
				<span class="pagination-ellipsis">&hellip;</span>
			</li>
			<li v-if="currentPageNum > 1">
				<a :href="beforeLink" :aria-label="`Goto page ${before}`" class="pagination-link">{{ before }}</a>
			</li>
			<li><a :href="currentLink" :aria-label="`Goto page ${currentPageNum}`" class="pagination-link is-current" aria-current="page">{{ currentPageNum }}</a></li>
			<li v-if="currentPageNum < postsLen">
				<a :href="afterLink" :aria-label="`Goto page ${after}`" class="pagination-link">{{ after }}</a>
			</li>
			<li v-if="currentPageNum < postsLen - 1">
				<span class="pagination-ellipsis">&hellip;</span>
			</li>
			<li v-if="currentPageNum < postsLen - 1">
				<a :href="lastLink" class="pagination-link" aria-label="Goto page 86">{{ postsLen }}</a>
			</li>
		</ul>
	</nav>
</template>

<script>
export default {
	props: {
		currentPageNum: {
			type: Number,
			default: 2
		},
		pageLinks: {
			type: Array,
			default: () => []
		}
	},
	computed: {
		postsLen () {
			return this.pageLinks.length
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
			return this.pageLinks[0]
		},
		beforeLink () {
			return this.pageLinks[this.before - 1]
		},
		currentLink () {
			return this.pageLinks[this.currentPageNum - 1]
		},
		afterLink () {
			return this.pageLinks[this.after - 1]
		},
		lastLink () {
			return this.pageLinks[this.pageLen - 1]
		}
	}
}
</script>
