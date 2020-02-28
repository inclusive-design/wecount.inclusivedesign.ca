import axios from "axios"
import Config from "./assets/config"

export default {
	mode: "universal",
	generate: {
		fallback: true,
		async routes (callback) {
			const totalPages = await (await axios.get(`${Config.wpDomain}${Config.apiBase}posts`)).headers["x-wp-totalpages"]
			const postPagesAPI = []
			const newsPaginationRoutes = []
			for (let postPage = 1; postPage <= totalPages; postPage++) {
				postPagesAPI.push(axios.get(`${Config.wpDomain}${Config.apiBase}posts?page=${postPage}`))
				newsPaginationRoutes.push({ route: `/news-and-views/page/${postPage}`, payload: postPage })
			}

			axios.all([
				...postPagesAPI
			])
				.then(axios.spread((posts) => {
					// replace line below with this when totalPages > 1:
					// const postRoutes = posts.data.map((...post) => {
					const postRoutes = posts.data.map((post) => {
						return {
							route: "/news-and-views/" + post.slug,
							payload: post
						}
					})

					callback(null, [...newsPaginationRoutes, ...postRoutes])
				}))
				.catch(callback)
		}
	},
	/*
	** Headers of the page
	*/
	head: {
		title: "We Count",
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
		"~/assets/css/main.css"
	],
	/*
	** Plugins to load before mounting the App
	*/
	plugins: [
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
