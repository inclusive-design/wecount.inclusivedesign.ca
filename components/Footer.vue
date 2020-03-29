<template>
	<footer>
		<div class="footer-content">
			<div class="nav-home-about">
				<div class="nav-link-wrapper">
					<nuxt-link to="/" aria-label="Goto Home">
						Home
					</nuxt-link>
				</div>
				<div class="nav-link-wrapper">
					<nuxt-link to="/about/" aria-label="Goto About">
						About
					</nuxt-link>
				</div>
			</div>

			<div class="nav-tools">
				<nuxt-link to="/tools/" aria-label="Goto Tools">
					Tools
				</nuxt-link>
			</div>

			<div class="nav-inclusion-challenges">
				<nuxt-link to="/inclusion-challenges/" aria-label="Goto Inclusion Challenges">
					Inclusion Challenges
				</nuxt-link>
			</div>

			<div class="nav-our-data">
				<div class="nav-link-wrapper">
					<nuxt-link to="/our-data/" aria-label="Goto Our Data">
						Our Data
					</nuxt-link>
				</div>
				<div class="nav-link-wrapper">
					<nuxt-link to="/news/page/1" aria-label="Goto News">
						News
					</nuxt-link>
				</div>
				<div class="nav-link-wrapper">
					<nuxt-link to="/views/page/1" aria-label="Goto Views">
						Views
					</nuxt-link>
				</div>
			</div>

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
