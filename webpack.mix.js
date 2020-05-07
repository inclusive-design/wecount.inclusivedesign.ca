let mix = require("laravel-mix");

mix.setPublicPath("./src/_includes/static/");

mix.sass("./src/scss/main.scss", "./src/_includes/static/css/main.css");

mix.js("./src/js/main.js", "./src/_includes/static/js/main.js");
mix.js("./src/js/utils.js", "./src/_includes/static/js/utils.js");
mix.js("./src/js/search.js", "./src/_includes/static/js/search.js");

mix.copyDirectory("./src/fonts", "./src/_includes/static/fonts")
	.copyDirectory("./src/images", "./src/_includes/static/images")
	.copyDirectory("./infusion", "./src/_includes/static/infusion");

mix.options({
	processCssUrls: false,
	postCss: [require("autoprefixer")]
});

if (mix.inProduction()) {
	mix.version();
} else {
	mix.sourceMaps();
}
