<template>
	<div id="defaultContainer">
		<Header />
		<Aside :headers="headers" />
		<nuxt />
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
		}
	}
}
</script>
