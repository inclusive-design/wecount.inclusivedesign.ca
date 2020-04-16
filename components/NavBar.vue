<template>
	<nav class="nav-bar">
		<nuxt-link v-for="menuItem in navMenu" :key="menuItem.slug" :to="menuItem.href">
			{{ menuItem.title }}
		</nuxt-link>
	</nav>
</template>

<script>
export default {
	props: {
		navMenu: {
			type: Array,
			default: () => []
		}
	}
};
</script>
