<template>
	<div>
		<h2>
			Contact Us
		</h2>
		<p>
			<a :href="'mailto:' + email">{{ email }}</a><br>
			IDRC<br>
			205 Richmond Street West<br>
			<img src="~/static/img/idrc.png">
		</p>
	</div>
</template>

<script>
import Config from "~/assets/config"
export default {
	data () {
		return {
			email: Config.contactEmail
		}
	}
}
</script>
