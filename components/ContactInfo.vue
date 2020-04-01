<template>
	<div class="contact-info">
		<h2>
			Contact Us
		</h2>
		<div>
			<address>
				<a :href="'mailto:' + email">{{ email }}</a><br>
				IDRC<br>
				205 Richmond Street West<br>
				Toronto, ON M5V 1V3<br>
			</address>

			<div class="logo-ocadu-wrapper">
				<a href="https://idrc.ocadu.ca/">
					<IdrcLogo />
					<span class="screen-reader-only">Inclusive Design Research Centre</span>
				</a>
				<div class="logo-ocadu">
					<a href="https://ocadu.ca/">
						<OcaduLogo />
						<span class="screen-reader-only">OCAD University</span>
					</a>
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
