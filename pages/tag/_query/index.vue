<template>
  <b-row align-h="center">
    <div style="width: 80%;">
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <h1>
        <b>TAG: "{{ searchQuery }}"</b>
      </h1>
      <br>
      <br>
      <b-row v-for="row in groupedPosts">
        <b-col v-for="x in row">
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
		return store.dispatch("fetchPosts")
	}
}
</script>
