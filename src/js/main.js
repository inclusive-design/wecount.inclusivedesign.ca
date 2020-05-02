document.addEventListener("click", (event) => {
	if (event.target.id === "menuToggleButton") {
		const expanded = "true" === event.target.getAttribute( "aria-expanded" ) || false;
		event.target.setAttribute( "aria-expanded", !expanded );
	}
});
