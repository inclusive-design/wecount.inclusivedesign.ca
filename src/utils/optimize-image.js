const image = require("@11ty/eleventy-img");

/**
 * Create an optimized version of a local image.
 *
 * @param {String} imagePath
 * @return
 */

module.exports = async (imagePath) => {
	let optimizedImages = await image(`./_site${imagePath}`, {
		// Create JPEG images
		formats: ["jpeg"],
		// The directory where the optimized images should go.
		// Relative to the project root.
		outputDir: "./_site/assets/images/",
		// The path to images in site URL.
		// Equivalent to outputDir without the directory.
		// See https://www.11ty.dev/docs/config/#output-directory)
		urlPath: "/assets/images/"
	});

	// Return the URL of the first resulting image.
	return optimizedImages.jpeg[0].url;
};
