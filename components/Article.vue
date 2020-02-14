<template>
	<article>
		<h1 class="title">
			{ Title }}
		</h1>
		<div id="api-content" v-html="Content" />
	</article>
</template>

<script>
export default {
	props: {
		Title: {
			type: String,
			default: "Untitled"
		},
		Content: {
			type: String,
			default: "No content found"
		}
	}
}
</script>
