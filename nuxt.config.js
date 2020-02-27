import axios from "axios"
import Config from "./assets/config"

export default {
	mode: "universal",
	generate: {
		fallback: true,
		routes (callback) {
			axios.all([
				axios.get(`${Config.wpDomain}${Config.apiBase}pages`),
				axios.get(`${Config.wpDomain}${Config.apiBase}posts`)
			])
				.then(axios.spread(function (pages, posts) {
					const pageRoutes = pages.data.map((page) => {
						return {
							route: (page.slug !== "home") ? "/" + page.slug : "/",
							payload: page
						}
					})

					const postRoutes = posts.data.map((post) => {
						return {
							route: "/news-and-views/" + post.slug,
							payload: post
						}
					})

					const fullPostList = posts.data
					const indexLen = Math.ceil(fullPostList.length / 10)
					const pageNums = Array(indexLen).fill().map((x, i) => i + 1)

					const newsPaginationRoutes = pageNums.map((ind) => {
						return {
							route: "/news-and-views/page/" + ind,
							payload: ind
						}
					})

					callback(null, pageRoutes.concat(postRoutes, newsPaginationRoutes))
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
