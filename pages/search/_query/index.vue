<template>
  <b-row align-h="center">
    <div id="container">
      <h1 id="title">
        <b>SEARCH: "{{ searchQuery }}"</b>
      </h1>
      <p>We found {{ pagesPosts.length }} results for your search.</p>
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

<style scoped>

#api-content {
	margin-bottom: 0px;
}

</style>

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
	fetch ({ store }) {
		return Promise.all([
			store.dispatch("fetchApiData", "posts"),
			store.dispatch("fetchApiData", "pages")
		])
	}
}
</script>
