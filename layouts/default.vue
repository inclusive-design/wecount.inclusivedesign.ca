<template>
	<div id="defaultContainer">
		<Header />
		<nuxt />
		<Footer />
	</div>
</template>

<script>
import Header from "~/components/Header";
import Footer from "~/components/Footer";
export default {
	components: {
		Header,
		Footer
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
					this.setAriaCurrent();
				}, 0);
			});
		}
	},
	mounted () {
		this.setAriaCurrent();
	},
	methods: {
		// The patch that sets `aria-current="page"`
		// to links that are active with exact match (https://router.vuejs.org/api/#exact-active-class)
		setAriaCurrent () {
			this.$nextTick(() => {
				const app = this.$el;
				const currents = app.querySelectorAll("[aria-current]");
				if (currents) {
					currents.forEach((current) => {
						current.removeAttribute("aria-current");
					});
				}
				app.querySelectorAll(".nuxt-link-exact-active").forEach((current) => {
					current.setAttribute("aria-current", "page");
				});
			});
		}
	}
};
</script>
