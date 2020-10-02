/**
 * Handle client requests for getting the accessbility map data. This script does:
 * 1. Read the JSON object that tells where the latest data file is;
 * 2. Read the latest data file
 *
 * Accepted requirements: must be a GET request;
 *
 * The example of a curl command to test this endpoint:
 * curl [host-server]/api/getMapData
 */

const axios = require("axios");

const dataRepoUrl = "https://raw.githubusercontent.com/cindyli/covid-assessment-centres/trigger-map-deploy/";
const dataInfoUrl = dataRepoUrl + "latest.json";

const errorCallback = function (callback, error) {
	callback(null, {
		statusCode: 400,
		body: "Failed at fetching from the URL (" + dataInfoUrl + ") with error: " + error
	});
};

exports.handler = function(event, context, callback) {
	// Reject the request when it's not a GET request;
	if (event.httpMethod !== "GET") {
		callback(null, {
			statusCode: 400,
			body: "Invalid HTTP request method."
		});
	} else {
		axios.get(dataInfoUrl).then(function (dataInfo) {
			// const latestFileInfo = JSON.parse(dataInfo);
			const latestFileInfo = dataInfo.data;

			let branchName, latestFileName;
			for (branchName in latestFileInfo) {
				latestFileName = latestFileInfo[branchName];
			}

			const dataFileUrl = dataRepoUrl + branchName + "/" + latestFileName;
			axios.get(dataFileUrl).then(function (content) {
				callback(null, {
					statusCode: 200,
					body: JSON.stringify(content.data)
				});
			}).catch(function (error) {
				errorCallback(callback, error);
			});
		}).catch(function (error) {
			errorCallback(callback, error);
		});
	}
};
