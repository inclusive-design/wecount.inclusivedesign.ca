let mix = require("laravel-mix");

mix.setPublicPath("./src/_includes/static/");

mix.sass("./src/scss/main.scss", "./src/_includes/static/css/main.css");

mix.js("./src/js/main.js", "./src/_includes/static/js/main.js");

mix.copyDirectory("./src/fonts", "./src/_includes/static/fonts")
	.copyDirectory("./src/images", "./src/_includes/static/images");

mix.options({
	processCssUrls: false,
	postCss: []
});

if (mix.inProduction()) {
	mix.version();
} else {
	mix.sourceMaps();
}
