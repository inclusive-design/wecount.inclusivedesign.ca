// Shared utility functons
import Config from "../assets/config";

export default {
	stripHtmlTags (inputString) {
		return inputString.replace(/<\/?[^>]+(>|$)/g, "");
	},

	/**
	 * generateNavMenu() returns an array of menu items. The structure of a menu item is:
	 * @typedef {Object} MenuItem
	 * @property {string} slug - The slug of the corresponding page that the menu item lands on.
	 * @property {string} title - The title of the corresponding page that the menu item lands on.
	 * @property {string} href - The href to direct the menu item to its corresponding page.
	 */

	/**
	 * Generate the navigation menu based on the response from the Wordpress API.
	 * The retun menu array will:
	 * 1. Exclude all pages that have menu_order === 0;
	 * 2. Append "News" and "Views" menu items to the end.
	 * @param {array<Object>} sitePages - All menu pages sorted by menu_order.
	 * @param {boolean} includeHomeItem - A flag indicating if the home menu item should be included.
	 * @return {array<MenuItem>} An array of object including the slug, menu title and href.
	 */
	generateNavMenu (sitePages, includeHomeItem) {
		const menuItems = [];
		const homeMenuItem = [];
		// Since "News" and "Views" don't have landing pages defined at the WP back-end, these menu items need to
		// be explicitly appended to the nav menu. Using "append" is because they are the last 2 nav elements according
		// to the design.
		const extraMenuItemsToAppend = [{
			slug: "news",
			title: "News",
			href: "/news"
		}, {
			slug: "views",
			title: "Views",
			href: "/views"
		}];

		sitePages.forEach((oneSitePage) => {
			if (includeHomeItem && oneSitePage.slug === "home" && oneSitePage.menu_order === 0) {
				// The title "Home" is hardcoded based on the slug is because the title received from the API response is
				// `Creating an inclusive data ecosystem`, which doesn't provide any hint that it's a home page. And it also
				// doesn't match what's on the design.
				homeMenuItem.push({
					slug: oneSitePage.slug,
					title: "Home",
					href: "/"
				});
			}

			// Exclude pages that have menu_order === 0, which indicates the page should not be displayed on the header nav menu.
			if (oneSitePage.menu_order !== 0) {
				menuItems.push({
					slug: oneSitePage.slug,
					title: oneSitePage.title,
					href: "/" + oneSitePage.slug
				});
			}
		});

		return [...homeMenuItem, ...menuItems, ...extraMenuItemsToAppend];
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
		let k = 0;

		for (let pageNum = 1; pageNum <= numOfPages; pageNum++) {
			postsRoutes.push({
				route: "/" + categoryType + "/page/" + pageNum,
				payload: allPosts.slice(k, k + Config.numOfRecsPerPage) || allPosts.slice(k, allPosts.length)
			});
			k += Config.numOfRecsPerPage;
		}

		if (includeTagRoutes || includePostRoutes) {
			allPosts.forEach((onePost) => {
				if (includeTagRoutes) {
					onePost.tags.forEach((tag) => {
						postsRoutes.push({
							route: "/tag/" + tag.toLowerCase().replace(/\s+/g, "-"),
							payload: allPosts.filter(function (x) {
								return x.tags.includes(tag);
							})
						});
					});
				}

				if (includePostRoutes) {
					postsRoutes.push({
						route: "/" + categoryType + "/" + onePost.slug,
						payload: onePost
					});
				}
			});
		}

		return postsRoutes;
	}
};
