import axios from "axios"
import Config from "./assets/config"

import StaticRoutesBuilder from "./shared/StaticRoutesBuilder"

export default {
	mode: "universal",
	generate: {
		fallback: true,
		async routes (callback) {
			// 1. Build routes for site pages
			// 1.1 The static route for /news-and-views is excluded as it needs to be splitted into separate /news and /views routes
			const siteRoutes = await StaticRoutesBuilder.sitePages(["news-and-views"])

			// 1.2 The route /home in siteRoutes built above needs serve the root index page at "/"
			// Rename the route "/home" to "/"
			const homeRoute = siteRoutes.map(function (oneRoute) {
				if (oneRoute.route === "/home") {
					oneRoute.route = "/"
				}
			})

			//2. Build routes for news pages: /news/page/{pageNum}
			const newsRoutes = await StaticRoutesBuilder.categoryPages("/news", 1)

			// Determine how many pages of posts are available
			const totalPages = await (await axios.get(`${Config.wpDomain}${Config.apiBase}posts`)).headers["x-wp-totalpages"]
			// Create empty array to hold all retrieved post data in chunks of 10
			const postPagesAPI = []
			// Create empty array to hold all pagination routes for the News and Views page (e.g. /page/1, /page/2, etc)
			const newsPaginationRoutes = []
			for (let postPage = 1; postPage <= totalPages; postPage++) {
				// Add each page of posts to postPagesAPI
				postPagesAPI.push(axios.get(`${Config.wpDomain}${Config.apiBase}posts?page=${postPage}`))
				// Add each page index to newsPaginationRoutes
				newsPaginationRoutes.push({
					route: `/news-and-views/page/${postPage}`,
					payload: postPage // Is this necessary?
				})
			}
			// Spread the entries in postPagesAPI and fetch each post
			axios.all([
				...postPagesAPI
			])
				.then(axios.spread((posts) => {
					// Add each post to the postRoutes variable

					const postRoutes = []

					if (totalPages > 1) {
						posts.data.map((...post) => {
							postRoutes.push({ route: `/news-and-views/${post.slug}`, payload: post })
						})
					} else {
						posts.data.map((post) => {
							postRoutes.push({ route: `/news-and-views/${post.slug}`, payload: post })
						})
					}

					callback(null, [...newsPaginationRoutes, ...postRoutes, ...siteRoutes])
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
		"nuxt-webfontloader"
	],
	webfontloader: {
		google: {
			families: ["Fira+Sans:400,400i,500,600,700&display=swap"]
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
