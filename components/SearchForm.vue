<template>
	<div class="search-container">
		<form id="search-form" action="/search">
			<input :placeholder="placeholder" :aria-label="ariaLabel" name="s" type="search">
			<input :value="context" type="hidden" name="context">
		</form>
	</div>
</template>

<script>
export default {
	props: {
		placeholder: {
			type: String,
			default: "Search..."
		},
		ariaLabel: {
			type: String,
			default: "Search"
		},
		context: {
			type: String,
			default: ""
		}
	}
};
</script>
