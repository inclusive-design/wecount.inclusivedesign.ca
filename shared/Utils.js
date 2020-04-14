// Shared utility functons

export default {
	stripHtmlTags (inputString) {
		return inputString.replace(/<\/?[^>]+(>|$)/g, "");
	},

	/**
	 * Generate the navigation menu based on the response from the Wordpress API.
	 * The retun menu array will:
	 * 1. Exclude all pages whose menu_order === 0;
	 * 2. Append "News" and "Views" menu items to the end.
	 * @param {Array<Object>} sitePages - All menu pages sorted by menu_order.
	 * @param {Boolean} includeHomeItem - A flag indicating if the home menu item should be included.
	 * @return {Array<Object>} An array of object including the slug, menu title and href.
	 */
	generateNavMenu (sitePages, includeHomeItem) {
		// Don't include the menu item for "home" by default
		includeHomeItem = includeHomeItem === undefined ? false : includeHomeItem;
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
			if (includeHomeItem && oneSitePage.slug === "home") {
				homeMenuItem.push({
					slug: oneSitePage.slug,
					title: "Home",
					href: "/"
				});
			}

			if (oneSitePage.menu_order > 0) {
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
