// Clicking the menu toggle button opens up the disclosure menu.
// Clicking anywhere else closes the disclosure menu.
document.addEventListener("click", (event) => {
	if (!event.target.closest(".site-nav .primary-nav") && !event.target.closest(".site-nav [aria-expanded]") && !event.target.matches(".site-nav [aria-expanded]")) {
		const toggleButton = document.querySelector(".site-nav [aria-expanded]");
		toggleButton.setAttribute("aria-expanded", false);
		return;
	};

	const toggleButton = event.target.closest(".site-nav [aria-expanded]");
	const expanded = "true" === toggleButton.getAttribute("aria-expanded") || false;
	toggleButton.setAttribute("aria-expanded", !expanded);
});
