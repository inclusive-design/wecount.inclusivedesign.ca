// Shared utility functons
import Config from "../assets/config";

export default {
	stripHtmlTags (inputString) {
		return inputString.replace(/<\/?[^>]+(>|$)/g, "");
	},

	/**
	 * @typedef {Object} Post
	 * @property {string} slug - The slug of the post.
	 * @property {string} title - The title of the post.
	 * @property {string} author - The author of the post.
	 * @property {string} content - The content of the post.
	 * @property {string} excerpt - The excerpt.
	 * @property {date} date - The date.
	 * @property {timestamp} dateTime - The date and time.
	 * @property {array<String>} tags - An array of tags.
	 * @property {string} picture - A URL to the picture.
	 * @property {string} altTag - The alternative text for the picture.
	 * @property {string} href - A href to the internal page to view the post.
	 * @property {boolean} isExternalHref - The flag indicating whether the href points to an external URL.
	 * @property {boolean} showPreviewImage - The flag indicating whether to show the preview image.
	 */

	/**
	 * @typedef {Object} Route
	 * @property {string} route - The nuxt route that the static page should be generated.
	 */

	/**
	 * Generate static routes for categorized items such as "news" and "views".
	 * @param {string} categoryType - The category type.
	 * @param {array<Post>} allPosts - All posts in the given category type.
	 * @param {boolean} includeTagRoutes - A flag indicating if static routes for tags that are associated with the post should be included.
	 * @param {boolean} includePostRoutes - A flag indicating if static routes for posts should be included.
	 * @return {array<Route>} An array of static routes generted for this category.
	 */
	createStaticRoutesForCategorizedItems (categoryType, allPosts, includeTagRoutes, includePostRoutes) {
		const numOfPages = Math.ceil(allPosts.length / Config.numOfRecsPerPage);
		const postsRoutes = [];

		for (let pageNum = 1; pageNum <= numOfPages; pageNum++) {
			postsRoutes.push({
				route: "/" + categoryType + "/page/" + pageNum
			});
		}

		if (includeTagRoutes || includePostRoutes) {
			allPosts.forEach((onePost) => {
				if (includeTagRoutes) {
					onePost.tags.forEach((tag) => {
						postsRoutes.push({
							route: "/tag/" + encodeURI(tag)
						});
					});
				}

				if (includePostRoutes) {
					postsRoutes.push({
						route: "/" + categoryType + "/" + onePost.slug
					});
				}
			});
		}

		return postsRoutes;
	}
};
