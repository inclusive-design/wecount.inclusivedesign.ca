// For search functionality on the header.

/* global Vue, axios, search, createPagination */

const params = new URLSearchParams(window.location.search);
let searchQuery = params.get("s");
searchQuery = searchQuery ? searchQuery.toLowerCase() : undefined;
let pageInQuery = params.get("page");
const pageSize = 10;

new Vue({
	el: "#defaultContainer",
	mounted() {
		let vm = this;
		if (searchQuery) {
			axios.get(
				window.location.origin + "/views.json"
			).then(function (response) {
				// Hide the static view section and show the dynamic search and filtering result section
				document.querySelector(".views.static-view").style.display = "none";
				document.querySelector(".views.dynamic-view").style.display = "block";

				// Perform the search
				const results = search(response, searchQuery);

				// Paginate search results
				let pagination;
				if (results.length > pageSize) {
					pagination = createPagination(results, pageSize, pageInQuery, "/views/?s=" + searchQuery + "&page=:page");
				}
				vm.pagination = pagination;
				vm.resultsToDisplay = pagination ? pagination.items : results;
				vm.searchStatus = `We found ${results.length} results.`;
			});
		}
	},
	data: {
		searchQuery: params.get("s"),
		searchStatus: "Searching...",
		resultsToDisplay: [],
		pagination: null
	},
	computed: {}
});
