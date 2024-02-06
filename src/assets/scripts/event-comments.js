/* global convertDate */

const commentForm = document.getElementById("comment-form");

commentForm.addEventListener("submit", (event) => {
	event.preventDefault();

	const nameDomElement = document.getElementById("name");
	const name = nameDomElement.value.trim();
	const commentDomElement = document.getElementById("comment");
	const comment = commentDomElement.value.trim();

	const submitFailureMessage = document.querySelector(".submit-failure-message");

	// Hide required and comment submission message.
	// Note: It's necessary to hide "required" and "succesful/failed" submitted comment message indicators programmatically even though they have been hidden initially by CSS
	// in the case the same user submits more comments after submitting an initial comment.
	document.querySelectorAll(".required-name, .required-comment, .submit-success-message, .submit-failure-message").forEach(element => {
		applyVisibility(element, false);
	});

	// Verify input Fields.
	let isValueMissing = false;

	if (name === "") {
		applyVisibility(document.querySelector(".required-name"), true, "inline");
		isValueMissing = true;
	}

	if (comment === "") {
		applyVisibility(document.querySelector(".required-comment"), true, "inline");
		isValueMissing = true;
	}

	if (isValueMissing) {
		return;
	}

	// Disable input fields when proccessing a new request.
	disableFields(true);

	const XHR = new XMLHttpRequest();

	// Bind the FormData object and the form element.
	const commentFormData = new FormData( commentForm );

	// Submit and add comment to top of comment section of page on successful data submission.
	XHR.addEventListener( "load", function () {
		if (XHR.status === 200) {
			showSubmittedComment(name, comment);
			// Show successful comment submission message.
			applyVisibility(document.querySelector(".submit-success-message"), true , "block");
			// Clear Text Fields.
			commentForm.reset();
		} else {
			// Show failed comment submission message.
			submitFailureMessage.setAttribute("style", "display: block;");
		}
		disableFields(false);
	});

	// Show failure message in case of error.
	XHR.addEventListener( "error", function () {
		// Show failed comment submission message.
		submitFailureMessage.setAttribute("style", "display: block;");
		disableFields(false);
	} );

	// Set up our request.
	XHR.open( "POST", window.location.origin + "/api/comments" );

	// The data sent is what the user provided in the form.
	const jsonFormData = JSON.stringify(Object.fromEntries(commentFormData));
	XHR.setRequestHeader("Content-Type", "application/json");
	XHR.send(jsonFormData);
});

/**
 * Hide/show required and success messages.
 * @param {DOMElement} domSelector - The DOM Element to parse.
 * @param {Boolean} toShow - value equals true to show and equals false to hide.
 * @param {?String} displayType - CSS display value to apply. Only applicable when toShow is set to true.
 */
function applyVisibility(domSelector, toShow, displayType) {
	displayType = toShow ? displayType : "none";
	domSelector.setAttribute("style", `display:  ${displayType};`);
}

/**
 * Display the new comment on the current page.
 * @param {String} name - Text of name field in comment form.
 * @param {String} comment - Text of comment field in comment form.
 */
function showSubmittedComment(name, comment) {
	// Add comment to the top of the comments section of event page.
	const newCommentDiv = document.createElement("div");
	newCommentDiv.innerHTML = "<article class='comment submitted-comment'><p><span class='comment-name'></span> | <span class='comment-date'></span></p><p class='comment-text'></p></article>";
	const commentsDiv = document.getElementsByClassName("comments")[0];
	commentsDiv.prepend(newCommentDiv.firstChild);

	const submittedCommentDiv = commentsDiv.firstChild;
	const submittedDate = submittedCommentDiv.querySelector(".comment-date");
	const submittedName = submittedCommentDiv.querySelector(".comment-name");
	const submittedComment = submittedCommentDiv.querySelector(".comment-text");

	const dateObject = new Date();

	// Add values of comment.
	submittedDate.innerText = convertDate(dateObject);
	submittedName.innerText = name;
	submittedComment.innerText = comment;
}

/**
 * Disable the "post a comment" button and text fields when the post request is in the process of sending.
 * @param {Boolean} disabled - Boolean value indicating whether or not post request is in the send state.
 */
function disableFields(disabled) {
	// WARN: Input field elements with the disabled attribute set to true are not submitted in form submissions.
	// A work around is implemented here by using the readonly attribute instead combined with styling the background color.
	// Reference: https://stackoverflow.com/questions/7357256/disabled-form-inputs-do-not-appear-in-the-request

	// Changing the background color of the input fields is only applicable when not applying UIO themes.
	// When a UIO theme is selected, the background color will remain the same as what is set by the theme.
	const backgroundColor = disabled ? "#f3f3f3" : "#fff";

	const commentFormElms = document.querySelectorAll("#name, #comment, #post-comment");
	commentFormElms.forEach( element => {
		// Set background color of comment form element.
		element.setAttribute("style", "background-color: " + backgroundColor);
		const elmType = element.nodeName.toLowerCase();
		// Disable/enable comment form element.
		element[elmType === "button" ? "disabled" : "readOnly"] = disabled;
		// When UIO themes are turned on, reduce the opacity of form elements as a disabled indicator instead of changing the background color.
		// The css class "disabled-element" is only defined with UIO themes.
		element.classList[disabled ? "add" : "remove"]("disabled-element");
	});
}
