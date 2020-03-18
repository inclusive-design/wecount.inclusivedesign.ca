<template>
	<PageArticle :title="title" :content="content" />
</template>

<script>
import PageArticle from "~/components/PageArticle"
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
	asyncData (context) {
		return context.payload
	}
}
</script>
