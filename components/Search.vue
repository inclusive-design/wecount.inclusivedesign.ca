<template>
  <b-modal id="modal-1" size="xl" hide-header="True" hide-footer="True">
    <b-form-input
      @keyup.enter="$router.push({ path: '/search', query: { s: query } }); $bvModal.hide('modal-1'); settingQ(query)"
      v-model="query"
      type="reset"
      size="lg"
      placeholder="Search for..."
    />
  </b-modal>
</template>

<script>
import { mapActions } from "vuex"
export default {
	data () {
		return {
			query: ""
		}
	},
	computed: {
	},
	methods: {
		settingQ (Q) {
			// this.fetchQuery(Q)
			// this.$store.dispatch("fetchQuery", Q)
			this.query = null
		},
		// Currently not using code below. Was testing mapActions
		...mapActions([
			"fetchQuery",
			"wpAPI"
		])
	},
	fetch ({ store }) {
	// GET_CATEGORIES action returns a Promise since it's defined as an async function
		return Promise.all([
			store.dispatch("fetchPosts"),
			store.dispatch("fetchPages")
		])
	}
}
</script>
