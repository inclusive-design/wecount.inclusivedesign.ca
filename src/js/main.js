/* global $, toggleMenu */

// Clicking the menu toggle button on the mobile layout opens up the popup menu
// and sets the button "aria-expanded" attribute value properly.
// eslint-disable-next-line
toggleMenu = function (expanded) {
	document.getElementById("menuToggleButton").setAttribute("aria-expanded", expanded);
	$($(".nav-smallScreen").children("nav.primary-nav")[0]).toggle(expanded);
};

// Clicking the menu toggle button on the mobile layout opens up the popup menu.
// Clicking anywhere else closes this popup menu.
document.addEventListener("click", (event) => {
	if (event.target.id === "menuToggleButton") {
		const expanded = "true" === event.target.getAttribute("aria-expanded") || false;
		toggleMenu(!expanded);
	} else {
		// click anywhere else on the page closes the pop up menu
		toggleMenu(false);
	}
});

// Clicking the search svg on the header enlarges the search input box and places the focus in it.
// This is required for the mobile layout where the search icon overlays on top of the input field.
document.querySelector(".site-nav .nav-smallScreen .search-container svg").addEventListener("click", () => {
	document.querySelector(".site-nav .nav-smallScreen .search-container #search-form input").focus();
});

// Configuration for observer window size/location in viewport
// Reference: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#Creating_an_intersection_observer
const observerOptions = {
	rootMargin: "0% 0% -80% 0%"
};

// This object keeps track of the current content section during scroll and applies the active styling to the corresponding side menu nav item
const contentHeaderObserver = new IntersectionObserver(entries => {
	entries.forEach(entry => {
		const id = entry.target.getAttribute("id");
		if (entry.isIntersecting) {
			document.querySelectorAll("aside#toc nav li").forEach((x) => {
				x.classList.remove("active");
			});
			document.querySelector(`aside#toc nav li a[href="#${id}"]`).parentElement.classList.add("active");
		}
	});
}, observerOptions);

// Track all h1 and h2 in content for the following pages: About, Inclusion Challenges, Views post page
document.querySelectorAll("main article.post-article h1, main article.page h1, main article.post-article h2, main article.page h2").forEach((section) => {
	contentHeaderObserver.observe(section);
});
