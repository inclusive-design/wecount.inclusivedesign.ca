<template>
	<b-row>
		<div id="container">
			<h1 id="title">
				<b>NEWS</b>
			</h1>
			<b-row v-for="row in groupedPosts" :key="row.id">
				<b-col id="api-content" v-for="x in row" :key="x.id">
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
				</b-col>
			</b-row>
		</div>
	</b-row>
</template>

<script>
import _ from "lodash"
import Post from "~/components/Post"
export default {
	components: {
		Post
	},
	data () {
		return {
		}
	},
	computed: {
		groupedPosts () {
			return _.chunk(this.$store.state.posts, 2)
		}
	},
	fetch ({ store }) {
		return store.dispatch("fetchApiData", "posts")
	}
}
</script>
