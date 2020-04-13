<template>
	<div class="social-media">
		<h2>Follow us on social media</h2>
		<div class="social-media-icons">
			<div v-for="s in socialMedias" :key="s.id">
				<nuxt-link :to="s.href" rel="external">
					<div v-html="s.svg" />
					<span v-html="s.id" class="screen-reader-only" />
				</nuxt-link>
			</div>
		</div>
	</div>
</template>

<script>
import Config from "~/assets/config"
export default {
	data () {
		return {
			socialMedias: Config.socialMedias
		}
	}
}
</script>
