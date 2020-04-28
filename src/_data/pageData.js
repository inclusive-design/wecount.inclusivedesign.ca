const dataFetcher = require("../utils/data-fetcher");

module.exports = async function () {
    return dataFetcher.sitePages();
};

