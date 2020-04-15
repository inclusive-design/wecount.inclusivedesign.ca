// Shared utility functons

export default {
	stripHtmlTags (inputString) {
		return inputString.replace(/<\/?[^>]+(>|$)/g, "");
	},

	/**
	 * The complete Triforce, or one or more components of the Triforce.
	 * @typedef {Object} menuItem
	 * @property {String} slug - The slug of the corresponding page that the menu item lands on.
	 * @property {String} title - The title of the corresponding page that the menu item lands on.
	 * @property {String} href - The href to direct the menu item to its corresponding page.
	 */

	/**
	 * Generate the navigation menu based on the response from the Wordpress API.
	 * The retun menu array will:
	 * 1. Exclude all pages that have menu_order === 0;
	 * 2. Append "News" and "Views" menu items to the end.
	 * @param {Array<Object>} sitePages - All menu pages sorted by menu_order.
	 * @param {Boolean} includeHomeItem - A flag indicating if the home menu item should be included.
	 * @return {Array<menuItem>} An array of object including the slug, menu title and href.
	 */
	generateNavMenu (sitePages, includeHomeItem) {
		const menuItems = [];
		const homeMenuItem = [];
		const itemsToAppend = [{
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
				homeMenuItem.push({
					slug: oneSitePage.slug,
					title: "Home",
					href: "/"
				});
			}

			// Exclude pages that have menu_order === 0, which indicates the page should not be displayed on the header nav menu.
			if (oneSitePage.menu_order) {
				menuItems.push({
					slug: oneSitePage.slug,
					title: oneSitePage.title,
					href: "/" + oneSitePage.slug
				});
			}
		});

		return [...homeMenuItem, ...menuItems, ...itemsToAppend];
	}
};
