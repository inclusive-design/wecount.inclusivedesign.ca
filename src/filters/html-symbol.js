/**
 * Convert html symbols to understandable characters.
 * @param {string} value - A string with html symbols to convert.
 * @returns {string} - A string where html symbols have been converted to understandable characters.
 */

const htmlString = value => {
	const conversionMap = {
		'&#8217;': '’',
		'&shy;': '',
	};
	let converted = value;

	for (const symbol in conversionMap) {
		if (Object.hasOwn(conversionMap, symbol)) {
			converted = converted.replaceAll(new RegExp(symbol, 'g'), conversionMap[symbol]);
		}
	}

	return converted;
};

export default htmlString;
