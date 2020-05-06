// For search functionality on the header.

/* global Vue, axios, htmlDecode, convertDate, stripHtmlTags */

const params = new URLSearchParams(window.location.search);
const searchQuery = params.get("s").toLowerCase();

new Vue({
	el: "#defaultContainer",
	mounted() {
		let vm = this;
		axios.get(
			window.location.origin + "/index.json"
		).then(function (response) {
			const results = response.data.filter((oneRecord) => {
				// Convert the fetched data to displayable values to work around the issue with using vue v-if and
				// v-html in nunjucks templates.
				oneRecord.title = htmlDecode(oneRecord.title);
				oneRecord.dateTime = oneRecord.dateTime ? convertDate(oneRecord.dateTime): undefined;
				oneRecord.excerpt = stripHtmlTags(oneRecord.excerpt);

				const tagsInString = oneRecord.tags ? oneRecord.tags.join(" ") : "";
				return oneRecord.title.concat(" ", oneRecord.content, " ", tagsInString).toLowerCase().match(searchQuery);
			});
			vm.searchResults = results;
			vm.searchStatus = `We found ${results.length} results for your search.`;
		});
	},
	data: {
		searchQuery: params.get("s"),
		searchStatus: "Searching...",
		searchResults: []
	},
	computed: {}
});
