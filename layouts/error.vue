<template>
  <div class="container">
    <h1 v-if="error.statusCode === 404">
      Page not found teddy
    </h1>
    <h1 v-else>
      An error occurred
    </h1>
    <br>
    <nuxt-link to="/">
      Home page
    </nuxt-link>
  </div>
</template>

<script>
export default {
	props: ["error"]
}
</script>
