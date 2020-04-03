// Shared utility functons

export default {
	stripHtmlTags (inputString) {
		return inputString.replace(/<\/?[^>]+(>|$)/g, "")
	}
}
