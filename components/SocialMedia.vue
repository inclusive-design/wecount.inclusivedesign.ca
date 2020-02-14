<template>
	<div class="social-media">
		<h2>Follow us on social media</h2>
		<ul>
			<li v-for="s in socialMedia" :key="s.id">
				<nuxt-link :to="s.href">
					{{ s.title }}
				</nuxt-link>
			</li>
		</ul>
	</div>
</template>

<script>
import Config from "~/assets/config"
export default {
	data () {
		return {
			solcialMedia: Config.socialMedia
		}
	}
}
</script>
