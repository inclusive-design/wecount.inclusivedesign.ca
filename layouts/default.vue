<template>
	<div id="defaultContainer">
		<Header />
		<nuxt />
		<Footer />
	</div>
</template>

<script>
import Header from "~/components/Header"
import Footer from "~/components/Footer"
export default {
	components: {
		Header,
		Footer
	},
	data () {
		return {
		}
	}
}
</script>

<style>
#defaultContainer {
	background-attachment: fixed;
	background-image: url("https://wecount.inclusivedesign.ca/wp-content/uploads/2019/10/We-Count-logos_colour-and-bw-01.png");
	background-position: right;
	background-repeat: no-repeat;
}

/* Alot of this is default styling that can be removed */
html {
	box-sizing: border-box;
	font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
		Roboto, 'Helvetica Neue', Arial, sans-serif;
	font-size: 16px;
	-moz-osx-font-smoothing: grayscale;
	-webkit-font-smoothing: antialiased;
	-ms-text-size-adjust: 100%;
	-webkit-text-size-adjust: 100%;
	word-spacing: 1px;
}

*,
*:before,
*:after {
	box-sizing: border-box;
	margin: 0;
}

.button--green {
	border: 1px solid #3b8070;
	border-radius: 4px;
	color: #3b8070;
	display: inline-block;
	padding: 10px 30px;
	text-decoration: none;
}

.button--green:hover {
	background-color: #3b8070;
	color: #fff;
}

.button--grey {
	border: 1px solid #35495e;
	border-radius: 4px;
	color: #35495e;
	display: inline-block;
	margin-left: 15px;
	padding: 10px 30px;
	text-decoration: none;
}

.button--grey:hover {
	background-color: #35495e;
	color: #fff;
}
</style>
