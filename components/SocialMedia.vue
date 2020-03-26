<template>
	<div class="social-media">
		<h2>Follow us on social media</h2>
		<ul>
			<li v-for="s in socialMedias" :key="s.id">
				<nuxt-link :to="s.href" rel="external">
					<img :src="s.svg">
					<!-- <div v-html="s.svg" /> -->
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
		}
	},
	computed: {
		socialMedias () {
			// Reference: https://blog.lichter.io/posts/dynamic-images-vue-nuxt/
			const result = Config.socialMedias.map(function (socialMedia) {
				socialMedia.svg = require(`~/assets/images/${socialMedia.svg}`)
				return socialMedia
			})
			return result
		}
	}
}
</script>
