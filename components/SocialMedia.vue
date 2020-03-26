<template>
	<div class="social-media">
		<h2>Follow us on social media</h2>
		<ul>
			<li v-for="s in socialMedias" :key="s.id">
				<nuxt-link :to="s.href" v-html="s.svg" rel="external">
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
			socialMedias: Config.socialMedias
		}
	}
}
</script>
