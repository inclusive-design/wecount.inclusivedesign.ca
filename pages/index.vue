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
.container {
	align-items: center;
	display: flex;
	justify-content: center;
	margin: 0 auto;
	min-height: 100vh;
	text-align: center;
}

.title {
	color: #35495e;
	display: block;
	font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
		'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
	font-size: 100px;
	font-weight: 300;
	letter-spacing: 1px;
}

.subtitle {
	color: #526488;
	font-size: 42px;
	font-weight: 300;
	padding-bottom: 15px;
	word-spacing: 5px;
}

.links {
	padding-top: 15px;
}
</style>
