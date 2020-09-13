const commentForm = document.getElementById("comment-form");

const nameDOMElement = document.getElementById("name");
const commentDOMElement = document.getElementById("comment");

commentForm.addEventListener("submit", (event) => {
	event.preventDefault();

	const nameDOMElement = document.getElementById("name");
	const name = nameDOMElement.value.trim();
	const commentDOMElement = document.getElementById("comment");
	const comment = commentDOMElement.value.trim();

	const submittedCommentMessage = document.querySelector(".post-failure-message");

	disableFields(true);

	// Hide required message
	// Note: It's necessary to hide "required" indicators programmatically even though they have been hidden initially by CSS
	// in the case the same user submits more comments after submitting an initial comment
	document.querySelectorAll(".required").forEach(element => {
		applyVisibility(element, false);
	});
	// Hide comment submission message
	// Note: It's necessary to hide succesful/failed submitted comment message indicators programmatically even though they have been hidden initially by CSS
	// in the case the same user submits more comments after submitting an initial comment
	document.querySelectorAll(".save-response").forEach(element => {
		applyVisibility(element, false);
	});

	// Verify input Fields
	if ((name === "") & (comment === "")) {
		document.querySelectorAll(".required").forEach(element => {
			applyVisibility(element, true, "inline");
		});
		disableFields(false);
		return;
	}

	if (name === "") {
		applyVisibility(document.querySelector(".required-name"), true, "inline");
		disableFields(false);
		return;
	}

	if (comment === "") {
		applyVisibility(document.querySelector(".required-comment"), true, "inline");
		disableFields(false);
		return;
	}

	const XHR = new XMLHttpRequest();

	const commentForm = document.getElementById("comment-form");
	// Bind the FormData object and the form element
	const commentFormData = new FormData( commentForm );

	// submit and add comment to top of comment section of page on successful data submission
	XHR.addEventListener( "load", function() {
		if (XHR.status === 200) {
			setSubmittedComment();
			// Clear Text Fields
			commentForm.reset();
		} else {
			// Show failed comment submission message
			submittedCommentMessage.setAttribute("style", "display: block;");
		}
		disableFields(false);
	});

	// Show failure message in case of error
	XHR.addEventListener( "error", function() {
		// Show failed comment submission message
		submittedCommentMessage.setAttribute("style", "display: block;");
		disableFields(false);
	} );

	// Set up our request
	XHR.open( "POST", window.location.origin + "/api/comments" );

	// The data sent is what the user provided in the form
	const jsonFormData = JSON.stringify(Object.fromEntries(commentFormData));
	XHR.setRequestHeader("Content-Type", "application/json");
	XHR.send(jsonFormData);
});

/*
 * Hide/show required and success messages
 * @param {DOMElement} DOMselector - The DOM Element to parse.
 * @param {Boolean} toDisplay - value is true to show and false to hide
 * @param {String}[Optional] displayType - CSS display value to apply
 */
function applyVisibility(DOMselector, toShow, displayType = "none") {
	toShow ? DOMselector.setAttribute("style", `display: ${displayType};`) : DOMselector.setAttribute("style", "display: none;");
}

/*
 * Add new comment to the given workshop's page temporarily.
 */
function setSubmittedComment() {
	// Add comment to the top of the comments section of workshop page
	const newCommentDiv = document.createElement("div");
	newCommentDiv.innerHTML = "<article class='comment submitted-comment'><p><span class='comment-name'></span> | <span class='comment-date'></span></p><p class='comment-text'></p></article>";
	const commentsDiv = document.getElementsByClassName("comments")[0];
	commentsDiv.prepend(newCommentDiv.firstChild);

	const submittedCommentDiv = commentsDiv.firstChild;
	const submittedDate = submittedCommentDiv.querySelector(".comment-date");
	const submittedName = submittedCommentDiv.querySelector(".comment-name");
	const submittedComment = submittedCommentDiv.querySelector(".comment-text");

	const dateObject = new Date();
	const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

	// Add values of comment
	submittedDate.innerText = `${months[dateObject.getMonth()]} ${dateObject.getDate()}, ${dateObject.getFullYear()}`;
	submittedName.innerText = nameDOMElement.value.trim();
	submittedComment.innerText = commentDOMElement.value.trim();

	// Show successful comment submission message
	applyVisibility(document.querySelector(".post-success-message"), true , "block");
}

/*
 * Disable the "post a comment" button and text fields when the post request is in the process of sending.
 * @param {Boolean} sendingStatus - Boolean value indicating whether or not post request is in the send state.
 */
function disableFields(sendingStatus) {
	// Comment form submit button
	const postCommentButton = document.getElementById("post-comment");
	sendingStatus ? postCommentButton.setAttribute("style", "background-color: #f3f3f3") : postCommentButton.setAttribute("style", "background-color: #fff");
	postCommentButton.disabled = sendingStatus;

	// Comment form input fields
	const nameField = document.getElementById("name");
	const commentField = document.getElementById("comment");

	const commentFormFields = [nameField, commentField];

	commentFormFields.forEach( field => {
		sendingStatus ? field.setAttribute("style", "background-color: #f3f3f3") : field.setAttribute("style", "background-color: #fff");
		field.readOnly = sendingStatus;
	});
}
