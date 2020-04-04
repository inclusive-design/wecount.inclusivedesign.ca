<template>
	<footer>
		<div class="footer-content">
			<nav aria-label="Footer" class="footer-nav">
				<ul>
					<li>
						<!-- Adding "exact" to make sure "nuxt-link-active" class only applies to the current selected link -->
						<!-- See https://github.com/nuxt/nuxt.js/issues/2214 -->
						<nuxt-link to="/" exact>
							Home
						</nuxt-link>
					</li>

					<li>
						<nuxt-link to="/about/" exact>
							About
						</nuxt-link>
					</li>

					<li>
						<nuxt-link to="/tools/" exact>
							Tools
						</nuxt-link>
					</li>

					<li>
						<nuxt-link to="/inclusion-challenges/" exact>
							Inclusion Challenges
						</nuxt-link>
					</li>

					<li>
						<nuxt-link to="/our-data/" exact>
							Our Data
						</nuxt-link>
					</li>

					<li>
						<nuxt-link to="/news/" exact>
							News
						</nuxt-link>
					</li>

					<li>
						<nuxt-link to="/views/" exact>
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
