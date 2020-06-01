// Clicking the menu toggle button on the mobile layout opens up the popup menu.
// Clicking anywhere else closes this popup menu.
document.addEventListener("click", (event) => {
	if (event.target.id === "menuToggleButton") {
		const expanded = "true" === event.target.getAttribute( "aria-expanded" ) || false;
		event.target.setAttribute( "aria-expanded", !expanded );
	} else {
		// click anywhere else on the page closes the pop up menu
		document.getElementById("menuToggleButton").setAttribute( "aria-expanded", false );
	}
});

// Clicking the search svg on the header enlarges the search input box and places the focus in it.
// This is required for the mobile layout where the search icon overlays on top of the input field.
document.querySelector(".site-nav .search-container svg").addEventListener("click", () => {
	document.querySelector(".site-nav .search-container #search-form input").focus();
});
