
export default {
	eleventyComputed: {
		eleventyNavigation: {
			key: data => data.key ?? data.title,
			translation_key: data => data.translation_key ?? null,
			parent: data => data.parent ?? false,
			order: data => data.menu_order ?? false,
			locale: data => data.locale ?? 'en-CA',
		},
	},
};
