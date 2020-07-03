// For search functionality on the header.

/* global Vue, axios, search, createPagination, processDisplayResults, filter, $ */

const pageSize = 10;
const params = new URLSearchParams(window.location.search);
let searchQuery = params.get("s");
let pageInQuery = params.get("page");

// Get tags to filter
let tags = [];
for (let p of params) {
	if (p[0] !== "s" && p[0] !== "page") {
		tags.push(p[0]);
	}
}

new Vue({
	el: "#defaultContainer",
	mounted() {
		let vm = this;
		let pagination;

		if (searchQuery || tags.length > 0) {
			// Hide the static view section and show the dynamic search and filtering result section
			document.querySelector(".views.static-view").style.display = "none";
			document.querySelector(".views.dynamic-view").style.display = "block";

			axios.get(
				window.location.origin + "/views.json"
			).then(function (response) {
				// Search
				let results = response.data;
				if (searchQuery) {
					results = search(results, searchQuery);
				}

				// Filter by tags
				if (tags.length > 0)
				{
					results = filter(results, tags);
				}

				// Convert some post values to formats that can be displayed
				if (results.length > 0) {
					results = processDisplayResults(results);
				}

				// Paginate search results
				if (results.length > pageSize) {
					pagination = createPagination(results, pageSize, pageInQuery, "/views/?s=" + searchQuery + "&page=:page");
				}

				vm.pagination = pagination;
				vm.resultsToDisplay = pagination ? pagination.items : results;
				vm.searchTitle = searchQuery ? ` search results: “${searchQuery}”` : "";
				vm.searchStatus = `We found ${results.length} results.`;
			});
		}
	},
	data: {
		searchQuery: params.get("s"),
		searchTitle: "",
		searchStatus: "Searching...",
		resultsToDisplay: [],
		pagination: null
	},
	computed: {}
});

// Clicking the expand button on the filter header opens/closes the filter
document.querySelector(".filter .filter-expand-button").addEventListener("click", (e) => {
	e.preventDefault();

	// Set button "aria-expanded" value
	const button = document.querySelector(".filter .filter-expand-button");
	const currentExpandedValue = button.getAttribute("aria-expanded");
	button.setAttribute("aria-expanded", currentExpandedValue === "true" ? "false" : "true");

	// Open/close the filter
	// Find the form filter by using its relative position with the button instead of a css selector is to work around
	// the case when there are 2 filters (one for the static view and one for the dynamic view) are on the page. Clicking
	// on one of expand buttons only opens the form that this button corresponds to.
	const form = $(button).parent().siblings();
	form[currentExpandedValue === "true" ? "hide" : "show"]();
});
