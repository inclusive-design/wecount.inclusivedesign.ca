<template>
	<div class="container">
		<div v-if="error.statusCode === 404">
			<h1>
				Page not found
			</h1>
			<p>
				The page you were looking for could not be found. It might have
				<br>
				been removed, renamed, or did not exist in the first place.
			</p>
		</div>
		<div v-else>
			<h1>
				An error occurred
			</h1>
		</div>
		<div>
			<p>
				<nuxt-link to="/">
					Home page
				</nuxt-link>
			</p>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		error: {
			type: Object,
			default: () => {}
		}
	}
}
</script>

<style>
h1 {
	font-weight: bold;
	text-transform: uppercase;
}
.container {
	display: flex;
	flex-flow: column;
}
</style>
