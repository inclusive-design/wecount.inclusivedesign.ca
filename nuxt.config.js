import axios from "axios"
import config from "./assets/config"

export default {
	mode: "universal",
	generate: {
		fallback: true,
		async routes (callback) {
			const viewsAPI = config.wpDomain + config.apiBase + "posts?categories=8"
			// Determine how many pages of posts are available
			const totalPages = await (await axios.get(`${viewsAPI}`)).headers["x-wp-totalpages"]
			// Create empty array to hold all retrieved post data in chunks of 10
			const postRoutes = []
			// Create empty array to hold all pagination routes for the News and Views page (e.g. /page/1, /page/2, etc)
			const viewsPaginationRoutes = []
			for (let postPage = 1; postPage <= totalPages; postPage++) {
				const response = await axios.get(`${viewsAPI}&page=${postPage}`)
				// Add each page index to viewsPaginationRoutes
				viewsPaginationRoutes.push({
					route: `/views/page/${postPage}`,
					payload: postPage // Is this necessary?
				})

				// Add routes for posts
				response.data.map(function (onePost) {
					postRoutes.push({
						route: `/views/${onePost.slug}`,
						payload: onePost
					})
				})
			}
			callback(null, [...viewsPaginationRoutes, ...postRoutes])
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
			{ hid: "og:image", property: "og:image", content: "/og-image.png" } // TODO: Customize per page.
		],
		link: [
			{ rel: "icon", type: "image/png", href: "/favicon.png" }
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
		"~/assets/css/main.scss"
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
		"@nuxtjs/dotenv",
		"@nuxtjs/svg",
		"nuxt-webfontloader"
	],
	webfontloader: {
		google: {
			families: ["Fira+Sans:400,400i,500,600,700&display=swap"]
		}
	},
	pwa: {
		manifest: {
			name: config.appTitle,
			short_name: config.appShortTitle,
			description: config.appDescription
		}
	},
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
