module.exports = {
	eleventyComputed: {
		eleventyNavigation: {
			key: data => data.key ? data.key : data.title,
			parent: data => data.parent ? data.parent : false,
			order: data => data.menu_order ? data.menu_order : false
		}
	}
};
