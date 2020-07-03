module.exports = {
	eleventyComputed: {
		tagsOfViews: (data) => {
			let tags = [];
			data.collections.views.map(post => {
				tags = tags.concat(post.tags.filter(({slug}) => {
					const currentTagSlugs = tags.map(({slug}) => slug);
					return currentTagSlugs.indexOf(slug) < 0;
				}));
			});
			return tags;
		}
	}
};
