// For search functionality on the header.

/* global Vue, axios, escapeSpecialChars, createPagination, processResourcesDisplayResults, includesCaseInsensitive, filterResources */

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

/*
 * Search the data set with records that match the search term.
 *
 * This search comprises the following fields:
 * - title
 * - learnTags
 * - abstract
 * - summary
 * - type
 * - keywords
 *
 * @param {Array<Object>} dataSet - A set of Resource records upon which the search will be run
 * @param {String} searchTerm - The term for which to search
 * @param {Array<Object>} resourceTags - The set of all resource tags, including value and label
 *
 * @return A subset of the input `dataSet` that have matched term in any of the searched fields
 */
function searchResources(dataSet, searchTerm, resourceTags) {
	searchTerm = searchTerm.toLowerCase();
	return dataSet.filter((oneRecord) => {
		// TODO: see if the tag value/label mapping can be done in the init for vm.tags in resources-dynamic-handler.js
		const searchableContent = (oneRecord.title + " " +
			oneRecord.learnTags.map(learnTag => resourceTags.find(tag => tag.value === learnTag).label).join(" ") + " " +
			oneRecord.summary + " " +
			oneRecord.type + " " +
			oneRecord.keywords.join(" ") + " " +
			oneRecord.abstract).toLowerCase();
		return searchableContent.match(escapeSpecialChars(searchTerm));
	});
}

/*
 * Bind click handlers for topic cards. Clicking anywhere on the topic tile is treated the same as if
 * the user had clicked on the checkbox itself.
 *
 * @param {String} viewSelector - The selector of the static or the dynamic view template
 */
function bindTopicCardClick(viewSelector)
{
	const topicCards = document.querySelectorAll(viewSelector + " .topic-choices li");

	for (let i = 0; i < topicCards.length; i++) {
		topicCards[i].addEventListener("click", () => {
			$(topicCards[i]).find("input").click();
		});
	}
}

/*
 * Bind change events for topic checkboxes. When a topic is checked or unchecked, reload the page immediately
 * to show search results.
 * @param {String} viewSelector - The selector of the static or the dynamic view template
 */
function bindTopicChange(viewSelector) {
	// Clicking filter choices updates the corresponding counter
	const topicCheckboxes = document.querySelectorAll(viewSelector + " .filter input[name^=c_]");

	for (let i = 0; i < topicCheckboxes.length; i++) {
		topicCheckboxes[i].addEventListener("change", (e) => {
			e.target.closest("form").submit();
		});
	}
}

/*
 * Bind click handlers for filter section checkbox clear buttons.
 */
function bindClearFilterButtonClick()
{
	const clearFilterButtons = document.querySelectorAll(".filter .filter-clear button");

	for (let i = 0; i < clearFilterButtons.length; i++) {
		clearFilterButtons[i].addEventListener("click", (e) => {
			$(clearFilterButtons[i]).parent().siblings("ul").find(".filter-checkbox").prop("checked", false);

			// Submit the form to update the filter after all checkboxes are unselected
			e.target.closest("form").submit();
		});
	}
}

// eslint-disable-next-line no-new
new Vue({
	el: "#defaultContainer",
	data: {
		searchTerm: searchTerm,
		searchResult: "Searching...",
		tags: [],
		resultsToDisplay: [],
		pagination: null,
		resourceCategories: [],
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

			axios.get(
				window.location.origin + "/resourceData.json"
			).then(function (response) {
				// Set up lookup arrays
				vm.resourceCategories = response.data.resourceCategories;
				vm.resourceTypes = response.data.resourceTypes;

				// Search
				let results = response.data.resources;
				if (searchTerm) {
					results = searchResources(results, searchTerm, response.data.tags);
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

				// the "filter" call is to ignore empty query strings
				let filterQuery = [
					selectedCategories.map(cat => "c_" + cat + "=on").join("&"),
					selectedTags.map(tag => "t_" + tag + "=on").join("&"),
					selectedTypes.map(type => "m_" + type + "=on").join("&")
				].filter(query => query).join("&");

				// Paginate search results
				if (results.length > pageSize) {
					pagination = createPagination(results, pageSize, pageInQuery, "/resources/?s=" + searchTerm + "&" + filterQuery + "&page=:page");
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
		// Make sure change events for choice checkboxes in the dynamic view only bind once
		if (this.numOfUpdated === 0) {
			bindTopicCardClick(".dynamic-view");
			bindTopicChange(".dynamic-view");
			bindClearFilterButtonClick();
			this.numOfUpdated = 1;
		}
	}
});

// Bind topic title checkbox selection in the static view template
bindTopicCardClick(".static-view");

// Bind change events for topic checkboxes in the static view template
bindTopicChange(".static-view");

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

// Clicking the "reset filter" button on the dynamic view also submits the form to perform the search and filter
document.querySelector(".dynamic-view .reset-button").addEventListener("click", () => {
	document.querySelector(".dynamic-view form").submit();
});
