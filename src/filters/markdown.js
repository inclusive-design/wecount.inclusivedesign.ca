import MarkdownIt from "markdown-it";

const markdown = value => {
	const md = new MarkdownIt({
		html: true,
		breaks: true,
		linkify: true
	});

	return md.render(value);
};

export default markdown;
