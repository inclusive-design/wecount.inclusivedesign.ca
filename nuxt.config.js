import Config from "./assets/config";
import DataFetcher from "./shared/DataFetcher";
import Utils from "./shared/Utils";

export default {
	mode: "universal",
	generate: {
		fallback: true,
		async routes () {
			// 1. Build routes for site pages
			const sitePages = await DataFetcher.sitePages();
			const sitePagesRoutes = sitePages.map(function (oneSitePage) {
				return {
					route: oneSitePage.slug === "home" ? "/" : `/${oneSitePage.slug}`
				};
			});

			// 2. Build routes for news pages: /news/page/{pageNum}
			// The static root news page "/news" is automatically built. It doesn't need to be explicitly included
			// in the returned routes array.
			const news = await DataFetcher.categorizedItems("news", 8);
			const newsRoutes = Utils.createStaticRoutesForCategorizedItems("news", news, true, false);

			// 3. Build routes for views pages: /views/page/{pageNum}
			// The static root views page "/views" is automatically built. It doesn't need to be explicitly included
			// in the returned routes array.
			const views = await DataFetcher.categorizedItems("views", 1);
			const viewsRoutes = Utils.createStaticRoutesForCategorizedItems("views", views, true, true);

			return [...sitePagesRoutes, ...newsRoutes, ...viewsRoutes];
		}
	},
	/*
	** Headers of the page
	*/
	head: {
		title: "We Count",
		meta: [
			{ charset: "utf-8" },
			{ name: "viewport", content: "width=device-width, initial-scale=1" },
			{ hid: "og:image", property: "og:image", content: "/og-image.png" } // TODO: Customize per page.
		],
		link: [
			{ rel: "icon", type: "image/png", href: "/favicon.png" }
		]
	},
	/*
	** Customize the progress-bar color
	*/
	loading: { color: "#fff" },
	/*
	** Global CSS
	*/
	css: [
		"~/assets/css/main.scss"
	],
	/*
	** Plugins to load before mounting the App
	*/
	plugins: [
	],
	/*
	** Nuxt.js dev-modules
	*/
	buildModules: [
		// Doc: https://github.com/nuxt-community/eslint-module
		"@nuxtjs/eslint-module"
	],
	/*
	** Nuxt.js modules
	*/
	modules: [
		// Doc: https://axios.nuxtjs.org/usage
		"@nuxtjs/axios",
		"@nuxtjs/pwa",
		// Doc: https://github.com/nuxt-community/dotenv-module
		"@nuxtjs/dotenv",
		"@nuxtjs/svg",
		"nuxt-webfontloader"
	],
	webfontloader: {
		google: {
			families: ["Fira+Sans:400,400i,500,600,700&display=swap"]
		}
	},
	pwa: {
		manifest: {
			name: Config.appTitle,
			short_name: Config.appShortTitle,
			description: Config.appDescription
		}
	},
	/*
	** Axios module configuration
	** See https://axios.nuxtjs.org/options
	*/
	axios: {
	},
	/*
	** Build configuration
	*/
	build: {
		/*
		** You can extend webpack config here
		*/
		extend (config, ctx) {
		}
	}
};
