<template>
  <b-row align-h="center">
    <div style="width: 80%;">
      <h1>
        <b>NEWS</b>
      </h1>
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
		groupedPosts () {
			return _.chunk(this.$store.state.posts, 2)
		}
	},
	fetch ({ store }) {
		return store.dispatch("fetchPosts")
	}
}
</script>
