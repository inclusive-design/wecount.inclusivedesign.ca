// For search functionality on the header.

/* global Vue, axios, search, createPagination, processDisplayResults, filter, generateAside, getSideMenuObserver, $ */

const pageSize = 10;
const params = new URLSearchParams(window.location.search);
let searchTerm = params.get("s") ? params.get("s").trim() : "";
let pageInQuery = params.get("page");

// Get selected tags to filter
let selectedTags = [];
for (let p of params) {
	if (p[0] !== "s" && p[0] !== "page") {
		selectedTags.push(p[0]);
	}
}

let isStaticViewVisible = true;

/*
 * Set up aside menu by:
 * 1. populate content with headings sourced from given selectors;
 * 2. Highlight the aside item at scrolling with the current active heading.
 * @param {String} selectors - A string of all selectors joined in comma. These selectors identifies headings
 */
function setupAside(selectors) {
	// Populate content with headings sourced from given selectors;
	generateAside(document, selectors);
	// Highlight the scrolled-to content heading on the <aside> list.
	document.querySelectorAll(selectors).forEach((section) => {
		const contentHeaderObserver = getSideMenuObserver();
		contentHeaderObserver.observe(section);
	});
}

new Vue({
	el: "#defaultContainer",
	data: {
		searchTerm: searchTerm,
		searchResult: "Searching...",
		tags: [],
		resultsToDisplay: [],
		pagination: null
	},
	mounted() {
		let vm = this;
		let pagination;

		if (searchTerm || selectedTags.length > 0) {
			// Hide the static view section and show the dynamic search and filtering result section
			document.querySelector(".views.static-view").style.display = "none";
			document.querySelector(".views.dynamic-view").style.display = "block";
			isStaticViewVisible = false;
			console.log("set isStaticViewVisible to false");

			axios.get(
				window.location.origin + "/viewsWithTags.json"
			).then(function (response) {
				// Search
				let results = response.data.views;
				if (searchTerm) {
					results = search(results, searchTerm);
				}

				// Filter by selected tags
				let tagsQuery = "";
				if (selectedTags.length > 0)
				{
					results = filter(results, selectedTags);
					tagsQuery = selectedTags.join("=on&") + "=on";
				}

				// Convert some post values to formats that can be displayed
				if (results.length > 0) {
					results = processDisplayResults(results);
				}

				// Paginate search results
				if (results.length > pageSize) {
					pagination = createPagination(results, pageSize, pageInQuery, "/views/?s=" + searchTerm + "&" + tagsQuery + "&page=:page");
				}

				vm.tags = response.data.tags.map(tag => {
					return {
						slug: tag.slug,
						name: tag.name,
						checked: selectedTags.includes(tag.slug)
					};
				});
				vm.selectedTags = response.data.tags.filter(tag => {
					return selectedTags.includes(tag.slug);
				});
				vm.pagination = pagination;
				vm.resultsToDisplay = pagination ? pagination.items : results;
				vm.searchResult = `${results.length} of ${response.data.views.length} resources matched`;
			});
		}
	},
	updated() {
		// Re-setup the <aside> section when filter/search results are rendered
		document.querySelector("aside#toc").innerHTML="";
		setupAside("main article.dynamic-view h1, main article.dynamic-view h2");
	}
});

// Set up the aside menu when pages using the static view are loaded
if (isStaticViewVisible) {
	setupAside("main article.static-view h1, main article.static-view h2");
}

/*
 * Show/hide the corresponding arrow up and down buttons based on the expand state
 * @param {DOM element} expandButtonElm - The DOM element of the expand button.
 * @param {String} expandButtonState - A value of "true" or "false".
 */
function setExpandSVGState(expandButtonElm, expandButtonState) {
	const arrowupSVG = $(expandButtonElm).find(".arrowup");
	arrowupSVG[expandButtonState === "false" ? "hide" : "show"]();
	const arrowdownSVG = $(expandButtonElm).find(".arrowdown");
	arrowdownSVG[expandButtonState === "true" ? "hide" : "show"]();
}

// Clicking the expand button on the filter header opens/closes the filter
const expandButtons = document.querySelectorAll(".filter .filter-expand-button");

for (let i = 0; i < expandButtons.length; i++) {
	// At the page load, show/hidearrow up and down buttons based on the aria-expand state of the expand button
	const initialExpandedValue = expandButtons[i].getAttribute("aria-expanded");
	setExpandSVGState(expandButtons[i], initialExpandedValue);

	// Add event listener for expand buttons
	expandButtons[i].addEventListener("click", (e) => {
		e.preventDefault();
		const currentExpandedValue = expandButtons[i].getAttribute("aria-expanded");
		const expandedState = currentExpandedValue === "true" ? "false" : "true";
		expandButtons[i].setAttribute("aria-expanded", expandedState);
		expandButtons[i].setAttribute("aria-label", expandedState === "true" ? "collapse" : "expand");

		// Open/close the filter
		// Find the form filter by using its relative position with the button instead of a css selector is to work around
		// the case when there are 2 filters (one for the static view and one for the dynamic view) are on the page. Clicking
		// on one of expand buttons only opens the form that this button corresponds to.
		const filter = $(expandButtons[i]).parent().siblings();
		filter[expandedState === "false" ? "hide" : "show"]();

		// Show/hide the expand svg
		setExpandSVGState(expandButtons[i], expandedState);
	});
}

// Clicking "reset filter" buttons unchecks all filter selections
const resetFilterButtons = document.querySelectorAll(".filter .reset-button");

for (let i = 0; i < resetFilterButtons.length; i++) {
	resetFilterButtons[i].addEventListener("click", () => {
		$(".filter-checkbox").prop("checked", false);
	});
}

// Clicking the "reset filter" button on the dynamic view also submits the form to perform the search and filter
document.querySelector(".dynamic-view .reset-button").addEventListener("click", () => {
	document.querySelector(".dynamic-view form").submit();
});
