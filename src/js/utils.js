// Shared utility functions

// eslint-disable-next-line
convertDate = function (inputDate) {
	const dateObject = new Date(inputDate);

	const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

	return `${months[dateObject.getMonth()]} ${dateObject.getDate()}, ${dateObject.getFullYear()}`;
};

// eslint-disable-next-line
stripHtmlTags = function (inputString) {
	return inputString.replace(/<\/?[^>]+(>|$)/g, "");
};

// eslint-disable-next-line
htmlDecode = function (input) {
	let el = document.createElement("div");
	el.innerHTML = input;
	return el.innerText;
};
