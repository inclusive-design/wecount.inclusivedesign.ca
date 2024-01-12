$(document).ready(function () {
	fluid.uiOptions(".flc-prefsEditor-separatedPanel", {
		preferences: [
			"fluid.prefs.lineSpace",
			"fluid.prefs.textFont",
			"fluid.prefs.contrast",
			"fluid.prefs.tableOfContents",
			"fluid.prefs.enhanceInputs",
			"fluid.prefs.syllabification"
		],
		auxiliarySchema: {
			terms: {
				"templatePrefix": "/lib/infusion/src/framework/preferences/html",
				"messagePrefix": "/lib/infusion/src/framework/preferences/messages"
			},
			"fluid.prefs.tableOfContents": {
				enactor: {
					"tocTemplate": "/lib/infusion/src/components/tableOfContents/html/TableOfContents.html",
					"tocMessage": "/lib/infusion/src/framework/preferences/messages/tableOfContents-enactor.json",
					ignoreForToC: {
						"footer": "footer",
						"tags": ".tags-info"
					}
				}
			},
			"fluid.prefs.syllabification": {
				enactor: {
					terms: {
						patternPrefix: "/lib/infusion/src/lib/hypher/patterns"
					}
				}
			}
		},
		prefsEditorLoader: {
			lazyLoad: true
		},
		schema: {
			properties: {
				"fluid.prefs.lineSpace": {
					"minimum": 1
				}
			}
		}
	});
});
