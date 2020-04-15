<template>
	<footer>
		<div class="footer-content">
			<!-- TODO: Remove style attribute. -->
			<nav aria-label="Footer" class="footer-nav" style="display: none;">
				<ul>
					<li v-for="menuItem in navMenu" :key="menuItem.slug">
						<!-- Adding "exact" to make sure "nuxt-link-active" class only applies to the current selected link -->
						<!-- See https://github.com/nuxt/nuxt.js/issues/2214 -->
						<nuxt-link :to="menuItem.href" exact>
							{{ menuItem.title }}
						</nuxt-link>
					</li>
				</ul>
			</nav>

			<ContactInfo />

			<SocialMedia />

			<Funders />
		</div>
		<p class="netlify-notice">
			Hosted with <a rel="external nofollower noopener" href="https://netlify.com">Netlify</a>
		</p>
	</footer>
</template>

<script>
import Utils from "~/shared/Utils";
import ContactInfo from "~/components/ContactInfo";
import SocialMedia from "~/components/SocialMedia";
import Funders from "~/components/Funders";

export default {
	components: {
		ContactInfo,
		SocialMedia,
		Funders
	},
	computed: {
		navMenu () {
			return Utils.generateNavMenu(this.$store.state.sitePages, true);
		}
	}
};
</script>
