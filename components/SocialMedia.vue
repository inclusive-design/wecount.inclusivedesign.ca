<template>
	<div class="social-media">
		<h2>Follow us on social media</h2>
		<ul>
			<li v-for="s in socialMedias" :key="s.id">
				<nuxt-link :to="s.href" rel="external">
					<img :src="s.svg">
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
	// },
	// computed: {
	// 	socialMedias () {
	// 		// reference: https://blog.lichter.io/posts/dynamic-images-vue-nuxt/
	// 		const result = Config.socialMedias.map(function (socialMedia) {
	// 			socialMedia.svg = require(`${socialMedia.svg}`)
	// 			return socialMedia
	// 		})
	// 		console.log(result)
	// 		return result
	// 	}
	}
}
</script>
