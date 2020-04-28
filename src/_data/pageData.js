const Cache = require("@11ty/eleventy-cache-assets");
const api = require('./api');

const route = '/pages?per_page=100&orderby=menu_order&order=asc&_embed'

module.exports = async function () {
    // TODO: Paginate.
    try {
        let response = await Cache(`${api.base}${route}`, {
            duration: "1d",
            type: "json"
        });
    
        return response;    
    } catch(e) {
        console.log( "Failed getting pages." );
        return [];
    }
};

