<template>
	<div class="contact-info">
		<h2>
			Contact Us
		</h2>
		<div>
			<a :href="'mailto:' + email">{{ email }}</a><br>
			IDRC<br>
			205 Richmond Street West<br>
			<div class="logo-ocadu-wrapper">
				<IdrcLogo />
				<div class="logo-ocadu">
					<OcaduLogo />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Config from "~/assets/config"
import IdrcLogo from "~/assets/images/logo_idrc.svg?inline"
import OcaduLogo from "~/assets/images/logo_ocadu.svg?inline"

export default {
	components: {
		IdrcLogo,
		OcaduLogo
	},
	data () {
		return {
			email: Config.contactEmail
		}
	}
}
</script>
