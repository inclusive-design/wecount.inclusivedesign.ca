<template>
	<nav class="pagination is-centered" role="navigation" aria-label="pagination">
		<nuxt-link v-if="currentPageNum > 1" :to="beforeLink" class="pagination-previous">
			Previous
		</nuxt-link>
		<nuxt-link v-if="currentPageNum < postsLen" :to="afterLink" class="pagination-next">
			Next
		</nuxt-link>
		<ul class="pagination-list">
			<li v-if="currentPageNum > 2">
				<nuxt-link :to="firstLink" class="pagination-link" aria-label="Goto page 1">
					1
				</nuxt-link>
			</li>
			<li v-if="before - 1 > 1">
				<span class="pagination-ellipsis">&hellip;</span>
			</li>
			<li v-if="currentPageNum > 1">
				<nuxt-link :to="beforeLink" :aria-label="`Goto page ${before}`" class="pagination-link">
					{{ before }}
				</nuxt-link>
			</li>
			<li>
				<nuxt-link :to="currentLink" :aria-label="`Goto page ${currentPageNum}`" class="pagination-link is-current" aria-current="page">
					{{ currentPageNum }}
				</nuxt-link>
			</li>
			<li v-if="currentPageNum < postsLen">
				<nuxt-link :to="afterLink" :aria-label="`Goto page ${after}`" class="pagination-link">
					{{ after }}
				</nuxt-link>
			</li>
			<li v-if="postsLen - after > 1">
				<span class="pagination-ellipsis">&hellip;</span>
			</li>
			<li v-if="currentPageNum < postsLen - 1">
				<nuxt-link :to="lastLink" :aria-label="`Goto page ${postsLen}`" class="pagination-link">
					{{ postsLen }}
				</nuxt-link>
			</li>
		</ul>
	</nav>
</template>

<script>
export default {
	props: {
		currentPageNum: {
			type: Number,
			default: 1
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
			return this.pageLinks[this.postsLen - 1]
		}
	}
}
</script>
