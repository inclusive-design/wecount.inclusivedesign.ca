// TODO:
// This is where I plan to put the global variables for the api endpoints. They are hardcoded for now.
"use strict"

export default {
	appTitle: "We Count",
	appTitleShort: "WC",
	appDescription: "We Count Project",
	appThemeColor: "#fffffff",
	appBgColor: "#00172c ",
	appIcon: "assets/app-icon.png",
	wpDomain: "https://wecount-cms.inclusivedesign.ca",
	loadDbName: "starter_wp",
	apiBase: "/wp-json/wp/v2/",
	contactEmail: "wecount@inclusivedesign.ca",
	socialMedias: [{
		id: "facebook",
		title: "Facebook",
		href: "",
		svg: "~/assets/images/Facebook.svg"
	}],
	funders: [],
	dev: (process.env.NODE_ENV !== "production")
}
