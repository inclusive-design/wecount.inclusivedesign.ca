<template>
  <b-row align-h="center">
    <div class="container">
      <hr>
      <div>
        <p>
          Supported by
          <a class="is-link" href="https://www.ic.gc.ca/eic/site/118.nsf/eng/home">
            Innovation, Science and Economic<br>Development Canada
          </a>'s Accessible Technology Program.
        </p>
        <img height="55%" src="~/static/img/canada_logo.png" alt="Government of Canada Logo">
      </div>
      <p class="footer-copyright">
        © {{ today.getFullYear() }}
        <nuxt-link class="is-link" to="/">
          We Count
        </nuxt-link>
      </p>
    </div>
  </b-row>
</template>
<script>
export default {
	data () {
		return {
			today: new Date()
		}
	}
}
</script>

<style>
.footer-copyright {
	margin-top: 9rem;
	margin-bottom: 5rem;
}
hr {
	background: lightgrey;
	margin-bottom: 4rem;
}

</style>
