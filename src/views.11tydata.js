module.exports = {
	eleventyComputed: {
		tagsOfViews: (data) => {
			let tags = [];
			data.collections.views.map(post => {
				tags = tags.concat(post.tags.filter((item) => tags.indexOf(item) < 0));
			});
			return tags;
		}
	}
};
