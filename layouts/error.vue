<template>
	<Article :title="title" :content="content" />
</template>

<script>
export default {
	props: {
		error: {
			type: Object,
			default: () => {}
		}
	},
	data () {
		return {
			title: (this.error.statusCode === 404) ? "Page not found" : "An error occurred",
			content: (this.error.statusCode === 404) ? "<p>The page you were looking for could not be found. It might have<br>been removed, renamed, or did not exist in the first place.</p><div><p><nuxt-link to='/'>Home page</nuxt-link></p></div>" : "<div><p><nuxt-link to='/'>Home page</nuxt-link></p></div>"
		}
	}
}
</script>
