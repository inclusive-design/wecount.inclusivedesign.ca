<template>
	<footer>
		<ContactInfo />
		<SocialMedia />
		<Funders />
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

<style>
.footer-copyright {
	margin-top: 9rem;
	margin-bottom: 5rem;
}
#container {
	width: 80%;
}
hr {
	background: lightgrey;
	margin-bottom: 4rem;
}

</style>
