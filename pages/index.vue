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
		this.$store.dispatch("fetchPosts")
		this.$store.dispatch("fetchPages")
		const ip = await this.$axios.$get("https://wecount.inclusivedesign.ca/wp-json/wp/v2/pages#")
		const res = ip.filter(x => x.title.rendered === "We Count")[0]
		this.Title = res.title.rendered.toUpperCase()
		document.getElementById("api-content").innerHTML = res.content.rendered
	}
}
</script>

<style>
/* contains unneeded css fields */
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
