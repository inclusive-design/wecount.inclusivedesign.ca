<template>
	<div id="defaultContainer">
		<Header />
		<div class="content-wrapper">
			<Aside :headers="headers" />
			<main>
				<nuxt />
			</main>
		</div>
		<Footer />
	</div>
</template>

<script>
import Header from "~/components/Header"
import Aside from "~/components/Aside"
import Footer from "~/components/Footer"
export default {
	components: {
		Header,
		Aside,
		Footer
	},
	data () {
		return {
			headers: []
		}
	},
	// In the future vue-router 4.x, <nuxt-link> will support a feature that automatically adds `aria-current="page"`
	// to links that are active with exact match (https://router.vuejs.org/api/#exact-active-class). Before Nuxt used
	// by the WeCount website is upgraded to that version, the code below is to patch the system with the same feature.
	// See https://github.com/vuejs/vue-router/issues/2116
	watch: {
		$route (to) {
			// Watch the DOM update
			this.$nextTick(() => {
				setTimeout(() => {
					this.setAriaCurrent()
				}, 0)
			})
		}
	},
	mounted () {
		this.setAriaCurrent()
	},
	methods: {
		setAriaCurrent () {
			// Logic for sideMenu
			let stateArray = []
			if (this.$route.path.includes("/views/")) {
				stateArray = this.$store.state.views
			} else {
				stateArray = this.$store.state.sitePages
			}
			this.headers = []
			if (this.$route.params.slug) {
				this.headers = stateArray.find(x => x.slug === this.$route.params.slug).headers
			}
			//
			this.$nextTick(() => {
				const app = this.$el
				const currents = app.querySelectorAll("[aria-current]")
				if (currents) {
					currents.forEach((current) => {
						current.removeAttribute("aria-current")
					})
				}
				app.querySelectorAll(".nuxt-link-exact-active").forEach((current) => {
					current.setAttribute("aria-current", "page")
				})
			})
		}
	}
}
</script>
