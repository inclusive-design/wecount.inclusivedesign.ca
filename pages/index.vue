<template>
	<article>
		<PageArticle :title="title" :content="content" />
		<div class="homepage-cards">
			<a class="blue card" href="/views/">
				<h3>Read current views in inclusive data science</h3>
			</a>
			<!-- TODO: Remove hidden attribute -->
			<a class="green card" href="/tools/" hidden>
				<h3 class="green-title">Find inclusive data tools</h3>
			</a>
			<a class="yellow card" href="/inclusion-challenges/">
				<h3>Participate in our inclusion challenge workshops</h3>
			</a>
		</div>
	</article>
</template>

<script>
import axios from "axios"
import PageArticle from "~/components/PageArticle"
import Config from "~/assets/config"
export default {
	components: {
		PageArticle
	},
	data () {
		return {
			title: "",
			content: ""
		}
	},
	head () {
		return {
			titleTemplate: "Home | %s",
			meta: [
				{ hid: "og:title", property: "og:title", content: "Home | We Count" },
				{ hid: "og:url", property: "og:url", content: Config.appBaseUrl + this.$nuxt.$route.fullPath }
			]
		}
	},
	asyncData (context) {
		// check if you got a payload first
		if (context.payload) {
		// extract the page object passed from nuxt.config.js
			return {
				title: context.payload.title.rendered.toUpperCase(),
				content: context.payload.content.rendered
			}
		} else {
		// if you got no context, go ahead and make the API request
			return axios.get(`${Config.wpDomain}${Config.apiBase}pages`).then((response) => {
				const res = response.data.filter(x => x.slug === "home")[0]
				return {
					title: res.title.rendered,
					content: res.content.rendered
				}
			})
		}
	}
}
</script>
