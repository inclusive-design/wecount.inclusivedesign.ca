window.addEventListener("load", () => {
	document.querySelectorAll(".expander button").forEach(button => {
		button.addEventListener("click", () => {
			const expanded = button.getAttribute("aria-expanded") === "true";
			const content = button.parentNode.nextElementSibling;
			button.setAttribute("aria-expanded", !expanded);
			if (expanded) {
				content.setAttribute("hidden", "true");
			} else {
				content.removeAttribute("hidden");
			}
		});
	});
});
