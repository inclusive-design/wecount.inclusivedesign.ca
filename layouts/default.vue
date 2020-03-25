<template>
	<div id="defaultContainer">
		<Header />
		<nuxt />
		<Footer />
	</div>
</template>

<script>
import Header from "~/components/Header"
import Footer from "~/components/Footer"
export default {
	components: {
		Header,
		Footer
	},
	data () {
		return {
		}
	}
}
</script>
