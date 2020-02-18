<template>
	<Article :title="title" :content="content" />
</template>

<script>
import axios from "axios"
import Article from "~/components/Article"
import Config from "~/assets/config"
export default {
	components: {
		Article
	},
	data () {
		return {
			title: "",
			content: ""
		}
	},
	asyncData (context) {
		// check if you got a payload first
		if (context.payload) {
		// extract the page object passed from nuxt.config.js
			return {
				title: context.payload.page.title.rendered.toUpperCase(),
				content: context.payload.page.content.rendered
			}
		} else {
		// if you got no context, go ahead and make the API request
			return axios.get(`${Config.wpDomain}${Config.apiBase}pages`).then((response) => {
				const res = response.data.filter(x => x.title.rendered === "Tools")[0]
				return {
					title: res.title.rendered.toUpperCase(),
					content: res.content.rendered
				}
			})
		}
	}
}
</script>
