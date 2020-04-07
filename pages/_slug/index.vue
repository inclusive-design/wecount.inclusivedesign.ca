<template>
	<PageArticle :title="title" :content="content" />
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
			titleTemplate: this.title + " | %s"
		}
	},
	asyncData (context) {
		return axios.get(`${Config.wpDomain}${Config.apiBase}pages`).then((response) => {
			const res = response.data.filter(x => x.slug === context.params.slug)[0]
			return {
				title: res.title.rendered,
				content: res.content.rendered
			}
		})
	}
}
</script>
