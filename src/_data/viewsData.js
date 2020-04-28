const dataFetcher = require("../utils/data-fetcher");

module.exports = async function () {
    return dataFetcher.categorizedItems('views', 1);
};

