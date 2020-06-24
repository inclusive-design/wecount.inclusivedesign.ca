// For search functionality on the header.

/* global Vue, axios, search, createPagination */

const params = new URLSearchParams(window.location.search);
const searchQuery = params.get("s").toLowerCase();
let pageInQuery = params.get("page");
const pageSize = 10;

new Vue({
	el: "#defaultContainer",
	mounted() {
		let vm = this;
		axios.get(
			window.location.origin + "/index.json"
		).then(function (response) {
			// Perform the search
			const results = search(response, searchQuery);

			// Paginate search results
			let pagination;
			if (results.length > pageSize) {
				pagination = createPagination(results, pageSize, pageInQuery, "/search/?s=" + searchQuery + "&page=:page");
			}
			vm.pagination = pagination;
			vm.resultsToDisplay = pagination ? pagination.items : results;
			vm.searchStatus = `We found ${results.length} results for your search.`;
		});
	},
	data: {
		searchQuery: params.get("s"),
		searchStatus: "Searching...",
		resultsToDisplay: [],
		pagination: null
	}
});
