const form = document.getElementById("comment-form");

const name = document.getElementById("name");
const comment = document.getElementById("comment");
console.log("Is this working???????");

form.addEventListener("submit", (event) => {
	console.log("HELLLLLLP");
	event.preventDefault();

	if (setRequiredMessage(name) & setRequiredMessage(comment)) {

		const XHR = new XMLHttpRequest();

		// Bind the FormData object and the form element
		const FD = new FormData( form );

		console.log( event.target.responseText );

		// Define what happens on successful data submission
		XHR.addEventListener( "load", function() {
			setSubmittedComment();
		} );

		// Define what happens in case of error
		XHR.addEventListener( "error", function() {
			alert( "Oops! Something went wrong. Sorry Your comment was not submitted." );
		} );

		// Set up our request
		console.log("ADDRESS ORIGIN:", window.location.origin);
		XHR.open( "POST", window.location.origin + "/api/comments" );

		// The data sent is what the user provided in the form
		console.log(FD);
		XHR.send( FD );

		for(var pair of FD.entries()) {
			console.log(pair[0]+ ", "+ pair[1]);
		}

		XHR.send( FD );
		console.log(FD);


	}
});

function setRequiredMessage(input){

	if (input.value.trim() === "") {

		const submittedCommentMessage = document.querySelector(".submitted-comment-message");
		submittedCommentMessage.setAttribute("style", "display: none;");

		// show required message
		const formControl = input.parentElement;
		const requiredMessage = formControl.querySelector(".required");
		requiredMessage.setAttribute("style", "display: inline;");


		return false;

	} else {
		const formControl = input.parentElement;
		const requiredMessage = formControl.querySelector(".required");
		requiredMessage.setAttribute("style", "display: none;");

		return true;
	}
}

function setSubmittedComment() {

	const submittedComment = document.querySelector(".submitted-comment");

	const submittedCommentDate = submittedComment.querySelector(".comment-date");
	const submittedCommentName = submittedComment.querySelector(".comment-name");
	const submittedCommentComment = submittedComment.querySelector(".comment-comment");

	const dateObject = new Date();
	const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	submittedCommentDate.innerText = `${months[dateObject.getMonth()]} ${dateObject.getDate()}, ${dateObject.getFullYear()}`;

	submittedCommentName.innerText = name.value.trim();
	submittedCommentComment.innerText = comment.value.trim();


	const submittedCommentMessage = document.querySelector(".submitted-comment-message");
	submittedCommentMessage.setAttribute("style", "display: block;");

	submittedComment.setAttribute("style", "display: block;");

}
