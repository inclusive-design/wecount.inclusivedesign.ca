const commentForm = document.getElementById("comment-form");

const name = document.getElementById("name");
const comment = document.getElementById("comment");

commentForm.addEventListener("submit", (event) => {
	event.preventDefault();

	// // Collaborated with Cindy
	// const nameDOMElement = document.getElementById("name")
	// const name = nameDOMElement.value.trim();
	// const commentDOMElement = document.getElementById("comment");
	// const comment = commentDOMElement.value.trim();

	// // Initial clean up
	// // 1. hide all required indicators;
	// // 2. hide success and failure messages
	// applyVisibility(DOMselector, toDisplay, displayType);
	// toShow: boolean
	// displayType: [Optional] the value for the "display" css attribute

	// // Verification step to make sure name and comment values are not empty
	// if (name === "") {
	// 	showRequiredIndicator(nameDOMElement);
	// 	return;
	// }

	// if (comment === "") {
	// 	showRequiredIndicator(commentDOMElement);
	// 	return;
	// }
	// // End of collaboration

	const name = document.getElementById("name");
	const comment = document.getElementById("comment");

	// Hide comment submission message
	// Note: It's necessary to hide succesful/failed submitted comment message indicators programmatically even though they have been hidden initially by CSS
	// in the case the same user submits more comments after submitting an initial comment
	const submittedCommentMessage = document.querySelector(".save-response");
	submittedCommentMessage.setAttribute("style", "display: none;");

	if (requiredFieldVerified(name) & requiredFieldVerified(comment)) {
		disableFields(true);

		const submittedCommentMessage = document.querySelector(".post-failure-message");

		const XHR = new XMLHttpRequest();

		const commentForm = document.getElementById("comment-form");
		// Bind the FormData object and the form element
		const commentFormData = new FormData( commentForm );

		// submit and add comment to top of comment section of page on successful data submission
		XHR.addEventListener( "load", function() {
			console.log("CONNECTION STATUS ON LOAD: ", XHR.status);

			if (XHR.status === 200) {
				setSubmittedComment();
			} else {
				submittedCommentMessage.setAttribute("style", "display: block;");
			}
			disableFields(false);
		});

		// Define what happens in case of error
		XHR.addEventListener( "error", function() {
			console.log("CONNECTION STATUS ON ERROR: ", XHR.status);
			// Show failed comment submission message
			submittedCommentMessage.setAttribute("style", "display: block;");
			disableFields(false);
		} );

		// Set up our request
		// XHR.open( "POST", window.location.origin + "/api/comments" );
		XHR.open( "GET", "/" );

		// The data sent is what the user provided in the form
		const jsonFormData = JSON.stringify(Object.fromEntries(commentFormData));
		// XHR.setRequestHeader("Content-Type", "application/json");
		console.log("NAME VALUE: ");
		console.log(name.value.trim());

		console.log("COMMENT VALUE: ");
		console.log(comment.value.trim());

		console.log("COMMENT-FROM-DATA: ");
		console.log(commentFormData);

		console.log("FORM DATA: ");
		console.log(commentForm);

		console.log("FORM DATA STRING: ");
		console.log(jsonFormData);

		XHR.send(jsonFormData);

		console.log("-------------------------------------------------");

		console.log("NAME VALUE: ");
		console.log(name.value.trim());

		console.log("COMMENT VALUE: ");
		console.log(comment.value.trim());

		console.log("COMMENT-FROM-DATA: ");
		console.log(commentFormData);

		console.log("FORM DATA: ");
		console.log(commentForm);

		console.log("FORM DATA STRING: ");
		console.log(jsonFormData);
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
		// Show required message
		requiredMessage.setAttribute("style", "display: inline;");

		return false;
	} else {
		// Hide required message
		// Note: It's necessary to hide "required" indicators programmatically even though they have been hidden initially by CSS
		// in the case the same user submits more comments after submitting an initial comment
		requiredMessage.setAttribute("style", "display: none;");

		return true;
	}
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
	submittedName.innerText = name.value.trim();
	submittedComment.innerText = comment.value.trim();

	// Clear Text Fields
	// commentForm.reset();

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
