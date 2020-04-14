<template>
	<div class="brand">
		<nuxt-link to="/">
			<WeCountLogo />
			<WeCountLogoType />
			<span class="screen-reader-only">We Count</span>
		</nuxt-link>
	</div>
</template>
<script>
import WeCountLogo from "~/assets/images/logo_wecount.svg?inline";
import WeCountLogoType from "~/assets/images/logotype.svg?inline";

export default {
	components: {
		WeCountLogo,
		WeCountLogoType
	}
};
</script>
