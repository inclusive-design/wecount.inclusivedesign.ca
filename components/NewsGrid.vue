
<template>
	<div class="news-grid">
		<div v-for="post in postList" :key="post.id" class="api-content">
			<NewsItem
				:picture="post.picture"
				:altTag="post.altTag"
				:title="post.title"
				:date="post.date"
				:dateTime="post.dateTime"
				:slug="post.slug"
			/>
		</div>
	</div>
</template>

<script>
import NewsItem from "~/components/NewsItem"
export default {
	components: {
		NewsItem
	},
	props: {
		postList: {
			type: Array,
			// reason for using function can be found here: https://github.com/vuejs/vue/issues/1032 and here: https://vuejs.org/v2/guide/components-props.html#Prop-Validation
			default: () => []
		}
	},
	computed: {
	}
}
</script>
