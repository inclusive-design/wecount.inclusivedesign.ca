const renderExpandableHeaddingIcon = (isExpanded) => {
	return (isExpanded ?
		"<svg xmlns=\"http://www.w3.org/2000/svg\" xml:space=\"preserve\" transform=\"rotate(90)\" viewBox=\"0 0 330 330\"><path d=\"m250.606 154.389-150-149.996c-5.857-5.858-15.355-5.858-21.213.001-5.857 5.858-5.857 15.355.001 21.213l139.393 139.39L79.393 304.394c-5.857 5.858-5.857 15.355.001 21.213C82.322 328.536 86.161 330 90 330s7.678-1.464 10.607-4.394l149.999-150.004a14.996 14.996 0 0 0 0-21.213z\"/></svg>" :
		"<svg xmlns=\"http://www.w3.org/2000/svg\" xml:space=\"preserve\" viewBox=\"0 0 270 330\"><path d=\"m250.606 154.389-150-149.996c-5.857-5.858-15.355-5.858-21.213.001-5.857 5.858-5.857 15.355.001 21.213l139.393 139.39L79.393 304.394c-5.857 5.858-5.857 15.355.001 21.213C82.322 328.536 86.161 330 90 330s7.678-1.464 10.607-4.394l149.999-150.004a14.996 14.996 0 0 0 0-21.213z\"/></svg>"
	);
};

const displayHeadingContent = (content, expanded) => {
	while (content && !content.nodeName.startsWith("H")) {
		if (!expanded) {
			content.setAttribute("hidden", "true");
		} else {
			content.removeAttribute("hidden");
		}
		content = content.nextElementSibling;
	}
};

window.addEventListener("load", () => {
	document.querySelectorAll("main article h2:not(#tags)").forEach(heading => {
		heading.classList.add("expandable-heading");
		heading.innerHTML =
        `
            <button class="expandable-heading__toggle"
                aria-expanded="false">
                <div class="expandable-heading__icon">
                ${renderExpandableHeaddingIcon(false)}
                </div>
                ${heading.textContent}
            </button>
        `;
		displayHeadingContent(heading.nextElementSibling, false);
	});

	document.querySelectorAll(".expandable-heading__toggle").forEach((expandableHeading) => {
		expandableHeading.addEventListener("click", (e) => {
			const expanded = e.currentTarget.getAttribute("aria-expanded") === "true";
			e.currentTarget.setAttribute("aria-expanded", !expanded);
			e.currentTarget.querySelector(".expandable-heading__icon").innerHTML =
                renderExpandableHeaddingIcon(!expanded);
			displayHeadingContent(e.currentTarget.parentNode.nextElementSibling, !expanded);
		});
	});
});
