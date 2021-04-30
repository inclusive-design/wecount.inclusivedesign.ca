/**
 * This is a test script to test if a netlify function can create a remote branch of a Github repository.
 *
 * Accept POST requests.
 *
 * The example of a curl command to test this endpoint:
 * curl -X POST [host-server]/api/createBranch
 */

const fs = require("fs");
const rimraf = require("rimraf");
const utils = require("./utils.js");

// The name of the temporary local directory for cloning the covid data repo locally
const clonedLocalDir = "/tmp/inverted-wordles";
const dataRepoUrl = "https://github.com/cindyli/inverted-wordles";
const branchName = "from-netlify";
const repoUrl = process.env.GITHUB_ACCOUNT_URL;

exports.handler = async function(event, context, callback) {
	if (event.httpMethod !== "POST") {
		callback(null, {
			statusCode: 400,
			body: "Only accept POST requests."
		});
	} else {
		console.log("Cloning repository...");
		await utils.prepareLocalRepo(dataRepoUrl, clonedLocalDir, repoUrl);

		console.log("Creating a test file...");
		fs.writeFileSync(clonedLocalDir + "/test.txt", "{a: \"b\"}");

		console.log("Pushing updated files to a remote branch...");
		await utils.createRemoteBranch(branchName, clonedLocalDir);

		console.log("Cleaning up the cloned directory...");
		rimraf.sync(clonedLocalDir);

		console.log("Done!");

		callback(null, {
			statusCode: 200,
			body: "Done!"
		});
	}
};
