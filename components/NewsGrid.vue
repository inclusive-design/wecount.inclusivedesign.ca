
<template>
	<div class="news-grid">
		<div v-for="post in postList" :key="post.id" class="api-content">
			<NewsItem
				:picture="post.picture"
				:title="post.title"
				:date="post.date"
				:slug="post.slug"
			/>
		</div>
	</div>
</template>

<script>
// import _ from "lodash"
import NewsItem from "~/components/NewsItem"
export default {
	components: {
		NewsItem
	},
	props: {
		postList: {
			type: Array,
			default: () => []
		}
	},
	computed: {
		// groupedList () {
		// 	return _.chunk(this.postList, 2)
		// }
	}
}
</script>
