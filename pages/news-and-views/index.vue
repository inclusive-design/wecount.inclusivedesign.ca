<template>
	<b-row align-h="center">
		<div id="container">
			<h1 id="title">
				<b>NEWS</b>
			</h1>
			<b-row v-for="row in groupedPosts" :key="row.id">
				<b-col id="api-content" v-for="x in row" :key="x.id" />
			</b-row>
		</div>
	</b-row>
</template>

<script>
import _ from "lodash"
export default {
	components: {
	},
	data () {
		return {
		}
	},
	computed: {
		groupedPosts () {
			return _.chunk(this.$store.state.posts, 2)
		}
	},
	fetch ({ store }) {
		return store.dispatch("fetchApiData", "posts")
	}
}
</script>
