module.exports = url => {
	let matches = url.match(/(\?|&)v=([^&#]+)/);

	if (matches) {
		return matches.pop();
	}

	matches = url.match(/(\.be\/)+([^/]+)/);

	if (matches) {
		return matches.pop();
	}

	matches = url.match(/(embed\/)+([^/]+)/);

	if (matches) {
		return matches.pop();
	}

	return false;
};
