<template>
	<header>
		<Brand />
		<div class="site-nav">
			<NavBar />
			<SearchForm />
		</div>
	</header>
</template>

<script>
// TODO
// Want to make this more of a modal
import Brand from "~/components/Brand"
import NavBar from "~/components/NavBar"
import SearchForm from "~/components/SearchForm"
export default {
	components: {
		Brand,
		NavBar,
		SearchForm
	},
	data () {
		return {}
	}
}
</script>
