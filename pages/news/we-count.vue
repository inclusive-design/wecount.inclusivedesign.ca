<template>
  <b-row align-h="center">
    <div id="container">
      <h1 id="title">
        <b>{{ Title }}</b>
      </h1>
      <div id="api-content" v-html="Content" />
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
	asyncData (context) {
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
				const res = response.data.filter(x => x.title.rendered === "We Count")[0]
				return {
					Title: res.title.rendered.toUpperCase(),
					Content: res.content.rendered
				}
			})
		}
	}
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
