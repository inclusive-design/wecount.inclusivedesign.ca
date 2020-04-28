import cheerio from "cheerio";
import Config from "./assets/config";
import DataFetcher from "./shared/DataFetcher";
import Utils from "./shared/Utils";
import SideMenu from "./shared/SideMenu";

export default {
	mode: "universal",
	generate: {
		fallback: true,
		async routes () {
			// 1. Build routes for site pages
			const sitePages = await DataFetcher.sitePages();
			const sitePagesRoutes = sitePages.map((oneSitePage) => {
				oneSitePage.content = SideMenu.injectHeaderID(oneSitePage.content);
				oneSitePage.headers = SideMenu.getHeaderList(oneSitePage.content);
				return {
					route: oneSitePage.slug === "home" ? "/" : `/${oneSitePage.slug}`,
					payload: oneSitePage
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
			let viewsRoutes = Utils.createStaticRoutesForCategorizedItems("views", views, true, true);
			viewsRoutes = viewsRoutes.map((x) => {
				if (x.payload.headers) {
					x.payload.content = SideMenu.injectHeaderID(x.payload.content);
					x.payload.headers = SideMenu.getHeaderList(x.payload.content);
				}
				return x;
			});
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
	render: { resourceHints: false },
	hooks: {
		// remove uneeded js scripts
		"generate:page": (page) => {
			const doc = cheerio.load(page.html);
			doc("body script[src='/_nuxt/aac6f7dcb0388507b165.js']").remove();
			doc("body script[src='/_nuxt/1d92bb16939a3bd4b12c.js']").remove();
			doc("body script[src='/_nuxt/234986189beee12e84ec.js']").remove();
			doc("body script[src='/_nuxt/f736595ea028e41700eb.js']").remove();
			doc("body script[src='/_nuxt/a505d88abcce0fe26ca5.js']").remove();
			doc("body script[src='/_nuxt/a270ac255c3fe8a1bf09.js']").remove();
			doc("body script[src='/_nuxt/2a0a1aa1fb0b901148da.js']").remove();
			doc("body script[src='/_nuxt/18221cb8a030429f60ce.js']").remove();
			doc("body script[src='/_nuxt/25ff9b6e59014552c50d.js']").remove();
			doc("body script[src='/_nuxt/5f0da8c10b7512ce3419.js']").remove();
			doc("body script[src='/_nuxt/682497037c538f8067a0.js']").remove();
			doc("body script[src='/_nuxt/921c2bc6e9c521c39ee4.js']").remove();
			doc("body script[src='/_nuxt/234986189beee12e84ec.js']").remove();
			doc("body script[src='/_nuxt/../server/client.manifest.json ']").remove();
			doc("head link").remove();
			doc("body script[src='/_nuxt/payload*.js']").remove();
			doc("body script[src='/_nuxt/*/payload*.js']").remove();
			page.html = doc.html();
		}
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
		"nuxt-webfontloader",
		"nuxt-payload-extractor"
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
