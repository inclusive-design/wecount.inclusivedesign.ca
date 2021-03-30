/**
 * Handle client requests for adding comments for workshops. This script does:
 * 1. Save the comment to Airtable;
 * 2. Send an email to moderator that a new comment has been posted and waiting for a review/
 *
 * Accepted requirements:
 * 1. must be a POST request;
 * 2. The incoming payload is in form/multipart MIME data format and must have values for 3 field:
 * name, comment, workshopId
 *
 * The example of a curl command to test this endpoint:
 * curl -X POST -d "name=test%20person&comment=a%20test%20comment&workshopId=recH5jhXKOYfeXYvP" [host-server]/api/comments
 */

const airtable = require("airtable");
const nodemailer = require("nodemailer");

// Due to a known issue with Netlify: Netlify functions cannot access netlify.toml context environment variables
// (see https://community.netlify.com/t/netlify-toml-context-env-variables-do-not-apply-to-functions/410), this
// netlify function cannot distinguish the production and dev deploys by checking process.env.CONTEXT, the workaround
// is to check the URL to differentiate.
const getDeployType = (event) => {
	return event.headers.referer.startsWith("https://wecount.inclusivedesign.ca") ? "production" : "dev";
};

const sendEmail = (moderatorEmail, { timestamp, name, comment }) => {
	const transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: process.env.EMAIL_FROM,
			pass: process.env.EMAIL_FROM_PWD
		}
	});

	const mailOptions = {
		from: process.env.EMAIL_FROM,
		to: moderatorEmail,
		subject: "A new comment is posted on the WeCount website",
		text: "Below is the content of the new comment:\r\n\r\nPost Date: " + timestamp + "\r\nAuthor: " + name + "\r\nComment: " + comment + "\r\n\r\nWeCount Team"
	};

	return new Promise((resolve, reject) => {
		transporter.sendMail(mailOptions, function(error, info){
			if (error) {
				console.error(error);
				return reject(error);
			} else {
				console.log("Email sent: " + info.response);
				resolve();
			}
		});
	});
};

const saveComment = async (base, { timestamp, name, comment, workshopId }) => {
	return new Promise((resolve, reject) => {
		base("comments").create([
			{
				"fields": {
					"post_date": timestamp,
					"name": name,
					"comment": comment,
					"workshopId": workshopId,
					"reviewed": false
				}
			}
		], function (err, records) {
			if (err) {
				console.error(err);
				return reject(err);
			}
			records.forEach(function (record) {
				console.log("saved into a new ID: ", record.getId());
			});
			resolve();
		});
	});
};

exports.handler = async function(event, context, callback) {
	const incomingData = JSON.parse(event.body);

	// Reject the request when:
	// 1. Not a POST request;
	// 2. Doesn’t provide "name" or "comment" values
	if (event.httpMethod !== "POST" || !incomingData["name"] || !incomingData["comment"] || !incomingData["workshopId"]) {
		callback(null, {
			statusCode: 400,
			body: "Invalid HTTP request method or missing field values."
		});
	} else {
		const deployType = getDeployType(event);
		const moderatorEmail = deployType === "production" ? process.env.EMAIL_TO_PRODUCTION : process.env.EMAIL_TO_DEV;
		const airtableBase = deployType === "production" ? process.env.AIRTABLE_BASE_PRODUCTION : process.env.AIRTABLE_BASE_DEV;

		airtable.configure({
			apiKey: process.env.AIRTABLE_API_KEY
		});
		const base = airtable.base(airtableBase);

		const timestamp = new Date().toISOString();
		const data = {
			timestamp: timestamp,
			name: incomingData["name"],
			comment: incomingData["comment"],
			workshopId: incomingData["workshopId"]
		};

		await saveComment(base, data);
		await sendEmail(moderatorEmail, data);

		callback(null, {
			statusCode: 200,
			body: "Saved successfully!"
		});
	}
};
