<template>
	<footer>
		<div class="footer-content">
			<ContactInfo />
			<SocialMedia />
			<Funders />
		</div>
		<p class="netlify-notice">
			Hosted with <nuxt-link to="https://netlify.com">
				Netlify
			</nuxt-link>
		</p>
	</footer>
</template>

<script>
import ContactInfo from "~/components/ContactInfo"
import SocialMedia from "~/components/SocialMedia"
import Funders from "~/components/Funders"
export default {
	components: {
		ContactInfo,
		SocialMedia,
		Funders
	},
	data () {
		return {
			today: new Date()
		}
	}
}
</script>
