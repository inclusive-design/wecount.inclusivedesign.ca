const handleToggleEvents = (toggleNode) => {
	const expanded = toggleNode.getAttribute("aria-expanded") === "true";
	toggleNode.setAttribute("aria-expanded", !expanded);
	let content = toggleNode.nextElementSibling;
	while (content && !content.nodeName.includes("H")) {
		if (!expanded) {
			content.setAttribute("hidden", "true");
		} else {
			content.removeAttribute("hidden");
		}
		content = content.nextElementSibling;
	}
};

window.addEventListener("load", () => {
	document.querySelectorAll("main article h2").forEach(heading => {
		const expandableHeadingContainer = document.createElement("div");
		expandableHeadingContainer.classList.add("expandable-heading");
		expandableHeadingContainer.setAttribute("tabIndex", "0");
		expandableHeadingContainer.setAttribute("role", "button");
		heading.parentNode.insertBefore(expandableHeadingContainer, heading);
		expandableHeadingContainer.appendChild(heading);
		expandableHeadingContainer.addEventListener("click", () => {
			handleToggleEvents(expandableHeadingContainer);
		});
		expandableHeadingContainer.addEventListener("keydown", (e) => {
			e.preventDefault();
			if (e.key === "Enter" || e.key === " ") {
				handleToggleEvents(expandableHeadingContainer);
			}
		});
	});
});
