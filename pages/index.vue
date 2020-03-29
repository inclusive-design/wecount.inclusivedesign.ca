<template>
	<article>
		<PageArticle :title="title" :content="content" class="article-homepage" />
		<div class="homepage-cards">
			<a href="/views/page/1">
				<h3>Read current views <br> in inclusive <br> data science</h3>
				<BlueTile />
			</a>
			<a href="/tools/">
				<h3 class="green-title">Find inclusive<br> data tools</h3>
				<GreenTile />
			</a>
			<a href="/inclusion-challenges/">
				<h3>Participate in our <br> inclusion challenge <br> workshops</h3>
				<YellowTile />
			</a>
		</div>
	</article>
</template>

<script>
import axios from "axios"
import PageArticle from "~/components/PageArticle"
import Config from "~/assets/config"
import BlueTile from "~/assets/images/blue_tile.svg?inline"
import GreenTile from "~/assets/images/green_tile.svg?inline"
import YellowTile from "~/assets/images/yellow_tile.svg?inline"
export default {
	components: {
		PageArticle,
		BlueTile,
		GreenTile,
		YellowTile
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
