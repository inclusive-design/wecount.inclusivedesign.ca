<template>
  <b-row align-h="center">
    <div class="container">
      <h1 class="title">
        {{ Title }}
      </h1>
      <div class="content" v-html="Content" />
    </div>
  </b-row>
</template>

<script>
import axios from "axios"
import Config from "~/assets/config"
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
			return axios.get(`${Config.wpDomain}${Config.apiBase}pages`).then((response) => {
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
/* contains unneeded css fields */

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
