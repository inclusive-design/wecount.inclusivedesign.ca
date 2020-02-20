<template>
	<nav class="pagination is-centered" role="navigation" aria-label="pagination">
		<a class="pagination-previous">Previous</a>
		<a class="pagination-next">Next page</a>
		<ul class="pagination-list">
			<li><a class="pagination-link" aria-label="Goto page 1">1</a></li>
			<li><span class="pagination-ellipsis">&hellip;</span></li>
			<li><a class="pagination-link" aria-label="Goto page 45">{{ before }}</a></li>
			<li><a class="pagination-link is-current" aria-label="Page 46" aria-current="page">{{ currentPageNum }}</a></li>
			<li><a class="pagination-link" aria-label="Goto page 47">{{ after }}</a></li>
			<li><span class="pagination-ellipsis">&hellip;</span></li>
			<li><a class="pagination-link" aria-label="Goto page 86">{{ postLen }}</a></li>
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
		postLen () {
			return this.$store.state.post.length()
		},
		before () {
			return this.currentPageNum - 1
		},
		after () {
			return this.currentPageNum + 1
		}
	}
}
</script>
