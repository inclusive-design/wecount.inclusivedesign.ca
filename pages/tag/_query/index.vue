<template>
	<div align-h="center">
		<div id="container">
			<h1 id="title">
				<b>TAG: "{{ searchQuery }}"</b>
			</h1>
			<div v-for="row in groupedPosts" :key="row.id">
				<div id="api-content" v-for="x in row" :key="x.id">
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
		</div>
	</div>
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
		searchQuery () {
			return decodeURIComponent(this.$nuxt.$route.fullPath.match(/tag\?s=(.*)/)[1])
		},
		filterdBlogs () {
			return this.$store.state.posts.filter((blog) => {
				return blog.title.concat(" ", blog.content, " ", blog.tags.join(" ")).toLowerCase().match(this.searchQuery.toLowerCase())
			})
		},
		groupedPosts () {
			return _.chunk(this.filterdBlogs, 2)
		}
	},
	fetch ({ store }) {
		return store.dispatch("fetchApiData", "posts")
	}
}
</script>
