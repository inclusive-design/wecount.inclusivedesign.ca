<template>
	<aside>
		<nav>
			<ul>
				<!-- <li v-for="h in headers" :key="h.id">
		<nuxt-link :to="h.href">
		{{ h.title }}
		</nuxt-link>
		</li> -->
				<!-- TODO: the <li> elements below are hard coded to show an example of how styles will look. This will be replaced by the commented out html code above. -->
				<li>
					<nuxt-link to="#title1">
						title1
					</nuxt-link>
				</li>
				<li>
					<nuxt-link to="#title2">
						title2
					</nuxt-link>
				</li>
				<li>
					<nuxt-link to="#title3">
						title3
					</nuxt-link>
				</li>
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
