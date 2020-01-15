import axios from "axios"

export default {
	mode: "universal",
	// generate: {
	// 	routes () {
	// 		return axios.get("https://wecount.inclusivedesign.ca/wp-json/wp/v2/posts")
	// 		.then((res) => {
	// 			return res.data.map((post) => {
	// 				return "/news/" + post.slug
	// 			})
	// 		})
	// 	}
	// }
	generate: {
		fallback: true,
		routes (callback) {
			axios.all([
				axios.get("https://wecount.inclusivedesign.ca/wp-json/wp/v2/pages"),
				axios.get("https://wecount.inclusivedesign.ca/wp-json/wp/v2/posts")
			])
				.then(axios.spread(function (pages, posts) {
					const pageRoutes = pages.data.map((page) => {
						return {
							route: "/" + page.title.rendered.toLowerCase().replace(/ /g, "-"),
							payload: page
						}
					})

					const postRoutes = posts.data.map((post) => {
						return {
							route: "/news/" + post.slug,
							payload: post
						}
					})

					callback(null, pageRoutes.concat(postRoutes))
				}), function (err) {
					return next(err)
				})
		}
	},
	/*
  ** Headers of the page
  */
	head: {
		title: process.env.npm_package_name || "",
		meta: [
			{ charset: "utf-8" },
			{ name: "viewport", content: "width=device-width, initial-scale=1" },
			{ hid: "description", name: "description", content: process.env.npm_package_description || "" }
		],
		link: [
			{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }
		]
	},
	/*
  ** Customize the progress-bar color
  */
	loading: { color: "#fff" },
	/*
  ** Global CSS
  */
	css: [
	],
	/*
  ** Plugins to load before mounting the App
  */
	plugins: [
		"@/plugins/bootstrap-vue"
	],
	/*
  ** Nuxt.js dev-modules
  */
	buildModules: [
		// Doc: https://github.com/nuxt-community/eslint-module
		"@nuxtjs/eslint-module"
	],
	/*
  ** Nuxt.js modules
  */
	modules: [
		// Doc: https://bootstrap-vue.js.org
		"bootstrap-vue/nuxt",
		// Doc: https://axios.nuxtjs.org/usage
		"@nuxtjs/axios",
		"@nuxtjs/pwa",
		// Doc: https://github.com/nuxt-community/dotenv-module
		"@nuxtjs/dotenv"
	],
	/*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
	axios: {
	},
	/*
  ** Build configuration
  */
	build: {
		/*
    ** You can extend webpack config here
    */
		extend (config, ctx) {
		}
	}
}
