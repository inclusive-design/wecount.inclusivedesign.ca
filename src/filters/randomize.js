const uuid = require("uuid");

module.exports = value => {
	return value.concat("-" + uuid.v4());
};
