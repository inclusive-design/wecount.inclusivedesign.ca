<template>
	<article>
		<PageArticle :title="title" :content="content" class="article-homepage" />
		<div class="homepage-cards">
			<a href="/views/page/1"><div class="card">
				<h3>Read current views <br> in inclusive <br> data science</h3>
				<Blue class="c1" />
			</div></a>
			<a href="/tools/"><div class="card">
				<h3>Find inclusive<br> data tools</h3>
				<Green class="c2" />
			</div></a>
			<a href="/inclusion-challenges/"><div class="card">
				<h3>Participate in our <br> inclusion challenge <br> workshops</h3>
				<Yellow class="c3" />
			</div></a>
		</div>
	</article>
</template>

<script>
import axios from "axios"
import PageArticle from "~/components/PageArticle"
import Config from "~/assets/config"
import Blue from "~/assets/images/Home page tile_blue_cropped.svg?inline"
import Green from "~/assets/images/Home page tile_green_cropped.svg?inline"
import Yellow from "~/assets/images/Home page tile_yellow_cropped.svg?inline"
export default {
	components: {
		PageArticle,
		Blue,
		Green,
		Yellow
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
