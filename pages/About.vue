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
        <b>{{ Title }}</b>
      </h1>
      <br>
      <br>
      <br>
      <div id="api-content" v-html="Content" style="width: 50%" />
      <br>
      <br>
      <br>
      <br>
      <br>
    </div>
  </b-row>
</template>

<script>
import axios from "axios"
export default {
	components: {
	},
	data () {
		return {
			Title: "",
			Content: ""
		}
	},
	// beforeMount () {
	// 	if this.api {
	// 		const res = this.api.filter(x => x.title.rendered === "About")[0]
	// 		this.Title = res.title.rendered.toUpperCase()
	// 		document.getElementById("api-content").innerHTML = res.content.rendered

	// 	}
	// 	this.api

	// },
	// async mounted () {
	// 	const ip = await this.$axios.$get("https://wecount.inclusivedesign.ca/wp-json/wp/v2/pages#")
	// 	const res = ip.filter(x => x.title.rendered === "About")[0]
	// 	this.Title = res.title.rendered.toUpperCase()
	// 	document.getElementById("api-content").innerHTML = res.content.rendered
	// },
	asyncData (context) {
		// this.$store.dispatch("fetchPosts")
		// this.$store.dispatch("fetchPages")
		// check if you got a payload first
		if (context.payload) {
		// extract the page object passed from nuxt.config.js
			return {
				Title: context.payload.page.title.rendered.toUpperCase(),
				Content: context.payload.page.content.rendered
			}
		} else {
		// if you got no context, go ahead and make the API request
			return axios.get("https://wecount.inclusivedesign.ca/wp-json/wp/v2/pages#").then((response) => {
				const res = response.data.filter(x => x.title.rendered === "About")[0]
				return {
					Title: res.title.rendered.toUpperCase(),
					Content: res.content.rendered
				}
			})
		}
	}
}
</script>
