module.exports = {
	eleventyComputed: {
		eleventyNavigation: {
			key: data => data.title,
			parent: data => data.parent ? data.parent : false,
			order: data => data.menu_order ? data.menu_order : false
		}
	}
};
