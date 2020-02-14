<template>
	<article>
		<h1 class="title">
			{{ title }}
		</h1>
		<div v-html="content" class="api-content" />
	</article>
</template>

<script>
export default {
	props: {
		title: {
			type: String,
			default: "Untitled"
		},
		content: {
			type: String,
			default: "No content found"
		}
	}
}
</script>
