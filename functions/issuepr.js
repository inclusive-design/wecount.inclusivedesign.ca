/**
 * This is a test script to test if netlify server allows creating and removing temporary local directories.
 *
 * Accept POST requests.
 *
 * The example of a curl command to test this endpoint:
 * curl -X POST [host-server]/api/issuepr
 */

const fs = require("fs");
const rimraf = require("rimraf");
const utils = require("./fetchODCDataFilesUtils.js");
require("json5/lib/register");

const wecountprojectRepoUrl = process.env.GITHUB_ACCOUNT_URL;

const config = require("./fetchODCConfig.json5");

const dataSourceUrl = config.dataSourceUrl;
const dataDirInRepo = config.dataDirInRepo;
const covidDataRepoUrl = config.covidDataRepoUrl;
const githubAPI = config.githubAPI;
const latestFileTemplate = config.latestFileTemplate;
const branchNameTemplate = config.branchNameTemplate;

// The name of the temporary local directory for cloning the covid data repo locally
const clonedLocalDir = "covid-data-repo";

// Use regex to parse out the personal access token and the repo name embedded in the `wecountprojectRepoUrl`
const re = /https:.*:(.*)@.*/;
const matches = re.exec(wecountprojectRepoUrl);
const accessToken = matches[1];

exports.handler = async function(event, context, callback) {
	console.log("in issuepr handler");
	if (event.httpMethod !== "POST") {
		callback(null, {
			statusCode: 400,
			body: "Only accept POST requests."
		});
	} else {
		console.log("before fetching ODC API");
		// Find the date of the data file currently on the ODC website
		const dataSourceResponse = await utils.getDataSource(dataSourceUrl);

		// Exit with an error if a csv data file is not found at the data source website.
		if (dataSourceResponse.isError) {
			console.log("Error at retrieving CSV download links from " + dataSourceUrl + ": A csv data file is not found at " + dataSourceUrl);
			callback(null, {
				statusCode: 400,
				body: "Error at retrieving CSV download links from " + dataSourceUrl + ": A csv data file is not found at " + dataSourceUrl
			});
		}

		const downloadUrl = dataSourceResponse.downloadUrl;
		const publishedDate = dataSourceResponse.publishedDate;
		const dataFileName = "assessment_centre_locations_" + publishedDate.replace(/-/g, "_") + ".csv";

		// Clone the COVID data repo to local directory to check if the data file on the ODC website is new
		console.log("Checking if a new data file is published on the ODC website: " + dataSourceUrl + "...");
		await utils.prepareLocalRepo(covidDataRepoUrl, clonedLocalDir, wecountprojectRepoUrl);

		const dataFileDir = "./" + clonedLocalDir + "/" + dataDirInRepo + "/";
		if (utils.fileNotExists(dataFileName, dataFileDir)) {
			console.log("Downloading the new data file...");
			const downloadStatus = await utils.downloadDataFile(downloadUrl, dataFileDir + dataFileName);

			if (downloadStatus.isError) {
				rimraf.sync(clonedLocalDir);
				console.log("Error at downloading the file from " + downloadUrl + ": " + downloadStatus.message);
				callback(null, {
					statusCode: 400,
					body: "Error at downloading the file from " + downloadUrl + ": " + downloadStatus.message
				});
			}

			console.log("Updating latest.json with the new data file name...");
			fs.writeFileSync(dataFileDir + "latest.json", latestFileTemplate.replace("$filename", dataFileName), "utf8");

			const branchName = branchNameTemplate.replace("$timestamp", publishedDate);
			console.log("Pushing updated files to a remote branch named \"" + branchName + "\"...");
			await utils.createRemoteBranch(branchName, publishedDate, clonedLocalDir);

			console.log("Removing the local temporary directory...");
			rimraf.sync(clonedLocalDir);

			console.log("Issuing a pull request based off the remote branch...");
			const pr = await utils.issuePullRequest(githubAPI, covidDataRepoUrl, accessToken, branchName, publishedDate);
			if (pr.isError) {
				console.log("Error at issuing pull request: " + pr.message);
				callback(null, {
					statusCode: 400,
					body: "Error at issuing pull request: " + pr.message
				});
			} else {
				console.log("Done: A pull request with the new ODC data file has been issued at " + pr);
				callback(null, {
					statusCode: 200,
					body: "Done: A pull request with the new ODC data file has been issued at " + pr
				});
			}
		} else {
			rimraf.sync(clonedLocalDir);
			console.log("Done: No new data file");
			callback(null, {
				statusCode: 200,
				body: "Done: No new data file"
			});
		}
	}
};
