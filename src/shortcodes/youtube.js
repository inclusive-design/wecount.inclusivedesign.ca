const getId = require("../utils/extract-youtube-id.js");

module.exports = (url) => {
	const id = getId(url);

	if (id) {
		return `<figure class="embed--youtube"><lite-youtube videoid="${id}" style="background-image: url('https://i.ytimg.com/vi/${id}/hqdefault.jpg');"><a href="https://youtube.com/watch?v=${id}" class="lty-playbtn"><span class="lyt-visually-hidden">Play Video</span></a></lite-youtube></figure>`;
	}
};
