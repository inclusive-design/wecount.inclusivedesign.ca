<template>
	<aside>
		<nav>
			<ul>
				<!-- TODO: Uncomment the code below when the secondary nav items are available -->
				<!-- <li v-for="h in headers" :key="h.id">
					<nuxt-link :to="h.href">
					{{ h.title }}
					</nuxt-link>
					</li> -->
			</ul>
		</nav>
	</aside>
</template>

<script>
export default {
	props: {
		headers: {
			type: Array,
			default: () => []
		}
	}
}
</script>
