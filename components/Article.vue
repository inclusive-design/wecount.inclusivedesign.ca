<template>
	<div>
		<h1 class="title">
			<b>{{ Title }}</b>
		</h1>
		<p id="api-content" v-html="Content" />
	</div>
</template>

<script>
export default {
	props: {
		Title: {
			type: String,
			default: "Untitled Post"
		},
		Content: {
			type: String,
			default: "We Count content"
		}
	}
}
</script>
