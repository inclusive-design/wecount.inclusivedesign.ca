// For search functionality on the header.

/* global Vue, axios, search, createPagination, processResourcesDisplayResults, includesCaseInsensitive, filterResources, generateAside, getSideMenuObserver, $ */

const pageSize = 10;
const params = new URLSearchParams(window.location.search);
let searchTerm = params.get("s") ? params.get("s").trim() : "";
let pageInQuery = params.get("page");

// Get selected tags to filter
let selectedCategories = [];
let selectedTags = [];
let selectedTypes = [];

for (let p of params) {
	let queryKeyPrefix = p[0].substr(0, 2); // only need to check the first two characters
	let queryKeyWithoutPrefix = p[0].substr(2);

	if (queryKeyPrefix !== "s" && queryKeyPrefix !== "pa") { // if it's not the search term or page number...
		switch (queryKeyPrefix) {
		case "c_": // category
			selectedCategories.push(queryKeyWithoutPrefix);
			break;
		case "m_": // media type
			selectedTypes.push(queryKeyWithoutPrefix);
			break;
		case "t_": // tag
			selectedTags.push(queryKeyWithoutPrefix);
			break;
		}
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

/*
 * Bind change events for filter choice checkboxes. When a choice is checked or unchecked, update the selected
 * choices counter on the filter header.
 * @param {String} viewSelector - The selector of the static or the dynamic view template
 */
function bindChoiceChange(viewSelector) {
	// Clicking filter choices updates the corresponding counter
	const filterCheckboxes = document.querySelectorAll(viewSelector + " .filter .filter-checkbox");

	for (let i = 0; i < filterCheckboxes.length; i++) {
		filterCheckboxes[i].addEventListener("change", (e) => {
			const counterElm = $(e.target.closest(".filter-body")).prev().find(".filter-selected-choice-counter")[0];
			const currentCount = parseInt(counterElm.innerText);
			counterElm.innerText = e.target.checked ? currentCount + 1 : currentCount - 1;
		});
	}
}

new Vue({
	el: "#defaultContainer",
	data: {
		searchTerm: searchTerm,
		searchResult: "Searching...",
		tags: [],
		resultsToDisplay: [],
		pagination: null,
		resourceCategories: [],
		resourceReadabilityLevels: [],
		resourceTypes: [],
		numOfUpdated: 0
	},
	mounted() {
		let vm = this;
		let pagination;

		if (searchTerm || selectedTags.length > 0 || selectedCategories.length > 0 || selectedTypes.length > 0) {
			// Hide the static view section and show the dynamic search and filtering result section
			document.querySelector(".resources.static-view").style.display = "none";
			document.querySelector(".resources.dynamic-view").style.display = "block";
			isStaticViewVisible = false;

			axios.get(
				window.location.origin + "/resources.json"
			).then(function (response) {
				// Set up lookup arrays
				vm.resourceCategories = response.data.resourceCategories;
				vm.resourceReadabilityLevels = response.data.resourceReadabilityLevels;
				vm.resourceTypes = response.data.resourceTypes;

				// Search
				let results = response.data.resources;
				if (searchTerm) {
					results = search(results, searchTerm);
				}

				// Filter by selected tags, categories or media types
				let filterSettings = {
					categories: vm.resourceCategories || [],
					selectedCategories: selectedCategories || [],
					selectedTags: selectedTags || [],
					selectedTypes: selectedTypes || []
				};

				results = filterResources(results, filterSettings);

				// Convert some post values to formats that can be displayed
				if (results.length > 0) {
					results = processResourcesDisplayResults(results);
				}

				let tagsQuery = selectedTags.map(tag => "t_" + tag).join("=on&") +
					selectedCategories.map(cat => "c_" + cat).join("=on&") +
					selectedTypes.map(type => "t_" + type).join("=on&") + "=on";

				// Paginate search results
				if (results.length > pageSize) {
					pagination = createPagination(results, pageSize, pageInQuery, "/resources/?s=" + searchTerm + "&" + tagsQuery + "&page=:page");
				}

				// add checked states for tags, categories and media types
				vm.tags = response.data.tags.map(tag => ({ ...tag, checked: selectedTags.includes(tag.value)}));
				vm.resourceCategories = response.data.resourceCategories.map(cat => ({ ...cat, checked: includesCaseInsensitive(selectedCategories, cat.categoryId)}));
				vm.resourceTypes = response.data.resourceTypes.map(type => ({ ...type, checked: includesCaseInsensitive(selectedTypes, type.value)}));

				vm.selectedTags = response.data.tags.filter(tag => selectedTags.includes(tag.value));
				vm.pagination = pagination;
				vm.resultsToDisplay = pagination ? pagination.items : results;
				vm.searchResult = `${results.length} of ${response.data.resources.length} resources matched`;
			});
		}
	},
	updated() {
		// Re-setup the <aside> section when filter/search results are rendered
		document.querySelector("aside#toc").innerHTML="";
		setupAside("main article.dynamic-view h1, main article.dynamic-view h2");

		// Make sure change events for choice checkboxes in the dynamic view only bind once
		if (this.numOfUpdated === 0) {
			bindChoiceChange(".dynamic-view");
			this.numOfUpdated = 1;
		}
	}
});

// Set up the aside menu when pages using the static view are loaded
if (isStaticViewVisible) {
	setupAside("main article.static-view h1, main article.static-view h2");
}

// Bind change events for all choice checkboxes in the static view template
bindChoiceChange(".static-view");

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
		e.stopPropagation();
		const currentExpandedValue = expandButtons[i].getAttribute("aria-expanded");
		const expandedState = currentExpandedValue === "true" ? "false" : "true";
		expandButtons[i].setAttribute("aria-expanded", expandedState);
		expandButtons[i].setAttribute("aria-label", expandedState === "true" ? "collapse" : "expand");

		// Open/close the appropriate filter
		// Find the filter body by using its position relative to the button as well as the css selector
		// since there are two elements that match the selector (one each for static the and dynamic views).
		// Clicking on one of expand buttons only opens the form that this button corresponds to.
		const filterBodySelector = ".filter-body[data-section=\"" + expandButtons[i].dataset.section + "\"]";
		const filter = $(expandButtons[i]).parent().siblings(filterBodySelector);
		filter[expandedState === "false" ? "hide" : "show"]();

		// Show/hide the expand svg
		setExpandSVGState(expandButtons[i], expandedState);
	});
}

// clicking a filter header opens/closes the corresponding filter. It behaves the same as clicking the corresponding
// expand/collapse button.
const filterHeaders = document.querySelectorAll(".filter .filter-header");

for (let i = 0; i < filterHeaders.length; i++) {
	filterHeaders[i].addEventListener("click", () => {
		$(filterHeaders[i]).find(".filter-expand-button").click();
	});
}

// Clicking "reset filter" buttons unchecks all filter selections
const resetFilterButtons = document.querySelectorAll(".filter .reset-button");

for (let i = 0; i < resetFilterButtons.length; i++) {
	resetFilterButtons[i].addEventListener("click", () => {
		$(".filter-checkbox").prop("checked", false);
	});
}

// Clicking the text/icon for topics selects that topic in addition to the checkbox proper
const topicTitles = document.querySelectorAll(".filter .topic-title");

for (let i = 0; i < topicTitles.length; i++) {
	topicTitles[i].addEventListener("click", () => {
		$(topicTitles[i]).siblings(".topic-checkbox").find(".filter-checkbox").click();
	});
}

// Clicking the "reset filter" button on the dynamic view also submits the form to perform the search and filter
document.querySelector(".dynamic-view .reset-button").addEventListener("click", () => {
	document.querySelector(".dynamic-view form").submit();
});
