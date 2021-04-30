/*
Copyright 2021 OCAD University

Licensed under the New BSD license. You may not use this file except in compliance with this licence.
You may obtain a copy of the BSD License at
https://raw.githubusercontent.com/inclusive-design/data-update-github/main/LICENSE
*/

// Utility functions used by fetchODCDataFiles.js

"use strict";

const git = require("simple-git")();
const rimraf = require("rimraf");

module.exports = {
	exitWithError: (err, clonedLocalDir) => {
		rimraf.sync(clonedLocalDir);
		console.log(err);
		process.exit(1);
	},

	// Clone the data repository
	prepareLocalRepo: async (covidDataRepoUrl, clonedLocalDir, repoUrl) => {
		await git.clone(covidDataRepoUrl, clonedLocalDir)
			.cwd(clonedLocalDir)
			.addRemote("wordleRepo", repoUrl)
			.catch((err) => module.exports.exitWithError(err, clonedLocalDir));
	},

	// Clone the COVID data repository and push the new data file to a remote branch
	createRemoteBranch: async (branchName, clonedLocalDir) => {
		await git.checkoutLocalBranch(branchName)
			.add("./*")
			.commit("feat: commit a test file")
			.push("wordleRepo", branchName)
			.catch((err) => module.exports.exitWithError("Error at pushing to a remote branch named " + branchName + ". Check either the authentication or whether the remote branch " + branchName + " already exists.\n" + err, clonedLocalDir));
	}
};
