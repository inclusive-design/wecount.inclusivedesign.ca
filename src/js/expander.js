document.addEventListener("click", event => {
	if (!event.target.closest(".expander button")) return false;
	const button = event.target.closest(".expander button");
	const expanded = button.getAttribute("aria-expanded") === "true" || false;
	const content = button.parentNode.nextElementSibling;
	button.setAttribute("aria-expanded", !expanded);
	if (expanded) {
		content.setAttribute("hidden", "true");
	} else {
		content.removeAttribute("hidden");
	}
});
