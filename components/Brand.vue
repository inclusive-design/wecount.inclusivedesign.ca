<template>
	<div class="brand">
		<nuxt-link to="/">
			<WeCountLogo />
			We Count
		</nuxt-link>
	</div>
</template>
<script>
import WeCountLogo from "~/assets/images/logo_wecount.svg?inline"

export default {
	components: {
		WeCountLogo
	}
}
</script>
