const commentForm = document.getElementById("comment-form");

const name = document.getElementById("name");
const comment = document.getElementById("comment");

commentForm.addEventListener("submit", (event) => {
	event.preventDefault();

	if (requiredFieldVerified(name) & requiredFieldVerified(comment)) {

		disableFields(true);

		const XHR = new XMLHttpRequest();

		// Bind the FormData object and the form element
		const commentFormData = new FormData( commentForm );

		// Define what happens on successful data submission
		XHR.addEventListener( "load", function() {
			setSubmittedComment();
			disableFields(false);
		});

		// Define what happens in case of error
		XHR.addEventListener( "error", function() {
			// Show successful comment submission message
			const submittedCommentMessage = document.querySelector(".post-failure-message");
			submittedCommentMessage.setAttribute("style", "display: block;");
			disableFields(false);
		} );

		// Set up our request
		XHR.open( "POST", window.location.origin + "/api/comments" );

		// The data sent is what the user provided in the form
		const jsonFormData = JSON.stringify(Object.fromEntries(commentFormData));
		XHR.setRequestHeader("Content-Type", "application/json");
		XHR.send(jsonFormData);
	}
});

/*
 * Verify text is entered in the given field.
 * @param {DomElement} filedName - The DOM Element to parse.
 * @return {Boolean} -  False if value is an empty string and true otherwise.
 */
function requiredFieldVerified(fieldName){

	const formControl = fieldName.parentElement;
	const requiredMessage = formControl.querySelector(".required");

	if (fieldName.value.trim() === "") {

		// Hide successful comment submission message
		const submittedCommentMessage = document.querySelector(".submitted-comment-message");
		submittedCommentMessage.setAttribute("style", "display: none;");

		// Show required message
		requiredMessage.setAttribute("style", "display: inline;");

		return false;

	} else {

		// Hide required message
		requiredMessage.setAttribute("style", "display: none;");

		return true;
	}
}

/*
 * Add new comment to the given workshop's page temporarily.
 */
function setSubmittedComment() {

	// Add comment to the top of the comments section of workshop page
	const tempWrapper = document.createElement("div");
	tempWrapper.innerHTML = "<article class='comment submitted-comment'><p><span class='comment-name'></span> | <span class='comment-date'></span></p><p class='comment-text'></p></article>";
	const commentsDiv = document.getElementsByClassName("comments")[0];
	commentsDiv.prepend(tempWrapper.firstChild);

	const submittedCommentDiv = commentsDiv.firstChild;
	const submittedDate = submittedCommentDiv.querySelector(".comment-date");
	const submittedName = submittedCommentDiv.querySelector(".comment-name");
	const submittedComment = submittedCommentDiv.querySelector(".comment-text");

	const dateObject = new Date();
	const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

	// Add values of comment
	submittedDate.innerText = `${months[dateObject.getMonth()]} ${dateObject.getDate()}, ${dateObject.getFullYear()}`;
	submittedName.innerText = name.value.trim();
	submittedComment.innerText = comment.value.trim();

	// Clear Test Fields
	commentForm.reset();

	// Show successful comment submission message
	const submittedCommentMessage = document.querySelector(".post-success-message");
	submittedCommentMessage.setAttribute("style", "display: block;");
}

/*
 * Disable the "post a comment" button and text fields when the post request is in the process of sending.
 * @param {Boolean} sendingStatus - Boolean value indicating whether or not post request is in the send state.
 */
function disableFields(sendingStatus) {
	document.getElementById("post-comment").disabled = sendingStatus;
	document.getElementById("name").disabled = sendingStatus;
	document.getElementById("comment").disabled = sendingStatus;
}
