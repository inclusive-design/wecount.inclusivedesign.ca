<template>
	<div class="funders">
		<h2>Funded by</h2>
		<ul>
			<li v-for="f in funders" :key="f.id">
				<nuxt-link :to="f.href">
					<img :src="f.logo" :alt="f.logoAlt">
					{{ f.title }}
				</nuxt-link>
			</li>
		</ul>
	</div>
</template>

<script>
import Config from "~/assets/config"
export default {
	data () {
		return {
			funders: Config.funders
		}
	}
}
</script>
