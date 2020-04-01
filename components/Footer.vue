<template>
	<footer>
		<div class="footer-content">
			<nav aria-label="Footer" class="footer-nav">
				<ul>
					<li>
						<nuxt-link to="/" aria-label="Go to Home">
							Home
						</nuxt-link>
					</li>

					<li>
						<nuxt-link to="/about/" aria-label="Go to About">
							About
						</nuxt-link>
					</li>

					<li>
						<nuxt-link to="/tools/" aria-label="Go to Tools">
							Tools
						</nuxt-link>
					</li>

					<li>
						<nuxt-link to="/inclusion-challenges/" aria-label="Go to Inclusion Challenges">
							Inclusion Challenges
						</nuxt-link>
					</li>

					<li>
						<nuxt-link to="/our-data/" aria-label="Go to Our Data">
							Our Data
						</nuxt-link>
					</li>

					<li>
						<nuxt-link to="/news/page/1" aria-label="Go to News">
							News
						</nuxt-link>
					</li>

					<li>
						<nuxt-link to="/views/page/1" aria-label="Go to Views">
							Views
						</nuxt-link>
					</li>
				</ul>
			</nav>

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
