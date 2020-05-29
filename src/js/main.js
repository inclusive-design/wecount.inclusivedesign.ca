document.addEventListener("click", (event) => {
	if (event.target.id === "menuToggleButton") {
		const expanded = "true" === event.target.getAttribute( "aria-expanded" ) || false;
		event.target.setAttribute( "aria-expanded", !expanded );
	} else {
		// click anywhere else on the page closes the pop up menu
		document.getElementById("menuToggleButton").setAttribute( "aria-expanded", false );
	}
});
