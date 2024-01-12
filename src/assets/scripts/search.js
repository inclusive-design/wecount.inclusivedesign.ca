// For search functionality on the header.

/* global Vue, axios, search, createPagination, processDisplayResults */

const params = new URLSearchParams(window.location.search);
const searchTerm = params.get("s").toLowerCase();
let pageInQuery = params.get("page");
const pageSize = 10;

// eslint-disable-next-line no-new
new Vue({
	el: "#defaultContainer",
	mounted() {
		let vm = this;
		let results = [];

		axios.get(
			window.location.origin + "/index.json"
		).then(function (response) {
			// Perform the search
			results = search(response.data, searchTerm);

			// Convert some post values to formats that can be displayed
			if (results.length > 0) {
				results = processDisplayResults(results);
			}

			// Paginate search results
			let pagination;
			if (results.length > pageSize) {
				pagination = createPagination(results, pageSize, pageInQuery, "/search/?s=" + searchTerm + "&page=:page");
			}
			vm.pagination = pagination;
			vm.resultsToDisplay = pagination ? pagination.items : results;
			vm.searchStatus = `We found ${results.length} results for your search.`;
		});
	},
	data: {
		searchTerm: params.get("s"),
		searchStatus: "Searching...",
		resultsToDisplay: [],
		pagination: null
	}
});
