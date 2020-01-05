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
      <br>
      <h1><b>SEARCH: "{{ searchQuery }}"</b></h1>
      <br>
      <p>We found {{ pagesPosts.length }} results for your search.</p>
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
			// const myRegexp = /rch\?s=(.*)/
			// const currentPath = this.$nuxt.$route.fullPath
			// const match = myRegexp.exec(currentPath)
			// return match[1]
			return decodeURIComponent(this.$nuxt.$route.fullPath.match(/rch\?s=(.*)/)[1])
		},
		filterdBlogs () {
			return this.$store.state.posts.filter((blog) => {
				return blog.title.concat(" ", blog.content, " ", blog.tags.join(" ")).toLowerCase().match(this.searchQuery.toLowerCase())
			})
		},
		filteredPages () {
			return this.$store.state.pages.filter((page) => {
				return page.title.concat(" ", page.content).toLowerCase().match(this.searchQuery.toLowerCase())
			})
		},
		pagesPosts () {
			return this.filterdBlogs.concat(this.filteredPages)
		},
		groupedPosts () {
			console.log(this.pagesPosts)
			return _.chunk(this.pagesPosts, 2)
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
