<template>
  <b-row align-h="center">
    <div style="width: 80%;">
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <h1>
        <b>{{ Title }}</b>
      </h1>
      <br>
      <br>
      <br>
      <div id="api-content" style="width: 50%" />
      <br>
      <br>
      <br>
      <br>
      <br>
    </div>
  </b-row>
</template>

<script>
export default {
	components: {
	},
	data () {
		return {
			Title: ""
		}
	},
	async mounted () {
		const ip = await this.$axios.$get("https://wecount.inclusivedesign.ca/wp-json/wp/v2/pages#")
		const res = ip.filter(x => x.title.rendered === "About")[0]
		this.Title = res.title.rendered.toUpperCase()
		document.getElementById("api-content").innerHTML = res.content.rendered
	}
}
</script>
