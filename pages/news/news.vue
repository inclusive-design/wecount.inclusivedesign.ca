<template>
<!-- this is a copy of page/news/index.vue -->
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
        <b>NEWS</b>
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
		groupedPosts () {
			return _.chunk(this.$store.state.posts, 2)
		}
	},
	mounted () {
		return this.$store.dispatch("fetchPosts")
	},
	beforeMount () {
		return this.$store.dispatch("fetchPages")
	}
}
</script>
