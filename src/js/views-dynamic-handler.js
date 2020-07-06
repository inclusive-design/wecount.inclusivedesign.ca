// For search functionality on the header.

/* global Vue, axios, search, createPagination, processDisplayResults, filter, $ */

function toggleFilter(toggeleButton, expandedState) {
	if (!expandedState) {
		const currentExpandedValue = toggeleButton.getAttribute("aria-expanded");
		expandedState = currentExpandedValue === "true" ? "false" : "true";
	}
	toggeleButton.setAttribute("aria-expanded", expandedState);

	// Open/close the filter
	// Find the form filter by using its relative position with the button instead of a css selector is to work around
	// the case when there are 2 filters (one for the static view and one for the dynamic view) are on the page. Clicking
	// on one of expand buttons only opens the form that this button corresponds to.
	const filter = $(toggeleButton).parent().siblings();
	filter[expandedState === "false" ? "hide" : "show"]();
}

const pageSize = 10;
const params = new URLSearchParams(window.location.search);
let searchQuery = params.get("s");
let pageInQuery = params.get("page");

// Get selected tags to filter
let selectedTags = [];
for (let p of params) {
	if (p[0] !== "s" && p[0] !== "page") {
		selectedTags.push(p[0]);
	}
}

new Vue({
	el: "#defaultContainer",
	mounted() {
		let vm = this;
		let pagination;

		if (searchQuery || selectedTags.length > 0) {
			// Hide the static view section and show the dynamic search and filtering result section
			document.querySelector(".views.static-view").style.display = "none";
			document.querySelector(".views.dynamic-view").style.display = "block";

			axios.get(
				window.location.origin + "/viewsWithTags.json"
			).then(function (response) {
				// Search
				let results = response.data.views;
				if (searchQuery) {
					results = search(results, searchQuery);
				}

				// Filter by selected tags
				if (selectedTags.length > 0)
				{
					results = filter(results, selectedTags);
				}

				// Convert some post values to formats that can be displayed
				if (results.length > 0) {
					results = processDisplayResults(results);
				}

				// Paginate search results
				if (results.length > pageSize) {
					pagination = createPagination(results, pageSize, pageInQuery, "/views/?s=" + searchQuery + "&page=:page");
				}

				vm.tags = response.data.tags;
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
		tags: [],
		resultsToDisplay: [],
		pagination: null
	},
	computed: {}
});

// Clicking the expand button on the filter header opens/closes the filter
const expandButtons = document.querySelectorAll(".filter .filter-expand-button");

for (let i = 0; i < expandButtons.length; i++) {
	expandButtons[i].addEventListener("click", (e) => {
		e.preventDefault();
		toggleFilter(expandButtons[i]);
	});
}
