<template>
	<article class="news-item">
		<h1 class="title">
			{{ title }}
		</h1>
		<div v-for="row in groupedList" :key="row.id" class="row">
			<div v-for="x in row" :key="x.id" class="api-content">
				<Post
					v-if="row.length>1"
					:picture="x.picture"
					:title="x.title"
					:date="x.date"
					:slug="x.slug"
				/>
				<Post
					v-else
					:picture="x.picture"
					:title="x.title"
					:date="x.date"
					:slug="x.slug"
					style="width: 50%"
				/>
			</div>
		</div>
	</article>
</template>

<script>
import _ from "lodash"
import Post from "~/components/Post"
export default {
	components: {
		Post
	},
	props: {
		title: {
			type: String,
			default: "Untitled"
		},
		postList: {
			type: String,
			default: () => []
		}
	},
	computed: {
		groupedList () {
			return _.chunk(this.postList, 2)
		}
	}
}
</script>
