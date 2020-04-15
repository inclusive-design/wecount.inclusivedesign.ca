// Shared utility functons

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
	}
};
