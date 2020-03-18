import axios from "axios"
import Config from "../assets/config"

export default {
	/**
	 * Build static routes for site pages
	 * @param {String[]} toExclude - An array of slugs of site pages to be excluded from the returned routes.
     * @return {Object[]} An array of static routes for site pages. The route data structure is:
	 * {
	 *     route: {String},
	 *     payload: {
	 *         title: {String},
	 *         content: {String}
	 *     }
     * }
	 */
	sitePages (toExclude) {
		const sitePagesAPI = Config.wpDomain + Config.apiBase + "pages"
		const routes = []

		return axios.get(`${sitePagesAPI}`).then((response) => {
			const sitePagesData = response.data
			sitePagesData.map(function (oneSitePage) {
				if (!oneSitePage.slug.includes(toExclude)) {
					routes.push({
						route: `/${oneSitePage.slug}`,
						payload: {
							title: oneSitePage.title.rendered.toUpperCase(),
							content: oneSitePage.content.rendered
						}
					})
				}
			})
			return routes
		})
	},

	categoryPages (categoryBaseRoute, categoryId) {
		const categoryAPI = Config.wpDomain + Config.apiBase + "posts?categories=" + categoryId
		const routes = []

		return axios.get(`${categoryAPI}`).then((response) => {
			const posts = response.data
			posts.map(function (onePost) {
			})
			return routes
		})
	}
}
