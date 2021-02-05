// For the Team page

/* global $ */

$(document).ready(function () {
	// Break all names into two lines after the first name
	let names = $(document.querySelectorAll("h2"));

	for (let i = 0; i < names.length; i++) {
		const nameContent = names[i].innerHTML;
		let replaceTo;

		// Regex to find if the name is wrapped in an <a> link
		const re = /(<.*\s.*">\w+)(\s)(.*)/;
		const matches = re.exec(nameContent);

		// When the name is a link, bypass the link html
		if (matches) {
			replaceTo = nameContent.replace(re, "$1<br />$3");
		} else {
			replaceTo = nameContent.replace(" ", " <br />");
		}

		names[i].innerHTML = replaceTo;
	}
});
