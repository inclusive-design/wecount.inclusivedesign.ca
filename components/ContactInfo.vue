<template>
	<div class="contact-info">
		<h2>
			Contact Us
		</h2>
		<p>
			<a :href="'mailto:' + email">{{ email }}</a><br>
			IDRC<br>
			205 Richmond Street West<br>
			<IdrcLogo />
		</p>
	</div>
</template>

<script>
import Config from "~/assets/config"
import IdrcLogo from "~/assets/images/logo_idrc_black_no_background.svg?inline"

export default {
	components: {
		IdrcLogo
	},
	data () {
		return {
			email: Config.contactEmail
		}
	}
}
</script>
