<template>
	<main>
		<PageArticle :title="title" :content="content" />
	</main>
</template>

<script>
import PageArticle from "~/components/PageArticle";
export default {
	components: {
		PageArticle
	},
	props: {
		error: {
			type: Object,
			default: () => {}
		}
	},
	data () {
		return {
			title: (this.error.statusCode === 404) ? "Page not found" : "An error occurred",
			content: (this.error.statusCode === 404) ? "<p>The page you were looking for could not be found. It might have been removed, renamed, or did not exist in the first place.</p><p><a href='/'>Home page</a></p>" : "<p><a href='/'>Home page</a></p>"
		};
	},
	// Tempory patch for bug on error page
	// BUG: all header links are not present on error page
	beforeCreate () {
		return this.$store.dispatch("fetchSitePages");
	}
};
</script>
