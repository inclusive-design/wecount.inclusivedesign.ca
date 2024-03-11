window.addEventListener("load", () => {
	const landingImage = document.querySelector("img[src*=\"landing.png\"]");
	landingImage.classList.add("landing-image");

	const imageContainer = landingImage.parentNode;
	imageContainer.classList.add("landing-image-container");

	const imageContent = document.createElement("p");
	imageContent.classList.add("landing-image-text");
	imageContent.innerHTML = "IDRC addresses barriers<br />throughout the data<br />ecosystem.";
	imageContainer.appendChild(imageContent);
});
