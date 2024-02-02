// Configuration for observer window size/location in viewport.
// Reference: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#Creating_an_intersection_observer
const observerOptions = {
	rootMargin: "0% 0% -94% 0%" // The observer action kicks in when the target elements are in the top 6% of the viewport.
};

// eslint-disable-next-line
getSideMenuObserver = function () {
	// This object keeps track of the current content section during scroll and applies the active styling to the corresponding side menu nav item.
	return new IntersectionObserver(entries => {
		entries.forEach(entry => {
			const id = entry.target.getAttribute("id");
			if (entry.isIntersecting) {
				document.querySelectorAll("aside#toc nav li").forEach((x) => {
					x.classList.remove("active");
				});
				// When the observer detects the intersecting of an element with a specific "id", set the corresponding item on the side menu to active state.
				// Stop highlighting all items on the side menu if the intersecting element doesn't have an "id" attribute.
				if (id) {
					document.querySelector(`aside#toc nav li a[href="#${id}"]`).parentElement.classList.add("active");
				}
			}
		});
	}, observerOptions);
};
