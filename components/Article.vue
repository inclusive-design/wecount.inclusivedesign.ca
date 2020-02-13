<template>
	<div>
		<h1 class="title">
			<b>{{ title }}</b>
		</h1>
		<p id="api-content" v-html="content" />
	</div>
</template>

<script>
export default {
	props: {
		title: {
			type: String,
			default: "Untitled Post"
		},
		content: {
			type: String,
			default: "We Count content"
		}
	}
}
</script>
