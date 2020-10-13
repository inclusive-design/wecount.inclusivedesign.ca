// For the Advisory Panel page

/* global $ */

// Toggle the bio description that associates with the clicked expand link.
// Also adjust the aria attributes of the link correspondingly.
function toggleExpandState(expandLink) {
	const currentExpandedValue = expandLink.getAttribute("aria-expanded");
	expandLink.setAttribute("aria-expanded", currentExpandedValue === "true" ? "false" : "true");
	expandLink.setAttribute("aria-label", currentExpandedValue === "true" ? "expand" : "collapse");
	expandLink.innerHTML = currentExpandedValue === "true" ? "+" : "-";

	// Toggle the bio description
	const bioDesc = $(expandLink).closest(".wp-block-media-text").siblings("p");
	bioDesc[currentExpandedValue === "true" ? "hide" : "show"]();
}

$(document).ready(function () {
	// Set all bio descption paragraphs as live regions
	$(document.querySelectorAll(".wp-block-media-text")).siblings("p").attr("aria-live", "polite");

	// Break all names that use <h2> into two lines after the first name section
	let names = $(document.querySelectorAll("h2"));

	for (let i = 0; i < names.length; i++) {
		const replaceTo = names[i].innerHTML.replace(" ", " <br />");
		names[i].innerHTML = replaceTo;
	}

	// Clicking the expand link opens/closes the corresponding bio description
	const expandLinks = document.querySelectorAll(".wp-block-button__link");

	for (let i = 0; i < expandLinks.length; i++) {
		// At the page load, set proper ARIA attributes
		expandLinks[i].setAttribute("aria-label", "expand");
		expandLinks[i].setAttribute("aria-expanded", "false");
		expandLinks[i].setAttribute("tabindex", "0");

		// Add event listener for expand links. Clicking the link or hitting the enter key when focusing
		// on the link triggers the toggle.
		expandLinks[i].addEventListener("click", (e) => {
			e.preventDefault();
			toggleExpandState(expandLinks[i]);
		});

		expandLinks[i].addEventListener("keypress", (e) => {
			// Hitting the enter key also triggers the toggle.
			if (e.which === 13) {
				toggleExpandState(expandLinks[i]);
			}
		});
	}
});
