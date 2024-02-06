/*
Copyright the eleventy-plugin-fluid copyright holders.

See the AUTHORS.md file at the top-level directory of this distribution and at
https://github.com/fluid-project/eleventy-plugin-fluid/raw/main/AUTHORS.md.

Licensed under the New BSD license. You may not use this file except in compliance with this License.

You may obtain a copy of the New BSD License at
https://github.com/fluid-project/eleventy-plugin-fluid/raw/main/LICENSE.md.
*/
"use strict";

const MarkdownIt = require("markdown-it");

module.exports = function (src, alt, cssClass, caption) {
    if (src === "" || alt === "") {
        // Both image source and alternative text are required. If either is missing, return an empty string.
        return "";
    }

    let figcaption;

    // Captions are optional; if the shortcode is empty, supply an empty string as the caption.
    if (caption && caption.trim()) {
        const md = new MarkdownIt({
            html: true,
            linkify: true
        });

        figcaption = `<figcaption>${md.render(caption).trim()}</figcaption>`;
    } else {
        figcaption = "";
    }

    return `<figure${cssClass ? ` class="${cssClass}"` : ""}><img src="${src}" alt="${alt}">${figcaption}</figure>\n`;
};