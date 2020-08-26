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

const env = require("../src/_data/env");
const airtable = require("airtable");
const nodemailer = require("nodemailer");
const qs = require("querystring");

airtable.configure({
	apiKey: process.env.AIRTABLE_API_KEY
});

const base = airtable.base(env.airtableBase);

const sendEmail = ({ timestamp, name, comment }) => {
	var transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: process.env.EMAIL_FROM,
			pass: process.env.EMAIL_FROM_PWD
		}
	});

	var mailOptions = {
		from: process.env.EMAIL_FROM,
		to: process.env.EMAIL_TO,
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

const saveComment = async ({ timestamp, name, comment, workshopId }) => {
	return new Promise((resolve, reject) => {
		base("comments").create([
			{
				"fields": {
					"post_date": timestamp,
					"name": name,
					"comment": comment,
					"workshop": [
						workshopId
					],
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
	const incomingData = qs.parse(event.body);

	// Reject the request when:
	// 1. Not a POST request;
	// 2. Doesn"t provide "name" or "comment" values
	if (event.httpMethod !== "POST" || !incomingData["name"] || !incomingData["comment"] || !incomingData["workshopId"]) {
		callback(null, {
			statusCode: 400,
			body: `Invalid HTTP request method or missing field values.  ${event.httpMethod} ${incomingData["name"]} ${incomingData["comment"]} ${incomingData["workshopId"]}`
		});
	} else {
		const timestamp = new Date().toISOString();
		const data = {
			timestamp: timestamp,
			name: incomingData["name"],
			comment: incomingData["comment"],
			workshopId: incomingData["workshopId"]
		};

		await saveComment(data);
		await sendEmail(data);

		callback(null, {
			statusCode: 200,
			body: "Saved successfully!"
		});
	}
};
