/**
 * Convert html symbols to understandable characters.
 * @param {String} value - A string with html symbols to convert.
 * @return A string that html symbols have been converted to understandable characters.
 */

module.exports = value => {
	const conversionMap = {
		"&#8217;": "’",
		"&shy;": ""
	};
	let converted = value;

	for (var symbol in conversionMap) {
		converted = converted.replace(new RegExp(symbol, "g"), conversionMap[symbol]);
	}
	return converted;
};
